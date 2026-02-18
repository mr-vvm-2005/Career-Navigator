import React, { useState, useEffect } from 'react';
import {
    Target,
    Search,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ChevronDown,
    Radar
} from 'lucide-react';
import { roles } from '../data/roles';
import { findSkillGaps } from '../utils/skillMatch';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar as RadarChart } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SkillGap = ({ resumeText, onSkillAnalysis }) => {
    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        if (resumeText) {
            const result = findSkillGaps(resumeText, selectedRole.skills);
            setAnalysis(result);
            if (onSkillAnalysis) onSkillAnalysis(result.matchPercentage);
        }
    }, [resumeText, selectedRole]);

    const radarData = {
        labels: selectedRole.skills,
        datasets: [
            {
                label: 'Your Accuracy',
                data: selectedRole.skills.map(skill =>
                    resumeText.toLowerCase().includes(skill.toLowerCase()) ? 10 : 2
                ),
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderColor: 'rgba(14, 165, 233, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(14, 165, 233, 1)',
            },
            {
                label: 'Market Expectation',
                data: selectedRole.skills.map(() => 10),
                backgroundColor: 'rgba(226, 232, 240, 0.1)',
                borderColor: 'rgba(203, 213, 225, 1)',
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0,
            },
        ],
    };

    const radarOptions = {
        scales: {
            r: {
                angleLines: { display: false },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: { display: false }
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Role-Based Skill Gap Analysis</h1>
                <p className="text-slate-500 mt-1">Select your target role to see how well your profile aligns with market expectations.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Role Selection */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Target Job Role</label>
                    <div className="space-y-3">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role)}
                                className={`w-full card p-4 text-left transition-all ${selectedRole.id === role.id
                                        ? 'border-primary-500 ring-2 ring-primary-500/10 bg-primary-50/20'
                                        : 'hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-bold ${selectedRole.id === role.id ? 'text-primary-700' : 'text-slate-900'}`}>
                                        {role.title}
                                    </span>
                                    {selectedRole.id === role.id && <CheckCircle2 size={18} className="text-primary-600" />}
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Visual Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    {!resumeText ? (
                        <div className="card h-full flex flex-col items-center justify-center text-center py-20 bg-slate-50 border-dashed border-2">
                            <Target size={48} className="text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900">Waiting for Resume</h3>
                            <p className="text-xs text-slate-500 max-w-xs mt-2">Go to the Resume Analyzer tab first and provide your professional details.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Match Score */}
                                <div className="card flex flex-col items-center justify-center py-8">
                                    <span className="text-sm font-medium text-slate-500 mb-2">Skill Match %</span>
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="64" cy="64" r="58"
                                                stroke="currentColor" strokeWidth="8"
                                                fill="transparent"
                                                className="text-slate-100"
                                            />
                                            <circle
                                                cx="64" cy="64" r="58"
                                                stroke="currentColor" strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={364.4}
                                                strokeDashoffset={364.4 - (364.4 * analysis?.matchPercentage) / 100}
                                                className="text-primary-600 transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <span className="absolute text-3xl font-black text-slate-900">{analysis?.matchPercentage}%</span>
                                    </div>
                                    <p className="mt-4 text-xs font-bold text-slate-400 font-mono tracking-widest">{selectedRole.title.toUpperCase()}</p>
                                </div>

                                {/* Radar Chart */}
                                <div className="card p-4 flex flex-col items-center justify-center">
                                    <span className="text-sm font-medium text-slate-500 mb-4">Competency Map</span>
                                    <div className="w-full h-48 flex items-center justify-center">
                                        <RadarChart data={radarData} options={radarOptions} />
                                    </div>
                                </div>
                            </div>

                            {/* Skills Breakdown */}
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="card border-green-100">
                                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        Skills You Have ({analysis?.matchedSkills.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis?.matchedSkills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="card border-red-100">
                                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <XCircle size={16} className="text-red-500" />
                                        Missing Skills ({analysis?.missingSkills.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis?.missingSkills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Priority Learning */}
                            <div className="card bg-slate-900 text-white relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="text-primary-400" size={20} />
                                    <h4 className="font-bold">Next Priority for you</h4>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <p className="text-sm text-slate-400">
                                        Based on your gap, you should focus on <span className="text-white font-bold">{analysis?.missingSkills[0] || "Advanced Topics"}</span> next.
                                    </p>
                                    <button className="btn-primary py-2 text-sm whitespace-nowrap">
                                        Generate Roadmap
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillGap;
