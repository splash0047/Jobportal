import { Briefcase, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentActivity = ({ jobs }) => {
    const navigate = useNavigate();
    const recentJobs = jobs.slice(0, 3);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left transition-colors duration-300">
            {/* Recent Job Posts */}
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Recent Job Postings</h3>
                        <button 
                            onClick={() => navigate('/manage-jobs')}
                            className="text-xs font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors cursor-pointer"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-3.5">
                        {recentJobs.length > 0 ? (
                            recentJobs.map((job) => (
                                <div key={job._id} className="flex items-center p-3.5 border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-950/20 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                                    <div className="w-9 h-9 bg-slate-100 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 rounded-lg text-slate-650 dark:text-slate-400 flex items-center justify-center mr-4">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{job.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5 truncate">{job.location} • {new Date(job.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className="px-2.5 py-1 text-[10px] font-bold text-accent-emerald-dark dark:text-accent-emerald bg-accent-emerald/8 dark:bg-accent-emerald/10 border border-accent-emerald/15 dark:border-accent-emerald/20 rounded-md shrink-0">
                                        Active
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 dark:text-slate-550 font-medium text-sm text-center py-6">No recent jobs posted.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Recent Applications</h3>
                        <button 
                            onClick={() => navigate('/applications')}
                            className="text-xs font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors cursor-pointer"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-3.5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-3.5 border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-950/20 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                                <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white dark:text-slate-200 font-bold text-sm shadow-sm mr-4 font-display shrink-0">
                                    {String.fromCharCode(64 + i)}J
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Candidate Profile {i}</h4>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5 truncate">Applied for Full-stack Engineer</p>
                                </div>
                                <div className="flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-550 shrink-0 uppercase tracking-wider">
                                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-300 dark:text-slate-600" />
                                    {i}d ago
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
