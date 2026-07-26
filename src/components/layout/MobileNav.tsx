'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import { primaryNav, solutionDomains, solutionsExtraLinks, companyLinks } from '@/content/navigation';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { u } from '@/content/ui';
import { ButtonLink } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Full-screen mobile navigation (§2, §23).
 *
 * Structured by section rather than mirroring the desktop mega menus, and the
 * primary CTA is pinned to the bottom of the viewport so it is reachable
 * without scrolling back up. Groups are keyed by href — the previous version
 * indexed `primaryNav` positionally, which silently broke whenever the nav
 * changed shape.
 */

function Group({
  title,
  href,
  locale,
  onClose,
  children,
}: {
  title: string;
  href: string;
  locale: Locale;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <div className="flex items-center">
        <Link
          href={localePath(locale, href)}
          onClick={onClose}
          className="flex min-h-[52px] flex-1 items-center text-start text-lg font-semibold text-navy"
        >
          {title}
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${title} — ${locale === 'fa' ? 'باز کردن زیرمنو' : 'open submenu'}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-control text-ink-muted"
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform duration-standard ease-standard',
              open && 'rotate-180',
            )}
          />
        </button>
      </div>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export function MobileNav({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Escape to close, and keep Tab inside the panel while it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const sub =
    'flex min-h-[44px] items-center text-body text-ink-muted transition-colors duration-micro ease-standard hover:text-functional';
  const groupLabel = 'pt-3 pb-1 text-xs font-semibold uppercase tracking-label text-functional';

  const byHref = (h: string) => primaryNav.find((l) => l.href === h);
  const plain = primaryNav.filter((l) => !['/solutions', '/industries'].includes(l.href));
  const isActive = (href: string) => pathname === localePath(locale, href);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[95] flex flex-col bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={u('menu', locale)}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <span className="font-display font-bold text-navy">{u('menu', locale)}</span>
        <button
          onClick={onClose}
          aria-label={u('close', locale)}
          autoFocus
          className="inline-flex h-11 w-11 items-center justify-center rounded-control text-navy"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5">
        <Group
          title={byHref('/solutions')!.label[locale]}
          href="/solutions"
          locale={locale}
          onClose={onClose}
        >
          <p className={groupLabel}>
            {locale === 'fa' ? 'حوزه‌های سیستم' : 'System domains'}
          </p>
          {solutionDomains.map((d) => (
            <Link key={d.href} href={localePath(locale, d.href)} onClick={onClose} className={sub}>
              {d.label[locale]}
            </Link>
          ))}
          <p className={groupLabel}>
            {locale === 'fa' ? 'متدولوژی‌ها' : 'Methodologies'}
          </p>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={localePath(locale, `/solutions/${s.slug}`)}
              onClick={onClose}
              className={sub}
            >
              {s.eyebrow[locale]}{' '}
              <span className="ms-2 font-display text-xs font-bold text-functional">{s.abbr}</span>
            </Link>
          ))}
          <div className="pt-2">
            {solutionsExtraLinks.map((l) => (
              <Link key={l.href} href={localePath(locale, l.href)} onClick={onClose} className={sub}>
                {l.label[locale]}
              </Link>
            ))}
          </div>
        </Group>

        <Group
          title={byHref('/industries')!.label[locale]}
          href="/industries"
          locale={locale}
          onClose={onClose}
        >
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={localePath(locale, `/industries/${i.slug}`)}
              onClick={onClose}
              className={sub}
            >
              {i.name[locale]}
            </Link>
          ))}
        </Group>

        {plain.map((link) => (
          <Link
            key={link.href}
            href={localePath(locale, link.href)}
            onClick={onClose}
            aria-current={isActive(link.href) ? 'page' : undefined}
            className={cn(
              'flex min-h-[52px] items-center border-b border-line text-lg font-semibold',
              isActive(link.href) ? 'text-functional' : 'text-navy',
            )}
          >
            {link.label[locale]}
          </Link>
        ))}

        <div className="py-6">
          {companyLinks
            .filter((l) => !plain.some((p) => p.href === l.href))
            .map((l) => (
              <Link key={l.href} href={localePath(locale, l.href)} onClick={onClose} className={sub}>
                {l.label[locale]}
              </Link>
            ))}
          <div className="mt-4 inline-flex rounded-control bg-surface-muted px-4 py-2">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>

      {/* Pinned CTA — always reachable, never scrolled past. */}
      <div className="shrink-0 border-t border-line bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <ButtonLink
          href={localePath(locale, '/contact')}
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          {u('requestMeeting', locale)}
        </ButtonLink>
      </div>
    </div>
  );
}
