'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { otherLocale, localeLabel } from '@/i18n/config';
import { track } from '@/lib/analytics';
import { u } from '@/content/ui';

/**
 * Switches to the equivalent page in the other locale by swapping only the
 * locale segment — the user is never sent back to the homepage.
 */
export function LanguageSwitcher({
  locale,
  compact,
  onDark,
}: {
  locale: Locale;
  compact?: boolean;
  onDark?: boolean;
}) {
  const pathname = usePathname();
  const target = otherLocale(locale);
  const rest = pathname.replace(/^\/(fa|en)/, '');
  const href = `/${target}${rest || ''}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      onClick={() => track('language_selected', { to: target })}
      aria-label={`${u('language', locale)}: ${localeLabel[target].native}`}
      className={
        onDark
          ? 'inline-flex min-h-[44px] lg:min-h-[24px] items-center gap-1.5 text-sm font-medium text-navy-100 transition-colors hover:text-white'
          : 'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink'
      }
    >
      <Globe className="h-4 w-4" aria-hidden />
      <span>{compact ? localeLabel[target].short : localeLabel[target].native}</span>
    </Link>
  );
}
