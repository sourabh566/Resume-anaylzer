# AI-Powered Resume Analyzer

Full-stack web application for analyzing resumes using AI/NLP.

## Tech Stack
- **Frontend**: React.js + Tailwind CSS + Chart.js
- **Backend**: Node.js + Express + MongoDB + OpenAI API
- **Auth**: JWT
- **File Processing**: Multer + pdf-parse + mammoth

## Quick Start

1. **Clone & Install**
```bash
git clone <repo>
cd Resume-anaylzer
npm install-all
```

2. **Environment Setup**
```bash
cp .env.example .env
# Fill in your keys:
# MONGODB_URI=your_mongo_connection
# JWT_SECRET=your_secret
# OPENAI_API_KEY=your_openai_key
```

3. **Run Development**
```bash
npm run dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

4. **Production Build**
```bash
npm run build
npm start
```

## Folder Structure
```
Resume-anaylzer/
├── backend/          # Express API server
├── frontend/         # React app
├── package.json
├── README.md
└── .env.example
```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/resume/upload`
- `POST /api/resume/analyze`
- `GET /api/resume/history`

## Features
✅ User Authentication  
✅ Resume Upload (PDF/DOCX)  
✅ AI-powered Analysis  
✅ Job Description Matching  
✅ Resume Score & Suggestions  
✅ Dashboard with History  
✅ ATS Compatibility Check  
✅ Responsive UI
