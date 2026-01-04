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

router.route('/')
    .get(getJobs)
    .post(protect, authorize('recruiter'), createJob);

router.get('/recommended', protect, authorize('candidate'), getRecommendedJobs);

router.route('/myjobs')
    .get(protect, authorize('recruiter'), getMyJobs);

router.route('/:id')
    .get(getJobById)
    .delete(protect, authorize('recruiter'), deleteJob);

module.exports = router;
