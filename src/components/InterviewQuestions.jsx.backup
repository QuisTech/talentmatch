// src/components/InterviewQuestions.jsx
import React, { useState } from 'react';

export default function InterviewQuestions({ onGenerate, questions }) {
  const handleGenerate = () => {
    onGenerate();
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md space-y-2">
      <h2 className="text-xl font-semibold">Interview Questions</h2>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Generate Questions
      </button>
      {questions.length > 0 && (
        <ul className="list-decimal list-inside mt-2">
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
