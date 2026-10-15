import type { Locale } from '@/i18n/config';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Eyebrow } from '@/components/ui/Section';

export function PageHero({
  locale,
  crumbs,
  eyebrow,
  title,
  intro,
  tone = 'navy',
}: {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'muted' | 'navy';
}) {
  const dark = tone === 'navy';
  return (
    <>
      {!dark && <Breadcrumbs locale={locale} items={crumbs} />}
      <section className={dark ? 'rs-blueprint relative overflow-hidden bg-navy' : 'bg-nude'}>
        {/* Faint open-frame from the logo mark — fills the empty end of the
            band without adding content. Decorative only. */}
        {dark && (
          <svg
            viewBox="0 0 520 640"
            className="pointer-events-none absolute end-12 top-1/2 hidden h-[70%] w-auto -translate-y-1/2 text-white opacity-[0.08] lg:block"
            aria-hidden
          >
            <g fill="none" stroke="currentColor" strokeWidth="26">
              <path d="M500 20 H20 V620 H500" />
              <path d="M500 20 V150" />
              <path d="M500 620 V490" />
            </g>
          </svg>
        )}
        <div className="container-x relative py-8 md:py-12">
          {dark && (
            <div className="mb-6 md:mb-8">
              <Breadcrumbs locale={locale} items={crumbs} onDark />
            </div>
          )}
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow onDark={dark}>{eyebrow}</Eyebrow>}
            <h1 className={`text-h1 mt-3 ${dark ? 'text-white' : 'text-navy'}`}>{title}</h1>
            {intro && (
              <p className={`text-body mt-4 ${dark ? 'text-navy-200' : 'text-ink-muted'}`}>{intro}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
