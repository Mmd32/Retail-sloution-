import type { Localized } from './types';
import { services } from './services';
import { capabilities } from './capabilities';
import { finalCta, contact } from './site';

/**
 * Homepage copy (studio direction). Wording follows the company profile
 * (V.05); the English is a translation where the profile is Persian-only.
 *
 * Media is picked up from /public/media by file name — nothing to edit here
 * when photos or films arrive. See /public/media/README.txt.
 */

/** Profile p.4 — the belief statement. */
export const homeIntro: Localized = {
  fa: 'ما باور داریم بزرگ‌ترین مانع رشد برندهای ریتیل، کمبود سرمایه یا محصول نیست؛ بلکه وابستگی سازمان به افراد است. ریتیل سلوشنز می‌خواهد استاندارد جدیدی برای مدیریت ریتیل در ایران ایجاد کند؛ استانداردی که سازمان‌ها را از وابستگی به افراد، به سمت سیستم، داده و رهبری حرفه‌ای هدایت کند.',
  en: 'We believe the greatest barrier to the growth of retail brands is not a lack of capital or products, but the organization’s dependence on individuals. Retail Solutions sets out to create a new standard for retail management in Iran: one that moves organizations away from dependence on individuals, toward systems, data and professional leadership.',
};

/** Profile p.15 — industries, for the band under the statement. */
export const homeIndustries: Localized[] = [
  { fa: 'پوشاک (البسه و چرم)', en: 'Fashion' },
  { fa: 'کافه و رستوران', en: 'F&B' },
  { fa: 'آرایشی و زیبایی', en: 'Beauty & Cosmetics' },
  { fa: 'مبلمان و لوازم منزل', en: 'Homeware' },
  { fa: 'کالاهای تندگردش', en: 'FMCG' },
  { fa: 'لوازم الکترونیک', en: 'Electronics' },
];

export interface WorkItem {
  /** Also the media file name under /public/media/work. */
  slug: string;
  href: string;
  title: Localized;
  sub: Localized;
}

/**
 * Profile pp.8–13 — the three core services, the six areas of expertise and
 * the methodology. Titles stay in English in both locales, as in the profile.
 */
export const workItems: WorkItem[] = [
  ...services.map((s) => ({
    slug: s.slug,
    href: `/solutions/${s.slug}`,
    title: { fa: s.abbr, en: s.abbr },
    sub: s.fullName,
  })),
  ...capabilities.map((c) => ({
    slug: c.slug,
    href: `/capabilities/${c.slug}`,
    title: { fa: c.name.en, en: c.name.en },
    sub: c.title,
  })),
  {
    slug: 'methodology',
    href: '/methodology',
    title: { fa: 'Methodology', en: 'Methodology' },
    sub: {
      fa: 'کشف، تشخیص، طراحی، پیاده‌سازی، توسعه',
      en: 'Discover, Diagnose, Design, Deploy, Develop',
    },
  },
];

/** Profile pp.8, 10–12, 15 — counted from the profile itself. */
export const homeFigures: { value: number; label: Localized }[] = [
  { value: 6, label: { fa: 'حوزه تخصصی', en: 'Areas of expertise' } },
  { value: 3, label: { fa: 'خدمت اصلی', en: 'Core services' } },
  { value: 6, label: { fa: 'صنعت', en: 'Industries' } },
];

export const homeCopy = {
  work: { fa: 'خدمات و تخصص‌ها', en: 'Services & expertise' } as Localized,
  workMore: { fa: 'همه خدمات', en: 'All services' } as Localized,
  /** Profile p.7 — point of difference. */
  whyTitle: { fa: 'نقطه تمایز ما', en: 'What sets us apart' } as Localized,
  whyBody: {
    fa: 'مشاور سنتی تحلیل ارائه می‌دهد و اجرای آن بر عهده سازمان باقی می‌ماند. ریتیل سلوشنز همراه سازمان است؛ سازمان در کنار یادگیری، توانایی پیاده‌سازی را به دست می‌آورد.',
    en: 'A traditional consultant delivers analysis and leaves execution to the organization. Retail Solutions works alongside the organization, so that while it learns, it gains the ability to implement.',
  } as Localized,
  readMore: { fa: 'بیشتر بخوانید', en: 'Read more' } as Localized,
  /** Profile p.17. */
  contactTitle: { fa: 'با هم بسازیم', en: 'Let’s Build Together' } as Localized,
  contactBody: finalCta.support,
  contactRows: [
    {
      href: '/contact',
      label: { fa: 'درخواست همکاری؟', en: 'Business inquiries?' } as Localized,
      words: { fa: ['رزرو جلسه', 'شناخت کسب‌وکار'], en: ['BOOK A MEETING', 'DISCOVER'] },
    },
    {
      href: `mailto:${contact.email}`,
      label: { fa: 'ایمیل', en: 'Email' } as Localized,
      words: { fa: [contact.email], en: [contact.email] },
    },
  ],
};
