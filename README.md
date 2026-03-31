# NurtureCal Website

Vercel-ready NurtureCal marketing site with:
- public landing page
- waitlist form powered by Resend
- questionnaire route kept for internal kickoff use

## Run locally

1. Copy `.env.local.example` to `.env.local`
2. Add the real `RESEND_API_KEY`
3. Install dependencies
4. Start the dev server

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Log in with `vercel login`
2. Link this folder to the existing `copeland` Vercel project
3. Add these environment variables in Vercel:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CHECKLIST_TO_EMAIL`
4. Deploy

## Notes

- The landing-page waitlist and the internal questionnaire both email submissions.
- It does not need Supabase unless you later want stored submissions, edit history, or a dashboard.
- Draft answers are saved in the browser on the client side.
