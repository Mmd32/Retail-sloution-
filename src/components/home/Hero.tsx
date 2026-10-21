import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';

/**
 * Hero — one statement, set very large, the way retail-design studios open
 * (a single typographic line instead of an illustration). The disciplines sit
 * underneath as a quiet line; one primary action, one text link.
 */
export function Hero({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  return (
    <section className="rs-hero-field relative overflow-hidden">
      <div className="container-x pb-16 pt-14 md:pb-24 md:pt-24">
        <h1 className="text-hero animate-rise max-w-[14ch] text-ink">
          {fa ? (
            <>
              ریتیلی که <span className="text-functional">می‌فروشد</span>، طراحی می‌شود.
            </>
          ) : (
            <>
              Retail that <span className="text-functional">sells</span> is designed.
            </>
          )}
        </h1>

        <div
          className="animate-rise mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between"
          style={{ animationDelay: '120ms' }}
        >
          <p className="max-w-[34rem] text-[1.125rem] leading-relaxed text-ink-muted">
            {fa
              ? 'استراتژی ریتیل، ویژوال مرچندایزینگ، طراحی فروشگاه و دایرکشن خلاق؛ همه بر اساس اینکه مشتری‌های شما واقعاً چطور خرید می‌کنند.'
              : 'Retail strategy, visual merchandising, store design and creative direction — all built around how your customers actually shop.'}
          </p>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ButtonLink href={localePath(locale, '/contact')} className="w-full sm:w-auto">
              {fa ? 'رزرو جلسه تشخیصی' : 'Book a diagnostic meeting'}
            </ButtonLink>
            <ArrowLink href={localePath(locale, '/case-studies')} locale={locale}>
              {fa ? 'دیدن کارها' : 'See the work'}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
