import { findMedia, findBrandLogo } from '@/lib/media';
import { CornerMark } from './Brackets';

/**
 * Full-bleed reel fixed behind the page; the white sheet (header onward)
 * scrolls up over it. Drop /public/media/hero/reel.mp4 (and optionally
 * reel.jpg as poster) to fill it. The logo draws itself once, then leaves.
 */
export function HeroReel() {
  const media = findMedia('hero', 'reel');
  // White artwork reads on the reel; the regular logo would lose its black
  // frame there, so it only stands in when no white version exists.
  const logo = findBrandLogo('logo-white') ?? findBrandLogo('logo');

  return (
    <div className="bk-hero" aria-hidden>
      {media?.kind === 'video' ? (
        <video src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="auto" />
      ) : media ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt="" className="bk-hero-media" />
      ) : (
        <div className="bk-hero-empty" />
      )}
      <div className="absolute inset-0 bg-navy/20" />

      <CornerMark className="tl" />
      <CornerMark className="tr" />
      <CornerMark className="bl" />
      <CornerMark className="br" />

      {/* Supplied artwork when present; otherwise LogoMark's geometry, split
          so the frame can draw and the two words rise in on their own beats. */}
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className="bk-hero-logo bk-hero-logo-img" />
      ) : (
        <svg viewBox="90 160 855 700" className="bk-hero-logo" style={{ direction: 'ltr' }}>
          <g fill="none" stroke="currentColor" strokeWidth="30">
            <path className="frame" pathLength={1} d="M635 350 V190 H115 V830 H635 V670" />
          </g>
          <text
            className="word w1"
            x="315"
            y="497"
            fontSize="132"
            fontWeight="400"
            textLength="595"
            lengthAdjust="spacing"
            fill="currentColor"
            style={{ fontFamily: 'var(--font-latin), Arial, sans-serif' }}
          >
            RETAIL
          </text>
          <text
            className="word w2"
            x="318"
            y="632"
            fontSize="136"
            fontWeight="400"
            textLength="592"
            lengthAdjust="spacing"
            fill="#1BB5EC"
            style={{ fontFamily: 'var(--font-latin), Arial, sans-serif' }}
          >
            Solutions
          </text>
        </svg>
      )}
    </div>
  );
}
