import React, { useState } from 'react';
import {
    FileText,
    Search,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Sparkles
} from 'lucide-react';
import { analyzeResume } from '../utils/atsScoring';

const ResumeAnalyzer = ({ onAnalysisComplete, initialResume = "" }) => {
    const [resumeText, setResumeText] = useState(initialResume);
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        if (!resumeText.trim()) return;
        setIsAnalyzing(true);

        // Simulate processing time
        setTimeout(() => {
            const result = analyzeResume(resumeText);
            setAnalysis(result);
            onAnalysisComplete(result, resumeText);
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">ATS Resume Analyzer</h1>
                <p className="text-slate-500 mt-1">Paste your resume text below to get an instant evaluation based on industry standards.</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="card space-y-4 h-fit">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Resume Plain Text</label>
                        <span className="text-xs text-slate-400">{resumeText.split(/\s+/).filter(Boolean).length} words</span>
                    </div>
                    <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your professional summary, experience, and skills here..."
                        className="input-field min-h-[400px] font-mono text-sm leading-relaxed resize-none"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={!resumeText.trim() || isAnalyzing}
                        className={`w-full btn-primary flex items-center justify-center gap-2 ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw size={20} className="animate-spin" />
                                Analyzing Patterns...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Evaluate ATS Score
                            </>
                        )}
                    </button>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {!analysis && !isAnalyzing ? (
                        <div className="card flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 border-dashed border-2">
                            <div className="p-6 bg-slate-100 rounded-full text-slate-400 mb-6">
                                <Search size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">No Analysis Yet</h3>
                            <p className="text-slate-500 mt-2 max-w-xs px-4">Paste your resume and click evaluate to see your strengths and improvement areas.</p>
                        </div>
                    ) : isAnalyzing ? (
                        <div className="card flex flex-col items-center justify-center text-center py-20">
                            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-6"></div>
                            <h3 className="text-xl font-bold text-slate-900">Running ATS Algorithms</h3>
                            <p className="text-slate-500 mt-2">Checking for keywords, structure, and metrics...</p>
                        </div>
                    ) : (
                        <>
                            {/* Score Card */}
                            <div className="card bg-slate-900 text-white border-none relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-20 blur-3xl -mr-10 -mt-10"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-400">Overall ATS Score</h3>
                                        <div className="text-6xl font-black mt-2 tracking-tighter">
                                            {analysis.score}<span className="text-2xl text-primary-500">/100</span>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-lg font-bold text-sm ${analysis.score >= 80 ? 'bg-green-500/20 text-green-400' :
                                            analysis.score >= 50 ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-red-500/20 text-red-400'
                                        }`}>
                                        {analysis.score >= 80 ? 'EXCELLENT' : analysis.score >= 50 ? 'GOOD' : 'POOR'}
                                    </div>
                                </div>
                            </div>

                            {/* Insights */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="card p-4 border-green-100 bg-green-50/30">
                                    <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
                                        <CheckCircle2 size={18} />
                                        <span>Strengths</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {analysis.strengths.map((s, i) => (
                                            <li key={i} className="text-xs text-green-800 flex items-start gap-2">
                                                <span className="mt-1 w-1 h-1 rounded-full bg-green-500 shrink-0"></span>
                                                {s}
                                            </li>
                                        ))}
                                        {analysis.strengths.length === 0 && <li className="text-xs text-slate-400 italic">No major strengths detected.</li>}
                                    </ul>
                                </div>

                                <div className="card p-4 border-red-100 bg-red-50/30">
                                    <div className="flex items-center gap-2 text-red-700 font-bold mb-3">
                                        <AlertCircle size={18} />
                                        <span>Weaknesses</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {analysis.weaknesses.map((w, i) => (
                                            <li key={i} className="text-xs text-red-800 flex items-start gap-2">
                                                <span className="mt-1 w-1 h-1 rounded-full bg-red-500 shrink-0"></span>
                                                {w}
                                            </li>
                                        ))}
                                        {analysis.weaknesses.length === 0 && <li className="text-xs text-slate-400 italic">No major issues found.</li>}
                                    </ul>
                                </div>
                            </div>

                            {/* Improvement Suggestions */}
                            <div className="card border-primary-100 bg-primary-50/30">
                                <div className="flex items-center gap-2 text-primary-700 font-bold mb-4">
                                    <Lightbulb size={18} />
                                    <span>Improvement Roadmap</span>
                                </div>
                                <div className="space-y-4">
                                    {analysis.suggestions.map((s, i) => (
                                        <div key={i} className="flex gap-3 text-sm text-primary-900 bg-white p-3 rounded-xl border border-primary-100 shadow-sm">
                                            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            {s}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-primary-100 flex justify-center">
                                    <a
                                        href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 font-bold flex items-center gap-2 hover:underline"
                                    >
                                        Update Resume in Builder
                                        <RefreshCw size={16} />
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
