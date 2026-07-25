import { cn } from '@/lib/utils';

/**
 * Image slot for photography supplied later through the CMS.
 *
 * When `src` is set it renders the real image. Until then it renders a navy
 * system panel that reads as an intentional design element — never a broken
 * or "missing asset" box, and never a generic stock photo.
 */
export function MediaSlot({
  src,
  alt,
  ratio = '16/9',
  className,
  label,
}: {
  src?: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "16/9", "4/3", "3/4" */
  ratio?: string;
  className?: string;
  /** Optional short caption shown on the placeholder only. */
  label?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className={cn('w-full object-cover', className)}
        style={{ aspectRatio: ratio }}
      />
    );
  }

  return (
    <div
      className={cn('media-frame flex items-end', className)}
      style={{ aspectRatio: ratio }}
      role="presentation"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
      {label && (
        <span className="relative z-10 p-4 text-small font-medium text-navy-200">{label}</span>
      )}
    </div>
  );
}
