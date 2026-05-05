import React from 'react';
import {
    CheckSquare,
    ChevronRight,
    BarChart2,
    Code,
    Book,
    Users,
    BrainCircuit,
    Trophy
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PracticeTracker = () => {
    const { practiceData, updatePractice, userStats } = useApp();

    const categories = [
        { id: 'DSA', name: 'DSA', icon: Code, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 'Core CS', name: 'Core Subjects', icon: Book, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'Aptitude', name: 'Aptitude', icon: BrainCircuit, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'Mock Prep', name: 'Mock Prep', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const totalTasks = Object.values(practiceData || {}).flat().length;
    const completedTasks = Object.values(practiceData || {}).flat().filter(t => t.completed).length;
    const overallProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Practice Hub</h1>
                    <p className="text-slate-500 mt-1 font-medium">Consistency is the secret to success. Track your progress across modules.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Completion</span>
                        <div className="flex items-end gap-1">
                            <span className="text-2xl font-black text-slate-900 leading-none">{overallProgress}%</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {categories.map((cat) => {
                    const catTasks = (practiceData && practiceData[cat.id]) || [];
                    const completedCount = catTasks.filter(t => t.completed).length;
                    const progress = catTasks.length === 0 ? 0 : Math.round((completedCount / catTasks.length) * 100);
                    const Icon = cat.icon;

                    return (
                        <div key={cat.id} className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden group hover:shadow-premium transition-all">
                            <div className={`p-6 border-b border-slate-50 flex items-center justify-between ${cat.bg}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-white ${cat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 tracking-tight">{cat.name}</h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{progress}% DONE</span>
                                    <div className="w-24 h-2 bg-white rounded-full mt-2 overflow-hidden border border-slate-100">
                                        <div
                                            className={`h-full ${cat.color.replace('text', 'bg')} transition-all duration-700 ease-out`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-1">
                                {catTasks.map((task) => (
                                    <button
                                        key={task.id}
                                        onClick={() => updatePractice(cat.id, task.id)}
                                        className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-all group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed
                                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                                    : 'border-slate-200 bg-white group-hover/item:border-indigo-400'
                                                }`}>
                                                {task.completed && <CheckSquare size={14} />}
                                            </div>
                                            <span className={`text-sm font-bold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-600'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover/item:translate-x-1 group-hover/item:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center relative overflow-hidden group hover:border-indigo-300 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                    <BarChart2 size={120} />
                </div>
                <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 shadow-sm">
                    <BarChart2 size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Intelligence-Driven Learning</h4>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto font-medium">
                    Your progress is synchronized with our cloud engine. Keep practicing to reach the next tier and unlock exclusive interview resources.
                </p>
            </div>
        </div>
    );
};

export default PracticeTracker;
