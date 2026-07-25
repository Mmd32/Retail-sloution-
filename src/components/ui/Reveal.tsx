/**
 * Previously this wrapped every card in a scroll-triggered fade that started at
 * opacity 0. On fast scroll — and for anyone whose JS was still warming up —
 * content read as washed out or missing, and the staggered delays made the page
 * feel sluggish.
 *
 * Motion is now spent in one place only (the hero's load sequence), so this is
 * a plain pass-through: content is always visible and immediately legible.
 * Kept as a component so call sites don't need to change.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  /** Accepted for call-site compatibility; no longer used. */
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
