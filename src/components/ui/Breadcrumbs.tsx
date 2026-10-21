import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import { u } from '@/content/ui';

export interface Crumb {
  label: string;
  path?: string; // locale-relative; omit for current page
}

export function Breadcrumbs({
  locale,
  items,
  onDark,
  inline,
}: {
  locale: Locale;
  items: Crumb[];
  /** Render bare (no bar) in light-theme colours, for use inside a light hero. */
  inline?: boolean;
  /** Render bare (no bar) in light-on-navy colours, for use inside a hero. */
  onDark?: boolean;
}) {
  const Chevron = locale === 'fa' ? ChevronLeft : ChevronRight;
  const all: Crumb[] = [{ label: u('home', locale), path: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={onDark || inline ? undefined : 'border-b border-line bg-surface'}>
      <div className={onDark || inline ? undefined : 'container-x'}>
        <ol className={cn('flex flex-wrap items-center gap-1 text-sm', onDark ? 'text-[#C9CED8]' : inline ? 'text-ink-muted' : 'py-3 text-ink-muted')}>
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {item.path && !isLast ? (
                  <Link href={localePath(locale, item.path)} className={cn('link-underline inline-flex min-h-[44px] items-center transition-colors duration-standard ease-standard lg:min-h-[24px]', onDark ? 'hover:text-white' : 'hover:text-functional')}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className={cn('font-medium', onDark ? 'text-white' : 'text-ink')}>
                    {item.label}
                  </span>
                )}
                {!isLast && <Chevron className={cn('h-4 w-4', onDark ? 'text-[#868EA0]' : 'text-ink-faint')} aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
