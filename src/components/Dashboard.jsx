import React from 'react';
import {
    FileText,
    Target,
    Map,
    CheckSquare,
    ArrowRight,
    ChevronRight,
    TrendingUp,
    Clock
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ stats, setActiveTab }) => {
    const chartData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [stats.practiceCompletion, 100 - stats.practiceCompletion],
                backgroundColor: ['#0ea5e9', '#f1f5f9'],
                borderWidth: 0,
                circumference: 360,
            },
        ],
    };

    const dashboardCards = [
        {
            title: "ATS Resume Score",
            value: `${stats.atsScore}%`,
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-50",
            tab: 'analyzer',
            status: stats.atsScore > 70 ? 'Optimal' : 'Needs Work'
        },
        {
            title: "Skill Match %",
            value: `${stats.skillMatch}%`,
            icon: Target,
            color: "text-purple-600",
            bg: "bg-purple-50",
            tab: 'skillgap',
            status: stats.skillMatch > 60 ? 'Competitive' : 'Rising'
        },
        {
            title: "Roadmap Status",
            value: `${stats.roadmapProgress}%`,
            icon: Map,
            color: "text-orange-600",
            bg: "bg-orange-50",
            tab: 'roadmap',
            status: `Week ${Math.ceil(stats.roadmapProgress / 12.5) || 1}`
        },
        {
            title: "Practice Completion",
            value: `${stats.practiceCompletion}%`,
            icon: CheckSquare,
            color: "text-green-600",
            bg: "bg-green-50",
            tab: 'practice',
            status: stats.practiceCompletion > 50 ? 'Strong' : 'Initial'
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
                    <p className="text-slate-500 mt-1">Here's your placement preparation overview.</p>
                </div>
                <a
                    href="https://mr-vvm-2005.github.io/Simple-resume-builder-project/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    Build ATS Resume
                </a>
            </header>

            {/* Hero Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveTab(card.tab)}
                        className="card card-hover cursor-pointer group flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp size={12} className="mr-1" />
                                {card.status}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm mb-1">{card.title}</p>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{card.value}</h3>
                        </div>
                        <div className="mt-6 flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            View Details
                            <ChevronRight size={16} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Practice Chart */}
                <div className="card lg:col-span-1 flex flex-col items-center justify-center p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Practice Progress</h3>
                    <div className="relative w-48 h-48">
                        <Doughnut
                            data={chartData}
                            options={{
                                cutout: '80%',
                                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                                maintainAspectRatio: true
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-slate-900">{stats.practiceCompletion}%</span>
                            <span className="text-xs text-slate-500 font-medium">Completed</span>
                        </div>
                    </div>
                    <div className="mt-8 w-full space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                                <span className="text-slate-600">Daily Challenge</span>
                            </div>
                            <span className="text-slate-900 font-medium">Done</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                <span className="text-slate-600">Company Mock</span>
                            </div>
                            <span className="text-slate-400">Next: Amazon</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activities / Suggestion */}
                <div className="card lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-primary-600" />
                        Strategic Suggestions
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                            <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-orange-900 text-sm">Action Required: Resume Optimization</h4>
                                <p className="text-orange-800 text-xs mt-1">Your current resume score is {stats.atsScore}%. Add more action verbs to improve it by up to 15%.</p>
                                <button
                                    onClick={() => setActiveTab('analyzer')}
                                    className="mt-3 text-sm font-bold text-orange-900 flex items-center gap-1 hover:underline"
                                >
                                    Fix Now <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl bg-primary-50 border border-primary-100">
                            <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-primary-900 text-sm">Skill Alert: Missing Node.js</h4>
                                <p className="text-primary-800 text-xs mt-1">Node.js is a key skill for Backend roles. We've added resources to your library to help you start.</p>
                                <button
                                    onClick={() => setActiveTab('resources')}
                                    className="mt-3 text-sm font-bold text-primary-900 flex items-center gap-1 hover:underline"
                                >
                                    Go to resources <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                            <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-green-900 text-sm">Weekly Goal: DSA Strings</h4>
                                <p className="text-green-800 text-xs mt-1">Complete the "Strings" topic in your practice tracker to reach 75% progress.</p>
                                <button
                                    onClick={() => setActiveTab('practice')}
                                    className="mt-3 text-sm font-bold text-green-900 flex items-center gap-1 hover:underline"
                                >
                                    Open tracker <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
