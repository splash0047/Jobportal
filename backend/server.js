const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Message = require('./models/Message');
const canChat = require('./utils/chatAccess');
const { rateLimit } = require('express-rate-limit');

// Load env vars
dotenv.config();

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim());

// Middleware
app.use(express.json({ limit: '100kb' }));
app.use(cors({ origin: allowedOrigins }));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
            "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"], // Allow scripts if needed too
            "img-src": ["'self'", "data:", "https://res.cloudinary.com"], // Allow Cloudinary images
        },
    },
}));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use('/api/auth/register', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use((error, req, res, next) => {
    console.error('Request failed:', error);
    if (res.headersSent) return next(error);
    res.status(500).json({ message: 'Internal server error' });
});


// Create Server
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
    }
});
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('Authentication required'));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('_id role');
        if (!user) return next(new Error('Authentication required'));
        socket.user = user;
        next();
    } catch (_) { next(new Error('Authentication required')); }
});

io.on('connection', (socket) => {
    const senderId = socket.user._id.toString();
    socket.join(senderId);
    socket.on('send_message', async (payload, acknowledge) => {
        try {
            const { receiverId, message } = payload || {};
            if (typeof message !== 'string' || !message.trim() || message.length > 2000 ||
                !(await canChat(senderId, receiverId))) {
                if (typeof acknowledge === 'function') acknowledge({ error: 'Invalid recipient or message' });
                return;
            }
            const newMessage = await Message.create({ senderId, receiverId, message: message.trim() });
            io.to(receiverId).emit('receive_message', newMessage);
            io.to(senderId).emit('receive_message', newMessage);
            if (typeof acknowledge === 'function') acknowledge({ ok: true });
        } catch (error) {
            console.error('Error saving message:', error);
            if (typeof acknowledge === 'function') acknowledge({ error: 'Message failed' });
        }
    });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
module.exports = { app, server, io };
