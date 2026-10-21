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
    fa: 'این حرف‌ها برایتان آشنا نیست؟',
    en: 'Does any of this sound familiar?',
  } as Localized,
  problems: [
    {
      title: { fa: 'تصمیم‌ها منتظر حضور مالک است', en: 'Decisions wait on the owner' } as Localized,
      body: {
        fa: 'برند را با تجربه و پیگیری خودتان به اینجا رسانده‌اید. اما حالا هر تصمیمی، از کوچک تا بزرگ، هنوز منتظر شما یا چند مدیر کلیدی می‌ماند.',
        en: 'You got the brand here on your own experience and drive. But now every decision, big or small, still waits for you or a few key managers.',
      } as Localized,
    },
    {
      title: { fa: 'کیفیت شعب یکسان نیست', en: 'Branches deliver uneven quality' } as Localized,
      body: {
        fa: 'هر شعبه جدیدی که باز می‌شود، کمی با بقیه فرق دارد. مشتری‌ای که در یک شعبه عاشق برندتان شده، در شعبه دیگر همان حس را نمی‌گیرد.',
        en: 'Every new branch turns out a little different. A customer who fell for your brand in one store doesn’t get the same feeling in the next.',
      } as Localized,
    },
    {
      title: { fa: 'رشد، فشار را بیشتر کرده است', en: 'Growth has added pressure' } as Localized,
      body: {
        fa: 'فروش و تعداد شعب بالا رفته، ولی ساختار، فرآیندها و تیم مدیریت هنوز به آن نرسیده‌اند. نتیجه؟ همه خسته‌اند.',
        en: 'Sales and branch count are up, but structure, processes and the management team haven’t caught up. The result? Everyone is stretched.',
      } as Localized,
    },
    {
      title: { fa: 'تصمیم‌های بزرگ، بدون داده کافی', en: 'Big decisions without enough data' } as Localized,
      body: {
        fa: 'تجربه و حس شما ارزشمند است. اما وقتی پای افتتاح شعبه یا یک سرمایه‌گذاری بزرگ وسط است، کاش عدد و معیار روشنی هم روی میز بود.',
        en: 'Your experience and instinct matter. But when it’s time to open a branch or make a big investment, you’d want clear numbers on the table too.',
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
  fa: 'ما با همراهی مدیران، طراحی سیستم‌های مدیریتی، توسعه توانمندی‌های سازمانی و اجرای راهکارهای عملیاتی، به برندهای ریتیل کمک می‌کنیم تا از کسب‌وکارهای وابسته به بنیان‌گذار، به سازمان‌هایی حرفه‌ای، سودآور و مقیاس‌پذیر تبدیل شوند.',
  en: 'By working alongside leadership on management-system design, organizational capability building, and operational implementation, we help retail brands transform from founder-dependent businesses into professional, profitable, and scalable organizations.',
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
