import React, { useRef, useState } from "react";

export default function UploadDropzone({ onUpload }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState([]);

  const handleFiles = (files) => {
    // Accept either file objects or array of names
    const arr = Array.from(files).map(f => (f.name ? f.name : String(f)));
    setPreview(arr);
    if (onUpload) onUpload(arr);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="p-6 bg-white rounded-2xl shadow border-dashed border-2 border-transparent hover:border-slate-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Upload resumes (drag & drop or paste names)</div>
          <div className="text-sm text-slate-500">Supports multiple files. For demo, you can paste names below and hit Upload.</div>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <button onClick={() => inputRef.current.click()} className="px-3 py-2 bg-indigo-600 text-white rounded-md">
            Select files
          </button>
        </div>
      </div>

      {preview.length > 0 && (
        <ul className="mt-4 list-disc pl-5 space-y-1">
          {preview.map((p, i) => <li key={i} className="text-sm">{p}</li>)}
        </ul>
      )}
    </div>
  );
}
