import React, { useState, useEffect } from 'react';
import {
    BellIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Navbar = ({ onOpenProfile }) => {
    const { userStats, updateStats } = useApp();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Expose for Quick Switch feature
    useEffect(() => {
        window._placementos_updateStats = updateStats;
    }, [updateStats]);

    const handleQuickSwitch = () => {
        const isVetrivel = (userStats.name || "").includes("Vetrivel");
        const nextProfile = isVetrivel
            ? { name: "Aswin", title: "Full Stack Developer", targetRole: "backend" }
            : { name: "Vetrivel Murugan P", title: "Tech Aspirant", targetRole: "frontend" };

        updateStats(nextProfile);
        setShowProfileDropdown(false);
    };

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4 sm:px-8">
            <div className="flex-1 hidden md:block max-w-md">
                <div className="relative group">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="lg:hidden flex-1">
                <div className="w-12"></div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">XP Points</span>
                    <span className="text-xs sm:text-sm font-black text-indigo-600 leading-none">{userStats.points.toLocaleString()}</span>
                </div>

                <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                    <BellIcon className="w-5 h-5 sm:w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

                <div className="relative">
                    <button
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        className="flex items-center gap-2 sm:gap-3 p-1 rounded-full hover:bg-slate-50 transition-all"
                    >
                        <div className="w-8 h-8 sm:w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/20">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <UserCircleIcon className="w-6 h-6 sm:w-8 h-8 text-slate-400" />
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-start translate-y-[-1px]">
                            <span className="text-sm font-bold text-slate-900 leading-none mb-1 truncate max-w-[80px]">{(userStats.name || 'Student').split(' ')[0]}</span>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider leading-none">
                                {userStats.levelBadge}
                            </span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-premium py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button
                                onClick={() => {
                                    onOpenProfile();
                                    setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all border-l-4 border-transparent hover:border-indigo-500"
                            >
                                <UserCircleIcon className="w-4 h-4" /> My Profile
                            </button>

                            <div className="px-4 py-2 bg-slate-50/50 my-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Quick Switch</p>
                                <button
                                    onClick={handleQuickSwitch}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-indigo-600 hover:border-indigo-500 transition-all shadow-sm"
                                >
                                    Switch to {userStats.name.includes("Vetrivel") ? "Aswin" : "Vetrivel"}
                                    <ChevronDownIcon className="w-3 h-3 -rotate-90" />
                                </button>
                            </div>

                            <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all">
                                <UserCircleIcon className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
