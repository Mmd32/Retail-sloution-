'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/** Opens the browser print dialog, where the page can be saved as a PDF. */
export function PrintButton({ label, onDark }: { label: string; onDark?: boolean }) {
  return (
    <Button
      variant={onDark ? 'onDark' : 'primary'}
      onClick={() => window.print()}
      className="print:hidden"
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  );
}
