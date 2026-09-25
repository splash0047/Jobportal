# JobPortal web client

React/Vite client for the candidate and recruiter workflows. Read the [repository README](../../README.md) for setup, architecture, required services, security boundaries and deployment checks.

From this directory, run `npm ci`, then `npm run dev` for local development. `npm run lint` checks the source and `npm run build` produces `dist/`. Set `VITE_API_URL` to the Express API base URL including `/api` when the backend is not at `http://localhost:5000/api`. The value is embedded at build time.
