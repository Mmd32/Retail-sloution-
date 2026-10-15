import type { Metadata } from 'next';
import { Mail, Linkedin, Phone, Globe } from 'lucide-react';
import { isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/shared/PageHero';
import { LeadForm } from '@/components/forms/LeadForm';
import { contact, finalCta } from '@/content/site';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'fa') as Locale;
  return buildMetadata({
    locale,
    path: '/contact',
    title: locale === 'fa' ? 'تماس با ما' : 'Contact',
    description:
      locale === 'fa'
        ? 'برای درخواست جلسه و گفت‌وگو درباره‌ی تحول سازمانی کسب‌وکار ریتیل خود با ریتیل سلوشنز در ارتباط باشید.'
        : 'Get in touch with Retail Solutions to request a meeting and discuss the organizational transformation of your retail business.',
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'تماس با ما' : 'Contact' }]}
        eyebrow={finalCta.headline[locale]}
        title={locale === 'fa' ? 'درخواست جلسه' : 'Request a Meeting'}
        intro={finalCta.support[locale]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <LeadForm locale={locale} type="consultation" />
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <div className="rounded-card border border-line bg-surface-muted p-8">
              <h2 className="text-h3 text-navy">
                {locale === 'fa' ? 'راه‌های ارتباطی' : 'Ways to reach us'}
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-functional" aria-hidden />
                  <a href={`mailto:${contact.email}`} className="inline-flex min-h-[44px] items-center text-navy transition-colors duration-standard ease-standard hover:text-functional lg:min-h-[24px]" dir="ltr">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-functional" aria-hidden />
                  <a
                    href={`https://${contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-navy transition-colors duration-standard ease-standard hover:text-functional lg:min-h-[24px]"
                    dir="ltr"
                  >
                    {contact.website}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-functional" aria-hidden />
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] min-w-0 items-center break-all text-navy transition-colors duration-standard ease-standard hover:text-functional lg:min-h-[24px]"
                    dir="ltr"
                  >
                    linkedin.com/company/retailsolutions
                  </a>
                </li>
                {contact.phoneEnabled && contact.phone ? (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-functional" aria-hidden />
                    <a href={`tel:${contact.phone}`} className="inline-flex min-h-[44px] items-center text-navy transition-colors duration-standard ease-standard hover:text-functional lg:min-h-[24px]" dir="ltr">
                      {contact.phone}
                    </a>
                  </li>
                ) : (
                  <li className="flex items-center gap-3 text-ink-faint">
                    <Phone className="h-5 w-5" aria-hidden />
                    <span>
                      {locale === 'fa'
                        ? 'شماره تماس رسمی پس از تأیید نهایی نمایش داده می‌شود.'
                        : 'The official phone number will be shown after final confirmation.'}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
