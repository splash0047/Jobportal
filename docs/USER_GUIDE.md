# User guide

## Candidate

1. Register with the **candidate** role and sign in.
2. Open **Profile** and upload a PDF resume (up to 5 MB). New uploads are saved as authenticated Cloudinary assets; **View Uploaded Resume** requests a short-lived link. If the parser is available, it adds recognized skills to your profile. Resume parsing uses a fixed skill dictionary and may miss skills. If you uploaded a resume before the private-storage update, reupload it to apply.
3. Browse **Find Jobs**. The search boxes filter the loaded job list by title/company/skill and location; the job type filter narrows it further. Save jobs using the bookmark button, then open **Saved Jobs** to see them. Open a job to apply; one application per candidate and job is allowed.
4. Open **My Applications** to see `Applied`, `Shortlisted`, or `Rejected` and chat with the recruiter for an application.

## Recruiter

1. Register with the **recruiter** role and sign in.
2. Save the company name and other details in **Company Profile**, post jobs from the recruiter dashboard, and open **Applications** to see applicants for each of your jobs.
3. Open a candidate resume from their application, shortlist or reject applicants, and use **Chat** to message candidates who applied to your jobs. Only applications for your jobs grant resume access.

The backend rejects invalid or expired sessions. Production resume uploads require a configured ClamAV scanner; contact the operator if an upload reports scanning unavailable. Existing public Cloudinary resumes require migration or deletion by the operator.
