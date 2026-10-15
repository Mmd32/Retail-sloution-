import type { Metadata } from 'next';
import { Mail, Globe, Linkedin } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section, SectionHeader, Eyebrow } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LogoMark } from '@/components/layout/Logo';
import { PrintButton } from '@/components/shared/PrintButton';
import { MeetingCta } from '@/components/shared/MeetingCta';
import { brand, coreBelief, philosophy, vision, mission, contact } from '@/content/site';
import { capabilities } from '@/content/capabilities';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { phases } from '@/content/methodology';
import { values } from '@/content/values';

const t = {
  title: { fa: 'پروفایل شرکت', en: 'Company Profile' },
  download: { fa: 'دانلود PDF', en: 'Download PDF' },
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/company-profile',
    title: t.title[locale],
    description:
      locale === 'fa'
        ? 'پروفایل ریتیل سلوشنز: چشم‌انداز، مأموریت، خدمات، راهکارهای اختصاصی، صنایع و شیوه همکاری.'
        : 'The Retail Solutions profile: vision, mission, services, proprietary solutions, industries and how we work.',
  });
}

/**
 * Company profile — the whole company on one page, laid out as a document so
 * it reads top to bottom and prints cleanly (header, footer and CTA hide in
 * print; the browser's "Save as PDF" produces the downloadable profile).
 */
export default function CompanyProfilePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <div className="print:hidden">
        <Breadcrumbs locale={locale} items={[{ label: t.title[locale] }]} />
      </div>

      {/* Cover */}
      <section className="rs-blueprint bg-navy print:flex print:min-h-[297mm] print:break-after-page print:items-center">
        <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LogoMark variant="reverse" className="h-28 w-[137px] md:h-32 md:w-[156px]" />
            <span className="eyebrow eyebrow-on-dark mt-6 flex">{t.title[locale]}</span>
            <h1 className="text-h1 mt-3 max-w-[24ch] text-white">{coreBelief.headline[locale]}</h1>
            <p className="text-body mt-5 max-w-reading text-navy-200">{brand.descriptor[locale]}</p>
            <div className="mt-8">
              <PrintButton label={t.download[locale]} onDark />
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Who we are */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>01 · {locale === 'fa' ? 'ما که هستیم' : 'Who we are'}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="text-h3 text-navy">{philosophy.body[0][locale]}</p>
            <p className="text-body mt-5 text-ink-muted">{philosophy.body[1][locale]}</p>
            <dl className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-card border border-line bg-white p-6">
                <dt className="eyebrow">{locale === 'fa' ? 'چشم‌انداز' : 'Vision'}</dt>
                <dd className="text-label mt-3 text-navy">{vision[locale]}</dd>
              </div>
              <div className="rounded-card border border-line bg-white p-6">
                <dt className="eyebrow">{locale === 'fa' ? 'مأموریت' : 'Mission'}</dt>
                <dd className="text-label mt-3 text-navy">{mission[locale]}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* 02 — Services */}
      <Section>
        <SectionHeader
          eyebrow={`02 · ${locale === 'fa' ? 'خدمات' : 'Services'}`}
          title={locale === 'fa' ? 'شش حوزه تخصصی، یک سیستم یکپارچه' : 'Six areas of expertise, one integrated system'}
        />
        <div className="stack-header grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <div key={c.slug} className="bg-white p-6">
              <span className="font-display text-label font-bold text-functional">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 mt-2 text-navy">{c.title[locale]}</h3>
              <p className="text-label mt-2 text-ink-muted">{c.description[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 — Proprietary solutions */}
      <Section>
        <SectionHeader
          eyebrow={`03 · ${locale === 'fa' ? 'راهکارهای اختصاصی' : 'Proprietary solutions'}`}
          title={locale === 'fa' ? 'سه راهکار آماده برای چالش‌های رایج رشد' : 'Three ready solutions for common growth challenges'}
        />
        <div className="stack-header divide-y divide-line border-y border-line">
          {services.map((s) => (
            <div key={s.slug} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="font-display text-h3 font-bold text-navy">{s.abbr}</p>
                <p className="text-label mt-1 text-ink-muted">{s.fullName[locale]}</p>
              </div>
              <p className="text-body text-ink md:col-span-8">{s.proposition[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Industries */}
      <Section>
        <SectionHeader
          eyebrow={`04 · ${locale === 'fa' ? 'صنایع' : 'Industries'}`}
          title={locale === 'fa' ? 'صنایعی که در آن‌ها تخصص داریم' : 'Industries we specialise in'}
        />
        <ul className="stack-header flex flex-wrap gap-3">
          {industries.map((ind) => (
            <li
              key={ind.slug}
              className="rounded-full border border-line-strong bg-white px-5 py-2 text-label font-semibold text-navy"
            >
              {ind.name[locale]}
            </li>
          ))}
        </ul>
      </Section>

      {/* 05 — How we work */}
      <Section>
        <SectionHeader
          eyebrow={`05 · ${locale === 'fa' ? 'شیوه همکاری' : 'How we work'}`}
          title={locale === 'fa' ? 'پنج مرحله، از شناخت تا توسعه مستمر' : 'Five stages, from discovery to continuous development'}
        />
        <ol className="stack-header grid gap-6 md:grid-cols-5">
          {phases.map((p, i) => (
            <li key={p.key} className="border-t-2 border-cyan pt-4">
              <span className="font-display text-label font-bold text-functional">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 mt-1 text-navy">{p.name[locale]}</h3>
              <p className="text-label mt-2 text-ink-muted">{p.objective[locale]}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 — Values */}
      <Section>
        <SectionHeader
          eyebrow={`06 · ${locale === 'fa' ? 'ارزش‌ها' : 'Values'}`}
          title={locale === 'fa' ? 'اصولی که به آن پایبندیم' : 'The principles we hold to'}
        />
        <div className="stack-header grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <div key={v.key} className="bg-white p-6">
              <h3 className="text-h3 text-navy">{v.name[locale]}</h3>
              <p className="text-label mt-2 text-ink-muted">{v.description[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 — Contact */}
      <Section>
        <SectionHeader
          eyebrow={`07 · ${locale === 'fa' ? 'ارتباط با ما' : 'Contact'}`}
          title={locale === 'fa' ? 'با هم بسازیم' : 'Let’s build together'}
        />
        <ul className="stack-header flex flex-wrap gap-x-10 gap-y-4 text-body text-navy">
          <li className="inline-flex items-center gap-2">
            <Mail className="h-5 w-5 text-functional" aria-hidden />
            <a href={`mailto:${contact.email}`} dir="ltr" className="hover:text-functional">
              {contact.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <Globe className="h-5 w-5 text-functional" aria-hidden />
            <span dir="ltr">{contact.website}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-functional" aria-hidden />
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-functional">
              LinkedIn
            </a>
          </li>
        </ul>
      </Section>

      <div className="print:hidden">
        <MeetingCta locale={locale} />
      </div>
    </>
  );
}
