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

/** The consequence of each risk, in the same order as `industryProblem`. */
const consequences: { fa: string; en: string }[] = [
  {
    fa: 'سازمان نمی‌تواند بدون حضور آن فرد تصمیم بگیرد یا رشد کند.',
    en: 'The organization cannot decide or grow without that person present.',
  },
  {
    fa: 'تجربه برند در هر شعبه متفاوت می‌شود و قابل تضمین نیست.',
    en: 'The brand experience differs by branch and cannot be guaranteed.',
  },
  {
    fa: 'هر شعبه جدید فشار و آشفتگی را بیشتر می‌کند، نه ظرفیت را.',
    en: 'Each new branch adds strain and disorder rather than capacity.',
  },
  {
    fa: 'خطاهای پرهزینه دیر شناسایی می‌شوند و تکرار می‌شوند.',
    en: 'Costly mistakes are spotted late and then repeated.',
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
                {locale === 'fa' ? 'نتیجه: ' : 'Consequence: '}
              </span>
              {consequences[i]?.[locale]}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
