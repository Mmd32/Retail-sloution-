import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { legalPages, getLegalPage } from '@/content/legal';

export function generateStaticParams() {
  return locales.flatMap((locale) => legalPages.map((p) => ({ locale, slug: p.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const page = getLegalPage(params.slug);
  if (!page) return {};
  return buildMetadata({ locale, path: `/legal/${page.slug}`, title: page.title[locale], description: page.title[locale] });
}

export default function LegalPageView({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const page = getLegalPage(params.slug);
  if (!page) notFound();

  return (
    <>
      <PageHero locale={locale} crumbs={[{ label: page.title[locale] }]} title={page.title[locale]} />
      <Section>
        <div className="mx-auto max-w-prose">
          {page.body.map((p, i) => (
            <p key={i} className="mb-5 leading-relaxed text-ink-muted">{p[locale]}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
