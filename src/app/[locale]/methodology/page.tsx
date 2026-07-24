import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { MethodologyExplorer } from '@/components/methodology/MethodologyExplorer';
import { methodologyIntro } from '@/content/methodology';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/methodology',
    title: locale === 'fa' ? 'متدولوژی' : 'Methodology',
    description: methodologyIntro.intro[locale],
  });
}

export default function MethodologyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'متدولوژی' : 'Methodology' }]}
        eyebrow={methodologyIntro.eyebrow[locale]}
        title={methodologyIntro.title[locale]}
        intro={methodologyIntro.intro[locale]}
      />
      <Section>
        <MethodologyExplorer locale={locale} />
        <p className="mt-8 text-center text-sm text-ink-faint">
          {locale === 'fa'
            ? 'مدت‌زمان هر مرحله متناسب با دامنه و پیچیدگی هر پروژه تعیین می‌شود.'
            : 'The duration of each phase is set according to the scope and complexity of each project.'}
        </p>
      </Section>
      <MeetingCta locale={locale} />
    </>
  );
}
