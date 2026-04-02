# NurtureCal Website

Vercel-ready NurtureCal marketing site with:
- public landing page
- waitlist form stored in Supabase and emailed with Resend
- questionnaire route kept for internal kickoff use

## Run locally

1. Copy `.env.local.example` to `.env.local`
2. Add the real `RESEND_API_KEY`
3. Add the real Supabase server credentials
4. Install dependencies
5. Start the dev server

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
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

## Notes

- The landing-page waitlist stores each signup in `public.waitlist_signups` and also sends email notifications.
- The internal questionnaire still emails submissions only.
- Draft answers are saved in the browser on the client side.

## Supabase table setup

Run the SQL in `supabase/waitlist_signups.sql` against the target Supabase project before the first live submission.
