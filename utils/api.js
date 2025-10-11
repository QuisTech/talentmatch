// src/utils/api.js

// Simulate analyzing a job description with more realistic data
export async function analyzeJobDescription(jobText) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract keywords from job text (simplified)
  const skills = extractSkills(jobText);
  const title = extractJobTitle(jobText);
  
  return {
    title: title || "Software Engineer",
    skills: skills.length > 0 ? skills : ["JavaScript", "React", "Tailwind"],
    experience: extractExperience(jobText) || "3+ years",
    type: extractJobType(jobText) || "Full-time",
    industry: "Technology"
  };
}

// Simulate uploading candidate files with more realistic scoring
export async function uploadCandidateFiles(files, parsedJD) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return files.map((file, i) => {
    const baseScore = Math.floor(Math.random() * 40) + 40; // 40-80 base score
    const skillMatchBonus = calculateSkillMatch(file.name, parsedJD.skills);
    const finalScore = Math.min(baseScore + skillMatchBonus, 95);
    
    return {
      id: i + 1,
      name: file.name || `Candidate ${i + 1}`,
      score: finalScore,
      email: `${file.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      status: finalScore > 70 ? 'Highly Recommended' : finalScore > 50 ? 'Recommended' : 'Maybe'
    };
  }).sort((a, b) => b.score - a.score); // Sort by score descending
}

// Simulate generating interview questions based on job description
export async function generateInterviewQuestions(parsedJD, candidates) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const baseQuestions = [
    "What experience do you have with React?",
    "Explain a challenging project you worked on.",
    "How do you approach debugging code?",
    "Describe your experience with version control systems.",
    "How do you handle tight deadlines and multiple priorities?",
  ];
  
  const skillQuestions = parsedJD.skills.map(skill => 
    `What specific experience do you have with ${skill}?`
  );
  
  const experienceQuestions = [
    `How does your background align with our requirement for ${parsedJD.experience} experience?`,
    "Can you walk me through a project that demonstrates your technical abilities?"
  ];
  
  return [...skillQuestions, ...experienceQuestions, ...baseQuestions].slice(0, 8);
}

// Helper functions
function extractSkills(text) {
  const commonSkills = ['javascript', 'react', 'python', 'java', 'node', 'html', 'css', 
                       'typescript', 'angular', 'vue', 'mongodb', 'sql', 'aws', 'docker'];
  const foundSkills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill)
  );
  return foundSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1));
}

function extractJobTitle(text) {
  const titles = ['developer', 'engineer', 'designer', 'manager', 'analyst'];
  const foundTitle = titles.find(title => text.toLowerCase().includes(title));
  return foundTitle ? foundTitle.charAt(0).toUpperCase() + foundTitle.slice(1) : null;
}

function extractExperience(text) {
  if (text.includes('senior') || text.includes('5+') || text.includes('5 years')) return '5+ years';
  if (text.includes('mid') || text.includes('3+') || text.includes('3 years')) return '3+ years';
  if (text.includes('junior') || text.includes('entry') || text.includes('1+')) return '1+ years';
  return '3+ years';
}

function extractJobType(text) {
  if (text.toLowerCase().includes('remote')) return 'Remote';
  if (text.toLowerCase().includes('hybrid')) return 'Hybrid';
  return 'On-site';
}

function calculateSkillMatch(candidateName, requiredSkills) {
  // Simulate skill matching based on candidate name (in real app, this would analyze resumes)
  const nameLength = candidateName.length;
  const skillCount = requiredSkills.length;
  return Math.min((nameLength % 10) + (skillCount * 2), 25);
}