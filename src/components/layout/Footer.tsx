import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { services } from '@/content/services';
import { solutionDomains, companyLinks } from '@/content/navigation';
import { industries } from '@/content/industries';
import { contact, brand, poweredByNovark } from '@/content/site';
import { u } from '@/content/ui';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Footer (§18).
 *
 * Reduced from six narrow columns of small text to four readable ones, and the
 * duplicate CTA band is gone: every page already ends with MeetingCta directly
 * above this, so a second call to action here competed with the first rather
 * than reinforcing it.
 *
 * This is also where the links demoted from the header land — methodology,
 * engagement, team, contact — so the primary nav can stay at five items.
 */

/** Footer-specific wording for a few solution links. */
const footerLabels: Record<string, { fa: string; en: string }> = {
  '/capabilities/strategy': { fa: 'استراتژی فروش و بازاریابی', en: 'Sales & Marketing Strategy' },
};

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-label text-cyan">{title}</h3>
      <ul className="space-y-1 text-label">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="flex min-h-[44px] items-center text-navy-200 transition-colors duration-micro ease-standard hover:text-white lg:min-h-[30px]"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const contactLink =
    'inline-flex min-h-[44px] items-center gap-2 text-navy-200 transition-colors duration-micro ease-standard hover:text-white lg:min-h-[30px]';

  return (
    <footer className="border-t border-white/10 bg-navy text-navy-100 print:hidden">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand — placed last so it sits at the far end of the row (the
              left edge in Persian, the right in English); the link columns
              lead from the reading side. On small screens it stays on top. */}
          <div className="col-span-2 order-first lg:order-last lg:col-span-3 lg:border-s lg:border-white/10 lg:ps-10">
            <Logo locale={locale} onDark className="h-24 w-[117px]" />
            <p className="text-label mt-5 max-w-xs text-navy-200">{brand.descriptor[locale]}</p>
            <p className="text-label mt-4 max-w-xs text-navy-300">
              {locale === 'fa'
                ? 'طراحی و پیاده‌سازی سیستم‌های مدیریتی و اجرایی برای برندهای ریتیل.'
                : 'Designing and implementing management and execution systems for retail brands.'}
            </p>
            <div className="mt-6 inline-flex rounded-control border border-white/15 px-3 py-1.5">
              <LanguageSwitcher locale={locale} onDark />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Column title={u('footerSolutions', locale)}>
              {solutionDomains.map((d) => (
                <FLink key={d.href} href={localePath(locale, d.href)}>
                  {(footerLabels[d.href] ?? d.label)[locale]}
                </FLink>
              ))}
            </Column>
            <div className="mt-8">
              <Column title={locale === 'fa' ? 'راهکارهای اختصاصی' : 'Proprietary solutions'}>
                {services.map((s) => (
                  <FLink key={s.slug} href={localePath(locale, `/solutions/${s.slug}`)}>
                    {s.abbr}
                  </FLink>
                ))}
              </Column>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Column title={u('footerIndustries', locale)}>
              {industries.map((i) => (
                <FLink key={i.slug} href={localePath(locale, `/industries/${i.slug}`)}>
                  {i.name[locale]}
                </FLink>
              ))}
            </Column>
          </div>

          <div className="lg:col-span-2">
            <Column title={u('footerAbout', locale)}>
              {companyLinks.map((l) => (
                <FLink key={l.href} href={localePath(locale, l.href)}>
                  {l.label[locale]}
                </FLink>
              ))}
              <FLink href={localePath(locale, '/case-studies')}>
                {locale === 'fa' ? 'نتایج' : 'Results'}
              </FLink>
              <FLink href={localePath(locale, '/insights')}>
                {locale === 'fa' ? 'بینش‌ها' : 'Insights'}
              </FLink>
            </Column>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <Column title={locale === 'fa' ? 'ارتباط' : 'Contact'}>
              <li>
                <a href={`mailto:${contact.email}`} className={contactLink}>
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  <span dir="ltr" className="whitespace-nowrap">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLink}
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden /> LinkedIn
                </a>
              </li>
              {/* Rendered only when a real number is configured AND enabled. */}
              {contact.phoneEnabled && contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className={contactLink}>
                    <Phone className="h-4 w-4 shrink-0" aria-hidden /> {contact.phone}
                  </a>
                </li>
              )}
              <li className="pt-3">
                <Link
                  href={localePath(locale, '/contact')}
                  className="inline-flex min-h-[44px] items-center rounded-control bg-functional px-5 font-semibold text-white transition-colors duration-micro ease-standard hover:bg-functional-hover"
                >
                  {u('requestMeeting', locale)}
                </Link>
              </li>
            </Column>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-navy-300 md:flex-row">
          <p>
            © {year} {brand.name}. {u('allRightsReserved', locale)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5">
            {[
              { href: '/legal/privacy', label: u('legalPrivacy', locale) },
              { href: '/legal/terms', label: u('legalTerms', locale) },
              { href: '/legal/cookies', label: u('legalCookies', locale) },
            ].map((l) => (
              <Link
                key={l.href}
                href={localePath(locale, l.href)}
                className="inline-flex min-h-[44px] items-center transition-colors duration-micro ease-standard hover:text-white lg:min-h-[24px]"
              >
                {l.label}
              </Link>
            ))}
            {poweredByNovark.show && (
              <span className="text-navy-300">{poweredByNovark.label[locale]}</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
