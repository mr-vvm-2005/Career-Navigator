import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculateRank, calculateReadiness } from '../utils/gamificationEngine';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStats, setUserStats] = useState({
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
        name: "User",
        title: "Tech Aspirant",
        quizResults: {},
        streak: 0,
        lastLoginDate: null,
        lastNotifiedDate: null
    });

    const defaultPracticeData = {
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

    const [practiceData, setPracticeData] = useState(defaultPracticeData);

    // Sync state via Firebase Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                };
                setUser(userData);
                
                try {
                    // Load personal data from Firestore
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        
                        let currentStats = { ...userStats };
                        if (data.stats) {
                            currentStats = { ...currentStats, ...data.stats };
                        }

                        // Daily Streak Logic
                        const today = new Date().toISOString().split('T')[0];
                        let updatedStreak = currentStats.streak || 0;
                        let lastLogin = currentStats.lastLoginDate;
                        let lastNotified = currentStats.lastNotifiedDate;

                        if (lastLogin !== today) {
                            if (lastLogin) {
                                const yesterday = new Date();
                                yesterday.setDate(yesterday.getDate() - 1);
                                const yesterdayStr = yesterday.toISOString().split('T')[0];

                                if (lastLogin === yesterdayStr) {
                                    updatedStreak += 1;
                                } else {
                                    updatedStreak = 1;
                                }
                            } else {
                                updatedStreak = 1;
                            }
                        }

                        currentStats.streak = updatedStreak;
                        currentStats.lastLoginDate = today;

                        setUserStats(currentStats);
                        if (data.practice) setPracticeData(data.practice);

                        // Reminder Notification Logic
                        if (lastNotified !== today) {
                            setTimeout(() => {
                                if (updatedStreak > 1) {
                                    toast.success(`🔥 You're on a ${updatedStreak}-day streak! Keep up the daily practice!`);
                                } else {
                                    toast.info(`👋 Welcome back! Let's start a new learning streak today.`);
                                }
                            }, 1500);
                            currentStats.lastNotifiedDate = today;
                            await updateDoc(userDocRef, { stats: currentStats });
                        } else if (updatedStreak !== (data.stats?.streak || 0) || today !== data.stats?.lastLoginDate) {
                            await updateDoc(userDocRef, { stats: currentStats });
                        }
                    } else {
                        // Create initial profile in Firestore
                        await setDoc(userDocRef, {
                            stats: userStats,
                            practice: practiceData,
                            profile: userData
                        });
                    }
                } catch (error) {
                    console.error("Firebase sync error:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStats = useCallback((newStats) => {
        const updatedStats = { ...userStats, ...newStats };
        setUserStats(updatedStats);

        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                updateDoc(userDocRef, { stats: updatedStats }).catch(err => {
                    console.warn("Could not save stats to Firestore:", err);
                });
            } catch (error) {
                // Ignore if Firestore is off or unreachable
            }
        }
    }, [user, userStats]);

    const updatePractice = (category, taskId) => {
        const categoryData = practiceData[category] || [];
        const updatedCategory = categoryData.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const updatedPractice = { ...practiceData, [category]: updatedCategory };
        
        // Recalculate derived stats
        const allTasks = Object.values(updatedPractice).flat();
        const completedCount = allTasks.filter(t => t.completed).length;
        const progress = Math.round((completedCount / (allTasks.length || 1)) * 100);
        const points = completedCount * 50;
        const rank = calculateRank(points);
        const readiness = calculateReadiness(userStats.atsScore, userStats.skillMatch, progress);

        const newStats = {
            practiceCompletion: progress,
            points: points,
            levelBadge: rank.tier,
            readinessScore: readiness
        };

        setPracticeData(updatedPractice);
        const updatedStatsObj = { ...userStats, ...newStats };
        setUserStats(updatedStatsObj);

        // Save to Firebase backend
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                updateDoc(userDocRef, {
                    practice: updatedPractice,
                    stats: updatedStatsObj
                }).catch(err => console.warn("Could not save to Firestore:", err));
            } catch (error) {
                // Ignore
            }
        }
    };

    return (
        <AppContext.Provider value={{ user, userStats, updateStats, practiceData, updatePractice, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
