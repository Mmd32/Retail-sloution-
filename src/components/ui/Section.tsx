import { cn } from '@/lib/utils';

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
  const tones = {
    default: 'bg-surface',
    muted: 'bg-surface-muted',
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
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 className={cn('text-h2 mt-3', onDark ? 'text-white' : 'text-navy')}>{title}</h2>
      {intro && (
        <p className={cn('text-body mt-4', onDark ? 'text-navy-200' : 'text-ink-muted')}>{intro}</p>
      )}
    </div>
  );
}
