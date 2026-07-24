'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
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
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-navy text-white' : 'border border-line bg-white text-ink-muted hover:border-accent-300'
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
          <Link
            key={n.slug}
            href={localePath(locale, `/insights/${n.slug}`)}
            className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-accent-300"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded bg-accent-50 px-2 py-1 font-medium text-accent-700">
                {insightTypeLabels[n.type][locale]}
              </span>
              <span className="text-ink-faint">{n.topic[locale]}</span>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-navy group-hover:text-accent-700">{n.title[locale]}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">{n.summary[locale]}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-ink-faint">
              <span>{formatDate(n.publishedAt, locale)}</span>
              <span>{readingTimeLabel(n.readingMinutes, locale)}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-lg border border-line bg-surface-muted p-8 text-center text-ink-muted">
          {locale === 'fa' ? 'محتوایی برای این فیلتر یافت نشد.' : 'No content matches this filter yet.'}
        </p>
      )}
    </div>
  );
}
