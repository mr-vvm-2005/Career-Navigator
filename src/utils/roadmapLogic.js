export const generateRoadmap = (role, level, year) => {
    const baseRoadmap = [
        {
            week: "Weeks 1–2",
            title: "Foundations & Core Concepts",
            tasks: [
                "Master language fundamentals (Syntax, Types, Logic)",
                "Understand basic architecture of chosen stack",
                "Set up local development environment & Git workflow",
                "Complete 10 fundamental coding problems on LeetCode"
            ]
        },
        {
            week: "Weeks 3–4",
            title: "Building & Collaboration",
            tasks: [
                "Build a mini-project implementing core features",
                "Learn advanced concepts (State management, API integration)",
                "Implement responsive design / error handling",
                "Open-source contribution or team collaboration simulation"
            ]
        },
        {
            week: "Weeks 5–6",
            title: "Data Structures & Scalability",
            tasks: [
                "Practice intermediate DSA (Arrays, Strings, Linked Lists)",
                "Optimize existing project for performance",
                "Implement authentication and basic security",
                "Write unit tests for at least 2 modules"
            ]
        },
        {
            week: "Weeks 7–8",
            title: "Polish & Career Readiness",
            tasks: [
                "Mock interviews (Technical + HR)",
                "Resume refinement based on ATS analyzer",
                "Deploy projects to hosting platforms (Vercel/Netlify/Heroku)",
                "Final review of core computer science subjects (OS/DBMS/CN)"
            ]
        }
    ];

    // Tailor roadmap based on level
    if (level === 'Beginner') {
        baseRoadmap[0].tasks.push("Watch introductory crash courses");
        baseRoadmap[1].tasks.unshift("Understand how the internet works");
    } else if (level === 'Advanced') {
        baseRoadmap[2].tasks.push("Explore system design patterns");
        baseRoadmap[3].tasks.push("Master complex DSA (Graphs, Dynamic Programming)");
    }

    // Tailor based on year
    if (year === '4th') {
        baseRoadmap[3].tasks.push("Focus on immediate placement papers / company specific prep");
    }

    return baseRoadmap;
};
