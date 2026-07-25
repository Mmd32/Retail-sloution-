# Pre-Launch Checklist

Work top to bottom. Do not launch with any **Gate** item unresolved.

## Content integrity
- [x] All approved profile content represented accurately (company narrative, problem, philosophy, vision, mission, values, differentiation, capabilities, FR™/SVP™/FRANCH™, methodology, engagement, industries, team, contact).
- [x] No unsupported company claims invented.
- [x] No Lorem Ipsum; no unfinished placeholder in any public section.
- [x] No third-party (e.g. Deloitte) branding, colors, copy, name, or assets used anywhere. Final site is visually original.
- [ ] **Gate:** Team English name spellings confirmed (`src/content/team.ts`).

## Launch gates (environment)
- [ ] **Gate:** Real official phone set (`NEXT_PUBLIC_OFFICIAL_PHONE` + `NEXT_PUBLIC_PHONE_ENABLED=true`) **or** phone intentionally disabled. Temporary `+98 21 0000 0000` never published. *(Enforced in code; verify env.)*
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain.
- [ ] `NEXT_PUBLIC_SHOW_POWERED_BY_NOVARK` set intentionally.
- [ ] At least one durable lead channel configured (webhook/DB) if hosting is serverless.

## Bilingual & i18n
- [x] `/fa` and `/en` routes work.
- [x] Language switching preserves the current page.
- [x] Persian RTL correct; English LTR correct.
- [x] Forms work in both languages with localized validation.
- [x] Metadata localized; `hreflang` (`fa-IR`, `en`, `x-default`) correct; canonical localized.
- [x] Sitemap includes both languages.

## Functionality
- [x] Assessment scoring, preview, and recommendation work.
- [x] Mega menus keyboard-accessible; empty categories hidden.
- [x] Mobile navigation accessible.
- [x] Search works (Persian normalization for ی/ک variants).
- [ ] Submit a live test lead end-to-end into the configured channel.

## Quality gates
- [x] `npm run build` passes (72 pages).
- [x] `npm run typecheck` passes.
- [ ] Lighthouse on deployed URL — Perf 90+, A11y 95+, Best Practices 95+, SEO 95+.
- [ ] Automated tests added and green (see `docs/ARCHITECTURE.md §11`).
- [ ] Manual a11y pass: keyboard-only navigation, screen-reader language switch, focus visibility, reduced-motion.

## Brand / Design System v1.0
- [x] Colours, typography, spacing, radius, elevation and motion mapped to the approved system tokens.
- [x] Cyan never used for small text on light surfaces; Functional Blue used for interactive text (§5.5/§5.6).
- [x] Long-form text not centred in either language (§6.4).
- [ ] **Gate:** replace the reproduced logo with the **vector master** SVG (§4.6).
- [ ] **Gate:** obtain a **horizontal logo lockup** — the stacked lockup cannot meet the 120px-wide minimum (§4.5) in a standard header; it currently renders ~68px wide.
- [ ] Self-host **IRANSansX** if licensed (already first in the CSS stack; Vazirmatn is the approved fallback).
- [ ] Release checklist §21.6 signed off (brand name/logo, colour pairing, tokens, responsive, RTL+LTR, keyboard/focus, contrast, 200% zoom, empty/loading/error/success states).

## Legal
- [ ] Privacy / Terms / Cookies reviewed by counsel (baseline provided in `src/content/legal.ts`).
