import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * A directional "read more" link. The arrow is a directional icon, so it is
 * intentionally flipped for RTL — it always points in the reading-forward
 * direction (left in Persian, right in English).
 */
export function ArrowLink({
  href,
  locale,
  children,
  className,
  onDark,
}: {
  href: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-semibold transition-colors',
        onDark ? 'text-accent-300 hover:text-white' : 'text-accent-700 hover:text-navy',
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <Arrow
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
