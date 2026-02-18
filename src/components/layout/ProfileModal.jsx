import React, { useState } from 'react';
import { X, User, Briefcase, Mail, Shield, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ isOpen, onClose }) => {
    const { userStats, updateStats } = useApp();
    const [formData, setFormData] = useState({
        name: userStats.name,
        title: userStats.title,
        targetRole: userStats.targetRole
    });

    const handleSave = () => {
        updateStats(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-8 text-white relative">
                            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 overflow-hidden">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-2 bg-white text-indigo-600 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">{userStats.name}</h2>
                                    <p className="text-indigo-100 font-medium">{userStats.levelBadge} Tier Candidate</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Headline</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Role</label>
                                        <select
                                            value={formData.targetRole}
                                            onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 outline-none"
                                        >
                                            <option value="frontend">Frontend</option>
                                            <option value="backend">Backend</option>
                                            <option value="data">Data Science</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security</label>
                                        <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm font-bold text-slate-400 flex items-center gap-2">
                                            <Shield className="w-4 h-4" /> Verified
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 text-sm font-black text-slate-500 hover:bg-slate-50 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-[2] py-4 bg-indigo-600 text-white text-sm font-black rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                                >
                                    Save Profile Changes
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
