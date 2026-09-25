const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const handle = require('../middleware/asyncHandler');

router.post('/register', [body('name').isString().trim().isLength({ min: 2, max: 100 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8, max: 128 }), body('role').optional().isIn(['candidate', 'recruiter']), validate], handle(registerUser));
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').isString().notEmpty(), validate], handle(loginUser));
router.get('/me', protect, getCurrentUser);
router.patch('/me', protect, [
    body('bio').if((_, { req }) => req.user.role === 'candidate').isString().trim().isLength({ max: 1000 }),
    body('name').if((_, { req }) => req.user.role === 'recruiter').isString().trim().isLength({ min: 2, max: 120 }),
    body('website').optional({ values: 'falsy' }).isURL({ require_protocol: true }),
    body('description').optional().isString().trim().isLength({ max: 2000 }),
    body('location').optional().isString().trim().isLength({ max: 120 }),
    validate
], handle(updateProfile));

module.exports = router;
