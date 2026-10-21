'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Figures whose digits roll up one by one when the row scrolls into view.
 */
export function DigitRoll({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-in={inView} className="grid gap-12 sm:grid-cols-3 sm:gap-5">
      {items.map((item, col) => (
        <div key={item.label}>
          <p className="bk-num rtl:text-right" dir="ltr" aria-label={item.value}>
            {[...item.value].map((d, i) => (
              <span key={i} className="bk-digit" aria-hidden>
                <span style={{ '--d': `${col * 180 + i * 120}ms` } as React.CSSProperties}>{d}</span>
              </span>
            ))}
          </p>
          <p className="bk-mono mt-3 text-navy-400">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
