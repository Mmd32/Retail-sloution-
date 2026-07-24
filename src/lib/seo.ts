import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { locales, localeHtmlLang } from '@/i18n/config';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://retailsolutions.ir').replace(/\/$/, '');

interface BuildMetaArgs {
  locale: Locale;
  /** locale-relative path, e.g. "/solutions/fr" (no locale prefix, no trailing slash) */
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
}

/**
 * Build localized metadata with correct canonical + hreflang alternates.
 * The equivalent page in the other locale shares the same path, so switching
 * language never drops the user on the homepage.
 */
export function buildMetadata({ locale, path, title, description, type = 'website' }: BuildMetaArgs): Metadata {
  const clean = path === '/' ? '' : path;
  const canonical = `${siteUrl}/${locale}${clean}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHtmlLang[l]] = `${siteUrl}/${l}${clean}`;
  }
  languages['x-default'] = `${siteUrl}/fa${clean}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Retail Solutions',
      locale: localeHtmlLang[locale],
      type,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
