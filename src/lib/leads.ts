import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { LeadInput } from './validation';

/**
 * Lead integration abstraction.
 *
 * Design goal (per spec): no hard-coded foreign SaaS dependency that may be
 * inaccessible in Iran. Every outbound channel is optional and best-effort;
 * a local JSON fallback ALWAYS records the lead so nothing is lost. Each
 * channel is enabled purely by presence of its env var.
 */

export interface StoredLead extends LeadInput {
  id: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'leads.json');

async function saveLocal(lead: StoredLead): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: StoredLead[] = [];
  try {
    existing = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
  } catch {
    existing = [];
  }
  existing.push(lead);
  await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

async function notifyTelegram(lead: StoredLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const text = [
    `🆕 New lead (${lead.type})`,
    `Name: ${lead.fullName}`,
    `Company: ${lead.company}`,
    `Mobile: ${lead.mobile}`,
    `Email: ${lead.email}`,
    lead.industry ? `Industry: ${lead.industry}` : '',
    lead.assessmentScore != null ? `Assessment: ${lead.assessmentScore} (${lead.assessmentLevel})` : '',
  ]
    .filter(Boolean)
    .join('\n');
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});
}

async function forwardWebhook(url: string | undefined, lead: StoredLead): Promise<void> {
  if (!url) return;
  await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch(() => {});
}

/**
 * Persist a validated lead across all configured channels. The local file
 * store is the source of truth; remote channels are fire-and-forget so an
 * unreachable service can never fail the submission.
 */
export async function persistLead(input: LeadInput): Promise<StoredLead> {
  const lead: StoredLead = {
    ...input,
    id: cryptoRandomId(),
    createdAt: new Date().toISOString(),
  };

  // Source-of-truth local store (always).
  await saveLocal(lead);

  // Best-effort integrations (any subset).
  await Promise.allSettled([
    notifyTelegram(lead),
    forwardWebhook(process.env.CRM_WEBHOOK_URL, lead),
    forwardWebhook(process.env.GOOGLE_SHEETS_WEBHOOK_URL, lead),
  ]);

  return lead;
}

function cryptoRandomId(): string {
  // Avoid importing uuid; crypto is available in the Node runtime.
  return 'lead_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
