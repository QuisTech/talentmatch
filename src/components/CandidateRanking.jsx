import React from "react";

export default function CandidateRanking({ candidates }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Candidate Ranking</h2>
      <ul className="list-disc pl-5">
        {candidates.map((c) => (
          <li key={c.id}>
            {c.name} — Score: {c.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
