'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/config';

/**
 * The Retail Operating System diagram — the site's one proprietary visual.
 *
 * It carries the whole argument in a single picture: a governing core, six
 * domains attached to it, and a controlled expansion boundary. It reappears at
 * three sizes (hero, section, CTA backdrop) so the language repeats rather than
 * each section inventing its own decoration.
 *
 * Drawn as inline SVG — no canvas, no WebGL, no animation library (§24). The
 * line-draw entrance is CSS only and is disabled under reduced motion.
 */

export interface DomainNode {
  key: string;
  label: { fa: string; en: string };
  /** Angle in degrees, 0 = right, clockwise. */
  angle: number;
}

export const osDomains: DomainNode[] = [
  { key: 'strategy', label: { fa: 'استراتژی', en: 'Strategy' }, angle: -90 },
  { key: 'expansion', label: { fa: 'توسعه شعب', en: 'Expansion' }, angle: -30 },
  { key: 'analytics', label: { fa: 'داده', en: 'Data' }, angle: 30 },
  { key: 'experience', label: { fa: 'تجربه مشتری', en: 'Experience' }, angle: 90 },
  { key: 'people', label: { fa: 'سرمایه انسانی', en: 'People' }, angle: 150 },
  { key: 'operations', label: { fa: 'عملیات', en: 'Operations' }, angle: -150 },
];

const C = { x: 200, y: 200 };
const R = 132;

/** One simple glyph per domain, drawn around (0,0) so it can be translated. */
function DomainGlyph({ k }: { k: string }) {
  switch (k) {
    case 'strategy': // target
      return (
        <>
          <circle r="7" />
          <circle r="2.2" />
        </>
      );
    case 'expansion': // arrow out
      return <path d="M-5.5 5.5 L5.5 -5.5 M-0.5 -5.5 H5.5 V0.5" />;
    case 'analytics': // bars
      return <path d="M-6 6.5 V0.5 M0 6.5 V-6.5 M6 6.5 V2" strokeWidth="2.4" />;
    case 'experience': // smile
      return (
        <>
          <circle r="7.5" />
          <path d="M-3.5 2 Q0 5.5 3.5 2" />
          <path d="M-2.6 -2.2 h0.01 M2.6 -2.2 h0.01" strokeWidth="2.2" />
        </>
      );
    case 'people': // person
      return (
        <>
          <circle cy="-3.2" r="3.2" />
          <path d="M-6.5 7 a6.5 6.5 0 0 1 13 0" />
        </>
      );
    default: // operations — checklist
      return (
        <>
          <rect x="-6" y="-7" width="12" height="14" rx="2" />
          <path d="M-3 0.5 l2 2 l4 -4" />
        </>
      );
  }
}

function pos(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180;
  return { x: C.x + Math.cos(rad) * radius, y: C.y + Math.sin(rad) * radius };
}

export function SystemDiagram({
  locale,
  className,
  /** Highlighted domain key, or null for the neutral state. */
  active = null,
  onSelect,
  /** Dim everything and drop the labels — used behind the final CTA. */
  ambient = false,
  labelled = true,
  /** Larger nodes with the domain name under each one. */
  nodeLabels = false,
}: {
  locale: Locale;
  className?: string;
  active?: string | null;
  onSelect?: (key: string) => void;
  ambient?: boolean;
  labelled?: boolean;
  nodeLabels?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  // Draw the connections once, when the diagram is actually looked at.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const interactive = Boolean(onSelect);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className={cn('w-full', className)}
      role={interactive ? 'group' : 'img'}
      aria-label={
        interactive
          ? undefined
          : locale === 'fa'
            ? 'دیاگرام سیستم عامل ریتیل: یک هسته مرکزی متصل به شش حوزه سازمانی'
            : 'Retail Operating System diagram: a central core connected to six organizational domains'
      }
    >
      <defs>
        <radialGradient id="rs-core" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#4FC4EE" />
          <stop offset="100%" stopColor="#0782B5" />
        </radialGradient>
      </defs>

      {/* Controlled expansion boundary */}
      <circle cx={C.x} cy={C.y} r={R + 34} fill="none" stroke="#22375C" strokeDasharray="2 8" opacity={0.7} />
      <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="#1B2E52" strokeWidth="1" />

      {/* Connections: core → each domain */}
      {osDomains.map((d, i) => {
        const p = pos(d.angle);
        const isActive = active === d.key;
        return (
          <line
            key={`c-${d.key}`}
            x1={C.x}
            y1={C.y}
            x2={p.x}
            y2={p.y}
            stroke={isActive ? '#00B0F0' : '#37507A'}
            strokeWidth={isActive ? 2 : 1.25}
            className={drawn ? 'rs-draw' : undefined}
            style={
              drawn
                ? ({ '--rs-len': R, '--rs-draw-delay': `${i * 70}ms` } as React.CSSProperties)
                : { strokeDasharray: R, strokeDashoffset: R }
            }
          />
        );
      })}

      {/* Peer links around the ring — the domains talk to each other, not only
          to the centre. This is the point of the picture. */}
      {osDomains.map((d, i) => {
        const a = pos(d.angle);
        const b = pos(osDomains[(i + 1) % osDomains.length].angle);
        const lit = active === d.key || active === osDomains[(i + 1) % osDomains.length].key;
        return (
          <line
            key={`p-${d.key}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={lit ? '#00B0F0' : '#2A3F66'}
            strokeWidth={lit ? 1.5 : 1}
            opacity={lit ? 0.9 : 0.5}
          />
        );
      })}

      {/* Domain nodes */}
      {osDomains.map((d) => {
        const p = pos(d.angle);
        const isActive = active === d.key;
        const nr = nodeLabels ? 27 : 21;
        const node = (
          <>
            <circle
              cx={p.x}
              cy={p.y}
              r={isActive ? nr + 4 : nr}
              fill={isActive ? '#0B2E4A' : '#0B1F3A'}
              stroke={isActive ? '#00B0F0' : '#37507A'}
              strokeWidth={isActive ? 2 : 1.25}
              style={{ transition: 'all var(--rs-d-standard) var(--rs-ease)' }}
            />
            <g
              transform={`translate(${p.x} ${p.y}) scale(${nodeLabels ? 1.2 : 1})`}
              stroke={isActive ? '#93DCF6' : nodeLabels ? '#B7C6DB' : '#8FA3BF'}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke var(--rs-d-standard) var(--rs-ease)' }}
            >
              <DomainGlyph k={d.key} />
            </g>
            {nodeLabels && (
              <text
                x={p.x}
                y={d.angle === -90 ? p.y - nr - 9 : p.y + nr + 17}
                textAnchor="middle"
                className="fill-white text-[13px] font-semibold"
              >
                {d.label[locale]}
              </text>
            )}
          </>
        );

        if (!interactive) return <g key={d.key}>{node}</g>;

        return (
          <g
            key={d.key}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={d.label[locale]}
            onClick={() => onSelect?.(d.key)}
            onMouseEnter={() => onSelect?.(d.key)}
            onFocus={() => onSelect?.(d.key)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(d.key);
              }
            }}
            className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-cyan [&:focus-visible>circle]:stroke-[3]"
          >
            {/* generous hit area — the visible node is smaller than the target */}
            <circle cx={p.x} cy={p.y} r="30" fill="transparent" />
            {node}
          </g>
        );
      })}

      {/* Governing core */}
      <circle cx={C.x} cy={C.y} r="46" fill="url(#rs-core)" />
      <circle cx={C.x} cy={C.y} r="46" fill="none" stroke="#93DCF6" strokeOpacity="0.35" strokeWidth="1.5" />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <line x1={C.x - 14} y1={C.y + 12} x2={C.x - 14} y2={C.y - 1} />
        <line x1={C.x} y1={C.y + 12} x2={C.x} y2={C.y - 13} />
        <line x1={C.x + 14} y1={C.y + 12} x2={C.x + 14} y2={C.y + 4} />
      </g>

      {!ambient && labelled && (
        <text
          x={C.x}
          y={C.y + 74}
          textAnchor="middle"
          className={cn('fill-navy-200 font-medium tracking-wide', nodeLabels ? 'text-[13px]' : 'text-[11px]')}
        >
          {locale === 'fa' ? 'سیستم عامل ریتیل' : 'Retail Operating System'}
        </text>
      )}
    </svg>
  );
}
