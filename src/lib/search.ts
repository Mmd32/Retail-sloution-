import type { Locale } from '@/i18n/config';
import { normalizeFa } from './utils';
import { services } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { insights } from '@/content/insights';

export type SearchType = 'service' | 'capability' | 'industry' | 'insight' | 'page';

export interface SearchDoc {
  type: SearchType;
  href: string; // locale-relative
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  topic?: Record<Locale, string>;
  industry?: string;
  haystack: Record<Locale, string>;
}

const staticPages: SearchDoc[] = [
  {
    type: 'page',
    href: '/about',
    title: { fa: 'درباره ما', en: 'About' },
    description: { fa: 'چشم‌انداز، مأموریت، فلسفه و ارزش‌های ریتیل سلوشنز', en: 'Vision, mission, philosophy, and values of Retail Solutions' },
    haystack: { fa: '', en: '' },
  },
  {
    type: 'page',
    href: '/methodology',
    title: { fa: 'متدولوژی', en: 'Methodology' },
    description: { fa: 'پنج مرحله‌ی کشف، تشخیص، طراحی، پیاده‌سازی و توسعه', en: 'The five stages: Discover, Diagnose, Design, Deploy, Develop' },
    haystack: { fa: '', en: '' },
  },
  {
    type: 'page',
    href: '/engagement',
    title: { fa: 'مدل همکاری', en: 'Engagement Model' },
    description: { fa: 'مسیر همکاری با شما از شناخت تا بهینه‌سازی مستمر', en: 'Your cooperation journey from discovery to continuous optimization' },
    haystack: { fa: '', en: '' },
  },
  {
    type: 'page',
    href: '/assessment',
    title: { fa: 'ارزیابی آمادگی رشد ریتیل', en: 'Retail Growth Readiness Assessment' },
    description: { fa: 'ابزار تشخیصی اولیه‌ی آمادگی سازمان برای رشد سیستم‌محور', en: 'A preliminary diagnostic for readiness to grow through systems' },
    haystack: { fa: '', en: '' },
  },
  {
    type: 'page',
    href: '/contact',
    title: { fa: 'تماس با ما', en: 'Contact' },
    description: { fa: 'با تیم ریتیل سلوشنز در ارتباط باشید', en: 'Get in touch with the Retail Solutions team' },
    haystack: { fa: '', en: '' },
  },
];

function build(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const s of services) {
    docs.push({
      type: 'service',
      href: `/solutions/${s.slug}`,
      title: { fa: `${s.abbr} — ${s.fullName.fa}`, en: `${s.abbr} — ${s.fullName.en}` },
      description: s.proposition,
      haystack: {
        fa: [s.abbr, s.fullName.fa, s.proposition.fa, s.summary.fa, s.challenge.fa].join(' '),
        en: [s.abbr, s.fullName.en, s.proposition.en, s.summary.en, s.challenge.en].join(' '),
      },
    });
  }
  for (const c of capabilities) {
    docs.push({
      type: 'capability',
      href: `/capabilities/${c.slug}`,
      title: c.title,
      description: c.description,
      haystack: {
        fa: [c.name.fa, c.title.fa, c.description.fa, c.detail.fa].join(' '),
        en: [c.name.en, c.title.en, c.description.en, c.detail.en].join(' '),
      },
    });
  }
  for (const i of industries) {
    docs.push({
      type: 'industry',
      href: `/industries/${i.slug}`,
      title: i.name,
      description: i.overview,
      haystack: {
        fa: [i.name.fa, i.overview.fa, ...i.challenges.fa].join(' '),
        en: [i.name.en, i.overview.en, ...i.challenges.en].join(' '),
      },
    });
  }
  for (const n of insights) {
    docs.push({
      type: 'insight',
      href: `/insights/${n.slug}`,
      title: n.title,
      description: n.summary,
      topic: n.topic,
      haystack: {
        fa: [n.title.fa, n.summary.fa, n.topic.fa, ...n.body.map((b) => b.fa)].join(' '),
        en: [n.title.en, n.summary.en, n.topic.en, ...n.body.map((b) => b.en)].join(' '),
      },
    });
  }
  docs.push(...staticPages);
  return docs;
}

export const searchIndex: SearchDoc[] = build();

export function runSearch(query: string, locale: Locale, typeFilter?: SearchType): SearchDoc[] {
  const q = normalizeFa(query);
  if (!q) return [];
  return searchIndex
    .filter((d) => (typeFilter ? d.type === typeFilter : true))
    .map((d) => {
      const hayTitle = normalizeFa(d.title[locale]);
      const hayBody = normalizeFa(d.haystack[locale] + ' ' + d.description[locale]);
      let score = 0;
      if (hayTitle.includes(q)) score += 10;
      if (hayBody.includes(q)) score += 3;
      // token match
      for (const token of q.split(/\s+/).filter(Boolean)) {
        if (hayTitle.includes(token)) score += 2;
        else if (hayBody.includes(token)) score += 1;
      }
      return { doc: d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.doc);
}
