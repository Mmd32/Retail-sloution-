'use client';

import { useId, useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Person-dependent vs system-driven (§6).
 *
 * The argument the whole site rests on, made arguable rather than asserted:
 * the same organization is drawn twice. In the person-dependent state every
 * line terminates at one node — remove it and the graph disconnects. In the
 * system-driven state the nodes are meshed, so no single removal breaks it.
 *
 * The two SVGs share a node layout, so switching states crossfades and the
 * eye tracks the *topology* changing rather than a new picture appearing.
 * Implemented as a tablist so it is keyboard-operable, and both panels' text
 * is real content — nothing here depends on the animation to be understood.
 */

type Mode = 'person' | 'system';

const NODES = [
  { x: 60, y: 52 },
  { x: 200, y: 34 },
  { x: 340, y: 52 },
  { x: 356, y: 176 },
  { x: 200, y: 214 },
  { x: 44, y: 176 },
];
const HUB = { x: 200, y: 124 };

const content: Record<
  Mode,
  { label: { fa: string; en: string }; points: { fa: string; en: string }[] }
> = {
  person: {
    label: { fa: 'سازمان فردمحور', en: 'Person-dependent organization' },
    points: [
      {
        fa: 'تصمیم‌های مهم بیشتر نزد چند مدیر کلیدی است و کمتر ثبت می‌شود.',
        en: 'Key decisions sit mostly with a few managers and are rarely written down.',
      },
      {
        fa: 'کیفیت اجرا در هر شعبه به مهارت مدیر همان شعبه بستگی دارد.',
        en: 'Execution quality in each branch depends on that branch manager.',
      },
      {
        fa: 'رشد، بار کاری تیم را سریع‌تر از ظرفیت سازمان بالا می‌برد.',
        en: 'Growth raises the team’s workload faster than the organization’s capacity.',
      },
      {
        fa: 'جابه‌جایی افراد کلیدی، روند کار را با وقفه روبه‌رو می‌کند.',
        en: 'When a key person moves on, the work is interrupted.',
      },
      {
        fa: 'تجربه ارزشمند افراد، هنوز به دانش مشترک سازمان تبدیل نشده است.',
        en: 'Valuable personal experience has not yet become shared knowledge.',
      },
    ],
  },
  system: {
    label: { fa: 'سازمان سیستم‌محور', en: 'System-driven organization' },
    points: [
      {
        fa: 'تصمیم‌ها بر پایه داده و استاندارد مکتوب انجام می‌شود.',
        en: 'Decisions are made against data and written standards.',
      },
      {
        fa: 'عملیات قابل تکرار است و مستقل از فرد اجرا می‌شود.',
        en: 'Operations are repeatable and run independently of any individual.',
      },
      {
        fa: 'دانش سازمانی ثبت، نگهداری و منتقل می‌شود.',
        en: 'Organizational knowledge is captured, kept, and transferred.',
      },
      {
        fa: 'شعب قابلیت توسعه کنترل‌شده و قابل پیش‌بینی دارند.',
        en: 'Branches can expand in a controlled, predictable way.',
      },
      {
        fa: 'وابستگی به افراد کلیدی کاهش پیدا می‌کند.',
        en: 'Dependency on key individuals falls.',
      },
    ],
  },
};

type Removed = 'hub' | number | null;

function Graph({
  mode,
  locale,
  removed,
  onRemove,
}: {
  mode: Mode;
  locale: Locale;
  removed: Removed;
  onRemove: (r: Removed) => void;
}) {
  const person = mode === 'person';
  const hubGone = removed === 'hub';
  const t = 'all var(--rs-d-standard) var(--rs-ease)';
  const key = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };
  const focusRing = 'cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-cyan';

  return (
    <svg
      viewBox="0 0 400 248"
      className="w-full"
      role="group"
      aria-label={
        person
          ? locale === 'fa'
            ? 'نمودار: تمام ارتباطات به یک نقطه مرکزی متصل است. با کلیک روی آن نقطه، اثر رفتنش را ببینید.'
            : 'Diagram: every connection terminates at one central point. Select it to see what happens when it leaves.'
          : locale === 'fa'
            ? 'نمودار: نقاط به یکدیگر متصل‌اند. روی هر نقطه کلیک کنید تا ببینید شبکه همچنان متصل می‌ماند.'
            : 'Diagram: nodes are meshed together. Select any node to see that the network stays connected.'
      }
    >
      {/* Spokes to the hub — the only structure in the person-dependent state */}
      {NODES.map((n, i) => {
        const gone = removed === i;
        return (
          <line
            key={`s-${i}`}
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
            stroke={person ? '#E85D75' : '#2A3F66'}
            strokeWidth={person ? 1.8 : 1}
            strokeDasharray={person && hubGone ? '3 7' : undefined}
            opacity={gone ? 0 : person ? (hubGone ? 0.18 : 0.95) : 0.35}
            style={{ transition: t }}
          />
        );
      })}

      {/* Peer mesh — fades in only when the system exists */}
      {NODES.map((a, i) => {
        const bi = (i + 1) % NODES.length;
        const ci = (i + 2) % NODES.length;
        const b = NODES[bi];
        const c = NODES[ci];
        const abGone = removed === i || removed === bi;
        const acGone = removed === i || removed === ci;
        return (
          <g
            key={`m-${i}`}
            style={{
              opacity: person ? 0 : 1,
              transition: 'opacity var(--rs-d-reveal) var(--rs-ease)',
            }}
          >
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#00B0F0"
              strokeWidth="1.4"
              opacity={abGone ? 0 : 0.8}
              style={{ transition: t }}
            />
            <line
              x1={a.x}
              y1={a.y}
              x2={c.x}
              y2={c.y}
              stroke="#00B0F0"
              strokeWidth="1"
              opacity={acGone ? 0 : 0.4}
              style={{ transition: t }}
            />
          </g>
        );
      })}

      {/* Centre: a single point of failure, or a governing core */}
      {person ? (
        <g
          role="button"
          tabIndex={0}
          aria-pressed={hubGone}
          aria-label={
            locale === 'fa'
              ? hubGone
                ? 'بازگرداندن نقطه مرکزی'
                : 'حذف نقطه مرکزی'
              : hubGone
                ? 'Restore the central point'
                : 'Remove the central point'
          }
          className={focusRing}
          onClick={() => onRemove(hubGone ? null : 'hub')}
          onKeyDown={key(() => onRemove(hubGone ? null : 'hub'))}
        >
          <circle cx={HUB.x} cy={HUB.y} r="34" fill="transparent" />
          {/* attention ring while the point is still there */}
          {!hubGone && (
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="34"
              fill="none"
              stroke="#E85D75"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              className="rs-pulse"
            />
          )}
          <g className={hubGone ? 'rs-gone' : undefined} style={{ transition: t }}>
            <circle cx={HUB.x} cy={HUB.y} r="26" fill="#E85D75" />
            <g fill="#fff">
              <circle cx={HUB.x} cy={HUB.y - 6} r="5.5" />
              <path d={`M${HUB.x - 9} ${HUB.y + 11} a9 9 0 0 1 18 0 z`} />
            </g>
          </g>
        </g>
      ) : (
        <g>
          <circle cx={HUB.x} cy={HUB.y} r="18" fill="#0782B5" />
          <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <line x1={HUB.x - 6} y1={HUB.y + 5} x2={HUB.x - 6} y2={HUB.y - 1} />
            <line x1={HUB.x} y1={HUB.y + 5} x2={HUB.x} y2={HUB.y - 6} />
            <line x1={HUB.x + 6} y1={HUB.y + 5} x2={HUB.x + 6} y2={HUB.y + 1} />
          </g>
        </g>
      )}

      {NODES.map((n, i) => {
        const gone = removed === i;
        const body = (
          <circle
            cx={n.x}
            cy={n.y}
            r="11"
            fill="#0B1F3A"
            stroke={person ? (hubGone ? '#2A3F66' : '#3A4870') : '#00B0F0'}
            strokeWidth="1.5"
            style={{ transition: t }}
          />
        );
        if (person) return <g key={`n-${i}`}>{body}</g>;
        return (
          <g
            key={`n-${i}`}
            role="button"
            tabIndex={0}
            aria-pressed={gone}
            aria-label={
              locale === 'fa'
                ? gone
                  ? `بازگرداندن نقطه ${i + 1}`
                  : `حذف نقطه ${i + 1}`
                : gone
                  ? `Restore node ${i + 1}`
                  : `Remove node ${i + 1}`
            }
            className={focusRing}
            onClick={() => onRemove(gone ? null : i)}
            onKeyDown={key(() => onRemove(gone ? null : i))}
          >
            <circle cx={n.x} cy={n.y} r="22" fill="transparent" />
            <g className={gone ? 'rs-gone' : undefined} style={{ transition: t }}>
              {body}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function caption(mode: Mode, removed: Removed, locale: Locale) {
  const fa = locale === 'fa';
  if (mode === 'person') {
    return removed === 'hub'
      ? fa
        ? 'با رفتنِ همان یک نفر، همه‌چیز از هم می‌پاشد. (برای بازگرداندن دوباره کلیک کنید)'
        : 'When that one person goes, everything comes apart. (Select again to restore)'
      : fa
        ? 'همه مسیرها از یک نقطه می‌گذرند. روی آن کلیک کنید.'
        : 'Every path runs through a single point. Select it.';
  }
  return removed !== null
    ? fa
      ? 'یک نقطه کنار رفت، اما بقیه هنوز به هم وصل‌اند و سیستم کار می‌کند.'
      : 'One point is gone, yet the rest stay connected and the system keeps working.'
    : fa
      ? 'شبکه بدون هیچ نقطه‌ای همچنان متصل می‌ماند. روی یک نقطه کلیک کنید.'
      : 'The network stays connected without any single node. Select a point.';
}

export function DependencyToggle({ locale }: { locale: Locale }) {
  const [mode, setModeRaw] = useState<Mode>('person');
  const [removed, setRemoved] = useState<Removed>(null);
  const setMode = (m: Mode | ((cur: Mode) => Mode)) => {
    setRemoved(null);
    setModeRaw(m);
  };
  const baseId = useId();
  const modes: Mode[] = ['person', 'system'];
  const active = content[mode];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <div
          role="tablist"
          aria-label={locale === 'fa' ? 'مقایسه دو حالت سازمان' : 'Compare the two organizational states'}
          className="inline-flex rounded-button border border-line bg-surface p-1"
        >
          {modes.map((m) => (
            <button
              key={m}
              role="tab"
              id={`${baseId}-tab-${m}`}
              aria-selected={mode === m}
              aria-controls={`${baseId}-panel-${m}`}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => setMode(m)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setMode((cur) => (cur === 'person' ? 'system' : 'person'));
                }
              }}
              className={cn(
                'inline-flex min-h-[44px] items-center rounded-control px-5 text-label font-semibold transition-colors duration-standard ease-standard',
                mode === m ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink',
              )}
            >
              {content[m].label[locale]}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${mode}`}
          aria-labelledby={`${baseId}-tab-${mode}`}
          className="mt-8"
        >
          <ul className="space-y-4">
            {active.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={cn(
                    'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    mode === 'person' ? 'bg-human/15 text-human' : 'bg-cyan/15 text-functional',
                  )}
                  aria-hidden
                >
                  {mode === 'person' ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="text-body text-ink">{p[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-feature bg-navy p-6 sm:p-10">
          <Graph mode={mode} locale={locale} removed={removed} onRemove={setRemoved} />
          <p className="text-label mt-6 text-center text-navy-200" aria-live="polite">
            {caption(mode, removed, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}
