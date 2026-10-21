import type { Metadata } from 'next';
import { isLocale, localeDirection, type Locale } from '@/i18n/config';
import { localePath, formatNumber } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { homeIntro, homeCopy, homeFigures, workItems } from '@/content/home';
import { HeroReel } from '@/components/studio/HeroReel';
import { Marquee } from '@/components/studio/Marquee';
import { WorkGrid } from '@/components/studio/WorkGrid';
import { DigitRoll } from '@/components/studio/DigitRoll';
import { ContactBand } from '@/components/studio/ContactBand';
import { BracketLink } from '@/components/studio/Brackets';

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
 * Homepage (v5, studio direction).
 *
 * Reel → statement → client band → selected work → why us + figures →
 * closing band. The reel is fixed; everything else is one white sheet that
 * slides over it.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  const figures = homeFigures.map((m) => ({
    // Zero-padded in Latin mono (06); Persian zero is a dot, so no padding there.
    value: locale === 'fa' ? formatNumber(m.value, locale) : String(m.value).padStart(2, '0'),
    label: m.label[locale],
  }));

  return (
    <>
      <HeroReel />

      <div className="bk-sheet">
        {/* Statement */}
        <section className="bk-wrap pb-[clamp(80px,13vw,191px)] pt-[clamp(40px,5vw,63px)]">
          <h1 className="bk-display max-w-[83%] max-md:max-w-none">{homeIntro[locale]}</h1>
        </section>

        <Marquee locale={locale} />

        {/* Selected work */}
        <section className="bk-wrap relative pt-[clamp(56px,6vw,84px)]">
          <div className="mb-[27px] flex items-start justify-between gap-6">
            <h2 className="bk-title">{homeCopy.work[locale]}</h2>
            <BracketLink href={localePath(locale, '/case-studies')}>{homeCopy.workMore[locale]}</BracketLink>
          </div>
          <WorkGrid items={workItems} locale={locale} />
        </section>

        {/* Why us + figures */}
        <section className="bk-wrap pt-[clamp(96px,10vw,147px)]">
          <div className="grid gap-6 md:grid-cols-12 md:gap-5">
            <h2 className="bk-title md:col-span-4">{homeCopy.whyTitle[locale]}</h2>
            <p className="bk-title md:col-span-5">{homeCopy.whyBody[locale]}</p>
            <div className="md:col-span-3 md:justify-self-end">
              <BracketLink href={localePath(locale, '/about')}>{homeCopy.readMore[locale]}</BracketLink>
            </div>
          </div>
          <div className="mt-20 md:mt-[180px] md:grid md:grid-cols-12 md:gap-5">
            <div className="md:col-span-8 md:col-start-5">
              <DigitRoll items={figures} />
            </div>
          </div>
        </section>

        <div className="h-[clamp(72px,9vw,126px)]" />

        <ContactBand
          dir={localeDirection[locale]}
          title={homeCopy.contactTitle[locale]}
          body={homeCopy.contactBody[locale]}
          rows={homeCopy.contactRows.map((r) => ({
            href: r.href.startsWith('/') ? localePath(locale, r.href) : r.href,
            label: r.label[locale],
            words: r.words[locale],
          }))}
        />
      </div>
    </>
  );
}
