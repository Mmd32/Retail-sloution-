import type { Localized } from './types';

export interface NavLink {
  href: string; // locale-relative, e.g. "/about"
  label: Localized;
  description?: Localized;
}

/**
 * Primary navigation (§2).
 *
 * Six entries, deliberately. The previous seven-item bar mixed audience-facing
 * categories ("Solutions") with internal org structure ("Team", "Capabilities")
 * and forced a decision the visitor has no basis to make. Now:
 *
 *   - Team folds into About.
 *   - Capabilities is no longer a sibling of Solutions — the distinction was
 *     invisible from outside. It surfaces inside the Solutions mega menu as
 *     the system layer beneath the three named methodologies.
 *   - Contact collapses into the persistent "Request a meeting" CTA.
 *   - Methodology / Engagement / Assessment move into the mega menu and footer.
 */
export const primaryNav: NavLink[] = [
  { href: '/solutions', label: { fa: 'راهکارها', en: 'Solutions' } },
  { href: '/industries', label: { fa: 'صنایع', en: 'Industries' } },
  { href: '/case-studies', label: { fa: 'نتایج', en: 'Results' } },
  { href: '/insights', label: { fa: 'بینش‌ها', en: 'Insights' } },
  { href: '/about', label: { fa: 'درباره ما', en: 'About' } },
];

/**
 * The six domains of the Retail Operating System, as shown in the Solutions
 * mega menu. These map onto the capability pages; the labels here are the
 * outcome-facing framing rather than the internal capability names (§8).
 */
export const solutionDomains: (NavLink & { icon: string })[] = [
  {
    href: '/capabilities/strategy',
    icon: 'compass',
    label: { fa: 'استراتژی و مدل رشد', en: 'Strategy & Growth Model' },
    description: {
      fa: 'جهت رشد، اولویت‌ها و مرزهای تصمیم‌گیری.',
      en: 'Growth direction, priorities, and decision boundaries.',
    },
  },
  {
    href: '/capabilities/expansion',
    icon: 'building',
    label: { fa: 'توسعه شعب و شبکه', en: 'Network Expansion' },
    description: {
      fa: 'اعتبارسنجی موقعیت و کاهش ریسک تصمیم توسعه.',
      en: 'Site validation and de-risked expansion decisions.',
    },
  },
  {
    href: '/capabilities/operations',
    icon: 'settings',
    label: { fa: 'استانداردسازی عملیات', en: 'Operational Standards' },
    description: {
      fa: 'فرآیند، استاندارد و کنترل برای اجرای قابل تکرار.',
      en: 'Process, standards, and control for repeatable execution.',
    },
  },
  {
    href: '/capabilities/store-development',
    icon: 'store',
    label: { fa: 'تجربه مشتری', en: 'Customer Experience' },
    description: {
      fa: 'یکسان‌سازی تجربه برند در تمام نقاط تماس.',
      en: 'A consistent brand experience at every touchpoint.',
    },
  },
  {
    href: '/capabilities/people',
    icon: 'users',
    label: { fa: 'سرمایه انسانی', en: 'Human Capital' },
    description: {
      fa: 'ساختار، نقش‌ها، شایستگی و نظام عملکرد.',
      en: 'Structure, roles, competencies, and performance systems.',
    },
  },
  {
    href: '/capabilities/analytics',
    icon: 'chart',
    label: { fa: 'داده و تصمیم‌گیری', en: 'Data & Decisions' },
    description: {
      fa: 'تبدیل داده به شاخص، بینش و تصمیم قابل اتکا.',
      en: 'Turning data into indicators, insight, and reliable decisions.',
    },
  },
];

/** Secondary links inside the Solutions mega menu. */
export const solutionsExtraLinks: NavLink[] = [
  { href: '/methodology', label: { fa: 'متدولوژی', en: 'Methodology' } },
  { href: '/engagement', label: { fa: 'مدل همکاری', en: 'Engagement Model' } },
  { href: '/assessment', label: { fa: 'ارزیابی آمادگی رشد', en: 'Growth Readiness Assessment' } },
  { href: '/capabilities', label: { fa: 'همه تخصص‌ها', en: 'All Capabilities' } },
];

/** Links demoted from the header to the footer (§2, §18). */
export const companyLinks: NavLink[] = [
  { href: '/about', label: { fa: 'درباره ما', en: 'About' } },
  { href: '/methodology', label: { fa: 'متدولوژی', en: 'Methodology' } },
  { href: '/engagement', label: { fa: 'مدل همکاری', en: 'Engagement Model' } },
  { href: '/contact', label: { fa: 'تماس', en: 'Contact' } },
];
