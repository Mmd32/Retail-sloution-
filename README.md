# Retail Solutions — Bilingual Corporate Website

**Building Enduring Retail Organizations** · ساختن سازمان‌های ماندگار در صنعت ریتیل

A production-ready, fully bilingual (Persian / English) corporate website for **Retail Solutions**, a specialized Iranian retail-transformation consultancy. Built with the institutional clarity, editorial discipline, and executive UX of major global consulting firms while remaining entirely original and clearly belonging to Retail Solutions.

> The design uses leading consulting websites only as a benchmark for **information architecture, credibility, and content presentation**. No third-party logo, brand color, copy, or asset is used, and no brand name appears anywhere on the public site.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS mapped to Design System v3.0 theme variables (light + dark) + CSS logical properties (RTL/LTR) |
| Motion | CSS-only, one hero entrance; reduced-motion respected (no JS animation library) |
| i18n | Locale-segmented routing `/[locale]`, shared bilingual content model |
| Validation | Zod (server) + native + React state (client) |
| Icons | lucide-react |
| Fonts | Inter (en) + IRANSansX→Vazirmatn (fa) via `next/font`, per-locale fluid type scale |
| Lead storage | Integration-abstraction layer with local JSON fallback |

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs in demo mode without it
npm run dev                  # http://localhost:3000  → redirects to /fa
```

```bash
npm run build && npm start   # production build (72 static pages, fa + en)
npm run typecheck            # tsc --noEmit
```

The site runs with **zero required configuration**: leads fall back to `./.data/leads.json`, analytics is a no-op, and the phone number stays hidden until you explicitly enable it.

## Routes

Persian lives at `/fa`, English at `/en`. Switching language **preserves the current page** (`/fa/solutions/svp` ⇄ `/en/solutions/svp`).

```
/[locale]                       Corporate landing page
/[locale]/about                 Vision, mission, philosophy, pillars, values
/[locale]/solutions             Retail Transformation overview
/[locale]/solutions/[slug]      FR™ · SVP™ · FRANCH™ (full service template)
/[locale]/capabilities          Six integrated capabilities
/[locale]/capabilities/[slug]   Capability detail
/[locale]/industries            Industry overview
/[locale]/industries/[slug]     Industry detail
/[locale]/methodology           Interactive 5-stage methodology
/[locale]/engagement            Client-facing cooperation model
/[locale]/insights              Insight archive (topic/type filters)
/[locale]/insights/[slug]       Article / guide / report
/[locale]/team                  Team (monogram placeholders, no stock)
/[locale]/contact               Contact + consultation lead form
/[locale]/assessment            Retail Growth Readiness Assessment
/[locale]/legal/[slug]          Privacy · Terms · Cookies
/sitemap.xml  /robots.txt       Localized SEO
/api/lead                       Server-side lead intake (Zod-validated)
```

## Project structure

```
src/
  app/
    [locale]/            All localized pages ([locale] layout is the root layout)
    api/lead/route.ts    Lead intake endpoint
    sitemap.ts robots.ts Localized SEO
    globals.css fonts.ts Design tokens & typography
  components/
    layout/    Header (mega menus), Footer, LanguageSwitcher, SearchDialog, MobileNav
    ui/        Button, Section, Accordion, Breadcrumbs, Monogram, Reveal, ArrowLink
    shared/    PageHero, MeetingCta
    home/ methodology/ insights/ assessment/ forms/
  content/     The bilingual content model (see docs/ARCHITECTURE.md)
  lib/         i18n helpers, search, seo, analytics, validation, lead storage
  i18n/        Locale config
docs/          Deployment, admin, editor, translation, checklist, architecture
```

## Key features

- **Fully bilingual & native** — not machine-translated. RTL layout, Persian typography, Persian digits/dates, logical mirroring. Directional icons flip; logos/charts/photos never do.
- **Structured mega menus** — Solutions (Retail Transformation + capabilities + more), Industries, Insights (topics + content types). Keyboard-accessible; empty categories are hidden.
- **Retail Growth Readiness Assessment** — 34 questions across 10 dimensions, 0–100 scoring, four maturity levels, progressive disclosure, preview-before-capture, preliminary service recommendation. Marked as a diagnostic, never a certification.
- **Lead generation** — server-validated forms, honeypot, integration abstraction (CRM / email / Sheets / Telegram webhooks), always-on local fallback. No hard-coded foreign SaaS dependency.
- **Bilingual SEO** — per-locale metadata, `hreflang` (`fa-IR`, `en`, `x-default`), localized canonicals, localized sitemap, Article structured data.
- **Accessibility** — skip link, semantic headings, labeled forms, visible focus, `aria-expanded` menus/accordions, reduced-motion support, `aria-live` form status.
- **Launch gates** — the temporary profile phone number is never published; the real number is required (or the phone intentionally disabled) before go-live.

## Content & CMS

All public content is authored in a **shared bilingual model** (`title.fa`/`title.en`, `body.fa`/`body.en`, …) under `src/content/`. This maps 1:1 onto a headless CMS: swap the typed data modules for CMS queries without touching the components. Design tokens live in `tailwind.config.ts` + `globals.css` as editable variables.

See **`docs/`** for the deployment guide, administrator guide, content-editor guide, translation workflow, pre-launch checklist, and full architecture reference (IA, component inventory, content model, form schema, assessment scoring model, API docs, security notes, QA report).

## Powered by NOVARK

The "Powered by NOVARK" relationship is **not hard-coded**. Toggle it via `NEXT_PUBLIC_SHOW_POWERED_BY_NOVARK=true|false`.
