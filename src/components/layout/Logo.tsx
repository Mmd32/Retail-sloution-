import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';

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
  primary: { frame: '#16213E', retail: '#5C6478', solutions: '#00B0F0' },
  reverse: { frame: '#FFFFFF', retail: '#BFC6D8', solutions: '#00B0F0' },
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
      <g fill="none" stroke={c.frame} strokeWidth="30" strokeLinecap="butt">
        <path d="M635 190 H115 V830 H635" />
        <path d="M635 190 V320" />
        <path d="M635 830 V700" />
      </g>

      {/* Two-line wordmark, overlapping the frame opening.
          fontFamily goes through `style` because CSS custom properties do not
          resolve in SVG presentation attributes. textLength pins the advance
          width so the lockup never reflows or clips if the webfont is still
          loading or unavailable. */}
      <text
        x="315"
        y="497"
        fill={c.retail}
        fontSize="132"
        fontWeight="400"
        textLength="595"
        lengthAdjust="spacing"
        style={{ fontFamily: 'var(--font-latin), Arial, Helvetica, sans-serif' }}
      >
        RETAIL
      </text>
      <text
        x="318"
        y="632"
        fill={c.solutions}
        fontSize="136"
        fontWeight="300"
        textLength="592"
        lengthAdjust="spacing"
        style={{ fontFamily: 'var(--font-latin), Arial, Helvetica, sans-serif' }}
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
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Retail Solutions">
      <g fill="none" stroke={c.frame} strokeWidth="4.5">
        <path d="M34 7 H8 V41 H34" />
        <path d="M34 7 V16" />
        <path d="M34 41 V32" />
      </g>
      <circle cx="34" cy="24" r="4.5" fill={c.solutions} />
    </svg>
  );
}

/** Header/footer lockup: the mark, linked home. */
export function Logo({ locale, onDark }: { locale: Locale; onDark?: boolean }) {
  return (
    <Link
      href={localePath(locale, '/')}
      className="inline-flex shrink-0 items-center"
      aria-label="Retail Solutions — home"
    >
      {/* shrink-0 + an explicit width: as a flex item the SVG would otherwise be
          compressed by longer navigation labels (this clipped the wordmark in
          the Persian header). 68px keeps the 855:700 aspect at h-14. */}
      <LogoMark
        variant={onDark ? 'reverse' : 'primary'}
        className="h-14 w-[68px] shrink-0"
      />
    </Link>
  );
}
