# Deployment Guide

## Requirements
- Node.js 18.17+ (tested on Node 22)
- A host that runs Next.js 14 (App Router) — Vercel, a Node server, or a container.

## Build & run
```bash
npm install
npm run build
npm start           # serves on PORT (default 3000)
```
The `/api/lead` route needs the **Node.js runtime** (it writes a local file and calls webhooks). This works on a Node server or a container. On serverless hosts with an ephemeral filesystem, configure a real integration (CRM/Sheets/Telegram webhook or a database) so leads are not lost — see below.

## Environment variables
Copy `.env.example` → `.env.local` (or set in your host). All are optional except the launch gates.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |
| `NEXT_PUBLIC_OFFICIAL_PHONE` | **Launch gate** — real phone; leave empty to hide |
| `NEXT_PUBLIC_PHONE_ENABLED` | `true` to show the phone (requires the number) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email (default `info@retailsolutions.ir`) |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn company URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional WhatsApp |
| `NEXT_PUBLIC_SHOW_POWERED_BY_NOVARK` | `true`/`false` toggle |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | `plausible` \| `matomo` \| `ga` \| `local` \| empty |
| `LEAD_NOTIFY_EMAIL_TO` / `SMTP_URL` | Email notification (wire in `lib/leads.ts`) |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Telegram lead notification |
| `GOOGLE_SHEETS_WEBHOOK_URL` / `CRM_WEBHOOK_URL` | Webhook fan-out |

> **Iran accessibility:** the lead layer avoids hard-coded foreign SaaS. Prefer a self-hosted analytics option (Matomo/Plausible/local) and webhook/Telegram/local-DB lead channels. Everything degrades gracefully when a channel is unreachable.

## Lead storage in production
`lib/leads.ts` always writes `./.data/leads.json` and fans out to any configured webhook. For durable storage:
1. Point `CRM_WEBHOOK_URL` / `GOOGLE_SHEETS_WEBHOOK_URL` at your endpoint, **or**
2. Replace `saveLocal()` with a PostgreSQL insert (schema in `docs/DATABASE.md`) using `LEAD_DATABASE_URL`.

## Post-deploy checks
- `/sitemap.xml` and `/robots.txt` resolve with your real `NEXT_PUBLIC_SITE_URL`.
- `/fa` and `/en` render with correct `dir`.
- Submit a test lead; confirm it lands in your configured channel.
- Run Lighthouse (targets: Perf 90+, A11y 95+, BP 95+, SEO 95+).
