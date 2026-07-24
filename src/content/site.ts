import type { Localized } from './types';

/**
 * Site-wide settings and the approved company narrative.
 * All strings are sourced from the approved company profile.
 */

export const brand = {
  name: 'Retail Solutions',
  namePersianDisplay: 'ریتیل سلوشنز',
  descriptor: {
    fa: 'ساختن سازمان‌های ماندگار در صنعت ریتیل',
    en: 'Building Enduring Retail Organizations',
  } as Localized,
  pillars: [
    { fa: 'رهبری', en: 'Leadership' },
    { fa: 'استراتژی', en: 'Strategy' },
    { fa: 'سیستم‌ها', en: 'Systems' },
    { fa: 'اجرا', en: 'Execution' },
  ] as Localized[],
};

export const contact = {
  website: 'retailsolutions.ir',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@retailsolutions.ir',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/retailsolutions',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  /**
   * Phone is gated. The profile's number (+98 21 0000 0000) is temporary and
   * must never be published. It only appears once a real number is provided
   * AND the component is enabled.
   */
  phone: process.env.NEXT_PUBLIC_OFFICIAL_PHONE || '',
  phoneEnabled: process.env.NEXT_PUBLIC_PHONE_ENABLED === 'true',
};

export const poweredByNovark = {
  show: process.env.NEXT_PUBLIC_SHOW_POWERED_BY_NOVARK !== 'false',
  label: { fa: 'قدرت‌گرفته از NOVARK', en: 'Powered by NOVARK' } as Localized,
};

export const finalCta = {
  headline: { fa: 'با هم بسازیم', en: 'Let’s Build Together' } as Localized,
  support: {
    fa: 'شریک تحول سازمانی صنعت ریتیل',
    en: 'Organizational transformation partner for the retail industry',
  } as Localized,
};

/** Core belief / positioning statements used across the site. */
export const coreBelief = {
  headline: {
    fa: 'برندهای ماندگار بر پایه سیستم ساخته می‌شوند، نه افراد.',
    en: 'Enduring brands are built on systems, not individuals.',
  } as Localized,
  support: {
    fa: 'یکپارچگی در جسم و جان برند، از طراحی استراتژی تا اجرای عملیات روزمره شکل می‌گیرد.',
    en: 'Brand consistency must exist throughout the organization, from strategy design to daily operational execution.',
  } as Localized,
};

export const industryProblem = {
  headline: {
    fa: 'رشد بدون سیستم، بزرگ‌ترین ریسک در صنعت ریتیل است.',
    en: 'Growth without systems is one of the greatest risks in retail.',
  } as Localized,
  problems: [
    {
      title: { fa: 'وابستگی به مالک', en: 'Owner dependency' } as Localized,
      body: {
        fa: 'بخش مهمی از تصمیم‌گیری، حل مسئله، ارتباطات و اجرای کسب‌وکار به حضور مستقیم مالک یا چند فرد کلیدی وابسته است.',
        en: 'Critical decisions, relationships, problem-solving, and execution remain dependent on the owner or a limited number of key individuals.',
      } as Localized,
    },
    {
      title: { fa: 'نبود استاندارد', en: 'Lack of standards' } as Localized,
      body: {
        fa: 'فرآیندها، کیفیت اجرا و تجربه مشتری در شعب، تیم‌ها و موقعیت‌های مختلف به شکل یکسان و قابل تکرار اجرا نمی‌شوند.',
        en: 'Processes, service quality, and customer experience are not executed consistently across stores, teams, and situations.',
      } as Localized,
    },
    {
      title: { fa: 'رشد بدون زیرساخت', en: 'Growth without infrastructure' } as Localized,
      body: {
        fa: 'توسعه شعب، افزایش فروش یا گسترش شبکه سریع‌تر از شکل‌گیری ساختار، فرآیند، داده و قابلیت‌های مدیریتی اتفاق می‌افتد.',
        en: 'Branch expansion and commercial growth move faster than the development of structures, processes, data, and managerial capabilities.',
      } as Localized,
    },
    {
      title: { fa: 'تصمیم‌گیری شهودی', en: 'Intuition-driven decisions' } as Localized,
      body: {
        fa: 'تصمیم‌های مهم بر تجربه فردی و قضاوت شخصی متکی هستند و از داده، چارچوب تحلیلی و نظام ارزیابی کافی استفاده نمی‌شود.',
        en: 'Important decisions rely heavily on personal experience and judgment rather than reliable data, analytical frameworks, and structured evaluation.',
      } as Localized,
    },
  ],
};

export const philosophy = {
  body: [
    {
      fa: 'ما باور داریم بزرگ‌ترین مانع رشد بسیاری از برندهای ریتیل، کمبود سرمایه یا محصول نیست؛ بلکه وابستگی سازمان به افراد، نبود سیستم‌های قابل تکرار و ضعف در قابلیت‌های مدیریتی است.',
      en: 'We believe that the greatest barrier to the growth of many retail brands is not necessarily a lack of capital or products. It is organizational dependency on individuals, the absence of repeatable systems, and insufficient managerial capabilities.',
    } as Localized,
    {
      fa: 'ریتیل سلوشنز با ترکیب استراتژی، طراحی سیستم، توسعه توانمندی‌های سازمانی و همراهی در اجرا، به کسب‌وکارهای ریتیل کمک می‌کند از مدیریت فردمحور به سمت سازمانی داده‌محور، حرفه‌ای و مقیاس‌پذیر حرکت کنند.',
      en: 'Retail Solutions combines strategy, systems design, organizational capability development, and implementation support to help retail businesses move from person-dependent operations toward professional, data-driven, and scalable organizations.',
    } as Localized,
  ],
};

export const vision = {
  fa: 'پیشگام تحول صنعت ریتیل ایران از طریق همراهی با کسب‌وکارها جهت ایجاد سازمان‌هایی ماندگار، سیستم‌محور و مقیاس‌پذیر که رشد آن‌ها بر پایه رهبری حرفه‌ای، داده و توانمندی‌های سازمانی استوار باشد.',
  en: 'To lead the transformation of Iran’s retail industry by helping businesses build enduring, system-driven, and scalable organizations whose growth is grounded in professional leadership, data, and organizational capabilities.',
} as Localized;

export const mission = {
  fa: 'ما با تغییر ذهنیت مدیران، طراحی سیستم‌های مدیریتی، توسعه توانمندی‌های سازمانی و اجرای راهکارهای عملیاتی، به برندهای ریتیل کمک می‌کنیم تا از کسب‌وکارهای وابسته به بنیان‌گذار، به سازمان‌هایی حرفه‌ای، سودآور و مقیاس‌پذیر تبدیل شوند.',
  en: 'Through leadership mindset development, management-system design, organizational capability building, and operational implementation, we help retail brands transform from founder-dependent businesses into professional, profitable, and scalable organizations.',
} as Localized;

export const differentiation = {
  headline: {
    fa: 'ما فقط راهکار طراحی نمی‌کنیم؛ قابلیت اجرای آن را در سازمان ایجاد می‌کنیم.',
    en: 'We do not only design solutions. We help build the capability to execute them.',
  } as Localized,
  traditional: {
    label: { fa: 'مشاور سنتی', en: 'Traditional Consultant' } as Localized,
    headline: {
      fa: 'تحویل گزارش و تولید دانش',
      en: 'Reports and knowledge, handed over',
    } as Localized,
    body: {
      fa: 'مشاوره سنتی معمولاً با تحلیل، ارائه پیشنهاد و تحویل گزارش پایان پیدا می‌کند. در این مدل، مسئولیت تبدیل پیشنهادها به فرآیند، رفتار و نتیجه بر عهده خود سازمان باقی می‌ماند.',
      en: 'Traditional consulting often ends with analysis, recommendations, and the delivery of a report. The responsibility for converting those recommendations into processes, behaviors, and results remains with the client organization.',
    } as Localized,
  },
  retailSolutions: {
    label: { fa: 'ریتیل سلوشنز', en: 'Retail Solutions' } as Localized,
    headline: {
      fa: 'همراه سازمان و ایجاد قابلیت',
      en: 'Alongside the organization, building capability',
    } as Localized,
    body: {
      fa: 'ریتیل سلوشنز در کنار مدیران و تیم‌های سازمان فعالیت می‌کند. راهکارها متناسب با واقعیت کسب‌وکار طراحی می‌شوند، در مرحله پیاده‌سازی مورد حمایت قرار می‌گیرند و هم‌زمان قابلیت اجرای مستقل درون سازمان شکل می‌گیرد.',
      en: 'Retail Solutions works alongside leadership teams and employees. Solutions are designed around the reality of the business, supported through implementation, and used to build the organization’s own long-term execution capability.',
    } as Localized,
  },
};
