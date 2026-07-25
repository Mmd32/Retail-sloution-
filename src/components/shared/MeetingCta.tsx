import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { u } from '@/content/ui';

/**
 * Lead-generation CTA band. Reused at the foot of the homepage and on
 * service / industry / capability pages. `context` lets a page pass a tailored
 * line without duplicating the whole component.
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
    <section className="section-y border-t border-line bg-surface">
      <div className="container-x">
        {/* §6.4 — long-form text is never centred, in either language. */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2 text-navy">
              {title ?? (locale === 'fa' ? 'آماده‌ی گفت‌وگو درباره‌ی رشد سازمان شما هستیم' : 'Let’s talk about your organization’s growth')}
            </h2>
            <p className="text-body reading mt-4 text-ink-muted">
              {body ??
                (locale === 'fa'
                  ? 'یک جلسه‌ی اولیه رزرو کنید تا اهداف، وضعیت و اولویت‌های کسب‌وکار شما را بشناسیم.'
                  : 'Book an initial meeting so we can understand your objectives, current situation, and priorities.')}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink href={localePath(locale, '/contact')} size="lg">
              {u('requestMeeting', locale)}
            </ButtonLink>
            <ButtonLink href={localePath(locale, '/assessment')} size="lg" variant="secondary">
              {u('assessBusiness', locale)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
