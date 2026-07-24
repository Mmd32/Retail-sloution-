import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { AssessmentFlow } from '@/components/assessment/AssessmentFlow';
import { assessmentMeta } from '@/content/assessment';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/assessment',
    title: assessmentMeta.title[locale],
    description: assessmentMeta.intro[locale],
  });
}

export default function AssessmentPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: assessmentMeta.title[locale] }]}
        eyebrow={locale === 'fa' ? 'ابزار تشخیصی' : 'Diagnostic Tool'}
        title={assessmentMeta.title[locale]}
        intro={assessmentMeta.intro[locale]}
      />
      <div className="bg-surface-muted py-14 md:py-20">
        <div className="container-x">
          <AssessmentFlow locale={locale} />
        </div>
      </div>
    </>
  );
}
