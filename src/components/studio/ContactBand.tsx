'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';

/**
 * Closing band. It turns Retail Cyan once it reaches the middle of the screen,
 * and each row types out its action like a cursor at work.
 */
export function ContactBand({
  dir,
  title,
  body,
  rows,
}: {
  dir: 'rtl' | 'ltr';
  title: string;
  body: string;
  rows: { href: string; label: string; words: string[] }[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setDark(el.getBoundingClientRect().top < window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} data-dark={dark} className="bk-sheet bk-contact">
      <div className="bk-wrap pb-[clamp(96px,12vw,180px)] pt-[27px]">
        <div className="grid gap-6 md:grid-cols-12 md:gap-5">
          <h2 className="bk-title md:col-span-4">{title}</h2>
          <p className="bk-title md:col-span-6">{body}</p>
        </div>
        <div className="mt-16 md:ms-[calc((100%+20px)*4/12)] md:mt-[63px] md:w-[calc((100%+20px)*8/12-20px)]">
          {rows.map((r) => {
            const inner = (
              <>
                <span className="bk-mono flex-1">{r.label}</span>
                <span className="bk-mono hidden flex-1 sm:block">
                  <Typed words={r.words} active={dark} />
                </span>
                <Arrow className="bk-arrow h-8 w-8 shrink-0" strokeWidth={1} aria-hidden />
              </>
            );
            const cls = 'bk-row group flex items-center gap-6 py-7';
            return r.href.startsWith('/') ? (
              <Link key={r.href} href={r.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <a key={r.href} href={r.href} className={cls}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Typed({ words, active }: { words: string[]; active: boolean }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    let w = 0;
    let i = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let wait = deleting ? 35 : 75;
      if (!deleting && i === word.length) {
        if (words.length === 1) return;
        deleting = true;
        wait = 1800;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        wait = 400;
      }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [active, words]);

  return (
    <span aria-hidden dir="auto">
      {text}
      <span className="bk-caret">_</span>
    </span>
  );
}
