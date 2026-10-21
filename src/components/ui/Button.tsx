import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Buttons — pill shape, 48px default height, 44px floor.
 *
 *  - primary   action blue + white (5.3:1); on dark shells too
 *  - secondary outline pill in ink
 *  - onDark    white pill + action-blue text, for the dark shell
 *  - outlineOnDark  white outline on the dark shell
 *  - accent    alias of primary (kept for older call sites)
 */
type Variant = 'primary' | 'secondary' | 'accent' | 'tertiary' | 'onDark' | 'outlineOnDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-button font-semibold ' +
  'transition-[color,background-color,border-color] duration-micro ease-standard ' +
  'disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-functional text-on-action hover:bg-functional-hover',
  accent: 'bg-[#0072A3] text-white hover:bg-[#005A82]',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  tertiary: 'text-functional hover:text-ink',
  onDark: 'bg-white text-[#0072A3] hover:bg-[#E6F2F8]',
  outlineOnDark: 'border border-white/70 text-white hover:bg-white hover:text-[#0A0F1C]',
};

const sizes: Record<Size, string> = {
  md: 'text-[0.9375rem] px-6 h-11 min-w-[44px]',
  lg: 'text-base px-9 h-12',
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
