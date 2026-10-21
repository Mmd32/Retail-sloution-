import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section, Eyebrow } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { capabilities, getCapability } from '@/content/capabilities';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { u } from '@/content/ui';

export function generateStaticParams() {
  return locales.flatMap((locale) => capabilities.map((c) => ({ locale, slug: c.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  const cap = getCapability(params.slug);
  if (!cap) return {};
  return buildMetadata({
    locale,
    path: `/capabilities/${cap.slug}`,
    title: cap.title[locale],
    description: cap.description[locale],
  });
}

export default function CapabilityPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const cap = getCapability(params.slug);
  if (!cap) notFound();

  const relatedServices = services.filter((s) => s.relatedCapabilities.includes(cap.slug));
  const relatedIndustries = industries.filter((i) => i.relatedCapabilities.includes(cap.slug));

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[
          { label: locale === 'fa' ? 'تخصص‌ها' : 'Capabilities', path: '/capabilities' },
          { label: cap.title[locale] },
        ]}
        eyebrow={cap.name[locale]}
        title={cap.title[locale]}
        intro={cap.description[locale]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{u('overview', locale)}</Eyebrow>
            <p className="mt-4 text-xl leading-relaxed text-ink">{cap.detail[locale]}</p>

            {relatedServices.length > 0 && (
              <div className="mt-12">
                <h2 className="rule-accent text-h2 text-ink">{u('relatedSolutions', locale)}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={localePath(locale, `/solutions/${s.slug}`)}
                      className="rounded-card border border-line p-5 transition-colors hover:border-cyan-300"
                    >
                      <p className="font-display text-h3 text-ink">{s.abbr}</p>
                      <p className="mt-1 text-sm text-ink-muted">{s.fullName[locale]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-card border border-line p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-functional">
                {u('relatedIndustries', locale)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedIndustries.map((i) => (
                  <Link
                    key={i.slug}
                    href={localePath(locale, `/industries#${i.slug}`)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-label text-ink hover:border-cyan"
                  >
                    {i.name[locale]}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
