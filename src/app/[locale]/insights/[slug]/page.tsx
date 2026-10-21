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
import { ReadingProgress } from '@/components/insights/ReadingProgress';
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
      <ReadingProgress targetId="insight-article" />
      <article id="insight-article">
        <header className="rs-hero-field border-b border-line">
          <div className="container-x pb-12 pt-6 md:pb-16 md:pt-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6">
                <Breadcrumbs
                  locale={locale}
                  inline
                  items={[
                  { label: locale === 'fa' ? 'بینش‌ها' : 'Insights', path: '/insights' },
                  { label: insight.title[locale] },
                  ]}
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-control bg-callout-info px-2.5 py-1 font-medium text-functional">
                  {insightTypeLabels[insight.type][locale]}
                </span>
                <span className="text-ink-muted">{insight.topic[locale]}</span>
              </div>
              <h1 className="text-h1 mt-6 text-ink">{insight.title[locale]}</h1>
              <p className="mt-5 text-body text-ink-muted">{insight.summary[locale]}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line pt-5 text-sm text-ink-muted">
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
              <p key={i} className="mb-6 text-[1.125rem] leading-[1.75] text-ink">{p[locale]}</p>
            ))}
          </div>
        </div>
      </article>

      <Section tone="muted">
        <h2 className="text-h2 text-ink">{u('relatedInsights', locale)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((n) => (
            <Link
              key={n.slug}
              href={localePath(locale, `/insights/${n.slug}`)}
              className="group rounded-card border border-line bg-surface p-6 transition-colors hover:border-cyan-300"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-functional">{n.topic[locale]}</span>
              <h3 className="mt-3 text-h3 text-ink group-hover:text-functional">{n.title[locale]}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
