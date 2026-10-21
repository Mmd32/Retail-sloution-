import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';

/**
 * Type system (v4, studio direction).
 *
 * IBM Plex Sans carries display and body (light 300 for large text), IBM Plex
 * Mono carries labels, navigation and numbers. Persian uses IBM Plex Sans
 * Arabic — the same family drawn for Arabic script — so both locales share one
 * voice. Persian has no monospaced tradition; mono labels fall back to Plex
 * Sans Arabic at the same size.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-latin',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fa',
});
