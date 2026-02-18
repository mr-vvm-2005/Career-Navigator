import React, { useRef } from 'react';
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
        toast.success("Roadmap Exported successfully!");
    };

    const phases = [
        { title: 'Foundations', week: 'Week 1-2', tasks: ['JavaScript ES6+', 'Data Structures basics', 'Version Control with Git'], icon: AcademicCapIcon },
        { title: 'Specialization', week: 'Week 3-4', tasks: ['React Hooks', 'State Management', 'API Integration'], icon: CodeBracketIcon },
        { title: 'Real-world Projects', week: 'Week 5-6', tasks: ['Build Personal Portfolio', 'Unit Testing', 'Deployment'], icon: RocketLaunchIcon },
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Personalized Path</span>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Structured Roadmap</h1>
                    <p className="text-slate-500 mt-2 font-medium">An algorithmic 8-week plan tailored to your target role and skill gaps.</p>
                </div>
                <button
                    onClick={exportPDF}
                    className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center gap-2"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Export as PDF
                </button>
            </header>

            <div ref={roadmapRef} className="bg-white p-10 rounded-[3rem] shadow-soft border border-slate-100 space-y-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <MapIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight capitalize">{userStats.targetRole} Readiness Plan</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Optimized for 2024 Hiring Trends</p>
                    </div>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-slate-100"></div>

                    <div className="space-y-16 relative">
                        {phases.map((phase, i) => (
                            <div key={i} className="flex gap-10">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white border-2 border-indigo-500 rounded-2xl flex items-center justify-center text-indigo-600 z-10 relative group-hover:scale-110 transition-transform">
                                        <phase.icon className="w-6 h-6" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full blur-md opacity-50"></div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest leading-none">
                                            {phase.week}
                                        </span>
                                        <h4 className="text-xl font-black text-slate-900">{phase.title}</h4>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {phase.tasks.map(task => (
                                            <div key={task} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-indigo-200 transition-all">
                                                <CheckCircleIcon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600" />
                                                <span className="text-sm font-bold text-slate-600">{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-50 flex justify-between items-center bg-indigo-50/30 -mx-10 -mb-10 p-10 rounded-b-[3rem]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                            <RocketLaunchIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">Final Milestone: Placement Ready</p>
                            <p className="text-xs font-medium text-slate-500 italic">Expected Completion: 8 Weeks from today</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Generated by</p>
                        <p className="text-lg font-black text-slate-900">PlacementOS Intel</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
