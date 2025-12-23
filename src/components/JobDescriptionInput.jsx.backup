// src/components/JobDescriptionInput.jsx
import React, { useState } from 'react';

export default function JobDescriptionInput({ onAnalyze }) {
  const [jobText, setJobText] = useState('');

  const handleAnalyze = () => {
    if (jobText.trim() === '') {
      alert('Please enter a job description!');
      return;
    }
    // Call parent handler
    onAnalyze(jobText);
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md space-y-2">
      <h2 className="text-xl font-semibold">Paste your job description here</h2>
      <textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        rows={6}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Type or paste the job description..."
      />
      <button
        onClick={handleAnalyze}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Analyze
      </button>
    </div>
  );
}
