const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const scanPdf = require('../utils/scanPdf');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload Resume, Parse with AI, and Update Profile
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
        const signature = Buffer.alloc(5);
        const handle = await fs.promises.open(filePath, 'r');
        try { await handle.read(signature, 0, 5, 0); } finally { await handle.close(); }
        if (signature.toString() !== '%PDF-') return res.status(400).json({ message: 'Invalid PDF file' });
        await scanPdf(filePath);

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // The original and derived assets require authorization at Cloudinary.
        const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            type: 'authenticated',
            folder: 'resumes'
        });
        let parsedData = null;
        if (process.env.AI_SERVICE_TOKEN) {
            try {
                const FormData = require('form-data');
                const form = new FormData();
                form.append('file', fs.createReadStream(filePath), { filename: 'resume.pdf', contentType: 'application/pdf' });
                const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
                const aiResponse = await axios.post(`${aiServiceUrl}/parse-resume`, form, {
                    headers: { ...form.getHeaders(), 'X-Service-Token': process.env.AI_SERVICE_TOKEN },
                    timeout: 12000, maxBodyLength: 6 * 1024 * 1024
                });
                parsedData = aiResponse.data.parsed_data;
            } catch (error) { console.warn('Resume extraction unavailable:', error.message); }
        }
        user.resumeAsset = { publicId: cloudinaryResponse.public_id, resourceType: cloudinaryResponse.resource_type };
        user.resumeURL = undefined;
        if (parsedData) user.profile = {
            ...user.profile,
            skills: Array.from(new Set([...(user.profile?.skills || []), ...(parsedData.skills || [])]))
        };
        const updatedUser = await user.save();
        return res.json({
            message: parsedData ? 'Resume processed successfully' : 'Resume saved; automatic skill extraction unavailable',
            hasResume: true, fileParams: parsedData,
            profile: updatedUser.profile, parsingAvailable: Boolean(parsedData)
        });

    } catch (error) {
        console.error('Resume Processing Error:', error.message);
        return res.status(error.status || 500).json({ message: error.status ? error.message : 'Resume upload failed' });
    } finally {
        await fs.promises.unlink(filePath).catch(() => {});
    }
};

const signedResume = (req, res, asset) => {
    if (!asset?.publicId || !['image', 'raw'].includes(asset.resourceType)) {
        return res.status(404).json({ message: 'A private resume is not available; upload a new PDF' });
    }
    const expiresAt = Math.floor(Date.now() / 1000) + 300;
    const url = cloudinary.utils.private_download_url(asset.publicId, 'pdf', {
        resource_type: asset.resourceType, type: 'authenticated', expires_at: expiresAt
    });
    res.set('Cache-Control', 'no-store').json({ url, expiresAt });
};

const getMyResume = (req, res) => signedResume(req, res, req.user.resumeAsset);

const getApplicationResume = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid application ID' });
    const application = await Application.findOne({ _id: req.params.id, recruiterId: req.user._id });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    return signedResume(req, res, application.resumeAsset);
};

module.exports = { uploadResume, getMyResume, getApplicationResume };
