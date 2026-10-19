import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Briefcase, ClipboardList, Newspaper } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/ui/Section';

import { Hero } from '@/components/home/Hero';
import { TrustLayer } from '@/components/home/TrustLayer';
import { GrowthRisks } from '@/components/home/GrowthRisks';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Reveal } from '@/components/ui/Reveal';

import { u } from '@/content/ui';
import { industryProblem } from '@/content/site';
import { services, retailTransformation } from '@/content/services';

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
 * Short on purpose: navy hero → stats → challenges → solutions → three
 * doorways into the rest of the site → navy CTA. The longer material (the
 * people-vs-system demo, projects, the assessment, insights) lives on its own
 * pages and is one click from here.
 */
const doorways = [
  {
    href: '/case-studies',
    icon: Briefcase,
    title: { fa: 'نمونه کارها', en: 'Selected work' },
    body: {
      fa: 'سه نمونه از چالش تا نتیجه، به‌صورت کوتاه.',
      en: 'Three examples, from challenge to result.',
    },
  },
  {
    href: '/assessment',
    icon: ClipboardList,
    title: { fa: 'ارزیابی آمادگی رشد', en: 'Growth readiness assessment' },
    body: {
      fa: 'در حدود ده دقیقه تصویری اولیه از وضعیت سازمانتان بگیرید.',
      en: 'About ten minutes for a first picture of where your organization stands.',
    },
  },
  {
    href: '/insights',
    icon: Newspaper,
    title: { fa: 'بینش‌ها', en: 'Insights' },
    body: {
      fa: 'مقاله و راهنما درباره رشد، ساختار و تصمیم‌گیری در ریتیل.',
      en: 'Articles and guides on retail growth, structure and decision-making.',
    },
  },
] as const;

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;

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

      {/* 5 — Three doorways into the rest of the site */}
      <Section>
        <ul className="grid gap-4 md:grid-cols-3">
          {doorways.map((d, i) => (
            <Reveal as="li" key={d.href} delay={i * 80} className="h-full">
              <Link
                href={localePath(locale, d.href)}
                className="group flex h-full items-start gap-4 rounded-card border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-standard ease-standard hover:-translate-y-1 hover:border-cyan hover:shadow-popover"
              >
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-navy-50 text-functional transition-colors duration-standard ease-standard group-hover:bg-functional group-hover:text-white"
                  aria-hidden
                >
                  <d.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-h3 text-navy">
                    {d.title[locale]}
                    <Arrow
                      className="h-4 w-4 shrink-0 text-functional transition-transform duration-standard ease-standard group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                  <span className="text-label mt-1 block text-ink-muted">{d.body[locale]}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 6 — Final CTA */}
      <MeetingCta locale={locale} />
    </>
  );
}
