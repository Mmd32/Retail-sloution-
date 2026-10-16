import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Compass, ClipboardCheck, BarChart3, Store } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import type { CaseStudy } from '@/content/caseStudies';

const domainIcon = {
  expansion: Compass,
  operations: ClipboardCheck,
  analytics: BarChart3,
} as const;

/**
 * A project at a glance: what changed first, then where it started.
 *
 * Leads with the outcome (the thing a decision-maker came to see), puts the
 * starting problem in a single quiet line, and keeps the remaining outcomes as
 * short checks. The full story — before, intervention, system, after — lives on
 * the detail page, so the card never has to carry it.
 */
export function CaseStudyCard({
  study,
  locale,
  className,
}: {
  study: CaseStudy;
  locale: Locale;
  className?: string;
}) {
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  const Icon = domainIcon[study.domain as keyof typeof domainIcon] ?? Store;
  const [headline, ...rest] = study.outcomes;
  const href = localePath(locale, `/case-studies/${study.slug}`);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white',
        'transition-[transform,box-shadow,border-color] duration-standard ease-standard',
        'hover:-translate-y-1 hover:border-cyan hover:shadow-popover',
        className,
      )}
    >
      {/* Accent rule that fills in on hover */}
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-cyan transition-transform duration-standard ease-standard group-hover:scale-x-100 rtl:origin-right"
        aria-hidden
      />

      <div className="flex items-center gap-3 px-6 pt-6">
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-navy-50 text-functional transition-colors duration-standard ease-standard group-hover:bg-functional group-hover:text-white"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-functional">{study.industry[locale]}</p>
          <p className="truncate text-sm text-ink-muted">{study.client[locale]}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <p className="text-xs font-semibold text-ink-faint">{locale === 'fa' ? 'حاصل کار' : 'What changed'}</p>
        <h3 className="text-h3 mt-1 text-navy">{headline.label[locale]}</h3>

        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-semibold text-ink">{locale === 'fa' ? 'نقطه شروع: ' : 'Starting point: '}</span>
          {study.challenge[locale]}
        </p>

        <ul className="mt-5 flex-1 space-y-2">
          {rest.map((o, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-functional"
                aria-hidden
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>
                {o.metric && <span className="font-semibold">{o.metric} </span>}
                {o.label[locale]}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-label font-semibold text-functional transition-colors duration-micro ease-standard after:absolute after:inset-0 after:content-[''] hover:text-navy lg:min-h-[24px]"
        >
          {locale === 'fa' ? 'مشاهده ماجرای کامل' : 'Read the full story'}
          <Arrow
            className="h-4 w-4 transition-transform duration-standard ease-standard group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
