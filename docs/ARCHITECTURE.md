# Architecture Reference

This document consolidates the information architecture, component inventory, content model, form schema, assessment scoring model, API documentation, security notes, and QA report.

---

## 1. Information architecture & sitemap

```
Home /[locale]
├─ About              vision · mission · philosophy · strategic pillars · values
├─ Solutions          Retail Transformation (solution architecture)
│  ├─ FR™   Retail Friction & Reward
│  ├─ SVP™  Store Validation Process
│  └─ FRANCH™ Franchise Development & Governance
├─ Capabilities       Strategy · Operations · People · Expansion · Store Development · Analytics
├─ Industries         Fashion · F&B · Beauty · Homeware · FMCG · Electronics
├─ Methodology        Discover · Diagnose · Design · Deploy · Develop  (internal)
├─ Engagement         Discovery · Assessment · Proposal · Execution · Optimization  (client-facing)
├─ Insights           Articles · Guides · Reports · Case Studies (by topic)
├─ Team               4 members (editable, monogram placeholders)
├─ Assessment         Retail Growth Readiness Assessment
├─ Contact            consultation lead form
└─ Legal              Privacy · Terms · Cookies
```

**Two distinct process diagrams** are intentionally kept separate:
- **Methodology** — how Retail Solutions *solves* the problem (internal, 5 phases with decision gates).
- **Engagement model** — how a *client* begins and continues the relationship (5 stages).

## 2. Page-template system

| Template | Route | Sections |
| --- | --- | --- |
| Corporate landing | `/[locale]` | hero → problem → shift → philosophy → solutions → capabilities → differentiation → methodology → industries → assessment → insights → team → CTA |
| Service overview | `/solutions` | hero, structured solutions, underlying capabilities |
| Individual service | `/solutions/[slug]` | breadcrumbs, eyebrow, title, executive summary, challenge, suitability, diagnostic questions, approach, deliverables, intended impact (+claim note), related capabilities, relevant industries, contact person, downloadable resource, FAQ, related insights, lead CTA |
| Capability | `/capabilities/[slug]` | overview, related solutions, related industries |
| Industry | `/industries/[slug]` | overview, common challenges, relevant solutions, relevant capabilities, contact CTA, related insights |
| Methodology | `/methodology` | interactive phase explorer (objective, activities, participation, outputs, gate, next phase) |
| Insight archive | `/insights` | topic + content-type filters |
| Article | `/insights/[slug]` | type, topic, author, date, reading time, body, related, CTA, Article JSON-LD |
| Team profile | `/team` | grid, monogram/portrait, CMS note |
| Contact | `/contact` | consultation form + contact channels |
| Assessment (campaign) | `/assessment` | multi-step diagnostic flow |

## 3. Component inventory

**Layout** — `Header` (utility bar + primary nav + 3 mega menus), `Footer` (final-statement band + 6-column + legal bar), `LanguageSwitcher`, `SearchDialog`, `MobileNav`, `SkipLink`, `LocaleMemory`, `Logo`.
**UI** — `Button`/`ButtonLink`, `Section`/`SectionHeader`/`Eyebrow`, `Accordion` (FAQ), `Breadcrumbs`, `Monogram`, `Reveal`, `ArrowLink`.
**Shared** — `PageHero`, `MeetingCta`.
**Feature** — `home/HeroVisual`, `methodology/MethodologyExplorer`, `insights/InsightArchive`, `assessment/AssessmentFlow`, `forms/LeadForm`.

## 4. Design tokens

Defined in `tailwind.config.ts` and mirrored as CSS variables in `globals.css`.

| Role | Token | Value |
| --- | --- | --- |
| Primary dark | `navy` | `#0B1F3A` |
| Primary accent | `accent` | `#0AA2DE` (controlled cyan-blue) |
| Background | `surface` | `#FFFFFF` |
| Secondary background | `surface.muted` | `#F4F6F9` |
| Text | `ink` | `#0A1526` |
| Muted text | `ink.muted` | `#5B6B7F` |
| Borders | `line` | `#E3E8EF` |

Corner radii are restrained (`3–10px`); shadows are used sparingly (`card`, `lift`). The accent is used deliberately, not everywhere.

> **Before launch**, extract the exact dominant brand HEX values from the approved source assets and update these tokens. The current values are the documented provisional roles.

## 5. Content model

Every public field is `{ fa, en }` (`Localized`). Types live in `src/content/types.ts`.

Content types implemented as typed modules (CMS-ready): **Service, Capability, Industry, Methodology phase, Engagement stage, Value, Team member, Insight, Legal page, Navigation, Site settings, Contact information, Assessment dimension/question/recommendation.**

CMS localized fields per the spec: `title.fa/.en`, `description.fa/.en`, `body.fa/.en`, `seoTitle.fa/.en`, `seoDescription.fa/.en`, `ctaLabel.fa/.en`, `slug.fa/.en`, `altText.fa/.en`.

Workflows (to enforce in the CMS): publication (`Draft → In Review → Approved → Published → Archived`) and language review (`Persian approved` / `English approved` / `Translation incomplete`). Insight items carry a `status: complete | needs-review | missing` field today.

## 6. Form schema

`src/lib/validation.ts` — `leadSchema` (Zod):

| Field | Rule |
| --- | --- |
| `type` | consultation \| service-inquiry \| assessment \| profile-download \| resource-download \| contact \| proposal |
| `locale` | fa \| en |
| `fullName` | required, 2–120 |
| `company` | required |
| `mobile` | required, phone pattern |
| `email` | required, email |
| `jobTitle`, `industry`, `branches`, `city`, `primaryChallenge`, `preferredContactMethod`, `preferredContactTime` | optional |
| `serviceSlug`, `assessmentScore`, `assessmentLevel` | optional context |
| `consent` | must be `true` |
| `website_hp` | honeypot — must be empty |

Errors are returned as **message keys** (`required`, `invalidEmail`, `invalidPhone`, `consentRequired`) and localized on the client.

## 7. Assessment scoring model

- **Dimensions:** 10 · **Questions:** 34 (3–5 per dimension) · **Answer scale:** 0–4.
- **Dimension score** = `round(sum(answers) / (questions × 4) × 100)` → 0–100.
- **Overall** = mean of dimension scores.
- **Maturity levels:** 0–24 Person-Dependent · 25–49 Developing · 50–74 Structured · 75–100 Scalable.
- **Recommendation (preliminary):** broad weakness (avg < 45 or ≥ 6 weak dimensions) → Integrated engagement; else the weakest of CX / expansion / franchise readiness maps to FR™ / SVP™ / FRANCH™.
- **Disclaimer** shown at every stage; never presented as a certification. Value is shown *before* contact capture (preview), full breakdown *after*.

## 8. API documentation

### `POST /api/lead`
Server-side (Node runtime). Accepts JSON matching `leadSchema`.

- **200** `{ ok: true, id }` — persisted.
- **422** `{ ok: false, fieldErrors }` — validation failed (keys → localized on client).
- **400** `{ ok: false, error: "invalid_json" }`.
- **500** `{ ok: false, error: "server_error" }`.

Persistence (`src/lib/leads.ts`): always writes to `./.data/leads.json` (source of truth), then best-effort fan-out to Telegram / CRM webhook / Google Sheets webhook if configured. Any unreachable channel cannot fail the submission.

## 9. Security notes

- All lead input is **server-validated** with Zod before storage; nothing trusts the client.
- **Honeypot** (`website_hp`) silently drops obvious bots.
- **No PII to analytics** — `lib/analytics.ts` strips name/email/phone/company keys before sending.
- **No secrets client-side** — integration credentials are server-only env vars.
- `poweredByHeader` disabled; API disallowed in `robots.txt`.
- External links use `rel="noopener noreferrer"`.
- No third-party brand assets, names, or copy are used anywhere (originality requirement).
- **Rate limiting / CAPTCHA**: add at the edge/CDN or via a provider before high-traffic launch (documented gap — the honeypot is the baseline).

## 10. QA report

| Area | Status |
| --- | --- |
| `npm run build` | ✅ 72 static pages (fa + en), no warnings |
| `npm run typecheck` | ✅ clean (strict) |
| RTL (`/fa`) `<html lang="fa-IR" dir="rtl">` | ✅ verified |
| LTR (`/en`) `<html lang="en" dir="ltr">` | ✅ verified |
| Language switch preserves page | ✅ path-preserving swap |
| hreflang `fa-IR` / `en` / `x-default` + canonical | ✅ verified in served HTML |
| Root `/` → `/fa` redirect | ✅ 307 |
| Assessment scoring / preview / recommendation | ✅ functional |
| Forms both languages + validation | ✅ localized errors |
| No Lorem Ipsum / placeholder public content | ✅ |
| Temporary phone number published | ✅ never (gated) |
| Deloitte (or any third-party) branding/copy | ✅ none used |

**Recommended before production:** run Lighthouse on the deployed URL (targets: Perf 90+, A11y 95+, Best Practices 95+, SEO 95+), add automated tests (see below), and complete the pre-launch checklist.

## 11. Test suite (recommended setup)

The codebase is structured for testing; add and wire these before launch:
- **Unit** (Vitest): `lib/utils` (normalizeFa, formatNumber/Date), `content/assessment` (computeScores, recommendService), `lib/search` (runSearch), `lib/validation` (leadSchema).
- **Component** (Testing Library): `LeadForm` validation, `AssessmentFlow` progression, `Accordion` a11y.
- **E2E** (Playwright — pre-installed in this environment): language switch preserves page, assessment happy path, lead submission, mega-menu keyboard nav.
