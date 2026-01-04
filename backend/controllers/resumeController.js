const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');
const path = require('path');

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
        // 1. Send file to Python AI Service for parsing
        // We need to send the file as form-data
        const FormData = require('form-data');
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        console.log('Sending to AI Service...');
        // Assuming AI service is on port 8000
        const aiResponse = await axios.post('http://localhost:8000/parse-resume', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        const parsedData = aiResponse.data.parsed_data;
        console.log('AI Parsed Data:', parsedData);

        // 2. Upload to Cloudinary
        console.log('Uploading to Cloudinary...');
        const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'resumes'
        });

        // 3. Update User Profile in MongoDB
        const user = await User.findById(req.user._id);

        if (user) {
            user.resumeURL = cloudinaryResponse.secure_url;
            user.profile = {
                ...user.profile,
                // Merge new skills with existing ones, avoiding duplicates
                skills: Array.from(new Set([...(user.profile?.skills || []), ...parsedData.skills])),
                experience: parsedData.experience || user.profile?.experience, // If AI extracts exp
            };

            const updatedUser = await user.save();

            // Cleanup local file
            fs.unlinkSync(filePath);

            res.json({
                message: 'Resume processed successfully',
                resumeURL: updatedUser.resumeURL,
                fileParams: parsedData,
                profile: updatedUser.profile
            });
        } else {
            res.status(404).json({ message: 'User not found' });
            fs.unlinkSync(filePath);
        }

    } catch (error) {
        console.error('Resume Processing Error:', error.message);
        // Attempt cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        res.status(500).json({
            message: 'Resume upload/parsing failed',
            error: error.message
        });
    }
};

module.exports = { uploadResume };
