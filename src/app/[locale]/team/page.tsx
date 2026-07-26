import type { Metadata } from 'next';
import Image from 'next/image';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { Monogram } from '@/components/ui/Monogram';
import { SampleNotice } from '@/components/ui/SampleBadge';
import { Linkedin } from 'lucide-react';
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
            <div key={m.slug} className="overflow-hidden rounded-card border border-line bg-white">
              {/* Portrait: real image if provided via CMS, otherwise a monogram — never stock. */}
              {m.portrait ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={m.portrait}
                    alt={m.name[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Monogram name={m.name.en} className="aspect-[4/5] w-full" />
              )}
              <div className="p-6">
                <h2 className="text-h3 text-navy">{m.name[locale]}</h2>
                <p className="text-label mt-1 text-ink-muted">{m.role[locale]}</p>
                {/* Optional fields render only when the CMS supplies them —
                    nothing below is invented when the data is absent (§16). */}
                {m.expertise && (
                  <p className="text-label mt-3 text-ink-muted">{m.expertise[locale]}</p>
                )}
                {m.highlight && (
                  <p className="text-label mt-3 border-t border-line pt-3 text-navy">
                    {m.highlight[locale]}
                  </p>
                )}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-label font-semibold text-functional lg:min-h-[24px]"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <SampleNotice locale={locale} className="mt-10 max-w-reading">
          {locale === 'fa'
            ? 'پرتره‌های اعضای تیم هنوز تأمین نشده‌اند و تا آن زمان مونوگرام حروف اول نمایش داده می‌شود. حوزه تخصص، دستاورد کلیدی و لینک لینکدین نیز فقط پس از تأیید داده واقعی نمایش داده می‌شوند — هیچ‌کدام ساخته نشده‌اند. پیش از انتشار نهایی، تصاویر باید با سبک، نور و کراپ یکسان تهیه شوند.'
            : 'Team portraits have not been supplied yet, so an initials monogram is shown in their place. Expertise, key highlight, and LinkedIn links appear only once real data is confirmed — none of them are invented. Before final publication, portraits should be shot with consistent style, lighting, and crop.'}
        </SampleNotice>

        {poweredByNovark.show && (
          <p className="mt-4 text-sm text-ink-faint">{poweredByNovark.label[locale]}</p>
        )}
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
