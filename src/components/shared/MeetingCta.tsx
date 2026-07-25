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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-navy">
            {title ?? (locale === 'fa' ? 'آماده‌ی گفت‌وگو درباره‌ی رشد سازمان شما هستیم' : 'Let’s talk about your organization’s growth')}
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-xl text-ink-muted">
            {body ??
              (locale === 'fa'
                ? 'یک جلسه‌ی اولیه رزرو کنید تا اهداف، وضعیت و اولویت‌های کسب‌وکار شما را بشناسیم.'
                : 'Book an initial meeting so we can understand your objectives, current situation, and priorities.')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
