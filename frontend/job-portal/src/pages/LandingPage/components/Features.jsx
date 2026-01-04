import React from 'react';
import { Search, FileText, MessageSquare, Briefcase, BarChart2, Shield } from 'lucide-react';

const Features = () => {
    const features = {
        seekers: [
            {
                icon: <Search className="w-6 h-6 text-blue-600" />,
                title: "Smart Job Matching",
                desc: "AI-powered algorithm matches you with relevant opportunities based on your skills.",
                color: "bg-blue-50"
            },
            {
                icon: <FileText className="w-6 h-6 text-blue-600" />,
                title: "Resume Builder",
                desc: "Create professional resumes with our AI builder (Coming soon).",
                color: "bg-blue-50"
            },
            {
                icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
                title: "Direct Communication",
                desc: "Chat directly with recruiters once shortlisted.",
                color: "bg-blue-50"
            }
        ],
        employers: [
            {
                icon: <UsersIcon className="w-6 h-6 text-purple-600" />,
                title: "Talent Pool Access",
                desc: "Access our vast database of pre-screened candidates.",
                color: "bg-purple-50"
            },
            {
                icon: <BarChart2 className="w-6 h-6 text-purple-600" />,
                title: "Analytics Dashboard",
                desc: "Track your hiring performance with detailed analytics.",
                color: "bg-purple-50"
            },
            {
                icon: <Shield className="w-6 h-6 text-purple-600" />,
                title: "Verified Candidates",
                desc: "Ensure quality hires with our verification system.",
                color: "bg-purple-50"
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-24 bg-gray-50/50 rounded-3xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Everything You Need to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Succeed</span>
                </h2>
                <p className="text-xl text-gray-600">
                    Whether you're looking for your next opportunity or the perfect candidate, we have the tools to make it happen.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Seekers Column */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        For Job Seekers
                    </h3>
                    <div className="space-y-6">
                        {features.seekers.map((feature, idx) => (
                            <div key={idx} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shrink-0`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employers Column */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
                        For Employers
                    </h3>
                    <div className="space-y-6">
                        {features.employers.map((feature, idx) => (
                            <div key={idx} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shrink-0`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper icon component since Users is used twice
const UsersIcon = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default Features;
