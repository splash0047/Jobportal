const Message = require('../models/Message');
const canChat = require('../utils/chatAccess');

// @desc    Get chat history between two users
// @route   GET /api/chat/:userId
// @access  Private
const getChatHistory = async (req, res) => {
    const { userId } = req.params;
    const myId = req.user._id;
    if (!(await canChat(myId, userId))) return res.status(403).json({ message: 'Chat unavailable' });

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userId },
            { senderId: userId, receiverId: myId }
        ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
};

// @desc    Mark messages as read
// @route   PUT /api/chat/read/:userId
// @access  Private
const markAsRead = async (req, res) => {
    const { userId } = req.params;
    const myId = req.user._id;
    if (!(await canChat(myId, userId))) return res.status(403).json({ message: 'Chat unavailable' });

    await Message.updateMany(
        { senderId: userId, receiverId: myId, read: false },
        { $set: { read: true } }
    );

    res.status(200).json({ message: 'Messages marked as read' });
};

module.exports = {
    getChatHistory,
    markAsRead
};
