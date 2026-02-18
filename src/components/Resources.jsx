import React, { useState } from 'react';
import {
    Library,
    ExternalLink,
    Search,
    BookOpen,
    Code,
    Cpu,
    Users,
    Star,
    ArrowUpRight
} from 'lucide-react';
import { resources } from '../data/resources';

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState('frontend');

    const categories = [
        { id: 'frontend', label: 'Frontend', icon: Code },
        { id: 'backend', label: 'Backend', icon: Cpu },
        { id: 'dsa', label: 'DSA', icon: BookOpen },
        { id: 'aptitude', label: 'Aptitude', icon: Star },
        { id: 'interview', label: 'Interview', icon: Users },
    ];

    const currentResources = resources[activeCategory] || [];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Resource Library</h1>
                <p className="text-slate-500 mt-1">Curated links to master the skills you're missing.</p>
            </header>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeCategory === cat.id
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
                                }`}
                        >
                            <Icon size={18} />
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentResources.map((res, index) => (
                    <a
                        key={index}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card card-hover flex flex-col justify-between group h-full"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-2 py-1 bg-slate-100 text-slate-500 font-bold text-[10px] rounded uppercase tracking-wider">
                                    {res.category}
                                </span>
                                <div className="p-2 rounded-lg bg-primary-50 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {res.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                Official {res.category.toLowerCase()} and learning platform for {res.title}.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <ExternalLink size={12} />
                                <span>{new URL(res.url).hostname}</span>
                            </div>
                            <span className="text-primary-600 text-xs font-bold hover:underline">Access Link</span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Suggestion Card */}
            <div className="card bg-slate-900 border-none relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shrink-0">
                        <Library size={40} className="text-primary-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Want to add more?</h3>
                        <p className="text-slate-400 text-sm max-w-lg">
                            This library is updated weekly with the most relevant resources for current market trends. Check back often!
                        </p>
                    </div>
                    <button className="md:ml-auto btn-primary whitespace-nowrap">
                        Request a Topic
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Resources;
