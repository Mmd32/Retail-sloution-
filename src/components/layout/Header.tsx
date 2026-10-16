'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  Linkedin,
  ChevronDown,
  Compass,
  Building2,
  Settings2,
  Store,
  Users,
  BarChart3,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath, cn } from '@/lib/utils';
import { primaryNav, solutionDomains, solutionsExtraLinks } from '@/content/navigation';
import { services } from '@/content/services';
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

const domainIcons: Record<string, typeof Compass> = {
  compass: Compass,
  building: Building2,
  settings: Settings2,
  store: Store,
  users: Users,
  chart: BarChart3,
};

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setOpenMenu(null), [pathname]);

  // Condense on scroll (§2). Threshold is well past the utility bar so the
  // header does not flicker between states on small scroll jitters.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      setPastHero(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the panel and returns focus to its trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !openMenu) return;
      const trigger = barRef.current?.querySelector<HTMLElement>(
        `[data-mega-trigger="${openMenu}"]`,
      );
      setOpenMenu(null);
      trigger?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openMenu]);

  // Tabbing out of the header entirely closes the panel.
  const onBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
  };

  const openNow = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(href);
  };
  // Small grace period so a diagonal mouse path to the panel does not close it.
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isHome = pathname === `/${locale}`;

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const activeTopics = getActiveTopics();

  // Sticky with a -32px offset on desktop: the utility bar simply scrolls away
  // with the page while the primary bar stays pinned. Nothing resizes on
  // scroll, so the content below never jumps.
  return (
    <header className="sticky top-0 z-50 print:hidden lg:-top-8">
      <div className="hidden bg-navy text-navy-100 lg:block">
        <div className="container-x flex h-8 items-center justify-between text-xs">
          <p className="text-navy-200">
            {locale === 'fa'
              ? 'ساختن سازمان‌های ماندگار در صنعت ریتیل'
              : 'Building Enduring Retail Organizations'}
          </p>
          <div className="flex items-center gap-5">
            <LanguageSwitcher locale={locale} onDark />
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[24px] items-center gap-1.5 transition-colors duration-micro ease-standard hover:text-white"
                          >
              <Linkedin className="h-3.5 w-3.5" aria-hidden /> LinkedIn
            </a>
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-[24px] items-center gap-1.5 transition-colors duration-micro ease-standard hover:text-white"
              aria-label={u('search', locale)}
                          >
              <Search className="h-3.5 w-3.5" aria-hidden /> {u('search', locale)}
            </button>
          </div>
        </div>
      </div>

      {/* Primary bar */}
      <div
        ref={barRef}
        className={cn(
          'relative border-b border-line bg-white transition-shadow duration-standard ease-standard',
          scrolled && 'shadow-card',
        )}
        onMouseLeave={closeSoon}
        onBlurCapture={onBlurCapture}
      >
        <div
          className="container-x flex h-20 items-center justify-between gap-6 lg:h-24"
        >
          {/* On the homepage the hero carries the full logo, so the header copy
              waits until the hero logo has scrolled away (no double logo). It
              stays in layout (invisible) so the bar does not jump. */}
          <div
            className={cn(
              'transition-opacity duration-standard ease-standard',
              isHome && !pastHero && 'invisible opacity-0',
            )}
          >
            <Logo
              locale={locale}
              className="h-[68px] w-[83px] lg:h-[80px] lg:w-[98px]"
            />
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((link) => {
              const hasMega = MEGA.has(link.href);
              const isOpen = openMenu === link.href;
              const active = isActive(link.href);

              // The label is always a real link to the section index. The
              // disclosure lives in a separate button so the index page stays
              // reachable by both mouse and keyboard — previously these were
              // buttons only, which made /solutions unreachable from the nav.
              return (
                <div
                  key={link.href}
                  className="static flex items-center"
                  onMouseEnter={() => hasMega && openNow(link.href)}
                >
                  <Link
                    href={localePath(locale, link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-[44px] items-center rounded-control px-3 text-body font-medium transition-colors duration-micro ease-standard',
                      active ? 'text-functional' : 'text-navy hover:text-functional',
                      // Active underline, drawn from the token scale so it
                      // aligns with the bar's bottom border.
                      active &&
                        'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-cyan',
                    )}
                  >
                    {link.label[locale]}
                  </Link>
                  {hasMega && (
                    <button
                      data-mega-trigger={link.href}
                      aria-expanded={isOpen}
                      aria-controls={`mega-${link.href.slice(1)}`}
                      aria-label={`${link.label[locale]} — ${locale === 'fa' ? 'باز کردن زیرمنو' : 'open submenu'}`}
                      onClick={() => (isOpen ? setOpenMenu(null) : openNow(link.href))}
                      className="-ms-2 inline-flex h-11 w-6 items-center justify-center rounded-control text-navy transition-colors duration-micro ease-standard hover:text-functional"
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-standard ease-standard',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-navy transition-colors duration-micro ease-standard hover:bg-surface-muted lg:hidden"
              aria-label={u('search', locale)}
            >
              <Search className="h-5 w-5" />
            </button>
            {/* The one CTA. Present at every width above 380px. */}
            <ButtonLink
              href={localePath(locale, '/contact')}
              className="hidden sm:inline-flex"
              onClick={() => track('meeting_cta_clicked', { from: 'header' })}
            >
              {u('requestMeeting', locale)}
            </ButtonLink>
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-navy transition-colors duration-micro ease-standard hover:bg-surface-muted lg:hidden"
              aria-label={u('menu', locale)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {openMenu === '/solutions' && (
          <MegaPanel id="mega-solutions" onMouseEnter={() => openNow('/solutions')}>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <MegaHeading>
                  {locale === 'fa' ? 'شش حوزه سیستم عامل ریتیل' : 'Six domains of the Retail OS'}
                </MegaHeading>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {solutionDomains.map((d) => {
                    const Icon = domainIcons[d.icon] ?? Compass;
                    return (
                      <Link
                        key={d.href}
                        href={localePath(locale, d.href)}
                        className="group flex min-h-[44px] items-start gap-3 rounded-control p-3 transition-colors duration-micro ease-standard hover:bg-surface-muted"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-navy-50 text-functional transition-colors duration-micro ease-standard group-hover:bg-cyan/15">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-navy group-hover:text-functional">
                            {d.label[locale]}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                            {d.description?.[locale]}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-4 border-s border-line ps-8">
                <MegaHeading>
                  {locale === 'fa' ? 'متدولوژی‌های اختصاصی' : 'Proprietary methodologies'}
                </MegaHeading>
                <div className="space-y-0.5">
                  {services.map((s) => (
                    <MegaLink key={s.slug} href={localePath(locale, `/solutions/${s.slug}`)}>
                      <span className="block text-sm font-medium text-navy">
                        {s.eyebrow[locale]}
                      </span>
                      <span className="block font-display text-xs font-bold tracking-wide text-functional">
                        {s.abbr}
                      </span>
                    </MegaLink>
                  ))}
                </div>
                <div className="mt-4 space-y-0.5 border-t border-line pt-4">
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
          <MegaPanel id="mega-industries" onMouseEnter={() => openNow('/industries')}>
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              {industries.map((i) => (
                <MegaLink key={i.slug} href={localePath(locale, `/industries/${i.slug}`)}>
                  <span className="font-medium text-navy">{i.name[locale]}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted line-clamp-2">
                    {i.overview[locale]}
                  </span>
                </MegaLink>
              ))}
            </div>
          </MegaPanel>
        )}

        {openMenu === '/insights' && (
          <MegaPanel id="mega-insights" onMouseEnter={() => openNow('/insights')}>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <MegaHeading>{locale === 'fa' ? 'موضوعات' : 'Topics'}</MegaHeading>
                <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                  {activeTopics.map((topicItem) => (
                    <MegaLink
                      key={topicItem.key}
                      href={localePath(
                        locale,
                        `/insights?topic=${encodeURIComponent(topicItem.label.en)}`,
                      )}
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

function MegaPanel({
  id,
  children,
  onMouseEnter,
}: {
  id: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
}) {
  return (
    <div
      id={id}
      onMouseEnter={onMouseEnter}
      className="animate-rs-fade absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-popover lg:block"
    >
      <div className="container-x py-8">{children}</div>
    </div>
  );
}

function MegaHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-label text-functional">{children}</p>
  );
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
      className={cn(
        'flex min-h-[44px] flex-col justify-center rounded-control px-3 transition-colors duration-micro ease-standard hover:bg-surface-muted',
        compact && 'text-body text-ink-muted hover:text-functional',
      )}
    >
      {children}
    </Link>
  );
}
