const mongoose = require('mongoose');
const Application = require('../models/Application');

async function canChat(userId, peerId) {
    if (!mongoose.isValidObjectId(peerId) || String(userId) === String(peerId)) return false;
    return Boolean(await Application.exists({
        $or: [
            { candidateId: userId, recruiterId: peerId },
            { recruiterId: userId, candidateId: peerId }
        ]
    }));
}

module.exports = canChat;
