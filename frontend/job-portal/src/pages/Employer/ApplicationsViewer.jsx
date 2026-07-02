import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs } from '../../redux/slices/jobSlice';
import { getJobApplications, updateApplicationStatus } from '../../redux/slices/applicationSlice';
import { ChevronDown, MessageSquare, ExternalLink, UserCheck, UserX, Briefcase } from 'lucide-react';
import ChatWindow from '../../components/ChatWindow';
import EmployerLayout from './components/EmployerLayout';

const ApplicationsViewer = () => {
    const dispatch = useDispatch();
    const { myJobs } = useSelector((state) => state.jobs);
    const { jobApplications, loading } = useSelector((state) => state.applications);

    const [expandedJobId, setExpandedJobId] = useState(null);
    const [chatRecipient, setChatRecipient] = useState(null);

    useEffect(() => {
        dispatch(getMyJobs());
    }, [dispatch]);

    const handleToggleJob = (jobId) => {
        if (expandedJobId === jobId) {
            setExpandedJobId(null);
        } else {
            setExpandedJobId(jobId);
            dispatch(getJobApplications(jobId));
        }
    };

    const handleStatusUpdate = (appId, newStatus) => {
        dispatch(updateApplicationStatus({ id: appId, status: newStatus }));
    };

    return (
        <EmployerLayout>
            <div className="mb-8 text-left transition-colors duration-300">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Applications Received</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Review candidates, check AI matching scores, shortlist, and start chats.</p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4 max-w-5xl text-left transition-colors">
                {myJobs.map((job) => {
                    const isExpanded = expandedJobId === job._id;
                    return (
                        <div key={job._id} className="bg-canvas-card dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
                            {/* Accordion Trigger */}
                            <button
                                onClick={() => handleToggleJob(job._id)}
                                className="flex justify-between items-center w-full p-5 text-left font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors focus:outline-none cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 rounded-lg flex items-center justify-center text-slate-655 dark:text-slate-400 shrink-0">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">{job.location} • {job.type}</p>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-slate-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Accordion Content */}
                            {isExpanded && (
                                <div className="border-t border-slate-100 dark:border-slate-800/65 p-5 bg-slate-50/10 dark:bg-slate-950/10">
                                    {loading ? (
                                        <div className="flex justify-center items-center py-10 gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-indigo border-t-transparent"></div>
                                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Loading applicant data...</span>
                                        </div>
                                    ) : jobApplications.length === 0 ? (
                                        <p className="text-center py-10 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">No applications received yet.</p>
                                    ) : (
                                        <div className="overflow-x-auto border border-slate-200/60 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50 dark:bg-slate-950/45 border-b border-slate-200/40 dark:border-slate-800/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                        <th className="px-6 py-4 text-left">Candidate</th>
                                                        <th className="px-6 py-4 text-left">Resume Skills</th>
                                                        <th className="px-6 py-4 text-left">AI Match</th>
                                                        <th className="px-6 py-4 text-left">Status</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                                                    {jobApplications.map((app) => (
                                                        <tr key={app._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/20 transition-colors">
                                                            {/* Candidate Info */}
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{app.candidateId?.name}</div>
                                                                <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{app.candidateId?.email}</div>
                                                            </td>
                                                            {/* Extracted Skills */}
                                                            <td className="px-6 py-4 max-w-[200px] truncate">
                                                                <div className="text-xs font-semibold text-slate-655 dark:text-slate-400">
                                                                    {app.candidateId?.profile?.skills?.join(', ') || 'None extracted'}
                                                                </div>
                                                            </td>
                                                            {/* AI Matching Score with Pulse Ring */}
                                                            <td className="px-6 py-4">
                                                                <div className="relative inline-flex">
                                                                    {app.matchScore > 70 && (
                                                                        <span className="absolute -inset-0.5 rounded-md bg-accent-emerald/20 border border-accent-emerald/30 animate-pulse-ring pointer-events-none"></span>
                                                                    )}
                                                                    <span className={`relative inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border transition-colors ${
                                                                        app.matchScore > 70 
                                                                            ? 'bg-accent-emerald/8 text-accent-emerald-dark dark:text-accent-emerald border-accent-emerald/15 dark:border-accent-emerald/25' 
                                                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800/60'
                                                                    }`}>
                                                                        {Math.round(app.matchScore)}%
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            {/* Application Status */}
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                                                                    app.status === 'Shortlisted' 
                                                                        ? 'bg-accent-emerald/8 dark:bg-accent-emerald/10 text-accent-emerald-dark dark:text-accent-emerald border-accent-emerald/15 dark:border-accent-emerald/20' 
                                                                        : app.status === 'Rejected' 
                                                                            ? 'bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-750 dark:text-red-400' 
                                                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-405 dark:text-slate-500 border-slate-200 dark:border-slate-800/60'
                                                                }`}>
                                                                    {app.status}
                                                                </span>
                                                            </td>
                                                            {/* Actions Buttons */}
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    {app.resumeURL && (
                                                                        <a 
                                                                            href={app.resumeURL} 
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer" 
                                                                            className="inline-flex items-center px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                                                                            title="View PDF Resume"
                                                                        >
                                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                                        </a>
                                                                    )}
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(app._id, 'Shortlisted')}
                                                                        disabled={app.status === 'Shortlisted'}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                                        title="Shortlist Candidate"
                                                                    >
                                                                        <UserCheck className="w-3.5 h-3.5" />
                                                                        <span className="hidden sm:inline">Shortlist</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                                                        disabled={app.status === 'Rejected'}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/15 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                                        title="Reject Candidate"
                                                                    >
                                                                        <UserX className="w-3.5 h-3.5" />
                                                                        <span className="hidden sm:inline">Reject</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setChatRecipient({ _id: app.candidateId._id, name: app.candidateId.name })}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-350 hover:bg-slate-55 dark:hover:bg-slate-800/50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                                                        title="Start Chat Session"
                                                                    >
                                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                                        <span className="hidden sm:inline">Chat</span>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {chatRecipient && (
                <ChatWindow
                    recipientId={chatRecipient._id}
                    recipientName={chatRecipient.name}
                    onClose={() => setChatRecipient(null)}
                />
            )}
        </EmployerLayout>
    );
};

export default ApplicationsViewer;
