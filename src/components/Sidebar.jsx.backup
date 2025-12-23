// ===== FILE: ./src/components/Sidebar.jsx =====
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'candidates', label: 'Candidates', path: '/candidates' },
    { id: 'interviews', label: 'Interviews', path: '/interviews' },
    { id: 'settings', label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    if (path === '/dashboard') {
      navigate('/dashboard');
    } else {
      // For other routes that don't exist, show alert
      alert(`${path.slice(1).charAt(0).toUpperCase() + path.slice(2)} feature is coming soon!`);
    }
  };

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
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              location.pathname === item.path 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'hover:bg-indigo-50 text-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}