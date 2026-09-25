import { Filter } from 'lucide-react';

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const JobFilters = ({ selectedTypes, onChange }) => (
    <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-sm text-left">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center font-display">
                <Filter className="w-4 h-4 mr-2 text-slate-500" /> Job Type
            </h3>
            <button type="button" onClick={() => onChange([])} className="text-xs font-bold text-brand-indigo hover:text-brand-indigo-dark">
                Clear All
            </button>
        </div>
        <div className="space-y-3">
            {TYPES.map(type => (
                <label key={type} className="flex items-center cursor-pointer gap-3">
                    <input type="checkbox" checked={selectedTypes.includes(type)}
                        onChange={() => onChange(selectedTypes.includes(type) ? selectedTypes.filter(item => item !== type) : [...selectedTypes, type])}
                        className="w-4 h-4 border-slate-200 rounded accent-brand-indigo" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{type}</span>
                </label>
            ))}
        </div>
    </div>
);

export default JobFilters;
