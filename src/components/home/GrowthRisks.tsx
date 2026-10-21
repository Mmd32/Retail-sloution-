import type { Locale } from '@/i18n/config';
import { industryProblem } from '@/content/site';
import { UserCog, Store, TrendingUp, BarChart3, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

/** One icon per risk, in the order of `industryProblem.problems`. */
export const riskIcons = [UserCog, Store, TrendingUp, BarChart3];

/**
 * The four growth risks (§5).
 *
 * Symptom, then response — a 2×2 so each pair has room to be read. These are
 * four parallel risks, not a sequence, so they carry no numbers.
 */

/** How we solve each challenge, in the same order as `industryProblem`. */
const solutions: { fa: string; en: string }[] = [
  {
    fa: 'با هم مشخص می‌کنیم چه تصمیمی با چه کسی باشد، تا کسب‌وکار بدون حضور دائم شما هم درست بچرخد.',
    en: 'Together we work out who decides what, so the business runs well without you in every room.',
  },
  {
    fa: 'استاندارد عملیات، چک‌لیست و مسیر آموزش می‌نویسیم تا مشتری در هر شعبه همان تجربه را داشته باشد.',
    en: 'We write the operating standards, checklists and training paths, so customers get the same experience in every branch.',
  },
  {
    fa: 'قبل از هر قدم توسعه، ساختار و تیم لازم را آماده می‌کنیم تا شعبه جدید به ظرفیت اضافه کند، نه به فشار.',
    en: 'Before each step of expansion we get the structure and team ready, so a new branch adds capacity, not pressure.',
  },
  {
    fa: 'شاخص‌ها، داشبورد مدیریتی و مدل سنجش شعبه را راه می‌اندازیم تا تصمیم‌های بزرگ پشتوانه عددی داشته باشند.',
    en: 'We set up the KPIs, a management dashboard and a branch validation model, so big calls rest on numbers.',
  },
];

export function GrowthRisks({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';
  return (
    <ul className="stack-header grid gap-6 md:grid-cols-2">
      {industryProblem.problems.map((p, i) => (
        <Reveal as="li" key={i} delay={i * 70}>
          <div className="rs-card flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-line hover:shadow-popover md:p-8">
            {(() => {
              const Icon = riskIcons[i] ?? Store;
              return (
                <span className="rs-icon-chip rs-card-icon">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
              );
            })()}
            <h3 className="text-h3 mt-5 text-ink">{p.title[locale]}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{p.body[locale]}</p>
            <div className="mt-6 flex flex-1 gap-3 rounded-card bg-sunken p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0B7A6E]" strokeWidth={2} aria-hidden />
              <div>
                <p className="text-sm font-semibold text-ink">{fa ? 'چطور کمک می‌کنیم' : 'How we help'}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">{solutions[i]?.[locale]}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
