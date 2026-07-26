import { Info } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Marks content whose data is structural rather than verified.
 *
 * The site must never present unverified figures or client outcomes as real
 * (§4, §9, §16). Where a section needs data the project does not yet have, we
 * ship the layout with this badge attached rather than inventing plausible
 * numbers. It is deliberately legible, not a faint footnote.
 */
export function SampleBadge({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-decision/40 bg-callout-attention px-2.5 py-1 text-xs font-semibold text-navy',
        className,
      )}
    >
      <Info className="h-3 w-3 shrink-0" aria-hidden />
      {locale === 'fa' ? 'ساختار نمونه' : 'Sample structure'}
    </span>
  );
}

/** Block-level version for the top of a section. */
export function SampleNotice({
  locale,
  children,
  className,
}: {
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        'flex gap-3 rounded-card border border-decision/40 bg-callout-attention p-4',
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
      <p className="text-label text-navy">
        <span className="font-semibold">
          {locale === 'fa' ? 'ساختار نمونه: ' : 'Sample structure: '}
        </span>
        {children}
      </p>
    </div>
  );
}
