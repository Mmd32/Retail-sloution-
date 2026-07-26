import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { proofMetrics, clientLogos, proofMeta, hasVerifiedProof } from '@/content/proof';
import { SampleNotice } from '@/components/ui/SampleBadge';

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
    <section
      className="border-b border-line bg-surface"
      aria-label={proofMeta.eyebrow[locale]}
    >
      <div className="container-x py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {proofMetrics.map((m) => (
            <div key={m.key} className="border-s-2 border-line ps-4">
              <dt className="text-label text-ink-muted">{m.label[locale]}</dt>
              <dd
                className="mt-1 font-display text-h2 font-bold leading-none text-navy"
                aria-label={
                  m.value === null
                    ? locale === 'fa'
                      ? 'در انتظار داده تأییدشده'
                      : 'awaiting verified data'
                    : undefined
                }
              >
                {m.value ?? <span className="text-line-strong">—</span>}
              </dd>
              {m.note && <p className="text-label mt-1 text-ink-faint">{m.note[locale]}</p>}
            </div>
          ))}
        </dl>

        {hasLogos && (
          <div className="mt-12 border-t border-line pt-10">
            <p className="text-xs font-semibold uppercase tracking-label text-ink-faint">
              {proofMeta.clientsLabel[locale]}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
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

        {!hasVerifiedProof && (
          <SampleNotice locale={locale} className="mt-10 max-w-reading">
            {proofMeta.sampleNotice[locale]}
          </SampleNotice>
        )}
      </div>
    </section>
  );
}
