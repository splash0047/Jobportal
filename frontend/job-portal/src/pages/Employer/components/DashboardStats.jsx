import { Briefcase, Users, CheckCircle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
    const cards = [
        {
            label: 'Active Jobs',
            value: stats.activeJobs,
            icon: Briefcase,
            color: 'bg-blue-600',
            trend: '+12% from last month'
        },
        {
            label: 'Total Applicants',
            value: stats.totalApplicants,
            icon: Users,
            color: 'bg-green-500',
            trend: '+5% from last month'
        },
        {
            label: 'Hired',
            value: stats.hired,
            icon: CheckCircle,
            color: 'bg-purple-600',
            trend: '+2% from last month'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${card.color} bg-opacity-10`}>
                                <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <span>{card.trend}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardStats;
