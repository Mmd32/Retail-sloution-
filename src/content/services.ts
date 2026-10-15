import type { Service, Localized } from './types';

/**
 * Retail Transformation — the overall solution architecture connecting the
 * company's capabilities and its three structured service products. These are
 * the main defined solutions, not the only possible engagements.
 */
export const retailTransformation = {
  eyebrow: { fa: 'معماری راهکار', en: 'Solution Architecture' } as Localized,
  title: { fa: 'تحول ریتیل', en: 'Retail Transformation' } as Localized,
  positioning: {
    fa: 'راهکارهایی برای مرحله بعدی رشد برند شما',
    en: 'Solutions for your brand’s next stage of growth',
  } as Localized,
  intro: {
    fa: 'تحول ریتیل چارچوبی است که قابلیت‌های سازمانی و راهکارهای ریتیل سلوشنز را کنار هم قرار می‌دهد. سه راهکار زیر مسیرهای اصلی همکاری ما هستند و بسته به نیاز برند شما تنظیم و گسترده می‌شوند.',
    en: 'Retail Transformation brings Retail Solutions’ organizational capabilities and structured retail products together. The three solutions below are our main paths of work, shaped and extended to fit what your brand needs.',
  } as Localized,
};

export const services: Service[] = [
  {
    slug: 'fr',
    abbr: 'FR™',
    fullName: { fa: 'اصطکاک و پاداش ریتیل', en: 'Retail Friction & Reward' },
    eyebrow: { fa: 'تجربه مشتری', en: 'Customer Experience' },
    proposition: {
      fa: 'کاهش اصطکاک در تجربه خرید و طراحی سازوکارهای مؤثر برای افزایش رضایت، تبدیل و وفاداری مشتری',
      en: 'Reducing friction in the purchasing experience and designing effective mechanisms to increase satisfaction, conversion, and loyalty.',
    },
    summary: {
      fa: 'FR™ تجربه‌ی خرید را از دیدِ مشتری بازطراحی می‌کند: نقاط اصطکاک شناسایی و حذف می‌شوند و سازوکارهای پاداش و تعامل، رفتار خرید و وفاداری را تقویت می‌کنند.',
      en: 'FR™ redesigns the purchasing experience from the customer’s point of view: friction points are identified and removed, while reward and interaction mechanisms strengthen buying behavior and loyalty.',
    },
    challenge: {
      fa: 'مشتریان امروز نسبت به تجربه خرید حساس‌تر از همیشه‌اند. کوچک‌ترین اصطکاک در مسیر خرید می‌تواند به از دست رفتن فروش، کاهش رضایت و تضعیف وفاداری منجر شود.',
      en: 'Customers are more sensitive than ever to the quality of their purchasing experience. Even small points of friction can result in lost sales, lower satisfaction, and weakened customer loyalty.',
    },
    suitability: {
      fa: 'این خدمت برای برندهایی مناسب است که با افت نرخ تبدیل، تجربه ناهماهنگ مشتری، شکایت‌های تکرارشونده، نرخ بازگشت بالا یا ضعف در وفادارسازی مواجه‌اند.',
      en: 'This solution is relevant to brands facing inconsistent customer experience, declining conversion, recurring complaints, high return rates, or weak customer retention.',
    },
    diagnosticQuestions: {
      fa: [
        'آیا تجربه‌ی مشتری در همه‌ی شعب و کانال‌ها یکسان است؟',
        'نقاط اصطکاک اصلی در مسیر خرید کجا هستند و چگونه سنجیده می‌شوند؟',
        'آیا سازوکار روشنی برای پاداش، بازگشت و وفادارسازی مشتری وجود دارد؟',
        'شکایت‌ها و بازگشت کالا چطور ثبت، تحلیل و به بهبود تبدیل می‌شوند؟',
      ],
      en: [
        'Is the customer experience the same across every store and channel?',
        'Where are the main friction points in the buying journey, and how are they measured?',
        'Is there a clear mechanism for reward, return, and customer retention?',
        'How are complaints and returns recorded, analyzed, and turned into improvement?',
      ],
    },
    approach: {
      fa: [
        'ترسیم سفر مشتری از دیدِ او و شناسایی نقاط اصطکاک',
        'اولویت‌بندی اصطکاک‌ها بر اساس اثر بر تبدیل و وفاداری',
        'طراحی سازوکار پاداش و بهبود تجربه‌ی خرید',
        'استانداردسازی تعامل تیم فروش در نقاط تماس',
        'استقرار سنجه‌های پایش رضایت و بازخورد مستمر',
      ],
      en: [
        'Mapping the customer journey from their perspective and identifying friction points',
        'Prioritizing friction by its impact on conversion and loyalty',
        'Designing reward mechanisms and improving the purchasing experience',
        'Standardizing sales-team interaction at each touchpoint',
        'Establishing satisfaction metrics and a continuous feedback loop',
      ],
    },
    deliverables: {
      fa: [
        'نقشه سفر مشتری و شناسایی نقاط اصطکاک',
        'طراحی سیستم پاداش و تجربه خرید',
        'استانداردسازی تعامل تیم فروش',
        'پایش مستمر رضایت مشتری',
      ],
      en: [
        'Customer journey mapping and identification of friction points',
        'Design of reward mechanisms and purchasing experience',
        'Standardization of sales-team interactions',
        'Continuous monitoring of customer satisfaction',
      ],
    },
    intendedImpact: {
      fa: [
        'کاهش نرخ بازگشت کالا',
        'افزایش وفاداری مشتری',
        'افزایش نرخ تبدیل',
      ],
      en: [
        'Reduced product return rate',
        'Increased customer loyalty',
        'Increased conversion rate',
      ],
    },
    relatedCapabilities: ['operations', 'people', 'analytics', 'store-development'],
    relatedIndustries: ['fashion', 'beauty', 'f-and-b', 'electronics'],
    faqs: [
      {
        question: {
          fa: 'آیا FR™ بهبود عددی مشخصی را تضمین می‌کند؟',
          en: 'Does FR™ guarantee a specific numerical improvement?',
        },
        answer: {
          fa: 'خیر. کاهش بازگشت کالا، افزایش وفاداری و افزایش نرخ تبدیل به‌عنوان اهداف و اثرهای موردانتظار پروژه تعریف می‌شوند، نه تضمین عددی. تمرکز بر بهبود ساختاریافته‌ی تجربه و سازوکارهای قابل سنجش است.',
          en: 'No. Reduced returns, higher loyalty, and higher conversion are defined as project objectives and intended impacts — not guaranteed numbers. The focus is on structured, measurable improvement of the experience.',
        },
      },
      {
        question: {
          fa: 'FR™ برای چه اندازه‌ای از کسب‌وکار مناسب است؟',
          en: 'What size of business is FR™ suitable for?',
        },
        answer: {
          fa: 'FR™ برای برندهای تک‌شعبه تا شبکه‌های چندشعبه‌ای قابل تنظیم است؛ دامنه و عمق کار متناسب با تعداد نقاط تماس و پیچیدگی تجربه‌ی مشتری تعریف می‌شود.',
          en: 'FR™ scales from single-store brands to multi-store networks; scope and depth are configured to the number of touchpoints and the complexity of the customer experience.',
        },
      },
      {
        question: {
          fa: 'خروجی نهایی FR™ چیست؟',
          en: 'What is the final output of FR™?',
        },
        answer: {
          fa: 'مجموعه‌ای از نقشه‌ی سفر مشتری، فهرست اولویت‌بندی‌شده‌ی اصطکاک‌ها، طراحی سازوکار پاداش، استاندارد تعامل تیم فروش و سنجه‌های پایش رضایت که در سازمان قابل اجرا و پیگیری‌اند.',
          en: 'A customer journey map, a prioritized friction list, a reward-mechanism design, a sales-interaction standard, and satisfaction metrics — all executable and trackable within the organization.',
        },
      },
    ],
    seo: {
      seoTitle: {
        fa: 'FR™ — کاهش اصطکاک و طراحی پاداش تجربه خرید | ریتیل سلوشنز',
        en: 'FR™ — Retail Friction & Reward | Retail Solutions',
      },
      seoDescription: {
        fa: 'با FR™ نقاط اصطکاک تجربه‌ی خرید را شناسایی و حذف کنید و با سازوکارهای پاداش، تبدیل و وفاداری مشتری را تقویت کنید.',
        en: 'FR™ identifies and removes friction in the purchasing experience and uses reward mechanisms to strengthen conversion and loyalty.',
      },
    },
  },
  {
    slug: 'svp',
    abbr: 'SVP™',
    fullName: { fa: 'فرآیند اعتبارسنجی شعبه', en: 'Store Validation Process' },
    eyebrow: { fa: 'توسعه شعب', en: 'Store Expansion' },
    proposition: {
      fa: 'ارزیابی داده‌محور فرصت افتتاح شعبه پیش از تصمیم نهایی سرمایه‌گذاری',
      en: 'Data-driven evaluation of a store-opening opportunity before the final investment decision.',
    },
    summary: {
      fa: 'SVP™ یک فرآیند ساختاریافته برای بهبود کیفیت تصمیم و کاهش ریسک قابل‌اجتناب در افتتاح شعبه است؛ نه تضمین موفقیت. مکان، بازار، رقبا و ریسک سرمایه‌گذاری پیش از تصمیم سنجیده می‌شوند.',
      en: 'SVP™ is a structured process to improve decision quality and reduce avoidable risk in opening a store — not a guarantee of success. Location, market, competition, and investment risk are assessed before the decision.',
    },
    challenge: {
      fa: 'سرمایه‌گذاری روی افتتاح یک فروشگاه جدید، بدون ارزیابی علمی و داده‌محور، ریسک بالایی دارد. بسیاری از برندها مکان، اندازه، بازار هدف و ظرفیت واقعی شعبه را براساس تجربه یا شهود انتخاب می‌کنند که می‌تواند منجر به کاهش فروش، بازگشت دیرهنگام سرمایه و حتی شکست شعبه شود.',
      en: 'Investing in a new store without scientific and data-driven evaluation creates significant risk. Many brands select the location, store size, target market, and expected capacity based primarily on experience or intuition. This can lead to weak sales, delayed return on investment, or store failure.',
    },
    suitability: {
      fa: 'این خدمت برای برندهایی مناسب است که در آستانه‌ی تصمیم افتتاح شعبه‌ی جدید هستند، قصد توسعه‌ی زنجیره‌ای دارند یا می‌خواهند فرآیند تصمیم‌گیری توسعه‌ی خود را از شهود به داده منتقل کنند.',
      en: 'This solution suits brands on the verge of a new-store decision, planning chain expansion, or seeking to move their expansion decisions from intuition toward data.',
    },
    diagnosticQuestions: {
      fa: [
        'تصمیم افتتاح شعبه‌ی جدید بر چه مبنایی گرفته می‌شود؟',
        'ریسک‌های سرمایه‌گذاری پیش از تصمیم چگونه شناسایی و ارزیابی می‌شوند؟',
        'آیا معیارهای روشنی برای انتخاب مکان و بازار هدف وجود دارد؟',
        'تجربه‌ی شعب گذشته چگونه به تصمیم‌های آینده منتقل می‌شود؟',
      ],
      en: [
        'On what basis is a new-store decision made?',
        'How are investment risks identified and evaluated before the decision?',
        'Are there clear criteria for location and target-market selection?',
        'How is the experience of past stores fed into future decisions?',
      ],
    },
    approach: {
      fa: [
        'تعریف ابعاد ارزیابی متناسب با برند و بازار',
        'جمع‌آوری و تحلیل داده‌ی مکان، بازار و رقبا',
        'مدل‌سازی پتانسیل و ریسک سرمایه‌گذاری',
        'تدوین گزارش امکان‌سنجی و پیشنهاد نهایی تصمیم',
      ],
      en: [
        'Defining evaluation dimensions appropriate to the brand and market',
        'Collecting and analyzing location, market, and competitor data',
        'Modeling potential and investment risk',
        'Producing a feasibility report and a final decision recommendation',
      ],
    },
    deliverables: {
      fa: [
        'ارزیابی موقعیت مکانی، بازار و پتانسیل منطقه',
        'تحلیل رقبا و جایگاه برند در منطقه',
        'گزارش امکان‌سنجی افتتاح شعبه',
        'شناسایی و ارزیابی ریسک‌های سرمایه‌گذاری',
        'ارائه پیشنهاد نهایی',
      ],
      en: [
        'Assessment of location, market, and regional potential',
        'Competitor analysis and evaluation of the brand’s position in the area',
        'Store-opening feasibility report',
        'Identification and evaluation of investment risks',
        'Final recommendation',
      ],
    },
    intendedImpact: {
      fa: [
        'افزایش احتمال موفقیت شعب جدید',
        'کاهش ریسک سرمایه‌گذاری در توسعه فروشگاه',
        'ایجاد زیرساخت استاندارد برای توسعه زنجیره‌ای و فرانچایز',
      ],
      en: [
        'Increased probability of success for new stores',
        'Reduced investment risk in store expansion',
        'Creation of a standardized foundation for chain and franchise development',
      ],
    },
    relatedCapabilities: ['expansion', 'strategy', 'analytics', 'store-development'],
    relatedIndustries: ['fashion', 'f-and-b', 'homeware', 'fmcg'],
    faqs: [
      {
        question: {
          fa: 'آیا SVP™ موفقیت شعبه‌ی جدید را تضمین می‌کند؟',
          en: 'Does SVP™ guarantee the success of a new store?',
        },
        answer: {
          fa: 'خیر. SVP™ یک فرآیند ساختاریافته برای بهبود کیفیت تصمیم و کاهش ریسک قابل‌اجتناب است. هدف، تبدیل تصمیم شهودی به تصمیم داده‌محور است، نه حذف کامل عدم‌قطعیت بازار.',
          en: 'No. SVP™ is a structured process to improve decision quality and reduce avoidable risk. The goal is to convert an intuition-based decision into a data-driven one — not to eliminate market uncertainty.',
        },
      },
      {
        question: {
          fa: 'ابعاد ارزیابی SVP™ ثابت هستند؟',
          en: 'Are SVP™’s evaluation dimensions fixed?',
        },
        answer: {
          fa: 'ابعاد ارزیابی قابل پیکربندی‌اند و متناسب با برند، صنعت و منطقه انتخاب می‌شوند. کیفیت مکان، دسترسی، حوزه‌ی جذب مشتری، شدت رقابت، تناسب برند و بازار، فرمت فروشگاه، پتانسیل بازار، ریسک سرمایه‌گذاری، امکان‌پذیری عملیاتی و اولویت‌های توسعه، نمونه‌هایی از این ابعاد قابل تنظیم هستند.',
          en: 'The dimensions are configurable and selected to fit the brand, industry, and area. Location quality, accessibility, customer catchment, competitive intensity, brand-market fit, store format, market potential, investment risk, operational feasibility, and expansion priorities are examples of configurable assessment dimensions.',
        },
      },
      {
        question: {
          fa: 'خروجی تصمیم‌محور SVP™ چیست؟',
          en: 'What is SVP™’s decision output?',
        },
        answer: {
          fa: 'یک گزارش امکان‌سنجی همراه با ارزیابی ریسک و پیشنهاد نهایی «اجرا / اصلاح شرایط / توقف» که مبنای تصمیم سرمایه‌گذاری قرار می‌گیرد.',
          en: 'A feasibility report with a risk assessment and a final "proceed / adjust conditions / stop" recommendation that informs the investment decision.',
        },
      },
    ],
    seo: {
      seoTitle: {
        fa: 'SVP™ — اعتبارسنجی داده‌محور افتتاح شعبه | ریتیل سلوشنز',
        en: 'SVP™ — Store Validation Process | Retail Solutions',
      },
      seoDescription: {
        fa: 'SVP™ فرصت افتتاح شعبه را پیش از سرمایه‌گذاری به‌صورت داده‌محور ارزیابی می‌کند تا کیفیت تصمیم بالا رود و ریسک قابل‌اجتناب کاهش یابد.',
        en: 'SVP™ evaluates a store-opening opportunity with data before investment, improving decision quality and reducing avoidable risk.',
      },
    },
  },
  {
    slug: 'franch',
    abbr: 'FRANCH™',
    fullName: { fa: 'توسعه و حاکمیت فرانچایز', en: 'Franchise Development & Governance' },
    eyebrow: { fa: 'توسعه شبکه', en: 'Network Development' },
    proposition: {
      fa: 'طراحی ساختار، استاندارد و نظام حاکمیتی موردنیاز برای توسعه پایدار شبکه فرانچایز',
      en: 'Designing the structure, standards, and governance needed for sustainable franchise-network expansion.',
    },
    summary: {
      fa: 'FRANCH™ زیرساخت حاکمیتی و استانداردهای عملیاتی لازم برای رشد مقیاس‌پذیر شبکه‌ی فرانچایز را طراحی می‌کند تا کیفیت برند در همه‌ی شعب یکسان و قابل کنترل بماند.',
      en: 'FRANCH™ designs the governance infrastructure and operational standards required for scalable franchise growth, keeping brand quality consistent and controllable across every location.',
    },
    challenge: {
      fa: 'توسعه فرانچایز بدون ساختار حاکمیتی مشخص، کیفیت برند را در شعب مختلف ناهماهنگ کرده و ریسک شبکه را افزایش می‌دهد.',
      en: 'Franchise expansion without a clear governance structure creates inconsistency in brand quality across locations and increases network risk.',
    },
    suitability: {
      fa: 'این خدمت برای برندهایی مناسب است که قصد توسعه از طریق فرانچایز دارند یا شبکه‌ی فعلی آن‌ها از نبود ساختار حاکمیتی و ناهماهنگی کیفیت میان شعب آسیب می‌بیند.',
      en: 'This solution suits brands planning to expand through franchising, or whose current network suffers from a lack of governance and inconsistent quality across locations.',
    },
    diagnosticQuestions: {
      fa: [
        'آیا مدل حاکمیتی روشنی برای رابطه با فرانچایزگیرندگان وجود دارد؟',
        'استانداردهای عملیاتی چگونه مستند و در شعب اجرا می‌شوند؟',
        'کیفیت خدمت در شعب مختلف چگونه پایش و کنترل می‌شود؟',
        'مسیر توسعه‌ی شبکه چگونه برنامه‌ریزی و اولویت‌بندی شده است؟',
      ],
      en: [
        'Is there a clear governance model for the franchisee relationship?',
        'How are operational standards documented and executed across stores?',
        'How is service quality across locations monitored and controlled?',
        'How is the network-expansion path planned and prioritized?',
      ],
    },
    approach: {
      fa: [
        'طراحی مدل حاکمیت و لایه‌های تصمیم فرانچایز',
        'تدوین دفترچه‌ی استاندارد عملیاتی',
        'طراحی سیستم ارزیابی و پایش شعب',
        'برنامه‌ریزی توسعه و اولویت‌بندی شبکه',
      ],
      en: [
        'Designing the governance model and franchise decision layers',
        'Developing the operational standards manual',
        'Designing a branch evaluation and monitoring system',
        'Planning network expansion and prioritization',
      ],
    },
    deliverables: {
      fa: [
        'طراحی مدل حاکمیت فرانچایز',
        'تدوین دفترچه استاندارد عملیاتی',
        'سیستم ارزیابی و پایش شعب',
        'برنامه‌ریزی توسعه شبکه',
      ],
      en: [
        'Franchise governance model design',
        'Development of the operational standards manual',
        'Branch evaluation and monitoring system',
        'Network expansion planning',
      ],
    },
    intendedImpact: {
      fa: [
        'رشد مقیاس‌پذیر شبکه',
        'افزایش بازده فرانچایزگیرندگان',
        'ثبات کیفیت خدمت در همه شعب',
      ],
      en: [
        'Scalable network growth',
        'Improved franchisee performance',
        'Consistent service quality across locations',
      ],
    },
    relatedCapabilities: ['strategy', 'operations', 'expansion', 'analytics'],
    relatedIndustries: ['f-and-b', 'fashion', 'fmcg'],
    faqs: [
      {
        question: {
          fa: 'آیا FRANCH™ بازده مالی فرانچایزگیرندگان را تضمین می‌کند؟',
          en: 'Does FRANCH™ guarantee franchisee financial returns?',
        },
        answer: {
          fa: 'خیر. «افزایش بازده فرانچایزگیرندگان» به‌عنوان اثر موردانتظار تعریف می‌شود، نه تضمین مالی. تمرکز بر ایجاد ساختار حاکمیتی و استانداردهایی است که احتمال عملکرد پایدار را بالا می‌برند.',
          en: 'No. "Improved franchisee performance" is defined as an intended impact, not a financial guarantee. The focus is on governance and standards that raise the likelihood of sustainable performance.',
        },
      },
      {
        question: {
          fa: 'لایه‌های حاکمیتی FRANCH™ شامل چه چیزهایی است؟',
          en: 'What do FRANCH™’s governance layers include?',
        },
        answer: {
          fa: 'لایه‌های حاکمیتی معمولاً شامل مدل رابطه با فرانچایزگیرنده، استانداردهای عملیاتی، سازوکار ارزیابی و پایش شعب و چارچوب تصمیم توسعه‌ی شبکه است که متناسب با برند پیکربندی می‌شوند.',
          en: 'Governance layers typically include the franchisee relationship model, operational standards, a branch evaluation and monitoring mechanism, and a network-expansion decision framework — all configured to the brand.',
        },
      },
      {
        question: {
          fa: 'FRANCH™ برای برندی که هنوز فرانچایز نداده مناسب است؟',
          en: 'Is FRANCH™ suitable for a brand that has not franchised yet?',
        },
        answer: {
          fa: 'بله. FRANCH™ می‌تواند آمادگی فرانچایز را ارزیابی کند و پیش از اولین واگذاری، زیرساخت حاکمیتی و استانداردهای لازم را طراحی کند تا توسعه از ابتدا کنترل‌شده باشد.',
          en: 'Yes. FRANCH™ can assess franchise readiness and, before the first franchise is granted, design the governance infrastructure and standards so expansion is controlled from the start.',
        },
      },
    ],
    seo: {
      seoTitle: {
        fa: 'FRANCH™ — توسعه و حاکمیت فرانچایز | ریتیل سلوشنز',
        en: 'FRANCH™ — Franchise Development & Governance | Retail Solutions',
      },
      seoDescription: {
        fa: 'FRANCH™ ساختار حاکمیتی، استاندارد عملیاتی و سیستم پایش شعب را برای رشد پایدار و کنترل‌شده‌ی شبکه‌ی فرانچایز طراحی می‌کند.',
        en: 'FRANCH™ designs the governance, operational standards, and branch-monitoring needed for sustainable, controlled franchise-network growth.',
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
