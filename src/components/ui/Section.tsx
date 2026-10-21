import { AlertCircle, Lightbulb, Briefcase, ClipboardCheck, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

export type SectionBarTone = 'challenges' | 'solutions' | 'work' | 'insights' | 'assessment';

const barIcons = {
  challenges: AlertCircle,
  solutions: Lightbulb,
  work: Briefcase,
  assessment: ClipboardCheck,
  insights: BookOpen,
} as const;

/**
 * A page section. Light sections alternate white ↔ fog by position (see
 * `.rs-band`). An optional `bar` adds the colour-coded label strip that pins
 * under the header while this section is on screen; each content type keeps
 * one colour across the site (navy challenges, blue solutions, teal work,
 * violet insights).
 */
export function Section({
  children,
  className,
  tone = 'default',
  id,
  bar,
  compact,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'muted' | 'navy';
  id?: string;
  bar?: { label: string; tone: SectionBarTone };
  /** Tighter vertical padding (homepage). */
  compact?: boolean;
}) {
  const tones = {
    default: 'rs-band',
    muted: 'rs-band',
    navy: 'rs-shell',
  } as const;
  return (
    <section id={id} className={cn(tones[tone], className)}>
      {bar && (
        <div className="rs-section-bar" style={{ backgroundColor: `var(--rs-bar-${bar.tone})` }}>
          <div className="container-x gap-2.5">
            {(() => {
              const Icon = barIcons[bar.tone];
              return <Icon className="h-[18px] w-[18px] opacity-90" strokeWidth={2} aria-hidden />;
            })()}
            {bar.label}
          </div>
        </div>
      )}
      <div className={cn('container-x', compact ? 'section-y-sm' : 'section-y')}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return <span className={cn('eyebrow', onDark && 'eyebrow-on-dark')}>{children}</span>;
}

/**
 * Section opener: optional tag, a light display title, an optional intro.
 * Centred by default on the homepage pattern; inner pages pass `align="start"`.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  onDark,
  align = 'start',
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDark?: boolean;
  align?: 'start' | 'center';
  className?: string;
}) {
  const center = align === 'center';
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className={cn('text-h2', eyebrow && 'mt-3', onDark ? 'text-white' : 'text-ink')}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <p
            className={cn(
              'text-body mt-5 max-w-[42rem]',
              center && 'mx-auto',
              onDark ? 'text-[#C9CED8]' : 'text-ink-muted',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
