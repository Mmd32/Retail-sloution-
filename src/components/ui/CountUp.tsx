'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { formatNumber } from '@/lib/utils';

/**
 * Counts up from 0 the first time it is on screen.
 *
 * The server renders the final number, so the figure is correct with no JS and
 * for search engines. Reduced-motion users never see the animation.
 */
export function CountUp({
  value,
  locale,
  duration = 1100,
}: {
  value: number;
  locale: Locale;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{formatNumber(shown, locale)}</span>;
}
