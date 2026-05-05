import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { findSkillGaps } from '../utils/skillEngine';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {
    Target,
    Zap,
    ShieldCheck,
    Search,
    BrainCircuit,
    ArrowRight
} from 'lucide-react';
import { toast } from 'react-toastify';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const roles = [
    { 
        id: 'frontend', 
        title: 'Frontend Developer', 
        skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Tailwind', 'Next.js', 'Redux', 'Git', 'HTML5', 'Testing'],
        coreSkills: ['React', 'JavaScript', 'TypeScript']
    },
    { 
        id: 'backend', 
        title: 'Backend Developer', 
        skills: ['Node.js', 'Express', 'SQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Python', 'GraphQL', 'Microservices'],
        coreSkills: ['Node.js', 'SQL', 'Express']
    },
    { 
        id: 'data', 
        title: 'Data Analyst', 
        skills: ['Python', 'SQL', 'Excel', 'Tableau', 'PowerBI', 'Pandas', 'NumPy', 'Statistics', 'R', 'Visualization'],
        coreSkills: ['SQL', 'Python', 'Statistics']
    },
    { 
        id: 'fullstack', 
        title: 'Full Stack Engineer', 
        skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'REST API', 'Prisma', 'Next.js', 'Cloud', 'Auth', 'CI/CD'],
        coreSkills: ['React', 'Node.js', 'PostgreSQL']
    }
];

const SkillGap = () => {
    const { userStats, updateStats, user } = useApp();
    const [activeRoleId, setActiveRoleId] = useState(userStats.targetRole || 'frontend');

    const selectedRole = roles.find(r => r.id === activeRoleId) || roles[0];

    // Memoize the gap analysis to avoid unnecessary recalculations
    const gapAnalysis = useMemo(() => {
        return findSkillGaps(userStats.resumeText || "", selectedRole.skills);
    }, [userStats.resumeText, selectedRole]);

    const handleRoleChange = async (roleId) => {
        setActiveRoleId(roleId);
        try {
            await updateStats({ 
                targetRole: roleId,
                skillMatch: gapAnalysis.matchPercentage 
            });
        } catch (err) {
            console.error(err);
        }
    };

    const chartData = {
        labels: selectedRole.skills.slice(0, 6),
        datasets: [{
            label: 'Market Match',
            data: selectedRole.skills.slice(0, 6).map(skill => 
                gapAnalysis.matchedSkills.includes(skill) ? 100 : 20
            ),
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: '#4f46e5',
            pointBackgroundColor: '#4f46e5',
            borderWidth: 2,
        }]
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Market Alignment</span>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Role Gap Analysis</h1>
                    <p className="text-slate-500 mt-2 font-medium">Compare your profile against industry-standard tech stacks.</p>
                </div>
                {userStats.resumeText.length === 0 && (
                    <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl text-red-600 text-xs font-bold animate-pulse">
                        ⚠️ Please analyze your resume first for accurate results.
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Role Selector */}
                <div className="lg:col-span-4 space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Select Target Path</label>
                    <div className="space-y-3">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => handleRoleChange(role.id)}
                                className={`w-full p-5 text-left rounded-[1.5rem] border transition-all flex items-center justify-between group ${
                                    activeRoleId === role.id
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02]'
                                    : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
                                }`}
                            >
                                <div>
                                    <h3 className="font-black text-base">{role.title}</h3>
                                    <p className={`text-[10px] mt-1 ${activeRoleId === role.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                        {role.skills.slice(0, 3).join(' • ')}
                                    </p>
                                </div>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                    activeRoleId === role.id ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'
                                }`}>
                                    <Target size={18} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Analytics */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 grid md:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-full aspect-square max-w-[280px]">
                                <Radar
                                    data={chartData}
                                    options={{
                                        scales: { 
                                            r: { 
                                                min: 0,
                                                max: 100,
                                                ticks: { display: false, stepSize: 20 }, 
                                                angleLines: { color: '#f1f5f9' }, 
                                                grid: { color: '#f1f5f9' },
                                                pointLabels: { font: { size: 10, weight: '700' }, color: '#64748b' }
                                            } 
                                        },
                                        plugins: { legend: { display: false } }
                                    }}
                                />
                            </div>
                            <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Skill Coverage Map</p>
                        </div>

                        <div className="flex flex-col justify-center space-y-6">
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                                <div className={`w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-4xl font-black ${
                                    gapAnalysis.matchPercentage > 70 ? 'text-emerald-500' : 
                                    gapAnalysis.matchPercentage > 40 ? 'text-indigo-600' : 'text-amber-500'
                                }`}>
                                    {gapAnalysis.matchPercentage}%
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Stack Readiness</h4>
                                    <p className="text-xs text-slate-500 font-medium">Automatic match with resume</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">High Impact Missing Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {gapAnalysis.missingSkills.length > 0 ? (
                                        gapAnalysis.missingSkills.slice(0, 6).map(skill => (
                                            <div key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-black border border-indigo-100/50">
                                                {skill}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                            <ShieldCheck size={18} /> Fully Aligned for this role!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] shadow-premium text-white relative overflow-hidden group"
                    >
                        <BrainCircuit className="absolute right-[-20px] top-[-20px] w-64 h-64 text-indigo-500/20 group-hover:rotate-12 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-5 max-w-lg">
                            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <Zap className="w-8 h-8 text-indigo-300" />
                                Growth Strategy
                            </h3>
                            <p className="text-indigo-100 font-medium text-sm leading-relaxed">
                                {gapAnalysis.missingSkills.length > 0 ? (
                                    <>
                                        Focusing on <span className="text-white font-black underline decoration-indigo-400">{gapAnalysis.missingSkills[0]}</span> and 
                                        <span className="text-white font-black"> {gapAnalysis.missingSkills[1] || 'related tech'}</span> will bridge your current gap by <span className="text-emerald-300 font-black">~15%</span> within 2 weeks.
                                    </>
                                ) : (
                                    "You have mastered the primary tech stack for this role. Time to focus on system design and soft skill interviews to seal the deal."
                                )}
                            </p>
                            <button className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-black text-sm hover:shadow-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 group/btn active:scale-95">
                                Start Optimized Learning
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SkillGap;

