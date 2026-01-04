import io from 'socket.io-client';

// Use VITE_API_URL from .env, remove '/api' if present (so it points to root for socket)
const ENDPOINT = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace('/api', '');
let socket;

export const initiateSocketConnection = (token) => {
    socket = io(ENDPOINT, {
        auth: {
            token,
        },
    });
    console.log('Connecting to socket...');
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const joinChatRoom = (userId) => {
    if (socket && userId) {
        socket.emit('join_chat', userId);
    }
};

export const sendMessage = (messageData) => {
    if (socket) socket.emit('send_message', messageData);
};

export const subscribeToMessages = (cb) => {
    if (!socket) return;
    socket.on('receive_message', (message) => {
        cb(message);
    });
};

export const getSocket = () => socket;
