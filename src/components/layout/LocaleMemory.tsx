'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';

const KEY = 'rs-locale';

/**
 * Language-preference behavior (per spec):
 *  - Persist the current locale whenever the user is on a localized page.
 *  - On first visit only, if a stored preference differs from the current
 *    locale, honor it by navigating to the equivalent page (same path).
 *  - Never force redirects on every visit; manual switching always wins and is
 *    what writes the stored preference.
 */
export function LocaleMemory({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      stored = null;
    }

    // First visit ever: seed from stored pref or leave as-is (server default).
    const firstVisit = window.sessionStorage.getItem('rs-visited') === null;
    if (firstVisit) {
      window.sessionStorage.setItem('rs-visited', '1');
      if (stored && stored !== locale && (locales as readonly string[]).includes(stored)) {
        const rest = pathname.replace(/^\/(fa|en)/, '');
        router.replace(`/${stored}${rest || ''}`);
        return;
      }
    }

    try {
      window.localStorage.setItem(KEY, locale);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [locale, pathname, router]);

  return null;
}
