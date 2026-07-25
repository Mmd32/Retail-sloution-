import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, Building2, Users, TrendingUp, Store, BarChart3 } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { capabilities } from '@/content/capabilities';
import { u } from '@/content/ui';

const icons = [Compass, Building2, Users, TrendingUp, Store, BarChart3];

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/capabilities',
    title: locale === 'fa' ? 'تخصص‌ها' : 'Capabilities',
    description:
      locale === 'fa'
        ? 'شش قابلیت یکپارچه که با هم یک سیستم تحول ریتیل را می‌سازند: استراتژی، عملیات، سرمایه انسانی، توسعه شعب، توسعه فروشگاه و تحلیل داده.'
        : 'Six integrated capabilities forming one retail transformation system: strategy, operations, people, expansion, store development, and analytics.',
  });
}

export default function CapabilitiesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'تخصص‌ها' : 'Capabilities' }]}
        eyebrow={locale === 'fa' ? 'یک سیستم یکپارچه' : 'One Integrated System'}
        title={locale === 'fa' ? 'شش قابلیت، یک سیستم تحول' : 'Six capabilities, one transformation system'}
        intro={
          locale === 'fa'
            ? 'این قابلیت‌ها محصولات مجزا نیستند؛ لایه‌های به‌هم‌پیوسته‌ی یک سیستم واحد هستند که سازمان را از وابستگی به افراد به‌سمت رشد سیستم‌محور هدایت می‌کنند.'
            : 'These are not separate products; they are interconnected layers of a single system that moves an organization from dependency on individuals toward system-driven growth.'
        }
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Link
                key={c.slug}
                href={localePath(locale, `/capabilities/${c.slug}`)}
                className="group flex gap-5 rounded-lg border border-line p-7 transition-colors hover:border-accent-300"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-accent-300">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">{c.name[locale]}</span>
                  <h2 className="mt-1 text-h3 text-navy group-hover:text-accent-700">{c.title[locale]}</h2>
                  <p className="mt-2 text-small text-ink-muted">{c.description[locale]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <MeetingCta locale={locale} />
    </>
  );
}
