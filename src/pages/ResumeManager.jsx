import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, 
    Plus, 
    Trash2, 
    Download, 
    Clock, 
    Briefcase,
    Star,
    AlertCircle,
    CheckCircle2,
    Eye
} from 'lucide-react';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ResumeManager = () => {
    const { user } = useApp();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        const fetchResumes = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().resumes) {
                    setResumes(docSnap.data().resumes);
                }
            } catch (error) {
                console.error("Failed to load resumes:", error);
            }
            setLoading(false);
        };
        fetchResumes();
    }, [user]);

    const saveResumes = async (updatedResumes) => {
        setResumes(updatedResumes);
        if (user) {
            try {
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, { resumes: updatedResumes });
            } catch (error) {
                console.error("Failed to save resumes:", error);
            }
        }
    };

    const handleCreate = () => {
        if (!newTitle.trim() || !newRole.trim()) return;
        
        const newResume = {
            id: Date.now().toString(),
            title: newTitle,
            targetRole: newRole,
            atsScore: Math.floor(Math.random() * 20) + 70, // Simulated score
            lastModified: new Date().toISOString(),
            status: 'Draft'
        };

        const updated = [...resumes, newResume];
        saveResumes(updated);
        setNewTitle('');
        setNewRole('');
        setIsCreating(false);
    };

    const handleDelete = (id) => {
        const updated = resumes.filter(r => r.id !== id);
        saveResumes(updated);
    };

    const handleDownload = (id) => {
        alert("Downloading PDF... (In a real app, this would trigger html2canvas or fetch from Firebase Cloud Storage)");
    };

    if (loading) {
        return <div className="text-center py-20 animate-pulse text-slate-400 font-bold tracking-widest uppercase text-xs">Loading Version History...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Document Hub</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Resume Version Manager</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">Create tailored resumes for specific job roles and track their ATS effectiveness.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-indigo-600 text-white font-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    New Version
                </button>
            </header>

            {isCreating && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-premium border border-slate-100 flex flex-col md:flex-row gap-4 items-end"
                >
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Profile Name</label>
                        <input 
                            type="text" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="e.g. Google SWE Application"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Role</label>
                        <input 
                            type="text" 
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            placeholder="e.g. Frontend Developer"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => setIsCreating(false)}
                            className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors flex-1"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreate}
                            disabled={!newTitle || !newRole}
                            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-xl transition-all shadow-md flex-1"
                        >
                            Save Target
                        </button>
                    </div>
                </motion.div>
            )}

            {resumes.length === 0 && !isCreating ? (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-12 text-center group transition-colors hover:border-indigo-300">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">No tailored versions found</h3>
                    <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto">
                        Stop sending the same generic resume everywhere. Start creating role-specific versions to boost your ATS matching score.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {resumes.map((resume) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-premium transition-all group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{resume.atsScore}% ATS</span>
                                    </div>
                                </div>
                                
                                <div className="flex-1 space-y-2 mb-8">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                                        {resume.title}
                                    </h3>
                                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                                        <Target className="w-4 h-4 text-slate-400" />
                                        {resume.targetRole}
                                    </p>
                                    <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-4">
                                        <Clock className="w-3.5 h-3.5" />
                                        Updated: {new Date(resume.lastModified).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                                    <a 
                                        href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" /> Edit
                                    </a>
                                    <button 
                                        onClick={() => handleDownload(resume.id)}
                                        className="w-10 h-10 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(resume.id)}
                                        className="w-10 h-10 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

// Also adding a temporary Target icon mock to fix imports missing local reference if needed:
const Target = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;

export default ResumeManager;
