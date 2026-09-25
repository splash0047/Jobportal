const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    deleteJob,
    getRecommendedJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const handle = require('../middleware/asyncHandler');

router.route('/')
    .get(handle(getJobs))
    .post(protect, authorize('recruiter'), [body('title').isString().trim().isLength({ min: 2, max: 150 }), body('description').isString().trim().isLength({ min: 10, max: 10000 }), body('location').isString().trim().notEmpty(), body('skillsRequired').isArray({ min: 1 }), body('skillsRequired.*').isString().trim().notEmpty(), body('type').optional().isIn(['Full-time', 'Part-time', 'Contract', 'Internship']), validate], handle(createJob));

router.get('/recommended', protect, authorize('candidate'), handle(getRecommendedJobs));

router.route('/myjobs')
    .get(protect, authorize('recruiter'), handle(getMyJobs));

router.route('/:id')
    .get([param('id').isMongoId(), validate], handle(getJobById))
    .delete(protect, authorize('recruiter'), [param('id').isMongoId(), validate], handle(deleteJob));

module.exports = router;
