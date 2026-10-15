import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import type { CaseStudy } from '@/content/caseStudies';
import { SampleBadge } from '@/components/ui/SampleBadge';

/**
 * A case study reads as a project record, not a marketing card (§9): the
 * problem → intervention → result chain is laid out as a labelled sequence so
 * the shape of the work is legible at a glance, and the labels stay visible
 * rather than hiding behind a hover.
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

  const rows: { label: string; value: string }[] = [
    {
      label: locale === 'fa' ? 'چالش' : 'Challenge',
      value: study.challenge[locale],
    },
    {
      label: locale === 'fa' ? 'رویکرد' : 'Approach',
      value: study.intervention[locale],
    },
    {
      label: locale === 'fa' ? 'سیستم اجراشده' : 'System delivered',
      value: study.system[locale],
    },
  ];

  return (
    <article
      className={cn(
        'group flex h-full flex-col border-s-2 border-line bg-surface ps-6 transition-colors duration-standard ease-standard hover:border-cyan',
        className,
      )}
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs font-semibold uppercase tracking-label text-functional">
          {study.industry[locale]}
        </span>
        {study.status === 'sample' && <SampleBadge locale={locale} />}
      </header>

      <h3 className="text-h3 mt-3 text-navy">{study.client[locale]}</h3>

      <dl className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs font-semibold uppercase tracking-label text-ink-faint">
              {r.label}
            </dt>
            <dd className="text-label mt-1 text-ink-muted">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex-1">
        <p className="text-xs font-semibold uppercase tracking-label text-ink-faint">
          {locale === 'fa' ? 'نتیجه' : 'Result'}
        </p>
        <ul className="mt-2 space-y-1.5">
          {study.outcomes.map((o, i) => (
            <li key={i} className="text-label flex gap-2 text-navy">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden />
              <span>
                {o.metric && <span className="font-semibold">{o.metric} </span>}
                {o.label[locale]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={localePath(locale, `/case-studies/${study.slug}`)}
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-label font-semibold text-functional transition-colors duration-micro ease-standard lg:min-h-[24px]"
      >
        {locale === 'fa' ? 'مشاهده مطالعه موردی' : 'Read the case study'}
        <Arrow
          className="h-4 w-4 transition-transform duration-standard ease-standard group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  );
}
