import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs, getRecruiterStats } from '../../redux/slices/jobSlice';
import EmployerLayout from './components/EmployerLayout';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const { myJobs, recruiterStats } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getMyJobs());
    dispatch(getRecruiterStats());
  }, [dispatch]);

  return (
    <EmployerLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your jobs today.</p>
      </div>

      <DashboardStats stats={recruiterStats} />
      <RecentActivity jobs={myJobs} />
    </EmployerLayout>
  );
};

export default EmployerDashboard;
