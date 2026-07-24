import type { Insight, Localized } from './types';

/**
 * Insight topics and content types. A topic/type is only surfaced publicly once
 * at least one approved insight exists for it (see getActiveTopics / navigation).
 */
export const insightTopics: { key: string; label: Localized }[] = [
  { key: 'retail-strategy', label: { fa: 'استراتژی ریتیل', en: 'Retail Strategy' } },
  { key: 'retail-operations', label: { fa: 'عملیات ریتیل', en: 'Retail Operations' } },
  { key: 'store-expansion', label: { fa: 'توسعه شعب', en: 'Store Expansion' } },
  { key: 'franchise', label: { fa: 'فرانچایز', en: 'Franchise' } },
  { key: 'customer-experience', label: { fa: 'تجربه مشتری', en: 'Customer Experience' } },
  { key: 'people', label: { fa: 'افراد و سازمان', en: 'People & Organization' } },
  { key: 'analytics', label: { fa: 'تحلیل داده', en: 'Analytics' } },
  { key: 'leadership', label: { fa: 'رهبری', en: 'Leadership' } },
];

export const insightTypeLabels: Record<string, Localized> = {
  article: { fa: 'مقاله', en: 'Article' },
  report: { fa: 'گزارش', en: 'Report' },
  guide: { fa: 'راهنما', en: 'Guide' },
  'case-study': { fa: 'مطالعه موردی', en: 'Case Study' },
};

/**
 * Original thought-leadership content authored for Retail Solutions.
 * No client evidence is claimed and no case studies are fabricated.
 */
export const insights: Insight[] = [
  {
    slug: 'from-founder-dependency-to-systems',
    type: 'article',
    topic: { fa: 'رهبری', en: 'Leadership' },
    title: {
      fa: 'از وابستگی به بنیان‌گذار تا سازمان سیستم‌محور',
      en: 'From Founder Dependency to a System-Driven Organization',
    },
    summary: {
      fa: 'چرا بزرگ‌ترین سقف رشد بسیاری از برندهای ریتیل، نه بازار و نه سرمایه، بلکه وابستگی سازمان به چند فرد کلیدی است — و مسیر عبور از آن.',
      en: 'Why the biggest ceiling on many retail brands is neither the market nor capital, but the organization’s dependency on a handful of key people — and how to move past it.',
    },
    body: [
      {
        fa: 'در بسیاری از برندهای ریتیل، رشد اولیه مدیون انرژی، شهود و حضور مستقیم بنیان‌گذار است. همان عاملی که در سال‌های نخست موتور رشد بوده، در مقیاس بزرگ‌تر به سقف تبدیل می‌شود: وقتی تصمیم‌ها، حل مسئله‌ها و کیفیت اجرا به حضور چند نفر گره خورده باشد، سازمان نمی‌تواند سریع‌تر از ظرفیت آن افراد رشد کند.',
        en: 'In many retail brands, early growth is powered by the founder’s energy, intuition, and direct presence. The very factor that drove the first years becomes the ceiling at scale: when decisions, problem-solving, and execution quality are tied to a few people, the organization cannot grow faster than the capacity of those individuals.',
      },
      {
        fa: 'عبور از این وضعیت یک رویداد نیست، یک انتقال است: از مدیریت فردمحور به سازمانی که بر پایه‌ی سیستم، داده و رهبری حرفه‌ای کار می‌کند. این انتقال زمانی پایدار می‌شود که هم‌زمان چهار لایه شکل بگیرد — استراتژی روشن، فرآیندهای قابل تکرار، افراد توانمند و حلقه‌ی بازخورد مبتنی بر داده.',
        en: 'Moving beyond this is not an event but a transition: from person-dependent management to an organization that runs on systems, data, and professional leadership. The transition becomes durable only when four layers form together — a clear strategy, repeatable processes, capable people, and a data-based feedback loop.',
      },
      {
        fa: 'نکته‌ی کلیدی این است که سیستم جایگزین رهبری نمی‌شود؛ رهبری را از «حل تک‌تک مسائل» به «طراحی سازوکاری که مسائل را حل می‌کند» ارتقا می‌دهد. سازمانِ ماندگار، سازمانی است که بتواند بدون حضور دائم بنیان‌گذار، کیفیت و جهت خود را حفظ کند.',
        en: 'The key point is that systems do not replace leadership; they elevate it from "solving each problem" to "designing the mechanism that solves problems." An enduring organization is one that can preserve its quality and direction without the founder’s constant presence.',
      },
    ],
    author: { fa: 'تیم ریتیل سلوشنز', en: 'Retail Solutions Team' },
    publishedAt: '2025-11-10',
    readingMinutes: 6,
    status: 'complete',
  },
  {
    slug: 'validating-a-new-store-before-you-sign',
    type: 'guide',
    topic: { fa: 'توسعه شعب', en: 'Store Expansion' },
    title: {
      fa: 'اعتبارسنجی یک شعبه‌ی جدید پیش از امضای قرارداد',
      en: 'Validating a New Store Before You Sign',
    },
    summary: {
      fa: 'یک راهنمای عملی برای تبدیل تصمیم افتتاح شعبه از شهود به فرآیندی داده‌محور که ریسک قابل‌اجتناب را کاهش می‌دهد.',
      en: 'A practical guide to turning a store-opening decision from intuition into a data-driven process that reduces avoidable risk.',
    },
    body: [
      {
        fa: 'افتتاح یک شعبه‌ی جدید معمولاً بزرگ‌ترین تصمیم سرمایه‌گذاری یک برند ریتیل در یک بازه‌ی زمانی است؛ اما اغلب با کمترین میزان تحلیل ساختاریافته گرفته می‌شود. مکان جذاب به‌نظر می‌رسد، فرصت «از دست‌رفتنی» است و تصمیم بر پایه‌ی احساس گرفته می‌شود.',
        en: 'Opening a new store is often a retail brand’s largest single investment decision in a given period — yet it is frequently made with the least structured analysis. A location looks attractive, the opportunity feels "not to be missed," and the decision is made on gut feel.',
      },
      {
        fa: 'یک فرآیند اعتبارسنجی خوب، تصمیم را حذف نمی‌کند؛ کیفیت آن را بالا می‌برد. پیش از تعهد سرمایه، دست‌کم این ابعاد را به‌صورت روشن ارزیابی کنید: کیفیت و دسترسی مکان، حوزه‌ی جذب مشتری، شدت رقابت، تناسب برند و بازار، فرمت مناسب فروشگاه و ریسک سرمایه‌گذاری.',
        en: 'A good validation process does not remove the decision; it raises its quality. Before committing capital, clearly assess at least these dimensions: location quality and accessibility, customer catchment, competitive intensity, brand-market fit, the appropriate store format, and investment risk.',
      },
      {
        fa: 'خروجی نباید صرفاً «بله» یا «خیر» باشد. یک اعتبارسنجی مفید، پیشنهاد را در سه حالت ارائه می‌کند: اجرا، اصلاح شرایط پیش از اجرا، یا توقف. همین چارچوب ساده، بخش بزرگی از شکست‌های قابل‌پیش‌بینی شعب را حذف می‌کند.',
        en: 'The output should not be a plain yes or no. A useful validation presents the recommendation in three modes: proceed, adjust conditions first, or stop. This simple framing eliminates a large share of predictable store failures.',
      },
    ],
    author: { fa: 'تیم ریتیل سلوشنز', en: 'Retail Solutions Team' },
    publishedAt: '2025-12-02',
    readingMinutes: 7,
    status: 'complete',
  },
  {
    slug: 'friction-is-the-silent-tax-on-retail',
    type: 'article',
    topic: { fa: 'تجربه مشتری', en: 'Customer Experience' },
    title: {
      fa: 'اصطکاک، مالیات پنهان بر فروش ریتیل',
      en: 'Friction Is the Silent Tax on Retail Sales',
    },
    summary: {
      fa: 'کوچک‌ترین اصطکاک‌ها در مسیر خرید، بی‌آنکه در گزارش‌ها دیده شوند، فروش و وفاداری را فرسایش می‌دهند. چگونه آن‌ها را ببینیم و حذف کنیم.',
      en: 'The smallest points of friction in the buying journey erode sales and loyalty without ever appearing in a report. How to see them and remove them.',
    },
    body: [
      {
        fa: 'اصطکاک در تجربه‌ی خرید معمولاً در هیچ گزارشی به‌صورت مستقیم دیده نمی‌شود؛ اما در نرخ تبدیل پایین‌تر، بازگشت بیشتر کالا و وفاداری ضعیف‌تر خود را نشان می‌دهد. مشتری امروز به‌ندرت شکایت می‌کند؛ او صرفاً برنمی‌گردد.',
        en: 'Friction in the purchasing experience rarely shows up directly in any report; it appears instead in lower conversion, higher returns, and weaker loyalty. Today’s customer rarely complains — they simply do not come back.',
      },
      {
        fa: 'اولین قدم، دیدن مسیر خرید از چشم مشتری است، نه از چشم سازمان. نقشه‌ی سفر مشتری، نقاطی را آشکار می‌کند که در آن‌ها تلاش، ابهام یا انتظار غیرضروری وجود دارد. سپس این نقاط بر اساس اثرشان بر تبدیل و وفاداری اولویت‌بندی می‌شوند.',
        en: 'The first step is to see the buying journey through the customer’s eyes, not the organization’s. A journey map reveals the points where unnecessary effort, ambiguity, or waiting exist. These points are then prioritized by their impact on conversion and loyalty.',
      },
      {
        fa: 'حذف اصطکاک، تنها نیمی از کار است. نیمه‌ی دیگر، طراحی سازوکارهای پاداش و تعاملی است که رفتار خرید و بازگشت مشتری را تقویت می‌کنند. ترکیب این دو — کاهش اصطکاک و افزایش پاداش — همان چیزی است که تجربه را از «قابل‌قبول» به «به‌یادماندنی» منتقل می‌کند.',
        en: 'Removing friction is only half the work. The other half is designing reward and interaction mechanisms that reinforce buying behavior and return visits. Combining the two — less friction, more reward — is what moves an experience from "acceptable" to "memorable."',
      },
    ],
    author: { fa: 'تیم ریتیل سلوشنز', en: 'Retail Solutions Team' },
    publishedAt: '2025-12-20',
    readingMinutes: 5,
    status: 'complete',
  },
  {
    slug: 'governance-before-you-franchise',
    type: 'article',
    topic: { fa: 'فرانچایز', en: 'Franchise' },
    title: {
      fa: 'حاکمیت، پیش از آنکه فرانچایز بدهید',
      en: 'Governance, Before You Franchise',
    },
    summary: {
      fa: 'فرانچایز بدون ساختار حاکمیتی، کیفیت برند را در شعب پراکنده می‌کند. چرا حاکمیت باید پیش از اولین واگذاری طراحی شود.',
      en: 'Franchising without governance scatters brand quality across locations. Why governance must be designed before the first franchise is granted.',
    },
    body: [
      {
        fa: 'فرانچایز جذاب است چون رشد را بدون سرمایه‌گذاری مستقیم برند ممکن می‌کند. اما همین ویژگی، ریسک اصلی آن هم هست: کنترل مستقیم کاهش می‌یابد و اگر ساختار حاکمیتی روشن نباشد، کیفیت برند در هر شعبه به سلیقه و توان فرانچایزگیرنده وابسته می‌شود.',
        en: 'Franchising is attractive because it enables growth without the brand’s direct capital. But that same feature is its core risk: direct control drops, and without a clear governance structure, brand quality at each location becomes dependent on the taste and capability of the franchisee.',
      },
      {
        fa: 'حاکمیت فرانچایز یعنی تعریف روشن اینکه چه تصمیم‌هایی مرکزی می‌مانند، چه استانداردهایی غیرقابل‌مذاکره‌اند و کیفیت شعب چگونه پایش و اصلاح می‌شود. این چارچوب باید پیش از اولین واگذاری طراحی شود؛ اصلاح آن پس از گسترش شبکه، بسیار پرهزینه‌تر است.',
        en: 'Franchise governance means clearly defining which decisions remain central, which standards are non-negotiable, and how branch quality is monitored and corrected. This framework must be designed before the first franchise is granted; fixing it after the network has expanded is far more costly.',
      },
    ],
    author: { fa: 'تیم ریتیل سلوشنز', en: 'Retail Solutions Team' },
    publishedAt: '2026-01-15',
    readingMinutes: 5,
    status: 'complete',
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

/** Topics that have at least one published insight — used to avoid empty menus. */
export function getActiveTopics() {
  const active = new Set(insights.map((i) => i.topic.en));
  return insightTopics.filter((topic) =>
    insights.some((i) => i.topic.en === topic.label.en) || active.has(topic.label.en),
  );
}
