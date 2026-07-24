import type { Locale } from '@/i18n/config';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Eyebrow } from '@/components/ui/Section';

export function PageHero({
  locale,
  crumbs,
  eyebrow,
  title,
  intro,
  tone = 'muted',
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
      <Breadcrumbs locale={locale} items={crumbs} />
      <section className={dark ? 'bg-navy' : 'bg-surface-muted'}>
        <div className="container-x py-14 md:py-20">
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow onDark={dark}>{eyebrow}</Eyebrow>}
            <h1 className={`mt-4 text-3xl font-bold md:text-5xl ${dark ? 'text-white' : 'text-navy'}`}>{title}</h1>
            {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-navy-200' : 'text-ink-muted'}`}>{intro}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
