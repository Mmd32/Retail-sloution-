import type { Locale } from '@/i18n/config';
import { homeIndustries } from '@/content/home';
import { listImages } from '@/lib/media';

/**
 * Cream band of client logos on an endless loop. Until logos are dropped
 * into /public/media/clients, it runs the industries we serve as type.
 */
export function Marquee({ locale }: { locale: Locale }) {
  const logos = listImages('clients');
  const items = logos.length
    ? logos.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" className="h-[72px] w-[126px] shrink-0 object-contain" />
      ))
    : homeIndustries.map((i) => (
        <span key={i.en} className="bk-title shrink-0 whitespace-nowrap !text-[clamp(26px,1rem+1.6vw,40px)]">
          {i[locale]}
        </span>
      ));

  const track = (hidden?: boolean) => (
    <div
      className="bk-marquee-track min-h-[72px] gap-[clamp(48px,6vw,96px)] pe-[clamp(48px,6vw,96px)]"
      aria-hidden={hidden || undefined}
    >
      {items}
    </div>
  );

  return (
    <div
      className="bk-marquee"
      style={{ '--bk-marquee-d': `${Math.max(items.length * 5, 25)}s` } as React.CSSProperties}
      role="region"
      aria-label={locale === 'fa' ? 'صنایعی که با آن‌ها کار می‌کنیم' : 'Industries we work with'}
    >
      {track()}
      {track(true)}
    </div>
  );
}
