import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import JobSeekerDashboard from "./pages/Jobseeker/JobSeekerDashboard.jsx";
import JobDetails from "./pages/Jobseeker/Jobdetails.jsx";
import SavedJobs from "./pages/Jobseeker/SavedJobs.jsx";
import MyApplications from "./pages/Jobseeker/MyApplications.jsx";
import UserProfile from "./pages/Jobseeker/UserProfile.jsx";
import EmployerDashboard from "./pages/Employer/EmployerDashboard.jsx";
import JobPostingForm from "./pages/Employer/JobPostingForm.jsx";
import ManageJobs from "./pages/Employer/ManageJob.jsx";
import ApplicationsViewer from "./pages/Employer/ApplicationsViewer.jsx";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage.jsx";
import ProtectedRoute from "./pages/routes/ProtectedRoute.jsx";




import { useEffect } from 'react';
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
        <Routes>
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

        </Routes>
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
