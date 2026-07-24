import type { Phase, EngagementStage, Localized } from './types';

/**
 * The internal consulting methodology — HOW Retail Solutions solves the problem.
 * Distinct from the client-facing cooperation journey (see engagement).
 * Durations are intentionally omitted; they come from the CMS later.
 */
export const methodologyIntro = {
  eyebrow: { fa: 'متدولوژی', en: 'Methodology' } as Localized,
  title: { fa: 'پنج مرحله‌ی تحول', en: 'The Five Stages of Transformation' } as Localized,
  intro: {
    fa: 'متدولوژی ریتیل سلوشنز توصیف می‌کند که ما چگونه مسئله را حل می‌کنیم. این چرخه از کشف آغاز می‌شود و با توسعه‌ی مستمر قابلیت‌های سازمانی ادامه می‌یابد؛ نه یک پروژه‌ی خطی با پایان مشخص، بلکه سیستمی برای یادگیری و بهبود.',
    en: 'Retail Solutions’ methodology describes how we solve the problem. The cycle begins with discovery and continues through the ongoing development of organizational capability — not a linear project with a fixed end, but a system for learning and improvement.',
  } as Localized,
};

export const phases: Phase[] = [
  {
    key: 'discover',
    name: { fa: 'کشف', en: 'Discover' },
    objective: {
      fa: 'شناخت مدل کسب‌وکار، اهداف، بازار، ساختار، تیم، شعب، فرآیندهای اصلی و چالش‌های رشد',
      en: 'Understanding the business model, objectives, market, organization, team, stores, core processes, and growth challenges.',
    },
    activities: {
      fa: [
        'مصاحبه با مدیران و افراد کلیدی',
        'بازدید از شعب و مشاهده‌ی عملیات',
        'مرور اسناد، داده‌ها و شاخص‌های موجود',
        'ترسیم تصویر اولیه از مدل کسب‌وکار',
      ],
      en: [
        'Interviews with managers and key individuals',
        'Store visits and operational observation',
        'Review of existing documents, data, and indicators',
        'Drawing an initial picture of the business model',
      ],
    },
    participation: {
      fa: 'مدیران و افراد کلیدی زمان و دسترسی لازم برای شناخت واقعیت کسب‌وکار را فراهم می‌کنند.',
      en: 'Managers and key people provide the time and access needed to understand the reality of the business.',
    },
    outputs: {
      fa: ['تصویر اولیه‌ی مدل کسب‌وکار', 'فهرست چالش‌های رشد', 'دامنه‌ی اولیه‌ی کار'],
      en: ['Initial business-model picture', 'List of growth challenges', 'Preliminary scope'],
    },
    gate: {
      fa: 'توافق بر تصویر مشترک از وضعیت و چالش‌های اصلی پیش از ورود به تشخیص.',
      en: 'Agreement on a shared picture of the situation and the main challenges before entering diagnosis.',
    },
    connection: {
      fa: 'کشف، زمینه و داده‌ی لازم برای تشخیص دقیق ریشه‌ی مسائل را فراهم می‌کند.',
      en: 'Discover provides the context and data needed to diagnose the root causes precisely.',
    },
  },
  {
    key: 'diagnose',
    name: { fa: 'تشخیص', en: 'Diagnose' },
    objective: {
      fa: 'ارزیابی وضعیت موجود، شناسایی ریشه مسائل، سنجش شکاف‌ها و اولویت‌بندی حوزه‌های مداخله',
      en: 'Assessing the current state, identifying root causes, evaluating gaps, and prioritizing areas of intervention.',
    },
    activities: {
      fa: [
        'تحلیل شکاف میان وضع موجود و وضع مطلوب',
        'ریشه‌یابی مسائل به‌جای علائم',
        'اولویت‌بندی حوزه‌های مداخله بر اساس اثر',
      ],
      en: [
        'Gap analysis between the current and desired state',
        'Root-cause analysis rather than symptoms',
        'Prioritizing intervention areas by impact',
      ],
    },
    participation: {
      fa: 'تیم سازمان در اعتبارسنجی یافته‌ها و اولویت‌بندی مسائل مشارکت می‌کند.',
      en: 'The organization’s team participates in validating findings and prioritizing issues.',
    },
    outputs: {
      fa: ['گزارش تشخیص', 'نقشه‌ی شکاف‌ها', 'اولویت‌های مداخله'],
      en: ['Diagnostic report', 'Gap map', 'Intervention priorities'],
    },
    gate: {
      fa: 'توافق بر ریشه‌ی مسائل و اولویت‌ها پیش از طراحی راهکار.',
      en: 'Agreement on root causes and priorities before designing the solution.',
    },
    connection: {
      fa: 'تشخیص، مبنای طراحی راهکارِ متناسب با ریشه‌ی واقعی مسائل است.',
      en: 'Diagnosis is the basis for designing a solution matched to the real root causes.',
    },
  },
  {
    key: 'design',
    name: { fa: 'طراحی', en: 'Design' },
    objective: {
      fa: 'طراحی راهکار، سیستم، ساختار، فرآیند، استاندارد و نقشه اجرایی متناسب با واقعیت سازمان',
      en: 'Designing solutions, systems, structures, processes, standards, and an implementation roadmap aligned with the organization’s reality.',
    },
    activities: {
      fa: [
        'طراحی سیستم‌ها، فرآیندها و استانداردها',
        'تعریف نقش‌ها و سازوکارهای کنترلی',
        'تدوین نقشه‌ی اجرایی گام‌به‌گام',
      ],
      en: [
        'Designing systems, processes, and standards',
        'Defining roles and control mechanisms',
        'Producing a step-by-step implementation roadmap',
      ],
    },
    participation: {
      fa: 'مدیران و تیم‌ها در طراحی مشارکت می‌کنند تا راهکار با واقعیت سازمان هم‌راستا بماند.',
      en: 'Managers and teams co-design so the solution stays aligned with organizational reality.',
    },
    outputs: {
      fa: ['طراحی سیستم و فرآیند', 'استانداردها و نقش‌ها', 'نقشه‌ی اجرایی'],
      en: ['System and process design', 'Standards and roles', 'Implementation roadmap'],
    },
    gate: {
      fa: 'تأیید طراحی و نقشه‌ی اجرایی پیش از پیاده‌سازی.',
      en: 'Approval of the design and roadmap before deployment.',
    },
    connection: {
      fa: 'طراحی، ورودی مستقیم مرحله‌ی پیاده‌سازی است.',
      en: 'The design is the direct input to deployment.',
    },
  },
  {
    key: 'deploy',
    name: { fa: 'پیاده‌سازی', en: 'Deploy' },
    objective: {
      fa: 'اجرای راهکار در کنار مدیران و تیم‌ها، انتقال دانش و تبدیل طراحی‌ها به شیوه‌های عملیاتی',
      en: 'Implementing the solution alongside managers and teams, transferring knowledge, and converting designs into operational practice.',
    },
    activities: {
      fa: [
        'اجرای راهکار در کنار تیم سازمان',
        'انتقال دانش و آموزش حین اجرا',
        'تبدیل طراحی‌ها به رویه‌های روزمره',
      ],
      en: [
        'Executing the solution alongside the team',
        'Knowledge transfer and on-the-job training',
        'Turning designs into daily practice',
      ],
    },
    participation: {
      fa: 'اجرا به‌صورت مشترک انجام می‌شود؛ سازمان هم‌زمان یاد می‌گیرد و توانایی اجرای مستقل به‌دست می‌آورد.',
      en: 'Deployment is done jointly; the organization learns and gains the capability to execute independently.',
    },
    outputs: {
      fa: ['راهکارِ مستقر', 'رویه‌های عملیاتی', 'تیم آموزش‌دیده'],
      en: ['Deployed solution', 'Operational procedures', 'Trained team'],
    },
    gate: {
      fa: 'اطمینان از اجرای پایدار و انتقال دانش پیش از ورود به توسعه.',
      en: 'Confirmation of stable execution and knowledge transfer before entering development.',
    },
    connection: {
      fa: 'پیاده‌سازی، داده و تجربه‌ی لازم برای توسعه و بهبود مستمر را تولید می‌کند.',
      en: 'Deployment produces the data and experience needed for continuous development.',
    },
  },
  {
    key: 'develop',
    name: { fa: 'توسعه', en: 'Develop' },
    objective: {
      fa: 'پایش نتایج، یادگیری از اجرا، اصلاح راهکار و توسعه مستمر قابلیت‌های سازمانی',
      en: 'Monitoring outcomes, learning from implementation, refining the solution, and continuously developing organizational capabilities.',
    },
    activities: {
      fa: [
        'پایش شاخص‌ها و نتایج اجرا',
        'یادگیری و اصلاح راهکار',
        'توسعه‌ی مستمر قابلیت‌های سازمانی',
      ],
      en: [
        'Monitoring indicators and results',
        'Learning and refining the solution',
        'Continuously developing organizational capabilities',
      ],
    },
    participation: {
      fa: 'سازمان مالکیت پایش و بهبود را بر عهده می‌گیرد و ریتیل سلوشنز نقش پشتیبان را ایفا می‌کند.',
      en: 'The organization takes ownership of monitoring and improvement, with Retail Solutions in a supporting role.',
    },
    outputs: {
      fa: ['نظام پایش عملکرد', 'چرخه‌ی بهبود', 'قابلیت‌های توسعه‌یافته'],
      en: ['Performance monitoring system', 'Improvement cycle', 'Developed capabilities'],
    },
    gate: {
      fa: 'استقرار چرخه‌ی یادگیری و بهبود مستقل در سازمان.',
      en: 'Establishing an independent learning and improvement cycle in the organization.',
    },
    connection: {
      fa: 'توسعه، یافته‌های جدید را به کشف بعدی بازمی‌گرداند و چرخه را زنده نگه می‌دارد.',
      en: 'Develop feeds new findings back into the next Discover, keeping the cycle alive.',
    },
  },
];

/**
 * The client-facing cooperation journey — HOW a client begins and continues
 * the engagement. Deliberately separate from the methodology diagram.
 */
export const engagementIntro = {
  eyebrow: { fa: 'مدل همکاری', en: 'Engagement Model' } as Localized,
  title: { fa: 'مسیر همکاری با شما', en: 'Your Cooperation Journey' } as Localized,
  intro: {
    fa: 'مدل همکاری توصیف می‌کند که یک همکاری چگونه آغاز می‌شود و ادامه می‌یابد. این مسیر، رو به مشتری است و با متدولوژی داخلی — که نحوه‌ی حل مسئله را شرح می‌دهد — یکی نیست.',
    en: 'The engagement model describes how a collaboration begins and continues. It is client-facing and is distinct from the internal methodology, which describes how the problem is solved.',
  } as Localized,
};

export const engagementStages: EngagementStage[] = [
  {
    key: 'discovery',
    name: { fa: 'شناخت کسب‌وکار', en: 'Business Discovery' },
    description: {
      fa: 'جلسه اولیه برای شناخت اهداف، وضعیت، چالش‌ها و اولویت‌های سازمان',
      en: 'An initial discussion to understand objectives, current conditions, challenges, and priorities.',
    },
  },
  {
    key: 'assessment',
    name: { fa: 'ارزیابی وضعیت موجود', en: 'Current-State Assessment' },
    description: {
      fa: 'جمع‌آوری اطلاعات و بررسی دقیق‌تر مسئله، فرآیندها و زمینه تصمیم',
      en: 'Structured collection and analysis of information related to the problem, processes, and decision context.',
    },
  },
  {
    key: 'proposal',
    name: { fa: 'ارائه پیشنهاد راهکار', en: 'Solution Proposal' },
    description: {
      fa: 'تعریف محدوده پروژه، رویکرد، مراحل، خروجی‌ها و مدل همکاری',
      en: 'Definition of project scope, approach, phases, deliverables, and cooperation model.',
    },
  },
  {
    key: 'execution',
    name: { fa: 'اجرای برنامه', en: 'Program Execution' },
    description: {
      fa: 'طراحی و پیاده‌سازی راهکار در کنار مدیران و تیم سازمان',
      en: 'Design and implementation of the solution alongside the organization’s leaders and teams.',
    },
  },
  {
    key: 'optimization',
    name: { fa: 'بهینه‌سازی مستمر', en: 'Continuous Optimization' },
    description: {
      fa: 'پایش، بازبینی، اصلاح و توسعه راهکارها براساس نتایج اجرا',
      en: 'Monitoring, reviewing, improving, and developing the implemented solution based on results.',
    },
  },
];
