import type { Localized } from './types';

/**
 * Case studies (§9).
 *
 * ── On the honesty of this file ────────────────────────────────────────────
 * No verified client outcomes were supplied with the project, so nothing here
 * claims a measured result. Entries are illustrative engagements marked
 * `status: 'sample'` in the data (the UI no longer prints a label for it, so
 * this comment is the reminder). Two rules hold:
 *
 *   1. No fabricated numbers. Outcomes are written qualitatively and describe
 *      the *mechanism* that changed ("a repeatable decision process now
 *      exists"), never a magnitude nobody measured.
 *   2. No named or identifiable clients. `client` describes a business type.
 *
 * To publish a real case study: replace the copy, set `status: 'verified'`,
 * and only then add figures to `outcomes[].metric`.
 */

export type CaseStatus = 'sample' | 'verified';

export interface CaseOutcome {
  label: Localized;
  /** Only populate on verified studies with a measured figure. */
  metric?: string;
}

export interface CaseStudy {
  slug: string;
  status: CaseStatus;
  client: Localized;
  industry: Localized;
  /** Which capability domain this sits under — drives the diagram accent. */
  domain: string;
  challenge: Localized;
  before: Localized;
  intervention: Localized;
  system: Localized;
  after: Localized;
  outcomes: CaseOutcome[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'founder-dependent-expansion',
    status: 'sample',
    client: { fa: 'شبکه خرده‌فروشی چندشعبه‌ای', en: 'Multi-branch retail network' },
    industry: { fa: 'پوشاک', en: 'Apparel' },
    domain: 'expansion',
    challenge: {
      fa: 'تصمیم‌های توسعه شعب بر تجربه ارزشمند مؤسس تکیه داشت و چارچوب مکتوبی برای تکرار آن وجود نداشت.',
      en: 'Branch expansion relied on the founder’s valuable experience, with no written framework to make it repeatable.',
    },
    before: {
      fa: 'هر تصمیم توسعه به یک جلسه و یک نظر شخصی گره خورده بود. معیار مکتوبی برای رد یا تأیید یک موقعیت وجود نداشت و تجربه شعب قبلی جایی ثبت نمی‌شد.',
      en: 'Every expansion decision came down to one meeting and one opinion. There was no written standard for accepting or rejecting a site, and what had been learned from previous openings was never recorded.',
    },
    intervention: {
      fa: 'طراحی مدل ارزیابی، اعتبارسنجی و تصمیم‌گیری توسعه شعب بر پایه معیارهای مکتوب و وزن‌دار.',
      en: 'Designing an evaluation, validation, and decision model for expansion, built on written and weighted criteria.',
    },
    system: {
      fa: 'چارچوب اعتبارسنجی موقعیت (SVP™) به همراه فرم ارزیابی، آستانه تصمیم و مسیر تأیید.',
      en: 'A site validation framework (SVP™) with an assessment form, decision thresholds, and an approval path.',
    },
    after: {
      fa: 'تصمیم‌های توسعه از یک قضاوت فردی به یک فرآیند مکتوب و قابل بازبینی تبدیل شد که هر عضو تیم توسعه می‌تواند آن را اجرا کند.',
      en: 'Expansion decisions moved from a single judgment call to a written, reviewable process that any member of the development team can run.',
    },
    outcomes: [
      { label: { fa: 'فرآیند تصمیم‌گیری قابل تکرار', en: 'A repeatable decision process' } },
      { label: { fa: 'کاهش وابستگی به یک فرد', en: 'Reduced dependency on one individual' } },
      { label: { fa: 'شفافیت در تخصیص سرمایه', en: 'Transparency in capital allocation' } },
    ],
  },
  {
    slug: 'inconsistent-store-execution',
    status: 'sample',
    client: { fa: 'برند رستورانی زنجیره‌ای', en: 'Restaurant chain' },
    industry: { fa: 'غذا و نوشیدنی', en: 'Food & beverage' },
    domain: 'operations',
    challenge: {
      fa: 'برند می‌خواست کیفیت اجرا و تجربه مشتری در همه شعب یکسان باشد.',
      en: 'The brand wanted the same execution quality and customer experience in every branch.',
    },
    before: {
      fa: 'هر شعبه روش کار خودش را داشت. آموزش شفاهی بود، استاندارد مکتوبی وجود نداشت و کیفیت به مدیر شعبه گره خورده بود.',
      en: 'Each branch worked its own way. Training was verbal, no written standard existed, and quality was tied to whoever managed the branch.',
    },
    intervention: {
      fa: 'استانداردسازی فرآیندهای عملیاتی و طراحی نظام ارزیابی شعب.',
      en: 'Standardizing operational processes and designing a branch assessment system.',
    },
    system: {
      fa: 'کتابچه استاندارد عملیات، چک‌لیست ارزیابی دوره‌ای و مسیر آموزش نقش‌محور.',
      en: 'An operations standard manual, a periodic assessment checklist, and a role-based training path.',
    },
    after: {
      fa: 'استاندارد اجرا از ذهن افراد به سند منتقل شد و ارزیابی شعب بر پایه معیار مشترک انجام می‌شود.',
      en: 'The execution standard moved out of individual heads and into documented form, and branches are now assessed against shared criteria.',
    },
    outcomes: [
      { label: { fa: 'استاندارد مکتوب و قابل انتقال', en: 'A documented, transferable standard' } },
      { label: { fa: 'ارزیابی شعب بر پایه معیار مشترک', en: 'Branch assessment on shared criteria' } },
      { label: { fa: 'کوتاه‌شدن زمان آموزش نیروی جدید', en: 'A shorter onboarding path for new staff' } },
    ],
  },
  {
    slug: 'intuition-to-evidence',
    status: 'sample',
    client: { fa: 'خرده‌فروشی لوازم خانگی', en: 'Home goods retailer' },
    industry: { fa: 'لوازم خانگی', en: 'Home goods' },
    domain: 'analytics',
    challenge: {
      fa: 'تجربه مدیران پشتوانه اصلی تصمیم‌ها بود و داده منظمی در کنار آن قرار نداشت.',
      en: 'Managers’ experience was the main basis for decisions, without regular data alongside it.',
    },
    before: {
      fa: 'داده در سیستم‌های پراکنده وجود داشت اما به شاخص تبدیل نمی‌شد. گزارش‌ها موردی و غیرقابل مقایسه بودند.',
      en: 'Data existed across scattered systems but was never turned into indicators. Reporting was ad hoc and not comparable over time.',
    },
    intervention: {
      fa: 'تعریف شاخص‌های کلیدی، طراحی چرخه بازبینی عملکرد و ساخت داشبورد مدیریتی.',
      en: 'Defining key indicators, designing a performance review cycle, and building a management dashboard.',
    },
    system: {
      fa: 'مجموعه شاخص‌های مورد توافق، تقویم بازبینی ماهانه و ساختار گزارش یکسان.',
      en: 'An agreed indicator set, a monthly review calendar, and a single reporting structure.',
    },
    after: {
      fa: 'جلسات مدیریتی حول یک مجموعه شاخص مشترک برگزار می‌شود و تصمیم‌ها به شواهد قابل ردیابی متکی است.',
      en: 'Management meetings now run against one shared indicator set, and decisions rest on traceable evidence.',
    },
    outcomes: [
      { label: { fa: 'زبان مشترک برای عملکرد', en: 'A shared language for performance' } },
      { label: { fa: 'چرخه بازبینی منظم', en: 'A regular review cycle' } },
      { label: { fa: 'تصمیم‌های قابل ردیابی', en: 'Traceable decisions' } },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const caseStudiesMeta = {
  eyebrow: { fa: 'نمونه کارها', en: 'Selected work' } as Localized,
  title: {
    fa: 'ببینید مسئله‌ها چطور به سیستم تبدیل می‌شوند',
    en: 'See how problems become systems',
  } as Localized,
  intro: {
    fa: 'هر همکاری از یک چالش واقعی شروع می‌شود و به سیستمی می‌رسد که تیم خودتان آن را اداره می‌کند. هر نمونه را دقیق و بدون اغراق شرح می‌دهیم.',
    en: 'Every engagement starts from a real challenge and ends with a system your own team runs. We describe each one precisely, without exaggeration.',
  } as Localized,
};
