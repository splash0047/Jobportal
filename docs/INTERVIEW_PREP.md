# Job Portal interview preparation

Use these answers only for parts you personally implemented. Point an interviewer to the relevant code and explain what you changed yourself. The current behavior is described in the root README and API reference.

## Explain the project in one minute

“WorkFlow AI is a React, Express and MongoDB job portal with candidate and recruiter workflows. Candidates can upload a PDF resume, apply and track applications. Recruiters post jobs and review applicants. A separate FastAPI service extracts PDF text and detects contact details and known skills with regex and a fixed dictionary. Socket.io supports messages between candidates and recruiters linked by an application. The matching score is the fraction of required job skills found in the candidate's profile, not an ML prediction.”

## Likely questions

**Why split Express and FastAPI?** Python's PDFMiner was convenient for PDF text extraction; Express handles the main API and sockets. The cost is an extra service hop and deployment configuration. The current upload request waits for extraction up to 12 seconds, so a queue would be suitable for larger workloads.

**How are passwords stored?** The Mongoose `User` save hook hashes changed passwords with bcrypt. Login compares the submitted password against the hash. Explain the password save hook and why it must return early if a password was not modified.

**What happens after a refresh?** The browser keeps the JWT in localStorage and calls `/api/auth/me` to hydrate the account before checking protected roles. The trade-off is that JavaScript-accessible storage is exposed to XSS; an HttpOnly cookie design would change CSRF and session handling requirements.

**Can one recruiter inspect another recruiter's applicants?** The route checks `Job.findOne({ _id: jobId, recruiterId: req.user._id })` before querying applications. Updating status also compares the stored recruiter ID with the authenticated user.

**Can a socket claim somebody else's ID?** No. The server verifies the JWT during the handshake, joins the room for the authenticated ID, and derives `senderId` from the socket user. It also checks that sender and recipient are linked by an application before saving or emitting.

**Can two concurrent requests create duplicate applications?** The pre-insert check provides a friendly error, while a unique MongoDB index on `(jobId, candidateId)` closes the race. MongoDB returns duplicate key error `11000`, translated to HTTP 409. Existing duplicates must be resolved before that index can build on an existing database.

**How does job matching work?** Each required skill is compared case-insensitively with profile skills. The percentage is matches divided by the number of required skills. It is exact overlap and cannot infer synonymous skills or experience quality.

**Is the parser an AI model?** No. PDFMiner extracts text, regular expressions find email/phone, and a fixed skill dictionary finds known terms. The service boundary can support richer methods later, but the current ranking and parsing are deterministic.

**What if the parser fails?** The backend stores the PDF in Cloudinary first. It then calls the parser with a timeout and shared service token. If extraction fails, the API responds with the stored resume URL, `fileParams: null` and `parsingAvailable: false`. A Cloudinary failure still fails the upload.

**How are uploads protected?** Multer and FastAPI cap PDFs at 5 MB and check MIME/extension plus the `%PDF-` signature. The parser uses a generated temporary filename and deletes it after processing. This is not antivirus scanning; deployment needs an appropriate file scanning and private access strategy if sensitive resumes are stored.

**What tests prove the security boundary?** The Node integration test exercises missing users, recruiter ownership, role rejection, duplicate response, socket authentication, forged sender IDs, unauthorized recipients, and upload type rejection. The Python tests check token and PDF rejection and temporary file cleanup. These stub persistence; they do not prove live MongoDB or Cloudinary behavior.

**What would you improve next?** Add database-backed integration tests, resume access control and malware scanning, structured logging, a background parsing queue, pagination, and deployment health/readiness checks. Prioritize based on actual usage and measured bottlenecks.
