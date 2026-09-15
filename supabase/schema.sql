-- Kairo MicroCRM — run in Supabase SQL Editor

create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('admin', 'sales', 'accounting');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_status as enum ('new', 'contacted', 'qualified', 'unqualified', 'converted');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.deal_stage as enum ('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'void');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.user_role not null default 'sales',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  role text,
  interest text not null default 'full-platform',
  message text not null default '',
  source text not null default 'website',
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  value_cents integer not null default 0,
  currency text not null default 'usd',
  stage public.deal_stage not null default 'lead',
  lead_id uuid references public.leads(id) on delete set null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  expected_close date,
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  customer_name text not null,
  customer_email text not null,
  company text,
  amount_cents integer not null,
  currency text not null default 'usd',
  status public.invoice_status not null default 'draft',
  deal_id uuid references public.deals(id) on delete set null,
  created_by uuid not null references public.profiles(id) on delete cascade,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  due_date date,
  line_items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_assigned_idx on public.leads(assigned_to);
create index if not exists deals_owner_idx on public.deals(owner_id);
create index if not exists deals_stage_idx on public.deals(stage);
create index if not exists invoices_status_idx on public.invoices(status);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.invoices enable row level security;

create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'sales')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.current_role() = 'admin');

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (auth.uid() = id or public.current_role() = 'admin');

drop policy if exists "leads_admin_all" on public.leads;
create policy "leads_admin_all"
  on public.leads for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

drop policy if exists "leads_sales_select" on public.leads;
create policy "leads_sales_select"
  on public.leads for select
  using (
    public.current_role() = 'sales'
    and (assigned_to = auth.uid() or assigned_to is null)
  );

drop policy if exists "leads_sales_update_assigned" on public.leads;
create policy "leads_sales_update_assigned"
  on public.leads for update
  using (public.current_role() = 'sales' and assigned_to = auth.uid());

drop policy if exists "leads_sales_insert" on public.leads;
create policy "leads_sales_insert"
  on public.leads for insert
  with check (public.current_role() in ('admin', 'sales'));

drop policy if exists "leads_accounting_select" on public.leads;
create policy "leads_accounting_select"
  on public.leads for select
  using (public.current_role() = 'accounting');

drop policy if exists "deals_admin_all" on public.deals;
create policy "deals_admin_all"
  on public.deals for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

drop policy if exists "deals_sales_own" on public.deals;
create policy "deals_sales_own"
  on public.deals for all
  using (public.current_role() = 'sales' and owner_id = auth.uid())
  with check (public.current_role() = 'sales' and owner_id = auth.uid());

drop policy if exists "deals_accounting_select" on public.deals;
create policy "deals_accounting_select"
  on public.deals for select
  using (public.current_role() = 'accounting');

drop policy if exists "invoices_admin_all" on public.invoices;
create policy "invoices_admin_all"
  on public.invoices for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

drop policy if exists "invoices_accounting_all" on public.invoices;
create policy "invoices_accounting_all"
  on public.invoices for all
  using (public.current_role() = 'accounting')
  with check (public.current_role() = 'accounting');

drop policy if exists "invoices_sales_select_related" on public.invoices;
create policy "invoices_sales_select_related"
  on public.invoices for select
  using (
    public.current_role() = 'sales'
    and deal_id in (select id from public.deals where owner_id = auth.uid())
  );
