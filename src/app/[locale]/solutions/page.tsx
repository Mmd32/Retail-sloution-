import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section, SectionHeader } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { capabilities } from '@/content/capabilities';
import { services, retailTransformation } from '@/content/services';
import { u } from '@/content/ui';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/solutions',
    title: locale === 'fa' ? 'راهکارها' : 'Solutions',
    description: retailTransformation.intro[locale],
  });
}

export default function SolutionsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'راهکارها' : 'Solutions' }]}
        eyebrow={retailTransformation.eyebrow[locale]}
        title={retailTransformation.title[locale]}
        intro={retailTransformation.intro[locale]}
      />

      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'راهکارهای ساختاریافته' : 'Structured Solutions'}
          title={retailTransformation.positioning[locale]}
        />
        <div className="mt-12 space-y-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={localePath(locale, `/solutions/${s.slug}`)}
              className="group grid gap-6 rounded-lg border border-line p-8 transition-colors hover:border-accent-300 md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">{s.eyebrow[locale]}</span>
                <p className="mt-2 font-display text-3xl font-bold text-navy">{s.abbr}</p>
                <p className="text-sm font-medium text-ink">{s.fullName[locale]}</p>
              </div>
              <div className="md:col-span-8">
                <p className="leading-relaxed text-ink-muted">{s.proposition[locale]}</p>
              </div>
              <div className="md:col-span-1 md:text-end">
                <Arrow className="h-6 w-6 text-accent-600 transition-transform group-hover:translate-x-0" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'تخصص‌های پشتیبان' : 'Underlying Capabilities'}
          title={locale === 'fa' ? 'راهکارها بر پایه‌ی شش قابلیت یکپارچه' : 'Solutions built on six integrated capabilities'}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Link
              key={c.slug}
              href={localePath(locale, `/capabilities/${c.slug}`)}
              className="rounded-lg border border-line bg-white p-6 transition-colors hover:border-accent-300"
            >
              <h3 className="font-semibold text-navy">{c.title[locale]}</h3>
              <p className="mt-2 text-sm text-ink-muted">{c.description[locale]}</p>
            </Link>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
