import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { engagementIntro, engagementStages } from '@/content/methodology';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/engagement',
    title: locale === 'fa' ? 'مدل همکاری' : 'Engagement Model',
    description: engagementIntro.intro[locale],
  });
}

export default function EngagementPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'مدل همکاری' : 'Engagement Model' }]}
        eyebrow={engagementIntro.eyebrow[locale]}
        title={engagementIntro.title[locale]}
        intro={engagementIntro.intro[locale]}
      />

      <Section>
        <div className="relative">
          {/* connecting line */}
          <div className="absolute inset-y-0 start-6 hidden w-px bg-line md:block" aria-hidden />
          <ol className="space-y-6">
            {engagementStages.map((stage, i) => (
              <li key={stage.key} className="relative flex gap-6">
                <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">
                  {i + 1}
                </span>
                <div className="flex-1 rounded-lg border border-line bg-white p-6">
                  <h2 className="text-h3 text-navy">{stage.name[locale]}</h2>
                  <p className="mt-2 leading-relaxed text-ink-muted">{stage.description[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 rounded-lg border border-line bg-surface-muted p-6 text-sm text-ink-muted">
          {locale === 'fa'
            ? 'توجه: «مدل همکاری» مسیر شروع و ادامه‌ی همکاری از دید شماست، در حالی که «متدولوژی» توصیف می‌کند ریتیل سلوشنز چگونه مسئله را حل می‌کند. این دو فرآیند مکمل یکدیگرند اما یکسان نیستند.'
            : 'Note: the engagement model is your journey of starting and continuing a collaboration, while the methodology describes how Retail Solutions solves the problem. The two are complementary but not the same process.'}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
