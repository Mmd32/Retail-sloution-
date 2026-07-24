# Translation Workflow

The site is fully bilingual. Persian (`/fa`, RTL) is the default; English (`/en`, LTR) mirrors the same information hierarchy. Both versions must feel native — **never mechanically translate the interface**.

## Statuses (per content item)
- **Complete** — both languages authored, reviewed, publishable.
- **Needs review** — drafted but not language-approved.
- **Missing translation** — one language absent; **must not be published**.

Insight items carry a `status` field today (`complete | needs-review | missing`). When the CMS is connected, enforce this as a workflow gate on every content type, plus the publication workflow (`Draft → In Review → Approved → Published → Archived`) and the language-review workflow (`Persian approved` / `English approved` / `Translation incomplete`).

## Authoring principles
| Persian (fa) | English (en) |
| --- | --- |
| RTL layout, logical mirroring | LTR layout |
| Persian typography (Vazirmatn) | Inter |
| Persian punctuation & digits where contextual | Western digits |
| Persian/Jalali date formatting | English date formatting |
| Native Persian phrasing | Professional international consulting English |

- Keep the **same information hierarchy** across languages; do not add/remove sections in only one.
- Keep **separate** SEO fields and, where useful, separate slugs per language.
- Directional icons (arrows, chevrons) flip between fa/en. **Logos, charts, photographs, play buttons, and non-directional icons never flip.**
- Use CSS logical properties (`margin-inline`, `padding-inline`, `border-inline`, `inset-inline`) so a single style set serves both directions — never `transform: scaleX(-1)` on the whole interface.

## Switching languages
The language switcher swaps only the locale segment, preserving the current page (`/fa/solutions/svp` ⇄ `/en/solutions/svp`) — users are never dropped on the homepage. First-visit preference is remembered in `localStorage`; manual switching always wins and there is no forced redirect on every visit.

## Review checklist before marking "Complete"
- Persian reads natively (not translationese); English reads natively.
- Numbers/dates render correctly per locale.
- No untranslated fallback text visible.
- Metadata (title/description) localized and distinct.
- RTL layout visually correct (spacing, alignment, icon direction).
