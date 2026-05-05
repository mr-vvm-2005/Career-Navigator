import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Target,
    Map as MapIcon,
    TrendingUp,
    CheckCircle2,
    FileText,
    Code,
    Flame
} from 'lucide-react';
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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dashboard = () => {
    const { userStats, updateStats } = useApp();

    const radarData = {
        labels: ['DSA', 'Frontend', 'Backend', 'System Design', 'Core CS', 'Soft Skills'],
        datasets: [{
            label: 'Current Proficiency',
            data: [
                (userStats?.quizResults?.['DSA']) || 30,
                (userStats?.quizResults?.['Frontend']) || 25,
                (userStats?.quizResults?.['Backend']) || 20,
                (userStats?.quizResults?.['System Design']) || 15,
                (userStats?.quizResults?.['Core CS']) || 10,
                (userStats?.quizResults?.['Soft Skills']) || 40
            ],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(79, 70, 229, 1)',
            pointBorderColor: '#fff',
        }]
    };

    const stats = [
        { label: 'ATS Score', value: `${userStats.atsScore}%`, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Skill Match', value: `${userStats.skillMatch}%`, icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { label: 'Readiness', value: `${userStats.readinessScore}/100`, icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50' },
        { label: 'Daily Streak', value: `${userStats.streak || 0} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-6 sm:space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] block">Candidate Portal</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">Career Intelligence</h1>
                    <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl">
                        Welcome back, <span className="text-indigo-600 font-bold">{userStats.name || 'Student'}</span>.
                        Start by <a href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/" target="_blank" rel="noreferrer" className="text-indigo-600 font-black hover:underline underline-offset-4 decoration-2">Creating your Resume</a> to update your metrics.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <select 
                        value={userStats.targetRole || "Software Developer"}
                        onChange={(e) => {
                            const newRole = e.target.value;
                            updateStats({ targetRole: newRole });
                        }}
                        className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
                    >
                        <option value="Software Developer">Software Developer</option>
                        <option value="Frontend Engineer">Frontend Engineer</option>
                        <option value="Backend Engineer">Backend Engineer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Product Manager">Product Manager</option>
                    </select>

                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white px-4 py-2.5 rounded-xl shadow-soft border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        REAL-TIME SYNC ACTIVE
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all group"
                    >
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                        <h4 className="text-lg sm:text-2xl font-black text-slate-900 leading-none">{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Visual Analytics */}
                <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Competency Mapping</h3>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium">Visualization of your multidimensional skill profile.</p>
                        </div>
                        <span className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 self-start">
                            Current Tier: {userStats.levelBadge}
                        </span>
                    </div>

                    <div className="aspect-square sm:aspect-video flex items-center justify-center max-w-full overflow-hidden p-4">
                        <Radar
                            data={radarData}
                            options={{
                                scales: { r: { min: 0, max: 100, ticks: { display: false } } },
                                plugins: { legend: { display: false } },
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>

                {/* Vertical Info Panel */}
                <div className="lg:col-span-4 space-y-6 sm:gap-8">

                    <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
                        <h4 className="font-black text-slate-900 tracking-tight mb-6">Recent Activity</h4>
                        <div className="space-y-6">
                            {[
                                { title: 'ATS Analysis', desc: 'Score updated to 78%', time: '2h ago', icon: FileText, color: 'text-indigo-500' },
                                { title: 'DSA Practice', desc: 'Completed "Linked Lists"', time: '5h ago', icon: Code, color: 'text-rose-500' },
                                { title: 'New Roadmap', desc: 'Frontend path generated', time: '1d ago', icon: MapIcon, color: 'text-amber-500' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-50 ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 border-b border-slate-50 pb-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="font-black text-slate-900 text-sm">{item.title}</h5>
                                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all">
                                View Full Activity Log
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
