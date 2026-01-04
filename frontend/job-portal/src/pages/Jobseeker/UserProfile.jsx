import { useSelector } from 'react-redux';
import JobSeekerLayout from './Components/JobSeekerLayout';
import ResumeUpload from './ResumeUpload';
import { User, Mail, Save } from 'lucide-react';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <JobSeekerLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-blue-600 rounded-t-2xl p-8 pb-24 text-white">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="opacity-80 mt-2">Manage your personal information and documents</p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 border-t-0 px-8 pb-8 -mt-16 relative z-10 mx-4 md:mx-0 md:rounded-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-end mb-8 -mt-12">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 overflow-hidden">
                {user?.name?.charAt(0) || <User />}
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 mb-2">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Resume Section */}
            {user?.role === 'candidate' && (
              <div className="pt-6 border-t border-gray-100">
                <ResumeUpload />
              </div>
            )}

            {/* Profile Bio & Experience (Read-only for now or editable if endpoints exist) */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea rows="3" className="block w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about yourself..." defaultValue={user?.profile?.bio}></textarea>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default UserProfile;