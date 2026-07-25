import { Archivo, Vazirmatn } from 'next/font/google';

/**
 * Bilingual type pairing.
 *
 * Persian — Vazirmatn: the strongest open Persian family, variable weight,
 * excellent shaping. It carries the primary language, so it sets the tone.
 *
 * Latin — Archivo: a grotesque with real editorial presence at display sizes
 * and enough width/weight range to sit beside Vazirmatn without looking
 * lighter or smaller. Chosen over the usual UI-default sans so the English
 * side has the same institutional weight as the Persian side.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-latin',
});

export const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-fa',
});
