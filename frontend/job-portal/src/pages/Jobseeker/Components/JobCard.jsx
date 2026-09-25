import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Clock, Calendar, Briefcase } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { saveJob, unsaveJob } from '../../../redux/slices/jobSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const isSaved = useSelector(state => state.jobs.savedJobs.some(saved => saved._id === job._id));
    const [saving, setSaving] = useState(false);
    const toggleSaved = async () => {
        if (!user) return navigate('/login');
        if (user.role !== 'candidate' || saving) return;
        setSaving(true);
        try { await dispatch(isSaved ? unsaveJob(job._id) : saveJob(job._id)).unwrap(); }
        catch (error) { toast.error(error?.message || 'Could not update saved jobs'); }
        finally { setSaving(false); }
    };
    const postedDate = new Date(job.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-350 dark:hover:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between text-left group">
            <div>
                {/* Header info */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                        {/* Company Logo Placeholder */}
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 rounded-xl flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:bg-brand-indigo/5 dark:group-hover:bg-brand-indigo/10 group-hover:text-brand-indigo transition-colors shrink-0">
                            {job.recruiterId?.companyProfile?.name?.charAt(0) || <Briefcase className="w-5 h-5" />}
                        </div>
                        <div className="ml-3.5 overflow-hidden">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-indigo dark:group-hover:text-brand-indigo transition-colors truncate">
                                {job.title}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 truncate">
                                {job.recruiterId?.companyProfile?.name || 'Company Confidential'}
                            </p>
                        </div>
                    </div>
                    {(!user || user.role === 'candidate') && <button type="button" onClick={toggleSaved} disabled={saving}
                        aria-label={isSaved ? 'Remove saved job' : 'Save job'} title={isSaved ? 'Remove saved job' : 'Save job'}
                        className={`transition-colors p-1 shrink-0 ${isSaved ? 'text-brand-indigo' : 'text-slate-400 hover:text-brand-indigo'}`}>
                        <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>}
                </div>

                {/* Organization Details Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" /> {job.location}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-accent-emerald/8 dark:bg-accent-emerald/10 border border-accent-emerald/15 dark:border-accent-emerald/20 text-accent-emerald-dark dark:text-accent-emerald">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {job.type}
                    </span>
                    {job.category && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-indigo/5 dark:bg-brand-indigo/10 border border-brand-indigo/15 dark:border-brand-indigo/20 text-brand-indigo">
                            {job.category}
                        </span>
                    )}
                </div>
            </div>

            {/* Bottom info row */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>{postedDate}</span>
                </div>

                <div className="flex items-center gap-4">
                    {job.salary && (
                        <div className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                            {job.salary}
                        </div>
                    )}

                    <button
                        onClick={() => navigate(`/jobs/${job._id}`)}
                        className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
