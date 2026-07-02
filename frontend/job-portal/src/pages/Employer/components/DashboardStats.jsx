import { Briefcase, Users, CheckCircle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
    const cards = [
        {
            label: 'Active Job Postings',
            value: stats.activeJobs,
            icon: Briefcase,
            iconColor: 'text-brand-indigo',
            trend: '+12% this month'
        },
        {
            label: 'Total Applicants',
            value: stats.totalApplicants,
            icon: Users,
            iconColor: 'text-slate-700 dark:text-slate-300',
            trend: '+5% this month'
        },
        {
            label: 'Successful Hires',
            value: stats.hired,
            icon: CheckCircle,
            iconColor: 'text-accent-emerald',
            trend: '+2% this month'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between transition-colors duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</p>
                                <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-2">{card.value}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-center">
                                <Icon className={`w-5 h-5 ${card.iconColor}`} />
                            </div>
                        </div>
                        <div className="mt-5 flex">
                            <span className="text-[10px] font-bold text-accent-emerald-dark dark:text-accent-emerald bg-accent-emerald/8 dark:bg-accent-emerald/10 border border-accent-emerald/15 dark:border-accent-emerald/20 px-2 py-0.5 rounded-md">
                                {card.trend}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardStats;
