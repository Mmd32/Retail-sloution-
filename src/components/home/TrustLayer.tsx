import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { proofMetrics, clientLogos, proofMeta } from '@/content/proof';
import { formatNumber } from '@/lib/utils';

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
    <section className="rs-band border-b border-line" aria-label={proofMeta.eyebrow[locale]}>
      {/* A single band the height of the header bar: four metrics in a row,
          value beside label, so the strip reads at a glance instead of
          pushing the page down. */}
      <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-3 py-4 lg:min-h-[96px] lg:flex-nowrap">
        <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-4 lg:w-auto lg:flex-1 lg:grid-cols-4">
          {proofMetrics.map((m) => (
            <div key={m.key} className="flex flex-col items-start gap-1 border-s-2 border-cyan ps-3 sm:flex-row sm:items-center sm:gap-3">
              <dt className="text-label leading-snug text-ink-muted">{m.label[locale]}</dt>
              <dd
                className="order-first font-display text-h3 font-bold leading-none text-navy"
                aria-label={
                  m.value === null
                    ? locale === 'fa'
                      ? 'در انتظار داده تأییدشده'
                      : 'awaiting verified data'
                    : undefined
                }
              >
                {m.value === null ? <span className="text-line-strong">—</span> : formatNumber(Number(m.value), locale)}
              </dd>
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
