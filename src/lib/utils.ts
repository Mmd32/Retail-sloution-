import clsx, { type ClassValue } from 'clsx';
import type { Locale } from '@/i18n/config';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Build a locale-prefixed href from a locale-relative path ("/about"). */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Render a number with Persian digits in fa, western digits in en. */
export function formatNumber(value: number, locale: Locale): string {
  const s = String(value);
  if (locale === 'en') return s;
  return s.replace(/\d/g, (d) => faDigits[Number(d)]);
}

/** Locale-aware date formatting (Persian calendar for fa). */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (locale === 'fa') {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Persian text normalization for search — unifies Arabic/Persian ي/ی and ك/ک,
 * strips diacritics, and normalizes digits so queries match regardless of
 * keyboard variant.
 */
export function normalizeFa(input: string): string {
  return input
    .replace(/ي/g, 'ی') // Arabic yeh → Persian yeh
    .replace(/ك/g, 'ک') // Arabic kaf → Persian kaf
    .replace(/[ً-ٰٟ]/g, '') // harakat/diacritics
    .replace(/[۰-۹]/g, (d) => String(faDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .toLowerCase()
    .trim();
}

export function readingTimeLabel(minutes: number, locale: Locale): string {
  return `${formatNumber(minutes, locale)} ${locale === 'fa' ? 'دقیقه مطالعه' : 'min read'}`;
}
