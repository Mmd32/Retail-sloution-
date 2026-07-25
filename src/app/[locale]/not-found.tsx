import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Localized 404. Note: Next renders the nearest not-found; because the [locale]
 * segment can't be read here reliably, we present a bilingual, direction-neutral
 * message with links to both locales' homes.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface-muted px-6 py-24 text-center">
      <div>
        <p className="font-display text-6xl font-bold text-accent-500">404</p>
        <h1 className="mt-4 text-h2 text-navy">Page not found · صفحه یافت نشد</h1>
        <p className="mt-3 text-ink-muted">
          The page you’re looking for doesn’t exist or has moved.
          <br />
          صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/fa">صفحه اصلی</ButtonLink>
          <ButtonLink href="/en" variant="secondary">Home</ButtonLink>
        </div>
      </div>
    </div>
  );
}
