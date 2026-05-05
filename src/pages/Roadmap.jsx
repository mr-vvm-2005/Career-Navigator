import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
    CalendarIcon,
    MapIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/solid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

const Roadmap = () => {
    const { userStats } = useApp();
    const roadmapRef = useRef();
    const [taskProgress, setTaskProgress] = useState({});

    const exportPDF = async () => {
        const element = roadmapRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Roadmap_${userStats.targetRole}.pdf`);
        // Note: react-toastify isn't imported correctly in standard projects if deleted, so we just use alert or ignore here if it's missing. Or we can just console.log.
    };

    const toggleTask = (taskId) => {
        setTaskProgress(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const phases = [
        { 
            id: 'p1', title: 'Foundations', week: 'Week 1-2', icon: AcademicCapIcon,
            tasks: [
                { id: 't1', text: 'JavaScript ES6+' },
                { id: 't2', text: 'Data Structures basics' },
                { id: 't3', text: 'Version Control with Git' }
            ] 
        },
        { 
            id: 'p2', title: 'Specialization', week: 'Week 3-4', icon: CodeBracketIcon,
            tasks: [
                { id: 't4', text: 'React Hooks' },
                { id: 't5', text: 'State Management' },
                { id: 't6', text: 'API Integration' }
            ] 
        },
        { 
            id: 'p3', title: 'Real-world Projects', week: 'Week 5-6', icon: RocketLaunchIcon,
            tasks: [
                { id: 't7', text: 'Build Personal Portfolio' },
                { id: 't8', text: 'Unit Testing' },
                { id: 't9', text: 'Deployment' }
            ] 
        },
    ];

    const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedCount = Object.values(taskProgress).filter(Boolean).length;
    const progressPercent = Math.round((completedCount / totalTasks) * 100) || 0;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Smart Generator</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Interactive Target Roadmap</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">Auto-updating algorithmic plan tailored to {userStats.targetRole || 'Engineering'}.</p>
                </div>
                <button
                    onClick={exportPDF}
                    className="bg-slate-900 text-white font-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center gap-2 shrink-0"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Export PDF
                </button>
            </header>

            {/* Smart Progress Dashboard */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-soft border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3 space-y-2">
                    <h3 className="font-black text-slate-900 text-xl tracking-wide">Milestone Tracker</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{completedCount} of {totalTasks} Tasks Completed</p>
                </div>
                <div className="flex-1 w-full space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-600">Completion Status</span>
                        <span className="text-indigo-600">{progressPercent}% Ready</span>
                    </div>
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-indigo-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>

            <div ref={roadmapRef} className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-premium border border-slate-100 space-y-12">
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-8 bottom-4 w-1 bg-slate-100 rounded-full hidden sm:block"></div>

                    <div className="space-y-10 sm:space-y-16 relative">
                        {phases.map((phase, i) => {
                            const phaseTasks = phase.tasks.length;
                            const phaseCompleted = phase.tasks.filter(t => taskProgress[t.id]).length;
                            const isPhaseDone = phaseTasks === phaseCompleted && phaseTasks > 0;

                            return (
                                <motion.div 
                                    key={phase.id} 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col sm:flex-row gap-6 sm:gap-10"
                                >
                                    <div className="relative shrink-0 flex items-start sm:block">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 relative transition-all duration-300 ${
                                            isPhaseDone ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border-2 border-indigo-200 text-indigo-500'
                                        }`}>
                                            <phase.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none">
                                                {phase.week}
                                            </span>
                                            <h4 className={`text-lg sm:text-xl font-black ${isPhaseDone ? 'text-indigo-600 line-through decoration-indigo-300' : 'text-slate-900'}`}>
                                                {phase.title}
                                            </h4>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                                            {phase.tasks.map(task => {
                                                const isDone = !!taskProgress[task.id];
                                                return (
                                                    <button 
                                                        key={task.id} 
                                                        onClick={() => toggleTask(task.id)}
                                                        className={`flex items-start gap-3 p-3 sm:p-4 border rounded-2xl group transition-all text-left ${
                                                            isDone 
                                                                ? 'bg-indigo-50/50 border-indigo-200 hover:bg-indigo-50' 
                                                                : 'bg-slate-50 border-slate-100 hover:border-indigo-300 hover:shadow-soft'
                                                        }`}
                                                    >
                                                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 mt-0.5 transition-colors ${
                                                            isDone 
                                                                ? 'bg-indigo-600 border-indigo-600 text-white' 
                                                                : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                                        }`}>
                                                            {isDone && <CheckCircleIcon className="w-4 h-4 text-white" />}
                                                        </div>
                                                        <span className={`text-xs sm:text-sm font-bold ${
                                                            isDone ? 'text-indigo-400 line-through' : 'text-slate-700'
                                                        }`}>
                                                            {task.text}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
