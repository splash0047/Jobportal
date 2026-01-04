import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { initiateSocketConnection, disconnectSocket, joinChatRoom, sendMessage, subscribeToMessages } from '../services/socketService';
import API from '../services/api';

const ChatWindow = ({ recipientId, recipientName, onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Fetch history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await API.get(`/chat/${recipientId}`);
                setMessages(data);
            } catch (error) {
                console.error('Failed to load chat history', error);
            }
        };
        if (recipientId) fetchHistory();
    }, [recipientId]);

    // Socket Connection
    useEffect(() => {
        if (user && recipientId) {
            initiateSocketConnection(user.token); // Pass token if auth logic in socket needed
            joinChatRoom(user._id);

            subscribeToMessages((message) => {
                if (
                    (message.senderId === recipientId && message.receiverId === user._id) ||
                    (message.senderId === user._id && message.receiverId === recipientId)
                ) {
                    setMessages((prev) => [...prev, message]);
                }
            });

            return () => {
                disconnectSocket();
            };
        }
    }, [user, recipientId]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            const messageData = {
                senderId: user._id,
                receiverId: recipientId,
                message: newMessage
            };
            sendMessage(messageData);
            setNewMessage('');
        }
    };

    return (
        <Paper
            elevation={6}
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 350,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1000
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">{recipientName}</Typography>
                <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index} sx={{ flexDirection: 'column', alignItems: msg.senderId === user._id ? 'flex-end' : 'flex-start' }}>
                            <Box
                                sx={{
                                    bgcolor: msg.senderId === user._id ? 'primary.light' : 'white',
                                    color: msg.senderId === user._id ? 'white' : 'text.primary',
                                    p: 1.5,
                                    borderRadius: 2,
                                    maxWidth: '80%',
                                    boxShadow: 1
                                }}
                            >
                                <Typography variant="body2">{msg.message}</Typography>
                            </Box>
                            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Box>

            <Divider />

            {/* Input Area */}
            <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatWindow;
