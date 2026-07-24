import type { Capability } from './types';

/**
 * The six capabilities form one integrated transformation system — not six
 * disconnected products. The `title` is the practical Persian framing from the
 * profile; the `name` is the short English label used in navigation.
 */
export const capabilities: Capability[] = [
  {
    slug: 'strategy',
    name: { fa: 'استراتژی', en: 'Strategy' },
    title: { fa: 'تدوین استراتژی رشد', en: 'Growth Strategy' },
    description: {
      fa: 'تعریف جهت رشد، اولویت‌های استراتژیک، مدل توسعه و تصمیم‌های کلیدی متناسب با موقعیت برند.',
      en: 'Defining growth direction, strategic priorities, expansion models, and critical decisions based on the brand’s position.',
    },
    detail: {
      fa: 'استراتژی نقطه‌ی شروع سیستم تحول است: جایی که جهت رشد، اولویت‌ها و مرزهای تصمیم مشخص می‌شوند تا سایر قابلیت‌ها — عملیات، افراد، توسعه و تحلیل — بر مبنای یک منطق واحد شکل بگیرند.',
      en: 'Strategy is where the transformation system begins: growth direction, priorities, and decision boundaries are defined so that every other capability — operations, people, expansion, and analytics — is built on one coherent logic.',
    },
  },
  {
    slug: 'operations',
    name: { fa: 'عملیات', en: 'Operations' },
    title: { fa: 'طراحی سیستم عملیاتی', en: 'Operating System Design' },
    description: {
      fa: 'طراحی فرآیندها، استانداردها، نقش‌ها و سازوکارهای کنترلی برای اجرای منسجم و قابل تکرار.',
      en: 'Designing processes, standards, roles, and control mechanisms for consistent and repeatable execution.',
    },
    detail: {
      fa: 'عملیات، استراتژی را به اجرای روزمره تبدیل می‌کند. فرآیندها، استانداردها و سازوکارهای کنترلی طوری طراحی می‌شوند که کیفیت، مستقل از افراد، در همه‌ی شعب و تیم‌ها قابل تکرار باشد.',
      en: 'Operations turns strategy into daily execution. Processes, standards, and control mechanisms are designed so that quality is repeatable across every store and team — independent of any individual.',
    },
  },
  {
    slug: 'people',
    name: { fa: 'سرمایه انسانی', en: 'People' },
    title: { fa: 'توسعه سرمایه انسانی', en: 'Human Capital Development' },
    description: {
      fa: 'تقویت ساختار، نقش‌ها، شایستگی‌ها، نظام عملکرد و قابلیت‌های مدیریتی موردنیاز رشد.',
      en: 'Developing organizational structure, roles, competencies, performance systems, and managerial capabilities required for growth.',
    },
    detail: {
      fa: 'سیستم بدون افراد توانمند اجرا نمی‌شود. ساختار، نقش‌ها، شایستگی‌ها و نظام عملکرد طوری توسعه می‌یابند که سازمان بتواند مستقل از بنیان‌گذار، رهبری و رشد کند.',
      en: 'A system does not run without capable people. Structure, roles, competencies, and performance systems are developed so the organization can lead and grow independently of its founder.',
    },
  },
  {
    slug: 'expansion',
    name: { fa: 'توسعه شعب', en: 'Expansion' },
    title: { fa: 'برنامه‌ریزی توسعه شعب', en: 'Expansion Planning' },
    description: {
      fa: 'طراحی مسیر توسعه شبکه، اولویت‌بندی فرصت‌ها و کاهش ریسک تصمیم‌های توسعه‌ای.',
      en: 'Designing the network expansion path, prioritizing opportunities, and reducing the risks of expansion decisions.',
    },
    detail: {
      fa: 'توسعه‌ی شبکه زمانی پایدار است که بر پایه‌ی داده و اولویت‌بندی روشن انجام شود. مسیر رشد شبکه طراحی و ریسک تصمیم‌های توسعه‌ای پیش از سرمایه‌گذاری کاهش داده می‌شود.',
      en: 'Network growth is sustainable only when it is driven by data and clear priorities. The expansion path is designed and the risk of expansion decisions is reduced before capital is committed.',
    },
  },
  {
    slug: 'store-development',
    name: { fa: 'توسعه فروشگاه', en: 'Store Development' },
    title: { fa: 'توسعه استاندارد فروشگاه', en: 'Store Standard Development' },
    description: {
      fa: 'تعریف استانداردهای مربوط به طراحی، راه‌اندازی، بهره‌برداری و ارزیابی فروشگاه.',
      en: 'Defining standards for store design, launch, operation, and evaluation.',
    },
    detail: {
      fa: 'فروشگاه، نقطه‌ی تماس اصلی برند با مشتری است. استانداردهای طراحی، راه‌اندازی، بهره‌برداری و ارزیابی طوری تعریف می‌شوند که تجربه‌ی برند در هر نقطه یکسان و قابل سنجش باشد.',
      en: 'The store is the brand’s primary point of contact with the customer. Standards for design, launch, operation, and evaluation are defined so the brand experience is consistent and measurable everywhere.',
    },
  },
  {
    slug: 'analytics',
    name: { fa: 'تحلیل داده', en: 'Analytics' },
    title: { fa: 'تحلیل داده و عملکرد', en: 'Data & Performance Analytics' },
    description: {
      fa: 'تبدیل داده‌های کسب‌وکار به شاخص، بینش و تصمیم‌های مدیریتی قابل اتکا.',
      en: 'Converting business data into indicators, insight, and reliable management decisions.',
    },
    detail: {
      fa: 'تحلیل داده، حلقه‌ی بازخورد سیستم است. داده‌های پراکنده‌ی کسب‌وکار به شاخص و بینش تبدیل می‌شوند تا تصمیم‌ها از شهود به‌سمت اتکا به واقعیت حرکت کنند.',
      en: 'Analytics is the system’s feedback loop. Scattered business data is turned into indicators and insight, moving decisions from intuition toward evidence.',
    },
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}
