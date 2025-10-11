/**
 * Mock API helpers for Dashboard demo.
 * Replace these with real API / LLM calls later.
 */

export async function analyzeJobDescription(jobText) {
  // simulate work
  await new Promise((r) => setTimeout(r, 700));
  const words = jobText.trim().split(/\s+/).filter(Boolean);
  return {
    title: words.slice(0,3).join(' ') || 'Untitled Role',
    skills: ['React', 'Node.js', 'TypeScript', 'Testing'].slice(0, Math.min(4, Math.max(1, Math.floor(words.length/10)))),
    summary: jobText.slice(0, 240) + (jobText.length > 240 ? '...' : ''),
    scoreHint: Math.min(100, Math.max(40, Math.floor(words.length * 2)))
  };
}

export async function uploadCandidateFiles(filesOrNames, parsedJD) {
  // filesOrNames: either File objects or array of strings (our placeholders)
  await new Promise((r) => setTimeout(r, 400));
  // Normalize to candidates array
  const items = filesOrNames.map((f, i) => {
    const name = typeof f === 'string' ? f : (f.name || `Candidate ${i+1}`);
    return {
      id: `${Date.now()}-${i}`,
      name,
      experience: `${1 + (i % 7)} years`,
      score: Math.floor(50 + Math.random() * 50) // mock score 50-99
    };
  });
  return items;
}

export async function generateInterviewQuestions(parsedJD, candidates) {
  await new Promise((r) => setTimeout(r, 500));
  // basic mock: return 3 questions per candidate + 2 role-level questions
  const base = [
    `Tell us about a project where you used ${parsedJD?.skills?.[0] ?? 'relevant tech'}.`,
    `How do you approach debugging and testing?`,
  ];
  const perCandidate = candidates.slice(0,5).flatMap((c, idx) => [
    `For ${c.name}: describe a challenge you solved in ${c.experience}.`,
  ]);
  return [...base, ...perCandidate];
}
