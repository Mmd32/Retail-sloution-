import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SystemDiagram } from '@/components/visual/SystemDiagram';

/**
 * Final CTA band (§17).
 *
 * One primary action. The secondary is a text link rather than a second button
 * — the previous version showed two equally weighted buttons, which forced a
 * choice at exactly the moment the visitor should have only one obvious step.
 *
 * The Retail OS diagram returns here at low contrast as a backdrop, closing the
 * page with the same figure it opened on. It is static: no ambient animation,
 * nothing that keeps moving while someone is trying to read the CTA.
 */
export function MeetingCta({
  locale,
  title,
  body,
}: {
  locale: Locale;
  title?: string;
  body?: string;
}) {
  return (
    <section className="rs-blueprint relative overflow-hidden border-t border-navy-700 bg-navy">
      {/* Backdrop figure — decorative, hidden from assistive tech, and clipped
          so it can never introduce horizontal overflow. */}
      <div
        className="pointer-events-none absolute -end-24 top-1/2 hidden w-[30rem] -translate-y-1/2 opacity-[0.13] lg:block"
        aria-hidden
      >
        <SystemDiagram locale={locale} ambient labelled={false} />
      </div>

      <div className="container-x section-y relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2 max-w-[22ch] text-white">
              {title ??
                (locale === 'fa'
                  ? 'درباره مرحله بعدی رشد برندتان گفت‌وگو کنیم.'
                  : 'Let’s talk about your brand’s next stage of growth.')}
            </h2>
            <p className="text-body mt-5 max-w-reading text-navy-200">
              {body ??
                (locale === 'fa'
                  ? 'در یک جلسه تشخیصی، با هم وضعیت فعلی، فرصت‌ها و مسیر مناسب همکاری را مرور می‌کنیم.'
                  : 'In one diagnostic meeting we walk through where you are, the opportunities ahead, and the right way to work together.')}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end">
            <ButtonLink
              href={localePath(locale, '/contact')}
              size="lg"
              className="w-full sm:w-auto"
            >
              {locale === 'fa' ? 'درخواست جلسه تشخیصی' : 'Request a diagnostic meeting'}
            </ButtonLink>
            <ArrowLink href={localePath(locale, '/assessment')} locale={locale} onDark>
              {locale === 'fa' ? 'شروع ارزیابی آمادگی رشد' : 'Start the growth readiness assessment'}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
