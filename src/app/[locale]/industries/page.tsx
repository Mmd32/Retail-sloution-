import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Reveal } from '@/components/ui/Reveal';
import { IndustryIcon } from '@/components/ui/IndustryIcon';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { industries } from '@/content/industries';
import { u } from '@/content/ui';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/industries',
    title: locale === 'fa' ? 'صنایع' : 'Industries',
    description:
      locale === 'fa'
        ? 'تمرکز ریتیل سلوشنز بر صنایع کلیدی ریتیل: پوشاک، کیف و کفش، ساعت و جواهرات، FMCG، آرایشی، بهداشتی و زیبایی، الکترونیک و ورزشی.'
        : 'Retail Solutions’ focus on key retail industries: apparel, bags & footwear, watches & jewelry, FMCG, beauty & personal care, electronics, and sporting goods.',
  });
}

export default function IndustriesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'صنایع' : 'Industries' }]}
        eyebrow={locale === 'fa' ? 'صنایع' : 'Industries'}
        title={locale === 'fa' ? 'تمرکز بر صنایع ریتیل' : 'Focused on retail industries'}
        intro={
          locale === 'fa'
            ? 'هر صنعت ریتیل چالش‌های سازمانی و عملیاتی خاص خود را دارد. در ادامه، چالش‌های رایج هر حوزه آورده شده است.'
            : 'Each retail industry has its own organizational and operational challenges. Below are the common challenges in each.'
        }
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            // With seven industries the last card spans the full row on large
            // screens, so the grid ends square instead of with a lone card.
            const wide = industries.length % 3 === 1 && i === industries.length - 1;
            return (
              <Reveal
                key={ind.slug}
                delay={(i % 3) * 80}
                className={wide ? 'lg:col-span-3' : ''}
              >
              <div
                className={`group h-full flex flex-col rounded-card border border-line bg-white p-7 transition-shadow duration-standard ease-standard hover:shadow-card ${
                  wide ? 'lg:grid lg:grid-cols-2 lg:gap-x-10' : ''
                }`}
              >
                <div className="flex flex-col">
                  <IndustryIcon slug={ind.slug} />
                  <h2 className="text-h3 mt-5 text-navy">{ind.name[locale]}</h2>
                  <p className="mt-3 flex-1 text-body text-ink-muted">{ind.overview[locale]}</p>
                </div>
                <div className={`flex flex-col ${wide ? 'lg:justify-center lg:border-s lg:border-line lg:ps-10' : ''}`}>
                  <p className={`mt-5 text-xs font-semibold uppercase tracking-wide text-functional ${wide ? 'lg:mt-0' : ''}`}>
                    {u('commonChallenges', locale)}
                  </p>
                  <ul className="mt-2 flex-1 space-y-1.5">
                    {ind.challenges[locale].slice(0, 3).map((c, k) => (
                      <li key={k} className="text-sm text-ink-muted">• {c}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <ArrowLink href={localePath(locale, `/industries/${ind.slug}`)} locale={locale}>
                      {u('learnMore', locale)}
                    </ArrowLink>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
