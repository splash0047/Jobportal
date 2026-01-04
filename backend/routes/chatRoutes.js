const express = require('express');
const router = express.Router();
const { getChatHistory, markAsRead } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:userId', protect, getChatHistory);
router.put('/read/:userId', protect, markAsRead);

module.exports = router;
