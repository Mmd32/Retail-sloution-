# Administrator Guide

This site currently stores public content as **typed bilingual modules** in `src/content/` (CMS-ready — see `docs/ARCHITECTURE.md §5`). Until a headless CMS is connected, administration is done by editing those modules and the environment. This guide covers the operational controls an administrator owns.

## Launch gates (must be resolved before go-live)

1. **Official phone number.** The profile's number (`+98 21 0000 0000`) is temporary and is **never published**. To show a phone, set both:
   ```
   NEXT_PUBLIC_OFFICIAL_PHONE=+98 21 xxxx xxxx
   NEXT_PUBLIC_PHONE_ENABLED=true
   ```
   Otherwise the footer/contact page show a "number available after confirmation" note instead of a fake number.

2. **Team names & portraits.** English spellings in `src/content/team.ts` must be confirmed. Portraits are optional and default to an initials **monogram** — never a stock portrait. Add a real high-resolution portrait by setting `portrait: '/team/name.jpg'` (place the file in `public/team/`).

3. **Powered by NOVARK.** Toggle with `NEXT_PUBLIC_SHOW_POWERED_BY_NOVARK=true|false`. Not hard-coded.

## Integrations

Configure any subset in the environment (`.env.local`); each is independent and optional:
- **Analytics:** `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `plausible` \| `matomo` \| `ga` \| `local`.
- **Lead channels:** `TELEGRAM_BOT_TOKEN`+`TELEGRAM_CHAT_ID`, `CRM_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_URL`, email via `SMTP_URL`.
- Leads always also land in `./.data/leads.json`.

## Empty-menu policy
Insight topics/types only appear once at least one approved item exists (`getActiveTopics()`). Do not create public menu items with no content behind them.

## Claims policy (do not violate)
- Present service outcomes as **intended impacts / objectives**, never guaranteed numbers.
- SVP™ improves decision quality and reduces avoidable risk — it does **not** guarantee store success.
- FRANCH™ "improved franchisee performance" is an intended impact, not a financial guarantee.
- Industry challenges use "common challenges may include…"; never claim a completed project without verified evidence.
- The assessment is a preliminary diagnostic, not a certification.

## Editing content today
Edit the module in `src/content/` (each field is `{ fa, en }`), then redeploy. When the CMS is connected, replace the module's export with a CMS query returning the same shape — components need no changes.
