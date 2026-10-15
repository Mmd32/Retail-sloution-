'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { runSearch, type SearchType, type SearchDoc } from '@/lib/search';
import { localePath } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { u } from '@/content/ui';

const typeLabels: Record<SearchType, Record<Locale, string>> = {
  service: { fa: 'راهکار', en: 'Solution' },
  capability: { fa: 'تخصص', en: 'Capability' },
  industry: { fa: 'صنعت', en: 'Industry' },
  insight: { fa: 'بینش', en: 'Insight' },
  page: { fa: 'صفحه', en: 'Page' },
};

const filters: SearchType[] = ['service', 'capability', 'industry', 'insight', 'page'];

const suggestions: { label: Record<Locale, string>; href: string }[] = [
  { label: { fa: 'راهکار SVP™', en: 'SVP™ solution' }, href: '/solutions/svp' },
  { label: { fa: 'ارزیابی آمادگی رشد', en: 'Growth assessment' }, href: '/assessment' },
  { label: { fa: 'متدولوژی', en: 'Methodology' }, href: '/methodology' },
  { label: { fa: 'صنعت پوشاک', en: 'Fashion industry' }, href: '/industries/fashion' },
];

export function SearchDialog({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: SearchDoc[] = useMemo(
    () => (query.trim() ? runSearch(query, locale, filter ?? undefined) : []),
    [query, locale, filter],
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setFilter(null);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (query.trim().length > 2) track('search_used', { length: query.trim().length });
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-navy-900/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={u('search', locale)}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="container-x pt-[8vh]">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-card bg-white shadow-popover">
          <div className="flex items-center gap-3 border-b border-line px-5">
            <Search className="h-5 w-5 text-ink-muted" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={u('searchPlaceholder', locale)}
              className="h-14 flex-1 bg-transparent text-navy outline-none placeholder:text-ink-faint"
              aria-label={u('search', locale)}
            />
            <button onClick={onClose} aria-label={u('close', locale)} className="p-2 text-ink-muted hover:text-navy">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-line px-5 py-3">
            <button
              onClick={() => setFilter(null)}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-label font-medium ${filter === null ? 'bg-navy text-white' : 'bg-surface-muted text-ink-muted hover:text-navy'}`}
            >
              {locale === 'fa' ? 'همه' : 'All'}
            </button>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-label font-medium ${filter === f ? 'bg-navy text-white' : 'bg-surface-muted text-ink-muted hover:text-navy'}`}
              >
                {typeLabels[f][locale]}
              </button>
            ))}
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-2">
            {query.trim() === '' && (
              <div className="p-4">
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  {locale === 'fa' ? 'پیشنهادها' : 'Suggestions'}
                </p>
                {suggestions.map((s) => (
                  <Link
                    key={s.href}
                    href={localePath(locale, s.href)}
                    onClick={onClose}
                    className="block rounded-control px-3 py-2 text-sm text-navy hover:bg-surface-muted"
                  >
                    {s.label[locale]}
                  </Link>
                ))}
              </div>
            )}

            {query.trim() !== '' && results.length === 0 && (
              <div className="p-6 text-center text-sm text-ink-muted">
                {locale === 'fa' ? 'نتیجه‌ای یافت نشد. این پیشنهادها را ببینید:' : 'No results. Try these:'}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <Link
                      key={s.href}
                      href={localePath(locale, s.href)}
                      onClick={onClose}
                      className="inline-flex min-h-[44px] items-center rounded-full bg-surface-muted px-4 text-label text-navy hover:bg-callout-info"
                    >
                      {s.label[locale]}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.map((d) => (
              <Link
                key={d.type + d.href}
                href={localePath(locale, d.href)}
                onClick={() => {
                  track('search_result_clicked', { type: d.type });
                  onClose();
                }}
                className="flex items-start justify-between gap-3 rounded-control px-3 py-2.5 hover:bg-surface-muted"
              >
                <span>
                  <span className="block text-sm font-medium text-navy">{d.title[locale]}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">{d.description[locale]}</span>
                </span>
                <span className="mt-0.5 shrink-0 rounded-control bg-surface-muted px-2 py-0.5 text-xs font-medium text-ink-muted">
                  {typeLabels[d.type][locale]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
