import { Check, Minus } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { differentiation } from '@/content/site';

/**
 * Traditional consulting vs the Retail Solutions model (§11).
 *
 * A split comparison rather than two equal cards: the traditional column stops
 * after four steps, ours continues for seven, and the columns are aligned to
 * the same baseline so the difference is visible as *length* before it is read
 * as text. That is the argument the section exists to make.
 */

const traditionalSteps: { fa: string; en: string }[] = [
  { fa: 'ارائه تحلیل', en: 'Analysis delivered' },
  { fa: 'ارائه گزارش', en: 'Report delivered' },
  { fa: 'ارائه پیشنهاد', en: 'Recommendations delivered' },
  { fa: 'اجرا بر عهده تیم داخلی', en: 'Execution left to the internal team' },
];

const rsSteps: { fa: string; en: string }[] = [
  { fa: 'تشخیص مسئله', en: 'Diagnose the problem' },
  { fa: 'طراحی سیستم', en: 'Design the system' },
  { fa: 'اجرای آزمایشی', en: 'Run a pilot' },
  { fa: 'انتقال دانش', en: 'Transfer the knowledge' },
  { fa: 'آموزش تیم', en: 'Train the team' },
  { fa: 'پایش عملکرد', en: 'Monitor performance' },
  { fa: 'تثبیت قابلیت در سازمان', en: 'Embed the capability in the organization' },
];

export function EngagementComparison({ locale }: { locale: Locale }) {
  return (
    <div className="stack-header grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-2">
      {/* Traditional */}
      <div className="bg-surface-muted p-7 md:p-9">
        <p className="text-xs font-semibold uppercase tracking-label text-ink-faint">
          {differentiation.traditional.label[locale]}
        </p>
        <h3 className="text-h3 mt-3 text-ink-muted">
          {differentiation.traditional.headline[locale]}
        </h3>
        <ol className="mt-7 space-y-3">
          {traditionalSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-faint"
                aria-hidden
              >
                <Minus className="h-3 w-3" />
              </span>
              <span className="text-label text-ink-muted">{s[locale]}</span>
            </li>
          ))}
        </ol>
        <p className="text-label mt-7 border-t border-line pt-5 text-ink-muted">
          {differentiation.traditional.body[locale]}
        </p>
      </div>

      {/* Retail Solutions */}
      <div className="relative bg-surface p-7 md:p-9">
        <span className="absolute inset-y-0 start-0 w-0.5 bg-cyan" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-label text-functional">
          {differentiation.retailSolutions.label[locale]}
        </p>
        <h3 className="text-h3 mt-3 text-navy">
          {differentiation.retailSolutions.headline[locale]}
        </h3>
        <ol className="mt-7 space-y-3">
          {rsSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-functional"
                aria-hidden
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="text-label font-medium text-navy">{s[locale]}</span>
            </li>
          ))}
        </ol>
        <p className="text-label mt-7 border-t border-line pt-5 text-ink-muted">
          {differentiation.retailSolutions.body[locale]}
        </p>
      </div>
    </div>
  );
}
