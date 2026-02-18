import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SparklesIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    LightBulbIcon,
    ArrowPathIcon
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const ResumeAnalysis = () => {
    const { userStats, updateStats } = useApp();
    const [text, setText] = useState(userStats.resumeText || "");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const performAnalysis = () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);

        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let score = 40; // Base
            const strengths = [];
            const gaps = [];

            // Keyword detection
            if (lowerText.includes('summary') || lowerText.includes('profile')) { score += 10; strengths.push("Professional Summary detected"); }
            else gaps.push("Add a professional summary");

            if (lowerText.includes('skills')) { score += 10; strengths.push("Dedicated skills section"); }
            else gaps.push("Missing skills section");

            // Metric detection
            const metrics = (text.match(/\d+%|\d+\+|\$\d+/g) || []).length;
            if (metrics > 2) { score += 15; strengths.push("Uses measurable metrics"); }
            else gaps.push("Add more quantifiable achievements (%, $, +)");

            // Action Verbs
            const verbs = ['developed', 'implemented', 'designed', 'led', 'managed', 'optimized'];
            const verbCount = verbs.filter(v => lowerText.includes(v)).length;
            if (verbCount > 3) { score += 10; strengths.push("Strong use of action verbs"); }

            // Final calculation
            const finalScore = Math.min(100, score);
            setAnalysis({ score: finalScore, strengths, gaps });
            updateStats({ atsScore: finalScore, resumeText: text });

            setIsAnalyzing(false);
            toast.success("Analysis Complete!");
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Intelligent Engine</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">ATS Resume Intelligence</h1>
                <p className="text-slate-500 mt-2 font-medium">
                    Don't have a professional resume yet? <a href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">Complete Step 1</a> first.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Editor */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden flex flex-col h-[500px]">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">RESUME PLAIN TEXT</span>
                            <span className="text-[10px] font-bold text-indigo-500">{text.split(/\s+/).filter(Boolean).length} words</span>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="flex-1 p-6 text-sm font-medium text-slate-700 focus:outline-none resize-none leading-relaxed"
                            placeholder="Paste your resume content here..."
                        />
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                onClick={performAnalysis}
                                disabled={isAnalyzing || !text}
                                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isAnalyzing ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                                    }`}
                            >
                                {isAnalyzing ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5 text-indigo-400" />}
                                {isAnalyzing ? 'Processing Patterns...' : 'Analyze My Resume'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6">
                    <AnimatePresence mode="wait">
                        {!analysis ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="bg-indigo-600/5 border-2 border-dashed border-indigo-200 rounded-[2rem] p-8 text-center flex flex-col items-center justify-center h-[500px]"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                                    <LightBulbIcon className="w-8 h-8 text-indigo-500" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">Ready to audit?</h3>
                                <p className="text-sm text-slate-500 max-w-[200px]">Paste your content to start the professional ATS analysis.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Score Card */}
                                <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-indigo-100 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Quality Score</p>
                                    <div className="text-7xl font-black text-slate-900 tracking-tighter mb-4">{analysis.score}</div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <SparklesIcon className="w-3 h-3" />
                                        {analysis.score > 70 ? 'Optimal Performance' : 'Growth Potential'}
                                    </div>
                                </div>

                                {/* Analysis Breakdown */}
                                <div className="space-y-4">
                                    <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                                        <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-2 mb-3">
                                            <CheckCircleIcon className="w-4 h-4" /> STRENGTHS
                                        </h4>
                                        <div className="space-y-2">
                                            {analysis.strengths.map(s => (
                                                <div key={s} className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500" /> {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl">
                                        <h4 className="text-xs font-bold text-amber-700 flex items-center gap-2 mb-3">
                                            <ExclamationCircleIcon className="w-4 h-4" /> IMPROVEMENTS
                                        </h4>
                                        <div className="space-y-2">
                                            {analysis.gaps.map(g => (
                                                <div key={g} className="text-xs font-bold text-amber-900 flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-amber-500" /> {g}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    Edit in Resume Builder
                                    <ArrowPathIcon className="w-4 h-4" />
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysis;
