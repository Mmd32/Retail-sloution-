'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, Linkedin, ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { primaryNav, solutionsExtraLinks } from '@/content/navigation';
import { services, retailTransformation } from '@/content/services';
import { capabilities } from '@/content/capabilities';
import { industries } from '@/content/industries';
import { getActiveTopics, insightTypeLabels } from '@/content/insights';
import { contact } from '@/content/site';
import { u } from '@/content/ui';
import { track } from '@/lib/analytics';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchDialog } from './SearchDialog';
import { MobileNav } from './MobileNav';
import { ButtonLink } from '@/components/ui/Button';

const MEGA = new Set(['/solutions', '/industries', '/insights']);

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mega menu on route change or Escape.
  useEffect(() => setOpenMenu(null), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const activeTopics = getActiveTopics();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Utility bar */}
      <div className="hidden border-b border-line bg-navy text-navy-100 lg:block">
        <div className="container-x flex h-8 items-center justify-between text-xs">
          <p className="text-navy-200">{locale === 'fa' ? 'ساختن سازمان‌های ماندگار در صنعت ریتیل' : 'Building Enduring Retail Organizations'}</p>
          <div className="flex items-center gap-5">
            <LanguageSwitcher locale={locale} onDark />
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden /> LinkedIn
            </a>
            <Link href={localePath(locale, '/contact')} className="hover:text-white">
              {u('requestMeeting', locale)}
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-1.5 hover:text-white"
              aria-label={u('search', locale)}
            >
              <Search className="h-3.5 w-3.5" aria-hidden /> {u('search', locale)}
            </button>
          </div>
        </div>
      </div>

      {/* Primary bar */}
      <div ref={navRef} className="relative border-b border-line" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <Logo locale={locale} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((link) => {
              const hasMega = MEGA.has(link.href);
              const isOpen = openMenu === link.href;
              if (!hasMega) {
                return (
                  <Link
                    key={link.href}
                    href={localePath(locale, link.href)}
                    className="rounded-control px-3 py-2 text-sm font-medium text-navy hover:text-functional"
                  >
                    {link.label[locale]}
                  </Link>
                );
              }
              return (
                <div key={link.href} className="static" onMouseEnter={() => setOpenMenu(link.href)}>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`mega-${link.href.slice(1)}`}
                    onClick={() => setOpenMenu(isOpen ? null : link.href)}
                    onFocus={() => setOpenMenu(link.href)}
                    className="inline-flex items-center gap-1 rounded-control px-3 py-2 text-sm font-medium text-navy hover:text-functional"
                  >
                    {link.label[locale]}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-control p-2 text-navy hover:bg-surface-muted lg:hidden"
              aria-label={u('search', locale)}
            >
              <Search className="h-5 w-5" />
            </button>
            <ButtonLink
              href={localePath(locale, '/contact')}
              className="hidden md:inline-flex"
              onClick={() => track('meeting_cta_clicked', { from: 'header' })}
            >
              {u('requestMeeting', locale)}
            </ButtonLink>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-control p-2 text-navy hover:bg-surface-muted lg:hidden"
              aria-label={u('menu', locale)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega menu panels */}
        {openMenu === '/solutions' && (
          <MegaPanel id="mega-solutions">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <MegaHeading>{retailTransformation.title[locale]}</MegaHeading>
                <p className="mb-4 text-sm text-ink-muted">{retailTransformation.positioning[locale]}</p>
                <div className="space-y-1">
                  {services.map((s) => (
                    <MegaLink key={s.slug} href={localePath(locale, `/solutions/${s.slug}`)}>
                      <span className="font-semibold text-navy">{s.abbr}</span>
                      <span className="block text-xs text-ink-muted">{s.fullName[locale]}</span>
                    </MegaLink>
                  ))}
                </div>
              </div>
              <div className="col-span-4">
                <MegaHeading>{u('footerCapabilities', locale)}</MegaHeading>
                <div className="grid grid-cols-1 gap-0.5">
                  {capabilities.map((c) => (
                    <MegaLink key={c.slug} href={localePath(locale, `/capabilities/${c.slug}`)} compact>
                      {c.title[locale]}
                    </MegaLink>
                  ))}
                </div>
              </div>
              <div className="col-span-3 border-s border-line ps-6">
                <MegaHeading>{locale === 'fa' ? 'بیشتر' : 'More'}</MegaHeading>
                <div className="space-y-0.5">
                  {solutionsExtraLinks.map((l) => (
                    <MegaLink key={l.href} href={localePath(locale, l.href)} compact>
                      {l.label[locale]}
                    </MegaLink>
                  ))}
                </div>
              </div>
            </div>
          </MegaPanel>
        )}

        {openMenu === '/industries' && (
          <MegaPanel id="mega-industries">
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              {industries.map((i) => (
                <MegaLink key={i.slug} href={localePath(locale, `/industries/${i.slug}`)}>
                  <span className="font-medium text-navy">{i.name[locale]}</span>
                  <span className="block text-xs text-ink-muted line-clamp-1">{i.overview[locale]}</span>
                </MegaLink>
              ))}
            </div>
          </MegaPanel>
        )}

        {openMenu === '/insights' && (
          <MegaPanel id="mega-insights">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <MegaHeading>{locale === 'fa' ? 'موضوعات' : 'Topics'}</MegaHeading>
                <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                  {activeTopics.map((topicItem) => (
                    <MegaLink
                      key={topicItem.key}
                      href={localePath(locale, `/insights?topic=${encodeURIComponent(topicItem.label.en)}`)}
                      compact
                    >
                      {topicItem.label[locale]}
                    </MegaLink>
                  ))}
                </div>
              </div>
              <div className="col-span-4 border-s border-line ps-6">
                <MegaHeading>{locale === 'fa' ? 'انواع محتوا' : 'Content types'}</MegaHeading>
                <div className="space-y-0.5">
                  {Object.entries(insightTypeLabels).map(([key, label]) => (
                    <MegaLink key={key} href={localePath(locale, `/insights?type=${key}`)} compact>
                      {label[locale]}
                    </MegaLink>
                  ))}
                </div>
              </div>
            </div>
          </MegaPanel>
        )}
      </div>

      <SearchDialog locale={locale} open={searchOpen} onClose={() => setSearchOpen(false)} />
      {mobileOpen && <MobileNav locale={locale} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaPanel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-card lg:block">
      <div className="container-x py-8">{children}</div>
    </div>
  );
}

function MegaHeading({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-functional">{children}</p>;
}

function MegaLink({
  href,
  children,
  compact,
}: {
  href: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-control ${compact ? 'px-2 py-1.5 text-sm text-ink-muted hover:text-functional' : 'px-2 py-2'} hover:bg-surface-muted`}
    >
      {children}
    </Link>
  );
}
