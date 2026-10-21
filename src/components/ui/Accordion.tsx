'use client';

import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Accessible FAQ accordion: button-based headers, aria-expanded, region panels. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start text-h3 text-ink transition-colors hover:text-functional"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-functional" aria-hidden />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6 text-ink-muted leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
