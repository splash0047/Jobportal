import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { updateProfile } from '../../redux/slices/authSlice';
import JobSeekerLayout from './Components/JobSeekerLayout';
import ResumeUpload from './ResumeUpload';
import { User, Mail, Save } from 'lucide-react';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => { setBio(user?.profile?.bio || ''); }, [user?.profile?.bio]);
  const saveBio = async () => {
    setSaving(true);
    try { await dispatch(updateProfile({ bio })).unwrap(); toast.success('Profile saved'); }
    catch (error) { toast.error(error?.message || 'Could not save profile'); }
    finally { setSaving(false); }
  };

  return (
    <JobSeekerLayout>
      <div className="max-w-3xl mx-auto text-left">
        {/* Banner Section */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-t-2xl p-8 pb-24 text-white border border-slate-900 dark:border-slate-950 shadow-sm relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/20 to-transparent pointer-events-none"></div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display relative z-10">Candidate Profile</h1>
          <p className="text-sm opacity-80 mt-2 font-medium relative z-10">Manage your personal information, credentials, and resume documents</p>
        </div>

        {/* Profile Details Container */}
        <div className="bg-canvas-card dark:bg-slate-900 rounded-b-2xl shadow-xl shadow-slate-100/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/80 border-t-0 px-6 sm:px-10 pb-10 -mt-16 relative z-10 mx-4 md:mx-0 md:rounded-2xl transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-end mb-8 -mt-12">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 p-1.5 shadow-md border border-slate-200/40 dark:border-slate-850">
              <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400 overflow-hidden font-display">
                {user?.name?.charAt(0) || <User />}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 font-semibold cursor-not-allowed select-none text-sm"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 font-semibold cursor-not-allowed select-none text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            {user?.role === 'candidate' && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                <ResumeUpload />
              </div>
            )}

            {/* User Bio */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Bio</label>
                <textarea 
                  rows="3" 
                  className="block w-full p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-200" 
                  placeholder="Introduce yourself to recruiters..." 
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  maxLength={1000}
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <button type="button" onClick={saveBio} disabled={saving} className="flex items-center bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default UserProfile;
