import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculateRank, calculateReadiness } from '../utils/gamificationEngine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userStats, setUserStats] = useState(() => {
        const defaults = {
            atsScore: 0,
            skillMatch: 0,
            roadmapProgress: 0,
            practiceCompletion: 0,
            readinessScore: 0,
            resumeText: "",
            targetRole: "frontend",
            level: "Beginner",
            points: 0,
            levelBadge: "Bronze",
            name: "Vetrivel Murugan P",
            title: "Tech Aspirant",
            quizResults: {}
        };
        try {
            const saved = localStorage.getItem('placementos_stats');
            if (saved) {
                const parsed = JSON.parse(saved);
                return { ...defaults, ...parsed };
            }
        } catch (e) {
            console.error("Error loading stats", e);
        }
        return defaults;
    });

    const [practiceData, setPracticeData] = useState(() => {
        const defaults = {
            'DSA': [
                { id: 1, text: 'Arrays & Strings', completed: false },
                { id: 2, text: 'Linked Lists', completed: false },
                { id: 3, text: 'Trees & Graphs', completed: false },
                { id: 16, text: 'Recursion & DP', completed: false },
                { id: 17, text: 'Bit Manipulation', completed: false }
            ],
            'Frontend': [
                { id: 4, text: 'React Hooks', completed: false },
                { id: 5, text: 'State Management', completed: false },
                { id: 6, text: 'Next.js Basics', completed: false },
                { id: 18, text: 'Tailwind Mastery', completed: false },
                { id: 19, text: 'API Integration', completed: false }
            ],
            'Backend': [
                { id: 7, text: 'REST APIs', completed: false },
                { id: 8, text: 'Database Design', completed: false },
                { id: 9, text: 'Auth & JWT', completed: false },
                { id: 20, text: 'Microservices', completed: false },
                { id: 21, text: 'WebSockets', completed: false }
            ],
            'System Design': [
                { id: 10, text: 'Scalability', completed: false },
                { id: 11, text: 'Caching (Redis)', completed: false },
                { id: 22, text: 'Load Balancing', completed: false },
                { id: 23, text: 'CAP Theorem', completed: false }
            ],
            'Core CS': [
                { id: 12, text: 'OS Concepts', completed: false },
                { id: 13, text: 'Networking (TCP)', completed: false },
                { id: 24, text: 'Compiler Design', completed: false },
                { id: 25, text: 'Computer Org', completed: false }
            ],
            'Soft Skills': [
                { id: 14, text: 'Mock Interview', completed: false },
                { id: 15, text: 'Resume Pitch', completed: false },
                { id: 26, text: 'System Walkthrough', completed: false },
                { id: 27, text: 'Behavioral Q&A', completed: false }
            ]
        };
        try {
            const saved = localStorage.getItem('placementos_practice');
            if (saved) {
                const parsed = JSON.parse(saved);
                return { ...defaults, ...parsed };
            }
        } catch (e) {
            console.error("Error loading practice", e);
        }
        return defaults;
    });

    useEffect(() => {
        localStorage.setItem('placementos_stats', JSON.stringify(userStats));
    }, [userStats]);

    useEffect(() => {
        localStorage.setItem('placementos_practice', JSON.stringify(practiceData));
    }, [practiceData]);

    const updateStats = useCallback((newStats) => {
        setUserStats(prev => ({ ...prev, ...newStats }));
    }, []);

    const updatePractice = (category, taskId) => {
        setPracticeData(prev => {
            const categoryData = prev[category] || [];
            const updatedCategory = categoryData.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
            const updated = { ...prev, [category]: updatedCategory };

            // Recalculate derived stats
            const allTasks = Object.values(updated).flat();
            const completedCount = allTasks.filter(t => t.completed).length;
            const progress = Math.round((completedCount / (allTasks.length || 1)) * 100);
            const points = completedCount * 50;
            const rank = calculateRank(points);
            const readiness = calculateReadiness(userStats.atsScore, userStats.skillMatch, progress);

            // Trigger stat update separately to avoid nested setter issues
            setTimeout(() => {
                updateStats({
                    practiceCompletion: progress,
                    points: points,
                    levelBadge: rank.tier,
                    readinessScore: readiness
                });
            }, 0);

            return updated;
        });
    };

    return (
        <AppContext.Provider value={{ userStats, updateStats, practiceData, updatePractice }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
