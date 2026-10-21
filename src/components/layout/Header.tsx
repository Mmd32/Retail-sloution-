'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { otherLocale, localeLabel } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { contact } from '@/content/site';
import { u } from '@/content/ui';
import { track } from '@/lib/analytics';
import { LogoGlyph } from './Logo';
import { Brackets } from '@/components/studio/Brackets';

/**
 * Header (studio direction).
 *
 * One thin white bar: wordmark at the start, mono links at the end whose
 * brackets close around them on hover. On the homepage it sits below the
 * full-screen reel and pins once it reaches the top. Below `lg` the links
 * fold into a full-screen sheet.
 */
const nav = [
  { href: '/case-studies', label: { fa: 'نمونه کارها', en: 'Work' } },
  { href: '/solutions', label: { fa: 'چه کار می‌کنیم', en: 'What we do' } },
  { href: '/insights', label: { fa: 'بینش‌ها', en: 'Insights' } },
  { href: '/about', label: { fa: 'درباره ما', en: 'About' } },
  { href: '/contact', label: { fa: 'سلام!', en: 'Hello!' } },
];

export function Header({ locale, logoSrc }: { locale: Locale; logoSrc?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const target = otherLocale(locale);
  const langHref = `/${target}${pathname.replace(/^\/(fa|en)/, '')}`;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const lang = (
    <Link
      href={langHref}
      hrefLang={target}
      lang={target}
      onClick={() => track('language_selected', { to: target })}
      aria-label={`${u('language', locale)}: ${localeLabel[target].native}`}
      className="bk-nav-item inline-flex min-h-[36px] items-center"
    >
      <Brackets>{target === 'fa' ? 'فا' : 'EN'}</Brackets>
    </Link>
  );

  return (
    <header className="bk-header print:hidden">
      <div className="flex h-[var(--bk-nav-h)] items-center justify-between border-b border-navy/10 ps-5 pe-[15px]">
        <Wordmark locale={locale} src={logoSrc} />

        <nav aria-label="Primary" className="hidden items-center gap-[18px] lg:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={localePath(locale, l.href)}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className="bk-nav-item inline-flex min-h-[36px] items-center"
            >
              <Brackets>{l.label[locale]}</Brackets>
            </Link>
          ))}
          {lang}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="bk-btn inline-flex min-h-[36px] items-center lg:hidden"
        >
          <Brackets>{u('menu', locale)}</Brackets>
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={u('menu', locale)}
          className="animate-rs-fade fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
        >
          <div className="flex h-[var(--bk-nav-h)] items-center justify-between border-b border-navy/10 ps-5 pe-[15px]">
            <Wordmark locale={locale} src={logoSrc} />
            <button type="button" onClick={() => setOpen(false)} className="bk-btn inline-flex min-h-[36px] items-center">
              <Brackets>{locale === 'fa' ? 'بستن' : 'Close'}</Brackets>
            </button>
          </div>
          <nav aria-label="Primary" className="bk-wrap flex flex-1 flex-col justify-center gap-2">
            {nav.map((l, i) => (
              <Link
                key={l.href}
                href={localePath(locale, l.href)}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className="bk-display animate-rs-rise py-1 !text-[clamp(34px,9vw,56px)]"
                style={{ animationDelay: `${60 + i * 50}ms` }}
              >
                {l.label[locale]}
              </Link>
            ))}
          </nav>
          <div className="bk-wrap flex items-center justify-between pb-6">
            <a href={`mailto:${contact.email}`} className="bk-mono !normal-case" dir="ltr">
              {contact.email}
            </a>
            {lang}
          </div>
        </div>
      )}
    </header>
  );
}

function Wordmark({ locale, src }: { locale: Locale; src?: string }) {
  // The supplied artwork (/public/brand/logo.svg) when present; otherwise a
  // rebuilt lockup in the logo's colours. The logo is Latin and never mirrored.
  return (
    <Link
      href={localePath(locale, '/')}
      dir="ltr"
      className="inline-flex items-center"
      aria-label="Retail Solutions — home"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-[30px] w-auto" />
      ) : (
        <>
          <LogoGlyph className="h-[30px] w-[25px] shrink-0" />
          <span className="-ms-[13px] whitespace-nowrap text-[14px] leading-none tracking-tight" aria-hidden>
            <span className="font-medium text-[#6D6E71]">RETAIL</span>{' '}
            <span className="text-[#1BB5EC]">Solutions</span>
          </span>
        </>
      )}
    </Link>
  );
}
