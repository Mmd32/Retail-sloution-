import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { u } from '@/content/ui';

export interface Crumb {
  label: string;
  path?: string; // locale-relative; omit for current page
}

export function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const Chevron = locale === 'fa' ? ChevronLeft : ChevronRight;
  const all: Crumb[] = [{ label: u('home', locale), path: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface">
      <div className="container-x">
        <ol className="flex flex-wrap items-center gap-1 py-3 text-sm text-ink-muted">
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {item.path && !isLast ? (
                  <Link href={localePath(locale, item.path)} className="hover:text-functional link-underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink font-medium">
                    {item.label}
                  </span>
                )}
                {!isLast && <Chevron className="h-4 w-4 text-ink-faint" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
