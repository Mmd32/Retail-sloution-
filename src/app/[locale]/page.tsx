import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ArrowLink } from '@/components/ui/ArrowLink';

import { Hero } from '@/components/home/Hero';
import { TrustLayer } from '@/components/home/TrustLayer';
import { GrowthRisks } from '@/components/home/GrowthRisks';
import { DependencyToggle } from '@/components/home/DependencyToggle';
import { AssessmentTeaser } from '@/components/home/AssessmentTeaser';
import { CaseStudyCard } from '@/components/cases/CaseStudyCard';
import { InsightCard } from '@/components/insights/InsightCard';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Reveal } from '@/components/ui/Reveal';

import { u } from '@/content/ui';
import { industryProblem } from '@/content/site';
import { services, retailTransformation } from '@/content/services';
import { insights } from '@/content/insights';
import { caseStudies, caseStudiesMeta } from '@/content/caseStudies';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/',
    title:
      locale === 'fa'
        ? 'ریتیل سلوشنز — ساختن سازمان‌های ماندگار در صنعت ریتیل'
        : 'Retail Solutions — Building Enduring Retail Organizations',
    description:
      locale === 'fa'
        ? 'ریتیل سلوشنز سیستم‌های مدیریتی و اجرایی طراحی می‌کند که رشد برندهای ریتیل را از وابستگی به افراد به سازمانی سیستم‌محور و مقیاس‌پذیر منتقل می‌کند.'
        : 'Retail Solutions designs the management and execution systems that move retail brands from dependency on individuals to a system-driven, scalable organization.',
  });
}

/**
 * Homepage composition.
 *
 * Kept deliberately short: navy hero → seven light bands that alternate
 * white ↔ nude by position → navy CTA. The deeper material (capability map,
 * engagement model, methodology stages, industries) lives on its own pages
 * and stays one click away in the header.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  const featured = insights.slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <Hero locale={locale} />

      {/* 2 — Trust layer */}
      <TrustLayer locale={locale} />

      {/* 3 — Growth risks (card grid #1 of 3) */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'چالش‌های مرحله رشد' : 'Growth-Stage Challenges'}
          title={industryProblem.headline[locale]}
        />
        <GrowthRisks locale={locale} />
      </Section>

      {/* 4 — Person-dependent vs system-driven. The core argument, made
             interactive. */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'مسیر تحول' : 'The Shift'}
          title={
            locale === 'fa'
              ? 'از سازمان وابسته به افراد، تا سازمان متکی بر سیستم'
              : 'From depending on people to running on a system'
          }
          intro={
            locale === 'fa'
              ? 'نیروها همان‌اند؛ تفاوت در این است که تصمیم‌ها، دانش و کیفیت به چند نفر وابسته باشد یا به سیستمی که همه از آن پیروی می‌کنند. ما این مسیر را همراه شما طی می‌کنیم.'
              : 'The people stay the same. The difference is whether decisions, knowledge and quality depend on a few individuals or on a system everyone follows. We take that path with you.'
          }
        />
        <div className="stack-header">
          <DependencyToggle locale={locale} />
        </div>
      </Section>

      {/* 5 — Solutions, outcome first (§8). The practical framing leads; the
             proprietary abbreviation follows as a label, not a puzzle. */}
      <Section>
        <SectionHeader
          eyebrow={retailTransformation.title[locale]}
          title={retailTransformation.positioning[locale]}
          intro={retailTransformation.intro[locale]}
        />
        <div className="stack-header divide-y divide-line border-y border-line">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={localePath(locale, `/solutions/${s.slug}`)}
              className="group grid gap-4 py-8 transition-colors duration-standard ease-standard hover:bg-surface-muted md:grid-cols-12 md:gap-8 md:px-4"
            >
              <div className="md:col-span-4">
                <h3 className="text-h3 text-navy group-hover:text-functional">
                  {s.eyebrow[locale]}
                </h3>
                <p className="mt-2 font-display text-label font-bold tracking-wide text-functional">
                  {s.abbr}
                </p>
                <p className="text-label mt-1 text-ink-faint">{s.fullName[locale]}</p>
              </div>
              <div className="md:col-span-6">
                <p className="text-body text-ink-muted">{s.proposition[locale]}</p>
              </div>
              <div className="flex items-start md:col-span-2 md:justify-end">
                <span className="inline-flex items-center gap-2 text-label font-semibold text-functional">
                  {u('learnMore', locale)}
                  <Arrow
                    className="h-4 w-4 transition-transform duration-standard ease-standard group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6 — Results, before the methodology explanation (§9).
             Card grid #2 of 3. */}
      <Section>
        <SectionHeader
          eyebrow={caseStudiesMeta.eyebrow[locale]}
          title={caseStudiesMeta.title[locale]}
          intro={caseStudiesMeta.intro[locale]}
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80} className="h-full">
              <CaseStudyCard study={study} locale={locale} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href={localePath(locale, '/case-studies')} locale={locale}>
            {u('viewAll', locale)}
          </ArrowLink>
        </div>
      </Section>

      {/* 7 — The assessment, startable here (§14) */}
      <Section>
        <AssessmentTeaser locale={locale} />
      </Section>

      {/* 8 — Insights (card grid #3 of 3) */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'بینش‌ها' : 'Insights'}
          title={locale === 'fa' ? 'بینش‌های منتخب' : 'Selected insights'}
        />
        <div className="stack-header grid gap-6 md:grid-cols-3">
          {featured.map((n, i) => (
            <Reveal key={n.slug} delay={i * 80} className="h-full">
              <InsightCard insight={n} locale={locale} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href={localePath(locale, '/insights')} locale={locale}>
            {u('viewAll', locale)}
          </ArrowLink>
        </div>
      </Section>

      {/* 9 — Final CTA */}
      <MeetingCta locale={locale} />
    </>
  );
}
