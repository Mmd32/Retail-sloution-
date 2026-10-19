import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { u } from '@/content/ui';
import { vision, mission, philosophy, brand, coreBelief } from '@/content/site';
import { values } from '@/content/values';
import { formatNumber } from '@/lib/utils';
import { DependencyToggle } from '@/components/home/DependencyToggle';

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
            <p className="text-body mt-5 text-ink-muted">{philosophy.body[1][locale]}</p>
          </div>
        </div>
      </Section>

      {/* Vision and mission, side by side */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-line bg-white p-7">
            <Eyebrow>{u('vision', locale)}</Eyebrow>
            <p className="mt-4 text-h3 text-navy">{vision[locale]}</p>
          </div>
          <div className="rounded-card border border-line bg-white p-7">
            <Eyebrow>{u('mission', locale)}</Eyebrow>
            <p className="mt-4 text-h3 text-navy">{mission[locale]}</p>
          </div>
        </div>
      </Section>

      {/* The shift — moved here from the homepage */}
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

      {/* Pillars and values, one band */}
      <Section>
        <SectionHeader
          eyebrow={u('values', locale)}
          title={locale === 'fa' ? 'ستون‌ها و ارزش‌های ما' : 'Our pillars and values'}
        />
        <ol className="stack-header grid grid-cols-2 gap-3 md:grid-cols-4">
          {brand.pillars.map((p, i) => (
            <li key={i} className="flex items-baseline gap-3 rounded-card border border-line bg-white px-5 py-4">
              <span className="font-display text-label font-bold text-functional">{formatNumber(0, locale)}{formatNumber(i + 1, locale)}</span>
              <span className="text-h3 text-navy">{p[locale]}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <div key={v.key} className="bg-surface p-6">
              <h3 className="text-h3 text-navy">{v.name[locale]}</h3>
              <p className="mt-2 text-label text-ink-muted">{v.description[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
