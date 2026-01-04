# 🏗️ System Architecture

## Overview
The Job Portal uses a microservices-inspired architecture with a split-stack deployment strategy. This ensures scalability, separation of concerns, and optimized hosting costs.

```mermaid
graph TD
    User[用户 (Candidate/Recruiter)]
    Browser[Web Browser (React App)]
    
    subgraph Netlify
        Frontend[Frontend Application]
    end
    
    subgraph Railway
        Backend[Backend API (Node.js)]
        AI[AI Service (Python)]
        DB[(MongoDB Atlas)]
        Cloud[Cloudinary]
    end
    
    User -->|Interacts| Browser
    Browser -->|HTTPS| Frontend
    Browser -->|API Calls (Axios)| Backend
    Browser -->|WebSockets| Backend
    
    Backend -->|Data Persistence| DB
    Backend -->|File Storage| Cloud
    Backend -->|Resume Parsing| AI
```

## Components

### 1. Frontend (Client)
- **Tech**: React 19, Vite, Tailwind CSS, Redux Toolkit.
- **Responsibility**: UI rendering, state management, API integration, real-time chat interface.
- **Hosting**: Netlify (high-performance CDN).

### 2. Backend (API Gateway & Core Logic)
- **Tech**: Node.js, Express.js.
- **Responsibility**: 
    - Authentication (JWT).
    - Job & Application management.
    - Chat socket handling (Socket.io).
    - Orchestrating requests between Database, Cloudinary, and AI Service.
- **Hosting**: Railway (Node.js container).

### 3. AI Service (Microservice)
- **Tech**: Python 3.10, FastAPI, Spacy, PDFMiner.
- **Responsibility**: 
    - Parsing PDF/DOCX resumes.
    - Extracting skills, experience, and education.
    - Returning structured JSON data to the Backend.
- **Hosting**: Railway (Python container).

## Data Flow: Resume Parsing
1. **User** uploads a PDF/DOCX file on the Frontend.
2. **Frontend** POSTs the file to Backend `/api/resume/upload`.
3. **Backend** saves file temporarily and forwards it to **AI Service** (`/parse-resume`).
4. **AI Service** extracts text, identifies entities (skills, name, email), and returns JSON.
5. **Backend** uploads the original file to **Cloudinary** for permanent storage.
6. **Backend** updates the User's profile in **MongoDB** with the analyzed data and file URL.
7. **Frontend** receives the success response and updates the UI.

## Database Schema (Simplified)

### User
- `name`, `email`, `password` (hashed), `role` (candidate/recruiter)
- `profile`: { `skills`, `experience`, `resumeURL` }

### Job
- `title`, `description`, `company`, `location`, `salary`
- `recruiterId` (ref User)

### Application
- `jobId`, `candidateId`, `status` (applied/viewed/accepted)
