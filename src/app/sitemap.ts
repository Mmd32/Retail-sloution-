import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { siteUrl } from '@/lib/seo';
import { services } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { insights } from '@/content/insights';
import { legalPages } from '@/content/legal';

/** Localized sitemap covering every page in both locales with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/about',
    '/solutions',
    '/capabilities',
    '/industries',
    '/methodology',
    '/engagement',
    '/insights',
    '/team',
    '/contact',
    '/assessment',
  ];

  const dynamicPaths = [
    ...services.map((s) => `/solutions/${s.slug}`),
    ...capabilities.map((c) => `/capabilities/${c.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...insights.map((n) => `/insights/${n.slug}`),
    ...legalPages.map((p) => `/legal/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];
  const now = new Date();

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
