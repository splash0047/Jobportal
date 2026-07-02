import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob, resetJobState } from '../../redux/slices/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Layers } from 'lucide-react';
import EmployerLayout from './components/EmployerLayout';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    location: '',
    salary: '',
    type: 'Full-time',
    category: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (success) {
      dispatch(resetJobState());
      navigate('/employer-dashboard');
    }
  }, [success, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim())
    };
    dispatch(createJob(jobData));
  };

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto text-left transition-colors duration-300">
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-200/40 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/20 dark:bg-slate-950/20">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Post a New Job</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Publish a new position to attract top candidate profiles.</p>
            </div>
            <button type="button" className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors shadow-sm">
              Preview
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-650 p-4 rounded-xl text-sm font-semibold">
                {error}
              </div>
            )}

            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Job Title *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
            </div>

            {/* Location & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                    placeholder="e.g. New York, NY"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-1.5">Salary Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                    placeholder="e.g. $100k - $120k"
                  />
                </div>
              </div>
            </div>

            {/* Category & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Category *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Layers className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                    placeholder="e.g. Technology, Design"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Job Type *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-8 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="Full-time" className="dark:bg-slate-900">Full-time</option>
                    <option value="Part-time" className="dark:bg-slate-900">Part-time</option>
                    <option value="Contract" className="dark:bg-slate-900">Contract</option>
                    <option value="Internship" className="dark:bg-slate-900">Internship</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-1.5">Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="block w-full p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                placeholder="Describe the responsibilities, project scope, and overall mission..."
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-1.5">Requirements / Skills *</label>
              <textarea
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                rows="2"
                className="block w-full p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                placeholder="React, TypeScript, Tailwind CSS, API Integration (Comma separated)"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-70"
              >
                {loading ? 'Publishing...' : 'Publish Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default JobPostingForm;