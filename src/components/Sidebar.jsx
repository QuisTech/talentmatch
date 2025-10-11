import React from "react";

export default function Sidebar({ className }) {
  return (
    <aside
      className={`w-64 p-4 bg-white/60 backdrop-blur rounded-r-2xl shadow-sm hidden md:block ${className || ""}`}
    >
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
          TM
        </div>
        <h2 className="text-xl font-semibold">TalentMatch</h2>
      </div>

      <nav className="space-y-2">
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100">
          Dashboard
        </button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100">
          Candidates
        </button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100">
          Interviews
        </button>
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100">
          Settings
        </button>
      </nav>
    </aside>
  );
}
