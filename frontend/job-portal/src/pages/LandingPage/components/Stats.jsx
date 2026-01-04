import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

const Stats = () => {
    const stats = [
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            value: "2.4M+",
            label: "Active Users",
            bg: "bg-blue-50"
        },
        {
            icon: <Building2 className="w-8 h-8 text-purple-600" />,
            value: "50K+",
            label: "Companies",
            bg: "bg-purple-50"
        },
        {
            icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
            value: "150K+",
            label: "Jobs Posted",
            bg: "bg-indigo-50"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group">
                        <div className={`p-4 rounded-xl ${stat.bg} mb-6 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-gray-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
