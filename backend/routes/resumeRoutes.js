const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for temporary local storage
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'application/pdf' || !file.originalname.toLowerCase().endsWith('.pdf')) {
            return cb(new Error('Only PDF resumes are supported'));
        }
        cb(null, true);
    }
});

router.post('/upload', protect, (req, res, next) => upload.single('resume')(req, res, error => {
    if (error) return res.status(400).json({ message: error.code === 'LIMIT_FILE_SIZE' ? 'PDF must be at most 5 MB' : error.message });
    next();
}), uploadResume);

module.exports = router;
