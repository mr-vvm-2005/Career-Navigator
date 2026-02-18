export const analyzeResume = (text) => {
    let score = 0;
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];

    const lowerText = text.toLowerCase();

    // Scoring rules
    // +10 if summary section exists
    if (/summary|profile|about me|professional summary/i.test(lowerText)) {
        score += 10;
        strengths.push("Professional summary included");
    } else {
        weaknesses.push("Missing professional summary section");
        suggestions.push("Add a 2-3 sentence summary highlighting your career goals and key achievements.");
    }

    // +10 if skills section exists
    if (/skills|technical skills|competencies|expertise/i.test(lowerText)) {
        score += 10;
        strengths.push("Skills section detected");
    } else {
        score -= 15; // Penalty if no skills listed (logical)
        weaknesses.push("Missing skills section");
        suggestions.push("Create a dedicated skills section to help recruiters quickly identify your stack.");
    }

    // +10 if experience section exists
    if (/experience|work history|employment|internships/i.test(lowerText)) {
        score += 10;
        strengths.push("Work experience section found");
    } else {
        weaknesses.push("Missing experience section");
        suggestions.push("Detail your past projects, internships, or work experience with clear roles.");
    }

    // +15 if measurable metrics detected (numbers like %, +, $, etc.)
    const metricsCount = (text.match(/\d+%|\d+\+|\$\d+|improved|increased|decreased|reduced/gi) || []).length;
    if (metricsCount > 2) {
        score += 15;
        strengths.push("Measurable metrics detected");
    } else {
        weaknesses.push("Low use of measurable metrics");
        suggestions.push("Quantify your achievements (e.g., 'Improved performance by 20%' instead of just 'Improved performance').");
    }

    // +10 if action verbs detected
    const actionVerbs = ['developed', 'built', 'implemented', 'designed', 'led', 'managed', 'created', 'optimized', 'executed'];
    const verbMatches = actionVerbs.filter(verb => lowerText.includes(verb));
    if (verbMatches.length >= 4) {
        score += 10;
        strengths.push("Strong action verbs used");
    } else {
        suggestions.push("Use more action verbs like 'Developed', 'Optimized', or 'Spearheaded' to describe your work.");
    }

    // -10 if text length > 1000 words
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 1000) {
        score -= 10;
        weaknesses.push("Resume is too long (>1000 words)");
        suggestions.push("Try to condense your resume to 1 or 2 pages. Be concise.");
    }

    // Final score capped at 100
    score = Math.max(0, Math.min(100, score + 45)); // Adding base score of 45 to balance starts

    return {
        score,
        strengths,
        weaknesses,
        suggestions,
        wordCount
    };
};
