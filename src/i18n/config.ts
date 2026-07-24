export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  fa: 'rtl',
  en: 'ltr',
};

export const localeHtmlLang: Record<Locale, string> = {
  fa: 'fa-IR',
  en: 'en',
};

export const localeLabel: Record<Locale, { native: string; short: string }> = {
  fa: { native: 'فارسی', short: 'FA' },
  en: { native: 'English', short: 'EN' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The opposite locale — used by the language switcher to preserve the page. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'fa' ? 'en' : 'fa';
}
