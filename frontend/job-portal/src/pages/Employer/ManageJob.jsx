import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs, deleteJob } from '../../redux/slices/jobSlice';
import EmployerLayout from './components/EmployerLayout';
import { Search, Filter, Edit, Trash2, XCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myJobs, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(id));
    }
  };

  const filteredJobs = myJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <EmployerLayout>
      <div className="mb-8 text-left transition-colors duration-300">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Job Directory</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Manage your active postings, check applicant counts, and close listings.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-canvas-card dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center transition-colors">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-550 w-4 h-4" />
          <input
            type="text"
            placeholder="Search job listings..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 rounded-xl text-sm outline-none transition-all dark:bg-slate-950/40 text-slate-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5 mr-2 text-slate-400 dark:text-slate-500" />
            All Posts
          </button>
          <button 
            onClick={() => navigate('/post-job')}
            className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            + Create Posting
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-canvas-card dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden text-left transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/45 border-b border-slate-200/40 dark:border-slate-800/50">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Job Listing</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-slate-400 dark:text-slate-500 font-medium text-sm">
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-indigo border-t-transparent"></div>
                      <span>Loading active listings...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-slate-450 dark:text-slate-500 font-medium text-sm">
                    No active listings found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{job.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 inline-flex text-[10px] leading-5 font-bold rounded-md bg-accent-emerald/8 dark:bg-accent-emerald/10 border border-accent-emerald/15 dark:border-accent-emerald/20 text-accent-emerald-dark dark:text-accent-emerald uppercase tracking-wider">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-xs font-bold text-brand-indigo">
                        <Users className="w-3.5 h-3.5 mr-1.5 text-brand-indigo/60" />
                        {job.applicants ? job.applicants.length : 0} applied
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3.5 text-slate-400 dark:text-slate-500">
                        <button className="hover:text-brand-indigo dark:hover:text-brand-indigo transition-colors p-1" title="Edit Posting">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex items-center text-xs font-bold" title="Archive Posting">
                          <XCircle className="w-4 h-4 mr-1" /> Close
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                          title="Delete Posting"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default ManageJobs;