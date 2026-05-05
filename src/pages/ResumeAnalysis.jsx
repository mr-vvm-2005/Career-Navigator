import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../utils/atsEngine';
import {
    SparklesIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    LightBulbIcon,
    ArrowPathIcon
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

const ResumeAnalysis = () => {
    const { userStats, updateStats, user } = useApp();
    const [text, setText] = useState(userStats.resumeText || "");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const performAnalysis = async () => {
        if (!text.trim()) {
            toast.warning("Please enter your resume text first.");
            return;
        }
        
        setIsAnalyzing(true);
        
        // Brief delay to simulate intelligent processing and show loading state
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        try {
            const results = analyzeResume(text);
            setAnalysis(results);
            
            // Persist to Firebase
            await updateStats({ 
                atsScore: results.score, 
                resumeText: text 
            });
            
            toast.success("Analysis complete and saved to cloud!");
        } catch (error) {
            console.error("Analysis failed", error);
            toast.error("Failed to process resume analysis.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Intelligent Engine</span>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">ATS Resume Intelligence</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Optimize your resume for applicant tracking systems with real-time feedback.
                    </p>
                </div>

            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Editor */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden flex flex-col h-[550px]">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">RESUME PLAIN TEXT</span>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-indigo-500">{text.split(/\s+/).filter(Boolean).length} words</span>
                                {userStats.resumeText === text && text.length > 0 && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                                        <Save size={10} /> Synced
                                    </span>
                                )}
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="flex-1 p-6 text-sm font-medium text-slate-700 focus:outline-none resize-none leading-relaxed transition-colors duration-300"
                            placeholder="Paste your resume content here (Ctrl+V)..."
                            disabled={isAnalyzing}
                        />
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                onClick={performAnalysis}
                                disabled={isAnalyzing || !text.trim()}
                                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                                    isAnalyzing || !text.trim() 
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 active:scale-[0.98]'
                                }`}
                            >
                                {isAnalyzing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <SparklesIcon className="w-5 h-5 text-indigo-200" />
                                )}
                                {isAnalyzing ? 'Decoding Semantics...' : 'Save & Analyze Resume'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6">
                    <AnimatePresence mode="wait">
                        {!analysis ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-indigo-600/5 border-2 border-dashed border-indigo-200 rounded-[2rem] p-8 text-center flex flex-col items-center justify-center h-[550px]"
                            >
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                                    <LightBulbIcon className="w-10 h-10 text-indigo-500" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Ready to audit?</h3>
                                <p className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
                                    Paste your resume content to start the professional ATS analysis. We'll score your structure, metrics, and language patterns.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar"
                            >
                                {/* Score Card */}
                                <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-indigo-100 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">ATS Readiness Score</p>
                                    <div className="text-8xl font-black text-slate-900 tracking-tighter mb-4">{analysis.score}</div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <SparklesIcon className="w-3 h-3" />
                                        {analysis.score >= 70 ? 'Industry Standard' : 'Needs Optimization'}
                                    </div>
                                </div>

                                {/* Analysis Breakdown */}
                                <div className="space-y-4">
                                    {analysis.strengths.length > 0 && (
                                        <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl">
                                            <h4 className="text-xs font-black text-emerald-700 flex items-center gap-2 mb-4 uppercase tracking-wider">
                                                <CheckCircleIcon className="w-5 h-5" /> STRENGTHS
                                            </h4>
                                            <div className="space-y-3">
                                                {analysis.strengths.map((s, idx) => (
                                                    <div key={idx} className="text-xs font-bold text-emerald-900 flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                                                        <span>{s}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {(analysis.weaknesses.length > 0 || analysis.suggestions.length > 0) && (
                                        <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl">
                                            <h4 className="text-xs font-black text-amber-700 flex items-center gap-2 mb-4 uppercase tracking-wider">
                                                <ExclamationCircleIcon className="w-5 h-5" /> IMPROVEMENTS
                                            </h4>
                                            <div className="space-y-3">
                                                {[...analysis.weaknesses, ...analysis.suggestions].slice(0, 5).map((item, idx) => (
                                                    <div key={idx} className="text-xs font-bold text-amber-900 flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl"
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                >
                                    Refine Resume Content
                                    <ArrowPathIcon className="w-5 h-5 text-slate-400" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysis;
