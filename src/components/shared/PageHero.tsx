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
        <div className="container-x py-12 md:py-16">
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow onDark={dark}>{eyebrow}</Eyebrow>}
            <h1 className={`text-h1 mt-3 ${dark ? 'text-white' : 'text-navy'}`}>{title}</h1>
            {intro && (
              <p className={`text-lead mt-5 ${dark ? 'text-navy-200' : 'text-ink-muted'}`}>{intro}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
