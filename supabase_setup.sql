-- ═══════════════════════════════════════════════════════
-- PORTFOLIO SUPABASE SETUP
-- Jalankan ini di Supabase → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════

-- 1. Buat tabel projects
create table if not exists projects (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  tech_stack  text[],
  demo_url    text,
  github_url  text,
  image_url   text,
  emoji       text default '🚀',
  featured    boolean default false,
  created_at  timestamptz default now()
);

-- 2. Row Level Security — biar website bisa fetch tanpa login
alter table projects enable row level security;

create policy "Public read" on projects
  for select using (true);

-- 3. Seed data — 3 project awal
insert into projects (title, description, tech_stack, demo_url, github_url, emoji, featured) values
(
  'DeFi Analyst Course',
  'AI-powered 6-phase self-learning course: AMM mechanics, impermanent loss, lending/borrowing, staking, stablecoin types, dan DeFi risk taxonomy.',
  array['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
  'https://clementine5555.github.io/DeFi-Analyst-Course---fase-0/',
  'https://github.com/Clementine5555/DeFi-Analyst-Course---fase-0',
  '📊',
  true
),
(
  'CODE FEST — Event Documentation',
  'Dokumentasi lengkap kepanitiaan kompetisi IT nasional: rundown, RAB, Gantt timeline, guidebook, dan TOR untuk Final Day & Awarding Day.',
  array['Microsoft Word', 'Excel', 'Event Management'],
  null,
  null,
  '🎯',
  false
),
(
  'Financial Data Portfolio',
  'Kumpulan SQL queries, Excel models, dan data visualizations untuk analisis finansial dan pasar.',
  array['SQL', 'Excel', 'Python', 'Data Analysis'],
  null,
  'https://github.com/Clementine5555',
  '💹',
  false
);

-- ═══════════════════════════════════════════════════════
-- CARA NAMBAH / EDIT PROJECT:
-- Buka Supabase → Table Editor → Tabel "projects"
-- Klik Insert Row → isi kolom → Save
--
-- Kolom yang tersedia:
--   title        → nama project
--   description  → deskripsi singkat
--   tech_stack   → array, contoh: {'SQL','Python'}
--   demo_url     → link live demo (boleh null)
--   github_url   → link repo GitHub (boleh null)
--   image_url    → link gambar thumbnail (boleh null)
--   emoji        → emoji placeholder kalau gak ada gambar
--   featured     → true = tampil paling atas
-- ═══════════════════════════════════════════════════════
