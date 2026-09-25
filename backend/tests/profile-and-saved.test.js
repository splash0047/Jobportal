const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

process.env.JWT_SECRET = 'test-only-secret';
process.env.CLIENT_ORIGIN = 'http://localhost:5173';
const { server, io } = require('../server');

const candidateId = '64f000000000000000000002';
const recruiterId = '64f000000000000000000001';
const jobId = '64f000000000000000000004';

test('profiles persist and saved jobs belong to the authenticated candidate', async () => {
    const original = { findById: User.findById, updateOne: User.updateOne, jobById: Job.findById,
        jobCount: Job.countDocuments, appCount: Application.countDocuments };
    const users = {
        [candidateId]: { _id: candidateId, name: 'Candidate', role: 'candidate', profile: { bio: '' },
            savedJobs: [], async save() { return this; } },
        [recruiterId]: { _id: recruiterId, name: 'Recruiter', role: 'recruiter', companyProfile: {},
            async save() { return this; } }
    };
    const job = { _id: jobId, title: 'Engineer', recruiterId };
    const updates = [];
    User.findById = id => ({
        select: async () => users[String(id)] || null,
        populate: async () => ({ savedJobs: users[String(id)]?.savedJobs.map(() => job) || [] }),
        then: resolve => resolve(users[String(id)] || null)
    });
    User.updateOne = async (filter, operation) => { updates.push({ filter, operation }); return { modifiedCount: 1 }; };
    Job.findById = () => ({ populate: async () => job });
    Job.countDocuments = async filter => { assert.equal(String(filter.recruiterId), recruiterId); return 2; };
    Application.countDocuments = async filter => {
        assert.equal(String(filter.recruiterId), recruiterId);
        return filter.status === 'Shortlisted' ? 1 : 4;
    };
    try {
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        const base = `http://127.0.0.1:${server.address().port}`;
        const auth = id => ({ Authorization: `Bearer ${jwt.sign({ id }, process.env.JWT_SECRET)}` });
        const candidate = await fetch(`${base}/api/auth/me`, {
            method: 'PATCH', headers: { ...auth(candidateId), 'Content-Type': 'application/json' },
            body: JSON.stringify({ bio: 'Backend developer' })
        });
        assert.equal(candidate.status, 200);
        assert.equal((await candidate.json()).profile.bio, 'Backend developer');

        const badCompany = await fetch(`${base}/api/auth/me`, {
            method: 'PATCH', headers: { ...auth(recruiterId), 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Acme', website: 'not a website' })
        });
        assert.equal(badCompany.status, 400);
        const company = await fetch(`${base}/api/auth/me`, {
            method: 'PATCH', headers: { ...auth(recruiterId), 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Acme', website: 'https://example.com' })
        });
        assert.equal(company.status, 200);
        assert.equal((await company.json()).companyProfile.name, 'Acme');

        const counts = await fetch(`${base}/api/jobs/stats`, { headers: auth(recruiterId) });
        assert.deepEqual(await counts.json(), { activeJobs: 2, totalApplicants: 4, shortlisted: 1 });
        const forbiddenCounts = await fetch(`${base}/api/jobs/stats`, { headers: auth(candidateId) });
        assert.equal(forbiddenCounts.status, 403);

        const recruiterSave = await fetch(`${base}/api/jobs/${jobId}/save`, { method: 'PUT', headers: auth(recruiterId) });
        assert.equal(recruiterSave.status, 403);
        const saved = await fetch(`${base}/api/jobs/${jobId}/save`, { method: 'PUT', headers: auth(candidateId) });
        assert.equal(saved.status, 200);
        assert.equal(updates[0].filter._id, candidateId);
        assert.equal(String(updates[0].operation.$addToSet.savedJobs), jobId);
        const removed = await fetch(`${base}/api/jobs/${jobId}/save`, { method: 'DELETE', headers: auth(candidateId) });
        assert.equal(removed.status, 200);
        assert.equal(String(updates[1].operation.$pull.savedJobs), jobId);
    } finally {
        await new Promise(resolve => io.close(resolve));
        User.findById = original.findById;
        User.updateOne = original.updateOne;
        Job.findById = original.jobById;
        Job.countDocuments = original.jobCount;
        Application.countDocuments = original.appCount;
    }
});
