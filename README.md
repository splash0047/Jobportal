# WorkFlow AI — Job Portal

A full-stack candidate and recruiter project built with React, Redux Toolkit, Express, MongoDB, Socket.io, and a separate FastAPI service for PDF resume extraction. The recruiter page displays applications, permits status changes, and opens chats with candidates who applied to that recruiter.

## What the code does

- Candidates register, upload PDF resumes (5 MB maximum), browse jobs, apply, and receive job recommendations based on case-insensitive overlap between profile skills and job requirements.
- Recruiters post jobs, view applications for jobs they own, shortlist or reject applicants, and message those applicants. The API and socket server check application membership before showing or sending chat messages.
- Resume extraction uses PDFMiner for text, regular expressions for email and phone, and a fixed dictionary for skills. This is basic extraction, not an ML model or semantic ranking system. If extraction is unavailable, the PDF can still be stored in Cloudinary and the response reports `parsingAvailable: false`.
- The frontend stores its JWT in localStorage and refreshes its user profile through `GET /api/auth/me` after page reload. This storage method has XSS exposure; cookie-based session handling would be a further improvement.

## Architecture

```text
React / Redux  ->  Express REST API  ->  MongoDB
      |                  |
      | Socket.io / JWT  +-> Cloudinary (PDF storage)
      +------------------+-> FastAPI / PDFMiner (optional extraction)
```

Both Express and the FastAPI service have `/health` endpoints. Socket.io verifies the JWT, assigns the user to their own room, and derives the message sender from that verified user. The FastAPI parsing endpoint requires a shared service token and should be reachable only by the backend in deployment.

## Run locally

1. Set up MongoDB and Cloudinary. Copy `backend/.env.example` to `backend/.env` and set your own credentials. Set `CLIENT_ORIGIN` to your Vite origin (default `http://localhost:5173`). Create a strong, distinct `JWT_SECRET` and `AI_SERVICE_TOKEN`.
2. Copy `ai-service/.env.example` to `ai-service/.env` and use the **same** `AI_SERVICE_TOKEN` as the backend. Environment files are examples only; load your actual environment in the shell or deployment platform (FastAPI does not auto-load `.env`). For local testing you can run `set -a; source .env; set +a` from `ai-service/`.
3. Run the API: `cd backend && npm ci && npm run dev` (port 5000). Run the parser in another terminal: `cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --port 8000`.
4. Run the UI: `cd frontend/job-portal && npm ci && npm run dev` (port 5173). If the API is elsewhere, set `VITE_API_URL` to its URL **including `/api`**, for example `https://example.com/api`.

Do not commit real credentials. A previous commit contained `backend/.env`; removing the file from the latest commit does not revoke those values. Rotate any real MongoDB, JWT, Cloudinary and SMTP secrets exposed in the repository history. History rewriting, if chosen, requires coordinating with all clones and does not replace rotation.

## API and behavior

| Route | Access | Result |
| --- | --- | --- |
| `POST /api/auth/register`, `/login` | Public, rate limited | User fields and JWT |
| `GET /api/auth/me` | Bearer JWT | Current user without password |
| `GET /api/jobs` | Public | Job array; optional `q` (title), `skill`, `location` filters |
| `GET /api/jobs/recommended` | Candidate | Jobs ranked by skill overlap |
| `POST /api/jobs` | Recruiter | Create a job |
| `POST /api/applications` | Candidate | Create an application; unique per candidate and job |
| `GET /api/applications/job/:jobId` | Job owner | Applicants for owned job |
| `PUT /api/applications/:id/status` | Application's recruiter | `Applied`, `Shortlisted`, or `Rejected` |
| `GET /api/chat/:userId` | Applicant or recruiter in same application | Conversation history |
| `POST /api/resume/upload` | Authenticated user | Cloudinary URL, profile, extraction availability |
| `POST /parse-resume` (FastAPI) | `X-Service-Token` | Parsed PDF fields |

This project currently has no server-side pagination, antivirus scan, DOCX parsing, asynchronous queue, or measured latency guarantee. Uploaded PDFs are stored in Cloudinary; decide separately how to protect access to these URLs for a real deployment. SMTP is used only for optional welcome mail.

## Verification

- `cd backend && npm ci && npm test` checks JWT/user behavior, cross-recruiter access, socket impersonation and application membership, and invalid upload rejection without using a live database.
- `cd frontend/job-portal && npm ci && npm run lint && npm run build`
- `pip install -r ai-service/requirements.txt pytest && PYTHONPATH=ai-service pytest -q ai-service/tests`
- GitHub Actions runs these checks on pushes and pull requests.

The backend socket/API tests stub persistence; they do not replace end-to-end checks against a MongoDB instance and actual Cloudinary credentials. Before creating the new unique application index on an existing database, resolve any duplicate `(jobId, candidateId)` records, or index creation will fail.

## Maintainer

[Pinak Chimurkar](https://github.com/splash0047)

No repository license has been selected yet.
