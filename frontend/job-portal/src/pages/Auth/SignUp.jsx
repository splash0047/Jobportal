import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('recruiter'); // Default recruiter / employer
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            if (user.role === 'recruiter' || user.role === 'employer') navigate('/employer-dashboard');
            else navigate('/find-jobs');
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password, role }));
    };

    return (
        <div className="min-h-screen bg-canvas-bg flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-canvas-card py-10 px-6 sm:px-10 border border-slate-200/60 sm:rounded-2xl shadow-xl shadow-slate-100/50">
                    <div className="text-center mb-8">
                        {/* Logo Link */}
                        <Link to="/" className="inline-flex items-center space-x-2.5 mb-4">
                            <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">JobPortal</span>
                        </Link>
                        <h2 className="text-2xl font-extrabold text-slate-900 font-display">Create Account</h2>
                        <p className="mt-1 text-sm text-slate-500 font-medium">
                            Join our premium professional network
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 border border-red-100 p-3.5 rounded-xl text-sm font-semibold flex items-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm transition-all"
                                    placeholder="Create a strong password"
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Account Type *</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setRole('candidate')}
                                    className={`relative rounded-xl border p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-50/50 ${role === 'candidate' ? 'border-brand-indigo bg-brand-indigo/5 text-slate-900' : 'border-slate-200 bg-white'}`}
                                >
                                    <User className={`h-6 w-6 mb-2 ${role === 'candidate' ? 'text-brand-indigo' : 'text-slate-400'}`} />
                                    <span className="text-sm font-bold">Job Seeker</span>
                                    <span className="text-[10px] text-slate-400 mt-0.5 text-center font-medium">Find opportunities</span>
                                </div>

                                <div
                                    onClick={() => setRole('recruiter')}
                                    className={`relative rounded-xl border p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-50/50 ${role === 'recruiter' ? 'border-slate-800 bg-slate-800/5 text-slate-900' : 'border-slate-200 bg-white'}`}
                                >
                                    <Briefcase className={`h-6 w-6 mb-2 ${role === 'recruiter' ? 'text-slate-700' : 'text-slate-400'}`} />
                                    <span className="text-sm font-bold">Employer</span>
                                    <span className="text-[10px] text-slate-400 mt-0.5 text-center font-medium">Post openings</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all cursor-pointer disabled:opacity-75"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
