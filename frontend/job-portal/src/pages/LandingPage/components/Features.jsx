import React from 'react';
import { Search, FileText, MessageSquare, Users, BarChart2, Shield } from 'lucide-react';

const Features = () => {
    const features = {
        seekers: [
            {
                icon: <Search className="w-5 h-5 text-brand-indigo" />,
                title: "Skill Overlap Recommendations",
                desc: "See jobs that share skills with your profile, ranked by exact skill overlap."
            },
            {
                icon: <FileText className="w-5 h-5 text-brand-indigo" />,
                title: "PDF Skill Extraction",
                desc: "Upload a PDF and recognize contact information and known skills with text rules."
            },
            {
                icon: <MessageSquare className="w-5 h-5 text-brand-indigo" />,
                title: "Direct Connect",
                desc: "Message a recruiter for a job you applied to."
            }
        ],
        employers: [
            {
                icon: <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
                title: "Applicant Profiles",
                desc: "Review applicants for your jobs, their skills, and basic overlap scores."
            },
            {
                icon: <BarChart2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
                title: "Recruitment Pipeline",
                desc: "Manage postings, view applicant scores, and shortlist talent via one clean dashboard."
            },
            {
                icon: <Shield className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
                title: "Application-Based Chat",
                desc: "Chat with candidates who applied to your jobs."
            }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
            {/* Header Section */}
            <div className="max-w-2xl mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
                    Product capabilities built <br className="hidden sm:inline" />
                    for speed and clarity.
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    Whether you are an aspiring candidate searching for a breakthrough or a recruiter looking to build a great team, we have the tools you need.
                </p>
            </div>

            {/* Grid Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Job Seekers Section */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/80">
                        <div className="w-2 h-6 bg-brand-indigo rounded-full"></div>
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">For Job Seekers</h3>
                    </div>
                    <div className="space-y-4">
                        {features.seekers.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className="flex items-start gap-4 p-6 bg-canvas-card dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-xl hover:border-slate-350 dark:hover:border-slate-700/65 transition-colors duration-300"
                            >
                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800/40">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employers Section */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/80">
                        <div className="w-2 h-6 bg-slate-800 dark:bg-slate-500 rounded-full"></div>
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">For Employers</h3>
                    </div>
                    <div className="space-y-4">
                        {features.employers.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className="flex items-start gap-4 p-6 bg-canvas-card dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-xl hover:border-slate-350 dark:hover:border-slate-700/65 transition-colors duration-300"
                            >
                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800/40">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
