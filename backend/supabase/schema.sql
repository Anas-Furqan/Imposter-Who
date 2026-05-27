create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username text unique not null,
  password text not null,
  is_email_verified boolean default false,
  email_verify_token text,
  email_verify_expiry timestamptz,
  password_reset_token text,
  password_reset_expiry timestamptz,
  refresh_token text,
  avatar text default 'default',
  xp integer default 0,
  games_played integer default 0,
  games_won integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists custom_word_packs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text default '🎮',
  words text[] not null,
  is_public boolean default false,
  play_count integer default 0,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists game_histories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  mode text not null,
  pack_name text not null,
  was_impostor boolean not null,
  won boolean not null,
  player_count integer not null,
  xp_earned integer default 0,
  created_at timestamptz default now()
  
create table if not exists word_packs (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  emoji text not null,
  category text not null,
  words text[] not null,
  is_active boolean default true
);
