const express = require('express');
const router = express.Router();
const { getChatHistory, markAsRead } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { param } = require('express-validator');
const validate = require('../middleware/validate');
const handle = require('../middleware/asyncHandler');

router.get('/:userId', protect, [param('userId').isMongoId(), validate], handle(getChatHistory));
router.put('/read/:userId', protect, [param('userId').isMongoId(), validate], handle(markAsRead));

module.exports = router;
