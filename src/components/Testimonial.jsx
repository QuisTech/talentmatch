import React from "react";

export default function Testimonial({ quote, name }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border">
      <p className="italic mb-4 text-slate-700">“{quote}”</p>
      <div className="text-sm font-medium text-slate-600">— {name}</div>
    </div>
  );
}
