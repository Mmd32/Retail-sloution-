import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { services } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { contact, brand, finalCta, poweredByNovark } from '@/content/site';
import { u } from '@/content/ui';
import { Logo } from './Logo';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-cyan">{title}</h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-navy-200 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const aboutLinks = [
    { href: '/about', label: { fa: 'درباره ما', en: 'About' } },
    { href: '/methodology', label: { fa: 'متدولوژی', en: 'Methodology' } },
    { href: '/team', label: { fa: 'تیم', en: 'Team' } },
    { href: '/insights', label: { fa: 'بینش‌ها', en: 'Insights' } },
    { href: '/contact', label: { fa: 'تماس با ما', en: 'Contact' } },
  ];

  return (
    <footer className="bg-navy text-navy-100">
      {/* Final statement band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <p className="text-h2 text-white md:text-3xl">{finalCta.headline[locale]}</p>
            <p className="mt-2 text-navy-200">{finalCta.support[locale]}</p>
          </div>
          <Link
            href={localePath(locale, '/contact')}
            className="inline-flex h-12 items-center rounded-control bg-functional px-7 font-semibold text-white transition-colors hover:bg-functional-hover"
          >
            {u('requestMeeting', locale)}
          </Link>
        </div>
      </div>

      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo locale={locale} onDark />
            <p className="mt-4 max-w-xs text-sm text-navy-200">{brand.descriptor[locale]}</p>
          </div>

          <Column title={u('footerSolutions', locale)}>
            {services.map((s) => (
              <FLink key={s.slug} href={localePath(locale, `/solutions/${s.slug}`)}>
                {s.abbr}
              </FLink>
            ))}
          </Column>

          <Column title={u('footerCapabilities', locale)}>
            {capabilities.map((c) => (
              <FLink key={c.slug} href={localePath(locale, `/capabilities/${c.slug}`)}>
                {c.name[locale]}
              </FLink>
            ))}
          </Column>

          <Column title={u('footerIndustries', locale)}>
            {industries.map((i) => (
              <FLink key={i.slug} href={localePath(locale, `/industries/${i.slug}`)}>
                {i.name[locale]}
              </FLink>
            ))}
          </Column>

          <Column title={u('footerAbout', locale)}>
            {aboutLinks.map((l) => (
              <FLink key={l.href} href={localePath(locale, l.href)}>
                {l.label[locale]}
              </FLink>
            ))}
          </Column>

          <Column title={locale === 'fa' ? 'ارتباط' : 'Contact'}>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-navy-200 hover:text-white">
                <Mail className="h-4 w-4" aria-hidden /> {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-200 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
              </a>
            </li>
            {/* Phone only rendered when a real number is set AND enabled. */}
            {contact.phoneEnabled && contact.phone && (
              <li>
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 text-navy-200 hover:text-white">
                  <Phone className="h-4 w-4" aria-hidden /> {contact.phone}
                </a>
              </li>
            )}
          </Column>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-navy-300 md:flex-row">
          <p>
            © {year} {brand.name}. {u('allRightsReserved', locale)}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={localePath(locale, '/legal/privacy')} className="hover:text-white">
              {u('legalPrivacy', locale)}
            </Link>
            <Link href={localePath(locale, '/legal/terms')} className="hover:text-white">
              {u('legalTerms', locale)}
            </Link>
            <Link href={localePath(locale, '/legal/cookies')} className="hover:text-white">
              {u('legalCookies', locale)}
            </Link>
            {poweredByNovark.show && <span className="text-navy-400">{poweredByNovark.label[locale]}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
