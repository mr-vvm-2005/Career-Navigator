import React from 'react';
import {
    LayoutDashboard,
    FileText,
    Target,
    Map,
    CheckSquare,
    Library,
    ExternalLink,
    ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analyzer', label: 'Resume Analyzer', icon: FileText },
        { id: 'skillgap', label: 'Skill Gap', icon: Target },
        { id: 'roadmap', label: 'Roadmap', icon: Map },
        { id: 'practice', label: 'Practice Tracker', icon: CheckSquare },
        { id: 'resources', label: 'Resources', icon: Library },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-40 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-100 mb-4">
                <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">P</span>
                    </div>
                    CareerNavigator
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-primary-400" />}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <a
                    href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-900 rounded-xl text-white hover:bg-slate-800 transition-colors group"
                >
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">External Tool</span>
                        <span className="font-semibold text-sm">Resume Builder</span>
                    </div>
                    <ExternalLink size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
