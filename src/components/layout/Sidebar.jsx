import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Target,
    Map,
    CheckSquare,
    Library,
    PenTool,
    ArrowRight,
    User,
    Menu,
    X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onOpenProfile }) => {
    const { user, userStats } = useApp();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'ATS Analysis', path: '/resume', icon: FileText },
        { name: 'Version Manager', path: '/versions', icon: Library },
        { name: 'Skill Gap', path: '/skill-gap', icon: Target },
        { name: 'Roadmap', path: '/roadmap', icon: Map },
        { name: 'Practice', path: '/practice', icon: CheckSquare },
        { name: 'Mock Interview', path: '/mock-interview', icon: Target },
        { name: 'Resources', path: '/resources', icon: Library },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border border-white/10 ring-1 ring-black/5 relative overflow-hidden group hover:shadow-indigo-500/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="font-black text-2xl tracking-tighter relative z-10 drop-shadow-md">C</span>
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">CareerNavigator</span>
                </div>
            </div>

            <div className="px-6 mb-6">
                <a
                    href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg shadow-indigo-600/20 group"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex items-center gap-3">
                        <PenTool className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-80">Step 1</span>
                            <span className="text-sm font-bold">Create Resume</span>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Step 2: Intelligence</p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                                : 'hover:bg-slate-800 hover:text-white border border-transparent'}
            `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-800/50">
                    <button
                        onClick={() => { onOpenProfile(); setIsOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white border border-transparent transition-all duration-200 group"
                    >
                        <User className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-slate-400 group-hover:text-white">Profile Settings</span>
                    </button>
                </div>
            </nav>

            <div className="p-6 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {user?.displayName ? user.displayName.split(' ')[0] : (userStats.name && userStats.name !== 'User' ? userStats.name.split(' ')[0] : 'User')} Mode
                    </span>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-5 left-5 z-[60] p-2.5 bg-white border border-slate-200 rounded-xl shadow-lg active:scale-95 transition-all text-slate-900"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Sidebar (Fixed) */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800 z-50 flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Slide-in) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70]"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-slate-900 text-slate-300 z-[80] flex flex-col shadow-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
