'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { primaryNav, solutionsExtraLinks } from '@/content/navigation';
import { services } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { u } from '@/content/ui';
import { ButtonLink } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-start text-base font-semibold text-navy"
      >
        {title}
        <ChevronDown className={`h-5 w-5 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-3 ps-3">{children}</div>}
    </div>
  );
}

export function MobileNav({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const item = 'block py-2 text-sm text-ink-muted hover:text-accent-700';

  return (
    <div className="fixed inset-0 z-[95] bg-white lg:hidden" role="dialog" aria-modal="true">
      <div className="flex h-14 items-center justify-between border-b border-line px-5">
        <span className="font-display font-bold text-navy">{u('menu', locale)}</span>
        <button onClick={onClose} aria-label={u('close', locale)} className="p-2 text-navy">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto px-5 pb-24">
        <Group title={primaryNav[1].label[locale]}>
          <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
            {locale === 'fa' ? 'تحول ریتیل' : 'Retail Transformation'}
          </p>
          {services.map((s) => (
            <Link key={s.slug} href={localePath(locale, `/solutions/${s.slug}`)} onClick={onClose} className={item}>
              {s.abbr} — {s.fullName[locale]}
            </Link>
          ))}
          <p className="pt-3 text-xs font-semibold uppercase tracking-wide text-accent-600">
            {u('footerCapabilities', locale)}
          </p>
          {capabilities.map((c) => (
            <Link key={c.slug} href={localePath(locale, `/capabilities/${c.slug}`)} onClick={onClose} className={item}>
              {c.title[locale]}
            </Link>
          ))}
          <div className="pt-2">
            {solutionsExtraLinks.map((l) => (
              <Link key={l.href} href={localePath(locale, l.href)} onClick={onClose} className={item}>
                {l.label[locale]}
              </Link>
            ))}
          </div>
        </Group>

        <Group title={primaryNav[3].label[locale]}>
          {industries.map((i) => (
            <Link key={i.slug} href={localePath(locale, `/industries/${i.slug}`)} onClick={onClose} className={item}>
              {i.name[locale]}
            </Link>
          ))}
        </Group>

        {[primaryNav[0], primaryNav[2], primaryNav[4], primaryNav[5], primaryNav[6]].map((link) => (
          <Link
            key={link.href}
            href={localePath(locale, link.href)}
            onClick={onClose}
            className="block border-b border-line py-3.5 text-base font-semibold text-navy"
          >
            {link.label[locale]}
          </Link>
        ))}

        <div className="mt-6 flex flex-col gap-4">
          <ButtonLink href={localePath(locale, '/contact')} size="lg" onClick={onClose}>
            {u('requestMeeting', locale)}
          </ButtonLink>
          <div className="rounded bg-surface-muted px-4 py-3">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
