import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';

/**
 * Original wordmark for Retail Solutions — a geometric "RS" node mark
 * suggesting connected stores in a network, plus the wordmark. Not derived
 * from any third-party brand.
 */
export function Logo({ locale, onDark }: { locale: Locale; onDark?: boolean }) {
  const wordColor = onDark ? 'text-white' : 'text-navy';
  return (
    <Link
      href={localePath(locale, '/')}
      className="group inline-flex items-center gap-2.5"
      aria-label="Retail Solutions — home"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
        <rect width="32" height="32" rx="7" className="fill-navy" />
        <circle cx="10" cy="10" r="2.4" className="fill-accent-400" />
        <circle cx="22" cy="10" r="2.4" fill="#fff" opacity="0.85" />
        <circle cx="10" cy="22" r="2.4" fill="#fff" opacity="0.85" />
        <circle cx="22" cy="22" r="2.4" className="fill-accent-400" />
        <path d="M10 10L22 22M22 10L10 22" stroke="#fff" strokeWidth="1.1" opacity="0.35" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] font-bold tracking-tight ${wordColor}`}>Retail Solutions</span>
        <span className={`mt-0.5 text-[10px] font-medium ${onDark ? 'text-navy-200' : 'text-ink-muted'}`}>
          {locale === 'fa' ? 'ریتیل سلوشنز' : 'Building Enduring Retail Organizations'}
        </span>
      </span>
    </Link>
  );
}
