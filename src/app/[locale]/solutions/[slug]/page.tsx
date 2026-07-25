import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, HelpCircle, Target, Download } from 'lucide-react';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath, formatDate } from '@/lib/utils';
import { Section, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Accordion } from '@/components/ui/Accordion';
import { LeadForm } from '@/components/forms/LeadForm';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Monogram } from '@/components/ui/Monogram';
import { services, getService } from '@/content/services';
import { getCapability } from '@/content/capabilities';
import { getIndustry } from '@/content/industries';
import { insights } from '@/content/insights';
import { team } from '@/content/team';
import { u } from '@/content/ui';

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/solutions/${service.slug}`,
    title: service.seo?.seoTitle?.[locale] ?? `${service.abbr} — ${service.fullName[locale]}`,
    description: service.seo?.seoDescription?.[locale] ?? service.proposition[locale],
    type: 'article',
  });
}

export default function ServicePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const service = getService(params.slug);
  if (!service) notFound();

  // Prefer insights whose topic matches this solution's theme, then fill up to 3.
  const themed = insights.filter((i) => i.topic.en === service.eyebrow.en);
  const relatedInsights = [...themed, ...insights.filter((i) => !themed.includes(i))].slice(0, 3);
  const contactPerson = team[0];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[
          { label: locale === 'fa' ? 'راهکارها' : 'Solutions', path: '/solutions' },
          { label: `${service.abbr}` },
        ]}
        eyebrow={service.eyebrow[locale]}
        title={`${service.abbr} — ${service.fullName[locale]}`}
        intro={service.proposition[locale]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Executive summary */}
            <Eyebrow>{u('executiveSummary', locale)}</Eyebrow>
            <p className="mt-4 text-body font-medium text-navy">{service.summary[locale]}</p>

            {/* Challenge */}
            <div className="mt-12">
              <h2 className="rule-accent text-h2 text-navy">{u('challenge', locale)}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{service.challenge[locale]}</p>
            </div>

            {/* Suitability */}
            <div className="mt-12">
              <h2 className="rule-accent text-h2 text-navy">{u('suitability', locale)}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{service.suitability[locale]}</p>
            </div>

            {/* Diagnostic questions */}
            {service.diagnosticQuestions && (
              <div className="mt-12">
                <h2 className="rule-accent text-h2 text-navy">{u('diagnosticQuestions', locale)}</h2>
                <ul className="mt-4 space-y-3">
                  {service.diagnosticQuestions[locale].map((q, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-card border border-line bg-surface-muted p-4">
                      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-functional" aria-hidden />
                      <span className="text-ink">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Approach */}
            <div className="mt-12">
              <h2 className="rule-accent text-h2 text-navy">{u('approach', locale)}</h2>
              <ol className="mt-4 space-y-3">
                {service.approach[locale].map((a, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed text-ink-muted">{a}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverables */}
            <div className="mt-12">
              <h2 className="rule-accent text-h2 text-navy">{u('deliverables', locale)}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.deliverables[locale].map((d, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-card border border-line p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-functional" aria-hidden />
                    <span className="text-ink">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intended impact */}
            <div className="mt-12 rounded-card border border-cyan-200 bg-callout-info p-7">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-functional" aria-hidden />
                <h2 className="text-h3 text-navy">{u('intendedImpact', locale)}</h2>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {service.intendedImpact[locale].map((im, i) => (
                  <li key={i} className="rounded-control border border-cyan-200 bg-white px-4 py-3 text-sm font-medium text-navy">
                    {im}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-muted">
                {locale === 'fa'
                  ? 'موارد بالا اهداف و اثرهای موردانتظار پروژه هستند و به‌عنوان تضمین عددی ارائه نمی‌شوند.'
                  : 'The above are project objectives and intended impacts, not guaranteed numerical outcomes.'}
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="mb-6 text-h2 text-navy">{u('faq', locale)}</h2>
              <Accordion
                items={service.faqs.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Related capabilities */}
              <div className="rounded-card border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-functional">
                  {u('relatedCapabilities', locale)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {service.relatedCapabilities.map((slug) => {
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

              {/* Relevant industries */}
              {service.relatedIndustries && (
                <div className="rounded-card border border-line p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-functional">
                    {u('relatedIndustries', locale)}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.relatedIndustries.map((slug) => {
                      const ind = getIndustry(slug);
                      if (!ind) return null;
                      return (
                        <Link
                          key={slug}
                          href={localePath(locale, `/industries/${slug}`)}
                          className="rounded-full border border-line px-3 py-1.5 text-xs text-navy hover:border-cyan"
                        >
                          {ind.name[locale]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contact person */}
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

              {/* Downloadable resource (gated) */}
              <div className="rounded-card border border-dashed border-line p-6">
                <div className="flex items-center gap-2 text-navy">
                  <Download className="h-4 w-4 text-functional" aria-hidden />
                  <h3 className="text-sm font-semibold">{locale === 'fa' ? 'دریافت معرفی راهکار' : 'Download solution brief'}</h3>
                </div>
                <p className="mt-2 text-xs text-ink-muted">
                  {locale === 'fa'
                    ? 'معرفی PDF این راهکار پس از بارگذاری در CMS در دسترس قرار می‌گیرد.'
                    : 'A PDF brief for this solution becomes available once uploaded in the CMS.'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related insights */}
      {relatedInsights.length > 0 && (
        <Section tone="muted">
          <div className="flex items-end justify-between">
            <h2 className="text-h2 text-navy">{u('relatedInsights', locale)}</h2>
            <ArrowLink href={localePath(locale, '/insights')} locale={locale}>
              {u('viewAll', locale)}
            </ArrowLink>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedInsights.map((n) => (
              <Link
                key={n.slug}
                href={localePath(locale, `/insights/${n.slug}`)}
                className="group rounded-card border border-line bg-white p-6 transition-colors hover:border-cyan-300"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-functional">{n.topic[locale]}</span>
                <h3 className="mt-3 text-h3 text-navy group-hover:text-functional">{n.title[locale]}</h3>
                <p className="mt-2 text-label text-ink-muted line-clamp-2">{n.summary[locale]}</p>
                <span className="mt-3 block text-xs text-ink-faint">{formatDate(n.publishedAt, locale)}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Lead-generation CTA form */}
      <Section id="request">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-h2 text-navy">
            {locale === 'fa' ? `درباره‌ی ${service.abbr} با ما صحبت کنید` : `Talk to us about ${service.abbr}`}
          </h2>
          <p className="mt-3 text-center text-ink-muted">
            {locale === 'fa'
              ? 'فرم زیر را کامل کنید تا یک جلسه‌ی اولیه هماهنگ شود.'
              : 'Complete the form below and we’ll arrange an initial meeting.'}
          </p>
          <div className="mt-8">
            <LeadForm locale={locale} type="service-inquiry" serviceSlug={service.slug} />
          </div>
        </div>
      </Section>
    </>
  );
}
