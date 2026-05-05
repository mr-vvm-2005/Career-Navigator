/**
 * ATS Scoring Engine
 * Analyzes resume text for sections, metrics, action verbs, and length.
 */

export const analyzeResume = (text) => {
    if (!text || text.trim().length === 0) {
        return {
            score: 0,
            strengths: [],
            weaknesses: ["No resume text provided"],
            suggestions: ["Please enter your resume text into the field above."],
            wordCount: 0
        };
    }

    let score = 0;
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    const lowerText = text.toLowerCase();
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    // 1. SECTION DETECTION (Max 40 points)
    // Summary/Profile
    if (/summary|profile|about me|professional summary|executive summary/i.test(lowerText)) {
        score += 10;
        strengths.push("Professional summary section included");
    } else {
        weaknesses.push("Missing summary section");
        suggestions.push("Add a 2-3 sentence summary highlighting your top skills and experience.");
    }

    // Skills
    if (/(technical\s+)?skills|competencies|expertise|proficiencies|tech stack/i.test(lowerText)) {
        score += 10;
        strengths.push("Skills section detected");
    } else {
        weaknesses.push("Missing skills section");
        suggestions.push("Create a clear skills section with relevant technologies and tools.");
    }

    // Experience/Work History
    if (/experience|work history|employment|internships|professional background/i.test(lowerText)) {
        score += 10;
        strengths.push("Work experience section found");
    } else {
        weaknesses.push("Missing experience section");
        suggestions.push("Detail your past roles, companies, and key achievements.");
    }

    // Projects
    if (/projects|personal projects|portfolio|academic projects/i.test(lowerText)) {
        score += 10;
        strengths.push("Projects section included");
    } else {
        suggestions.push("Include a projects section to demonstrate hands-on application of your skills.");
    }

    // 2. MEASURABLE METRICS (Max 25 points)
    // Use regex to detect numbers like %, +, $, etc.
    const metricsRegex = /\d+%|\d+\+|\$\d+|improved|increased|decreased|reduced|saved|grew|scaled/gi;
    const metricsMatches = (text.match(metricsRegex) || []);
    const uniqueMetrics = [...new Set(metricsMatches.map(m => m.toLowerCase()))];
    
    if (uniqueMetrics.length >= 4) {
        score += 25;
        strengths.push("Excellent use of measurable metrics");
    } else if (uniqueMetrics.length >= 2) {
        score += 15;
        strengths.push("Good use of quantifiable data");
    } else {
        weaknesses.push("Low use of measurable metrics");
        suggestions.push("Quantify your impact (e.g., 'Reduced load time by 30%' or 'Managed a $10k budget').");
    }

    // 3. ACTION VERBS (Max 20 points)
    const actionVerbsList = [
        'developed', 'built', 'implemented', 'designed', 'led', 'managed', 
        'created', 'optimized', 'executed', 'spearheaded', 'orchestrated', 
        'launched', 'mentored', 'streamlined', 'resolved', 'automated'
    ];
    
    const matchedVerbs = actionVerbsList.filter(verb => lowerText.includes(verb));
    if (matchedVerbs.length >= 6) {
        score += 20;
        strengths.push("Strong action verbs utilized");
    } else if (matchedVerbs.length >= 3) {
        score += 10;
        strengths.push("Good use of action-oriented language");
    } else {
        suggestions.push("Use more action verbs like 'Spearheaded', 'Automated', or 'Reduced' to describe your work.");
    }

    // 4. FORMATTING & LENGTH (Max 15 points)
    if (wordCount >= 300 && wordCount <= 800) {
        score += 15;
        strengths.push("Optimal resume length");
    } else if (wordCount > 800 && wordCount <= 1200) {
        score += 5;
        weaknesses.push("Resume is slightly long");
        suggestions.push("Try to keep your resume concise, preferably 1-2 pages.");
    } else if (wordCount > 1200) {
        score -= 10;
        weaknesses.push("Resume is too long");
        suggestions.push("Condense your resume to focus on the most relevant information.");
    } else if (wordCount < 300) {
        score += 5;
        weaknesses.push("Resume is a bit thin");
        suggestions.push("Add more details about your achievements or projects.");
    }

    // NORMALIZE SCORE to 0-100
    // Max possible score in logic: 40 + 25 + 20 + 15 = 100
    const finalScore = Math.max(0, Math.min(100, score));

    return {
        score: finalScore,
        strengths,
        weaknesses,
        suggestions,
        wordCount
    };
};
