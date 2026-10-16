'use client';

import { useEffect, useRef } from 'react';

/** A thin bar across the top that fills as the article is read. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const el = bar.current;
    if (!target || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      // 0 at the top of the page, 1 when the article's last line reaches the
      // bottom of the screen — works for short and long articles alike.
      const end = target.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const done = end > 0 ? Math.min(1, Math.max(0, window.scrollY / end)) : 1;
      el.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left bg-cyan will-change-transform rtl:origin-right"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
