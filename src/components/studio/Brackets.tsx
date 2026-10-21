import Link from 'next/link';
import { cn } from '@/lib/utils';

/** `[ LABEL ]` — the one ornament in the studio direction. */
export function Brackets({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('bk-brackets bk-mono', className)}>
      <span className="bk-b bk-b-l" aria-hidden>[</span>
      <span>{children}</span>
      <span className="bk-b bk-b-r" aria-hidden>]</span>
    </span>
  );
}

/** Bracketed text button; the brackets spread on hover. */
export function BracketLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn('bk-btn inline-flex min-h-[32px] items-center', className)}>
      <Brackets>{children}</Brackets>
    </Link>
  );
}

/** 14px corner mark; rotate with the `tl/tr/bl/br` classes. */
export function CornerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={cn('bk-corner', className)} aria-hidden>
      <path d="M0.75 14V0.75H14" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
