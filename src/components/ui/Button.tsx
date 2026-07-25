import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Buttons — Design System §14.1.
 * Height 48px · padding-inline 24px · radius 12px · label 16px SemiBold ·
 * icon gap 8px · minimum target 44×44.
 *
 * Colour choices follow §5.5/§5.6 contrast rules:
 *  - primary   Functional Blue (`action.primary`) + white → 4.65:1, AA
 *  - accent    Retail Cyan + Navy text → 6.41:1, AA. Cyan is a fill/signal
 *              colour and must never carry small text on white.
 *  - secondary White + Navy text with a border
 *  - onDark    White surface + Navy text, for navy sections
 */
type Variant = 'primary' | 'secondary' | 'accent' | 'tertiary' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-button font-semibold ' +
  'transition-colors duration-standard ease-standard ' +
  'disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-functional text-white hover:bg-functional-hover',
  secondary: 'bg-white text-navy border border-line-strong hover:border-navy',
  accent: 'bg-cyan text-navy hover:bg-cyan-600',
  tertiary: 'text-functional hover:text-navy',
  onDark: 'bg-white text-navy hover:bg-fog',
};

const sizes: Record<Size, string> = {
  md: 'text-[0.9375rem] px-4 h-11 min-w-[44px]', // 44px target floor
  lg: 'text-base px-6 h-12', // 48px, the documented default
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
