// ===== FILE: ./src/pages/Dashboard.jsx =====

import React, { useState, useEffect } from "react";
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
  getStoredCandidates
} from "../utils/api";

export default function Dashboard() {
  const [parsedJD, setParsedJD] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  // Load existing candidates on component mount
  useEffect(() => {
    loadStoredCandidates();
  }, []);

  const loadStoredCandidates = async () => {
    try {
      const data = await getStoredCandidates();
      if (data.candidates && data.candidates.length > 0) {
        // Format stored candidates for the frontend
        const formattedCandidates = data.candidates.map(candidate => ({
          id: candidate.id,
          name: candidate.name,
          experience: candidate.experience,
          skills: candidate.skills,
          score: 50 // Default score for existing candidates
        }));
        setCandidates(formattedCandidates);
      }
    } catch (error) {
      console.error("Failed to load stored candidates:", error);
    }
  };

  const handleAnalyzeJob = async (text) => {
    setAnalyzing(true);
    try {
      const res = await analyzeJobDescription(text);
      setParsedJD(res);
      
      // If we have matching candidates from the analysis, update our candidates list
      if (res.matching_candidates && res.matching_candidates.length > 0) {
        const matchedCandidates = res.matching_candidates.map(match => ({
          id: match.candidate_id,
          name: match.metadata?.name || 'Unknown Candidate',
          experience: match.metadata?.experience || 'Not specified',
          skills: match.metadata?.skills || [],
          score: match.score || 0
        }));
        
        // Merge with existing candidates, updating scores for matched ones
        setCandidates(prev => {
          const updated = [...prev];
          matchedCandidates.forEach(matched => {
            const existingIndex = updated.findIndex(c => c.id === matched.id);
            if (existingIndex >= 0) {
              updated[existingIndex] = { ...updated[existingIndex], score: matched.score };
            } else {
              updated.push(matched);
            }
          });
          return updated;
        });
      }
    } catch (error) {
      console.error("Job analysis error:", error);
      alert("Failed to analyze job description. Check console for details.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCandidateUpload = async (items) => {
    setUploading(true);
    try {
      const uploaded = await uploadCandidateFiles(items, parsedJD || {});
      setCandidates(prev => {
        // Merge new candidates, avoiding duplicates by ID
        const existingIds = new Set(prev.map(c => c.id));
        const newCandidates = uploaded.filter(c => !existingIds.has(c.id));
        return [...prev, ...newCandidates];
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload candidates. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setGeneratingQuestions(true);
    try {
      const qs = await generateInterviewQuestions(parsedJD || {}, candidates);
      setQuestions(qs);
    } catch (error) {
      console.error("Question generation error:", error);
      alert("Failed to generate questions. Check console for details.");
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleSort = () => {
    setCandidates(prev => prev.slice().sort((a, b) => (b.score || 0) - (a.score || 0)));
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
            <div className="text-sm text-slate-500">
              {candidates.length} candidates loaded • Ready to match
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <JobEditor
                onAnalyze={handleAnalyzeJob}
                analyzing={analyzing}
                parsed={parsedJD}
              />
              <UploadDropzone 
                onUpload={handleCandidateUpload} 
                uploading={uploading}
              />
            </div>

            <div className="space-y-4">
              <RankingTable 
                candidates={candidates} 
                onSort={handleSort} 
              />
              <QuestionsPanel 
                questions={questions} 
                onGenerate={handleGenerateQuestions}
                generating={generatingQuestions}
              />
              <ExportPanel 
                candidates={candidates} 
                questions={questions} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}