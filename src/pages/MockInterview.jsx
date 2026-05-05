import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, CheckCircle2, AlertCircle, XCircle, Award, StopCircle, RefreshCw } from 'lucide-react';

const mockQuestions = [
    {
        id: 1,
        text: "Design a URL shortener system like TinyURL. What database would you choose and why?",
        type: "System Design",
        timeLimit: 120
    },
    {
        id: 2,
        text: "Tell me about a time you had to deal with a difficult team member.",
        type: "HR & Behavioral",
        timeLimit: 90
    },
    {
        id: 3,
        text: "What is the output of `console.log(typeof null)` in JavaScript and why?",
        type: "Frontend",
        timeLimit: 60
    }
];

const MockInterview = () => {
    const [status, setStatus] = useState('idle'); // idle, active, finished
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState({});

    const currentQuestion = mockQuestions[currentQuestionIndex];

    useEffect(() => {
        let timer;
        if (status === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && status === 'active') {
            handleNext();
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const startInterview = () => {
        setStatus('active');
        setCurrentQuestionIndex(0);
        setTimeLeft(mockQuestions[0].timeLimit);
        setAnswers({});
    };

    const handleNext = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimeLeft(mockQuestions[currentQuestionIndex + 1].timeLimit);
        } else {
            setStatus('finished');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-2 block">Performance Testing</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Mock Interview Arena</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">Simulate real pressure environments with timer-based question formats.</p>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-8 sm:p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Play className="w-10 h-10 fill-rose-500 translate-x-1" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Ready to test your skills?</h2>
                        <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
                            You will face 3 strictly timed questions ranging from System Design to Behavioral.
                        </p>
                        <button
                            onClick={startInterview}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-3 mx-auto"
                        >
                            <Play className="w-5 h-5 fill-white" /> Start Simulation
                        </button>
                    </motion.div>
                )}

                {status === 'active' && (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden"
                    >
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">
                                    {currentQuestionIndex + 1}
                                </span>
                                <span className="font-bold text-slate-300">/ {mockQuestions.length}</span>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-black tracking-widest ${
                                timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-white/10'
                            }`}>
                                <Clock className="w-4 h-4" />
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </div>
                        </div>

                        <div className="p-8 sm:p-12">
                            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-widest mb-6">
                                {currentQuestion.type}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-8 leading-relaxed">
                                {currentQuestion.text}
                            </h3>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Answer</label>
                                <textarea
                                    value={answers[currentQuestion.id] || ''}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                                    placeholder="Type your structured response here..."
                                    className="w-full h-40 p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium text-slate-700"
                                />
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
                                >
                                    <StopCircle className="w-5 h-5" /> Abort
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                                >
                                    {currentQuestionIndex === mockQuestions.length - 1 ? 'Finish' : 'Submit & Next'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'finished' && (
                    <motion.div
                        key="finished"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-8 sm:p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Award className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Simulation Complete</h2>
                        <p className="text-slate-500 font-medium mb-8">
                            Your responses have been saved. AI evaluation takes a minute to process readability, structure, and keyword density.
                        </p>
                        
                        <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 space-y-4 shadow-inner">
                            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                                <span>Questions Attempted</span>
                                <span className="text-slate-900">{Object.keys(answers).length} / 3</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                                <span>Completeness Ratio</span>
                                <span className="text-emerald-500">85%</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setStatus('idle')}
                            className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-black px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-3 mx-auto"
                        >
                            <RefreshCw className="w-5 h-5" /> Retake Sim
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MockInterview;
