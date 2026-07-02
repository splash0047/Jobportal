import React from 'react';
import { TrendingUp, Users, CheckCircle, Briefcase } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
            {/* Header Section */}
            <div className="max-w-2xl mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
                    Real-time platform insights.
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    Tracking data-driven results that showcase the growth of our platform in connecting professionals with world-class teams.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                    icon={<Users className="w-5 h-5 text-brand-indigo" />}
                    label="Active Members"
                    value="2.4M+"
                    trend="+15%"
                    trendColor="text-accent-emerald bg-accent-emerald/8 border-accent-emerald/20 dark:bg-accent-emerald/10 dark:border-accent-emerald/20"
                />
                <AnalyticsCard
                    icon={<Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-350" />}
                    label="Open Positions"
                    value="150K+"
                    trend="+22%"
                    trendColor="text-accent-emerald bg-accent-emerald/8 border-accent-emerald/20 dark:bg-accent-emerald/10 dark:border-accent-emerald/20"
                />
                <AnalyticsCard
                    icon={<CheckCircle className="w-5 h-5 text-accent-emerald" />}
                    label="Placements Made"
                    value="89K+"
                    trend="+18%"
                    trendColor="text-accent-emerald bg-accent-emerald/8 border-accent-emerald/20 dark:bg-accent-emerald/10 dark:border-accent-emerald/20"
                />
                <AnalyticsCard
                    icon={<TrendingUp className="w-5 h-5 text-slate-800 dark:text-slate-300" />}
                    label="Match Precision"
                    value="94%"
                    trend="+8%"
                    trendColor="text-accent-emerald bg-accent-emerald/8 border-accent-emerald/20 dark:bg-accent-emerald/10 dark:border-accent-emerald/20"
                />
            </div>
        </div>
    );
};

const AnalyticsCard = ({ icon, label, value, trend, trendColor }) => (
    <div className="bg-canvas-card dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-center">
                {icon}
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${trendColor}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-1">{value}</h3>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
);

export default Analytics;
