import type { Locale } from '@/i18n/config';
import { industryProblem } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The four growth risks (§5).
 *
 * Each risk now states its consequence, which is the part that makes it a risk
 * rather than an observation. The number is set large and treated as the
 * anchor, so the group scans as a sequence rather than four equal boxes.
 *
 * Hover lifts 3px and lights the top rule — no glow, no scale, no rotation.
 * Reveal staggers by 70ms across the row and is disabled under reduced motion.
 */

/** How we solve each challenge, in the same order as `industryProblem`. */
const solutions: { fa: string; en: string }[] = [
  {
    fa: 'ساختار تصمیم‌گیری و تفویض اختیار را طراحی می‌کنیم تا کسب‌وکار بدون حضور دائم شما هم درست اداره شود.',
    en: 'We design decision rights and delegation so the business runs well without you in every room.',
  },
  {
    fa: 'استاندارد عملیات، چک‌لیست ارزیابی و مسیر آموزش را تدوین می‌کنیم تا هر شعبه همان تجربه را ارائه دهد.',
    en: 'We write operating standards, evaluation checklists and training paths so every branch delivers the same experience.',
  },
  {
    fa: 'پیش از هر مرحله توسعه، ساختار، فرآیند و تیم لازم را آماده می‌کنیم تا شعبه جدید ظرفیت اضافه کند، نه فشار.',
    en: 'Before each expansion step we put the structure, processes and team in place, so a new branch adds capacity, not pressure.',
  },
  {
    fa: 'شاخص‌های کلیدی، داشبورد مدیریتی و مدل اعتبارسنجی شعبه را راه‌اندازی می‌کنیم تا تصمیم‌ها پشتوانه عددی داشته باشند.',
    en: 'We set up KPIs, a management dashboard and a branch validation model, so decisions rest on numbers.',
  },
];

export function GrowthRisks({ locale }: { locale: Locale }) {
  return (
    <ul className="stack-header grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
      {industryProblem.problems.map((p, i) => (
        <Reveal as="li" key={i} delay={i * 70} className="group relative bg-surface">
          <div className="relative h-full p-6 transition-transform duration-standard ease-standard group-hover:-translate-y-[3px]">
            {/* accent rule — the only thing hover changes besides the lift */}
            <span
              className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-cyan transition-transform duration-standard ease-standard group-hover:scale-x-100"
              aria-hidden
            />
            <span className="font-display text-h2 font-bold leading-none text-line-strong transition-colors duration-standard ease-standard group-hover:text-cyan">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-h3 mt-4 text-navy">{p.title[locale]}</h3>
            <p className="text-label mt-2 text-ink-muted">{p.body[locale]}</p>
            <p className="text-label mt-4 border-t border-line pt-4 text-navy">
              <span className="font-semibold text-functional">
                {locale === 'fa' ? 'راه‌حل ما: ' : 'Our solution: '}
              </span>
              {solutions[i]?.[locale]}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
