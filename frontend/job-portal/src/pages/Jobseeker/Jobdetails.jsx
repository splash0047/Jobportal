import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../redux/slices/jobSlice';
import { applyForJob } from '../../redux/slices/applicationSlice';
import JobSeekerLayout from './components/JobSeekerLayout';
import { MapPin, Briefcase, Calendar, DollarSign, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const { success, error: appError } = useSelector((state) => state.applications);

  // Local state to track "applied" status immediately for better UI feedback
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </JobSeekerLayout>
  );

  if (error || !job) return (
    <JobSeekerLayout>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <button onClick={() => navigate('/find-jobs')} className="mt-4 text-blue-600 hover:text-blue-700">Go back to jobs</button>
      </div>
    </JobSeekerLayout>
  );

  return (
    <JobSeekerLayout>
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-400 mr-6">
              {job.recruiterId?.company?.charAt(0) || <Briefcase />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center text-gray-500 space-x-4">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.recruiterId?.company || 'Confidential'}</span>
              </div>
            </div>
          </div>

          {isApplied ? (
            <button disabled className="bg-green-100 text-green-700 px-8 py-3 rounded-xl font-bold flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Applied
            </button>
          ) : (
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-100">
          <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">{job.category || 'Engineering'}</span>
          <span className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">{job.type}</span>
          <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" /> Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Salary */}
          {job.salary && (
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">Compensation</p>
                <p className="text-xl font-bold text-gray-900">{job.salary} <span className="text-sm font-normal text-gray-500">per year</span></p>
              </div>
              <div className="bg-white p-3 rounded-xl text-green-600 shadow-sm">
                <div className="flex items-center text-sm font-bold">
                  <DollarSign className="w-4 h-4 mr-1" /> Competitive
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-blue-600 rounded-full mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">About This Role</h3>
            </div>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">What We're Looking For</h3>
            </div>
            <ul className="space-y-3">
              {job.skillsRequired.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-purple-100 p-1 rounded-full text-purple-600 mr-3 mt-0.5">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className="text-gray-700">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Job Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-sm">Posted</span>
                <span className="text-gray-900 font-medium text-sm">{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-sm">Location</span>
                <span className="text-gray-900 font-medium text-sm">{job.location}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-sm">Type</span>
                <span className="text-gray-900 font-medium text-sm">{job.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default JobDetails;