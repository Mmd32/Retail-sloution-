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
        fa: 'تصمیم‌ها در ذهن مدیران باقی می‌ماند و جایی ثبت نمی‌شود.',
        en: 'Decisions stay in managers’ heads and are never recorded.',
      },
      {
        fa: 'اجرای شعب یکسان نیست و کیفیت به فرد گره خورده است.',
        en: 'Branch execution is inconsistent; quality is tied to individuals.',
      },
      {
        fa: 'رشد باعث افزایش آشفتگی می‌شود، نه افزایش ظرفیت.',
        en: 'Growth adds disorder rather than capacity.',
      },
      {
        fa: 'خروج افراد کلیدی مستقیماً به سازمان آسیب می‌زند.',
        en: 'The departure of a key person damages the organization directly.',
      },
      {
        fa: 'دانش سازمانی منتقل نمی‌شود و با هر خروج از بین می‌رود.',
        en: 'Organizational knowledge is not transferred; it leaves with people.',
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

function Graph({ mode, locale }: { mode: Mode; locale: Locale }) {
  const person = mode === 'person';

  return (
    <svg
      viewBox="0 0 400 248"
      className="w-full"
      role="img"
      aria-label={
        person
          ? locale === 'fa'
            ? 'نمودار: تمام ارتباطات به یک نقطه مرکزی متصل است و با حذف آن شبکه از هم می‌پاشد.'
            : 'Diagram: every connection terminates at a single central point; removing it disconnects the network.'
          : locale === 'fa'
            ? 'نمودار: نقاط به یکدیگر متصل‌اند و حذف هر نقطه شبکه را از هم نمی‌پاشد.'
            : 'Diagram: nodes are meshed together; removing any one of them does not disconnect the network.'
      }
    >
      {/* Spokes to the hub — the only structure in the person-dependent state */}
      {NODES.map((n, i) => (
        <line
          key={`s-${i}`}
          x1={HUB.x}
          y1={HUB.y}
          x2={n.x}
          y2={n.y}
          stroke={person ? '#E85D75' : '#2A3F66'}
          strokeWidth={person ? 1.8 : 1}
          opacity={person ? 0.95 : 0.35}
          style={{ transition: 'all var(--rs-d-standard) var(--rs-ease)' }}
        />
      ))}

      {/* Peer mesh — fades in only when the system exists */}
      {NODES.map((a, i) => {
        const b = NODES[(i + 1) % NODES.length];
        const c = NODES[(i + 2) % NODES.length];
        return (
          <g
            key={`m-${i}`}
            style={{
              opacity: person ? 0 : 1,
              transition: 'opacity var(--rs-d-reveal) var(--rs-ease)',
            }}
          >
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#00B0F0" strokeWidth="1.4" opacity="0.8" />
            <line x1={a.x} y1={a.y} x2={c.x} y2={c.y} stroke="#00B0F0" strokeWidth="1" opacity="0.4" />
          </g>
        );
      })}

      {/* Centre: a single point of failure, or a governing core */}
      <circle
        cx={HUB.x}
        cy={HUB.y}
        r={person ? 26 : 18}
        fill={person ? '#E85D75' : '#0782B5'}
        style={{ transition: 'all var(--rs-d-standard) var(--rs-ease)' }}
      />
      {person ? (
        /* a person */
        <g fill="#fff" style={{ transition: 'opacity var(--rs-d-standard)' }}>
          <circle cx={HUB.x} cy={HUB.y - 6} r="5.5" />
          <path d={`M${HUB.x - 9} ${HUB.y + 11} a9 9 0 0 1 18 0 z`} />
        </g>
      ) : (
        /* a system */
        <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
          <line x1={HUB.x - 6} y1={HUB.y + 5} x2={HUB.x - 6} y2={HUB.y - 1} />
          <line x1={HUB.x} y1={HUB.y + 5} x2={HUB.x} y2={HUB.y - 6} />
          <line x1={HUB.x + 6} y1={HUB.y + 5} x2={HUB.x + 6} y2={HUB.y + 1} />
        </g>
      )}

      {NODES.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r="11"
          fill="#0B1F3A"
          stroke={person ? '#3A4870' : '#00B0F0'}
          strokeWidth="1.5"
          style={{ transition: 'stroke var(--rs-d-standard) var(--rs-ease)' }}
        />
      ))}
    </svg>
  );
}

export function DependencyToggle({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>('person');
  const baseId = useId();
  const modes: Mode[] = ['person', 'system'];
  const active = content[mode];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <div
          role="tablist"
          aria-label={locale === 'fa' ? 'مقایسه دو حالت سازمان' : 'Compare the two organizational states'}
          className="inline-flex rounded-button border border-white/15 bg-white/5 p-1"
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
                mode === m ? 'bg-cyan text-navy-900' : 'text-navy-200 hover:text-white',
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
                    mode === 'person' ? 'bg-human/20 text-human' : 'bg-cyan/20 text-cyan',
                  )}
                  aria-hidden
                >
                  {mode === 'person' ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="text-body text-navy-100">{p[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rs-blueprint rounded-feature border border-white/10 bg-navy-900 p-6 sm:p-10">
          <Graph mode={mode} locale={locale} />
          <p className="text-label mt-6 text-center text-navy-300">
            {mode === 'person'
              ? locale === 'fa'
                ? 'حذف یک نقطه، شبکه را از هم می‌پاشد.'
                : 'Remove one node and the network falls apart.'
              : locale === 'fa'
                ? 'شبکه بدون هیچ نقطه‌ای همچنان متصل می‌ماند.'
                : 'The network stays connected without any single node.'}
          </p>
        </div>
      </div>
    </div>
  );
}
