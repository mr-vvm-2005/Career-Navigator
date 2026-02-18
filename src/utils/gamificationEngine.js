export const calculateRank = (points) => {
    if (points >= 1500) return { tier: 'Platinum', color: 'text-cyan-500', bg: 'bg-cyan-50' };
    if (points >= 1000) return { tier: 'Gold', color: 'text-amber-500', bg: 'bg-amber-50' };
    if (points >= 500) return { tier: 'Silver', color: 'text-slate-400', bg: 'bg-slate-50' };
    return { tier: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-50' };
};

export const getNextMilestone = (points) => {
    if (points < 500) return { next: 500, label: 'Silver' };
    if (points < 1000) return { next: 1000, label: 'Gold' };
    if (points < 1500) return { next: 1500, label: 'Platinum' };
    return { next: points, label: 'Max' };
};

export const calculateReadiness = (ats, match, practice) => {
    return Math.round((ats * 0.4) + (match * 0.4) + (practice * 0.2));
};
