import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../redux/slices/jobSlice';
import JobSeekerLayout from './Components/JobSeekerLayout';
import JobFilters from './Components/JobFilters';
import JobCard from './Components/JobCard';
import { Search, MapPin } from 'lucide-react';

const JobSeekerDashboard = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <JobSeekerLayout>
      <div className="mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 bg-opacity-80 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-500 mb-8">Discover opportunities that match your passion</p>

          <div className="flex flex-col md:flex-row gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-xl border border-transparent focus-within:border-blue-500 transition-colors shadow-sm">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-xl border border-transparent focus-within:border-blue-500 transition-colors shadow-sm">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <JobFilters />
        </div>

        {/* Job List */}
        <div className="w-full lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-500">Showing <span className="font-bold text-gray-900">{filteredJobs.length}</span> jobs</h2>
            {/* Sort/Layout options could go here */}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default JobSeekerDashboard;