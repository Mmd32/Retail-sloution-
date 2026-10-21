'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { phases } from '@/content/methodology';

/**
 * The five stages of transformation as a scroll-tracked timeline (§12).
 *
 * No scroll hijacking: the page scrolls normally and an IntersectionObserver
 * simply reports which stage is in view. The rail on the left is `position:
 * sticky`, which the browser handles natively — we never take over the wheel.
 *
 * The progress fill and the active highlight are affordances, not the content:
 * every stage's text is in the DOM and readable in order with JS disabled, and
 * on mobile the rail is dropped entirely for a plain vertical sequence.
 */
export function TransformationTimeline({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stageRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the reading zone.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const idx = els.indexOf(visible[0].target as HTMLLIElement);
        if (idx >= 0) setActiveIndex(idx);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = phases.length > 1 ? (activeIndex / (phases.length - 1)) * 100 : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Sticky rail — desktop only */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-32">
          <ol className="relative space-y-6 ps-8">
            {/* track + fill */}
            <span
              className="absolute inset-y-1 start-[7px] w-px bg-surface/15"
              aria-hidden
            />
            <span
              className="absolute start-[7px] top-1 w-px bg-cyan transition-[height] duration-reveal ease-standard"
              style={{ height: `calc(${progress}% - 0.25rem)` }}
              aria-hidden
            />
            {phases.map((p, i) => {
              const done = i <= activeIndex;
              return (
                <li key={p.key} className="relative">
                  <span
                    className={cn(
                      'absolute -start-8 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-standard ease-standard',
                      done ? 'border-cyan bg-cyan' : 'border-white/25 bg-navy-900',
                    )}
                    aria-hidden
                  />
                  <p
                    className={cn(
                      'text-label font-semibold transition-colors duration-standard ease-standard',
                      i === activeIndex ? 'text-white' : 'text-navy-300',
                    )}
                  >
                    <span className="me-2 font-display text-xs text-cyan">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.name[locale]}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Stages */}
      <ol className="lg:col-span-8">
        {phases.map((p, i) => (
          <li
            key={p.key}
            ref={(el) => {
              stageRefs.current[i] = el;
            }}
            className="border-t border-white/10 py-10 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-h2 font-bold leading-none text-cyan/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h2 text-white">{p.name[locale]}</h3>
            </div>

            <p className="text-body mt-4 max-w-reading text-navy-100">{p.objective[locale]}</p>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-label text-cyan">
                  {locale === 'fa' ? 'فعالیت‌های اصلی' : 'Main activities'}
                </p>
                <ul className="mt-3 space-y-2">
                  {p.activities[locale].map((a, k) => (
                    <li key={k} className="text-label flex gap-2 text-navy-200">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy-400" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-label text-cyan">
                  {locale === 'fa' ? 'خروجی' : 'Output'}
                </p>
                <ul className="mt-3 space-y-2">
                  {p.outputs[locale].map((o, k) => (
                    <li key={k} className="text-label flex gap-2 text-navy-200">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 rounded-card border border-white/10 bg-surface/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-label text-navy-300">
                {locale === 'fa' ? 'نقش تیم مشتری' : 'The client team’s role'}
              </p>
              <p className="text-label mt-2 text-navy-100">{p.participation[locale]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
