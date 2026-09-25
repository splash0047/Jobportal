const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const handle = require('../middleware/asyncHandler');

router.post('/register', [body('name').isString().trim().isLength({ min: 2, max: 100 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8, max: 128 }), body('role').optional().isIn(['candidate', 'recruiter']), validate], handle(registerUser));
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').isString().notEmpty(), validate], handle(loginUser));
router.get('/me', protect, getCurrentUser);

module.exports = router;
