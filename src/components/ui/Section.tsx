import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

export function Section({
  children,
  className,
  tone = 'default',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'muted' | 'navy';
  id?: string;
}) {
  /* Light sections alternate white ↔ nude automatically (see `.rs-band` in
     globals.css), so page order alone sets the rhythm. `muted` is kept as an
     alias so existing call sites compile; navy is reserved for the opening
     hero and the closing CTA band. */
  const tones = {
    default: 'rs-band',
    muted: 'rs-band',
    navy: 'bg-navy text-navy-100',
  } as const;
  return (
    <section id={id} className={cn('section-y', tones[tone], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return <span className={cn('eyebrow', onDark && 'text-cyan')}>{children}</span>;
}

/**
 * Section opener. The eyebrow → title → intro spacing comes from the shared
 * rhythm scale so every section on the site opens identically.
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
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={70}>
        <h2 className={cn('text-h2 mt-3', onDark ? 'text-white' : 'text-navy')}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={140}>
          <p className={cn('text-body mt-4', onDark ? 'text-navy-200' : 'text-ink-muted')}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
