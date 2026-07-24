import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Building2,
  Users,
  TrendingUp,
  Store,
  BarChart3,
} from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader, Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { HeroVisual } from '@/components/home/HeroVisual';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { u } from '@/content/ui';
import {
  coreBelief,
  industryProblem,
  philosophy,
  differentiation,
  brand,
} from '@/content/site';
import { services, retailTransformation } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { phases, methodologyIntro } from '@/content/methodology';
import { insights } from '@/content/insights';
import { team } from '@/content/team';
import { assessmentMeta } from '@/content/assessment';
import { Monogram } from '@/components/ui/Monogram';
import { formatDate } from '@/lib/utils';

const capIcons = [Compass, Building2, Users, TrendingUp, Store, BarChart3];

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
        ? 'ریتیل سلوشنز به برندهای ریتیل کمک می‌کند از وابستگی به افراد عبور کنند و به سازمانی سیستم‌محور، داده‌محور و مقیاس‌پذیر تبدیل شوند.'
        : 'Retail Solutions helps retail brands move beyond dependency on individuals toward system-driven, data-driven, and scalable organizations.',
  });
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  const featured = insights.slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden border-b border-line bg-surface-muted">
        <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{brand.descriptor[locale]}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-[3.4rem]">
              {coreBelief.headline[locale]}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {locale === 'fa'
                ? 'ریتیل سلوشنز به برندهای ریتیل کمک می‌کند با طراحی استراتژی، سیستم‌های مدیریتی، قابلیت‌های سازمانی و سازوکارهای اجرایی، از وابستگی به افراد عبور کنند و برای رشد حرفه‌ای و مقیاس‌پذیر آماده شوند.'
                : 'Retail Solutions helps retail brands move beyond dependency on individuals by designing strategies, management systems, organizational capabilities, and execution mechanisms required for professional and scalable growth.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={localePath(locale, '/contact')} size="lg">
                {u('requestMeeting', locale)}
              </ButtonLink>
              <ButtonLink href={localePath(locale, '/assessment')} size="lg" variant="secondary">
                {u('assessBusiness', locale)}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2 — Industry problem */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'مسئله صنعت' : 'The Industry Problem'}
          title={industryProblem.headline[locale]}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {industryProblem.problems.map((p, i) => (
            <Reveal key={i} delay={i * 0.05} className="bg-surface p-6">
              <AlertTriangle className="h-6 w-6 text-accent-600" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-navy">{p.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body[locale]}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — From person-dependent to system-driven */}
      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow onDark>{locale === 'fa' ? 'انتقال بنیادین' : 'The Core Shift'}</Eyebrow>
            <p className="mt-5 text-2xl font-semibold leading-snug text-white md:text-3xl">
              {coreBelief.support[locale]}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy-300">
                {locale === 'fa' ? 'از' : 'From'}
              </p>
              <p className="mt-2 text-lg font-medium text-navy-100">
                {locale === 'fa' ? 'مدیریت فردمحور' : 'Person-dependent management'}
              </p>
            </div>
            <div className="rounded-lg border border-accent-500/40 bg-accent-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent-300">
                {locale === 'fa' ? 'به' : 'To'}
              </p>
              <p className="mt-2 text-lg font-medium text-white">
                {locale === 'fa' ? 'سازمان سیستم‌محور و داده‌محور' : 'A system-driven, data-driven organization'}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4 — Philosophy */}
      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{u('ourPhilosophy', locale)}</Eyebrow>
          <div className="mt-6 space-y-6">
            {philosophy.body.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-2xl font-medium leading-snug text-navy' : 'text-lg leading-relaxed text-ink-muted'}>
                {p[locale]}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 5 — Three structured solutions */}
      <Section>
        <SectionHeader
          eyebrow={retailTransformation.title[locale]}
          title={retailTransformation.positioning[locale]}
          intro={retailTransformation.intro[locale]}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={localePath(locale, `/solutions/${s.slug}`)}
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-accent-300"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-accent-600">{s.eyebrow[locale]}</span>
                <span className="mt-3 font-display text-2xl font-bold text-navy">{s.abbr}</span>
                <span className="text-sm font-medium text-ink">{s.fullName[locale]}</span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{s.proposition[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700">
                  {u('learnMore', locale)}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — Integrated capabilities */}
      <Section tone="muted">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'یک سیستم یکپارچه' : 'One Integrated System'}
          title={locale === 'fa' ? 'شش قابلیت، یک سیستم تحول' : 'Six capabilities, one transformation system'}
          intro={
            locale === 'fa'
              ? 'قابلیت‌ها محصولات مجزا نیستند؛ لایه‌های به‌هم‌پیوسته‌ی یک سیستم واحد برای عبور از وابستگی به افراد هستند.'
              : 'The capabilities are not separate products; they are interconnected layers of a single system for moving beyond dependency on individuals.'
          }
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = capIcons[i % capIcons.length];
            return (
              <Link
                key={c.slug}
                href={localePath(locale, `/capabilities/${c.slug}`)}
                className="group bg-surface p-7 transition-colors hover:bg-surface-muted"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-accent-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy group-hover:text-accent-700">{c.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.description[locale]}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* 7 — Differentiation */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'تفاوت ما' : 'What Makes Us Different'}
          title={differentiation.headline[locale]}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface-muted p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {differentiation.traditional.label[locale]}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-navy">{differentiation.traditional.headline[locale]}</h3>
            <p className="mt-4 leading-relaxed text-ink-muted">{differentiation.traditional.body[locale]}</p>
          </div>
          <div className="rounded-lg border-2 border-accent-300 bg-white p-8 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
              {differentiation.retailSolutions.label[locale]}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-navy">{differentiation.retailSolutions.headline[locale]}</h3>
            <p className="mt-4 leading-relaxed text-ink-muted">{differentiation.retailSolutions.body[locale]}</p>
          </div>
        </div>
      </Section>

      {/* 8 — Methodology */}
      <Section tone="navy">
        <SectionHeader
          onDark
          eyebrow={methodologyIntro.eyebrow[locale]}
          title={methodologyIntro.title[locale]}
          intro={methodologyIntro.intro[locale]}
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {phases.map((p, i) => (
            <li key={p.key} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <span className="text-sm font-semibold text-accent-300">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{p.name[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200 line-clamp-4">{p.objective[locale]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ArrowLink href={localePath(locale, '/methodology')} locale={locale} onDark>
            {locale === 'fa' ? 'مشاهده متدولوژی کامل' : 'Explore the full methodology'}
          </ArrowLink>
        </div>
      </Section>

      {/* 9 — Industries */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fa' ? 'صنایع' : 'Industries'}
          title={locale === 'fa' ? 'تمرکز بر صنایع ریتیل' : 'Focused on retail industries'}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={localePath(locale, `/industries/${i.slug}`)}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-accent-400 hover:text-accent-700"
            >
              {i.name[locale]}
            </Link>
          ))}
        </div>
      </Section>

      {/* 10 — Retail Growth Assessment */}
      <Section tone="muted">
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <Eyebrow>{locale === 'fa' ? 'ابزار تشخیصی' : 'Diagnostic Tool'}</Eyebrow>
              <h2 className="mt-4 text-2xl font-bold text-navy md:text-3xl">{assessmentMeta.title[locale]}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{assessmentMeta.intro[locale]}</p>
              <div className="mt-6">
                <ButtonLink href={localePath(locale, '/assessment')} size="lg">
                  {u('startAssessment', locale)}
                </ButtonLink>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {[
                locale === 'fa' ? 'وابستگی به مالک' : 'Owner dependency',
                locale === 'fa' ? 'استانداردسازی عملیات' : 'Operational standards',
                locale === 'fa' ? 'داده و تحلیل' : 'Data & analytics',
                locale === 'fa' ? 'آمادگی توسعه شعب' : 'Expansion readiness',
                locale === 'fa' ? 'آمادگی فرانچایز' : 'Franchise readiness',
                locale === 'fa' ? 'یکپارچگی تجربه مشتری' : 'Experience consistency',
              ].map((label) => (
                <li key={label} className="flex items-center gap-2 rounded border border-line bg-surface-muted px-3 py-2.5 text-ink">
                  <Check className="h-4 w-4 shrink-0 text-accent-600" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 11 — Selected insights */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow={locale === 'fa' ? 'بینش‌ها' : 'Insights'} title={locale === 'fa' ? 'بینش‌های منتخب' : 'Selected insights'} />
          <ArrowLink href={localePath(locale, '/insights')} locale={locale}>
            {u('viewAll', locale)}
          </ArrowLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((n) => (
            <Link
              key={n.slug}
              href={localePath(locale, `/insights/${n.slug}`)}
              className="group flex h-full flex-col rounded-lg border border-line p-6 transition-colors hover:border-accent-300"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">{n.topic[locale]}</span>
              <h3 className="mt-3 text-lg font-semibold text-navy group-hover:text-accent-700">{n.title[locale]}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">{n.summary[locale]}</p>
              <span className="mt-4 text-xs text-ink-faint">{formatDate(n.publishedAt, locale)}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 12 — Team */}
      <Section tone="muted">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow={locale === 'fa' ? 'تیم' : 'Team'} title={locale === 'fa' ? 'تیم ریتیل سلوشنز' : 'The Retail Solutions team'} />
          <ArrowLink href={localePath(locale, '/team')} locale={locale}>
            {u('viewAll', locale)}
          </ArrowLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.slug} className="overflow-hidden rounded-lg border border-line bg-white">
              <Monogram name={m.name.en} className="aspect-[4/3] w-full" />
              <div className="p-5">
                <h3 className="font-semibold text-navy">{m.name[locale]}</h3>
                <p className="mt-1 text-sm text-ink-muted">{m.role[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 13 — Final meeting CTA */}
      <MeetingCta locale={locale} />
    </>
  );
}
