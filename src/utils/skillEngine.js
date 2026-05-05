/**
 * Skill Gap Engine
 * Matches resume text against target role skills with normalization and partial matching.
 */

export const findSkillGaps = (resumeText, targetRoleSkills) => {
    if (!resumeText || !targetRoleSkills) {
        return {
            matchedSkills: [],
            missingSkills: [],
            matchPercentage: 0,
            gapPercentage: 100
        };
    }

    const lowerText = resumeText.toLowerCase().replace(/[.\-_]/g, ' ');
    const normalizedSkills = targetRoleSkills.map(skill => skill.toLowerCase());
    
    // Normalize skills: "React.js" -> "react", "NodeJS" -> "node"
    // Also "React" should match "React.js"
    const normalizeSkill = (skill) => {
        return skill
            .replace(/\.js$/i, '')
            .replace(/\s+/g, '')
            .trim();
    };

    const matchedSkills = [];
    const missingSkills = [];

    targetRoleSkills.forEach(skill => {
        const lowerSkill = skill.toLowerCase();
        const normalizedSkill = normalizeSkill(lowerSkill);
        
        // Match partial keywords (e.g., "React.js" = "React") 
        // Or "Node.js" = "Node"
        const isMatched = lowerText.includes(lowerSkill) || 
                          lowerText.includes(normalizedSkill) ||
                          (normalizedSkill.length > 3 && lowerText.includes(normalizedSkill.substring(0, 4)));

        if (isMatched) {
            matchedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    });

    // Remove duplicates from matchedSkills
    const uniqueMatched = [...new Set(matchedSkills)];
    const uniqueMissing = [...new Set(missingSkills)];

    // Weight for core vs optional skills
    // For now, let's assume the first 50% are core skills
    const coreSkillsCount = Math.ceil(targetRoleSkills.length * 0.6); // 60% core
    const coreSkills = targetRoleSkills.slice(0, coreSkillsCount);
    
    // Match percentage = (matched skills / total required skills) * 100
    // But let's refine: core skills should weighted more if we wanted to
    // For now, let's stick to the requested simple accurate formula first
    const matchPercentage = Math.round((uniqueMatched.length / targetRoleSkills.length) * 100) || 0;

    return {
        matchedSkills: uniqueMatched,
        missingSkills: uniqueMissing,
        matchPercentage,
        gapPercentage: 100 - matchPercentage
    };
};
