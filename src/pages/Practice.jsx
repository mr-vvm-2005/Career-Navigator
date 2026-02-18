import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Zap,
    Flame,
    CheckCircle,
    Lock,
    ChevronRight,
    Code,
    Layers,
    Server,
    Monitor,
    Cpu,
    UserCheck,
    RotateCcw,
    Star,
    Check
} from 'lucide-react';

const quizData = {
    'DSA': [
        { q: "What is the time complexity of searching in a Hash Map?", a: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correct: 0 },
        { q: "Which data structure follows LIFO?", a: ["Queue", "Stack", "Linked List", "Tree"], correct: 1 },
        { q: "Which sorting algorithm is usually fastest for large datasets?", a: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"], correct: 2 }
    ],
    'Frontend': [
        { q: "Which hook is used for side effects in functional components?", a: ["useState", "useContext", "useEffect", "useMemo"], correct: 2 },
        { q: "What does JSX stand for?", a: ["JavaScript XML", "JavaScript Xerox", "Java Syntax Extension", "JSON XML"], correct: 0 }
    ],
    'Backend': [
        { q: "What does REST stand for?", a: ["Representational State Transfer", "Relational System Transfer", "Remote State Table", "Rendering Standard Text"], correct: 0 },
        { q: "Which HTTP method is typically used to create a new resource?", a: ["GET", "PUT", "POST", "DELETE"], correct: 2 }
    ]
};

const Practice = () => {
    const { practiceData, updatePractice, userStats, updateStats } = useApp();
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const categories = [
        { id: 'DSA', title: 'Data Structures', icon: Code, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'Frontend', title: 'Frontend Dev', icon: Monitor, color: 'text-sky-500', bg: 'bg-sky-50' },
        { id: 'Backend', title: 'Backend Dev', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'System Design', title: 'System Design', icon: Layers, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'Core CS', title: 'Core Subjects', icon: Cpu, color: 'text-rose-500', bg: 'bg-rose-50' },
        { id: 'Soft Skills', title: 'Soft Skills', icon: UserCheck, color: 'text-teal-500', bg: 'bg-teal-50' },
    ];

    const handleAnswer = (idx) => {
        const isCorrect = idx === quizData[activeQuiz][quizIndex].correct;
        if (isCorrect) {
            setQuizScore(prev => prev + 1);
        }

        if (quizIndex + 1 < quizData[activeQuiz].length) {
            setQuizIndex(prev => prev + 1);
        } else {
            setQuizComplete(true);
            const finalScore = quizScore + (isCorrect ? 1 : 0);
            const scorePercent = Math.round((finalScore / quizData[activeQuiz].length) * 100);

            updateStats({
                points: userStats.points + (scorePercent >= 70 ? 200 : 50),
                quizResults: { ...userStats.quizResults, [activeQuiz]: scorePercent }
            });
        }
    };

    if (activeQuiz) {
        return (
            <div className="max-w-3xl mx-auto py-6 sm:py-12">
                <button
                    onClick={() => { setActiveQuiz(null); setQuizIndex(0); setQuizScore(0); setQuizComplete(false); }}
                    className="mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-all px-4"
                >
                    <RotateCcw className="w-4 h-4" /> Exit
                </button>

                {!quizComplete ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-premium border border-slate-100 mx-4">
                        <div className="flex justify-between items-center mb-6 sm:mb-10">
                            <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest leading-none">
                                Q {quizIndex + 1} / {quizData[activeQuiz].length}
                            </span>
                            <div className="w-20 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((quizIndex + 1) / quizData[activeQuiz].length) * 100}%` }}></div>
                            </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 sm:mb-8 leading-tight">
                            {quizData[activeQuiz][quizIndex].q}
                        </h2>

                        <div className="grid gap-3">
                            {quizData[activeQuiz][quizIndex].a.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="w-full p-4 sm:p-5 text-left bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-xl sm:rounded-2xl text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all active:scale-[0.98]"
                                >
                                    <span className="inline-flex w-7 h-7 sm:w-8 sm:h-8 items-center justify-center bg-white rounded-lg mr-3 sm:mr-4 text-xs shadow-sm font-black">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 sm:p-12 rounded-2xl sm:rounded-[3rem] shadow-premium border border-slate-100 text-center mx-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-emerald-500" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Complete!</h2>
                        <p className="text-sm sm:text-base text-slate-500 font-medium mb-8 sm:mb-10">You've unlocked your mastery profile for {activeQuiz}.</p>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
                            <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl">
                                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">XP EARNED</p>
                                <p className="text-xl sm:text-2xl font-black text-indigo-600">+{quizScore * 50}</p>
                            </div>
                            <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl">
                                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ACCURACY</p>
                                <p className="text-xl sm:text-2xl font-black text-slate-900">{Math.round((quizScore / quizData[activeQuiz].length) * 100)}%</p>
                            </div>
                        </div>

                        <button
                            onClick={() => { setActiveQuiz(null); setQuizComplete(false); setQuizIndex(0); setQuizScore(0); }}
                            className="mt-8 sm:mt-10 w-full py-4 bg-indigo-600 text-white font-black rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all text-sm sm:text-base"
                        >
                            Back to Hub
                        </button>
                    </motion.div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Personalized Path</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Practice Tracker</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">Build consistency and earn XP to unlock elite tier badges.</p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] shadow-soft border border-slate-100 flex items-center gap-3 sm:gap-4 flex-1 sm:flex-initial">
                        <div className="w-10 h-10 sm:w-12 h-12 bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
                            <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div>
                            <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Tier</p>
                            <h4 className="font-black text-slate-900 leading-none text-sm sm:text-base">{userStats.levelBadge}</h4>
                        </div>
                    </div>

                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] shadow-soft border border-slate-100 flex items-center gap-3 sm:gap-4 px-4 sm:px-6 flex-1 sm:flex-initial">
                        <div className="text-right w-full">
                            <p className="text-[8px] sm:text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Total Points</p>
                            <h4 className="font-black text-slate-900 leading-none text-sm sm:text-base">{userStats.points.toLocaleString()} XP</h4>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {categories.map((cat, i) => {
                    const tasks = practiceData[cat.id] || [];
                    const completedCount = tasks.filter(t => t.completed).length;
                    const progress = Math.round((completedCount / tasks.length) * 100) || 0;

                    return (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl sm:rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden group hover:shadow-premium transition-all shrink-0"
                        >
                            <div className={`p-4 sm:p-6 border-b border-slate-50 flex items-center justify-between ${cat.bg}`}>
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{progress}% DONE</span>
                                    {quizData[cat.id] && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveQuiz(cat.id); }}
                                            className="mt-1 px-2 sm:px-3 py-1 bg-white text-indigo-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md shadow-sm border border-indigo-100"
                                        >
                                            Take Test
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-center gap-2">
                                    <h3 className="font-black text-slate-900 tracking-tight text-sm sm:text-base truncate">{cat.title}</h3>
                                    <span className="text-[8px] bg-indigo-50 text-indigo-500 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-widest whitespace-nowrap shrink-0">
                                        {(userStats.name || 'Student').split(' ')[0]}'s Card
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {tasks.map((task) => (
                                        <button
                                            key={task.id}
                                            onClick={() => updatePractice(cat.id, task.id)}
                                            className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-all group/item text-left"
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 bg-white'
                                                    }`}>
                                                    {task.completed && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                                </div>
                                                <span className={`text-[11px] sm:text-xs font-bold truncate ${task.completed ? 'text-slate-300 line-through' : 'text-slate-600'}`}>
                                                    {task.text}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-3 h-3 text-slate-300 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl sm:rounded-[3rem] shadow-premium flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden">
                <div className="absolute left-[-50px] top-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 space-y-1 sm:space-y-2 text-center md:text-left">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Elite Tier Challenges</h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Complete more modules to unlock mock interview sessions.</p>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 sm:p-4 bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-700">
                        <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                    </div>
                    <button className="bg-indigo-600 text-white text-xs sm:text-sm font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl opacity-50 cursor-not-allowed whitespace-nowrap">
                        2000 XP REQUIRED
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Practice;
