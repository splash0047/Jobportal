const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const publicUser = user => ({
    _id: user._id, name: user.name, email: user.email, role: user.role,
    profile: user.profile, companyProfile: user.companyProfile,
    hasResume: Boolean(user.resumeAsset?.publicId)
});
const getCurrentUser = (req, res) => res.json(publicUser(req.user));

const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'candidate') {
        if (!user.profile) user.profile = {};
        user.profile.bio = req.body.bio;
    } else {
        user.companyProfile = {
            name: req.body.name,
            website: req.body.website || '',
            description: req.body.description || '',
            location: req.body.location || ''
        };
    }
    await user.save();
    return res.json(publicUser(user));
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    if (user) {
        // Send Welcome Email
        try {
            if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
                const safeName = user.name.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
                await sendEmail({
                    email: user.email,
                    subject: 'Welcome to JobPortal!',
                    message: `
                        <h1>Welcome, ${safeName}!</h1>
                        <p>Thank you for registering at JobPortal. We are excited to have you on board as a ${user.role}.</p>
                        <p>Start exploring jobs or posting opportunities today!</p>
                    `
                });
            }
        } catch (error) {
            console.error('Email send failed:', error);
            // Don't fail the registration if email fails
        }

        res.status(201).json({ ...publicUser(user), token: generateToken(user._id) });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({ ...publicUser(user), token: generateToken(user._id) });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser, updateProfile };
