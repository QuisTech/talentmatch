# ===== FILE: ./test_complete_workflow.py =====

import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_complete_workflow():
    print("🧪 Testing Complete TalentMatch Workflow")
    print("=" * 50)
    
    # Step 1: Upload candidates
    print("1. 📥 Uploading candidates...")
    candidates_data = {
        "candidates": [
            {
                "name": "Alex Python",
                "email": "alex@example.com",
                "resume": "Python backend developer with extensive Flask experience. Built multiple REST APIs and worked with PostgreSQL. Also familiar with React for frontend.",
                "experience": "4 years",
                "skills": ["Python", "Flask", "REST APIs", "PostgreSQL", "React"]
            },
            {
                "name": "Maria Fullstack",
                "email": "maria@example.com", 
                "resume": "Full-stack developer with React and Node.js expertise. Strong frontend skills with modern JavaScript frameworks.",
                "experience": "3 years",
                "skills": ["JavaScript", "React", "Node.js", "HTML", "CSS"]
            }
        ]
    }
    
    response = requests.post(f"{BASE_URL}/candidates/upload", json=candidates_data)
    if response.status_code == 200:
        candidates = response.json()
        print(f"✅ Uploaded {len(candidates)} candidates")
        for candidate in candidates:
            print(f"   - {candidate['name']} (ID: {candidate['id']})")
    else:
        print(f"❌ Candidate upload failed: {response.text}")
        return
    
    # Step 2: Check storage
    print("\n2. 🔍 Checking candidate storage...")
    response = requests.get(f"{BASE_URL}/candidates/debug")
    if response.status_code == 200:
        debug_info = response.json()
        print(f"✅ Storage check: {debug_info['total_candidates']} candidates stored")
        if debug_info['candidates']:
            for candidate in debug_info['candidates']:
                print(f"   - {candidate['name']}: {candidate['skills']}")
    else:
        print(f"❌ Storage check failed: {response.text}")
    
    # Step 3: Analyze job
    print("\n3. 📊 Analyzing job description...")
    job_data = {
        "job_text": "Python Flask developer needed for backend API development. Must have experience with web frameworks and REST APIs. Knowledge of React is beneficial but not required. 3+ years of experience preferred."
    }
    
    response = requests.post(f"{BASE_URL}/jobs/analyze", json=job_data)
    if response.status_code == 200:
        job_result = response.json()
        print(f"✅ Job analyzed: {job_result.get('title', 'Unknown')}")
        print(f"   Skills detected: {', '.join(job_result.get('skills', []))}")
        print(f"   Found {job_result.get('candidate_count', 0)} matching candidates")
        
        if job_result.get('matching_candidates'):
            print("   Top matches:")
            for match in job_result['matching_candidates'][:3]:
                name = match.get('metadata', {}).get('name', 'Unknown')
                score = match.get('score', 0)
                print(f"     - {name}: {score}%")
    else:
        print(f"❌ Job analysis failed: {response.text}")
    
    # Step 4: Generate questions
    print("\n4. ❓ Generating interview questions...")
    questions_data = {
        "job_description": "Python Flask backend developer",
        "job_skills": ["Python", "Flask", "REST APIs", "Backend"],
        "candidate_skills": ["Python", "Flask", "React"]
    }
    
    response = requests.post(f"{BASE_URL}/questions/generate", json=questions_data)
    if response.status_code == 200:
        questions_result = response.json()
        print(f"✅ Generated {questions_result.get('count', 0)} questions:")
        for i, question in enumerate(questions_result.get('questions', []), 1):
            print(f"   {i}. {question}")
    else:
        print(f"❌ Question generation failed: {response.text}")
    
    print("\n" + "=" * 50)
    print("🎉 Complete workflow test finished!")

if __name__ == "__main__":
    test_complete_workflow()