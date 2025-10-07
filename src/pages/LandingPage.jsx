import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white text-slate-900">
      {/* Your entire LandingPage component JSX */}
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
            <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Sign up / Log in</button>
          </nav>
        </div>
      </header>

      {/* Rest of your LandingPage component... */}
    </div>
  );
}

// Export the helper components if needed
export function FeatureCard({ title, description, icon }) {
  return (
    <div className="p-8 border rounded-2xl shadow-sm bg-slate-50 hover:shadow-md transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}

export function Testimonial({ quote, name }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border">
      <p className="italic mb-4 text-slate-700">"{quote}"</p>
      <div className="text-sm font-medium text-slate-600">— {name}</div>
    </div>
  );
}

export function PricingCard({ tier, price, features, highlight }) {
  return (
    <div className={`p-8 rounded-2xl border ${highlight ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-slate-900'}`}>
      <h4 className="text-2xl font-semibold mb-2">{tier}</h4>
      <div className="text-4xl font-bold mb-6">{price}</div>
      <ul className="space-y-2 mb-8 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center justify-center gap-2">
            <span>{highlight ? '✅' : '✔️'}</span> {f}
          </li>
        ))}
      </ul>
      <button className={`px-6 py-3 rounded-xl font-medium ${highlight ? 'bg-white text-indigo-700 hover:bg-slate-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>Get started</button>
    </div>
  );
}