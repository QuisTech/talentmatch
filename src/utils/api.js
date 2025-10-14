// ===== FILE: ./src/utils/api.js =====

/**
 * API helpers for TalentMatch - Connects to Flask backend
 */

const API_BASE_URL = "http://localhost:5000"; // Your Flask backend

// Analyze job description
export async function analyzeJobDescription(jobText) {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_text: jobText })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Job analysis response:", data);
    return data;
  } catch (error) {
    console.error("Job analysis failed:", error);
    throw error;
  }
}

// Upload candidates
export async function uploadCandidateFiles(filesOrNames, parsedJD = {}) {
  try {
    // Convert file names or File objects to candidate objects
    const candidates = filesOrNames.map((item, index) => {
      if (typeof item === 'string') {
        // If it's a string (name), create a mock candidate
        return {
          name: item,
          email: `${item.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          resume: `Experienced ${item} with relevant skills.`,
          experience: `${2 + (index % 5)} years`,
          skills: parsedJD.skills ? parsedJD.skills.slice(0, 3) : ["General Skills"]
        };
      } else {
        // If it's a File object, you might want to read it
        // For now, just use the filename
        return {
          name: item.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          email: `${item.name.replace(/\.[^/.]+$/, "").toLowerCase().replace(/\s+/g, '.')}@example.com`,
          resume: `Resume content for ${item.name}`,
          experience: `${2 + (index % 5)} years`,
          skills: parsedJD.skills ? parsedJD.skills.slice(0, 3) : ["General Skills"]
        };
      }
    });

    const response = await fetch(`${API_BASE_URL}/candidates/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidates })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Candidate upload response:", data);
    
    // Format the response to match your frontend expectations
    return data.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      experience: candidate.experience,
      skills: candidate.skills,
      score: candidate.score || Math.floor(50 + Math.random() * 50) // Fallback score
    }));
  } catch (error) {
    console.error("Candidate upload failed:", error);
    throw error;
  }
}

// Generate interview questions
export async function generateInterviewQuestions(parsedJD = {}, candidates = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_description: parsedJD.summary || "Technical role",
        job_skills: parsedJD.skills || [],
        candidate_skills: candidates.flatMap(c => c.skills || []).slice(0, 5)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Questions response:", data);
    
    // Return just the questions array
    return data.questions || [];
  } catch (error) {
    console.error("Question generation failed:", error);
    throw error;
  }
}

// Add single candidate
export async function addCandidate(candidateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Add candidate failed:", error);
    throw error;
  }
}

// Debug endpoint to see stored candidates - THIS WAS MISSING!
export async function getStoredCandidates() {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates/debug`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Stored candidates:", data);
    return data;
  } catch (error) {
    console.error("Get stored candidates failed:", error);
    throw error;
  }
}