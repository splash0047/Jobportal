import { Briefcase, Clock } from 'lucide-react';

const RecentActivity = ({ jobs }) => {
    // Take only the first 3 jobs as "recent"
    const recentJobs = jobs.slice(0, 3);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Job Posts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Job Posts</h3>
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View all</button>
                </div>
                <div className="space-y-4">
                    {recentJobs.length > 0 ? (
                        recentJobs.map((job) => (
                            <div key={job._id} className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mr-4">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                    <p className="text-sm text-gray-500">{job.location} • {new Date(job.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                                    Active
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">No recent jobs posted.</p>
                    )}
                </div>
            </div>

            {/* Recent Applications (Mock for layout matching) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View all</button>
                </div>
                <div className="space-y-4">
                    {/* Placeholder items to match design */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4">
                                {String.fromCharCode(64 + i)}J
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">Candidate Name {i}</h4>
                                <p className="text-sm text-gray-500">Applied for Frontend Developer</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                2 days ago
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
