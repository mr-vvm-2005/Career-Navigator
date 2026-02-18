export const findSkillGaps = (resumeText, targetRoleSkills) => {
    const lowerText = resumeText.toLowerCase();

    const matchedSkills = targetRoleSkills.filter(skill =>
        lowerText.includes(skill.toLowerCase())
    );

    const missingSkills = targetRoleSkills.filter(skill =>
        !lowerText.includes(skill.toLowerCase())
    );

    const matchPercentage = Math.round((matchedSkills.length / targetRoleSkills.length) * 100) || 0;

    return {
        matchedSkills,
        missingSkills,
        matchPercentage,
        gapPercentage: 100 - matchPercentage
    };
};
