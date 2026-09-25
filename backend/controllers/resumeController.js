const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');

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

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Save the PDF even if extraction is temporarily unavailable.
        const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
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
        user.resumeURL = cloudinaryResponse.secure_url;
        if (parsedData) user.profile = {
            ...user.profile,
            skills: Array.from(new Set([...(user.profile?.skills || []), ...(parsedData.skills || [])]))
        };
        const updatedUser = await user.save();
        return res.json({
            message: parsedData ? 'Resume processed successfully' : 'Resume saved; automatic skill extraction unavailable',
            resumeURL: updatedUser.resumeURL, fileParams: parsedData,
            profile: updatedUser.profile, parsingAvailable: Boolean(parsedData)
        });

    } catch (error) {
        console.error('Resume Processing Error:', error.message);
        return res.status(500).json({ message: 'Resume upload failed' });
    } finally {
        await fs.promises.unlink(filePath).catch(() => {});
    }
};

module.exports = { uploadResume };
