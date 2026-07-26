'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Scroll reveal that cannot hide content.
 *
 * An earlier version of this file was reduced to a pass-through because the
 * markup shipped at `opacity: 0` — anyone whose JS had not run yet saw a blank
 * page. That failure mode is designed out here rather than accepted:
 *
 *   - The server renders no `data-reveal` attribute, so the CSS that hides the
 *     element never applies until JS is actually running.
 *   - On mount we only opt an element in if it is still below the fold. What is
 *     already on screen is left alone, so there is no first-paint flash.
 *   - `prefers-reduced-motion` short-circuits before any attribute is set.
 *
 * Reveal is for sections entering the viewport (§19: 450–700ms). Use `delay`
 * for a short stagger between siblings — keep it to a few steps.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  /** Stagger offset in ms. Kept small; long chains read as sluggish. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already visible → leave it in its final state: no flash, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.setAttribute('data-reveal', 'out');
    setArmed(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-reveal', 'in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={
        armed && delay ? ({ '--rs-reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
