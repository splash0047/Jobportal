const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { io: connect } = require('socket.io-client');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Message = require('../models/Message');
const cloudinary = require('cloudinary').v2;

process.env.JWT_SECRET = 'local-test-secret';
process.env.CLIENT_ORIGIN = 'http://localhost:5173';
const { server, io } = require('../server');

const recruiter = '64f000000000000000000001';
const candidate = '64f000000000000000000002';
const stranger = '64f000000000000000000003';
const job = '64f000000000000000000004';

test('authenticated API and socket enforce ownership, identity and PDF validation', async () => {
    const originals = {
        findById: User.findById, findOne: Job.findOne, applicationById: Application.findOne,
        jobById: Job.findById, appCreate: Application.create, appFindOne: Application.findOne,
        appFind: Application.find,
        exists: Application.exists, create: Message.create,
        privateDownload: cloudinary.utils.private_download_url
    };
    const created = [];
    const clients = [];
    User.findById = id => ({ select: async () =>
        [recruiter, candidate, stranger].includes(String(id)) ? { _id: String(id), role: id === candidate ? 'candidate' : 'recruiter', name: 'Test', resumeAsset: id === candidate ? { publicId: 'resumes/test', resourceType: 'image' } : undefined } : null
    });
    Job.findOne = async () => null;
    Job.findById = async () => ({ _id: job, recruiterId: recruiter, skillsRequired: ['Python'] });
    Application.findOne = async () => null;
    Application.create = async () => { const error = new Error('duplicate'); error.code = 11000; throw error; };
    Application.exists = async filter => filter.$or.some(row =>
        String(row.candidateId) === candidate && String(row.recruiterId) === recruiter
    );
    Message.create = async value => { created.push(value); return { _id: 'message1', ...value }; };
    const token = id => jwt.sign({ id }, process.env.JWT_SECRET);

    try {
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        const base = `http://127.0.0.1:${server.address().port}`;
        const denied = await fetch(`${base}/api/applications/job/${job}`, {
            headers: { Authorization: `Bearer ${token(recruiter)}` }
        });
        assert.equal(denied.status, 404);

        const missingUser = await fetch(`${base}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token('64f000000000000000000099')}` }
        });
        assert.equal(missingUser.status, 401);
        const me = await fetch(`${base}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token(candidate)}` }
        });
        const meData = await me.json();
        assert.equal(meData._id, candidate);
        assert.equal(meData.hasResume, true);
        assert.equal(meData.resumeURL, undefined);
        const forbiddenResume = await fetch(`${base}/api/resume/mine`, { headers: { Authorization: `Bearer ${token(recruiter)}` } });
        assert.equal(forbiddenResume.status, 403);
        Application.findOne = async () => null;
        const otherResume = await fetch(`${base}/api/resume/applications/${job}`, { headers: { Authorization: `Bearer ${token(recruiter)}` } });
        assert.equal(otherResume.status, 404);

        const candidateJob = await fetch(`${base}/api/jobs`, {
            method: 'POST', headers: { Authorization: `Bearer ${token(candidate)}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Engineer', description: 'Build reliable services', location: 'Pune', skillsRequired: ['Python'] })
        });
        assert.equal(candidateJob.status, 403);
        const duplicate = await fetch(`${base}/api/applications`, {
            method: 'POST', headers: { Authorization: `Bearer ${token(candidate)}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: job, resumeURL: 'https://attacker.example/forged.pdf' })
        });
        assert.equal(duplicate.status, 409);
        cloudinary.utils.private_download_url = (publicId, format, options) => {
            assert.equal(publicId, 'resumes/test');
            assert.equal(format, 'pdf');
            assert.equal(options.type, 'authenticated');
            return 'https://api.cloudinary.com/signed-test-url';
        };
        const ownResume = await fetch(`${base}/api/resume/mine`, { headers: { Authorization: `Bearer ${token(candidate)}` } });
        assert.equal(ownResume.status, 200);
        assert.equal(ownResume.headers.get('cache-control'), 'no-store');
        assert.equal((await ownResume.json()).url, 'https://api.cloudinary.com/signed-test-url');
        Application.find = () => ({
            populate() { return this; },
            sort: async () => [{
                resumeURL: 'https://example.org/legacy-public.pdf',
                resumeAsset: { publicId: 'resumes/test', resourceType: 'image' },
                toObject() { return { resumeURL: this.resumeURL, resumeAsset: this.resumeAsset, jobId: job }; }
            }]
        });
        const ownApplications = await fetch(`${base}/api/applications/my`, { headers: { Authorization: `Bearer ${token(candidate)}` } });
        assert.equal(ownApplications.status, 200);
        assert.deepEqual((await ownApplications.json())[0], { jobId: job, hasResume: true });
        Application.findOne = async filter => {
            if (String(filter.recruiterId) !== recruiter) return null;
            return { resumeAsset: { publicId: 'resumes/test', resourceType: 'image' } };
        };
        const recruiterResume = await fetch(`${base}/api/resume/applications/${job}`, { headers: { Authorization: `Bearer ${token(recruiter)}` } });
        assert.equal(recruiterResume.status, 200);
        const candidateApplication = await fetch(`${base}/api/resume/applications/${job}`, { headers: { Authorization: `Bearer ${token(candidate)}` } });
        assert.equal(candidateApplication.status, 403);

        const invalidPdf = await fetch(`${base}/api/resume/upload`, {
            method: 'POST', headers: { Authorization: `Bearer ${token(candidate)}` },
            body: (() => { const form = new FormData(); form.append('resume', new Blob(['not a pdf'], { type: 'text/plain' }), 'resume.txt'); return form; })()
        });
        assert.equal(invalidPdf.status, 400);

        const previousEnv = process.env.NODE_ENV;
        const previousScanner = process.env.CLAMSCAN_COMMAND;
        process.env.NODE_ENV = 'production';
        delete process.env.CLAMSCAN_COMMAND;
        try {
            const unscanned = await fetch(`${base}/api/resume/upload`, {
                method: 'POST', headers: { Authorization: `Bearer ${token(candidate)}` },
                body: (() => { const form = new FormData(); form.append('resume', new Blob(['%PDF-1.4\n'], { type: 'application/pdf' }), 'resume.pdf'); return form; })()
            });
            assert.equal(unscanned.status, 503);
            process.env.CLAMSCAN_COMMAND = '/bin/false';
            const infected = await fetch(`${base}/api/resume/upload`, {
                method: 'POST', headers: { Authorization: `Bearer ${token(candidate)}` },
                body: (() => { const form = new FormData(); form.append('resume', new Blob(['%PDF-1.4\n'], { type: 'application/pdf' }), 'resume.pdf'); return form; })()
            });
            assert.equal(infected.status, 422);
        } finally {
            if (previousEnv === undefined) delete process.env.NODE_ENV;
            else process.env.NODE_ENV = previousEnv;
            if (previousScanner === undefined) delete process.env.CLAMSCAN_COMMAND;
            else process.env.CLAMSCAN_COMMAND = previousScanner;
        }

        const openSocket = auth => connect(base, { transports: ['websocket'], reconnection: false, auth });
        const unauthenticated = openSocket({}); clients.push(unauthenticated);
        assert.match(await new Promise(resolve => unauthenticated.once('connect_error', err => resolve(err.message))), /Authentication/);

        const socket = openSocket({ token: token(candidate) }); clients.push(socket);
        await new Promise((resolve, reject) => { socket.once('connect', resolve); socket.once('connect_error', reject); });
        assert.equal(io.sockets.adapter.rooms.get(candidate)?.has(socket.id), true);
        socket.emit('join_chat', stranger); // legacy event cannot join somebody else's room
        assert.equal(io.sockets.adapter.rooms.get(stranger)?.has(socket.id) || false, false);

        const rejected = await new Promise(resolve => socket.emit('send_message', { senderId: recruiter, receiverId: stranger, message: 'hello' }, resolve));
        assert.match(rejected.error, /Invalid/);
        assert.equal(created.length, 0);

        const accepted = await new Promise(resolve => socket.emit('send_message', { senderId: recruiter, receiverId: recruiter, message: 'hello' }, resolve));
        assert.equal(accepted.ok, true);
        assert.equal(created[0].senderId, candidate);
    } finally {
        clients.forEach(client => client.disconnect());
        await new Promise(resolve => io.close(resolve));
        User.findById = originals.findById;
        Job.findOne = originals.findOne;
        Job.findById = originals.jobById;
        Application.create = originals.appCreate;
        Application.findOne = originals.appFindOne;
        Application.find = originals.appFind;
        Application.exists = originals.exists;
        Message.create = originals.create;
        cloudinary.utils.private_download_url = originals.privateDownload;
    }
});
