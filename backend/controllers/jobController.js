const Job = require('../models/Job');

// @desc    Get recommended jobs based on user skills
// @route   GET /api/jobs/recommended
// @access  Private (Candidate)
const getRecommendedJobs = async (req, res) => {
    try {
        const userSkills = req.user.profile?.skills || [];

        if (userSkills.length === 0) {
            return res.status(200).json([]); // No skills, no recommendations
        }

        const jobs = await Job.find();

        // Simple matching algorithm
        const recommendedJobs = jobs.map(job => {
            const jobSkills = job.skillsRequired || [];
            const intersection = jobSkills.filter(skill =>
                userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
            );
            const matchScore = (intersection.length / jobSkills.length) * 100 || 0;

            return { ...job.toObject(), matchScore };
        })
            .filter(job => job.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        res.status(200).json(recommendedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations' });
    }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
const createJob = async (req, res) => {
    const { title, description, skillsRequired, location, salary, type } = req.body;

    if (!title || !description || !skillsRequired || !location) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const job = await Job.create({
        title,
        description,
        skillsRequired,
        location,
        salary,
        type,
        recruiterId: req.user._id
    });

    res.status(201).json(job);
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    const jobs = await Job.find().populate('recruiterId', 'name company');
    res.status(200).json(jobs);
};

// @desc    Get jobs by current recruiter
// @route   GET /api/jobs/myjobs
// @access  Private (Recruiter)
const getMyJobs = async (req, res) => {
    const jobs = await Job.find({ recruiterId: req.user._id });
    res.status(200).json(jobs);
};


// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id).populate('recruiterId', 'name');

    if (job) {
        res.status(200).json(job);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter)
const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the recruiter who posted the job
    if (job.recruiterId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await job.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Job deleted' });
};

module.exports = {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    deleteJob,
    getRecommendedJobs
};
