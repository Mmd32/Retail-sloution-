import type { Locale } from '@/i18n/config';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Eyebrow } from '@/components/ui/Section';

/**
 * Inner-page opener on the light hero field: breadcrumbs, tag, a light display
 * title and a short intro, then a cyan rule into the page. Every inner page
 * opens the same way. `tone` is kept for call-site compatibility.
 */
export function PageHero({
  locale,
  crumbs,
  eyebrow,
  title,
  intro,
}: {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'muted' | 'navy';
}) {
  return (
    <section className="rs-hero-field">
      <div className="container-x pb-14 pt-6 md:pb-20 md:pt-8">
        <Breadcrumbs locale={locale} items={crumbs} inline />
        <div className="mt-10 max-w-4xl md:mt-14">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-h1 mt-4 max-w-[22ch] text-ink">{title}</h1>
          {intro && <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-relaxed text-ink-muted">{intro}</p>}
        </div>
      </div>
      <div className="h-1 bg-cyan" aria-hidden />
    </section>
  );
}
