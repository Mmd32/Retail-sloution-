import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { WorkItem } from '@/content/home';
import { localePath } from '@/lib/utils';
import { findMedia, findImage } from '@/lib/media';

/**
 * Two-up project grid. Caption sits inside the image, bottom-start; on hover
 * a cream veil rises with the client logo (or the title, until a logo file
 * `<slug>-logo.svg` exists).
 */
export function WorkGrid({ items, locale }: { items: WorkItem[]; locale: Locale }) {
  return (
    <div className="grid gap-x-5 gap-y-7 md:grid-cols-2">
      {items.map((item) => {
        const media = findMedia('work', item.slug);
        const logo = findImage('work', `${item.slug}-logo`);
        return (
          <Link key={item.slug} href={localePath(locale, item.href)} className="bk-card group block">
            <div className="bk-card-media">
              {media?.kind === 'video' ? (
                <video src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="metadata" />
              ) : media ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media.src} alt="" loading="lazy" />
              ) : process.env.NODE_ENV === 'development' ? (
                <span className="bk-mono absolute end-4 top-4 !text-[11px] !normal-case text-navy/40" dir="ltr">
                  /media/work/{item.slug}.jpg
                </span>
              ) : null}

              <div className="bk-card-over">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt="" className="max-h-[40%] max-w-[60%] object-contain" />
                ) : (
                  <span className="bk-display text-center !text-white !text-[clamp(28px,1rem+2vw,48px)]">
                    {item.title[locale]}
                  </span>
                )}
              </div>

              <div className="bk-card-cap">
                <h3 className="bk-mono text-navy">{item.title[locale]}</h3>
                <p className="bk-sub mt-1.5">{item.sub[locale]}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
