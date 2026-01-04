import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs } from '../../redux/slices/jobSlice';
import EmployerLayout from './components/EmployerLayout';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const { myJobs, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  // Calculate stats
  const stats = {
    activeJobs: myJobs.length,
    totalApplicants: myJobs.reduce((acc, job) => acc + (job.applicants ? job.applicants.length : 0), 0), // Assuming applicants array exists or we mock it
    hired: 0 // Placeholder
  };

  return (
    <EmployerLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your jobs today.</p>
      </div>

      <DashboardStats stats={stats} />
      <RecentActivity jobs={myJobs} />
    </EmployerLayout>
  );
};

export default EmployerDashboard;