# Content Editor Guide

## The golden rule: everything is bilingual
Every public field has a Persian and an English value: `{ fa: '…', en: '…' }`. Never leave one empty on a published page. Persian is authored natively (not translated from English) and vice-versa — both must read as first-language copy.

## Where content lives
| Content | File |
| --- | --- |
| Company narrative, vision, mission, philosophy, differentiation, contact | `src/content/site.ts` |
| Values | `src/content/values.ts` |
| Capabilities | `src/content/capabilities.ts` |
| Services (FR™ / SVP™ / FRANCH™) | `src/content/services.ts` |
| Industries | `src/content/industries.ts` |
| Methodology & engagement | `src/content/methodology.ts` |
| Team | `src/content/team.ts` |
| Insights (articles/guides/reports) | `src/content/insights.ts` |
| Assessment questions & scoring copy | `src/content/assessment.ts` |
| Navigation labels | `src/content/navigation.ts` |
| Interface strings | `src/content/ui.ts` |
| Legal pages | `src/content/legal.ts` |

## Adding an insight (article/guide/report/case study)
Append to `insights` in `src/content/insights.ts`:
```ts
{
  slug: 'unique-slug',
  type: 'article',              // article | guide | report | case-study
  topic: { fa: 'رهبری', en: 'Leadership' },
  title: { fa: '…', en: '…' },
  summary: { fa: '…', en: '…' },
  body: [{ fa: '…', en: '…' }, /* one object per paragraph */],
  author: { fa: 'تیم ریتیل سلوشنز', en: 'Retail Solutions Team' },
  publishedAt: '2026-02-01',
  readingMinutes: 5,
  status: 'complete',           // complete | needs-review | missing
}
```
The topic filter, mega menu, sitemap, and related-content lists update automatically. **Do not publish a case study that implies a completed client project unless you have verified evidence.**

## SEO fields
Services and insights accept optional per-locale `seoTitle` / `seoDescription`. If omitted, the title/summary are used. Keep Persian and English SEO copy distinct — not literal translations.

## Claims checklist (before publishing)
- Outcomes phrased as *intended impacts*, never guarantees.
- No invented team qualifications, employers, experience, or awards.
- No temporary phone number.
- Industry challenges say "common challenges may include…".
- No Lorem Ipsum, no placeholder text on any public section.
