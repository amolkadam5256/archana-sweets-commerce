# NextJS Tracking Skill

Use for Next.js App Router tracking.

Rules:

- Mount GTM and pixels once.
- Send one SPA `page_view` per route change.
- Avoid duplicate History Change and code page views.
- Keep server routes responsible for server-side conversion events.

