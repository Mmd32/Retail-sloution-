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
import { industryProblem } from '@/content/site';
import { GrowthRisks } from '@/components/home/GrowthRisks';
import { DependencyToggle } from '@/components/home/DependencyToggle';
import { WhatWeDo } from '@/components/shared/WhatWeDo';
import { whatWeDoMeta } from '@/content/whatWeDo';

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
        eyebrow={locale === 'fa' ? 'راهکارها' : 'Solutions'}
        title={locale === 'fa' ? 'هر آنچه ریتیل شما برای بهتر فروختن لازم دارد.' : 'Everything your retail needs to perform.'}
        intro={
          locale === 'fa'
            ? 'پنج حوزه خدمت؛ از اولین ممیزی فروشگاه تا ویترین.'
            : 'Five service lines, from the first store audit to the shop window.'
        }
      />

      {/* What we do — the five service lines with their full scope. */}
      <Section id="what-we-do">
        <SectionHeader eyebrow={whatWeDoMeta.eyebrow[locale]} title={whatWeDoMeta.title[locale]} />
        <div className="stack-header">
          <WhatWeDo locale={locale} variant="full" />
        </div>
      </Section>

      {/* The challenges, in full — linked from the homepage (#challenges). */}
      <Section id="challenges">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'دغدغه‌ها' : 'Challenges'}
          title={industryProblem.headline[locale]}
          intro={
            locale === 'fa'
              ? 'بیشتر برندهایی که با ما کار می‌کنند، دقیقاً از یکی از همین نقطه‌ها شروع کرده‌اند.'
              : 'Most brands we work with started from exactly one of these.'
          }
        />
        <GrowthRisks locale={locale} />
      </Section>

      {/* The shift, made interactive. */}
      <Section id="shift">
        <SectionHeader
          title={locale === 'fa' ? 'از «همه‌چیز با من» تا «سیستم خودش می‌چرخد»' : 'From “it all runs through me” to “the system handles it”'}
          intro={
            locale === 'fa'
              ? 'آدم‌ها همان آدم‌ها هستند. فرقش این است که کار به چند نفر بند باشد، یا به روشی که همه بلدند. دو حالت را خودتان مقایسه کنید:'
              : 'Same people. The difference is whether the work hangs on a few of them, or on a way of working everyone knows. Compare the two for yourself:'
          }
        />
        <div className="stack-header">
          <DependencyToggle locale={locale} />
        </div>
      </Section>

      <Section id="methodologies">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'راهکارهای ساختاریافته' : 'Structured solutions'}
          title={retailTransformation.positioning[locale]}
        />
        <div className="mt-12 space-y-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={localePath(locale, `/solutions/${s.slug}`)}
              className="group grid gap-6 rounded-card border border-line p-8 transition-colors hover:border-cyan-300 md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-functional">{s.eyebrow[locale]}</span>
                <p className="mt-2 num text-3xl font-medium text-ink">{s.abbr}</p>
                <p className="text-sm font-medium text-ink">{s.fullName[locale]}</p>
              </div>
              <div className="md:col-span-8">
                <p className="leading-relaxed text-ink-muted">{s.proposition[locale]}</p>
              </div>
              <div className="md:col-span-1 md:text-end">
                <Arrow className="h-6 w-6 text-functional transition-transform group-hover:translate-x-0" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'تخصص‌های پشتیبان' : 'Underlying capabilities'}
          title={locale === 'fa' ? 'راهکارها بر پایه‌ی شش قابلیت یکپارچه' : 'Solutions built on six integrated capabilities'}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Link
              key={c.slug}
              href={localePath(locale, `/capabilities/${c.slug}`)}
              className="rounded-card border border-line bg-surface p-6 transition-colors hover:border-cyan-300"
            >
              <h3 className="font-semibold text-ink">{c.title[locale]}</h3>
              <p className="mt-2 text-label text-ink-muted">{c.description[locale]}</p>
            </Link>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
