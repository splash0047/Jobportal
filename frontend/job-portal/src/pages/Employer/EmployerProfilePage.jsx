import { useState } from 'react';
import { useSelector } from 'react-redux';
import EmployerLayout from './components/EmployerLayout';
import { Building2, Globe, FileText, Save } from 'lucide-react';

const EmployerProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    companyName: 'Tech Corp Inc.', // Mock data or from user.companyName
    website: 'https://techcorp.com',
    description: 'Leading provider of innovative software solutions.',
    location: 'San Francisco, CA'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto text-left transition-colors duration-300">
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-200/40 dark:border-slate-800/50 bg-slate-50/20 dark:bg-slate-950/20">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Company Profile</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5 font-medium">Manage your company branding, profile, and website links.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Company Logo Section */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800 hover:border-brand-indigo/60 dark:hover:border-brand-indigo/60 hover:bg-brand-indigo/2 dark:hover:bg-brand-indigo/5 rounded-2xl flex items-center justify-center cursor-pointer transition-all">
                <Building2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="text-left">
                <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-bold mb-2 cursor-pointer transition-colors shadow-sm">
                  Upload Logo
                </button>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider">PNG, JPG up to 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
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
                className="flex items-center px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
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