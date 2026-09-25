import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobSeekerLayout from './Components/JobSeekerLayout';
import JobCard from './Components/JobCard';
import { getSavedJobs } from '../../redux/slices/jobSlice';
import { Bookmark } from 'lucide-react';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs, savedLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getSavedJobs());
  }, [dispatch]);

  return (
    <JobSeekerLayout>
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
          <Bookmark />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-500">Jobs you've bookmarked for later</p>
        </div>
      </div>

      {savedLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No saved jobs yet</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Jobs you bookmark will appear here. Go back and find some opportunities!
          </p>
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default SavedJobs;
