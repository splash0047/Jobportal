import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Send, X } from 'lucide-react';
import { initiateSocketConnection, disconnectSocket, joinChatRoom, sendMessage, subscribeToMessages } from '../services/socketService';
import API from '../services/api';

const ChatWindow = ({ recipientId, recipientName, onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Fetch chat history
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

    // Socket Connection Setup
    useEffect(() => {
        if (user && recipientId) {
            initiateSocketConnection(user.token);
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

    // Auto-scroll to bottom on new messages
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
        <div className="fixed bottom-5 right-5 w-[360px] h-[520px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col z-50 overflow-hidden font-sans text-left transition-colors duration-300">
            {/* Chat Header */}
            <div className="bg-slate-900 dark:bg-slate-950 px-4 py-3.5 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm tracking-tight text-white font-display uppercase">
                        {recipientName?.charAt(0) || 'C'}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold truncate max-w-[200px]">{recipientName}</h4>
                        <p className="text-[9px] font-bold text-accent-emerald uppercase tracking-wider">Online</p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/20 space-y-4">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === user._id;
                    return (
                        <div 
                            key={index} 
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                            <div
                                className={`p-3 rounded-2xl text-sm font-semibold max-w-[82%] shadow-sm ${
                                    isMe 
                                        ? 'bg-brand-indigo text-white rounded-tr-sm' 
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200/50 dark:border-slate-850 rounded-tl-sm'
                                }`}
                            >
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 mt-1 uppercase tracking-wider px-1">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Container */}
            <div className="p-3.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex items-center gap-2 shrink-0">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 rounded-xl text-sm bg-slate-50 dark:bg-slate-950/40 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white"
                />
                <button 
                    onClick={handleSend}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
