import { Inter, Vazirmatn } from 'next/font/google';

/**
 * Design System §6.1 Font families.
 *
 * Latin  — Inter, per the approved system.
 * Persian — IRANSansX is the primary Persian face, but it is a licensed font
 *   and is not distributed here. The system names Vazirmatn as the approved
 *   substitute, so Vazirmatn is loaded and IRANSansX is listed first in the
 *   CSS stack: if the licensed webfont is self-hosted later it takes over with
 *   no code change (see tailwind.config.ts → fontFamily.fa).
 */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-latin',
});

export const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-fa',
});
