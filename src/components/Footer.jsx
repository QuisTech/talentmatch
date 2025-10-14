// ./components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-white/50 backdrop-blur">
      <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} TalentMatch. All rights reserved.
      </div>
    </footer>
  );
}
