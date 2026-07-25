import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath, formatDate } from '@/lib/utils';
import { Section, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { industries, getIndustry } from '@/content/industries';
import { getService } from '@/content/services';
import { getCapability } from '@/content/capabilities';
import { insights } from '@/content/insights';
import { team } from '@/content/team';
import { Monogram } from '@/components/ui/Monogram';
import { u } from '@/content/ui';

export function generateStaticParams() {
  return locales.flatMap((locale) => industries.map((i) => ({ locale, slug: i.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return buildMetadata({
    locale,
    path: `/industries/${ind.slug}`,
    title: ind.name[locale],
    description: ind.overview[locale],
  });
}

export default function IndustryPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const ind = getIndustry(params.slug);
  if (!ind) notFound();

  const relatedInsights = insights.slice(0, 3);
  const contactPerson = team[2] ?? team[0];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[
          { label: locale === 'fa' ? 'صنایع' : 'Industries', path: '/industries' },
          { label: ind.name[locale] },
        ]}
        eyebrow={locale === 'fa' ? 'صنعت' : 'Industry'}
        title={ind.name[locale]}
        intro={ind.overview[locale]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="rule-accent text-h2 text-navy">{u('commonChallenges', locale)}</h2>
            <p className="mt-2 text-sm text-ink-faint">
              {locale === 'fa' ? 'چالش‌های رایج ممکن است شامل موارد زیر باشد:' : 'Common challenges may include:'}
            </p>
            <ul className="mt-4 space-y-3">
              {ind.challenges[locale].map((c, i) => (
                <li key={i} className="flex items-start gap-3 rounded-card border border-line bg-surface-muted p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-functional" aria-hidden />
                  <span className="text-ink">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h2 className="rule-accent text-h2 text-navy">{u('relatedSolutions', locale)}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {ind.relatedSolutions.map((slug) => {
                  const s = getService(slug);
                  if (!s) return null;
                  return (
                    <Link
                      key={slug}
                      href={localePath(locale, `/solutions/${slug}`)}
                      className="rounded-card border border-line p-5 transition-colors hover:border-cyan-300"
                    >
                      <p className="font-display text-h3 text-navy">{s.abbr}</p>
                      <p className="mt-1 text-sm text-ink-muted">{s.fullName[locale]}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-card border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-functional">
                  {u('relatedCapabilities', locale)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {ind.relatedCapabilities.map((slug) => {
                    const c = getCapability(slug);
                    if (!c) return null;
                    return (
                      <li key={slug}>
                        <Link href={localePath(locale, `/capabilities/${slug}`)} className="text-sm text-navy hover:text-functional link-underline">
                          {c.title[locale]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="rounded-card border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-functional">
                  {locale === 'fa' ? 'گفت‌وگو با کارشناس' : 'Talk to a specialist'}
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <Monogram name={contactPerson.name.en} className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-medium text-navy">{contactPerson.name[locale]}</p>
                    <p className="text-xs text-ink-muted">{contactPerson.role[locale]}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="text-h2 text-navy">{u('relatedInsights', locale)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedInsights.map((n) => (
            <Link
              key={n.slug}
              href={localePath(locale, `/insights/${n.slug}`)}
              className="group rounded-card border border-line bg-white p-6 transition-colors hover:border-cyan-300"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-functional">{n.topic[locale]}</span>
              <h3 className="mt-3 text-h3 text-navy group-hover:text-functional">{n.title[locale]}</h3>
              <span className="mt-3 block text-xs text-ink-faint">{formatDate(n.publishedAt, locale)}</span>
            </Link>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
