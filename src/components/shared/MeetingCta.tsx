import { CalendarCheck, ClipboardList } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';

/**
 * Closing band in the brand's action blue — bright enough to read as an
 * invitation, not a full stop. One primary action; the assessment is a text
 * link so it cannot compete.
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
  const fa = locale === 'fa';
  return (
    <section className="relative overflow-hidden bg-[#0072A3] text-white">
      {/* Soft cyan glow, decorative. */}
      <div
        className="pointer-events-none absolute -top-32 end-[-10%] h-96 w-96 rounded-full bg-cyan/40 blur-3xl"
        aria-hidden
      />
      <div className="container-x section-y relative">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
          <CalendarCheck className="h-4 w-4" aria-hidden />
          {fa ? 'بیایید حرف بزنیم' : 'Let’s talk'}
        </p>
        <div className="mt-4 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-h1 max-w-[22ch] text-white">
              {title ?? (fa ? 'بگویید ریتیل شما باید به کجا برسد.' : 'Tell us where your retail needs to go.')}
            </h2>
            <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-white/90">
              {body ??
                (fa
                  ? 'از همین سه سؤال شروع می‌کنیم: چه چیزی جواب می‌دهد، چه چیزی نه و فرصت کجاست.'
                  : 'We start with three questions: what is working, what is not and where the opportunity is.')}
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
            <ButtonLink href={localePath(locale, '/contact')} variant="onDark" className="w-full shadow-popover sm:w-auto">
              {fa ? 'رزرو جلسه تشخیصی' : 'Book a diagnostic meeting'}
            </ButtonLink>
            <ArrowLink
              href={localePath(locale, '/assessment')}
              locale={locale}
              onDark
              className="!text-white hover:!text-white/80"
            >
              <span className="inline-flex items-center gap-2">
                <ClipboardList className="h-4 w-4" aria-hidden />
                {fa ? 'یا اول ارزیابی ۱۰ دقیقه‌ای را انجام دهید' : 'Or take the 10-minute assessment first'}
              </span>
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
