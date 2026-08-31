-- Ejecutar en el SQL editor de tu proyecto de Supabase.

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  artist_names text[] not null default '{}',
  role text,
  release_year int,
  label text,
  cover_url text,
  spotify_url text,
  apple_music_url text,
  youtube_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists albums_sort_order_idx on public.albums (sort_order);

-- Mantiene updated_at al día en cada cambio.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists albums_set_updated_at on public.albums;
create trigger albums_set_updated_at
  before update on public.albums
  for each row execute function public.set_updated_at();

alter table public.albums enable row level security;

-- Lectura pública solo de discos publicados.
drop policy if exists "Discos publicados son visibles" on public.albums;
create policy "Discos publicados son visibles"
  on public.albums for select
  to anon, authenticated
  using (published = true);

-- El admin autenticado ve, crea, edita y borra todo (incluidos borradores).
drop policy if exists "Admin lee todo" on public.albums;
create policy "Admin lee todo"
  on public.albums for select
  to authenticated
  using (true);

drop policy if exists "Admin inserta" on public.albums;
create policy "Admin inserta"
  on public.albums for insert
  to authenticated
  with check (true);

drop policy if exists "Admin actualiza" on public.albums;
create policy "Admin actualiza"
  on public.albums for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin elimina" on public.albums;
create policy "Admin elimina"
  on public.albums for delete
  to authenticated
  using (true);

-- Bucket público para portadas de disco.
insert into storage.buckets (id, name, public)
values ('album-covers', 'album-covers', true)
on conflict (id) do nothing;

drop policy if exists "Portadas visibles públicamente" on storage.objects;
create policy "Portadas visibles públicamente"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'album-covers');

drop policy if exists "Admin sube portadas" on storage.objects;
create policy "Admin sube portadas"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'album-covers');

drop policy if exists "Admin actualiza portadas" on storage.objects;
create policy "Admin actualiza portadas"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'album-covers');

drop policy if exists "Admin borra portadas" on storage.objects;
create policy "Admin borra portadas"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'album-covers');

-- ============================================================
-- Migración: contenido editable del sitio (Bio de "Sobre mí")
-- Ejecutar también en el SQL editor si ya tenías el esquema de
-- discos creado antes de que existiera esta sección.
-- ============================================================

create table if not exists public.site_content (
  key text primary key,
  content text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_content (key, content)
values ('bio', '')
on conflict (key) do nothing;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Contenido publico visible" on public.site_content;
create policy "Contenido publico visible"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin actualiza contenido" on public.site_content;
create policy "Admin actualiza contenido"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin inserta contenido" on public.site_content;
create policy "Admin inserta contenido"
  on public.site_content for insert
  to authenticated
  with check (true);
