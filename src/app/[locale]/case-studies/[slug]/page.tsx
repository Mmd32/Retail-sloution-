import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { caseStudies, getCaseStudy, caseStudiesMeta } from '@/content/caseStudies';

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((c) => ({ locale, slug: c.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return buildMetadata({
    locale,
    path: `/case-studies/${study.slug}`,
    title: study.challenge[locale],
    description: study.intervention[locale],
  });
}

export default function CaseStudyPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  /* The before → after spine. Presented as a sequence rather than a grid so
     the causal order is unmistakable. */
  const stages = [
    {
      label: locale === 'fa' ? 'وضعیت قبل' : 'Before',
      body: study.before[locale],
    },
    {
      label: locale === 'fa' ? 'مداخله ریتیل سلوشنز' : 'The intervention',
      body: study.intervention[locale],
    },
    {
      label: locale === 'fa' ? 'سیستم اجراشده' : 'The system delivered',
      body: study.system[locale],
    },
    {
      label: locale === 'fa' ? 'وضعیت بعد' : 'After',
      body: study.after[locale],
    },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[
          { label: caseStudiesMeta.eyebrow[locale], path: '/case-studies' },
          { label: study.client[locale] },
        ]}
        eyebrow={study.industry[locale]}
        title={study.challenge[locale]}
        intro={study.client[locale]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ol className="relative space-y-10 border-s border-line ps-8">
              {stages.map((s, i) => (
                <li key={s.label} className="relative">
                  <span
                    className="absolute -start-[2.3rem] top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-xs font-semibold text-functional"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h2 className="text-h3 text-navy">{s.label}</h2>
                  <p className="text-body mt-3 max-w-reading text-ink-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-line bg-surface-muted p-7 lg:sticky lg:top-28">
              <Eyebrow>{locale === 'fa' ? 'نتیجه' : 'Result'}</Eyebrow>
              <ul className="mt-4 space-y-4">
                {study.outcomes.map((o, i) => (
                  <li key={i} className="border-s-2 border-cyan ps-4">
                    {o.metric && (
                      <span className="block font-display text-h2 font-bold text-navy">
                        {o.metric}
                      </span>
                    )}
                    <span className="text-label text-ink-muted">{o.label[locale]}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-line pt-5">
                <ArrowLink href={localePath(locale, '/contact')} locale={locale}>
                  {locale === 'fa'
                    ? 'گفتگو درباره مسئله مشابه'
                    : 'Discuss a similar problem'}
                </ArrowLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
