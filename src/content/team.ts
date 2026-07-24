import type { TeamMember } from './types';

/**
 * Team members from the company profile.
 *
 * IMPORTANT (per profile rules):
 *  - English spellings must be confirmed via CMS before final publication.
 *  - No qualifications, years of experience, employers, project history,
 *    awards, or biographies are invented here.
 *  - Portraits are intentionally left undefined. The UI renders an initials
 *    monogram placeholder rather than a generic stock portrait. Supply
 *    high-resolution portraits via the CMS before launch.
 */
export const team: TeamMember[] = [
  {
    slug: 'nima-zoghi',
    name: { fa: 'نیما ذوقی', en: 'Nima Zoghi' },
    role: { fa: 'استراتژی و برندینگ', en: 'Strategy & Branding' },
    active: true,
    order: 1,
  },
  {
    slug: 'sorena-keyhani',
    name: { fa: 'سورنا کیهانی', en: 'Sorena Keyhani' },
    role: { fa: 'توسعه سرمایه انسانی', en: 'Human Capital Development' },
    active: true,
    order: 2,
  },
  {
    slug: 'niloofar-mahouti',
    name: { fa: 'نیلوفر ماهوتی', en: 'Niloofar Mahouti' },
    role: { fa: 'توسعه فروشگاه‌ها', en: 'Store Development' },
    active: true,
    order: 3,
  },
  {
    slug: 'saeed-jamali',
    name: { fa: 'سعید جمالی', en: 'Saeed Jamali' },
    role: { fa: 'مدیریت عملیات', en: 'Operations Management' },
    active: true,
    order: 4,
  },
];

export const teamIntro = {
  eyebrow: { fa: 'تیم', en: 'Team' },
  title: { fa: 'تیم ریتیل سلوشنز', en: 'The Retail Solutions Team' },
  intro: {
    fa: 'تیمی چندتخصصی از استراتژی و برندینگ تا عملیات، سرمایه انسانی و توسعه‌ی فروشگاه‌ها؛ با نگاهی سیستمی به تحول سازمان‌های ریتیل.',
    en: 'A multidisciplinary team spanning strategy and branding, operations, human capital, and store development — with a systems view of retail transformation.',
  },
};
