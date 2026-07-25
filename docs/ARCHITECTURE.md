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

## 4. Design tokens — Design System v1.0

The site implements **Retail Solutions Brand & Digital Design System v1.0** (Approved baseline, 2026). Token names in `globals.css` mirror the system's own `--rs-*` names so the published token package can replace them without touching components. Do not add raw values in components — add a token (§13.4).

### Colour (§5)

| Token | Name | HEX | Use |
| --- | --- | --- | --- |
| `brand.cyan` | Retail Cyan | `#00B0F0` | Signal, fills, charts, active state, large display |
| `brand.navy` | Executive Navy | `#16213E` | Headings, dark surfaces, long-form text |
| `neutral.fog` | Retail Fog | `#F1F2F5` | Background, section separation |
| `action.primary` | Functional Blue | `#007DAA` | Links, focus, primary action, accessible emphasis |
| — | Capability Teal / Decision Amber / Human Coral / Insight Violet | `#18B6A4` `#F2B544` `#E85D75` `#5B5BD6` | Category distinction and analytical context only |
| — | Success / Warning / Error / Info | `#2D9D78` `#F2B544` `#D94A56` `#007DAA` | System feedback only |

Balance target 60 / 30 / 10 (light neutrals / navy / cyan + accents).

**Critical contrast rules (§5.5):** Cyan on white is 2.48:1 and *fails* for normal text — it is a fill/signal colour only. Interactive text on light surfaces uses Functional Blue. Buttons therefore use Functional Blue + white (4.65:1); the Cyan "accent" button pairs Cyan with Navy text (6.41:1).

> **One documented refinement:** eyebrows/labels are 14px and often sit on Fog, where Functional Blue reaches only 4.14:1 — under the 4.5:1 AA floor. `--rs-color-text-label` (`#00668C`, same hue, darker) is used for them: 6.4:1 on White, 5.7:1 on Fog. Body links keep the system's `#007DAA`.

### Typography (§6)

Faces: **Inter** (Latin) and **IRANSansX → Vazirmatn** (Persian). IRANSansX is licensed and not redistributed here; it is listed first in the CSS stack, so self-hosting it later requires no code change.

Scale (desktop → mobile, expressed as `clamp()`): Display 64→40, H1 48→36, H2 36→28, H3 24→22, Body 18→16, Label 14. Minimum body 16px, line-height 1.5–1.7, reading column 45–75 characters (`.reading`).

**Persian runs on its own ramp** — Persian glyphs read larger than Latin at an identical size, so each display step is scaled down and given more leading, with tracking always `0`. Two implementation details:

1. Selectors use `html[lang^='fa']`, **not** `html[lang='fa']`. The document renders `lang="fa-IR"`, so an exact match silently never fires — which previously meant Vazirmatn and the whole Persian treatment were inert.
2. The Persian ramp is deliberately **unlayered**. Tailwind font-size classes live in `@layer utilities`, which outranks `@layer base` regardless of specificity; unlayered declarations beat every layer.

Long-form text is never centred in either language (§6.4).

### Layout, radius, elevation, motion

- Container **1200px**; margins 48 / 32 / 20 (desktop / tablet / mobile); 12-8-4 column grid (§7.1–7.2).
- Spacing on a 4px scale: 4, 8, 12, 16, 24, 32, 48, 64 (§7.4). Section rhythm derives from it via `.section-y` / `.stack-header`.
- Radius: control 8 · button 12 · card 16 · feature 24 · full 999 (§8.1).
- Elevation: card / popover / modal shadows exactly as §8.2. Shadow is never decoration.
- Motion: micro 100ms · standard 180ms · emphasis 240ms · narrative 320ms, with the system's two easing curves (§17). Motion is spent in one place — a single hero entrance. There is no JS animation library; `framer-motion` was removed, cutting homepage first-load from ~133 kB to ~96 kB. Scroll-triggered reveals were removed because they started at `opacity: 0` and read as missing content on fast scroll. `prefers-reduced-motion` disables the entrance.

### Logo (§4)

`components/layout/Logo.tsx` exposes `LogoMark` (full lockup) and `LogoGlyph` (mark-only), with the approved variants `primary` / `reverse` / `brandField`.

> ⚠ **Handoff items.**
> 1. The mark is a faithful **reproduction**, built so every colour variant renders and scales. The system requires production from the vector master (§4.6) — drop in `public/brand/retail-solutions.svg` and swap the component internals; the variant API can stay.
> 2. The supplied lockup is stacked (≈1.2:1). At the §4.5 minimum of **120px wide** it is ~98px tall, which does not fit a conventional header bar. The header currently renders it at 56px tall (~68px wide), below that minimum. Resolve by obtaining a **horizontal lockup** from the brand owner, or by accepting a taller header.

### Imagery (§10)

`MediaSlot` renders a real `<img>` when given a `src` and otherwise draws a navy system panel — an intentional element, never a broken box and never generic stock. Photography supplied later drops in through this component.

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
