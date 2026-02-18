import React, { useState } from 'react';
import {
    Map,
    ChevronRight,
    Calendar,
    BookOpen,
    Rocket,
    Award,
    Circle
} from 'lucide-react';
import { generateRoadmap } from '../utils/roadmapLogic';
import { roles } from '../data/roles';

const Roadmap = () => {
    const [role, setRole] = useState('frontend');
    const [level, setLevel] = useState('Beginner');
    const [year, setYear] = useState('3rd');
    const [roadmap, setRoadmap] = useState(null);

    const handleGenerate = () => {
        const result = generateRoadmap(role, level, year);
        setRoadmap(result);
    };

    const currentRole = roles.find(r => r.id === role) || roles[0];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Personalized Placement Roadmap</h1>
                <p className="text-slate-500 mt-1">Structured 8-week plan to get you ready for top technical interviews.</p>
            </header>

            {/* Generator Form */}
            <div className="card grid md:grid-cols-4 gap-6 items-end">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Target Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="input-field py-2 text-sm bg-white"
                    >
                        {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Current Skill Level</label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="input-field py-2 text-sm bg-white"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Current Year</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input-field py-2 text-sm bg-white"
                    >
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>
                </div>
                <button
                    onClick={handleGenerate}
                    className="btn-primary py-[10px] flex items-center justify-center gap-2"
                >
                    <Rocket size={18} />
                    View Roadmap
                </button>
            </div>

            {!roadmap ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-6 bg-primary-50 text-primary-600 rounded-full mb-6">
                        <Map size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Ready to start?</h3>
                    <p className="text-slate-500 max-w-xs mt-2">Select your parameters above and generate your path to success.</p>
                </div>
            ) : (
                <div className="space-y-12 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] flex-1 bg-slate-200"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">8-Week Structured Program</span>
                        <div className="h-[2px] flex-1 bg-slate-200"></div>
                    </div>

                    <div className="relative space-y-12">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-primary-100 -translate-x-1/2 -z-10"></div>

                        {roadmap.map((phase, index) => {
                            const icons = [Calendar, BookOpen, Rocket, Award];
                            const Icon = icons[index];
                            const isEven = index % 2 === 0;

                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center gap-8 group">
                                    {/* Timeline Marker */}
                                    <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-white border-4 border-primary-500 rounded-full -translate-x-1/2 z-10 flex items-center justify-center text-primary-600 shadow-lg group-hover:scale-110 transition-transform">
                                        <Icon size={20} />
                                    </div>

                                    {/* Content */}
                                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-[55%] md:pl-12'}`}>
                                        <div className="card border-none shadow-soft hover:shadow-premium p-6 group-hover:border-primary-100 transition-all border-l-4 border-l-primary-500">
                                            <div className="flex items-center gap-2 mb-2 md:justify-end">
                                                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold rounded-full">{phase.week}</span>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-4">{phase.title}</h4>
                                            <ul className={`space-y-3 ${isEven ? 'md:items-end' : ''}`}>
                                                {phase.tasks.map((task, i) => (
                                                    <li key={i} className={`flex gap-3 text-sm text-slate-600 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                        <div className="mt-1 shrink-0"><Circle size={8} className="fill-primary-200 text-primary-400" /></div>
                                                        <span>{task}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card bg-primary-600 text-white p-8 text-center max-w-2xl mx-auto shadow-premium transform hover:scale-[1.02] transition-transform">
                        <h3 className="text-2xl font-bold mb-2">You're ready for the big day!</h3>
                        <p className="text-primary-100 text-sm mb-6">Consistency is key. Track your progress daily to ensure you stay on path.</p>
                        <button className="bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
                            Export PDF Roadmap
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roadmap;
