import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

const Stats = () => {
    const stats = [
        {
            icon: <Users className="w-5 h-5 text-brand-indigo" />,
            value: "2.4M+",
            label: "Active Job Seekers",
            desc: "Talented professionals looking for growth."
        },
        {
            icon: <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />,
            value: "50K+",
            label: "Verified Companies",
            desc: "From early-stage startups to Fortune 500s."
        },
        {
            icon: <Briefcase className="w-5 h-5 text-accent-emerald" />,
            value: "150K+",
            label: "Opportunities Posted",
            desc: "Active jobs waiting for your application."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-canvas-card dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-slate-350 dark:hover:border-slate-700/60 transition-all duration-300 flex flex-col group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-center mb-6 group-hover:scale-[1.03] transition-transform">
                            {stat.icon}
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-2">
                            {stat.value}
                        </h3>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{stat.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{stat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
