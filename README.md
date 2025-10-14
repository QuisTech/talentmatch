TalentMatch - AI-Powered Recruitment Platform
https://img.shields.io/badge/TalentMatch-AI%2520Recruitment-blue
https://img.shields.io/badge/React-18.2.0-61dafb
https://img.shields.io/badge/Flask-2.3.3-green
https://img.shields.io/badge/Python-3.11-blue

TalentMatch is a modern, AI-powered recruitment platform that intelligently matches candidates to job descriptions using semantic similarity and machine learning.

🚀 Features
Core Functionality
AI Job Analysis - Parse and extract key skills from job descriptions

Smart Candidate Matching - Semantic similarity matching using vector embeddings

Candidate Management - Upload and store candidate profiles

Interview Question Generation - AI-powered, context-aware interview questions

Real-time Ranking - Live candidate ranking with similarity scores

Technical Features
Full-Stack Application - React frontend with Flask backend

Vector Similarity Search - Advanced matching using embeddings

Responsive Design - Mobile-friendly Tailwind CSS interface

RESTful API - Clean API architecture for extensibility

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks

React Router - Client-side routing

Tailwind CSS - Utility-first CSS framework

Framer Motion - Smooth animations

Vite - Fast build tool and dev server

Backend
Flask - Python web framework

Pinecone - Vector database for similarity search

OpenAI Embeddings - Text embedding generation

Python-dotenv - Environment configuration

📦 Installation
Prerequisites
Node.js 16+ and npm

Python 3.8+

Pinecone account (optional - fallback to in-memory store)

Backend Setup
Navigate to backend directory

bash
cd talentmatch/backend
Install Python dependencies

bash
pip install -r requirements.txt
Set up environment variables

bash
cp .env.example .env
Edit .env with your credentials:

env
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_environment
OPENAI_API_KEY=your_openai_api_key
DEBUG=True
Start the Flask server

bash
python -m backend.app
Server runs on http://localhost:5000

Frontend Setup
Navigate to project root

bash
cd talentmatch
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Application runs on http://localhost:5173

🎯 Usage
Basic Workflow
Access the Application

Open http://localhost:5173 in your browser

Click "Try it now" to access the dashboard

Analyze Job Description

Paste a job description in the text area

Click "Analyze" to extract skills and requirements

Upload Candidates

Drag & drop resume files or paste candidate names

System automatically processes and stores candidates

View Matches

See real-time candidate rankings with similarity scores

Scores range from 0-100% based on semantic match

Generate Questions

Click "Generate" to create interview questions

Questions are tailored to job requirements and candidate skills

API Endpoints
Jobs
POST /jobs/analyze - Analyze job description

GET /jobs/ - Get jobs endpoint info

Candidates
POST /candidates/upload - Upload multiple candidates

POST /candidates/add - Add single candidate

GET /candidates/debug - Debug stored candidates

Questions
POST /questions/generate - Generate interview questions

POST /questions/submit - Submit and evaluate answers

🏗 Project Structure
text
talentmatch/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard/
│   │   ├── Landing/
│   │   └── Shared/
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   └── LandingPage.jsx
│   ├── utils/              # Utilities and API
│   │   └── api.js
│   └── main.jsx           # App entry point
├── backend/
│   ├── routes/            # Flask route handlers
│   │   ├── jobs.py
│   │   ├── candidates.py
│   │   └── questions.py
│   ├── utils/             # Backend utilities
│   │   ├── embeddings.py
│   │   ├── parser.py
│   │   └── scoring.py
│   ├── pinecone_client.py # Vector database client
│   └── app.py            # Flask application
└── configuration/
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
🔧 Configuration
Environment Variables
Backend (.env)

env
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-east-1
OPENAI_API_KEY=your_openai_key
DEBUG=True
Frontend (vite.config.js)

javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
🚀 Deployment
Development
bash
# Backend
cd backend && python -m backend.app

# Frontend  
cd talentmatch && npm run dev
Production Build
bash
# Build frontend
npm run build

# Serve with nginx or similar
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
For support and questions:

Check the Issues page

Create a new issue with detailed description

🏆 Acknowledgments
OpenAI for embedding models

Pinecone for vector database infrastructure

React and Flask communities

Tailwind CSS for styling system

<div align="center">
Built with ❤️ for better hiring experiences

Report Bug · Request Feature

</div>