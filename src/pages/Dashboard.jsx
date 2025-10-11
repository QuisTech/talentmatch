import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JobEditor from "../components/JobEditor";
import UploadDropzone from "../components/UploadDropzone";
import RankingTable from "../components/RankingTable";
import QuestionsPanel from "../components/QuestionsPanel";
import ExportPanel from "../components/ExportPanel";

import {
  analyzeJobDescription,
  uploadCandidateFiles,
  generateInterviewQuestions,
} from "../utils/api";

export default function Dashboard() {
  const [parsedJD, setParsedJD] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleAnalyzeJob = async (text) => {
    setAnalyzing(true);
    try {
      const res = await analyzeJobDescription(text);
      setParsedJD(res);
    } catch (e) {
      console.error(e);
      alert('Analysis failed (mock).');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCandidateUpload = async (items) => {
    const uploaded = await uploadCandidateFiles(items, parsedJD || {});
    setCandidates((prev) => [...prev, ...uploaded]);
  };

  const handleGenerateQuestions = async () => {
    const qs = await generateInterviewQuestions(parsedJD || {}, candidates || []);
    setQuestions(qs);
  };

  const handleSort = () => {
    setCandidates((prev) => prev.slice().sort((a,b) => (b.score||0) - (a.score||0)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        <div className="md:col-span-3 hidden md:block">
          <Sidebar />
        </div>

        <div className="md:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Hiring Assistant</h1>
            <div className="text-sm text-slate-500">Welcome back — build better shortlists faster.</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <JobEditor onAnalyze={handleAnalyzeJob} analyzing={analyzing} parsed={parsedJD} />
              <UploadDropzone onUpload={handleCandidateUpload} />
            </div>

            <div className="space-y-4">
              <RankingTable candidates={candidates} onSort={handleSort} />
              <QuestionsPanel questions={questions} onGenerate={handleGenerateQuestions} />
              <ExportPanel candidates={candidates} questions={questions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
