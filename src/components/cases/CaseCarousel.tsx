'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, ClipboardCheck, BarChart3, Store } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, formatNumber, cn } from '@/lib/utils';
import type { CaseStudy } from '@/content/caseStudies';
import { ButtonLink } from '@/components/ui/Button';

const domainIcon = {
  expansion: Compass,
  operations: ClipboardCheck,
  analytics: BarChart3,
} as const;

/**
 * One project at a time: the outcome as a large light headline on the
 * reading side, a dark panel with the project's facts on the other, and a
 * progress rail with a pager underneath. Never auto-advances — the visitor
 * moves it, so nothing changes while someone is reading.
 */
export function CaseCarousel({ studies, locale }: { studies: CaseStudy[]; locale: Locale }) {
  const [i, setI] = useState(0);
  const fa = locale === 'fa';
  const n = studies.length;
  const study = studies[i];
  const [headline, ...rest] = study.outcomes;
  const Icon = domainIcon[study.domain as keyof typeof domainIcon] ?? Store;
  // In RTL the "previous" control sits on the right, so the glyphs swap.
  const Prev = fa ? ChevronRight : ChevronLeft;
  const Next = fa ? ChevronLeft : ChevronRight;

  return (
    <div aria-roledescription="carousel" aria-label={fa ? 'نمونه کارها' : 'Selected work'}>
      <div
        key={study.slug}
        className="animate-rs-fade grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
        aria-live="polite"
      >
        <div className="lg:col-span-5">
          <p className="eyebrow">{study.industry[locale]}</p>
          <h3 className="text-h1 mt-4 text-ink">{headline.label[locale]}</h3>
          <p className="text-body mt-6 text-ink-muted">{study.challenge[locale]}</p>
          <div className="mt-8">
            <ButtonLink href={localePath(locale, `/case-studies/${study.slug}`)}>
              {fa ? 'مطالعه ماجرای کامل' : 'Read the full story'}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rs-shell relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-card p-6 sm:p-10">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-[#0A0F1C]">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-sm text-[#C9CED8]">{study.client[locale]}</span>
            </div>
            <ul className="space-y-3">
              {rest.map((o, k) => (
                <li key={k} className="flex items-baseline gap-3 border-t border-white/15 pt-3 text-white">
                  {o.metric && <span className="text-h3 font-light text-cyan">{o.metric}</span>}
                  <span className="text-[0.9375rem] sm:text-base">{o.label[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Progress rail + pager */}
      <div className="mt-10 flex items-center gap-6">
        <div className="relative h-1 flex-1 bg-line" aria-hidden>
          <div
            className="absolute inset-y-0 start-0 bg-cyan transition-[inline-size] duration-standard ease-standard"
            style={{ inlineSize: `${((i + 1) / n) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-sm text-ink-muted">
          <button
            type="button"
            onClick={() => setI((i - 1 + n) % n)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
            aria-label={fa ? 'پروژه قبلی' : 'Previous project'}
          >
            <Prev className="h-5 w-5" aria-hidden />
          </button>
          <span className="num min-w-[3.5rem] text-center" aria-live="polite">
            {formatNumber(i + 1, locale)} / {formatNumber(n, locale)}
          </span>
          <button
            type="button"
            onClick={() => setI((i + 1) % n)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
            aria-label={fa ? 'پروژه بعدی' : 'Next project'}
          >
            <Next className={cn('h-5 w-5')} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
