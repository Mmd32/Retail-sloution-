import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Store, Users } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/utils';
import { coreBelief } from '@/content/site';

/**
 * The company's belief, said once and plainly, on a soft cyan wash, with
 * three ways in. Each way in is a small card with an icon, so the band reads
 * as an invitation rather than a slogan.
 */
export function StatementBand({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  const Arrow = fa ? ArrowLeft : ArrowRight;
  const links = [
    { href: '/solutions', icon: Layers, label: fa ? 'چه کار می‌کنیم' : 'What we do' },
    { href: '/industries', icon: Store, label: fa ? 'با چه صنایعی کار می‌کنیم' : 'Who we work with' },
    { href: '/about', icon: Users, label: fa ? 'ما کی هستیم' : 'Who we are' },
  ];
  return (
    <section className="rs-tint text-center">
      <div className="container-x py-20 md:py-24">
        <h2 className="text-h1 mx-auto max-w-[24ch] text-ink">{coreBelief.headline[locale]}</h2>
        <p className="mx-auto mt-6 max-w-[44rem] text-[1.0625rem] leading-relaxed text-ink-muted">
          {fa
            ? 'از اتاق جلسه تا پشت پیشخوان شعبه؛ وقتی سیستم درست کار کند، مشتری همه‌جا همان برندی را می‌بیند که شما ساخته‌اید.'
            : 'From the boardroom to the shop counter: when the system works, customers meet the same brand you built, everywhere.'}
        </p>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {links.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={localePath(locale, href)}
                className="rs-card group flex min-h-[56px] items-center gap-3 rounded-card bg-surface px-4 py-3 text-start font-semibold text-ink shadow-card ring-1 ring-line hover:shadow-popover"
              >
                <span className="rs-icon-chip rs-card-icon h-10 w-10">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="flex-1">{label}</span>
                <Arrow className="rs-nudge h-4 w-4 text-functional" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
