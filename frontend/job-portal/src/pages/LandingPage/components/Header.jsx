import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Sun, Moon } from "lucide-react";

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const isAuthenticated = !!user;
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setDarkMode(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    return (
        <header className="sticky top-0 z-50 bg-canvas-card/85 backdrop-blur-md border-b border-slate-200/60 dark:bg-[#0B0F19]/85 dark:border-slate-800/80 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center shadow-sm">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">JobPortal</span>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a 
                            onClick={() => navigate("/find-jobs")} 
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            Find Jobs
                        </a>
                        <a 
                            onClick={() => {
                                navigate(
                                    isAuthenticated && (user?.role === "recruiter" || user?.role === "employer")
                                        ? "/employer-dashboard"
                                        : "/login"
                                );
                            }}
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            For Employers
                        </a>
                    </nav>

                    {/* Auth & Navigation Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggler */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            title="Toggle Theme"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:inline">
                                    Welcome, <span className="text-slate-900 dark:text-white font-bold">{user?.name}</span>
                                </span>
                                <button
                                    onClick={() => navigate(user?.role === "recruiter" || user?.role === "employer" ? "/employer-dashboard" : "/find-jobs")}
                                    className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                                >
                                    Dashboard
                                </button>
                            </div>
                        ) : (
                            <>
                                <a 
                                    href="/login"
                                    className="text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                                >
                                    Login
                                </a>
                                <a
                                    href="/signup"
                                    className="bg-brand-indigo hover:bg-brand-indigo-dark text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
