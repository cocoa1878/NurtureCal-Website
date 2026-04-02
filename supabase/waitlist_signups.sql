create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.waitlist_signups enable row level security;

create or replace function public.set_waitlist_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists waitlist_signups_set_updated_at on public.waitlist_signups;

create trigger waitlist_signups_set_updated_at
before update on public.waitlist_signups
for each row
execute function public.set_waitlist_updated_at();
