const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    resumeURL: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Rejected'],
        default: 'Applied'
    },
    matchScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
applicationSchema.index({ candidateId: 1, createdAt: -1 });
applicationSchema.index({ recruiterId: 1, createdAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
