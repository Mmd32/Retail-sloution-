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
            stroke="#37507A"
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
          fill={i === 0 ? '#00B0F0' : '#0B1F3A'}
          stroke={i === 0 ? 'none' : '#5D6B90'}
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
        'group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors duration-standard ease-standard hover:border-cyan',
        className,
      )}
    >
      <div className="rs-blueprint relative flex items-center justify-center overflow-hidden bg-navy-900 px-8 py-7">
        <TopicMark
          slug={insight.slug}
          className="max-w-[13rem] transition-transform duration-emphasis ease-standard group-hover:-translate-y-1"
        />
        <span className="absolute bottom-3 start-4 text-[10px] font-semibold uppercase tracking-label text-cyan">
          {insight.topic[locale]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
          {typeLabel && (
            <span className="font-semibold uppercase tracking-label text-functional">
              {typeLabel}
            </span>
          )}
          <span>{formatDate(insight.publishedAt, locale)}</span>
          {insight.readingMinutes ? (
            <span>
              {formatNumber(insight.readingMinutes, locale)} {locale === 'fa' ? 'دقیقه مطالعه' : 'min read'}
            </span>
          ) : null}
        </div>

        <h3 className="text-h3 mt-3 text-navy transition-transform duration-standard ease-standard group-hover:translate-x-0.5 group-hover:text-functional rtl:group-hover:-translate-x-0.5">
          {insight.title[locale]}
        </h3>
        <p className="text-label mt-3 flex-1 text-ink-muted line-clamp-3">
          {insight.summary[locale]}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-label font-semibold text-functional">
          {locale === 'fa' ? 'مطالعه' : 'Read'}
          <Arrow
            className="h-4 w-4 opacity-0 transition-all duration-standard ease-standard group-hover:opacity-100"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
