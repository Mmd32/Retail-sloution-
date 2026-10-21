import type { Localized } from './types';

/**
 * What we do — the five service lines, in the order the company presents
 * them. English is the approved source; Persian is a native rewrite, not a
 * word-for-word translation. Tags are the scope inside each line.
 */
export interface ServiceLine {
  key: string;
  icon: 'search' | 'eye' | 'store' | 'palette' | 'compass';
  title: Localized;
  summary: Localized;
  tags: { fa: string[]; en: string[] };
}

export const whatWeDoMeta = {
  eyebrow: { fa: 'چه کار می‌کنیم', en: 'What we do' } as Localized,
  title: {
    fa: 'از تحلیل تا ویترین؛ هر جایی که ریتیل شما فروش می‌سازد.',
    en: 'From analysis to the shop window — wherever your retail makes money.',
  } as Localized,
};

export const whatWeDo: ServiceLine[] = [
  {
    key: 'intelligence',
    icon: 'search',
    title: { fa: 'هوش و استراتژی ریتیل', en: 'Retail intelligence & strategy' },
    summary: {
      fa: 'مشخص می‌کنیم چه چیزی جواب می‌دهد، چه چیزی نه و فرصت‌های تجاری کجاست.',
      en: 'We identify what is working, what is not and where the commercial opportunities are.',
    },
    tags: {
      fa: ['ممیزی فروشگاه', 'بنچمارک رقبا', 'رفتار مشتری', 'تحلیل تجاری', 'زون‌بندی', 'فرصت‌های بهبود عملکرد'],
      en: ['Retail audits', 'Competitor benchmarking', 'Customer behaviour', 'Commercial analysis', 'Zoning', 'Retail performance opportunities'],
    },
  },
  {
    key: 'vm',
    icon: 'eye',
    title: { fa: 'استراتژی ویژوال مرچندایزینگ', en: 'Visual merchandising strategy' },
    summary: {
      fa: 'نمایش محصول را به ابزاری برای فروش و ساختن برند تبدیل می‌کنیم.',
      en: 'We turn product presentation into a commercial and brand-building tool.',
    },
    tags: {
      fa: ['استراتژی VM', 'نمایش محصول', 'کانسپت‌های فصلی', 'استایلینگ', 'گایدلاین', 'روایت تجاری', 'تحول VM'],
      en: ['VM strategy', 'Product presentation', 'Seasonal concepts', 'Styling', 'Guidelines', 'Commercial storytelling', 'VM transformation'],
    },
  },
  {
    key: 'store-design',
    icon: 'store',
    title: { fa: 'طراحی فروشگاه و سفر مشتری', en: 'Store design & customer journey' },
    summary: {
      fa: 'تجربه فروشگاه را بر اساس رفتار واقعی مشتری طراحی می‌کنیم: اینکه چطور کشف می‌کند، چطور حرکت می‌کند و چطور می‌خرد.',
      en: 'We design retail experiences around how customers actually discover, navigate and shop.',
    },
    tags: {
      fa: ['کانسپت فروشگاه', 'لی‌اوت', 'جریان حرکت مشتری', 'زون‌بندی', 'مبلمان', 'متریال', 'افتتاح شعب جدید', 'فلگ‌شیپ', 'پاپ‌آپ'],
      en: ['Store concepts', 'Layouts', 'Customer flow', 'Zoning', 'Furniture', 'Materials', 'New openings', 'Flagships', 'Pop-ups'],
    },
  },
  {
    key: 'brand-image',
    icon: 'palette',
    title: { fa: 'تصویر برند و دایرکشن خلاق', en: 'Brand image & creative direction' },
    summary: {
      fa: 'هویت برند را به تجربه‌ای فیزیکی و به‌یادماندنی تبدیل می‌کنیم.',
      en: 'We translate brand identity into memorable physical experiences.',
    },
    tags: {
      fa: ['ویترین', 'کمپین‌های فروشگاهی', 'لانچ', 'پاپ‌آپ', 'آرت دایرکشن', 'اکتیویشن برند', 'یکپارچگی بصری'],
      en: ['Windows', 'Retail campaigns', 'Launches', 'Pop-ups', 'Art direction', 'Brand activations', 'Visual consistency'],
    },
  },
  {
    key: 'transformation',
    icon: 'compass',
    title: { fa: 'تحول ریتیل و مشاوره', en: 'Retail transformation & advisory' },
    summary: {
      fa: 'تخصص راهبردی ارشد، برای برندهایی که در مسیر تحول، توسعه یا جایگاه‌یابی دوباره هستند.',
      en: 'Senior strategic expertise tailored to brands undergoing transformation, expansion or repositioning.',
    },
    tags: {
      fa: ['تحول ریتیل', 'ورود به بازار', 'جایگاه‌یابی دوباره برند', 'توسعه', 'هدایت آژانس‌ها', 'مشاوره راهبردی'],
      en: ['Retail transformation', 'Market entry', 'Brand repositioning', 'Expansion', 'Agency direction', 'Strategic advisory'],
    },
  },
];
