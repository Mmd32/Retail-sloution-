import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { localePath, formatDate, readingTimeLabel } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { insights, getInsight, insightTypeLabels } from '@/content/insights';
import { u } from '@/content/ui';

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.map((i) => ({ locale, slug: i.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const insight = getInsight(params.slug);
  if (!insight) return {};
  return buildMetadata({
    locale,
    path: `/insights/${insight.slug}`,
    title: insight.seo?.seoTitle?.[locale] ?? insight.title[locale],
    description: insight.seo?.seoDescription?.[locale] ?? insight.summary[locale],
    type: 'article',
  });
}

export default function InsightPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const insight = getInsight(params.slug);
  if (!insight) notFound();

  const related = insights.filter((i) => i.slug !== insight.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title[locale],
    description: insight.summary[locale],
    inLanguage: locale,
    datePublished: insight.publishedAt,
    author: { '@type': 'Organization', name: 'Retail Solutions' },
    publisher: { '@type': 'Organization', name: 'Retail Solutions' },
    mainEntityOfPage: `${siteUrl}/${locale}/insights/${insight.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'fa' ? 'بینش‌ها' : 'Insights', path: '/insights' },
          { label: insight.title[locale] },
        ]}
      />

      <article>
        <header className="bg-surface-muted">
          <div className="container-x py-14 md:py-20">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded bg-accent-50 px-2.5 py-1 font-medium text-accent-700">
                  {insightTypeLabels[insight.type][locale]}
                </span>
                <span className="text-ink-faint">{insight.topic[locale]}</span>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-navy md:text-4xl">{insight.title[locale]}</h1>
              <p className="mt-5 text-lead text-ink-muted">{insight.summary[locale]}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden /> {insight.author[locale]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden /> {formatDate(insight.publishedAt, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden /> {readingTimeLabel(insight.readingMinutes, locale)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-x py-14">
          <div className="mx-auto max-w-prose">
            {insight.body.map((p, i) => (
              <p key={i} className="mb-6 text-lg leading-relaxed text-ink">{p[locale]}</p>
            ))}
          </div>
        </div>
      </article>

      <Section tone="muted">
        <h2 className="text-h2 text-navy">{u('relatedInsights', locale)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((n) => (
            <Link
              key={n.slug}
              href={localePath(locale, `/insights/${n.slug}`)}
              className="group rounded-lg border border-line bg-white p-6 transition-colors hover:border-accent-300"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">{n.topic[locale]}</span>
              <h3 className="mt-3 text-h3 text-navy group-hover:text-accent-700">{n.title[locale]}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
