import type { Locale } from '@/i18n/config';

/** Interface strings — never mechanically translated; both feel native. */
export const ui = {
  requestMeeting: { fa: 'درخواست جلسه', en: 'Request a Meeting' },
  assessBusiness: { fa: 'ارزیابی وضعیت کسب‌وکار', en: 'Assess Your Business' },
  learnMore: { fa: 'بیشتر بدانید', en: 'Learn more' },
  readMore: { fa: 'ادامه مطلب', en: 'Read more' },
  viewAll: { fa: 'مشاهده همه', en: 'View all' },
  search: { fa: 'جستجو', en: 'Search' },
  searchPlaceholder: { fa: 'جستجو در خدمات، صنایع و بینش‌ها…', en: 'Search services, industries, insights…' },
  menu: { fa: 'منو', en: 'Menu' },
  close: { fa: 'بستن', en: 'Close' },
  language: { fa: 'زبان', en: 'Language' },
  skipToContent: { fa: 'رفتن به محتوای اصلی', en: 'Skip to main content' },
  home: { fa: 'خانه', en: 'Home' },

  // sections
  challenge: { fa: 'چالش', en: 'The Challenge' },
  approach: { fa: 'رویکرد', en: 'Our Approach' },
  deliverables: { fa: 'خروجی‌ها', en: 'Deliverables' },
  intendedImpact: { fa: 'اثر موردانتظار', en: 'Intended Impact' },
  suitability: { fa: 'برای چه سازمان‌هایی مناسب است', en: 'Who It Is For' },
  diagnosticQuestions: { fa: 'پرسش‌های تشخیصی کلیدی', en: 'Key Diagnostic Questions' },
  relatedCapabilities: { fa: 'تخصص‌های مرتبط', en: 'Related Capabilities' },
  relatedIndustries: { fa: 'صنایع مرتبط', en: 'Relevant Industries' },
  relatedInsights: { fa: 'بینش‌های مرتبط', en: 'Related Insights' },
  relatedSolutions: { fa: 'راهکارهای مرتبط', en: 'Relevant Solutions' },
  commonChallenges: { fa: 'چالش‌های رایج', en: 'Common Challenges' },
  overview: { fa: 'نمای کلی', en: 'Overview' },
  faq: { fa: 'پرسش‌های متداول', en: 'Frequently Asked Questions' },
  executiveSummary: { fa: 'خلاصه اجرایی', en: 'Executive Summary' },
  vision: { fa: 'چشم‌انداز', en: 'Vision' },
  mission: { fa: 'مأموریت', en: 'Mission' },
  values: { fa: 'ارزش‌ها', en: 'Values' },
  ourPhilosophy: { fa: 'فلسفه ما', en: 'Our Philosophy' },

  // methodology / engagement
  objective: { fa: 'هدف', en: 'Objective' },
  activities: { fa: 'فعالیت‌ها', en: 'Activities' },
  clientParticipation: { fa: 'مشارکت سازمان', en: 'Client Participation' },
  typicalOutputs: { fa: 'خروجی‌های معمول', en: 'Typical Outputs' },
  decisionGate: { fa: 'دروازه تصمیم', en: 'Decision Gate' },
  nextPhase: { fa: 'اتصال به مرحله بعد', en: 'Connection to Next Phase' },

  // insights
  readingTime: { fa: 'دقیقه مطالعه', en: 'min read' },
  publishedOn: { fa: 'تاریخ انتشار', en: 'Published' },
  author: { fa: 'نویسنده', en: 'Author' },
  allTopics: { fa: 'همه موضوعات', en: 'All topics' },
  allTypes: { fa: 'همه انواع', en: 'All types' },

  // forms
  fullName: { fa: 'نام و نام خانوادگی', en: 'Full name' },
  companyBrand: { fa: 'نام برند', en: 'Company or brand' },
  jobTitle: { fa: 'سمت', en: 'Job title' },
  mobile: { fa: 'شماره تماس', en: 'Mobile number' },
  email: { fa: 'ایمیل', en: 'Email' },
  industry: { fa: 'صنعت', en: 'Industry' },
  branches: { fa: 'تعداد شعب', en: 'Number of branches' },
  city: { fa: 'شهر', en: 'City' },
  primaryChallenge: { fa: 'چالش اصلی', en: 'Primary challenge' },
  preferredContactMethod: { fa: 'روش تماس ترجیحی', en: 'Preferred contact method' },
  preferredContactTime: { fa: 'زمان مناسب تماس', en: 'Preferred contact time' },
  consent: {
    fa: 'با ذخیره و استفاده از اطلاعات من برای تماس و پیگیری موافقم.',
    en: 'I agree to have my information stored and used to contact and follow up with me.',
  },
  submit: { fa: 'ارسال', en: 'Submit' },
  submitting: { fa: 'در حال ارسال…', en: 'Submitting…' },
  optional: { fa: '(اختیاری)', en: '(optional)' },
  selectPlaceholder: { fa: 'انتخاب کنید', en: 'Select…' },

  contactMethodPhone: { fa: 'تماس تلفنی', en: 'Phone call' },
  contactMethodWhatsapp: { fa: 'واتساپ', en: 'WhatsApp' },
  contactMethodEmail: { fa: 'ایمیل', en: 'Email' },

  formSuccessTitle: { fa: 'درخواست شما ثبت شد', en: 'Your request has been received' },
  formSuccessBody: {
    fa: 'به‌زودی همکاران ما با شما تماس می‌گیرند. سپاس از اعتماد شما.',
    en: 'Our team will contact you shortly. Thank you for reaching out.',
  },
  formError: {
    fa: 'ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.',
    en: 'Something went wrong. Please try again.',
  },

  // validation
  required: { fa: 'این فیلد الزامی است', en: 'This field is required' },
  invalidEmail: { fa: 'ایمیل معتبر نیست', en: 'Please enter a valid email' },
  invalidPhone: { fa: 'شماره تماس معتبر نیست', en: 'Please enter a valid phone number' },
  consentRequired: { fa: 'برای ادامه باید موافقت کنید', en: 'You must agree to continue' },

  // assessment
  startAssessment: { fa: 'شروع ارزیابی', en: 'Start Assessment' },
  next: { fa: 'بعدی', en: 'Next' },
  previous: { fa: 'قبلی', en: 'Previous' },
  dimension: { fa: 'بُعد', en: 'Dimension' },
  of: { fa: 'از', en: 'of' },
  seePreview: { fa: 'مشاهده پیش‌نمایش نتیجه', en: 'See result preview' },
  getFullResult: { fa: 'دریافت نتیجه کامل', en: 'Get full result' },
  yourMaturity: { fa: 'سطح بلوغ سازمان شما', en: 'Your Organizational Maturity' },
  overallScore: { fa: 'امتیاز کلی', en: 'Overall Score' },
  dimensionBreakdown: { fa: 'تفکیک ابعاد', en: 'Dimension Breakdown' },
  preliminaryRecommendation: { fa: 'پیشنهاد اولیه', en: 'Preliminary Recommendation' },
  recommendationNote: {
    fa: 'این پیشنهاد اولیه و بر پایه‌ی پاسخ‌های شماست و جنبه‌ی قطعی ندارد.',
    en: 'This recommendation is preliminary, based on your answers, and not definitive.',
  },
  restart: { fa: 'شروع دوباره', en: 'Start over' },

  // footer
  legalPrivacy: { fa: 'حریم خصوصی', en: 'Privacy Policy' },
  legalTerms: { fa: 'شرایط استفاده', en: 'Terms of Use' },
  legalCookies: { fa: 'تنظیمات کوکی', en: 'Cookie Settings' },
  footerSolutions: { fa: 'راهکارها', en: 'Solutions' },
  footerCapabilities: { fa: 'تخصص‌ها', en: 'Capabilities' },
  footerIndustries: { fa: 'صنایع', en: 'Industries' },
  footerAbout: { fa: 'درباره ریتیل سلوشنز', en: 'About Retail Solutions' },
  allRightsReserved: { fa: 'تمامی حقوق محفوظ است.', en: 'All rights reserved.' },
} as const;

export type UiKey = keyof typeof ui;

export function u(key: UiKey, locale: Locale): string {
  return ui[key][locale];
}
