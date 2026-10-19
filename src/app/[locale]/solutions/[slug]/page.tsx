import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, HelpCircle, Target } from 'lucide-react';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Accordion } from '@/components/ui/Accordion';
import { services, getService } from '@/content/services';
import { getCapability } from '@/content/capabilities';
import { getIndustry } from '@/content/industries';
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
                          href={localePath(locale, `/industries#${slug}`)}
                          className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-label text-navy hover:border-cyan"
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
                <p className="text-label mt-3 text-ink-muted">
                  {locale === 'fa'
                    ? 'برای بررسی شرایط برندتان با کارشناسان ریتیل سلوشنز در تماس باشید.'
                    : 'Get in touch with a Retail Solutions specialist to discuss your brand.'}
                </p>
                <Link
                  href={localePath(locale, '/contact')}
                  className="mt-4 inline-flex min-h-[44px] items-center text-label font-semibold text-functional hover:text-navy lg:min-h-[24px]"
                >
                  {u('requestMeeting', locale)}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Short closing CTA; the full contact form lives on /contact */}
      <MeetingCta
        locale={locale}
        title={locale === 'fa' ? `درباره‌ی ${service.abbr} با ما صحبت کنید` : `Talk to us about ${service.abbr}`}
        body={
          locale === 'fa'
            ? 'در یک جلسه کوتاه بررسی می‌کنیم این راهکار به کار برند شما می‌آید یا نه.'
            : 'In one short meeting we check whether this solution fits your brand.'
        }
      />
    </>
  );
}
