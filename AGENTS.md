# Project implementation notes

- Resolve Lovable CDN asset pointers against the published project origin in localhost previews, since Vite's development fallback does not proxy CDN asset paths.- Registration email is sent by the Vercel serverless function `api/send-registration-email.ts` (token in Vercel env `SENDER_API_TOKEN`); the client fetches `/api/...`. Why: the user requires no dependency on Lovable Cloud.
