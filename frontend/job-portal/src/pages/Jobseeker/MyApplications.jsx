import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyApplications } from '../../redux/slices/applicationSlice';
import { MessageSquare, Calendar, MapPin, Briefcase } from 'lucide-react';
import ChatWindow from '../../components/ChatWindow';
import JobSeekerLayout from './Components/JobSeekerLayout';

const MyApplications = () => {
    const dispatch = useDispatch();
    const { myApplications, loading } = useSelector((state) => state.applications);
    const [chatRecipient, setChatRecipient] = useState(null);

    useEffect(() => {
        dispatch(getMyApplications());
    }, [dispatch]);

    return (
        <JobSeekerLayout>
            <div className="mb-8 text-left transition-colors duration-300">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">My Applications</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">Track the status of your submitted job applications and chat with recruiters.</p>
            </div>

            {/* Table Container */}
            <div className="bg-canvas-card dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden text-left max-w-5xl transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950/45 border-b border-slate-200/40 dark:border-slate-800/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-4 text-left">Job Position</th>
                            <th className="px-6 py-4 text-left">Company</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Date Applied</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-slate-405 dark:text-slate-500 font-medium text-sm">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-indigo border-t-transparent"></div>
                                            <span>Loading your applications...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : myApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-slate-405 dark:text-slate-500 font-medium text-sm">
                                        You haven't applied to any jobs yet.
                                    </td>
                                </tr>
                            ) : (
                                myApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">{app.jobId?.title || 'Job Removed'}</div>
                                            <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{app.jobId?.category || 'General'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-350 flex items-center">
                                                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                                                {app.jobId?.company || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                                                {app.jobId?.location || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                                                {new Date(app.createdAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                                                app.status === 'Shortlisted' 
                                                    ? 'bg-accent-emerald/8 dark:bg-accent-emerald/10 text-accent-emerald-dark dark:text-accent-emerald border-accent-emerald/15 dark:border-accent-emerald/20' 
                                                    : app.status === 'Rejected' 
                                                        ? 'bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400' 
                                                        : 'bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800/60'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setChatRecipient({ _id: app.recruiterId, name: app.jobId?.company || 'Recruiter' })}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                            >
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                Chat
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {chatRecipient && (
                <ChatWindow
                    recipientId={chatRecipient._id}
                    recipientName={chatRecipient.name}
                    onClose={() => setChatRecipient(null)}
                />
            )}
        </JobSeekerLayout>
    );
};

export default MyApplications;
