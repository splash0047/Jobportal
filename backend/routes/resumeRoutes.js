const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume, getMyResume, getApplicationResume } = require('../controllers/resumeController');
const { protect, authorize } = require('../middleware/authMiddleware');
const handle = require('../middleware/asyncHandler');

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

router.get('/mine', protect, authorize('candidate'), handle(getMyResume));
router.get('/applications/:id', protect, authorize('recruiter'), handle(getApplicationResume));
router.post('/upload', protect, authorize('candidate'), (req, res, next) => upload.single('resume')(req, res, error => {
    if (error) return res.status(400).json({ message: error.code === 'LIMIT_FILE_SIZE' ? 'PDF must be at most 5 MB' : error.message });
    next();
}), uploadResume);

module.exports = router;
