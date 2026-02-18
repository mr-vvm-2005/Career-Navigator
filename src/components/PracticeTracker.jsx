import React, { useState, useEffect } from 'react';
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

const PracticeTracker = ({ onProgressUpdate }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('placement-tasks');
        if (saved) return JSON.parse(saved);
        return {
            'DSA': [
                { id: 1, text: 'Arrays & Hashing', completed: false },
                { id: 2, text: 'Two Pointers', completed: false },
                { id: 3, text: 'Sliding Window', completed: false },
                { id: 4, text: 'Linked Lists', completed: false },
                { id: 5, text: 'Trees & Graphs', completed: false },
            ],
            'Core Subjects': [
                { id: 6, text: 'Operating Systems', completed: false },
                { id: 7, text: 'DBMS & SQL', completed: false },
                { id: 8, text: 'Computer Networks', completed: false },
                { id: 9, text: 'System Design', completed: false },
            ],
            'Aptitude': [
                { id: 10, text: 'Quantitative Aptitude', completed: false },
                { id: 11, text: 'Logical Reasoning', completed: false },
                { id: 12, text: 'Verbal Ability', completed: false },
            ],
            'Mock Prep': [
                { id: 13, text: 'Behavioral Prep', completed: false },
                { id: 14, text: 'Technical Mock (L1)', completed: false },
                { id: 15, text: 'System Design Mock', completed: false },
            ]
        };
    });

    useEffect(() => {
        localStorage.setItem('placement-tasks', JSON.stringify(tasks));

        // Calculate total progress
        const allTasks = Object.values(tasks).flat();
        const completed = allTasks.filter(t => t.completed).length;
        const progress = Math.round((completed / allTasks.length) * 100);

        if (onProgressUpdate) onProgressUpdate(progress);
    }, [tasks]);

    const toggleTask = (category, id) => {
        setTasks(prev => {
            const updatedCategory = prev[category].map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            return { ...prev, [category]: updatedCategory };
        });
    };

    const categories = [
        { name: 'DSA', icon: Code, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Core Subjects', icon: Book, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Aptitude', icon: BrainCircuit, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Mock Prep', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Practice Tracker</h1>
                    <p className="text-slate-500 mt-1">Consistency is the secret to getting placed. Track your daily wins.</p>
                </div>

                {/* Overall Progress Mini Card */}
                <div className="card p-4 flex items-center gap-4 border-primary-100 bg-primary-50/20">
                    <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-primary-700 uppercase tracking-wider text-[10px]">Total Completion</span>
                        <div className="flex items-end gap-1">
                            <span className="text-2xl font-black text-slate-900 leading-none">
                                {Math.round((Object.values(tasks).flat().filter(t => t.completed).length / Object.values(tasks).flat().length) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {categories.map((cat) => {
                    const catTasks = tasks[cat.name];
                    const completedCount = catTasks.filter(t => t.completed).length;
                    const progress = Math.round((completedCount / catTasks.length) * 100);
                    const Icon = cat.icon;

                    return (
                        <div key={cat.name} className="card p-0 overflow-hidden group">
                            <div className={`p-6 border-b border-slate-100 flex items-center justify-between ${cat.bg}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white ${cat.color} shadow-sm`}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900">{cat.name}</h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-500 uppercase">{progress}% Done</span>
                                    <div className="w-24 h-1.5 bg-white rounded-full mt-1 overflow-hidden">
                                        <div
                                            className={`h-full ${cat.color.replace('text', 'bg')} transition-all duration-500`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-1">
                                {catTasks.map((task) => (
                                    <button
                                        key={task.id}
                                        onClick={() => toggleTask(cat.name, task.id)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${task.completed
                                                    ? 'bg-primary-600 border-primary-600 text-white'
                                                    : 'border-slate-200 bg-white group-hover/item:border-primary-400'
                                                }`}>
                                                {task.completed && <CheckSquare size={14} />}
                                            </div>
                                            <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="card bg-slate-50 border-dashed border-2 p-8 text-center">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-4">
                    <BarChart2 size={24} className="text-primary-600" />
                </div>
                <h4 className="font-bold text-slate-900">Persistence Pays Off</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    These tasks are based on the most common requirements for top-tier companies. Complete them to build a rock-solid profile.
                </p>
            </div>
        </div>
    );
};

export default PracticeTracker;
