// src/components/CandidateUpload.jsx
import React, { useState } from 'react';

export default function CandidateUpload({ onUpload }) {
  const [names, setNames] = useState('');

  const handleUpload = () => {
    if (names.trim() === '') {
      alert('Enter candidate names separated by commas.');
      return;
    }
    const candidates = names.split(',').map((n) => n.trim());
    onUpload(candidates);
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md space-y-2">
      <h2 className="text-xl font-semibold">Upload candidates</h2>
      <textarea
        value={names}
        onChange={(e) => setNames(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter candidate names separated by commas"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Upload
      </button>
    </div>
  );
}
