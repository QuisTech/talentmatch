import React, { useState } from 'react';
import Sidebar from '@components/Sidebar';
import JobDescriptionInput from '@components/JobDescriptionInput';
import CandidateUpload from '@components/CandidateUpload';
import CandidateRanking from '@components/CandidateRanking';
import InterviewQuestions from '@components/InterviewQuestions';
import { Candidate } from '../types/candidate';
import { JobDescription } from '../types/job';

type DashboardView = 'overview' | 'candidates' | 'jobs' | 'analytics';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [currentJob, setCurrentJob] = useState<JobDescription | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleJobAnalyzed = (job: JobDescription) => {
    setCurrentJob(job);
    console.log('Job analyzed:', job);
  };

  const handleCandidatesUploaded = (uploadedCandidates: Candidate[]) => {
    setCandidates(prev => [...prev, ...uploadedCandidates]);
    console.log('Candidates uploaded:', uploadedCandidates.length);
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    console.log('Candidate selected:', candidate.name);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Welcome to TalentMatch Dashboard</h2>
              <p className="text-gray-600">
                Upload job descriptions and candidate resumes to start the AI-powered matching process.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">1. Analyze Job Description</h3>
                <JobDescriptionInput 
                  onJobAnalyzed={handleJobAnalyzed}
                />
                {currentJob && (
                  <div className="mt-4 p-4 bg-green-50 rounded">
                    <p className="font-semibold">Current Job: {currentJob.title}</p>
                    <p className="text-sm text-gray-600">{currentJob.requiredSkills.length} required skills identified</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">2. Upload Candidates</h3>
                <CandidateUpload 
                  onUploadComplete={handleCandidatesUploaded}
                  jobId={currentJob?.id}
                />
                {candidates.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="font-semibold">{candidates.length} candidates uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {currentJob && candidates.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">3. AI Matching Results</h3>
                <CandidateRanking 
                  candidates={candidates}
                  job={currentJob}
                  onSelectCandidate={handleSelectCandidate}
                />
              </div>
            )}
          </div>
        );

      case 'candidates':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Candidate Management</h2>
            <CandidateUpload onUploadComplete={handleCandidatesUploaded} />
            {candidates.length > 0 ? (
              <div className="mt-6">
                <CandidateRanking 
                  candidates={candidates}
                  job={currentJob!}
                  onSelectCandidate={handleSelectCandidate}
                />
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No candidates uploaded yet.</p>
            )}
          </div>
        );

      case 'jobs':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Job Descriptions</h2>
            <JobDescriptionInput onJobAnalyzed={handleJobAnalyzed} />
            {currentJob && (
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <h3 className="text-lg font-bold">Active Job</h3>
                <p className="font-semibold">{currentJob.title}</p>
                <p className="text-sm text-gray-600 mt-2">{currentJob.description.substring(0, 200)}...</p>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Analytics & Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-blue-700">Total Candidates</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-green-700">Avg Match Score</p>
                <p className="text-2xl font-bold">
                  {candidates.length > 0 
                    ? (candidates.reduce((acc, c) => acc + (c.score || 0), 0) / candidates.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-sm text-purple-700">Jobs Analyzed</p>
                <p className="text-2xl font-bold">{currentJob ? 1 : 0}</p>
              </div>
            </div>
            <InterviewQuestions 
              jobDescription={currentJob?.description || ''}
              candidateSkills={candidates.flatMap(c => c.skills)}
            />
          </div>
        );

      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">TalentMatch Dashboard</h1>
            <p className="text-gray-600">AI-powered recruitment platform</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
