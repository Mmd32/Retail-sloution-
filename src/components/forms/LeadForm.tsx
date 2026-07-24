'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { u, type UiKey } from '@/content/ui';
import { industries } from '@/content/industries';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

export type LeadFormType =
  | 'consultation'
  | 'service-inquiry'
  | 'assessment'
  | 'contact'
  | 'proposal';

interface Props {
  locale: Locale;
  type: LeadFormType;
  serviceSlug?: string;
  assessment?: { score: number; level: string };
  compact?: boolean;
}

const errorKeyMap: Record<string, UiKey> = {
  required: 'required',
  invalidEmail: 'invalidEmail',
  invalidPhone: 'invalidPhone',
  consentRequired: 'consentRequired',
};

export function LeadForm({ locale, type, serviceSlug, assessment, compact }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);

  function onFirstInteract() {
    if (!started) {
      setStarted(true);
      track('consultation_form_started', { formType: type });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      type,
      locale,
      fullName: String(fd.get('fullName') || ''),
      company: String(fd.get('company') || ''),
      jobTitle: String(fd.get('jobTitle') || ''),
      mobile: String(fd.get('mobile') || ''),
      email: String(fd.get('email') || ''),
      industry: String(fd.get('industry') || ''),
      branches: String(fd.get('branches') || ''),
      city: String(fd.get('city') || ''),
      primaryChallenge: String(fd.get('primaryChallenge') || ''),
      preferredContactMethod: (String(fd.get('preferredContactMethod') || 'phone') || undefined) as
        | 'phone'
        | 'whatsapp'
        | 'email',
      preferredContactTime: String(fd.get('preferredContactTime') || ''),
      serviceSlug: serviceSlug || '',
      consent: fd.get('consent') === 'on',
      website_hp: String(fd.get('website_hp') || ''),
      ...(assessment ? { assessmentScore: assessment.score, assessmentLevel: assessment.level } : {}),
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        track('consultation_form_completed', { formType: type });
      } else {
        setStatus('error');
        if (data.fieldErrors) setErrors(data.fieldErrors);
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-accent-200 bg-accent-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent-600" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-navy">{u('formSuccessTitle', locale)}</h3>
        <p className="mt-2 text-ink-muted">{u('formSuccessBody', locale)}</p>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{u(errorKeyMap[errors[name]] ?? 'required', locale)}</p>
    ) : null;

  const label = 'mb-1.5 block text-sm font-medium text-navy';
  const input =
    'w-full rounded border border-line bg-white px-3.5 h-11 text-navy outline-none transition-colors focus:border-accent-400';
  const optional = <span className="text-ink-faint">{` ${u('optional', locale)}`}</span>;

  return (
    <form onSubmit={onSubmit} onChange={onFirstInteract} noValidate className="space-y-5" aria-describedby="lead-status">
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="fullName" className={label}>{u('fullName', locale)}</label>
          <input id="fullName" name="fullName" required className={input} autoComplete="name" />
          {err('fullName')}
        </div>
        <div>
          <label htmlFor="company" className={label}>{u('companyBrand', locale)}</label>
          <input id="company" name="company" required className={input} autoComplete="organization" />
          {err('company')}
        </div>
        <div>
          <label htmlFor="jobTitle" className={label}>{u('jobTitle', locale)}{optional}</label>
          <input id="jobTitle" name="jobTitle" className={input} autoComplete="organization-title" />
        </div>
        <div>
          <label htmlFor="mobile" className={label}>{u('mobile', locale)}</label>
          <input id="mobile" name="mobile" required inputMode="tel" dir="ltr" className={input} autoComplete="tel" />
          {err('mobile')}
        </div>
        <div>
          <label htmlFor="email" className={label}>{u('email', locale)}</label>
          <input id="email" name="email" required type="email" dir="ltr" className={input} autoComplete="email" />
          {err('email')}
        </div>
        <div>
          <label htmlFor="industry" className={label}>{u('industry', locale)}{optional}</label>
          <select id="industry" name="industry" className={input} defaultValue="">
            <option value="">{u('selectPlaceholder', locale)}</option>
            {industries.map((i) => (
              <option key={i.slug} value={i.name.en}>{i.name[locale]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="branches" className={label}>{u('branches', locale)}{optional}</label>
          <input id="branches" name="branches" inputMode="numeric" className={input} />
        </div>
        <div>
          <label htmlFor="city" className={label}>{u('city', locale)}{optional}</label>
          <input id="city" name="city" className={input} autoComplete="address-level2" />
        </div>
        <div>
          <label htmlFor="preferredContactMethod" className={label}>{u('preferredContactMethod', locale)}{optional}</label>
          <select id="preferredContactMethod" name="preferredContactMethod" className={input} defaultValue="phone">
            <option value="phone">{u('contactMethodPhone', locale)}</option>
            <option value="whatsapp">{u('contactMethodWhatsapp', locale)}</option>
            <option value="email">{u('contactMethodEmail', locale)}</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredContactTime" className={label}>{u('preferredContactTime', locale)}{optional}</label>
          <input id="preferredContactTime" name="preferredContactTime" className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="primaryChallenge" className={label}>{u('primaryChallenge', locale)}{optional}</label>
        <textarea id="primaryChallenge" name="primaryChallenge" rows={4} className={`${input} h-auto py-3`} />
      </div>

      <div className="flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-accent-600" />
        <label htmlFor="consent" className="text-sm text-ink-muted">{u('consent', locale)}</label>
      </div>
      {err('consent')}

      <div id="lead-status" aria-live="polite">
        {status === 'error' && <p className="text-sm text-red-600">{u('formError', locale)}</p>}
      </div>

      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? u('submitting', locale) : u('submit', locale)}
      </Button>
    </form>
  );
}
