const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// Connect to database
// // Connect to database
// connectDB(); // Called before server listen // Called before server listen

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
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

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));


// Create Server
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const Message = require('./models/Message');

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join_chat', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined chat`);
    });

    socket.on('send_message', async ({ senderId, receiverId, message }) => {
        // Save to DB
        try {
            const newMessage = await Message.create({ senderId, receiverId, message });

            // Emit to receiver
            io.to(receiverId).emit('receive_message', newMessage);

            // Emit back to sender (for confirmation/optimistic UI)
            io.to(senderId).emit('receive_message', newMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
