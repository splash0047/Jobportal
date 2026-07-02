import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const JobFilters = () => {
    const [openSection, setOpenSection] = useState({
        type: true,
        salary: true
    });

    const toggleSection = (section) => {
        setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="bg-canvas-card rounded-2xl border border-slate-200/60 p-6 shadow-sm text-left">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900 flex items-center font-display">
                    <Filter className="w-4 h-4 mr-2 text-slate-500" /> Filter Options
                </h3>
                <button className="text-xs font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors">
                    Clear All
                </button>
            </div>

            {/* Job Type Section */}
            <div className="mb-5">
                <button
                    onClick={() => toggleSection('type')}
                    className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 cursor-pointer"
                >
                    Job Type
                    {openSection.type ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openSection.type && (
                    <div className="space-y-3">
                        {['Remote', 'Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type) => (
                            <label key={type} className="flex items-center cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-brand-indigo border-slate-200 rounded focus:ring-brand-indigo accent-brand-indigo cursor-pointer transition-colors" 
                                />
                                <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-slate-100 my-5"></div>

            {/* Salary Range Section */}
            <div>
                <button
                    onClick={() => toggleSection('salary')}
                    className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 cursor-pointer"
                >
                    Salary Range
                    {openSection.salary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openSection.salary && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>Min Salary</span>
                            <span>Max Salary</span>
                        </div>
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                placeholder="$0" 
                                className="w-full px-3 py-2 border border-slate-200 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none transition-all" 
                            />
                            <input 
                                type="text" 
                                placeholder="$200k" 
                                className="w-full px-3 py-2 border border-slate-200 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none transition-all" 
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobFilters;
