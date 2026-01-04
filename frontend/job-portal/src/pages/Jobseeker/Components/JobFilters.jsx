import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const JobFilters = () => {
    // Mock filters for now - can be connected to real state later
    const [openSection, setOpenSection] = useState({
        type: true,
        salary: true
    });

    const toggleSection = (section) => {
        setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2" /> Filter Jobs
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Clear All
                </button>
            </div>

            {/* Job Type */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('type')}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
                >
                    Job Type
                    {openSection.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection.type && (
                    <div className="space-y-3">
                        {['Remote', 'Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type) => (
                            <label key={type} className="flex items-center cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 my-4"></div>

            {/* Salary Range */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('salary')}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
                >
                    Salary Range
                    {openSection.salary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection.salary && (
                    <div className="space-y-4 px-1">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>Min Salary</span>
                            <span>Max Salary</span>
                        </div>
                        {/* Placeholder for range slider or inputs */}
                        <div className="flex space-x-2">
                            <input type="number" placeholder="$0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            <input type="number" placeholder="$200k" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobFilters;
