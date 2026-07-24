import type { Locale } from '@/i18n/config';

/**
 * Localized string — the atomic unit of the shared bilingual content model.
 * Every public field is authored as { fa, en } so the CMS can later map onto
 * the exact same shape (title.fa / title.en, body.fa / body.en, …).
 */
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

export function tl(value: LocalizedList, locale: Locale): string[] {
  return value[locale];
}

export interface SeoFields {
  seoTitle?: Localized;
  seoDescription?: Localized;
}

export interface FaqItem {
  question: Localized;
  answer: Localized;
}

export type TranslationStatus = 'complete' | 'needs-review' | 'missing';

export interface Service {
  slug: string;
  abbr: string; // FR™, SVP™, FRANCH™
  fullName: Localized;
  eyebrow: Localized;
  proposition: Localized;
  summary: Localized;
  challenge: Localized;
  suitability: Localized;
  diagnosticQuestions?: LocalizedList;
  approach: LocalizedList;
  deliverables: LocalizedList;
  intendedImpact: LocalizedList;
  relatedCapabilities: string[]; // capability slugs
  relatedIndustries?: string[]; // industry slugs
  faqs: FaqItem[];
  seo?: SeoFields;
}

export interface Capability {
  slug: string;
  name: Localized;
  title: Localized;
  description: Localized;
  detail: Localized;
}

export interface Industry {
  slug: string;
  name: Localized;
  overview: Localized;
  challenges: LocalizedList;
  relatedSolutions: string[];
  relatedCapabilities: string[];
}

export interface Phase {
  key: string;
  name: Localized;
  objective: Localized;
  activities: LocalizedList;
  participation: Localized;
  outputs: LocalizedList;
  gate: Localized;
  connection: Localized;
}

export interface EngagementStage {
  key: string;
  name: Localized;
  description: Localized;
}

export interface Value {
  key: string;
  name: Localized;
  description: Localized;
}

export interface TeamMember {
  slug: string;
  name: Localized;
  role: Localized;
  /** Portrait is intentionally optional — see CMS note: never show stock. */
  portrait?: string;
  active: boolean;
  order: number;
}

export type InsightType = 'article' | 'report' | 'guide' | 'case-study';

export interface Insight {
  slug: string;
  type: InsightType;
  topic: Localized;
  industry?: string;
  title: Localized;
  summary: Localized;
  body: Localized[]; // paragraphs
  author: Localized;
  publishedAt: string; // ISO date
  readingMinutes: number;
  status: TranslationStatus;
  seo?: SeoFields;
}
