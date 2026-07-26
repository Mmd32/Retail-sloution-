'use client';

/**
 * Analytics abstraction. A single track() call fans out to whichever provider
 * is configured (Plausible, Matomo, GA, or a local no-op). No personally
 * identifiable information is ever sent — only event names and coarse,
 * non-identifying properties.
 */

export type AnalyticsEvent =
  | 'language_selected'
  | 'meeting_cta_clicked'
  | 'consultation_form_started'
  | 'consultation_form_completed'
  | 'assessment_started'
  | 'assessment_step_completed'
  | 'assessment_completed'
  /* Homepage teaser → full assessment handoff (§14) */
  | 'assessment_continued'
  | 'assessment_resumed_from_home'
  | 'service_page_viewed'
  | 'company_profile_downloaded'
  | 'insight_downloaded'
  | 'phone_clicked'
  | 'whatsapp_clicked'
  | 'email_clicked'
  | 'search_used'
  | 'search_result_clicked'
  | 'article_read_depth'
  | 'form_abandonment';

type Props = Record<string, string | number | boolean>;

const PII_KEYS = /name|email|phone|mobile|address|company|brand/i;

function stripPii(props?: Props): Props | undefined {
  if (!props) return undefined;
  const safe: Props = {};
  for (const [k, v] of Object.entries(props)) {
    if (PII_KEYS.test(k)) continue;
    safe[k] = v;
  }
  return safe;
}

export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === 'undefined') return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const safe = stripPii(props);

  try {
    switch (provider) {
      case 'plausible': {
        const p = (window as unknown as { plausible?: (e: string, o?: { props?: Props }) => void }).plausible;
        p?.(event, safe ? { props: safe } : undefined);
        break;
      }
      case 'matomo': {
        const q = ((window as unknown as { _paq?: unknown[] })._paq ||= []);
        (q as unknown[]).push(['trackEvent', 'RetailSolutions', event, JSON.stringify(safe ?? {})]);
        break;
      }
      case 'ga': {
        const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        g?.('event', event, safe);
        break;
      }
      case 'local':
        // Lightweight local option — visible in dev tools, stored nowhere PII-bearing.
        // eslint-disable-next-line no-console
        console.debug('[analytics]', event, safe ?? {});
        break;
      default:
        break; // disabled / no-op
    }
  } catch {
    // Analytics must never break the page.
  }
}
