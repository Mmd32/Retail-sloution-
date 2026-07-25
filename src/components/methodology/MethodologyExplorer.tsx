'use client';

import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { phases } from '@/content/methodology';
import { u } from '@/content/ui';

/** Interactive phase explorer: a stepper on top, detail panel below. */
export function MethodologyExplorer({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <div>
      {/* Stepper */}
      <ol className="grid gap-2 sm:grid-cols-5" role="tablist" aria-label="Methodology phases">
        {phases.map((p, i) => {
          const isActive = i === active;
          return (
            <li key={p.key}>
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={`phase-panel-${p.key}`}
                id={`phase-tab-${p.key}`}
                onClick={() => setActive(i)}
                className={`w-full rounded-card border p-4 text-start transition-colors ${
                  isActive ? 'border-cyan bg-callout-info' : 'border-line bg-white hover:border-cyan-200'
                }`}
              >
                <span className={`text-sm font-semibold ${isActive ? 'text-functional' : 'text-ink-faint'}`}>
                  0{i + 1}
                </span>
                <span className="mt-1 block font-semibold text-navy">{p.name[locale]}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Panel */}
      <div
        id={`phase-panel-${phase.key}`}
        role="tabpanel"
        aria-labelledby={`phase-tab-${phase.key}`}
        className="mt-8 rounded-feature border border-line bg-white p-8"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-cyan">0{active + 1}</span>
          <h3 className="text-h2 text-navy">{phase.name[locale]}</h3>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Field label={u('objective', locale)}>
              <p className="text-ink-muted">{phase.objective[locale]}</p>
            </Field>
            <Field label={u('activities', locale)}>
              <ul className="space-y-1.5">
                {phase.activities[locale].map((a, i) => (
                  <li key={i} className="text-ink-muted">• {a}</li>
                ))}
              </ul>
            </Field>
            <Field label={u('clientParticipation', locale)}>
              <p className="text-ink-muted">{phase.participation[locale]}</p>
            </Field>
          </div>
          <div className="space-y-6">
            <Field label={u('typicalOutputs', locale)}>
              <div className="flex flex-wrap gap-2">
                {phase.outputs[locale].map((o, i) => (
                  <span key={i} className="rounded-full bg-surface-muted px-3 py-1.5 text-sm text-navy">{o}</span>
                ))}
              </div>
            </Field>
            <Field label={u('decisionGate', locale)}>
              <p className="rounded-card border-s-2 border-cyan bg-callout-info p-4 text-ink">{phase.gate[locale]}</p>
            </Field>
            <Field label={u('nextPhase', locale)}>
              <p className="flex items-start gap-2 text-ink-muted">
                <ArrowDown className="mt-1 h-4 w-4 shrink-0 text-functional" aria-hidden />
                {phase.connection[locale]}
              </p>
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-functional">{label}</p>
      {children}
    </div>
  );
}
