# Architecture

The React/Vite app uses Redux Toolkit and Axios to call the Express API. Express uses MongoDB/Mongoose for users, jobs, applications and messages; Cloudinary stores uploaded PDF resumes. Socket.io runs on the same HTTP server as Express. A separate FastAPI service extracts text from PDFs with PDFMiner and finds contact details and skills using regular expressions and a fixed dictionary.

## Trust boundaries

- HTTP routes verify the JWT through `protect`, then apply role and resource checks. The applications list requires the authenticated recruiter to own the job.
- Socket.io verifies the JWT at connection, joins the authenticated user's ID room, checks that an application links sender and recipient, and takes `senderId` from the verified user rather than the event payload.
- The FastAPI endpoint requires `AI_SERVICE_TOKEN`. Both services must use the same token; the service should not be publicly reachable in production. CORS for Express and Socket.io is controlled by `CLIENT_ORIGIN`.
- Uploads are PDF only, limited to 5 MB at both services. FastAPI uses a generated temporary path and deletes it in `finally`. Express deletes its local upload in `finally`.

## Request flows

1. **Login:** Express checks a bcrypt password and returns a signed JWT. On page refresh, the frontend calls `/api/auth/me` before evaluating protected routes.
2. **Apply:** Express verifies the candidate and job, calculates simple skill overlap, and saves an application. A unique MongoDB index on `(jobId, candidateId)` protects against concurrent duplicates.
3. **Resume:** Express saves the PDF to Cloudinary, then calls FastAPI with a 12-second timeout. If extraction succeeds, profile skills are merged. If extraction is unavailable, the saved resume URL is returned with `parsingAvailable: false`.
4. **Chat:** The socket gateway verifies identity and application membership before persisting or emitting a message. HTTP chat history applies the same application membership rule.

## Limits

Recommendations load all jobs and calculate skill overlap in Node. Job listing responses are arrays and currently have no server-side pagination. Resumes are stored through Cloudinary URLs without application-level access controls or antivirus scanning. Credentials were present in an earlier commit and must be rotated if genuine; removing current tracking does not remove history. The tests use stubbed persistence and do not measure throughput or production latency.
