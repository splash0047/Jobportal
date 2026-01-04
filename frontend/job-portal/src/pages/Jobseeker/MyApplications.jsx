import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyApplications } from '../../redux/slices/applicationSlice';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatWindow from '../../components/ChatWindow';

const MyApplications = () => {
    const dispatch = useDispatch();
    const { myApplications, loading } = useSelector((state) => state.applications);
    const [chatRecipient, setChatRecipient] = useState(null);

    useEffect(() => {
        dispatch(getMyApplications());
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Applications
            </Typography>

            <Paper elevation={2}>
                {loading ? <Typography sx={{ p: 2 }}>Loading...</Typography> : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Date Applied</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myApplications.map((app) => (
                                <TableRow key={app._id}>
                                    <TableCell>{app.jobId?.title || 'Job Removed'}</TableCell>
                                    <TableCell>{app.jobId?.company || 'N/A'}</TableCell>
                                    <TableCell>{app.jobId?.location || 'N/A'}</TableCell>
                                    <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={app.status}
                                            color={app.status === 'Shortlisted' ? 'success' : app.status === 'Rejected' ? 'error' : 'default'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {/* Only allow chat if shortlisted or if recruiter initiated (simplified here to always allow if recruiter info available) */}
                                        <Button
                                            size="small"
                                            startIcon={<ChatIcon />}
                                            onClick={() => setChatRecipient({ _id: app.recruiterId, name: 'Recruiter' })}
                                        >
                                            Chat
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>

            {chatRecipient && (
                <ChatWindow
                    recipientId={chatRecipient._id}
                    recipientName={chatRecipient.name}
                    onClose={() => setChatRecipient(null)}
                />
            )}
        </Container>
    );
};

export default MyApplications;
