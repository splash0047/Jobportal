import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-brand-indigo/10 dark:bg-brand-indigo/15 text-brand-indigo dark:text-brand-indigo-light px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                        <span>New: AI Resume Analysis v2.0</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-2xl font-display">
                        Find the work <br className="hidden sm:inline" />
                        that <span className="text-brand-indigo">truly matters</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-450 max-w-xl leading-relaxed font-medium">
                        Connect with top-tier companies. Upload your resume for instant AI skill insights and get matched with role opportunities tailored for your growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                            onClick={() => navigate('/find-jobs')}
                            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                        >
                            <Search className="w-4 h-4" />
                            Explore Opportunities
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-900/50 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-slate-800/80 rounded-xl font-bold text-base transition-all flex items-center justify-center cursor-pointer"
                        >
                            Post a Job Post
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-4">
                            Trusted by leading tech platforms
                        </p>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-40 dark:opacity-60">
                            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-display">Stripe</span>
                            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-display">Linear</span>
                            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-display">Vercel</span>
                            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-display">Notion</span>
                            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-display">Airbnb</span>
                        </div>
                    </div>
                </div>

                {/* Right Content - Sleek Image & Ambient Glow */}
                <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/15 to-accent-emerald/15 rounded-2xl filter blur-2xl opacity-75 dark:opacity-50"></div>
                    <div className="relative bg-white dark:bg-slate-900 p-2.5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                        <div className="rounded-xl h-[420px] w-full flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
                                alt="Modern workspace collaboration"
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
