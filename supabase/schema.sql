-- Run this once in the Supabase SQL editor (or via `supabase db execute`) to create the CMS tables.
-- Server-side access only uses the service role key, so no RLS policies are defined here —
-- these tables are never queried directly from the browser.

create extension if not exists pgcrypto;

do $$ begin
  create type tag_kind as enum ('PROJECT', 'JOB');
exception
  when duplicate_object then null;
end $$;

create table services (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  "order"         integer not null default 0,
  tag             text not null,
  headline        text not null,
  headline_accent text not null default '',
  "desc"          text not null,
  items           text[] not null default '{}',
  featured        boolean not null default false,
  badge           text,
  color           text not null,
  icon            text not null,
  image_url       text not null,
  published       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table projects (
  id         uuid primary key default gen_random_uuid(),
  tag        text not null,
  title      text not null,
  "desc"     text not null,
  metrics    text[] not null default '{}',
  "order"    integer not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table job_offers (
  id         uuid primary key default gen_random_uuid(),
  tag        text not null,
  title      text not null,
  contrat    text not null,
  lieu       text not null,
  niveau     text not null,
  "desc"     text not null,
  missions   text[] not null default '{}',
  urgent     boolean not null default false,
  "order"    integer not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  tag          text not null,
  published_at timestamptz not null default now(),
  title        text not null,
  excerpt      text not null,
  body         text,
  readtime     text not null,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table testimonials (
  id             uuid primary key default gen_random_uuid(),
  quote          text not null,
  author         text not null,
  role           text not null,
  company        text not null,
  tag            text,
  color          text,
  gradient_color text,
  context        text not null default 'home',
  "order"        integer not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table tag_meta (
  id     uuid primary key default gen_random_uuid(),
  kind   tag_kind not null,
  name   text not null,
  color  text not null,
  bg     text not null,
  border text not null,
  "order" integer not null default 0,
  unique (kind, name)
);

create table settings (
  id         uuid primary key default gen_random_uuid(),
  key        text unique not null,
  "group"    text not null,
  label      text not null,
  value      jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Candidatures reçues depuis le formulaire public "Postuler" (/recru).
-- job_title est dupliqué (snapshot) pour rester lisible même si l'offre est éditée ou supprimée.
create table job_applications (
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
