import React from 'react';
import { TrendingUp, Users, CheckCircle, Briefcase } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Analytics</span>
                </h2>
                <p className="text-xl text-gray-600">
                    Real-time insights and data-driven results that showcase the power of our platform in connecting talent with opportunities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                    icon={<Users className="w-6 h-6 text-blue-600" />}
                    label="Active Users"
                    value="2.4M+"
                    trend="+15%"
                    trendColor="text-green-600"
                    bg="bg-blue-50"
                />
                <AnalyticsCard
                    icon={<Briefcase className="w-6 h-6 text-purple-600" />}
                    label="Jobs Posted"
                    value="150K+"
                    trend="+22%"
                    trendColor="text-green-600"
                    bg="bg-purple-50"
                />
                <AnalyticsCard
                    icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                    label="Successful Hires"
                    value="89K+"
                    trend="+18%"
                    trendColor="text-green-600"
                    bg="bg-green-50"
                />
                <AnalyticsCard
                    icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
                    label="Match Rate"
                    value="94%"
                    trend="+8%"
                    trendColor="text-green-600"
                    bg="bg-orange-50"
                />
            </div>
        </div>
    );
};

const AnalyticsCard = ({ icon, label, value, trend, trendColor, bg }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${bg}`}>
                {icon}
            </div>
            <span className={`text-sm font-bold ${trendColor} bg-green-50 px-2 py-1 rounded-lg`}>
                {trend}
            </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-500 font-medium">{label}</p>
    </div>
);

export default Analytics;
