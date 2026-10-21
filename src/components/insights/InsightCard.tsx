import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, formatDate, formatNumber, cn } from '@/lib/utils';
import type { Insight } from '@/content/types';
import { insightTypeLabels } from '@/content/insights';

/**
 * Insight card with a generated editorial visual (§15).
 *
 * The previous card opened with an empty dark rectangle — a missing-asset box
 * dressed as design. Rather than fill it with stock photography of people
 * shaking hands, each card derives a blueprint-style mark from its own topic:
 * a deterministic node figure over the grid substrate used across the site.
 *
 * It is generated from the slug, so it is stable across renders, costs one
 * inline SVG, and never 404s.
 */

/** Cheap deterministic hash → stable figure per article. */
function seedFrom(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function TopicMark({ slug, className }: { slug: string; className?: string }) {
  const seed = seedFrom(slug);
  const count = 4 + (seed % 3); // 4–6 nodes
  const nodes = Array.from({ length: count }, (_, i) => {
    const a = ((seed >> (i * 3)) % 360) * (Math.PI / 180) + (i * 2 * Math.PI) / count;
    const r = 26 + ((seed >> (i * 2)) % 22);
    return { x: 100 + Math.cos(a) * r, y: 56 + Math.sin(a) * r * 0.7 };
  });

  return (
    <svg viewBox="0 0 200 112" className={cn('w-full', className)} aria-hidden focusable="false">
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        return (
          <line
            key={`e-${i}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 7 : 4}
          style={{ fill: i === 0 ? '#00B0F0' : 'var(--rs-tint)' }}
          stroke={i === 0 ? 'none' : 'currentColor'}
          strokeWidth="1.25"
        />
      ))}
    </svg>
  );
}

export function InsightCard({
  insight,
  locale,
  className,
}: {
  insight: Insight;
  locale: Locale;
  className?: string;
}) {
  const Arrow = locale === 'fa' ? ArrowLeft : ArrowRight;
  const typeLabel = insightTypeLabels[insight.type]?.[locale];

  return (
    <Link
      href={localePath(locale, `/insights/${insight.slug}`)}
      className={cn(
        'rs-card group flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-line hover:shadow-popover',
        className,
      )}
    >
      <h3 className="text-h3 text-ink transition-colors duration-micro group-hover:text-functional">
        {insight.title[locale]}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted line-clamp-3">
        {insight.summary[locale]}
      </p>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 text-sm">
        {typeLabel && <span className="font-semibold text-ink">{typeLabel}</span>}
        <span className="text-ink-faint">{formatDate(insight.publishedAt, locale)}</span>
        {insight.readingMinutes ? (
          <span className="text-ink-faint">
            {formatNumber(insight.readingMinutes, locale)} {locale === 'fa' ? 'دقیقه' : 'min'}
          </span>
        ) : null}
      </p>
      <div className="rs-tint relative mt-6 flex flex-1 items-end overflow-hidden rounded-card px-6 pb-4 pt-8 text-functional">
        <TopicMark slug={insight.slug} className="mx-auto max-w-[14rem]" />
        <span className="absolute start-4 top-3 text-xs font-semibold text-functional">{insight.topic[locale]}</span>
        <Arrow className="rs-nudge absolute bottom-3 end-4 h-4 w-4 text-functional" aria-hidden />
      </div>
    </Link>
  );
}
