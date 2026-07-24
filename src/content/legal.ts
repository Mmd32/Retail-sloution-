import type { Localized } from './types';

export interface LegalPage {
  slug: string;
  title: Localized;
  body: Localized[];
}

/**
 * Baseline legal content. This is standard, non-fabricated boilerplate the
 * company can refine with counsel; it makes no false claims and names no
 * third parties. Editable via the CMS "Legal page" content type.
 */
export const legalPages: LegalPage[] = [
  {
    slug: 'privacy',
    title: { fa: 'حریم خصوصی', en: 'Privacy Policy' },
    body: [
      {
        fa: 'ریتیل سلوشنز به حفظ حریم خصوصی بازدیدکنندگان وب‌سایت متعهد است. اطلاعاتی که از طریق فرم‌های تماس، درخواست جلسه و ارزیابی آمادگی رشد ارائه می‌کنید، تنها برای پاسخ‌گویی به درخواست شما و پیگیری همکاری استفاده می‌شود.',
        en: 'Retail Solutions is committed to protecting the privacy of website visitors. Information you provide through contact forms, meeting requests, and the growth-readiness assessment is used only to respond to your request and to follow up on a potential engagement.',
      },
      {
        fa: 'ما اطلاعات شخصی شما را بدون رضایت به اشخاص ثالث نمی‌فروشیم. داده‌های تحلیلی وب‌سایت بدون اطلاعات هویتی و صرفاً برای بهبود تجربه‌ی کاربری جمع‌آوری می‌شوند.',
        en: 'We do not sell your personal information to third parties without consent. Website analytics are collected without personally identifying information and solely to improve the user experience.',
      },
      {
        fa: 'برای درخواست دسترسی، اصلاح یا حذف اطلاعات خود می‌توانید از طریق ایمیل رسمی با ما در تماس باشید.',
        en: 'To request access to, correction of, or deletion of your information, you may contact us via our official email.',
      },
    ],
  },
  {
    slug: 'terms',
    title: { fa: 'شرایط استفاده', en: 'Terms of Use' },
    body: [
      {
        fa: 'استفاده از این وب‌سایت به معنای پذیرش این شرایط است. محتوای وب‌سایت صرفاً برای اطلاع‌رسانی ارائه می‌شود و به‌تنهایی مبنای تصمیم‌های تجاری قرار نمی‌گیرد.',
        en: 'Using this website constitutes acceptance of these terms. Website content is provided for informational purposes and should not, on its own, be the basis of business decisions.',
      },
      {
        fa: 'تمامی محتوا، علائم و مواد این وب‌سایت متعلق به ریتیل سلوشنز است و بازتولید آن بدون اجازه‌ی کتبی مجاز نیست.',
        en: 'All content, marks, and materials on this website belong to Retail Solutions and may not be reproduced without written permission.',
      },
    ],
  },
  {
    slug: 'cookies',
    title: { fa: 'تنظیمات کوکی', en: 'Cookie Settings' },
    body: [
      {
        fa: 'این وب‌سایت از کوکی‌های ضروری برای عملکرد پایه و کوکی‌های تحلیلی اختیاری برای بهبود تجربه‌ی کاربری استفاده می‌کند. کوکی‌های تحلیلی هیچ اطلاعات هویتی را ذخیره نمی‌کنند.',
        en: 'This website uses essential cookies for basic functionality and optional analytics cookies to improve the user experience. Analytics cookies store no personally identifying information.',
      },
      {
        fa: 'شما می‌توانید از طریق تنظیمات مرورگر خود، کوکی‌ها را مدیریت یا غیرفعال کنید.',
        en: 'You can manage or disable cookies through your browser settings.',
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug);
}
