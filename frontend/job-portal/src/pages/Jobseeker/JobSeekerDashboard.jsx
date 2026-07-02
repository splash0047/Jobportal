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
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.recruiterId?.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationSearch.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <JobSeekerLayout>
      {/* Search Section */}
      <div className="mb-12">
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-200/60 dark:border-slate-800/80 shadow-sm relative overflow-hidden text-left bg-grid-line transition-colors duration-300">
          <div className="max-w-2xl relative z-10 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">Discover Opportunities</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold pb-6">Explore verified positions from outstanding startup and enterprise teams.</p>
          </div>

          {/* Search Inputs Capsule */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl relative z-10 max-w-4xl transition-colors">
            <div className="flex-1 flex items-center px-3.5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 focus-within:border-brand-indigo/60 focus-within:ring-2 focus-within:ring-brand-indigo/10 rounded-xl transition-all shadow-sm">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                className="w-full outline-none text-slate-950 dark:text-slate-100 text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-800 my-2 self-stretch"></div>

            <div className="flex-1 flex items-center px-3.5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 focus-within:border-brand-indigo/60 focus-within:ring-2 focus-within:ring-brand-indigo/10 rounded-xl transition-all shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="City, state, or Remote"
                className="w-full outline-none text-slate-950 dark:text-slate-100 text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-transparent"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>

            <button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex flex-col lg:flex-row gap-10 text-left">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-24">
            <JobFilters />
          </div>
        </div>

        {/* Job List */}
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Showing <span className="font-extrabold text-slate-900 dark:text-slate-100">{filteredJobs.length}</span> positions
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between text-left h-[180px]">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center w-full">
                        <div className="w-10 h-10 rounded-xl animate-shimmer shrink-0"></div>
                        <div className="ml-3.5 space-y-2 w-1/2">
                          <div className="h-4 rounded animate-shimmer w-full"></div>
                          <div className="h-3 rounded animate-shimmer w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4 w-2/3">
                      <div className="h-5 rounded-md animate-shimmer w-1/3"></div>
                      <div className="h-5 rounded-md animate-shimmer w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/40 pt-4">
                    <div className="h-3 rounded animate-shimmer w-1/4"></div>
                    <div className="h-8 rounded-lg animate-shimmer w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-canvas-card dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">No opportunities found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">Try adjusting your search filters or terms.</p>
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