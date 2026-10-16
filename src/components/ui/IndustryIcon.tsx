import { Shirt, ShoppingBag, Watch, ShoppingCart, Sparkles, Smartphone, Dumbbell, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  fashion: Shirt,
  'bags-shoes': ShoppingBag,
  'watches-jewelry': Watch,
  fmcg: ShoppingCart,
  beauty: Sparkles,
  electronics: Smartphone,
  sports: Dumbbell,
} as const;

/** A recognisable mark per industry, so the list can be scanned by shape. */
export function IndustryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = icons[slug as keyof typeof icons] ?? Store;
  return (
    <span
      className={cn(
        'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-navy-50 text-functional',
        'transition-[background-color,color,transform] duration-standard ease-standard',
        'group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-functional group-hover:text-white',
        className,
      )}
      aria-hidden
    >
      <Icon className="h-6 w-6" strokeWidth={1.75} />
    </span>
  );
}
