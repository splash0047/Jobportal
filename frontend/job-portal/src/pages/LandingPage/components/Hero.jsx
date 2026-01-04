import React from 'react';
import { Search, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 pt-12 pb-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Content */}
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                        Find Your Dream Job <br />
                       
                    </h1>

                    <p className="text-xl text-gray-600 max-w-xl">
                        Connect talented professionals with innovative companies. Your next career move or perfect candidate is just one click away.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/find-jobs')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Find Jobs
                        </button>
                        <button
                            onClick={() => navigate('/post-job')} // Assuming route or login check
                            className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-xl font-semibold text-lg hover:border-blue-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Briefcase className="w-5 h-5" />
                            Post a Job
                        </button>
                    </div>
                </div>

                {/* Right Content - Abstract Shapes/Image */}
                <div className="lg:w-1/2 relative">
                    <div className="relative z-10 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl p-2 rotate-3 overflow-hidden shadow-2xl">
                        {/* Placeholder for the video/image from screenshot. Using a nice gradient/text for now */}
                        <div className="bg-white rounded-2xl h-[400px] w-full flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
                                alt="Office collaboration"
                                className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
