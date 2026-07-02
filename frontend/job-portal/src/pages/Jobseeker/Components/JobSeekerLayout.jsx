import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Bell, User, LogOut, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const JobSeekerLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setDarkMode(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navLinks = [
        { path: '/find-jobs', label: 'Find Jobs' },
        { path: '/saved-jobs', label: 'Saved Jobs' },
    ];

    return (
        <div className="min-h-screen bg-canvas-bg dark:bg-[#0B0F19] font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Header Navbar */}
            <nav className="bg-canvas-card dark:bg-[#0E1322] border-b border-slate-200/60 dark:border-slate-800/80 sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo & Desktop Navigation */}
                        <div className="flex items-center">
                            <Link to="/find-jobs" className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center shadow-sm">
                                    <Briefcase className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">JobPortal</span>
                            </Link>

                            <div className="hidden md:flex ml-10 space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors border-b-2 ${location.pathname === link.path
                                                ? 'text-brand-indigo border-brand-indigo'
                                                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-transparent hover:border-slate-350 dark:hover:border-slate-700/60'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Theme Toggler */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                title="Toggle Theme"
                            >
                                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

                            <button className="text-slate-400 hover:text-slate-650 dark:text-slate-400 dark:hover:text-slate-250 transition-colors relative p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-[#0E1322] bg-accent-emerald"></span>
                            </button>

                            {/* User Profile Trigger */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-3 focus:outline-none cursor-pointer group"
                                >
                                    <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-slate-750 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:opacity-90 transition-opacity">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Candidate</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-650 dark:group-hover:text-slate-300 transition-colors" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl py-1.5 border border-slate-200/60 dark:border-slate-800 ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <User className="w-4 h-4 mr-2.5 text-slate-400" /> My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center px-4 py-2.5 text-sm font-semibold text-red-650 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 mr-2.5 text-red-400" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Hamburguer */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-slate-400 hover:text-slate-650 dark:text-slate-400 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none transition-colors"
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {isMenuOpen && (
                    <div className="md:hidden bg-canvas-card dark:bg-[#0E1322] border-t border-slate-200/60 dark:border-slate-800/80">
                        <div className="pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-bold ${location.pathname === link.path
                                            ? 'bg-slate-50 dark:bg-slate-900/55 border-brand-indigo text-brand-indigo'
                                            : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:border-slate-350 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-4 border-t border-slate-200/60 dark:border-slate-800/80">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-slate-755 flex items-center justify-center text-white font-bold">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                </div>
                                <div className="ml-3 text-left">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-550 font-semibold">{user?.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex w-full items-center px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/30"
                                >
                                    Toggle Theme ({darkMode ? 'Light' : 'Dark'})
                                </button>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/30"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Your Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-650 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Layout Wrapper */}
            <main>
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default JobSeekerLayout;
