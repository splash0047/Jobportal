const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getJobApplications,
    getMyApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const handle = require('../middleware/asyncHandler');

router.post('/', protect, authorize('candidate'), [body('jobId').isMongoId(), validate], handle(applyForJob));
router.get('/my', protect, authorize('candidate'), handle(getMyApplications));
router.get('/job/:jobId', protect, authorize('recruiter'), [param('jobId').isMongoId(), validate], handle(getJobApplications));
router.put('/:id/status', protect, authorize('recruiter'), [param('id').isMongoId(), body('status').isIn(['Applied', 'Shortlisted', 'Rejected']), validate], handle(updateApplicationStatus));

module.exports = router;
