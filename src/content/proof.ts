import type { Localized } from './types';

/**
 * Trust layer (§4).
 *
 * ── Why this file has no numbers ──────────────────────────────────────────
 * A credibility strip is only credible if its figures are true. No verified
 * counts (projects, branches, industries, years, client logos) were supplied
 * with this project, so none are asserted here. Instead:
 *
 *   - `metrics` ships the *slots* with their labels and `value: null`.
 *   - The UI renders a slot with `value: null` as a visible placeholder and
 *     shows a sample notice, rather than printing a plausible-looking number.
 *   - `clientLogos` is empty. A logo wall with invented marks would be a
 *     false claim of clientele, so the component hides itself when empty.
 *
 * To go live: fill in `value` for each metric that has been verified, set
 * `verified: true`, and add real logo files under /public/clients.
 */

export interface ProofMetric {
  key: string;
  label: Localized;
  /** Verified figure, e.g. "24". Null renders as an unfilled slot. */
  value: string | null;
  /** Optional qualifier, e.g. "since 2019". */
  note?: Localized;
}

export const proofMetrics: ProofMetric[] = [
  {
    key: 'engagements',
    label: { fa: 'پروژه اجراشده', en: 'Engagements delivered' },
    value: null,
  },
  {
    key: 'branches',
    label: { fa: 'شعبه بررسی یا استانداردشده', en: 'Branches assessed or standardized' },
    value: null,
  },
  {
    key: 'industries',
    label: { fa: 'صنعت تحت پوشش', en: 'Industries covered' },
    value: null,
  },
  {
    key: 'experience',
    label: { fa: 'سال تجربه تیم', en: 'Years of combined team experience' },
    value: null,
  },
];

export interface ClientLogo {
  name: string;
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
}

/** Empty by design — see the note at the top of this file. */
export const clientLogos: ClientLogo[] = [];

export const proofMeta = {
  eyebrow: { fa: 'اعتبار', en: 'Credibility' } as Localized,
  clientsLabel: {
    fa: 'برندهایی که با آن‌ها کار کرده‌ایم',
    en: 'Brands we have worked with',
  } as Localized,
  sampleNotice: {
    fa: 'این آمار هنوز تکمیل نشده است. جایگاه هر عدد طراحی شده و پس از تأیید داده واقعی جایگزین می‌شود — تا آن زمان هیچ عددی نمایش داده نمی‌شود.',
    en: 'These figures are not yet filled in. Each slot is designed and will be populated once real data is confirmed — until then no number is shown.',
  } as Localized,
};

/** True when at least one metric carries a real, verified figure. */
export const hasVerifiedProof = proofMetrics.some((m) => m.value !== null);
