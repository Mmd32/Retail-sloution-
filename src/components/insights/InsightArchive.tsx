'use client';

import { useMemo, useState } from 'react';
import { InsightCard } from '@/components/insights/InsightCard';
import type { Locale } from '@/i18n/config';
import { insights, insightTypeLabels, getActiveTopics } from '@/content/insights';
import { localePath, formatDate, readingTimeLabel } from '@/lib/utils';
import { u } from '@/content/ui';

export function InsightArchive({
  locale,
  initialTopic,
  initialType,
}: {
  locale: Locale;
  initialTopic?: string;
  initialType?: string;
}) {
  const [topic, setTopic] = useState<string | null>(initialTopic ?? null);
  const [type, setType] = useState<string | null>(initialType ?? null);

  const topics = getActiveTopics();

  const filtered = useMemo(
    () =>
      insights.filter((i) => (topic ? i.topic.en === topic : true) && (type ? i.type === type : true)),
    [topic, type],
  );

  const chip = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-full px-5 text-label font-medium transition-colors duration-standard ease-standard ${
      active ? 'bg-navy text-white' : 'border border-line bg-white text-ink-muted hover:border-cyan-300'
    }`;

  return (
    <div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setTopic(null)} className={chip(topic === null)}>
            {u('allTopics', locale)}
          </button>
          {topics.map((topicItem) => (
            <button
              key={topicItem.key}
              onClick={() => setTopic(topicItem.label.en)}
              className={chip(topic === topicItem.label.en)}
            >
              {topicItem.label[locale]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setType(null)} className={chip(type === null)}>
            {u('allTypes', locale)}
          </button>
          {Object.entries(insightTypeLabels).map(([key, label]) => (
            <button key={key} onClick={() => setType(key)} className={chip(type === key)}>
              {label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <InsightCard key={n.slug} insight={n} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-card border border-line bg-surface-muted p-8 text-center text-ink-muted">
          {locale === 'fa' ? 'محتوایی برای این فیلتر یافت نشد.' : 'No content matches this filter yet.'}
        </p>
      )}
    </div>
  );
}
