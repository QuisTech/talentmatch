// ===== FILE: ./src/App.jsx =====
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CandidatesPage from "./pages/CandidatesPage"; // Add this

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/interviews" element={<CandidatesPage />} /> {/* Reuse for now */}
        <Route path="/settings" element={<CandidatesPage />} /> {/* Reuse for now */}
      </Routes>
    </Router>
  );
}