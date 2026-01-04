import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
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
