import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';

/**
 * Retail Solutions masterbrand (Design System §4).
 *
 * Anatomy: an open frame — signalling structured transformation and room to
 * expand — plus the two-line wordmark, "RETAIL" over "Solutions".
 *
 * ⚠ HANDOFF NOTE: this is a faithful reproduction built so every approved
 * colour variant (§4.3) can be rendered and so the mark stays crisp at any
 * size. The system requires the logo to be produced from the vector master
 * (§4.6). Drop `public/brand/retail-solutions.svg` in and swap this component's
 * internals for it before launch — the variant API below can stay unchanged.
 *
 * Variants (§4.3):
 *   primary     — White or Fog background (default)
 *   reverse     — Navy or dark imagery
 *   brandField  — Cyan background
 *
 * Minimum sizes (§4.5): full logo 120px wide, mark-only 32px.
 * Clear space (§4.4): one x on all sides, where x = height of "Solutions".
 */

type Variant = 'primary' | 'reverse' | 'brandField';

const palettes: Record<Variant, { frame: string; retail: string; solutions: string }> = {
  /* Matched to the supplied logo artwork: black frame, grey RETAIL, cyan
     Solutions. Applied through `style` because CSS variables do not resolve
     in SVG presentation attributes. */
  primary: { frame: '#111111', retail: '#6D6E71', solutions: '#1BB5EC' },
  reverse: { frame: '#FFFFFF', retail: '#FFFFFF', solutions: '#1BB5EC' },
  brandField: { frame: '#16213E', retail: '#16213E', solutions: '#FFFFFF' },
};

export function LogoMark({
  variant = 'primary',
  className,
  title = 'Retail Solutions',
}: {
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  const c = palettes[variant];

  return (
    <svg
      viewBox="90 160 855 700"
      className={className}
      role="img"
      aria-label={title}
      /* The wordmark is Latin and the logo is never mirrored (§7.3, §9.2).
         Without this, `dir="rtl"` on the Persian document is inherited by the
         SVG, flips the text run, and pushes the wordmark off-canvas. */
      style={{ direction: 'ltr' }}
    >
      {/* Open frame — full left edge, top and bottom returns, open at the
          right so the wordmark reads through the opening (§4.1). */}
      <g fill="none" style={{ stroke: c.frame }} strokeWidth="30" strokeLinecap="butt">
        <path d="M635 190 H115 V830 H635" />
        <path d="M635 190 V350" />
        <path d="M635 830 V670" />
      </g>

      {/* Two-line wordmark, overlapping the frame opening.
          fontFamily goes through `style` because CSS custom properties do not
          resolve in SVG presentation attributes. textLength pins the advance
          width so the lockup never reflows or clips if the webfont is still
          loading or unavailable. */}
      <text
        x="315"
        y="497"
        fontSize="132"
        fontWeight="400"
        textLength="595"
        lengthAdjust="spacing"
        style={{ fill: c.retail, fontFamily: 'var(--font-latin), Arial, Helvetica, sans-serif' }}
      >
        RETAIL
      </text>
      <text
        x="318"
        y="632"
        fontSize="136"
        fontWeight="400"
        textLength="592"
        lengthAdjust="spacing"
        style={{ fill: c.solutions, fontFamily: 'var(--font-latin), Arial, Helvetica, sans-serif' }}
      >
        Solutions
      </text>
    </svg>
  );
}

/** Mark-only lockup for avatars and very constrained space (§4.3, min 32px). */
export function LogoGlyph({ variant = 'primary', className }: { variant?: Variant; className?: string }) {
  const c = palettes[variant];
  return (
    <svg viewBox="0 0 40 48" className={className} role="img" aria-label="Retail Solutions">
      {/* The logo's open frame on its own, same proportions as LogoMark. */}
      <path d="M35 15 V5.5 H5 V42.5 H35 V33" fill="none" style={{ stroke: c.frame }} strokeWidth="2.6" />
    </svg>
  );
}

/** Header/footer lockup: the mark, linked home. */
export function Logo({
  locale,
  onDark,
  className = 'h-[72px] w-[88px]',
}: {
  locale: Locale;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={localePath(locale, '/')}
      className="inline-flex shrink-0 items-center"
      aria-label="Retail Solutions — home"
    >
      {/* shrink-0 + an explicit width: as a flex item the SVG would otherwise be
          compressed by longer navigation labels (this clipped the wordmark in
          the Persian header). Width/height pairs keep the 855:700 aspect. */}
      <LogoMark
        variant={onDark ? 'reverse' : 'primary'}
        className={cn('shrink-0 transition-[height,width] duration-standard ease-standard', className)}
      />
    </Link>
  );
}

/**
 * Horizontal lockup for the dark header: the frame mark beside the name.
 * The two-line masterbrand needs ~120px of width to stay legible (§4.5); a
 * 56px bar cannot give it that, so the bar uses mark + name instead.
 */
export function LogoWordmark({
  locale,
  className,
  onDark,
}: {
  locale: Locale;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={localePath(locale, '/')}
      className={cn('inline-flex shrink-0 items-center gap-2.5', onDark ? 'text-white' : 'text-ink', className)}
      aria-label="Retail Solutions — home"
    >
      <LogoGlyph variant={onDark ? 'reverse' : 'primary'} className="h-8 w-8" />
      <span className="whitespace-nowrap text-[1.0625rem] font-semibold tracking-tight" aria-hidden>
        {locale === 'fa' ? 'ریتیل سلوشنز' : 'Retail Solutions'}
      </span>
    </Link>
  );
}
