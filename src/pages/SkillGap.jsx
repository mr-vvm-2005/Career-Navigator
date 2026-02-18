import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
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
    Search
} from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const roles = [
    { id: 'frontend', title: 'Frontend Developer', skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Tailwind', 'Git'] },
    { id: 'backend', title: 'Backend Developer', skills: ['Node.js', 'Express', 'SQL', 'MongoDB', 'Redis', 'Docker'] },
    { id: 'data', title: 'Data Analyst', skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics', 'Pandas'] },
];

const SkillGap = () => {
    const { userStats, updateStats } = useApp();
    const [selectedRole, setSelectedRole] = useState(roles.find(r => r.id === userStats.targetRole) || roles[0]);

    const skillMatch = Math.round(Math.random() * 40 + 40); // Simulate match logic

    const chartData = {
        labels: selectedRole.skills,
        datasets: [{
            label: 'Your Level',
            data: selectedRole.skills.map(() => Math.floor(Math.random() * 5 + 5)), // Simulating skill levels
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: '#4f46e5',
            pointBackgroundColor: '#4f46e5',
        }]
    };

    return (
        <div className="space-y-8">
            <header>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Market Alignment</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Role Gap Analysis</h1>
                <p className="text-slate-500 mt-2 font-medium">Compare your current profile with high-demand industry roles.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Role Selector */}
                <div className="lg:col-span-4 space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Target Path</label>
                    <div className="space-y-3">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => {
                                    setSelectedRole(role);
                                    updateStats({ targetRole: role.id });
                                }}
                                className={`w-full p-6 text-left rounded-[2rem] border transition-all flex items-center justify-between group ${selectedRole.id === role.id
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                                    : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
                                    }`}
                            >
                                <div>
                                    <h3 className="font-black text-lg">{role.title}</h3>
                                    <p className={`text-xs ${selectedRole.id === role.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                        {role.skills.slice(0, 3).join(' • ')}...
                                    </p>
                                </div>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedRole.id === role.id ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'
                                    }`}>
                                    <Target className="w-6 h-6" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Analytics */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-soft border border-slate-100 grid md:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-48 h-48">
                                <Radar
                                    data={chartData}
                                    options={{
                                        scales: { r: { ticks: { display: false }, angleLines: { color: '#f1f5f9' }, grid: { color: '#f1f5f9' } } },
                                        plugins: { legend: { display: false } }
                                    }}
                                />
                            </div>
                            <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Competency Map</p>
                        </div>

                        <div className="flex flex-col justify-center space-y-6">
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl font-black text-indigo-600">
                                    {skillMatch}%
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Role Readiness</h4>
                                    <p className="text-xs text-slate-500">Based on Skillset & Resume</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">High Priority Gaps</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedRole.skills.slice(0, 4).map(skill => (
                                        <div key={skill} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-premium text-white relative overflow-hidden group">
                        <Zap className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-indigo-500/30 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 space-y-4 max-w-lg">
                            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <ShieldCheck className="w-8 h-8 text-indigo-300" />
                                Jumpstart Your Readiness
                            </h3>
                            <p className="text-indigo-100 font-medium">
                                We've identified that mastering <span className="text-white font-bold">{selectedRole.skills[0]}</span> will improve your match score by <span className="text-white font-bold">18%</span> for top-tier companies.
                            </p>
                            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                                Generate Optimized Roadmap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGap;
