import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Clock, CalendarDays, Briefcase, DollarSign } from 'lucide-react';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    // Calculate days remaining or post date
    const postedDate = new Date(job.createdAt).toLocaleDateString();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    {/* Company Logo Placeholder */}
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-lg font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {job.recruiterId?.company?.charAt(0) || <Briefcase className="w-6 h-6" />}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            {job.recruiterId?.company || 'Company Confidential'}
                        </p>
                    </div>
                </div>
                <button className="text-gray-300 hover:text-blue-600 transition-colors">
                    <Bookmark className="w-6 h-6" />
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" /> {job.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <Clock className="w-3 h-3 mr-1" /> {job.type}
                </span>
                {job.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        {job.category}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    <span>{postedDate}</span>
                </div>

                {job.salary && (
                    <div className="font-bold text-gray-900 text-lg">
                        {job.salary}
                    </div>
                )}

                <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default JobCard;
