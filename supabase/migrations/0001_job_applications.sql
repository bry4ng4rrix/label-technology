-- Migration: candidatures reçues depuis le formulaire public "Postuler" (/recru/postuler/[id]).
-- À exécuter une fois dans Supabase (SQL Editor, ou `psql "$DATABASE_URL" -f supabase/migrations/0001_job_applications.sql`).
-- Idempotent : peut être relancée sans erreur si la table existe déjà.

create extension if not exists pgcrypto;

create table if not exists job_applications (
  id           uuid primary key default gen_random_uuid(),
  job_offer_id uuid references job_offers(id) on delete set null,
  job_title    text not null,
  full_name    text not null,
  email        text not null,
  phone        text,
  cv_url       text,
  message      text,
  status       text not null default 'nouveau',
  created_at   timestamptz not null default now()
);

create index if not exists job_applications_job_offer_id_idx on job_applications(job_offer_id);
create index if not exists job_applications_status_idx on job_applications(status);
create index if not exists job_applications_created_at_idx on job_applications(created_at desc);
