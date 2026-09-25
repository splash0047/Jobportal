import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect } from 'react';
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Login = lazy(() => import('./pages/Auth/Login'));
const JobSeekerDashboard = lazy(() => import('./pages/Jobseeker/JobSeekerDashboard.jsx'));
const JobDetails = lazy(() => import('./pages/Jobseeker/Jobdetails.jsx'));
const SavedJobs = lazy(() => import('./pages/Jobseeker/SavedJobs.jsx'));
const MyApplications = lazy(() => import('./pages/Jobseeker/MyApplications.jsx'));
const UserProfile = lazy(() => import('./pages/Jobseeker/UserProfile.jsx'));
const EmployerDashboard = lazy(() => import('./pages/Employer/EmployerDashboard.jsx'));
const JobPostingForm = lazy(() => import('./pages/Employer/JobPostingForm.jsx'));
const ManageJobs = lazy(() => import('./pages/Employer/ManageJob.jsx'));
const ApplicationsViewer = lazy(() => import('./pages/Employer/ApplicationsViewer.jsx'));
const EmployerProfilePage = lazy(() => import('./pages/Employer/EmployerProfilePage.jsx'));
import ProtectedRoute from "./pages/routes/ProtectedRoute.jsx";




import { useDispatch } from 'react-redux';
import { hydrateUser } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => { if (localStorage.getItem('token')) dispatch(hydrateUser()); }, [dispatch]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="bg-canvas-bg dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">


      <Router>
        <Suspense fallback={<div className="p-8 text-center" role="status">Loading page...</div>}><Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route element={<ProtectedRoute requiredRole="candidate" />}>
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="recruiter" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applications" element={<ApplicationsViewer />} />
            <Route path="/company-profile" element={<EmployerProfilePage />} />
          </Route>


          {/* Catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes></Suspense>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  )
}

export default App
