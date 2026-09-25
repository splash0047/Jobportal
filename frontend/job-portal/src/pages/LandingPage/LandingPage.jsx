import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import { Briefcase } from 'lucide-react';

const LandingPage = () => (
  <div className="min-h-screen bg-canvas-bg text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100 font-sans antialiased">
    <Header />
    <main className="space-y-16 py-8">
      <Hero />
      <Features />
    </main>
    <footer className="bg-canvas-card border-t border-slate-200/60 dark:bg-[#0E1322] dark:border-slate-800/80 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-bold text-lg"><Briefcase className="w-5 h-5" /> JobPortal</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Jobs, applications, PDF skill extraction and recruiter chat.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="/find-jobs" className="hover:text-brand-indigo">Find Jobs</a>
          <a href="/signup" className="hover:text-brand-indigo">Create Account</a>
          <a href="https://github.com/splash0047/Jobportal" target="_blank" rel="noopener noreferrer" className="hover:text-brand-indigo">Source Code</a>
        </nav>
      </div>
    </footer>
  </div>
);

export default LandingPage;
