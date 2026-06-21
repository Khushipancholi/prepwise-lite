-- PrepWise AI — Supabase Schema
-- Run this in your Supabase project → SQL Editor → New Query

create table if not exists study_plans (
  id         uuid        primary key default gen_random_uuid(),
  subject    text        not null,
  topics     text        not null,
  exam_date  date        not null,
  plan       text        not null,
  created_at timestamptz default now()
);
