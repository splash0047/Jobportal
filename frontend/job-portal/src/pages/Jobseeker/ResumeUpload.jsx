import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResume, resetResumeSuccess } from '../../redux/slices/authSlice';
import { UploadCloud, FileText, CheckCircle, X, Loader2 } from 'lucide-react';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { loading, error, resumeSuccess, user } = useSelector((state) => state.auth);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            dispatch(resetResumeSuccess());
        }
    };

    const handleUpload = () => {
        if (file) {
            dispatch(uploadResume(file));
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Resume & Skills</h3>
            <p className="text-gray-500 text-sm mb-6">Upload your resume to automatically extract skills and speed up your applications.</p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-50">
                <input
                    type="file"
                    id="resume-upload"
                    hidden
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                {!file && !user?.resumeURL ? (
                    <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Click to upload resume</span>
                        <span className="text-xs text-gray-500 mt-1">PDF only, max 5MB</span>
                    </label>
                ) : (
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file ? file.name : 'Current Resume'}</p>
                                {user?.resumeURL && !file && (
                                    <a href={user.resumeURL} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                        View Uploaded Resume
                                    </a>
                                )}
                            </div>
                        </div>
                        {file && (
                            <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {file && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center"
                    >
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {loading ? 'Processing...' : 'Upload & API Analyze'}
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
                    <X className="w-4 h-4 mr-2" /> {error}
                </div>
            )}

            {(resumeSuccess || (user?.profile?.skills && user.profile.skills.length > 0)) && (
                <div className="mt-6">
                    <div className="flex items-center text-green-600 text-sm font-medium mb-3">
                        <CheckCircle className="w-4 h-4 mr-2" /> AI Analysis Complete
                    </div>

                    {user?.profile?.skills && (
                        <div className="flex flex-wrap gap-2">
                            {user.profile.skills.map((skill, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
