import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { plexSans, plexMono, plexArabic } from '../fonts';
import '../globals.css';
import { locales, isLocale, localeDirection, localeHtmlLang, type Locale } from '@/i18n/config';
import { Header } from '@/components/layout/Header';
import { findBrandLogo } from '@/lib/media';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { LocaleMemory } from '@/components/layout/LocaleMemory';
import { siteUrl } from '@/lib/seo';
import { u } from '@/content/ui';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Retail Solutions — Building Enduring Retail Organizations',
    template: '%s | Retail Solutions',
  },
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dir = localeDirection[locale];

  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={dir}
      data-theme="light"
      className={`${plexSans.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-screen bg-paper antialiased">
        <SkipLink label={u('skipToContent', locale)} />
        <LocaleMemory locale={locale} />
        <Header locale={locale} logoSrc={findBrandLogo('logo')} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
