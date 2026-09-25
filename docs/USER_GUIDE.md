# User guide

## Candidate

1. Register with the **candidate** role and sign in.
2. Open **Profile** and upload a PDF resume (up to 5 MB). The application saves it to Cloudinary. If the parser is available, it also adds recognized skills to your profile. Resume parsing uses a fixed skill dictionary and may miss some skills.
3. Browse **Find Jobs**. The search boxes filter the loaded job list by title/company and location. Open a job to apply; one application per candidate and job is allowed.
4. Open **My Applications** to see `Applied`, `Shortlisted`, or `Rejected` and chat with the recruiter for an application.

## Recruiter

1. Register with the **recruiter** role and sign in.
2. Post jobs from the recruiter dashboard and open **Applications** to see applicants for each of your jobs.
3. Shortlist or reject applicants. Use **Chat** to message candidates who applied to your jobs.

The company profile screen contains sample local form fields; it is not a saved company account profile. The backend rejects invalid or expired sessions. For a production rollout, protect stored resume URLs and verify upload scanning separately.
