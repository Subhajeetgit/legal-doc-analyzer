# Legal Document Analyzer

A full-stack web application that allows users to upload legal documents (PDF), analyze them using AI, extract key clauses, identify risks, and export a structured PDF report.

---

## Features

- User authentication (JWT-based)
- Upload legal documents (PDF)
- Secure storage using MongoDB GridFS
- Text extraction from documents
- AI-powered legal analysis using OpenAI
- Extracted:
  - Summary
  - Important clauses
  - Potential risks
- Export AI analysis as a downloadable PDF
- Clean and modern React UI

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- GridFS
- JWT Authentication
- OpenAI API
- pdfkit (PDF export)

---

## Screenshots

### Login
![Login](screenshots/1-login.png)

### Register
![Register](screenshots/2-register.png)

### Upload Document
![Upload](screenshots/3-upload.png)

### AI Analysis
![Analysis](screenshots/4-analysis.png)

### Download PDF Report
![Download PDF](screenshots/5-download-pdf.png)

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Subhajeetgit/legal-doc-analyzer
cd Legal-Doc-Analyzer



MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key



API Endpoints

POST /api/auth/register


API endpoints:

POST /api/auth/login

POST /api/documents/upload

POST /api/analysis/:documentId/analyze

GET /api/documents/:documentId/export-pdf