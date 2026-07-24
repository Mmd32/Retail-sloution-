import type { Localized } from './types';

/**
 * Retail Growth Readiness Assessment.
 * 10 dimensions, 3–5 questions each (34 total). Answer scale is 0–4 and each
 * dimension scores 0–100. This is a preliminary diagnostic — never a
 * certification.
 */

export const assessmentMeta = {
  title: {
    fa: 'ارزیابی آمادگی رشد ریتیل',
    en: 'Retail Growth Readiness Assessment',
  } as Localized,
  intro: {
    fa: 'در حدود ده دقیقه، آمادگی سازمان شما برای رشد سیستم‌محور را در ده بُعد کلیدی می‌سنجیم و یک تصویر تشخیصی اولیه ارائه می‌کنیم.',
    en: 'In about ten minutes, we assess your organization’s readiness for system-driven growth across ten key dimensions and produce a preliminary diagnostic picture.',
  } as Localized,
  disclaimer: {
    fa: 'این ارزیابی یک ابزار تشخیصی اولیه است و جایگزین بررسی تخصصی و جامع سازمان نیست.',
    en: 'This assessment is an initial diagnostic tool and does not replace a comprehensive professional organizational assessment.',
  } as Localized,
};

export const answerScale: { value: number; label: Localized }[] = [
  { value: 0, label: { fa: 'اصلاً وجود ندارد', en: 'Not in place' } },
  { value: 1, label: { fa: 'محدود و موردی', en: 'Limited and occasional' } },
  { value: 2, label: { fa: 'تا حدی شکل گرفته', en: 'Partially established' } },
  { value: 3, label: { fa: 'در بیشتر بخش‌ها اجرا می‌شود', en: 'Implemented across most areas' } },
  { value: 4, label: { fa: 'کاملاً ساختاریافته و پایدار است', en: 'Fully structured and sustainable' } },
];

export interface MaturityLevel {
  key: string;
  min: number;
  max: number;
  label: Localized;
  description: Localized;
}

export const maturityLevels: MaturityLevel[] = [
  {
    key: 'person-dependent',
    min: 0,
    max: 24,
    label: { fa: 'فردمحور', en: 'Person-Dependent' },
    description: {
      fa: 'کسب‌وکار عمدتاً به افراد کلیدی وابسته است و سیستم‌های قابل تکرار هنوز شکل نگرفته‌اند.',
      en: 'The business depends largely on key individuals and repeatable systems have not yet formed.',
    },
  },
  {
    key: 'developing',
    min: 25,
    max: 49,
    label: { fa: 'در حال ساخت', en: 'Developing' },
    description: {
      fa: 'اجزای اولیه‌ی سیستم در حال شکل‌گیری‌اند اما هنوز یکپارچه و پایدار نیستند.',
      en: 'The first building blocks of a system are forming but are not yet integrated or stable.',
    },
  },
  {
    key: 'structured',
    min: 50,
    max: 74,
    label: { fa: 'ساختاریافته', en: 'Structured' },
    description: {
      fa: 'سیستم‌ها و استانداردها در بیشتر حوزه‌ها مستقر شده‌اند و وابستگی به افراد کاهش یافته است.',
      en: 'Systems and standards are established across most areas and dependency on individuals has decreased.',
    },
  },
  {
    key: 'scalable',
    min: 75,
    max: 100,
    label: { fa: 'مقیاس‌پذیر', en: 'Scalable' },
    description: {
      fa: 'سازمان بر پایه‌ی سیستم، داده و رهبری حرفه‌ای کار می‌کند و برای رشد مقیاس‌پذیر آماده است.',
      en: 'The organization runs on systems, data, and professional leadership and is ready for scalable growth.',
    },
  },
];

export interface AssessmentDimension {
  key: string;
  name: Localized;
  /** service slug this dimension most strongly maps to, for recommendations */
  service?: 'fr' | 'svp' | 'franch';
  questions: Localized[];
}

export const dimensions: AssessmentDimension[] = [
  {
    key: 'owner-dependency',
    name: { fa: 'وابستگی به مالک', en: 'Owner Dependency' },
    questions: [
      {
        fa: 'کسب‌وکار می‌تواند بدون حضور روزانه‌ی مالک، عملیات عادی خود را ادامه دهد.',
        en: 'The business can continue normal operations without the owner’s daily presence.',
      },
      {
        fa: 'تصمیم‌های مهم بدون نیاز به تأیید مستقیم مالک، در چارچوب‌های تعریف‌شده گرفته می‌شوند.',
        en: 'Important decisions are made within defined frameworks without needing the owner’s direct approval.',
      },
      {
        fa: 'دانش کلیدی سازمان مستند شده و به چند فرد خاص محدود نیست.',
        en: 'Key organizational knowledge is documented and not confined to a few specific people.',
      },
      {
        fa: 'اگر یک مدیر کلیدی سازمان را ترک کند، اجرا به‌شدت مختل نمی‌شود.',
        en: 'If a key manager leaves, execution is not severely disrupted.',
      },
    ],
  },
  {
    key: 'operational-standardization',
    name: { fa: 'استانداردسازی عملیات', en: 'Operational Standardization' },
    questions: [
      {
        fa: 'فرآیندهای اصلی به‌صورت مکتوب و استاندارد تعریف شده‌اند.',
        en: 'Core processes are defined in writing and standardized.',
      },
      {
        fa: 'کیفیت اجرا در شعب و تیم‌های مختلف تا حد زیادی یکسان است.',
        en: 'Execution quality is largely consistent across different stores and teams.',
      },
      {
        fa: 'برای موقعیت‌های رایج، رویه‌ها و استانداردهای روشنی وجود دارد.',
        en: 'Clear procedures and standards exist for common situations.',
      },
      {
        fa: 'انطباق با استانداردها به‌صورت منظم بررسی می‌شود.',
        en: 'Compliance with standards is reviewed regularly.',
      },
    ],
  },
  {
    key: 'decision-maturity',
    name: { fa: 'بلوغ تصمیم‌گیری', en: 'Decision-Making Maturity' },
    questions: [
      {
        fa: 'تصمیم‌های مهم بر پایه‌ی داده و چارچوب تحلیلی گرفته می‌شوند، نه صرفاً شهود.',
        en: 'Important decisions are based on data and analytical frameworks, not just intuition.',
      },
      {
        fa: 'برای تصمیم‌های تکرارشونده، معیارها و فرآیند مشخصی وجود دارد.',
        en: 'For recurring decisions, defined criteria and a process exist.',
      },
      {
        fa: 'نتیجه‌ی تصمیم‌های مهم پس از اجرا بازبینی و از آن یادگیری می‌شود.',
        en: 'The outcomes of important decisions are reviewed and learned from after execution.',
      },
    ],
  },
  {
    key: 'data-analytics',
    name: { fa: 'داده و تحلیل عملکرد', en: 'Data and Performance Analytics' },
    service: 'svp',
    questions: [
      {
        fa: 'شاخص‌های کلیدی عملکرد به‌صورت منظم اندازه‌گیری و پایش می‌شوند.',
        en: 'Key performance indicators are measured and monitored regularly.',
      },
      {
        fa: 'داده‌های کسب‌وکار به بینش و تصمیم مدیریتی تبدیل می‌شوند.',
        en: 'Business data is turned into insight and management decisions.',
      },
      {
        fa: 'مدیران به داده‌ی به‌روز و قابل‌اتکا برای تصمیم‌گیری دسترسی دارند.',
        en: 'Managers have access to up-to-date, reliable data for decision-making.',
      },
    ],
  },
  {
    key: 'people-capability',
    name: { fa: 'سرمایه انسانی و قابلیت سازمانی', en: 'People and Organizational Capability' },
    questions: [
      {
        fa: 'نقش‌ها، مسئولیت‌ها و ساختار سازمانی روشن و تعریف‌شده‌اند.',
        en: 'Roles, responsibilities, and the organizational structure are clear and defined.',
      },
      {
        fa: 'برنامه‌ی مشخصی برای توسعه‌ی شایستگی و قابلیت‌های مدیریتی وجود دارد.',
        en: 'A defined plan exists for developing competencies and managerial capabilities.',
      },
      {
        fa: 'نظام ارزیابی عملکرد افراد به‌صورت ساختاریافته اجرا می‌شود.',
        en: 'A structured performance-evaluation system is in place.',
      },
      {
        fa: 'سازمان می‌تواند نیروی جدید را به‌سرعت و با کیفیت آموزش دهد.',
        en: 'The organization can onboard and train new people quickly and with quality.',
      },
    ],
  },
  {
    key: 'cx-consistency',
    name: { fa: 'یکپارچگی تجربه مشتری', en: 'Customer Experience Consistency' },
    service: 'fr',
    questions: [
      {
        fa: 'تجربه‌ی مشتری در همه‌ی شعب و کانال‌ها یکسان و قابل‌اتکا است.',
        en: 'The customer experience is consistent and reliable across all stores and channels.',
      },
      {
        fa: 'نقاط اصطکاک در مسیر خرید شناسایی و مدیریت می‌شوند.',
        en: 'Friction points in the buying journey are identified and managed.',
      },
      {
        fa: 'رضایت و بازخورد مشتری به‌صورت منظم سنجیده و به بهبود تبدیل می‌شود.',
        en: 'Customer satisfaction and feedback are measured regularly and turned into improvement.',
      },
      {
        fa: 'سازوکار روشنی برای وفادارسازی مشتری وجود دارد.',
        en: 'A clear mechanism for customer retention exists.',
      },
    ],
  },
  {
    key: 'expansion-readiness',
    name: { fa: 'آمادگی توسعه شعب', en: 'Store Expansion Readiness' },
    service: 'svp',
    questions: [
      {
        fa: 'تصمیم افتتاح شعبه‌ی جدید بر پایه‌ی ارزیابی داده‌محور گرفته می‌شود.',
        en: 'The decision to open a new store is based on data-driven evaluation.',
      },
      {
        fa: 'ریسک‌های سرمایه‌گذاری پیش از افتتاح شعبه شناسایی و ارزیابی می‌شوند.',
        en: 'Investment risks are identified and evaluated before a store opens.',
      },
      {
        fa: 'مدل و فرآیند تکرارپذیری برای راه‌اندازی شعب جدید وجود دارد.',
        en: 'A repeatable model and process exists for launching new stores.',
      },
    ],
  },
  {
    key: 'franchise-readiness',
    name: { fa: 'آمادگی فرانچایز', en: 'Franchise Readiness' },
    service: 'franch',
    questions: [
      {
        fa: 'مدل حاکمیتی روشنی برای رابطه با فرانچایزگیرندگان تعریف شده است.',
        en: 'A clear governance model is defined for the franchisee relationship.',
      },
      {
        fa: 'دفترچه یا مجموعه‌ی استاندارد عملیاتی قابل‌واگذاری وجود دارد.',
        en: 'A transferable operational standards manual exists.',
      },
      {
        fa: 'سیستم ارزیابی و پایش کیفیت شعب فرانچایز طراحی شده است.',
        en: 'A system to evaluate and monitor franchise-branch quality is designed.',
      },
    ],
  },
  {
    key: 'store-development',
    name: { fa: 'توسعه و استاندارد فروشگاه', en: 'Store Development Readiness' },
    questions: [
      {
        fa: 'استانداردهای طراحی و راه‌اندازی فروشگاه به‌صورت مدون وجود دارند.',
        en: 'Documented standards for store design and launch exist.',
      },
      {
        fa: 'بهره‌برداری و عملیات فروشگاه بر پایه‌ی استانداردهای مشخص انجام می‌شود.',
        en: 'Store operation runs on defined standards.',
      },
      {
        fa: 'عملکرد فروشگاه‌ها به‌صورت منظم ارزیابی و بهبود داده می‌شود.',
        en: 'Store performance is evaluated and improved regularly.',
      },
    ],
  },
  {
    key: 'performance-management',
    name: { fa: 'مدیریت و پایش عملکرد', en: 'Performance Management' },
    questions: [
      {
        fa: 'اهداف عملکردی روشن و قابل‌اندازه‌گیری برای سازمان و تیم‌ها تعریف شده‌اند.',
        en: 'Clear, measurable performance goals are defined for the organization and teams.',
      },
      {
        fa: 'پیشرفت نسبت به اهداف به‌صورت منظم پایش و بازخورد داده می‌شود.',
        en: 'Progress against goals is monitored and fed back regularly.',
      },
      {
        fa: 'انحراف از اهداف به‌سرعت شناسایی و اصلاح می‌شود.',
        en: 'Deviations from goals are quickly identified and corrected.',
      },
    ],
  },
];

export const totalQuestions = dimensions.reduce((n, d) => n + d.questions.length, 0);

/** Lead-capture fields shown after the preview. */
export const assessmentLeadFields = {
  intro: {
    fa: 'برای دریافت نتیجه‌ی کامل و گزارش دوزبانه، لطفاً اطلاعات کسب‌وکار خود را وارد کنید.',
    en: 'To receive your full result and bilingual report, please enter your business information.',
  } as Localized,
};

/**
 * Recommendation logic — preliminary, not definitive. Weakest relevant
 * dimension(s) map to the most relevant structured solution; broad weakness
 * maps to an integrated engagement.
 */
export function recommendService(dimensionScores: Record<string, number>): {
  service: 'fr' | 'svp' | 'franch' | 'integrated';
} {
  const scores = Object.values(dimensionScores);
  const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
  const weakCount = scores.filter((s) => s < 50).length;

  // Broad, multi-dimensional weakness → integrated transformation engagement.
  if (avg < 45 || weakCount >= 6) return { service: 'integrated' };

  const cx = dimensionScores['cx-consistency'] ?? 100;
  const expansion = dimensionScores['expansion-readiness'] ?? 100;
  const franchise = dimensionScores['franchise-readiness'] ?? 100;

  const lowest = Math.min(cx, expansion, franchise);
  if (lowest >= 60) return { service: 'integrated' };
  if (lowest === cx) return { service: 'fr' };
  if (lowest === expansion) return { service: 'svp' };
  return { service: 'franch' };
}
