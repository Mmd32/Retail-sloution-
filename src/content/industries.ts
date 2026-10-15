import type { Industry } from './types';

/**
 * Industry challenges are framed as "Common challenges may include…" and never
 * imply a completed project. No client evidence is claimed.
 */
export const industries: Industry[] = [
  {
    slug: 'fashion',
    name: { fa: 'پوشاک', en: 'Apparel' },
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
    slug: 'bags-shoes',
    name: { fa: 'کیف و کفش', en: 'Bags & Footwear' },
    overview: {
      fa: 'در کیف و کفش، تنوع سایز و مدل، موجودی سنگین و نقش مشاوره فروشنده در انتخاب مشتری، مدیریت دقیق موجودی و تیم فروش را تعیین‌کننده می‌کند.',
      en: 'In bags and footwear, size and style variety, heavy stock and the salesperson’s role in guiding choice make precise inventory and sales-team management decisive.',
    },
    challenges: {
      fa: [
        'مدیریت موجودی سایز و مدل',
        'نقش مشاوره فروشنده در تجربه خرید',
        'چیدمان و نمایش کالا در شعب',
        'توسعه شعب و حفظ استاندارد برند',
      ],
      en: [
        'Size and style inventory management',
        'The salesperson’s advisory role in the purchase',
        'Merchandising and display across stores',
        'Store expansion while protecting brand standards',
      ],
    },
    relatedSolutions: ['fr', 'svp', 'franch'],
    relatedCapabilities: ['operations', 'people', 'store-development', 'expansion'],
  },
  {
    slug: 'watches-jewelry',
    name: { fa: 'ساعت و جواهرات', en: 'Watches & Jewelry' },
    overview: {
      fa: 'در ساعت و جواهرات، اعتماد مشتری، کیفیت مشاوره و امنیت و کنترل موجودی ارزشمند، پایه فروش و وفاداری است.',
      en: 'In watches and jewelry, customer trust, the quality of advice, and the security and control of high-value stock underpin sales and loyalty.',
    },
    challenges: {
      fa: [
        'اعتمادسازی و تجربه خرید لوکس',
        'مهارت مشاوره و فروش تیم',
        'کنترل و امنیت موجودی ارزشمند',
        'حفظ جایگاه برند در توسعه شعب',
      ],
      en: [
        'Building trust and a premium buying experience',
        'Advisory and sales skill of the team',
        'Control and security of high-value stock',
        'Protecting brand positioning as stores expand',
      ],
    },
    relatedSolutions: ['fr', 'svp'],
    relatedCapabilities: ['people', 'operations', 'strategy', 'store-development'],
  },
  {
    slug: 'fmcg',
    name: { fa: 'FMCG', en: 'FMCG' },
    overview: {
      fa: 'در کالاهای تندگردش (FMCG)، حجم بالای عملیات و سرعت گردش کالا، کنترل شعب و تصمیم‌گیری داده‌محور را به شرط بقا تبدیل می‌کند.',
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
    slug: 'beauty',
    name: { fa: 'آرایشی، بهداشتی و زیبایی', en: 'Beauty & Personal Care' },
    overview: {
      fa: 'در حوزه آرایشی، بهداشتی و زیبایی، مشاوره‌ی تخصصی فروش و تجربه‌ی مشتری در فروشگاه، همراه با مدیریت تنوع بالای کالا، تعیین‌کننده‌ی عملکرد است.',
      en: 'In beauty & personal care, specialist sales advice and in-store experience — alongside managing high product variety — determine performance.',
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
    slug: 'electronics',
    name: { fa: 'الکترونیک', en: 'Electronics' },
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
  {
    slug: 'sports',
    name: { fa: 'ورزشی', en: 'Sporting Goods' },
    overview: {
      fa: 'در کالای ورزشی، تنوع رشته‌ها و برندها، فصلی‌بودن تقاضا و نیاز مشتری به مشاوره تخصصی، برنامه‌ریزی موجودی و آموزش تیم را مهم می‌کند.',
      en: 'In sporting goods, the range of sports and brands, seasonal demand and customers’ need for specialist advice make inventory planning and team training essential.',
    },
    challenges: {
      fa: [
        'برنامه‌ریزی موجودی فصلی',
        'مشاوره تخصصی به مشتری',
        'تنوع برند و دسته‌بندی کالا',
        'استانداردسازی تجربه در شعب',
      ],
      en: [
        'Seasonal inventory planning',
        'Specialist customer advice',
        'Brand and category variety',
        'Standardizing the experience across stores',
      ],
    },
    relatedSolutions: ['fr', 'svp', 'franch'],
    relatedCapabilities: ['operations', 'people', 'analytics', 'store-development'],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
