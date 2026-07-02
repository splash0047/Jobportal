import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../redux/slices/jobSlice';
import { applyForJob } from '../../redux/slices/applicationSlice';
import JobSeekerLayout from './Components/JobSeekerLayout';
import { MapPin, Briefcase, Calendar, DollarSign, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.applications);

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    dispatch(getJobById(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (success) setIsApplied(true);
  }, [success]);

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!user.resumeURL) {
      alert('Please upload a resume in your profile first!');
      navigate('/profile');
      return;
    }
    dispatch(applyForJob({ jobId, resumeURL: user.resumeURL }));
  };

  if (loading) return (
    <JobSeekerLayout>
      <div className="space-y-6 text-left">
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between h-[180px]">
          <div className="flex items-center gap-5 w-full">
            <div className="w-14 h-14 rounded-xl animate-shimmer shrink-0"></div>
            <div className="space-y-2.5 flex-1 max-w-sm">
              <div className="h-6 rounded animate-shimmer w-full"></div>
              <div className="h-4 rounded animate-shimmer w-2/3"></div>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-6 flex gap-2 w-1/4">
            <div className="h-6 rounded animate-shimmer w-1/3"></div>
            <div className="h-6 rounded animate-shimmer w-1/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 h-24 animate-shimmer"></div>
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800/80 h-64 animate-shimmer"></div>
          </div>
          <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 h-48 animate-shimmer"></div>
        </div>
      </div>
    </JobSeekerLayout>
  );

  if (error || !job) return (
    <JobSeekerLayout>
      <div className="text-center py-16 bg-canvas-card dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display text-center">Opportunity not found</h2>
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/find-jobs')} 
            className="text-sm font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors"
          >
            Go back to search listings
          </button>
        </div>
      </div>
    </JobSeekerLayout>
  );

  return (
    <JobSeekerLayout>
      <div className="text-left space-y-6">
        {/* Header Hero Card */}
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 rounded-xl flex items-center justify-center text-xl font-bold text-slate-500 dark:text-slate-450 shrink-0">
                {job.recruiterId?.company?.charAt(0) || <Briefcase className="w-6 h-6" />}
              </div>
              <div className="overflow-hidden">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display truncate">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400 dark:text-slate-500" /> {job.location}</span>
                  <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-slate-400 dark:text-slate-500" /> {job.recruiterId?.company || 'Confidential'}</span>
                </div>
              </div>
            </div>

            {isApplied ? (
              <button disabled className="bg-accent-emerald/8 dark:bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-dark dark:text-accent-emerald px-8 py-3.5 rounded-xl font-bold flex items-center text-sm shrink-0">
                <CheckCircle className="w-4 h-4 mr-2" /> Applied
              </button>
            ) : (
              <button
                onClick={handleApply}
                className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer shrink-0"
              >
                Apply Now
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
            <span className="bg-brand-indigo/5 dark:bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/15 dark:border-brand-indigo/25 px-3 py-1 rounded-md text-xs font-semibold">{job.category || 'Engineering'}</span>
            <span className="bg-accent-emerald/8 dark:bg-accent-emerald/10 text-accent-emerald-dark dark:text-accent-emerald border border-accent-emerald/15 px-3 py-1 rounded-md text-xs font-semibold">{job.type}</span>
            <span className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40 px-3 py-1 rounded-md text-xs font-semibold flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" /> Posted {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Job Details) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compensation Card */}
            {job.salary && (
              <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Annual Compensation</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    {job.salary} <span className="text-sm font-semibold text-slate-400 dark:text-slate-550">/ year</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 px-4 py-2 border border-slate-200/40 dark:border-slate-800/40 rounded-xl text-accent-emerald-dark dark:text-accent-emerald font-bold text-xs shadow-sm flex items-center">
                  <DollarSign className="w-3.5 h-3.5 mr-1" /> Competitive
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-6 bg-brand-indigo rounded-full mr-3.5"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">About This Role</h3>
              </div>
              <div className="prose max-w-none text-slate-600 dark:text-slate-350 leading-relaxed text-sm whitespace-pre-line font-medium">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-6 bg-slate-800 dark:bg-slate-500 rounded-full mr-3.5"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">What We're Looking For</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.skillsRequired.map((skill, index) => (
                  <li key={index} className="flex items-start bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/30 dark:border-slate-800/40 p-3.5 rounded-xl">
                    <div className="bg-brand-indigo/10 border border-brand-indigo/15 text-brand-indigo rounded-full p-0.5 shrink-0 mr-3 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Sidebar Summary) */}
          <div className="space-y-6">
            <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white font-display mb-5">Job Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/30 dark:border-slate-800/40 rounded-xl">
                  <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">Posted Date</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-xs">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/30 dark:border-slate-800/40 rounded-xl">
                  <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">Location</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-xs">{job.location}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/30 dark:border-slate-800/40 rounded-xl">
                  <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">Work Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-xs">{job.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default JobDetails;