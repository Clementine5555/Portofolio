# Supabase Setup Guide

## 1. Buat Supabase Project
- Buka https://supabase.com → New Project
- Simpan password database (nggak perlu dipakai sekarang)

## 2. Buat Tabel `projects`
Buka SQL Editor di dashboard Supabase, jalankan ini:

```sql
create table projects (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  tech_stack  text[],           -- array, contoh: {'SQL','Python','Excel'}
  demo_url    text,
  github_url  text,
  image_url   text,
  emoji       text default '🚀',
  featured    boolean default false,
  created_at  timestamptz default now()
);

-- Allow public read (biar web bisa fetch tanpa login)
alter table projects enable row level security;
create policy "Public read" on projects for select using (true);
```

## 3. Tambah Project
Buka Table Editor → Insert Row → isi data projekmu.

## 4. Isi config.js
```js
const SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```
Credentials ada di: Settings → API → Project URL & anon public key.

## 5. Update Data
Kapanpun mau nambah/edit project, langsung di Supabase Table Editor.
Web otomatis fetch data terbaru.

## 6. Deploy ke GitHub Pages
```bash
git add .
git commit -m "initial portfolio"
git push origin main
```
Lalu di GitHub repo → Settings → Pages → Source: main branch.
**JANGAN push config.js** — sudah diignore otomatis.
