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
    <section id={id} className={cn('py-16 md:py-24', tones[tone], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return <span className={cn('eyebrow', onDark && 'text-accent-300')}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  onDark,
  align = 'start',
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDark?: boolean;
  align?: 'start' | 'center';
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 className={cn('mt-4 text-3xl md:text-4xl font-bold', onDark && 'text-white')}>{title}</h2>
      {intro && (
        <p className={cn('mt-5 text-lg leading-relaxed', onDark ? 'text-navy-200' : 'text-ink-muted')}>{intro}</p>
      )}
    </div>
  );
}
