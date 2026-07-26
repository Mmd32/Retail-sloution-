import Image from 'next/image';
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
    /* next/image with `fill` inside an aspect-ratio box: the space is reserved
       before the file loads, so supplying photography later cannot introduce
       layout shift (CLS). Formats/sizing are handled by the image pipeline. */
    return (
      <div className={cn('relative w-full overflow-hidden', className)} style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
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
        <span className="relative z-10 p-4 text-label font-medium text-navy-200">{label}</span>
      )}
    </div>
  );
}
