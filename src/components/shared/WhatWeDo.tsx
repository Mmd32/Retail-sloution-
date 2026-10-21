import Link from 'next/link';
import { ArrowLeft, ArrowRight, ScanSearch, Eye, Store, Palette, Compass } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import { whatWeDo, type ServiceLine } from '@/content/whatWeDo';
import { Reveal } from '@/components/ui/Reveal';

const icons: Record<ServiceLine['icon'], typeof Eye> = {
  search: ScanSearch,
  eye: Eye,
  store: Store,
  palette: Palette,
  compass: Compass,
};

/** 01–05 in the reading script's own digits. */
function index(i: number, locale: Locale) {
  const n = String(i + 1).padStart(2, '0');
  return locale === 'fa' ? n.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : n;
}

/**
 * The five service lines as an editorial list: index, icon, title and one
 * line. `compact` (homepage) makes each row a link to the full list on
 * /solutions; `full` adds the scope tags under each line.
 */
export function WhatWeDo({ locale, variant = 'compact' }: { locale: Locale; variant?: 'compact' | 'full' }) {
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  const full = variant === 'full';

  return (
    <ol className="divide-y divide-line border-y border-line">
      {whatWeDo.map((s, i) => {
        const Icon = icons[s.icon];
        const inner = (
          <div className={cn('grid items-start gap-x-6 gap-y-3 py-6 md:grid-cols-12', full && 'md:py-8')}>
            <div className="flex items-center gap-4 md:col-span-5">
              <span className="num w-7 shrink-0 text-sm font-semibold text-ink-faint">{index(i, locale)}</span>
              <span className="rs-icon-chip rs-card-icon">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="text-h3 text-ink transition-colors group-hover:text-functional">{s.title[locale]}</h3>
            </div>
            <div className={cn('ps-11 md:ps-0', full ? 'md:col-span-7' : 'flex items-start gap-4 md:col-span-7')}>
              <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-muted md:text-base">{s.summary[locale]}</p>
              {!full && <Arrow className="rs-nudge mt-1 hidden h-4 w-4 shrink-0 text-functional md:block" aria-hidden />}
              {full && (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={locale === 'fa' ? 'حوزه‌ها' : 'Scope'}>
                  {s.tags[locale].map((t) => (
                    <li key={t} className="rounded-full bg-sunken px-3 py-1 text-sm text-ink ring-1 ring-line">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
        return (
          <Reveal as="li" key={s.key} delay={i * 50} className={undefined}>
            {full ? (
              <div id={s.key} className="scroll-mt-24">{inner}</div>
            ) : (
              <Link href={localePath(locale, `/solutions#${s.key}`)} className="group block rounded-control">
                {inner}
              </Link>
            )}
          </Reveal>
        );
      })}
    </ol>
  );
}
