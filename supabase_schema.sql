-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Blog Posts Table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  content jsonb default '[]'::jsonb, -- Stores block editor JSON
  status text check (status in ('draft', 'published')) default 'draft',
  
  -- SEO Fields
  seo_title text,
  seo_description text,
  featured_image text,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- 2. Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- 3. Policies
-- Public Access: Allow everyone to READ published posts
create policy "Allow public read published posts"
on public.posts for select
using (status = 'published');

-- Admin Access: Allow authenticated admins to do everything
-- (Assuming you use Supabase auth, otherwise use a service role key in code)
create policy "Allow admin full access"
on public.posts for all
using (auth.role() = 'authenticated');

-- 4. Create Index for faster slug lookup
create index posts_slug_idx on public.posts (slug);
create index posts_status_idx on public.posts (status);
