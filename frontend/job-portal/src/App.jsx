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
import UserProfile from "./pages/Jobseeker/UserProfile.jsx";
import EmployerDashboard from "./pages/Employer/EmployerDashboard.jsx";
import JobPostingForm from "./pages/Employer/JobPostingForm.jsx";
import ManageJobs from "./pages/Employer/ManageJob.jsx";
import ApplicationsViewer from "./pages/Employer/ApplicationViewer.jsx";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage.jsx";
import ProtectedRoute from "./pages/routes/ProtectedRoute.jsx";




const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute requiredRole={["recruiter", "employer"]} />}>
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
