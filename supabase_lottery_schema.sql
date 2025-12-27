-- Create table for storing lottery results
create table if not exists public.lottery_results (
  id uuid default uuid_generate_v4() primary key,
  date date not null unique, -- One record per date
  results jsonb not null, -- Stores the full results object { first_prize, last_two, etc }
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.lottery_results enable row level security;

-- Policies
-- 1. Allow everyone (public/anon) to READ results
create policy "Allow public read lottery_results"
on public.lottery_results for select
using (true);

-- 2. Allow service_role (backend/cron) to INSERT/UPDATE
-- Note: Service role automatically bypasses RLS, but if you access via a specific role, ensure it has permissions.
-- We can add a policy for authenticated users if needed, but 'service_role' key is usually used for cron/admin tasks.
