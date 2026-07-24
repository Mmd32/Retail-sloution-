# Database Schema (PostgreSQL)

The site ships with a file-based lead fallback so it runs with no database. For production durability, use this schema and swap `saveLocal()` in `src/lib/leads.ts` for an insert. The public content model (services, capabilities, industries, insights, team, legal, assessment) is designed to move into a headless CMS; the tables below cover **leads and assessment submissions**, plus a reference shape for CMS-managed content.

```sql
-- Leads captured from every form (consultation, service-inquiry, assessment, …)
CREATE TABLE leads (
  id                       TEXT PRIMARY KEY,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  type                     TEXT NOT NULL,
  locale                   TEXT NOT NULL CHECK (locale IN ('fa','en')),
  full_name                TEXT NOT NULL,
  company                  TEXT NOT NULL,
  job_title                TEXT,
  mobile                   TEXT NOT NULL,
  email                    TEXT NOT NULL,
  industry                 TEXT,
  branches                 TEXT,
  city                     TEXT,
  primary_challenge        TEXT,
  preferred_contact_method TEXT,
  preferred_contact_time   TEXT,
  service_slug             TEXT,
  assessment_score         INT,
  assessment_level         TEXT,
  consent                  BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX leads_type_idx       ON leads (type);

-- Optional: full per-dimension assessment detail (1 row per submission)
CREATE TABLE assessment_submissions (
  id           TEXT PRIMARY KEY,
  lead_id      TEXT REFERENCES leads(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  overall      INT NOT NULL,
  level        TEXT NOT NULL,
  dimensions   JSONB NOT NULL   -- { "owner-dependency": 40, ... }
);

-- Reference shape for CMS-managed bilingual content (if you build the CMS in Postgres)
CREATE TABLE content_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type   TEXT NOT NULL,             -- service | capability | industry | insight | ...
  slug_fa        TEXT, slug_en TEXT,
  fields         JSONB NOT NULL,            -- localized fields: { "title": {"fa":"","en":""}, ... }
  publication    TEXT NOT NULL DEFAULT 'draft',      -- draft|in_review|approved|published|archived
  translation    TEXT NOT NULL DEFAULT 'translation_incomplete', -- fa_approved|en_approved|translation_incomplete
  display_order  INT DEFAULT 0,
  active         BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);
```

Team-member and service field lists are documented in the spec and mirrored in `src/content/types.ts`.
