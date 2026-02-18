export const generateDynamicRoadmap = (role, level, gap) => {
    const baseTasks = {
        frontend: ['JavaScript Basics', 'React Components', 'Tailwind CSS', 'State Management'],
        backend: ['Node.js APIs', 'SQL Database', 'Authentication', 'System Scaling'],
        data: ['Python for Data', 'SQL Queries', 'Excel Mastery', 'Visualization'],
    };

    const roleTasks = baseTasks[role] || baseTasks.frontend;

    const weeklyPlan = [
        { week: 'Week 1-2', focus: 'Foundations', tasks: [roleTasks[0], 'Git Workflow', 'DSA Arrays'] },
        { week: 'Week 3-4', focus: 'Core Dev', tasks: [roleTasks[1], roleTasks[2], 'DSA Strings'] },
        { week: 'Week 5-6', focus: 'Advanced', tasks: [roleTasks[3], 'Mock Interviews', 'Unit Testing'] },
        { week: 'Week 7-8', focus: 'Placement', tasks: ['Resume Polishing', 'Company Specific Prep', 'Soft Skills'] },
    ];

    // If gap is high, add more foundational tasks
    if (gap > 50) {
        weeklyPlan[0].tasks.unshift('Prerequisite Knowledge');
    }

    // If level is Advanced, replace basic tasks with scale concepts
    if (level === 'Advanced') {
        weeklyPlan[2].tasks.push('Architecture Design');
    }

    return weeklyPlan;
};
