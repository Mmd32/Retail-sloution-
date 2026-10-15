import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SystemDiagram } from '@/components/visual/SystemDiagram';
import { brand } from '@/content/site';
import { LogoMark } from '@/components/layout/Logo';

/**
 * Hero (§3).
 *
 * Asymmetric split rather than the even 7/5 column pair used before: the claim
 * gets the width it needs to land, and the diagram sits on a dark panel that
 * establishes the visual language the rest of the page reuses.
 *
 * One primary CTA. The secondary is a text link, not a second button, so it
 * cannot compete for the same attention (§3, §17).
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="rs-blueprint relative overflow-hidden bg-navy">
      <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {/* The full masterbrand opens the page (reverse variant on navy). */}
          <LogoMark
            variant="reverse"
            className="animate-rise h-28 w-[137px] md:h-36 md:w-[176px]"
          />

          <span className="eyebrow eyebrow-on-dark animate-rise mt-6 flex">
            {brand.descriptor[locale]}
          </span>

          <h1
            className="text-display animate-rise mt-4 max-w-[20ch] text-white"
            style={{ animationDelay: '60ms' }}
          >
            {locale === 'fa'
              ? 'رشد پایدار ریتیل، از ساختن سیستم شروع می‌شود.'
              : 'Durable retail growth starts by building the system.'}
          </h1>

          <p
            className="text-body animate-rise mt-5 max-w-reading text-navy-200"
            style={{ animationDelay: '110ms' }}
          >
            {locale === 'fa'
              ? 'از استراتژی و توسعه شعب تا استانداردسازی عملیات، سرمایه انسانی و تحلیل داده؛ در کنار شما سیستم‌هایی طراحی و پیاده‌سازی می‌کنیم که رشد را تکرارپذیر، قابل‌کنترل و مقیاس‌پذیر می‌کنند.'
              : 'From strategy and network expansion to operational standards, human capital, and analytics — we work alongside you to design and implement the systems that make growth repeatable, controllable, and scalable.'}
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
            style={{ animationDelay: '150ms' }}
          >
            <ButtonLink
              href={localePath(locale, '/contact')}
              size="lg"
              className="w-full sm:w-auto"
            >
              {locale === 'fa' ? 'درخواست جلسه تشخیصی' : 'Request a diagnostic meeting'}
            </ButtonLink>
            <ArrowLink href={localePath(locale, '/case-studies')} locale={locale} onDark>
              {locale === 'fa' ? 'مشاهده نتایج پروژه‌ها' : 'See engagement results'}
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="rs-blueprint animate-rise rounded-feature border border-white/10 bg-navy-900 p-6 sm:p-8"
            style={{ animationDelay: '190ms' }}
          >
            <SystemDiagram locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
