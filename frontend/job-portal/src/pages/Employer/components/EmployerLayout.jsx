import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Briefcase, Building2, LogOut, Menu, X, Bell, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const EmployerLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

    const navItems = [
        { path: '/employer-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/post-job', icon: PlusCircle, label: 'Post Job' },
        { path: '/manage-jobs', icon: Briefcase, label: 'Manage Jobs' },
        { path: '/company-profile', icon: Building2, label: 'Company Profile' },
    ];

    return (
        <div className="min-h-screen bg-canvas-bg dark:bg-[#0B0F19] flex font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-canvas-card dark:bg-[#0E1322] border-r border-slate-200/60 dark:border-slate-800/80 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0 shrink-0 transition-colors duration-300`}
            >
                <div className="h-full flex flex-col justify-between">
                    <div>
                        {/* Logo */}
                        <div className="h-16 flex items-center px-6 border-b border-slate-200/40 dark:border-slate-800/50">
                            <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center mr-3 shadow-sm">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">JobPortal</span>
                        </div>

                        {/* Navigation items */}
                        <nav className="px-4 py-6 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-brand-indigo/5 dark:bg-brand-indigo/10 text-brand-indigo'
                                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-brand-indigo' : 'text-slate-400 dark:text-slate-500'}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom Recruiter Profile block */}
                    <div className="p-4 border-t border-slate-200/40 dark:border-slate-800/50">
                        <div className="flex items-center p-3 mb-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/60 rounded-xl">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0 font-display">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3 overflow-hidden text-left">
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Employer</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2.5 text-sm font-semibold text-red-650 dark:text-red-400 hover:bg-red-50/85 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4 mr-2.5 text-red-400" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-canvas-card dark:bg-[#0E1322] border-b border-slate-200/60 dark:border-slate-800/80 lg:hidden shrink-0">
                    <div className="flex items-center justify-between px-4 h-16">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200">
                            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <span className="font-bold text-slate-900 dark:text-white">JobPortal</span>
                        <div className="w-8" />
                    </div>
                </header>

                {/* Dashboard Desktop Header */}
                <header className="hidden lg:flex items-center justify-between px-8 h-16 bg-canvas-card dark:bg-[#0E1322] border-b border-slate-200/60 dark:border-slate-800/80 shrink-0 transition-colors duration-300">
                    <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                        {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggler */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer rounded-lg hover:bg-slate-55 dark:hover:bg-slate-800/50"
                            title="Toggle Theme"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-850 mx-2"></div>

                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-emerald rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-canvas-bg dark:bg-[#0B0F19] p-6 lg:p-8 transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default EmployerLayout;
