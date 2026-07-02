import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Analytics from './components/Analytics';
import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-canvas-bg text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100 font-sans antialiased transition-colors duration-300">
      <Header />
      <main className="space-y-16 py-8">
        <Hero />
        <Stats />
        <Features />
        <Analytics />
      </main>

      {/* Premium Multi-Column Footer */}
      <footer className="bg-canvas-card border-t border-slate-200/60 dark:bg-[#0E1322] dark:border-slate-800/80 py-16 mt-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-left">
            {/* Branding Column */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">JobPortal</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed font-medium">
                An intelligent full-stack portal featuring AI-powered resume analysis, matching talent and opportunities with confidence and ease.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Sitemap Column 1 */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Candidates</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="/find-jobs" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Find Jobs</a></li>
                <li><a href="/profile" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">AI Match Check</a></li>
                <li><a href="#" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Career Prep</a></li>
              </ul>
            </div>

            {/* Sitemap Column 2 */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Employers</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="/login" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Post a Job</a></li>
                <li><a href="/login" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Hire Talent</a></li>
                <li><a href="#" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Pricing</a></li>
              </ul>
            </div>

            {/* Sitemap Column 3 */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">About</a></li>
                <li><a href="#" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-indigo dark:hover:text-white transition-colors font-semibold">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-800/80 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500">
            <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
            <p className="mt-4 sm:mt-0 font-bold">Designed for premium user experience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
