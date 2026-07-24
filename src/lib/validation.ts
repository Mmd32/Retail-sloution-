import { z } from 'zod';

/**
 * Server-side validation schemas (Zod). Messages are keyed so the client can
 * localize them; the API returns the key, and the form maps it to fa/en copy.
 */

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const leadSchema = z.object({
  type: z.enum([
    'consultation',
    'service-inquiry',
    'assessment',
    'profile-download',
    'resource-download',
    'contact',
    'proposal',
  ]),
  locale: z.enum(['fa', 'en']),
  fullName: z.string().min(2, 'required').max(120),
  company: z.string().min(1, 'required').max(160),
  jobTitle: z.string().max(120).optional().or(z.literal('')),
  mobile: z.string().regex(phoneRegex, 'invalidPhone'),
  email: z.string().email('invalidEmail'),
  industry: z.string().max(80).optional().or(z.literal('')),
  branches: z.string().max(40).optional().or(z.literal('')),
  city: z.string().max(80).optional().or(z.literal('')),
  primaryChallenge: z.string().max(2000).optional().or(z.literal('')),
  preferredContactMethod: z.enum(['phone', 'whatsapp', 'email']).optional(),
  preferredContactTime: z.string().max(120).optional().or(z.literal('')),
  serviceSlug: z.string().max(40).optional().or(z.literal('')),
  consent: z.literal(true, { errorMap: () => ({ message: 'consentRequired' }) }),
  // Assessment payload (optional; attached when type === 'assessment')
  assessmentScore: z.number().min(0).max(100).optional(),
  assessmentLevel: z.string().max(40).optional(),
  // Honeypot — must stay empty.
  website_hp: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
