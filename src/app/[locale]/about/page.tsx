import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { u } from '@/content/ui';
import { vision, mission, philosophy, brand, coreBelief } from '@/content/site';
import { values } from '@/content/values';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/about',
    title: locale === 'fa' ? 'درباره ما' : 'About',
    description:
      locale === 'fa'
        ? 'چشم‌انداز، مأموریت، فلسفه و ارزش‌های ریتیل سلوشنز؛ شریک تحول سازمانی صنعت ریتیل.'
        : 'Vision, mission, philosophy, and values of Retail Solutions — the organizational transformation partner for retail.',
  });
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'درباره ما' : 'About' }]}
        eyebrow={brand.descriptor[locale]}
        title={locale === 'fa' ? 'شریک تحول سازمانی صنعت ریتیل' : 'The transformation partner for retail organizations'}
        intro={coreBelief.support[locale]}
      />

      {/* Philosophy — the hero states the positioning, this states the argument. */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{u('ourPhilosophy', locale)}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="text-h2 text-navy">{philosophy.body[0][locale]}</p>
            <p className="text-lead mt-5 text-ink-muted">{philosophy.body[1][locale]}</p>
          </div>
        </div>
      </Section>

      {/* Vision — displayed as a full-width statement, not a small card */}
      <Section tone="navy">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow onDark>{u('vision', locale)}</Eyebrow>
          <p className="mt-6 text-h2 text-white">
            {vision[locale]}
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{u('mission', locale)}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="text-h2 text-navy">{mission[locale]}</p>
          </div>
        </div>
      </Section>

      {/* Strategic pillars */}
      <Section tone="muted">
        <SectionHeader
          eyebrow={locale === 'fa' ? 'ستون‌های راهبردی' : 'Strategic Pillars'}
          title={locale === 'fa' ? 'چهار ستونی که سازمان‌های ماندگار بر آن‌ها ساخته می‌شوند' : 'The four pillars enduring organizations are built on'}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brand.pillars.map((p, i) => (
            <div key={i} className="rounded-lg border border-line bg-white p-6">
              <span className="font-display text-3xl font-bold text-accent-500">0{i + 1}</span>
              <p className="mt-3 text-h3 text-navy">{p[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader eyebrow={u('values', locale)} title={locale === 'fa' ? 'ارزش‌های ما' : 'Our values'} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <div key={v.key} className="bg-surface p-6">
              <h3 className="text-h3 text-navy">{v.name[locale]}</h3>
              <p className="mt-2 text-small text-ink-muted">{v.description[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
