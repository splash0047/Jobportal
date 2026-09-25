const Application = require('../models/Application');
const Job = require('../models/Job');
const mongoose = require('mongoose');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Candidate)
const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    if (!mongoose.isValidObjectId(jobId)) return res.status(400).json({ message: 'Invalid job ID' });

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
        jobId,
        candidateId: req.user._id
    });

    if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Calculate match score (Basic logic for now, can be improved with AI)
    let matchScore = 0;
    if (req.user.profile && req.user.profile.skills && job.skillsRequired) {
        const userSkills = req.user.profile.skills;
        const jobSkills = job.skillsRequired;
        const intersection = jobSkills.filter(skill =>
            userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
        );
        matchScore = (intersection.length / jobSkills.length) * 100;
    }

    if (!req.user.resumeURL) return res.status(400).json({ message: 'Upload a resume before applying' });
    let application;
    try { application = await Application.create({
        jobId,
        candidateId: req.user._id,
        recruiterId: job.recruiterId, // Store for easier querying by recruiter
        resumeURL: req.user.resumeURL,
        matchScore
    }); } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: 'You have already applied for this job' });
        throw error;
    }

    res.status(201).json(application);
};

// @desc    Get applications for a specific job (Recruiter)
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter)
const getJobApplications = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.jobId)) return res.status(400).json({ message: 'Invalid job ID' });
    const job = await Job.findOne({ _id: req.params.jobId, recruiterId: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    const applications = await Application.find({ jobId: req.params.jobId })
        .populate('candidateId', 'name email profile')
        .sort({ matchScore: -1 }); // Sort by best match

    res.status(200).json(applications);
};

// @desc    Get my applications (Candidate)
// @route   GET /api/applications/my
// @access  Private (Candidate)
const getMyApplications = async (req, res) => {
    const applications = await Application.find({ candidateId: req.user._id })
        .populate('jobId', 'title company location type')
        .populate('recruiterId', 'name')
        .sort({ createdAt: -1 });

    res.status(200).json(applications);
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter)
const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid application ID' });
    if (!['Applied', 'Shortlisted', 'Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    if (application.recruiterId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.status(200).json(application);
};

module.exports = {
    applyForJob,
    getJobApplications,
    getMyApplications,
    updateApplicationStatus
};
