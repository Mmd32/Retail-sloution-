'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RotateCcw, Lock } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import {
  dimensions,
  answerScale,
  maturityLevels,
  assessmentMeta,
  assessmentLeadFields,
  recommendService,
  totalQuestions,
} from '@/content/assessment';
import { services } from '@/content/services';
import { localePath, formatNumber } from '@/lib/utils';
import { u } from '@/content/ui';
import { track } from '@/lib/analytics';
import { Button, ButtonLink } from '@/components/ui/Button';
import { LeadForm } from '@/components/forms/LeadForm';

type Phase = 'intro' | 'questions' | 'preview' | 'result';

export function AssessmentFlow({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [dimIndex, setDimIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const Fwd = locale === 'fa' ? ArrowLeft : ArrowRight;
  const Back = locale === 'fa' ? ArrowRight : ArrowLeft;

  const scores = useMemo(() => computeScores(answers), [answers]);
  const overall = useMemo(() => {
    const vals = Object.values(scores);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }, [scores]);
  const level = useMemo(() => maturityLevels.find((l) => overall >= l.min && overall <= l.max)!, [overall]);
  const recommendation = useMemo(() => recommendService(scores), [scores]);
  const recommendedService = services.find((s) => s.slug === recommendation.service);

  const answeredInDim = (i: number) =>
    dimensions[i].questions.every((_, qi) => answers[`${dimensions[i].key}-${qi}`] !== undefined);

  const currentDim = dimensions[dimIndex];

  function setAnswer(qKey: string, value: number) {
    setAnswers((a) => ({ ...a, [qKey]: value }));
  }

  function start() {
    setPhase('questions');
    track('assessment_started');
  }

  function nextDim() {
    track('assessment_step_completed', { step: dimIndex + 1 });
    if (dimIndex < dimensions.length - 1) {
      setDimIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('preview');
      track('assessment_completed', { overall });
    }
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-navy md:text-3xl">{assessmentMeta.title[locale]}</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">{assessmentMeta.intro[locale]}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {dimensions.map((d) => (
            <div key={d.key} className="rounded border border-line bg-surface-muted px-4 py-3 text-sm text-navy">
              {d.name[locale]}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-faint">
            {formatNumber(totalQuestions, locale)} {locale === 'fa' ? 'پرسش' : 'questions'} ·{' '}
            {formatNumber(dimensions.length, locale)} {locale === 'fa' ? 'بُعد' : 'dimensions'}
          </p>
          <Button onClick={start} size="lg">
            {u('startAssessment', locale)} <Fwd className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <Disclaimer locale={locale} />
      </Card>
    );
  }

  // ── QUESTIONS (progressive, one dimension at a time) ────────────────────────
  if (phase === 'questions') {
    const progress = Math.round(((dimIndex) / dimensions.length) * 100);
    return (
      <Card>
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-ink-muted">
            <span>
              {u('dimension', locale)} {formatNumber(dimIndex + 1, locale)} {u('of', locale)}{' '}
              {formatNumber(dimensions.length, locale)}
            </span>
            <span>{formatNumber(progress, locale)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full bg-accent-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-navy md:text-2xl">{currentDim.name[locale]}</h2>

        <div className="mt-6 space-y-6">
          {currentDim.questions.map((q, qi) => {
            const qKey = `${currentDim.key}-${qi}`;
            return (
              <fieldset key={qKey} className="rounded-lg border border-line p-5">
                <legend className="px-1 text-base font-medium text-navy">{q[locale]}</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-5">
                  {answerScale.map((opt) => {
                    const selected = answers[qKey] === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`cursor-pointer rounded border p-3 text-center text-xs transition-colors ${
                          selected ? 'border-accent-500 bg-accent-50 text-navy' : 'border-line hover:border-accent-300 text-ink-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name={qKey}
                          value={opt.value}
                          checked={selected}
                          onChange={() => setAnswer(qKey, opt.value)}
                          className="sr-only"
                        />
                        {opt.label[locale]}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={() => (dimIndex === 0 ? setPhase('intro') : setDimIndex((i) => i - 1))}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy"
          >
            <Back className="h-4 w-4" aria-hidden /> {u('previous', locale)}
          </button>
          <Button onClick={nextDim} disabled={!answeredInDim(dimIndex)}>
            {dimIndex === dimensions.length - 1 ? u('seePreview', locale) : u('next', locale)}
            <Fwd className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Card>
    );
  }

  // ── PREVIEW (partial value, before lead capture) ────────────────────────────
  if (phase === 'preview') {
    return (
      <Card>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-accent-600">
          {u('yourMaturity', locale)}
        </p>
        <div className="mt-4 flex flex-col items-center">
          <Gauge value={overall} locale={locale} />
          <p className="mt-4 text-2xl font-bold text-navy">{level.label[locale]}</p>
          <p className="mt-2 max-w-md text-center text-ink-muted">{level.description[locale]}</p>
        </div>

        {/* Locked full breakdown */}
        <div className="relative mt-8">
          <div className="pointer-events-none select-none space-y-3 opacity-40 blur-[3px]" aria-hidden>
            {dimensions.slice(0, 4).map((d) => (
              <Bar key={d.key} label={d.name[locale]} value={scores[d.key] ?? 0} locale={locale} />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/60">
            <Lock className="h-6 w-6 text-accent-600" aria-hidden />
            <p className="mt-2 max-w-sm text-center text-sm text-navy">{assessmentLeadFields.intro[locale]}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <LeadForm
            locale={locale}
            type="assessment"
            assessment={{ score: overall, level: level.label.en }}
          />
          {/* Reveal full result client-side after submission via a light bridge. */}
          <div className="mt-4 text-center">
            <button onClick={() => setPhase('result')} className="text-sm font-medium text-accent-700 hover:text-navy">
              {u('getFullResult', locale)} →
            </button>
          </div>
        </div>
        <Disclaimer locale={locale} />
      </Card>
    );
  }

  // ── FULL RESULT ─────────────────────────────────────────────────────────────
  return (
    <Card>
      <div className="flex flex-col items-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">{u('overallScore', locale)}</p>
        <Gauge value={overall} locale={locale} />
        <p className="mt-3 text-2xl font-bold text-navy">{level.label[locale]}</p>
        <p className="mt-2 max-w-md text-center text-ink-muted">{level.description[locale]}</p>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-navy">{u('dimensionBreakdown', locale)}</h3>
        <div className="mt-4 space-y-3">
          {dimensions.map((d) => (
            <Bar key={d.key} label={d.name[locale]} value={scores[d.key] ?? 0} locale={locale} />
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-accent-200 bg-accent-50 p-6">
        <h3 className="text-lg font-semibold text-navy">{u('preliminaryRecommendation', locale)}</h3>
        {recommendedService ? (
          <p className="mt-2 text-ink">
            {locale === 'fa'
              ? `بر پایه‌ی پاسخ‌های شما، راهکار ${recommendedService.abbr} می‌تواند نقطه‌ی شروع مناسبی باشد.`
              : `Based on your answers, ${recommendedService.abbr} may be a suitable starting point.`}
          </p>
        ) : (
          <p className="mt-2 text-ink">
            {locale === 'fa'
              ? 'بر پایه‌ی پاسخ‌های شما، یک برنامه‌ی یکپارچه‌ی تحول ریتیل پیشنهاد می‌شود.'
              : 'Based on your answers, an integrated Retail Transformation engagement is recommended.'}
          </p>
        )}
        <p className="mt-2 text-xs text-ink-muted">{u('recommendationNote', locale)}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {recommendedService ? (
            <ButtonLink href={localePath(locale, `/solutions/${recommendedService.slug}`)}>
              {recommendedService.abbr} — {recommendedService.fullName[locale]}
            </ButtonLink>
          ) : (
            <ButtonLink href={localePath(locale, '/solutions')}>
              {locale === 'fa' ? 'مشاهده راهکارها' : 'View solutions'}
            </ButtonLink>
          )}
          <ButtonLink href={localePath(locale, '/contact')} variant="secondary">
            {u('requestMeeting', locale)}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            setAnswers({});
            setDimIndex(0);
            setPhase('intro');
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> {u('restart', locale)}
        </button>
      </div>
      <Disclaimer locale={locale} />
    </Card>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────
function computeScores(answers: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const d of dimensions) {
    const max = d.questions.length * 4;
    let sum = 0;
    let answered = 0;
    d.questions.forEach((_, qi) => {
      const v = answers[`${d.key}-${qi}`];
      if (v !== undefined) {
        sum += v;
        answered++;
      }
    });
    out[d.key] = answered ? Math.round((sum / max) * 100) : 0;
  }
  return out;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl rounded-xl border border-line bg-white p-6 shadow-card md:p-10">{children}</div>;
}

function Disclaimer({ locale }: { locale: Locale }) {
  return (
    <p className="mt-6 rounded border border-line bg-surface-muted p-3 text-center text-xs text-ink-muted">
      {assessmentMeta.disclaimer[locale]}
    </p>
  );
}

function Gauge({ value, locale }: { value: number; locale: Locale }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E3E8EF" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#0AA2DE"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-navy">{formatNumber(value, locale)}</span>
        <span className="text-xs text-ink-faint">/ {formatNumber(100, locale)}</span>
      </div>
    </div>
  );
}

function Bar({ label, value, locale }: { label: string; value: number; locale: Locale }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-navy">{label}</span>
        <span className="font-medium text-ink-muted">{formatNumber(value, locale)}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-accent-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
