'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, formatNumber, cn } from '@/lib/utils';
import { dimensions, answerScale, assessmentMeta, totalQuestions } from '@/content/assessment';
import { u } from '@/content/ui';
import { track } from '@/lib/analytics';
import { Button, ButtonLink } from '@/components/ui/Button';

/**
 * The assessment starts on the homepage (§14).
 *
 * Three questions, one per screen, drawn from three different dimensions so
 * the preliminary read is directional rather than a single-topic sample. The
 * answers are handed to the full assessment through sessionStorage — this is a
 * real continuation, not a decorative teaser that throws the input away.
 *
 * ASSESSMENT_SEED_KEY is read by AssessmentFlow on mount.
 */

export const ASSESSMENT_SEED_KEY = 'rs-assessment-seed';

/** One question from each of three dimensions, kept as [dimKey, questionIndex]. */
const SEED_QUESTIONS: [string, number][] = [
  ['owner-dependency', 0],
  ['operational-standardization', 0],
  ['data-analytics', 0],
];

export function AssessmentTeaser({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const Fwd = locale === 'fa' ? ArrowLeft : ArrowRight;

  const seeds = SEED_QUESTIONS.map(([dimKey, qi]) => {
    const dim = dimensions.find((d) => d.key === dimKey);
    return dim ? { dim, qi, key: `${dimKey}-${qi}`, question: dim.questions[qi] } : null;
  }).filter(Boolean) as {
    dim: (typeof dimensions)[number];
    qi: number;
    key: string;
    question: (typeof dimensions)[number]['questions'][number];
  }[];

  const done = step >= seeds.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((Math.min(step, seeds.length) / seeds.length) * 100);

  /* A directional read only. Three questions cannot produce a maturity score,
     and claiming one would be exactly the kind of invented result this site
     must not publish — so we describe the signal, never a number. */
  const signal = (() => {
    const vals = Object.values(answers);
    if (!vals.length) return null;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (avg <= 1.34)
      return {
        tone: 'critical' as const,
        label: { fa: 'نشانه‌های وابستگی به افراد', en: 'Signs of person-dependency' },
        body: {
          fa: 'پاسخ‌های شما به سمت سازمانی اشاره دارد که اجرا و تصمیم‌گیری هنوز به افراد گره خورده است. ارزیابی کامل مشخص می‌کند این وابستگی در کدام بخش‌ها بیشترین ریسک را ایجاد می‌کند.',
          en: 'Your answers point toward an organization where execution and decisions are still tied to individuals. The full assessment identifies where that dependency creates the most risk.',
        },
      };
    if (avg <= 2.67)
      return {
        tone: 'attention' as const,
        label: { fa: 'ساختار در حال شکل‌گیری', en: 'Structure taking shape' },
        body: {
          fa: 'بخشی از سیستم شکل گرفته اما هنوز یکدست نیست. ارزیابی کامل نشان می‌دهد کدام حوزه‌ها از بقیه عقب مانده‌اند.',
          en: 'Parts of the system exist but are not yet consistent. The full assessment shows which areas are lagging behind the rest.',
        },
      };
    return {
      tone: 'success' as const,
      label: { fa: 'پایه سیستمی موجود', en: 'A system foundation exists' },
      body: {
        fa: 'پاسخ‌های اولیه به یک پایه ساختاریافته اشاره دارد. ارزیابی کامل روی آمادگی مقیاس‌پذیری و نقاط شکنندگی باقی‌مانده تمرکز می‌کند.',
        en: 'Your initial answers suggest a structured base. The full assessment focuses on readiness to scale and any remaining fragility.',
      },
    };
  })();

  function answer(key: string, value: number) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setStep((s) => s + 1);
    if (step === 0) track('assessment_started', { from: 'homepage' });
  }

  function continueToFull() {
    try {
      sessionStorage.setItem(ASSESSMENT_SEED_KEY, JSON.stringify(answers));
    } catch {
      /* Private mode or storage disabled — the full assessment simply starts
         from the beginning. Never block the navigation on this. */
    }
    track('assessment_continued', { answered: answeredCount });
    router.push(localePath(locale, '/assessment'));
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <p className="eyebrow">{locale === 'fa' ? 'ابزار تشخیصی' : 'Diagnostic tool'}</p>
        <h2 className="text-h2 mt-3 text-navy">{assessmentMeta.title[locale]}</h2>
        <p className="text-body mt-4 text-ink-muted">{assessmentMeta.intro[locale]}</p>
        <p className="text-label mt-6 text-ink-faint">
          {formatNumber(totalQuestions, locale)} {locale === 'fa' ? 'پرسش' : 'questions'} ·{' '}
          {formatNumber(dimensions.length, locale)} {locale === 'fa' ? 'بُعد' : 'dimensions'} ·{' '}
          {locale === 'fa' ? 'حدود ۱۰ دقیقه' : 'about 10 minutes'}
        </p>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-feature border border-line bg-white p-6 shadow-card sm:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-label text-ink-muted">
              <span>
                {done
                  ? locale === 'fa'
                    ? 'نتیجه مقدماتی'
                    : 'Preliminary read'
                  : `${locale === 'fa' ? 'پرسش' : 'Question'} ${formatNumber(step + 1, locale)} ${u('of', locale)} ${formatNumber(seeds.length, locale)}`}
              </span>
              <span>{formatNumber(progress, locale)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-functional transition-[width] duration-emphasis ease-standard"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {!done && seeds[step] && (
            <div key={seeds[step].key}>
              <p className="text-xs font-semibold uppercase tracking-label text-functional">
                {seeds[step].dim.name[locale]}
              </p>
              <fieldset className="mt-3">
                <legend className="text-h3 text-navy">{seeds[step].question[locale]}</legend>
                <div className="mt-5 space-y-2">
                  {answerScale.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => answer(seeds[step].key, opt.value)}
                      className="flex min-h-[44px] w-full items-center gap-3 rounded-control border border-line px-4 py-3 text-start text-label text-navy transition-colors duration-micro ease-standard hover:border-functional hover:bg-callout-info"
                    >
                      <span
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-xs font-semibold text-ink-faint"
                        aria-hidden
                      >
                        {formatNumber(opt.value, locale)}
                      </span>
                      {opt.label[locale]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {done && signal && (
            <div>
              <div
                className={cn(
                  'rounded-card border p-5',
                  signal.tone === 'critical' && 'border-error/35 bg-callout-critical',
                  signal.tone === 'attention' && 'border-decision/40 bg-callout-attention',
                  signal.tone === 'success' && 'border-success/35 bg-callout-success',
                )}
              >
                <p className="font-semibold text-navy">{signal.label[locale]}</p>
                <p className="text-label mt-2 text-ink-muted">{signal.body[locale]}</p>
              </div>

              <p className="text-label mt-5 text-ink-faint">
                {locale === 'fa'
                  ? 'این یک نشانه اولیه بر پایه سه پرسش است، نه امتیاز آمادگی. ارزیابی کامل ده بُعد را می‌سنجد و گزارش تفصیلی ارائه می‌دهد.'
                  : 'This is an early signal from three questions, not a readiness score. The full assessment covers ten dimensions and produces a detailed report.'}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={continueToFull} size="lg">
                  {locale === 'fa' ? 'ادامه ارزیابی کامل' : 'Continue the full assessment'}
                  <Fwd className="h-4 w-4" aria-hidden />
                </Button>
                <Button onClick={reset} size="lg" variant="secondary">
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  {locale === 'fa' ? 'شروع دوباره' : 'Start over'}
                </Button>
              </div>
            </div>
          )}

          {/* Always available, including before answering anything. */}
          {!done && (
            <div className="mt-6 border-t border-line pt-5">
              <ButtonLink
                href={localePath(locale, '/assessment')}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {locale === 'fa' ? 'رفتن به ارزیابی کامل' : 'Go to the full assessment'}
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
