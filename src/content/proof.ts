import type { Localized } from './types';

import { capabilities } from './capabilities';
import { services } from './services';
import { industries } from './industries';
import { phases } from './methodology';

/**
 * Trust layer (§4).
 *
 * Every figure below is counted from the site's own content, so it is always
 * true and updates itself when a solution, industry or stage is added. No
 * engagement counts, branch counts, years of experience or client logos are
 * asserted: none were supplied. Add them here (with real numbers) once they
 * are confirmed, and put real logo files under /public/clients.
 */

export interface ProofMetric {
  key: string;
  label: Localized;
  /** The figure, as a digit string. Null renders as an unfilled slot. */
  value: string | null;
  /** Optional qualifier. */
  note?: Localized;
}

export const proofMetrics: ProofMetric[] = [
  {
    key: 'capabilities',
    label: { fa: 'حوزه تخصصی', en: 'Areas of expertise' },
    value: String(capabilities.length),
  },
  {
    key: 'solutions',
    label: { fa: 'راهکار اختصاصی', en: 'Proprietary solutions' },
    value: String(services.length),
  },
  {
    key: 'industries',
    label: { fa: 'صنعت تحت پوشش', en: 'Industries covered' },
    value: String(industries.length),
  },
  {
    key: 'stages',
    label: { fa: 'مرحله در متدولوژی', en: 'Stages in our methodology' },
    value: String(phases.length),
  },
];

export interface ClientLogo {
  name: string;
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
}

/** Empty until real client logos are supplied. */
export const clientLogos: ClientLogo[] = [];

export const proofMeta = {
  eyebrow: { fa: 'اعتبار', en: 'Credibility' } as Localized,
  clientsLabel: {
    fa: 'برندهایی که با آن‌ها کار کرده‌ایم',
    en: 'Brands we have worked with',
  } as Localized,
};
