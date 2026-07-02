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
        <div className="bg-canvas-card dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm text-left transition-colors duration-300">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1">Resume & AI Skills Matching</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-6">Upload your PDF resume to automatically extract skills and match opportunities.</p>

            <div className="border border-dashed border-slate-200 dark:border-slate-800 hover:border-brand-indigo/60 dark:hover:border-brand-indigo/60 hover:bg-brand-indigo/2 dark:hover:bg-brand-indigo/5 rounded-xl p-8 text-center transition-all bg-slate-50/50 dark:bg-slate-950/40">
                <input
                    type="file"
                    id="resume-upload"
                    hidden
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-4 space-y-4">
                        <div className="w-12 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg animate-shimmer relative overflow-hidden flex flex-col justify-end p-2 border border-slate-300 dark:border-slate-700">
                            <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-2/3 mb-1 animate-shimmer"></div>
                            <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-1/2 animate-shimmer"></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider animate-pulse">AI is parsing your credentials...</span>
                    </div>
                ) : !file && !user?.resumeURL ? (
                    <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center mb-3 border border-slate-200/40 dark:border-slate-800/40">
                            <UploadCloud className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload your resume</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1 uppercase tracking-wider">PDF format only (Max 5MB)</span>
                    </label>
                ) : (
                    <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 rounded-xl flex items-center justify-center mr-3 border border-red-100 dark:border-red-900/30">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="text-left overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">{file ? file.name : 'Current Resume'}</p>
                                {user?.resumeURL && !file && (
                                    <a href={user.resumeURL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-indigo hover:text-brand-indigo-dark transition-colors hover:underline">
                                        View Uploaded Resume
                                    </a>
                                )}
                            </div>
                        </div>
                        {file && (
                            <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {file && !loading && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleUpload}
                        className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        Analyze Resume
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 text-red-650 dark:text-red-450 p-3 rounded-lg text-xs font-semibold flex items-center">
                    <X className="w-3.5 h-3.5 mr-2" /> {error}
                </div>
            )}

            {(resumeSuccess || (user?.profile?.skills && user.profile.skills.length > 0)) && !loading && (
                <div className="mt-6 border-t border-slate-100 dark:border-slate-800/60 pt-6">
                    <div className="flex items-center text-accent-emerald-dark dark:text-accent-emerald text-xs font-bold uppercase tracking-wider mb-4">
                        <CheckCircle className="w-4 h-4 mr-2 text-accent-emerald" /> AI Profile Analysis Complete
                    </div>

                    {user?.profile?.skills && (
                        <div className="flex flex-wrap gap-2">
                            {user.profile.skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 text-slate-700 dark:text-slate-300"
                                >
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
