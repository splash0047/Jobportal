import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs } from '../../redux/slices/jobSlice';
import { getJobApplications, updateApplicationStatus } from '../../redux/slices/applicationSlice';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableHead, TableRow, Button, Chip, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatWindow from '../../components/ChatWindow';
import ChatIcon from '@mui/icons-material/Chat';

const ApplicationsViewer = () => {
    const dispatch = useDispatch();
    const { myJobs } = useSelector((state) => state.jobs);
    const { jobApplications, loading } = useSelector((state) => state.applications);

    const [chatRecipient, setChatRecipient] = useState(null);

    useEffect(() => {
        dispatch(getMyJobs());
    }, [dispatch]);

    const handleExpandJob = (jobId) => {
        dispatch(getJobApplications(jobId));
    };

    const handleStatusUpdate = (appId, newStatus) => {
        dispatch(updateApplicationStatus({ id: appId, status: newStatus }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Applications Received
            </Typography>

            {myJobs.map((job) => (
                <Accordion key={job._id} onChange={(e, expanded) => expanded && handleExpandJob(job._id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{job.title} - {job.location}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {loading ? <Typography>Loading applications...</Typography> : (
                            jobApplications.length === 0 ? <Typography>No applications yet.</Typography> : (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Candidate</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell>AI Match</TableCell>
                                            <TableCell>Resume</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {jobApplications.map((app) => (
                                            <TableRow key={app._id}>
                                                <TableCell>{app.candidateId?.name}</TableCell>
                                                <TableCell>{app.candidateId?.email}</TableCell>
                                                <TableCell>{app.candidateId?.profile?.skills?.join(', ') || 'N/A'}</TableCell>
                                                <TableCell>
                                                    <Chip label={`${Math.round(app.matchScore)}%`} color={app.matchScore > 70 ? "success" : "default"} size="small" />
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={app.resumeURL} target="_blank" rel="noopener">View PDF</Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={app.status} color={app.status === 'Shortlisted' ? 'success' : app.status === 'Rejected' ? 'error' : 'primary'} variant="outlined" />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Button size="small" onClick={() => handleStatusUpdate(app._id, 'Shortlisted')} disabled={app.status === 'Shortlisted'}>Shortlist</Button>
                                                        <Button size="small" color="error" onClick={() => handleStatusUpdate(app._id, 'Rejected')} disabled={app.status === 'Rejected'}>Reject</Button>
                                                        <Button
                                                            size="small"
                                                            startIcon={<ChatIcon />}
                                                            variant="outlined"
                                                            onClick={() => setChatRecipient({ _id: app.candidateId._id, name: app.candidateId.name })}
                                                        >
                                                            Chat
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}

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

export default ApplicationsViewer;
