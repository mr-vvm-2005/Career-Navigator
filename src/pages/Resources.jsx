import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code,
    Database,
    Cpu,
    ExternalLink,
    BookOpen,
    Terminal,
    Layers,
    Search,
    Zap,
    UserCheck
} from 'lucide-react';

const resources = {
    frontend: [
        { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', category: 'Documentation', desc: 'The most comprehensive web development resource.' },
        { title: 'React Documentation', url: 'https://react.dev/', category: 'Library', desc: 'Official React docs with interactive examples.' },
        { title: 'Tailwind Components', url: 'https://tailwindui.com/', category: 'Design', desc: 'Beautiful UI components for modern web apps.' },
    ],
    backend: [
        { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs', category: 'Environment', desc: 'Essential documentation for server-side JS.' },
        { title: 'SQL Zoo', url: 'https://sqlzoo.net/', category: 'Practice', desc: 'Interactive SQL tutorials and exercises.' },
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', category: 'Architecture', desc: 'Excellent resource for high-level system design.' },
    ],
    dsa: [
        { title: 'LeetCode', url: 'https://leetcode.com/', category: 'Practice', desc: 'Top platform for technical interview prep.' },
        { title: 'Take U Forward', url: 'https://takeuforward.org/', category: 'Curated', desc: 'Striver’s DSA sheet and quality video tutorials.' },
        { title: 'NeetCode', url: 'https://neetcode.io/', category: 'Roadmap', desc: 'Structured path for intermediate to advanced DSA.' },
    ],
    core: [
        { title: 'OS Notes', url: 'https://www.geeksforgeeks.org/operating-systems/', category: 'Education', desc: 'Complete breakdown of Operating systems.' },
        { title: 'CN Tutorials', url: 'https://www.javatpoint.com/computer-network-tutorial', category: 'Networking', desc: 'Comprehensive guide to computer networking.' },
        { title: 'DBMS Fundamentals', url: 'https://www.tutorialspoint.com/dbms/index.htm', category: 'Database', desc: 'Core database management system concepts.' },
    ],
    system: [
        { title: 'Design Patterns', url: 'https://refactoring.guru/design-patterns', category: 'General', desc: 'Visual guide to common architecture patterns.' },
        { title: 'High Scalability', url: 'http://highscalability.com/', category: 'Real-world', desc: 'Articles on how big companies build systems.' },
    ],
    skills: [
        { title: 'Big Interview', url: 'https://biginterview.com/', category: 'Mock', desc: 'AI-powered interview practice platform.' },
        { title: 'Resume Advice', url: 'https://www.overleaf.com/learn/latex/Resume_templates', category: 'Templates', desc: 'Professional templates and layout tips.' },
    ]
};

const Resources = () => {
    const [activeTab, setActiveTab] = useState('frontend');

    const categories = [
        { id: 'frontend', title: 'Frontend', icon: Code },
        { id: 'backend', title: 'Backend', icon: Database },
        { id: 'dsa', title: 'DSA', icon: Terminal },
        { id: 'core', title: 'Core CS', icon: Cpu },
        { id: 'system', title: 'System', icon: Layers },
        { id: 'skills', title: 'Soft Skills', icon: UserCheck },
    ];

    return (
        <div className="space-y-8">
            <header>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2 block">Knowledge Base</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Curated Resources</h1>
                <p className="text-slate-500 mt-2 font-medium">Expert-vetted links to master the skills identified in your gap analysis.</p>
            </header>

            {/* Tab Switcher */}
            <div className="flex flex-wrap gap-2 p-2 bg-white rounded-[2rem] shadow-soft border border-slate-100 max-w-fit">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] font-black tracking-tight transition-all duration-300 ${activeTab === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <cat.icon className="w-5 h-5" />
                        {cat.title}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                    {resources[activeTab].map((res, i) => (
                        <motion.a
                            key={res.title}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none border border-slate-100">
                                        {res.category}
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{res.desc}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-50">
                                <BookOpen className="w-4 h-4 text-indigo-400" />
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Start Learning</span>
                            </div>
                        </motion.a>
                    ))}
                </AnimatePresence>
            </div>

            <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <Zap className="absolute right-[-20px] top-[-20px] w-48 h-48 opacity-10" />
                <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-2xl font-black tracking-tight">Need more specific help?</h3>
                    <p className="text-indigo-100 font-medium">Use the Skill Gap analyzer to see exactly which resources you need first.</p>
                </div>
                <button className="relative z-10 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
                    Optimize Profile
                </button>
            </div>
        </div>
    );
};

export default Resources;
