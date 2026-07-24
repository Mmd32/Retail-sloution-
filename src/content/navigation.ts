import type { Localized } from './types';

export interface NavLink {
  href: string; // locale-relative, e.g. "/about"
  label: Localized;
}

export const primaryNav: NavLink[] = [
  { href: '/about', label: { fa: 'درباره ما', en: 'About' } },
  { href: '/solutions', label: { fa: 'راهکارها', en: 'Solutions' } },
  { href: '/capabilities', label: { fa: 'تخصص‌ها', en: 'Capabilities' } },
  { href: '/industries', label: { fa: 'صنایع', en: 'Industries' } },
  { href: '/insights', label: { fa: 'بینش‌ها', en: 'Insights' } },
  { href: '/team', label: { fa: 'تیم', en: 'Team' } },
  { href: '/contact', label: { fa: 'تماس با ما', en: 'Contact' } },
];

/** Extra links surfaced inside the Solutions mega menu. */
export const solutionsExtraLinks: NavLink[] = [
  { href: '/methodology', label: { fa: 'متدولوژی', en: 'Methodology' } },
  { href: '/assessment', label: { fa: 'ارزیابی آمادگی رشد', en: 'Retail Growth Assessment' } },
  { href: '/engagement', label: { fa: 'مدل همکاری', en: 'Engagement Model' } },
  { href: '/about', label: { fa: 'پروفایل شرکت', en: 'Company Profile' } },
];
