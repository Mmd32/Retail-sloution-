import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { contact, poweredByNovark } from '@/content/site';
import { u } from '@/content/ui';
import { CornerMark } from '@/components/studio/Brackets';

/**
 * Footer (studio direction): one mono line held between two corner marks —
 * name at the start, channels in the middle, legal at the end.
 */
export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const fa = locale === 'fa';

  const channels = [
    { href: contact.linkedin, label: fa ? 'لینکدین' : 'LinkedIn', external: true },
    { href: `mailto:${contact.email}`, label: fa ? 'ایمیل' : 'Email' },
    ...(contact.phoneEnabled && contact.phone ? [{ href: `tel:${contact.phone}`, label: fa ? 'تلفن' : 'Phone' }] : []),
  ];

  return (
    <footer className="bk-sheet bk-footer print:hidden">
      <div className="bk-wrap grid gap-4 py-5 md:grid-cols-12 md:gap-5">
        <div className="relative flex items-center md:col-span-4">
          <CornerMark className="!static me-2 h-[10px] w-[10px] -translate-y-1 !text-cyan rtl:-scale-x-100" />
          <p className="bk-mono">
            {fa ? 'ریتیل سلوشنز' : 'Retail Solutions'} © {year}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-4">
          {channels.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="bk-mono text-navy"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-4 md:justify-end">
          {[
            { href: '/legal/privacy', label: u('legalPrivacy', locale) },
            { href: '/legal/terms', label: u('legalTerms', locale) },
          ].map((l) => (
            <Link key={l.href} href={localePath(locale, l.href)} className="bk-mono text-navy">
              {l.label}
            </Link>
          ))}
          {poweredByNovark.show && <span className="bk-mono text-navy-400">{poweredByNovark.label[locale]}</span>}
          <CornerMark className="!static ms-1 h-[10px] w-[10px] translate-y-1 -scale-x-100 -scale-y-100 !text-cyan rtl:scale-x-100" />
        </div>
      </div>
    </footer>
  );
}
