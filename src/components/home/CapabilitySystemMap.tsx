'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import { capabilities } from '@/content/capabilities';
import { SystemDiagram, osDomains } from '@/components/visual/SystemDiagram';

/**
 * The six capabilities as one system (§10).
 *
 * Replaces six independent cards. Selecting a domain lights its links in the
 * diagram *and* names which other domains it depends on — the dependency text
 * is the point of the section, not decoration. Selection is driven from either
 * side (list or diagram) and the two stay in sync.
 *
 * The list is a real list of links, so the section works fully without ever
 * touching the diagram — and on mobile, where the diagram is decorative, the
 * list is all that is shown.
 */

/** Which domains each one depends on. Explains the mesh in the diagram. */
const dependencies: Record<string, string[]> = {
  strategy: ['expansion', 'analytics'],
  operations: ['people', 'experience'],
  people: ['operations', 'strategy'],
  expansion: ['strategy', 'analytics'],
  experience: ['operations', 'people'],
  analytics: ['strategy', 'operations'],
};

/** Diagram domain key → capability slug. */
const domainToSlug: Record<string, string> = {
  strategy: 'strategy',
  operations: 'operations',
  people: 'people',
  expansion: 'expansion',
  experience: 'store-development',
  analytics: 'analytics',
};

export function CapabilitySystemMap({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string>('strategy');
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;

  const activeDomain = osDomains.find((d) => d.key === active) ?? osDomains[0];
  const activeCap = capabilities.find((c) => c.slug === domainToSlug[active]);
  const deps = dependencies[active] ?? [];
  const depLabels = deps
    .map((k) => osDomains.find((d) => d.key === k)?.label[locale])
    .filter(Boolean);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Diagram — desktop only. On mobile it would be too dense to read and
          adds nothing the list does not already say (§23). */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="rs-blueprint rounded-feature border border-white/10 bg-navy-900 p-8">
          <SystemDiagram
            locale={locale}
            active={active}
            onSelect={setActive}
            labelled={false}
            className="mx-auto max-w-[26rem]"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {osDomains.map((d) => {
            const isActive = active === d.key;
            const cap = capabilities.find((c) => c.slug === domainToSlug[d.key]);
            return (
              <li key={d.key}>
                <button
                  onClick={() => setActive(d.key)}
                  onMouseEnter={() => setActive(d.key)}
                  aria-pressed={isActive}
                  className={cn(
                    'flex min-h-[44px] w-full items-center gap-3 rounded-control border px-4 py-3 text-start transition-colors duration-standard ease-standard',
                    isActive
                      ? 'border-cyan bg-cyan/10 text-white'
                      : 'border-white/10 bg-white/5 text-navy-100 hover:border-white/25',
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 shrink-0 rounded-full transition-colors duration-standard ease-standard',
                      isActive ? 'bg-cyan' : 'bg-navy-400',
                    )}
                    aria-hidden
                  />
                  <span className="font-medium">{cap?.title[locale] ?? d.label[locale]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail panel — aria-live so keyboard and screen-reader users are
            told what changed when they move through the list. */}
        <div
          aria-live="polite"
          className="mt-6 rounded-card border border-white/10 bg-white/5 p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-label text-cyan">
            {activeDomain.label[locale]}
          </p>
          <p className="text-body mt-3 text-navy-100">
            {activeCap?.detail[locale] ?? activeCap?.description[locale]}
          </p>

          {depLabels.length > 0 && (
            <p className="text-label mt-5 text-navy-300">
              <span className="font-semibold text-navy-200">
                {locale === 'fa' ? 'وابسته به: ' : 'Depends on: '}
              </span>
              {depLabels.join(locale === 'fa' ? '، ' : ', ')}
            </p>
          )}

          {activeCap && (
            <Link
              href={localePath(locale, `/capabilities/${activeCap.slug}`)}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-label font-semibold text-cyan lg:min-h-[24px]"
            >
              {locale === 'fa' ? 'مشاهده جزئیات' : 'View details'}
              <Arrow className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
