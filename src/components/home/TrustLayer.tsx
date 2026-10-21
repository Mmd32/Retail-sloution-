import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { proofMetrics, clientLogos, proofMeta } from '@/content/proof';
import { Layers, Sparkles, Store, Route } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';

const metricIcons: Record<string, typeof Layers> = {
  capabilities: Layers,
  solutions: Sparkles,
  industries: Store,
  stages: Route,
};

/**
 * Credibility strip, directly under the hero (§4).
 *
 * Built to be honest about what is not yet known. Where a figure has not been
 * verified the slot renders as a visible dash with its label intact, and the
 * section carries a notice explaining why. That is deliberately less flattering
 * than inventing numbers — and it is the only version that survives contact
 * with a board-level reader who asks "according to what?"
 *
 * The logo wall renders only when real logo files exist.
 */
export function TrustLayer({ locale }: { locale: Locale }) {
  const hasLogos = clientLogos.length > 0;

  return (
    <section className="border-b border-line bg-paper" aria-label={proofMeta.eyebrow[locale]}>
      {/* Four figures read as a ledger row: hairline above, figure, label.
          Tabular mono figures so they align like a report, not a banner. */}
      <div className="container-x py-10 md:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {proofMetrics.map((m) => (
            <div key={m.key} className="flex items-center gap-4">
              <span className="rs-icon-chip">
                {(() => {
                  const Icon = metricIcons[m.key] ?? Layers;
                  return <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />;
                })()}
              </span>
              <div className="flex flex-col gap-1">
              <dt className="text-sm text-ink-muted">{m.label[locale]}</dt>
              <dd
                className="num order-first text-[2.25rem] font-light leading-none text-ink"
                aria-label={
                  m.value === null
                    ? locale === 'fa'
                      ? 'در انتظار داده تأییدشده'
                      : 'awaiting verified data'
                    : undefined
                }
              >
                {m.value === null ? <span className="text-ink-faint">—</span> : <CountUp value={Number(m.value)} locale={locale} />}
              </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {hasLogos && (
        <div className="container-x border-t border-line py-4">
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-4">
            {clientLogos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-7 w-auto opacity-60 grayscale transition-opacity duration-standard ease-standard hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
