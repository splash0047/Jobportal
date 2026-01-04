# 🔌 API Reference

## Base URLs
- **Development**: `http://localhost:5000/api`
- **Production**: Defined by `VITE_API_URL` env var (e.g., `https://job-portal-backend.up.railway.app`)

## 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT | No |

## 💼 Jobs
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Get all jobs (with filters) | No |
| `POST` | `/api/jobs` | Create a new job | Yes (Recruiter) |
| `GET` | `/api/jobs/myjobs` | Get jobs posted by current recruiter | Yes (Recruiter) |
| `GET` | `/api/jobs/recommended` | Get jobs matching candidate skills | Yes (Candidate) |
| `GET` | `/api/jobs/:id` | Get job details | No |
| `DELETE` | `/api/jobs/:id` | Delete a job | Yes (Recruiter) |

## 📝 Applications
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/applications` | Apply for a job | Yes (Candidate) |
| `GET` | `/api/applications/my` | Get my applications | Yes (Candidate) |
| `GET` | `/api/applications/job/:jobId` | Get candidates for a job | Yes (Recruiter) |
| `PUT` | `/api/applications/:id/status` | Update application status | Yes (Recruiter) |

## 📄 Resume & AI
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/resume/upload` | Upload resume for AI analysis | Yes |

*Note: The AI Service runs internally and is not exposed to the public internet except via the Backend.*

## 🤖 AI Service Endpoints (Internal)
Base URL: `http://localhost:8000` (or `AI_SERVICE_URL`)

| Method | Endpoint | Input | Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | None | Health Check |
| `POST` | `/parse-resume` | `file` (Multipart/Form-Data) | `parsed_data` { skills, email, ... } |
