// ./components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 border-b bg-white/70 backdrop-blur fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">TM</div>
          <h1 className="font-semibold text-xl">TalentMatch</h1>
        </div>
        <nav className="flex items-center gap-4">
          <button className="text-sm hover:text-indigo-600">Home</button>
          <button className="text-sm hover:text-indigo-600">Features</button>
          <button className="text-sm hover:text-indigo-600">Pricing</button>
          <button className="text-sm hover:text-indigo-600">Contact</button>
          <button
            onClick={() => navigate('/dashboard')}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Sign up / Log in
          </button>
        </nav>
      </div>
    </header>
  );
}
