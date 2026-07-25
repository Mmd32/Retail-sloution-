import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Monogram } from '@/components/ui/Monogram';
import { team, teamIntro } from '@/content/team';
import { poweredByNovark } from '@/content/site';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/team',
    title: locale === 'fa' ? 'تیم' : 'Team',
    description: teamIntro.intro[locale],
  });
}

export default function TeamPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const members = team.filter((m) => m.active).sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'تیم' : 'Team' }]}
        eyebrow={teamIntro.eyebrow[locale]}
        title={teamIntro.title[locale]}
        intro={teamIntro.intro[locale]}
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <div key={m.slug} className="overflow-hidden rounded-lg border border-line bg-white">
              {/* Portrait: real image if provided via CMS, otherwise a monogram — never stock. */}
              {m.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.portrait} alt={m.name[locale]} className="aspect-[4/5] w-full object-cover" />
              ) : (
                <Monogram name={m.name.en} className="aspect-[4/5] w-full" />
              )}
              <div className="p-6">
                <h2 className="text-h3 text-navy">{m.name[locale]}</h2>
                <p className="mt-1 text-sm text-ink-muted">{m.role[locale]}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-ink-faint">
          {locale === 'fa'
            ? 'تصاویر پرتره‌ی نهایی و اطلاعات تکمیلی اعضای تیم از طریق سیستم مدیریت محتوا و پیش از انتشار نهایی تکمیل می‌شوند.'
            : 'Final team portraits and additional member details are completed through the content management system before final publication.'}
        </p>

        {poweredByNovark.show && (
          <p className="mt-4 text-sm text-ink-faint">{poweredByNovark.label[locale]}</p>
        )}
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
