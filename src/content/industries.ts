import type { Industry } from './types';

/**
 * Industry challenges are framed as "Common challenges may include…" and never
 * imply a completed project. No client evidence is claimed.
 */
export const industries: Industry[] = [
  {
    slug: 'fashion',
    name: { fa: 'پوشاک، البسه و چرم', en: 'Fashion' },
    overview: {
      fa: 'صنعت پوشاک با فصلی‌بودن تقاضا، تنوع بالای کالا و حساسیت مشتری به تجربه‌ی برند، به سیستم‌های منسجم موجودی، فروش و توسعه‌ی شعب نیاز دارد.',
      en: 'Fashion combines seasonal demand, high product variety, and customer sensitivity to brand experience — making it dependent on coherent systems for inventory, sales, and store expansion.',
    },
    challenges: {
      fa: [
        'مدیریت موجودی و فصل‌ها',
        'یکپارچگی تجربه برند در نقاط مختلف',
        'عملکرد و استانداردسازی تیم فروش',
        'توسعه شعب و حفظ استاندارد در مقیاس',
      ],
      en: [
        'Inventory and seasonal management',
        'Brand experience consistency across locations',
        'Sales-team performance and standardization',
        'Store expansion while preserving standards at scale',
      ],
    },
    relatedSolutions: ['fr', 'svp', 'franch'],
    relatedCapabilities: ['strategy', 'operations', 'store-development', 'expansion'],
  },
  {
    slug: 'f-and-b',
    name: { fa: 'کافه و رستوران', en: 'F&B' },
    overview: {
      fa: 'در کافه و رستوران، ثبات کیفیت و سرعت خدمت در هر شعبه، عامل اصلی وفاداری مشتری و مقیاس‌پذیری شبکه است.',
      en: 'In food & beverage, consistent quality and speed of service at every location are the primary drivers of loyalty and network scalability.',
    },
    challenges: {
      fa: [
        'ثبات کیفیت و سرعت خدمت',
        'کنترل عملیات و آموزش تیم',
        'تجربه مشتری در ساعات اوج',
        'مقیاس‌پذیری و استانداردسازی شعب',
      ],
      en: [
        'Consistency of quality and service speed',
        'Operational control and team training',
        'Customer experience during peak hours',
        'Scalability and store standardization',
      ],
    },
    relatedSolutions: ['fr', 'svp', 'franch'],
    relatedCapabilities: ['operations', 'people', 'store-development', 'expansion'],
  },
  {
    slug: 'beauty',
    name: { fa: 'آرایشی و زیبایی', en: 'Beauty & Cosmetics' },
    overview: {
      fa: 'در حوزه آرایشی و زیبایی، مشاوره‌ی تخصصی فروش و تجربه‌ی مشتری در فروشگاه، همراه با مدیریت تنوع بالای کالا، تعیین‌کننده‌ی عملکرد است.',
      en: 'In beauty & cosmetics, specialist sales advice and in-store experience — alongside managing high product variety — determine performance.',
    },
    challenges: {
      fa: [
        'مشاوره تخصصی فروش',
        'تجربه مشتری در فروشگاه',
        'تنوع کالا و مدیریت موجودی',
        'هماهنگی اجرای برند در شعب',
      ],
      en: [
        'Specialist sales advisory',
        'In-store customer experience',
        'Product variety and inventory management',
        'Consistent brand execution across stores',
      ],
    },
    relatedSolutions: ['fr', 'svp'],
    relatedCapabilities: ['people', 'operations', 'analytics', 'store-development'],
  },
  {
    slug: 'homeware',
    name: { fa: 'مبلمان و لوازم منزل', en: 'Homeware' },
    overview: {
      fa: 'در مبلمان و لوازم منزل، چرخه‌ی فروش طولانی‌تر و پیچیدگی نمایش محصول، مدیریت فضای فروشگاه و خدمات مشتری را به عوامل کلیدی تبدیل می‌کند.',
      en: 'In homeware, longer sales cycles and product-display complexity make store-space management and customer service decisive factors.',
    },
    challenges: {
      fa: [
        'چرخه فروش طولانی‌تر',
        'پیچیدگی نمایش محصول و مدیریت فضای فروشگاه',
        'خدمات مشتری و پیگیری فروش',
        'برنامه‌ریزی توسعه',
      ],
      en: [
        'Longer sales cycles',
        'Product-display complexity and store-space management',
        'Customer service and sales follow-through',
        'Expansion planning',
      ],
    },
    relatedSolutions: ['svp', 'fr', 'franch'],
    relatedCapabilities: ['store-development', 'strategy', 'operations', 'expansion'],
  },
  {
    slug: 'fmcg',
    name: { fa: 'کالاهای تندگردش', en: 'FMCG' },
    overview: {
      fa: 'در کالاهای تندگردش، حجم بالای عملیات و سرعت گردش کالا، کنترل شعب و تصمیم‌گیری داده‌محور را به شرط بقا تبدیل می‌کند.',
      en: 'In FMCG, high operational volume and fast product turnover make store control and data-driven decision-making conditions for survival.',
    },
    challenges: {
      fa: [
        'حجم بالای عملیات و سرعت گردش کالا',
        'کنترل شعب و هماهنگی شبکه',
        'تصمیم‌گیری داده‌محور',
        'استانداردسازی در مقیاس',
      ],
      en: [
        'High operational volume and fast turnover',
        'Store control and network coordination',
        'Data-driven decision-making',
        'Standardization at scale',
      ],
    },
    relatedSolutions: ['franch', 'svp', 'fr'],
    relatedCapabilities: ['analytics', 'operations', 'expansion', 'strategy'],
  },
  {
    slug: 'electronics',
    name: { fa: 'لوازم الکترونیک', en: 'Electronics' },
    overview: {
      fa: 'در لوازم الکترونیک، فروش مشاوره‌ای و تنوع فنی کالا، آموزش تیم و مدیریت تجربه‌ی مشتری را در کانون توجه قرار می‌دهد.',
      en: 'In electronics, advisory selling and technical product variety put team training and customer-experience management at the center.',
    },
    challenges: {
      fa: [
        'فروش مشاوره‌ای و تنوع فنی کالا',
        'آموزش تیم و انتقال دانش',
        'خدمات مشتری و مدیریت تجربه',
        'استانداردسازی شعب',
      ],
      en: [
        'Advisory selling and technical product variety',
        'Team training and knowledge transfer',
        'Customer service and experience management',
        'Store standardization',
      ],
    },
    relatedSolutions: ['fr', 'svp', 'franch'],
    relatedCapabilities: ['people', 'operations', 'store-development', 'analytics'],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
