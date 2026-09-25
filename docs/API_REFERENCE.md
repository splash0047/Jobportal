# API reference

Base URL: `http://localhost:5000/api`. Send `Authorization: Bearer <JWT>` on protected routes. Errors are JSON objects with a `message` string. The API and schema files are the authoritative source for field definitions.

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | `name`, `email`, `password` (8–128 characters), `role` (`candidate` or `recruiter`); rate limited |
| POST | `/auth/login` | Public | `email`, `password`; returns `_id`, `name`, `email`, `role`, `token`; rate limited |
| GET | `/auth/me` | JWT | Returns current user without password |
| PATCH | `/auth/me` | JWT | Candidate `bio`, or recruiter `name`, `website`, `description`, `location` |
| GET | `/jobs` | Public | Array of jobs; optional `q` (title), `location`, `skill` filters |
| GET | `/jobs/:id` | Public | One job |
| GET | `/jobs/recommended` | Candidate | Ranked by case-insensitive skill overlap |
| GET | `/jobs/myjobs` | Recruiter | Jobs created by this recruiter |
| GET | `/jobs/stats` | Recruiter | Live counts of jobs, applicants and shortlisted applicants |
| GET | `/jobs/saved` | Candidate | Saved job list |
| PUT/DELETE | `/jobs/:id/save` | Candidate | Save/remove a job |
| POST | `/jobs` | Recruiter | `title`, `description`, `location`, nonempty `skillsRequired`; optional `salary`, `type` |
| DELETE | `/jobs/:id` | Job owner | Removes the job |
| POST | `/applications` | Candidate | `jobId`; uses the candidate's stored resume URL; duplicate `(jobId, candidateId)` rejected |
| GET | `/applications/my` | Candidate | Applications and recruiter name |
| GET | `/applications/job/:jobId` | Job owner | Candidate details for this recruiter's job |
| PUT | `/applications/:id/status` | Application's recruiter | `status`: `Applied`, `Shortlisted`, `Rejected` |
| GET | `/chat/:userId` | Applicant or recruiter | Conversation history, requires shared application |
| PUT | `/chat/read/:userId` | Applicant or recruiter | Marks messages as read |
| POST | `/resume/upload` | JWT | Multipart `resume` PDF up to 5 MB; returns `resumeURL`, `profile`, `parsingAvailable` |

`GET /health` is served at the Express root (outside `/api`). The upload stores the PDF in Cloudinary before parsing; when parsing fails, `fileParams` is `null` and `parsingAvailable` is `false`.

## Socket.io

Connect to the Express origin with `auth: { token: JWT }`. The server verifies it and joins only the authenticated user's room. Emit `send_message` with `{ receiverId, message }`; the server derives `senderId`. Recipient and sender must have a shared application. Receive `receive_message` with the saved message. The optional acknowledgment is `{ ok: true }` or `{ error: string }`.

## PDF extraction service

The backend calls `POST /parse-resume` with multipart field `file` and header `X-Service-Token: <AI_SERVICE_TOKEN>`. The same service token must be configured on both services. The service rejects unauthenticated, oversized or non-PDF uploads and deletes its temporary file after parsing. `GET /health` is public. Restrict network access to the service in deployment.
