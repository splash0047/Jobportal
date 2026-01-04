# 🚀 Intelligent Job Portal with AI Resume Analysis

A full-stack modern Job Portal application featuring an AI-powered resume analyzer, real-time chat, and a sleek React frontend. This project is built with a microservices-inspired architecture separating the Frontend, Backend API, and AI Service.

![Job Portal Banner](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop)

## ✨ Features

- **🤖 AI Resume Parsing**: Upload a resume (PDF/DOCX) and get instant analysis, skill extraction, and scoring using Python & NLP.
- **💬 Real-time Chat**: Job seekers and employers can chat in real-time (powered by Socket.io).
- **🔐 Secure Authentication**: JWT-based auth with encrypted passwords.
- **🎨 Modern UI**: Responsive, beautiful interface built with React, Vite, and Tailwind CSS.
- **📄 Job Management**: Post search, filter, and apply for jobs.
- **☁️ Cloud Uploads**: Resume and profile image storage via Cloudinary.

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Redux Toolkit** (State Management)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Socket.io Client** (Real-time communication)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Socket.io** (WebSockets)
- **JWT** (Auth)
- **Cloudinary** (File Storage)

### AI Microservice
- **Python 3.10+**
- **FastAPI**
- **Spacy / NLTK** (NLP)
- **PDFMiner** (Text Extraction)

---

## 🚀 Getting Started Locally

Follow these steps to run the project on your machine.

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB Atlas Account
- Cloudinary Account

### 1. Clone the Repository
```bash
git clone https://github.com/splash0047/Jobportal.git
cd Jobportal
```

### 2. Setup Backend (Node.js)
```bash
cd backend
npm install
```
**Create a `.env` file in `backend/`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
# Link to AI Service (running locally)
AI_SERVICE_URL=http://localhost:8000
# Link to Frontend (for CORS)
FRONTEND_URL=http://localhost:5173
```
**Run Backend:**
```bash
npm run dev
```

### 3. Setup AI Service (Python)
```bash
cd ../ai-service
# Recommended: Create a virtual environment
# python -m venv venv
# source venv/bin/activate  (or venv\Scripts\activate on Windows)

pip install -r requirements.txt
```
**Run AI Service:**
```bash
# Runs on localhost:8000
uvicorn app.main:app --reload --port 8000
```

### 4. Setup Frontend (React)
```bash
cd ../frontend/job-portal
npm install
```
**Create a `.env` file in `frontend/job-portal/`:**
```env
# Link to Backend
VITE_API_URL=http://localhost:5000
```
**Run Frontend:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app!

---

## 🌐 Deployment

The project is deployed using a split-hosting strategy for optimal performance and free-tier compatibility.

### Architecture
- **Frontend**: Deployed on **Netlify**.
- **Backend & AI Service**: Deployed on **Railway** (or Render).

### Configuration Files
- `netlify.toml`: Handling frontend build and routing.
- `render.yaml` / `Procfile`: Configuring backend services for cloud platforms.

### Environment Variables for Production
When deploying, ensure you link the services using these variables:
- **Frontend**: Needs `VITE_API_URL` pointing to the deployed Backend URL.
- **Backend**: Needs `AI_SERVICE_URL` pointing to the deployed AI Service URL.

---

## 📂 Project Structure

```
Jobportal/
├── backend/                # Node.js Express Server
│   ├── config/            # DB & Cloud config
│   ├── controllers/       # API Logic
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # API Routes
│   └── server.js          # Entry point
│
├── frontend/              # Frontend Monorepo Folder
│   └── job-portal/        # Vite React App
│       ├── src/
│       │   ├── pages/     # Page Components
│       │   ├── redux/     # State Slices
│       │   └── services/  # API & Socket calls
│       └── netlify.toml   # Frontend Deployment Config
│
├── ai-service/            # Python FastAPI Service
│   ├── app/
│   │   ├── main.py        # Entry point
│   │   └── core/          # Parsing logic
│   └── requirements.txt
│
├── render.yaml            # Render Deployment Config (Infrastructure as Code)
└── README.md              # Documentation
```

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
