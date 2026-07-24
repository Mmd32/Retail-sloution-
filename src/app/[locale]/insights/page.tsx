import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { InsightArchive } from '@/components/insights/InsightArchive';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/insights',
    title: locale === 'fa' ? 'بینش‌ها' : 'Insights',
    description:
      locale === 'fa'
        ? 'مقاله‌ها، راهنماها و گزارش‌های ریتیل سلوشنز درباره‌ی استراتژی، عملیات، تجربه مشتری، فرانچایز و رهبری در صنعت ریتیل.'
        : 'Articles, guides, and reports from Retail Solutions on strategy, operations, customer experience, franchise, and leadership in retail.',
  });
}

export default function InsightsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { topic?: string; type?: string };
}) {
  const locale = params.locale as Locale;
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'بینش‌ها' : 'Insights' }]}
        eyebrow={locale === 'fa' ? 'بینش‌ها' : 'Insights'}
        title={locale === 'fa' ? 'بینش و رهبری فکری در ریتیل' : 'Insight and thought leadership in retail'}
        intro={
          locale === 'fa'
            ? 'دیدگاه‌های ریتیل سلوشنز درباره‌ی ساختن سازمان‌های سیستم‌محور، داده‌محور و مقیاس‌پذیر.'
            : 'Retail Solutions’ perspectives on building system-driven, data-driven, and scalable organizations.'
        }
      />
      <Section>
        <InsightArchive locale={locale} initialTopic={searchParams.topic} initialType={searchParams.type} />
      </Section>
      <MeetingCta locale={locale} />
    </>
  );
}
