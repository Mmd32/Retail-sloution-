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
    fa: 'این چالش‌ها را می‌شناسیم و برای هرکدام راه‌حل داریم.',
    en: 'We know these challenges — and we have a way through each of them.',
  } as Localized,
  problems: [
    {
      title: { fa: 'تصمیم‌ها منتظر حضور مالک است', en: 'Decisions wait on the owner' } as Localized,
      body: {
        fa: 'برند با تجربه و پیگیری شما به اینجا رسیده است؛ اما حالا بسیاری از تصمیم‌ها و کارهای روزمره هنوز به حضور مالک یا چند مدیر کلیدی وابسته است.',
        en: 'Your brand got here on your experience and drive. Now many decisions and daily tasks still depend on the owner or a few key managers.',
      } as Localized,
    },
    {
      title: { fa: 'کیفیت شعب یکسان نیست', en: 'Branches deliver uneven quality' } as Localized,
      body: {
        fa: 'با اضافه شدن شعب، کیفیتی که مشتری از برند شما انتظار دارد در همه شعب به یک شکل اجرا نمی‌شود.',
        en: 'As branches are added, the quality customers expect from your brand is not delivered the same way everywhere.',
      } as Localized,
    },
    {
      title: { fa: 'رشد، فشار را بیشتر کرده است', en: 'Growth has added pressure' } as Localized,
      body: {
        fa: 'فروش و تعداد شعب بالا رفته، اما ساختار، فرآیندها و تیم مدیریتی هنوز هم‌پای آن رشد نکرده‌اند.',
        en: 'Sales and branch count have grown, but structure, processes and the management team have not kept pace.',
      } as Localized,
    },
    {
      title: { fa: 'تصمیم‌های بزرگ، بدون داده کافی', en: 'Big decisions without enough data' } as Localized,
      body: {
        fa: 'تجربه مدیران ارزشمند است؛ اما برای تصمیم‌هایی مثل افتتاح شعبه یا سرمایه‌گذاری، داده و معیار روشنی در دسترس نیست.',
        en: 'Your managers’ experience is valuable, but decisions like opening a branch or investing lack clear data and criteria.',
      } as Localized,
    },
  ],
};

export const philosophy = {
  body: [
    {
      fa: 'ما باور داریم بزرگ‌ترین مانع رشد بسیاری از برندهای ریتیل، کمبود سرمایه یا محصول نیست؛ بلکه رساندن ساختار، سیستم‌های قابل تکرار و قابلیت‌های مدیریتی به پای سرعت رشد است.',
      en: 'We believe that the greatest barrier to the growth of many retail brands is not necessarily a lack of capital or products. It is bringing structure, repeatable systems, and managerial capability up to the pace of growth.',
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
