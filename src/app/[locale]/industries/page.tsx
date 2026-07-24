import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
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
        ? 'تمرکز ریتیل سلوشنز بر صنایع کلیدی ریتیل: پوشاک، کافه و رستوران، آرایشی و زیبایی، مبلمان و لوازم منزل، کالاهای تندگردش و لوازم الکترونیک.'
        : 'Retail Solutions’ focus on key retail industries: fashion, F&B, beauty, homeware, FMCG, and electronics.',
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
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((ind) => (
            <div key={ind.slug} className="flex flex-col rounded-lg border border-line p-7">
              <h2 className="text-xl font-semibold text-navy">{ind.name[locale]}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{ind.overview[locale]}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-accent-600">
                {u('commonChallenges', locale)}
              </p>
              <ul className="mt-2 space-y-1.5">
                {ind.challenges[locale].slice(0, 3).map((c, i) => (
                  <li key={i} className="text-sm text-ink-muted">• {c}</li>
                ))}
              </ul>
              <div className="mt-5">
                <ArrowLink href={localePath(locale, `/industries/${ind.slug}`)} locale={locale}>
                  {u('learnMore', locale)}
                </ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
