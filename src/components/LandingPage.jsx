import React from 'react';
import {
    FileCheck,
    BarChart2,
    Map as MapIcon,
    Target,
    ChevronRight,
    ShieldCheck,
    Zap,
    Globe
} from 'lucide-react';

const LandingPage = ({ onStart }) => {
    const features = [
        {
            title: "ATS Scoring",
            description: "Instantly evaluate your resume against industry standards and keywords.",
            icon: FileCheck,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Skill Gap Analysis",
            description: "Compare your skills with specific job roles and identify missing expertise.",
            icon: Target,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "Roadmap Generator",
            description: "Get a personalized 8-week plan tailored to your target role and current level.",
            icon: MapIcon,
            color: "bg-orange-100 text-orange-600"
        },
        {
            title: "Practice Tracker",
            description: "Stay consistent with a structured tracker for DSA, Aptitude, and Core Subjects.",
            icon: BarChart2,
            color: "bg-green-100 text-green-600"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">PlacementOS</span>
                </div>
                <button
                    onClick={onStart}
                    className="text-slate-600 font-medium hover:text-primary-600 transition-colors"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center md:text-left md:flex items-center gap-12">
                <div className="flex-1 space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-medium text-sm border border-primary-100">
                        <Zap size={16} />
                        The Ultimate Career Accelerator
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
                        Master Your Career <br />
                        <span className="text-primary-600">Placement Journey</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                        From resume analysis to personalized roadmaps and resource tracking. PlacementOS is your all-in-one companion for landing your dream tech job.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={onStart}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            Start Placement Analysis
                            <ChevronRight size={20} />
                        </button>
                        <a
                            href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center justify-center gap-2"
                        >
                            Build Resume
                            <Globe size={18} />
                        </a>
                    </div>
                    <div className="flex items-center gap-8 pt-8">
                        <div className="flex items-center gap-2 text-slate-400">
                            <ShieldCheck size={20} />
                            <span className="text-sm">ATS Optimized</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Target size={20} />
                            <span className="text-sm">Skill Targeted</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-16 md:mt-0 relative animate-slide-up">
                    <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                    <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                    <div className="card shadow-premium p-4 rotate-3 relative overflow-hidden group hover:rotate-0 transition-transform duration-500">
                        <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <FileCheck size={80} className="text-primary-100" />
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                            <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                        </div>
                        <div className="absolute top-10 right-10 flex items-center justify-center w-20 h-20 bg-white shadow-lg rounded-full border-4 border-green-500 font-bold text-2xl text-slate-900 group-hover:scale-110 transition-transform">
                            85%
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-50 py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
                        <p className="text-slate-600 text-lg">We've built the most comprehensive tools to guide you from preparation to landing the offer.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card card-hover flex flex-col items-center text-center p-8">
                                <div className={`p-4 rounded-2xl mb-6 ${feature.color}`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
                        <span className="text-lg font-bold text-slate-900">PlacementOS</span>
                    </div>
                    <p className="text-slate-400 text-sm">© 2024 PlacementOS. Designed for students.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
