import { cn } from '@/lib/utils';

/**
 * Initials monogram used as a portrait placeholder. Per the profile rules we
 * never display generic stock portraits; a monogram is shown until a real
 * high-resolution portrait is supplied via the CMS.
 */
export function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div
      aria-hidden
      className={cn(
        'flex items-center justify-center bg-navy-800 text-cyan-200 font-display font-semibold select-none',
        className,
      )}
    >
      <span className="text-3xl md:text-4xl tracking-wide">{initials}</span>
    </div>
  );
}
