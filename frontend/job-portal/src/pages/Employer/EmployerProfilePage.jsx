import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateProfile } from '../../redux/slices/authSlice';
import EmployerLayout from './components/EmployerLayout';
import { Globe, FileText, Save } from 'lucide-react';

const EmployerProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', website: '', description: '', location: ''
  });
  useEffect(() => {
    const profile = user?.companyProfile;
    setFormData({ name: profile?.name || '', website: profile?.website || '',
      description: profile?.description || '', location: profile?.location || '' });
  }, [user?.companyProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await dispatch(updateProfile(formData)).unwrap(); toast.success('Company profile saved'); }
    catch (error) { toast.error(error?.message || 'Could not save company profile'); }
    finally { setSaving(false); }
  };

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto text-left transition-colors duration-300">
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-200/40 dark:border-slate-800/50 bg-slate-50/20 dark:bg-slate-950/20">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Company Profile</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Manage your company information and website link.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  required
                  minLength={2}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-indigo focus:border-transparent bg-slate-50 dark:bg-slate-950/40 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Website</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-slate-400 dark:text-slate-550" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-indigo focus:border-transparent bg-slate-50 dark:bg-slate-950/40 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} maxLength={120}
                className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-sm dark:text-slate-200" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">About Company</label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <FileText className="h-4 w-4 text-slate-400 dark:text-slate-550" />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-indigo focus:border-transparent bg-slate-50 dark:bg-slate-950/40 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-200"
                ></textarea>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default EmployerProfilePage;
