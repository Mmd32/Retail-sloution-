import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Reveal } from '@/components/ui/Reveal';
import { CaseStudyCard } from '@/components/cases/CaseStudyCard';
import { caseStudies, caseStudiesMeta } from '@/content/caseStudies';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/case-studies',
    title: locale === 'fa' ? 'نتایج و مطالعات موردی' : 'Results & Case Studies',
    description: caseStudiesMeta.intro[locale],
  });
}

export default function CaseStudiesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: caseStudiesMeta.eyebrow[locale] }]}
        eyebrow={caseStudiesMeta.eyebrow[locale]}
        title={caseStudiesMeta.title[locale]}
        intro={caseStudiesMeta.intro[locale]}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80} className="h-full">
              <CaseStudyCard study={study} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
