-- =====================================================================
-- MedRo — Supabase schema  (tables + Row Level Security + triggers + RPC)
-- شغّل هذا الملف كاملًا مرة واحدة في: Supabase Dashboard → SQL Editor → New query → Run
-- آمن لإعادة التشغيل (idempotent) في أغلب أجزائه.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1) الجداول
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id        uuid primary key references auth.users(id) on delete cascade,
  name      jsonb   not null default '""'::jsonb,
  role      text    not null default 'user' check (role in ('user','admin')),
  title     text    not null default 'member',
  spec      text    not null default 'general',
  place     jsonb   not null default '""'::jsonb,
  city      jsonb   not null default '""'::jsonb,
  bio       jsonb   not null default '""'::jsonb,
  banned    boolean not null default false,
  verified  boolean not null default false,
  avatar    text    check (avatar is null or length(avatar) <= 600),   -- رابط الصورة الشخصية (Storage)
  joined    bigint  not null default (extract(epoch from now()) * 1000)::bigint
);

-- البريد الإلكتروني: يراه صاحبه والأدمن فقط
create table if not exists public.profiles_private (
  id    uuid primary key references public.profiles(id) on delete cascade,
  email text not null
);

-- طلبات التوثيق (فيها رقم الترخيص: خاصة بصاحبها والأدمن)
create table if not exists public.verification_requests (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  data    jsonb not null
);

-- السجل الطبي: خاص بصاحبه فقط (حتى الأدمن لا يقرؤه)
create table if not exists public.medical_records (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  data    jsonb not null default '{}'::jsonb
);

create table if not exists public.groups (
  id        text primary key,
  kind      text check (kind is null or kind = 'uni'),
  verified  boolean not null default false,
  name      jsonb not null,
  descr     jsonb not null default '""'::jsonb,
  cat       text,
  owner     uuid references public.profiles(id) on delete set null,
  mod_uid   uuid references public.profiles(id) on delete set null,
  ts        bigint not null default (extract(epoch from now()) * 1000)::bigint
);

create table if not exists public.group_members (
  group_id text not null references public.groups(id) on delete cascade,
  user_id  uuid not null references public.profiles(id) on delete cascade,
  primary key (group_id, user_id)
);

create table if not exists public.group_requests (
  group_id text not null references public.groups(id) on delete cascade,
  user_id  uuid not null references public.profiles(id) on delete cascade,
  primary key (group_id, user_id)
);

create table if not exists public.posts (
  id        text primary key,
  uid       uuid not null references public.profiles(id) on delete cascade,
  tag       text not null default 'disc',
  text      jsonb not null,
  ts        bigint not null default (extract(epoch from now()) * 1000)::bigint,
  group_id  text references public.groups(id) on delete cascade,
  shared    text references public.posts(id) on delete set null,
  images    jsonb not null default '[]'::jsonb
            check (jsonb_typeof(images) = 'array' and jsonb_array_length(images) <= 4)   -- روابط صور المنشور (حد أقصى 4)
);
create index if not exists posts_ts_idx on public.posts (ts desc);
create index if not exists posts_group_idx on public.posts (group_id);

create table if not exists public.post_likes (
  post_id text not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

create table if not exists public.comments (
  id      text primary key,
  post_id text not null references public.posts(id) on delete cascade,
  uid     uuid not null references public.profiles(id) on delete cascade,
  text    jsonb not null,
  ts      bigint not null default (extract(epoch from now()) * 1000)::bigint
);
create index if not exists comments_post_idx on public.comments (post_id);

create table if not exists public.saved_posts (
  user_id uuid not null references public.profiles(id) on delete cascade,
  post_id text not null references public.posts(id) on delete cascade,
  primary key (user_id, post_id)
);

create table if not exists public.jobs (
  id      text primary key,
  title   jsonb not null,
  org     jsonb not null,
  city    jsonb not null default '""'::jsonb,
  spec    text,
  type    text,
  descr   jsonb not null default '""'::jsonb,
  ts      bigint not null default (extract(epoch from now()) * 1000)::bigint,
  by_uid  uuid references public.profiles(id) on delete set null
);

create table if not exists public.job_applicants (
  job_id  text not null references public.jobs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (job_id, user_id)
);

create table if not exists public.job_saved (
  job_id  text not null references public.jobs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (job_id, user_id)
);

create table if not exists public.ads (
  id         text primary key,
  title      jsonb not null,
  body       jsonb not null default '""'::jsonb,
  cta        jsonb not null default '""'::jsonb,
  advertiser jsonb not null default '""'::jsonb,
  url        text  not null,
  tone       int   not null default 0,
  active     boolean not null default true,
  views      bigint not null default 0,
  clicks     bigint not null default 0,
  ts         bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- إعلانات الأنشطة التجارية: المالك + الحالة + سقف المشاهدات المشتراة (0 = بلا سقف، لإعلانات الأدمن)
alter table public.ads add column if not exists owner  uuid references public.profiles(id) on delete cascade;
alter table public.ads add column if not exists status text   not null default 'live';
alter table public.ads add column if not exists cap    bigint not null default 0;
do $$ begin
  alter table public.ads add constraint ads_status_chk check (status in ('pending','live','paused','rejected','finished'));
exception when duplicate_object then null; end $$;

create table if not exists public.reports (
  id       text primary key,
  post_id  text not null,
  by_uid   text not null,                 -- uuid المبلّغ أو 'ai'
  reason   text,
  note     text,
  ts       bigint not null default (extract(epoch from now()) * 1000)::bigint,
  status   text not null default 'open',
  source   text not null default 'user'
);

-- حظر المستخدمين: صف واحد لكل حظر؛ لا يراه إلا الحاظر (المحظور لا يعرف بالحظر)
create table if not exists public.user_blocks (
  blocker uuid not null references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  ts      bigint not null default (extract(epoch from now()) * 1000)::bigint,
  primary key (blocker, blocked),
  check (blocker <> blocked)
);
create index if not exists user_blocks_blocked_idx on public.user_blocks (blocked);

create table if not exists public.friendships (
  a      uuid not null references public.profiles(id) on delete cascade,
  b      uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  ts     bigint not null default (extract(epoch from now()) * 1000)::bigint,
  primary key (a, b),
  check (a <> b)
);

create table if not exists public.notifications (
  id       text primary key,
  to_uid   uuid not null references public.profiles(id) on delete cascade,
  from_uid uuid not null references public.profiles(id) on delete cascade,
  type     text not null,
  ref      text not null default '',
  ts       bigint not null default (extract(epoch from now()) * 1000)::bigint,
  read     boolean not null default false
);
create index if not exists notifications_to_idx on public.notifications (to_uid, ts desc);

-- إعدادات الموقع (نصوص الصفحة الرئيسية، الشريط، مفاتيح المزايا، نصائح اليوم)
create table if not exists public.site_settings (
  key   text primary key,
  value jsonb not null default '{}'::jsonb
);

-- عدّاد استخدام الذكاء الاصطناعي (تستخدمه Edge Function فقط)
create table if not exists public.ai_usage (
  user_id uuid not null,
  day     date not null default current_date,
  n       int  not null default 0,
  primary key (user_id, day)
);

insert into public.site_settings(key, value) values
  ('site', '{"texts":{},"banner":{"on":false,"ar":"","en":"","tone":"info"},"toggles":{"ai":true,"jobs":true,"ads":true,"signup":true,"userGroups":true}}'::jsonb),
  ('settings', '{"autoRemove":false}'::jsonb)
on conflict (key) do nothing;


-- ---------------------------------------------------------------------
-- 1-ب) التشخيص الأونلاين (للاستفسارات الطبية)
--   ملفات الهوية/الصورة الحية/إثبات الدفع في حاوية خاصة اسمها private (انظر storage.sql)
-- ---------------------------------------------------------------------
-- طلبات الأطباء (بيانات حساسة: صاحبها والأدمن فقط)
create table if not exists public.doctor_applications (
  id          text primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null check (length(name) between 3 and 120),
  age         int  not null check (age between 21 and 90),
  phone       text not null check (length(phone) between 7 and 20),
  university  text not null check (length(university) between 2 and 120),
  license_no  text not null check (length(license_no) between 2 and 40),
  spec        text not null check (length(spec) between 1 and 40),
  id_photo    text not null default '' check (length(id_photo) <= 300),   -- مسار داخل الحاوية private
  selfie      text not null default '' check (length(selfie) <= 300),
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  note        text not null default '' check (length(note) <= 500),
  ts          bigint not null default (extract(epoch from now()) * 1000)::bigint,
  reviewed_ts bigint
);
create unique index if not exists doctor_apps_one_pending on public.doctor_applications (user_id) where status = 'pending';

-- الأطباء المعتمدون (يُنشأ الصف فقط عند موافقة الأدمن)
create table if not exists public.doctors (
  user_id   uuid primary key references public.profiles(id) on delete cascade,
  spec      text not null,
  bio       jsonb not null default '""'::jsonb,
  fee       int  not null default 0 check (fee >= 0),            -- سعر الكشف بالجنيه (يحدده الطبيب)
  active    boolean not null default false,                      -- نشط / غير نشط (يظهر للمريض)
  suspended boolean not null default false,                      -- إيقاف من الأدمن
  hours     jsonb not null default '{}'::jsonb,                  -- {"0":[["18:00","22:00"]],...}  0=الأحد بتوقيت القاهرة
  ts        bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- وسيلة استلام الطبيب لمستحقاته (خاصة: الطبيب والأدمن)
create table if not exists public.doctor_payout (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  method  text not null check (method in ('vodafone','instapay')),
  handle  text not null check (length(handle) between 4 and 60)
);

-- الحجوزات والمدفوعات (تُكتب عبر دوال RPC فقط؛ لا كتابة مباشرة من العميل)
create table if not exists public.consult_bookings (
  id            text primary key,
  patient       uuid references public.profiles(id) on delete set null,
  doctor        uuid references public.profiles(id) on delete set null,
  start_ts      bigint not null,
  dur_min       int    not null,
  fee           int    not null,
  commission    int    not null,
  net           int    not null,
  status        text   not null default 'held'
                check (status in ('held','awaiting','confirmed','completed','cancelled','expired')),
  pay_method    text   check (pay_method in ('vodafone','instapay')),
  pay_ref       text   not null default '',
  pay_proof     text   not null default '',
  admin_note    text   not null default '',
  hold_until    bigint not null default 0,
  created_ts    bigint not null default (extract(epoch from now()) * 1000)::bigint,
  paid_ts       bigint,
  confirmed_ts  bigint,
  completed_ts  bigint,
  cancelled_by  text,
  refund_status text   not null default 'none' check (refund_status in ('none','due','done')),
  refund_ref    text   not null default '',
  payout_status text   not null default 'none' check (payout_status in ('none','due','paid')),
  payout_ts     bigint,
  payout_ref    text   not null default ''
);
create index if not exists consult_b_doctor_idx  on public.consult_bookings (doctor, start_ts);
create index if not exists consult_b_patient_idx on public.consult_bookings (patient, start_ts);

-- محتوى الاستشارة الطبي (المريض والطبيب فقط — حتى الأدمن لا يقرؤه)
create table if not exists public.consult_content (
  booking_id text primary key references public.consult_bookings(id) on delete cascade,
  complaint  text not null default '' check (length(complaint) <= 1500),
  diagnosis  text not null default '' check (length(diagnosis) <= 3000),
  meet_link  text not null default '' check (length(meet_link) <= 300)
);

create table if not exists public.consult_messages (
  id         text primary key,
  booking_id text not null references public.consult_bookings(id) on delete cascade,
  from_uid   uuid not null references public.profiles(id) on delete cascade,
  text       text not null check (length(text) between 1 and 1000),
  ts         bigint not null default (extract(epoch from now()) * 1000)::bigint
);
create index if not exists consult_m_idx on public.consult_messages (booking_id, ts);

create table if not exists public.consult_reviews (
  booking_id text primary key references public.consult_bookings(id) on delete cascade,
  doctor     uuid not null references public.profiles(id) on delete cascade,
  patient    uuid references public.profiles(id) on delete set null,
  stars      int  not null check (stars between 1 and 5),
  comment    text not null default '' check (length(comment) <= 500),
  hidden     boolean not null default false,
  ts         bigint not null default (extract(epoch from now()) * 1000)::bigint
);
create index if not exists consult_r_doctor_idx on public.consult_reviews (doctor);

-- متوسط التقييم (مجمّع فقط، بدون كشف المراجعات المخفية)
create or replace view public.doctor_ratings as
  select doctor, count(*)::int as n, sum(stars)::int as s
  from public.consult_reviews where not hidden group by doctor;

-- ---------------------------------------------------------------------
-- 2) دوال مساعدة للصلاحيات (security definer حتى لا تحدث حلقات في RLS)
-- ---------------------------------------------------------------------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and not banned)
$$;

create or replace function public.not_banned() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and not banned)
$$;

create or replace function public.is_member(gid text) returns boolean
language sql stable security definer set search_path = public as $$
  select gid is not null and exists (select 1 from public.group_members where group_id = gid and user_id = auth.uid())
$$;

create or replace function public.is_mod(gid text) returns boolean
language sql stable security definer set search_path = public as $$
  select gid is not null and exists (select 1 from public.groups where id = gid and mod_uid = auth.uid())
$$;

-- هل بين المستخدمين حظر (في أي اتجاه)؟ security definer كي يعمل للطرفين دون كشف من حظر من
create or replace function public.blocked_between(a uuid, b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_blocks where (blocker = a and blocked = b) or (blocker = b and blocked = a))
$$;

create or replace function public.group_kind(gid text) returns text
language sql stable security definer set search_path = public as $$
  select kind from public.groups where id = gid
$$;

create or replace function public.group_exists(gid text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.groups where id = gid)
$$;

create or replace function public.post_group(pid text) returns text
language sql stable security definer set search_path = public as $$
  select group_id from public.posts where id = pid
$$;

create or replace function public.job_owner(jid text) returns uuid
language sql stable security definer set search_path = public as $$
  select by_uid from public.jobs where id = jid
$$;

create or replace function public.setting_on(k text) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select (value -> 'toggles' ->> k)::boolean from public.site_settings where key = 'site'), true)
$$;


-- ---- دوال مساعدة للتشخيص الأونلاين ----
create or replace function public.now_ms() returns bigint
language sql stable as $$ select (extract(epoch from now()) * 1000)::bigint $$;

-- إعدادات التشخيص (site_settings.consult) بقيمة افتراضية
create or replace function public.cset(k text, d numeric) returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce((select nullif(value ->> k, '')::numeric from public.site_settings where key = 'consult'), d)
$$;

-- القسم مغلق افتراضيًا حتى يفعّله الأدمن
create or replace function public.consult_on() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select (value -> 'toggles' ->> 'consult')::boolean from public.site_settings where key = 'site'), false)
$$;

create or replace function public.consult_party(bid text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.consult_bookings where id = bid and (patient = auth.uid() or doctor = auth.uid()))
$$;

-- صحة جدول المواعيد: {"0":[["10:00","14:00"],["18:00","22:00"]], ...}
create or replace function public.valid_hours(h jsonb) returns boolean
language plpgsql immutable as $$
declare k text; iv jsonb; prev int; s int; e int; n int;
begin
  if h is null or jsonb_typeof(h) <> 'object' then return false; end if;
  for k in select jsonb_object_keys(h) loop
    if k !~ '^[0-6]$' or jsonb_typeof(h -> k) <> 'array' or jsonb_array_length(h -> k) > 4 then return false; end if;
    prev := -1;
    for iv in select * from jsonb_array_elements(h -> k) loop
      if jsonb_typeof(iv) <> 'array' or jsonb_array_length(iv) <> 2 then return false; end if;
      if (iv ->> 0) !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' or (iv ->> 1) !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' then return false; end if;
      s := split_part(iv ->> 0, ':', 1)::int * 60 + split_part(iv ->> 0, ':', 2)::int;
      e := split_part(iv ->> 1, ':', 1)::int * 60 + split_part(iv ->> 1, ':', 2)::int;
      if s >= e or s < prev then return false; end if;
      prev := e;
    end loop;
  end loop;
  return true;
end $$;

-- هل بداية الموعد تقع على شبكة مواعيد الطبيب (بتوقيت القاهرة)؟
create or replace function public.slot_ok(h jsonb, p_start bigint, dur int) returns boolean
language plpgsql stable as $$
declare l timestamp; dow int; mins int; iv jsonb; s int; e int;
begin
  if p_start % 60000 <> 0 then return false; end if;
  l := to_timestamp(p_start / 1000.0) at time zone 'Africa/Cairo';
  dow := extract(dow from l)::int;
  mins := extract(hour from l)::int * 60 + extract(minute from l)::int;
  if h -> dow::text is null then return false; end if;
  for iv in select * from jsonb_array_elements(h -> dow::text) loop
    s := split_part(iv ->> 0, ':', 1)::int * 60 + split_part(iv ->> 0, ':', 2)::int;
    e := split_part(iv ->> 1, ':', 1)::int * 60 + split_part(iv ->> 1, ':', 2)::int;
    if mins >= s and mins + dur <= e and (mins - s) % dur = 0 then return true; end if;
  end loop;
  return false;
end $$;

-- ---------------------------------------------------------------------
-- 3) Triggers
-- ---------------------------------------------------------------------
-- إنشاء الملف الشخصي تلقائيًا عند التسجيل (لا يُقرأ role من المستخدم أبدًا)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles(id, name, title, spec, city)
  values (
    new.id,
    to_jsonb(left(coalesce(nullif(m ->> 'name', ''), split_part(new.email, '@', 1)), 80)),
    case when (m ->> 'title') in ('member','student','pharmacist','nurse','dentist','business') then m ->> 'title' else 'member' end,   -- لا يمكن اختيار "طبيب" عند التسجيل
    case when (m ->> 'title') in ('student','pharmacist','nurse','dentist') then coalesce(nullif(m ->> 'spec', ''), 'general') else 'general' end,   -- العضو والنشاط التجاري بلا تخصص طبي
    to_jsonb(left(coalesce(m ->> 'city', ''), 60))
  );
  update public.profiles set place = to_jsonb(left(coalesce(m ->> 'place', ''), 80)) where id = new.id and (m ->> 'title') = 'business';
  insert into public.profiles_private(id, email) values (new.id, lower(new.email));
  insert into public.medical_records(user_id, data) values (new.id, '{}'::jsonb);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- منع المستخدم العادي من تغيير role / verified / banned أو اعتماد طلب توثيقه
create or replace function public.guard_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
    new.verified := old.verified;
    new.banned := old.banned;
    new.joined := old.joined;
  end if;
  return new;
end $$;
drop trigger if exists guard_profile_t on public.profiles;
create trigger guard_profile_t before update on public.profiles
  for each row execute function public.guard_profile();

create or replace function public.guard_vreq() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.data := jsonb_set(new.data, '{status}', '"pending"');
  end if;
  return new;
end $$;
drop trigger if exists guard_vreq_t on public.verification_requests;
create trigger guard_vreq_t before insert or update on public.verification_requests
  for each row execute function public.guard_vreq();

-- منع تغيير kind / verified / mod_uid / owner للمجموعات إلا بواسطة الأدمن
create or replace function public.guard_group() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.kind := old.kind;
    new.verified := old.verified;
    new.mod_uid := old.mod_uid;
    new.owner := old.owner;
  end if;
  return new;
end $$;
drop trigger if exists guard_group_t on public.groups;
create trigger guard_group_t before update on public.groups
  for each row execute function public.guard_group();

-- الصديق المستلم يستطيع فقط تغيير الحالة؛ لا يغيّر الأطراف
create or replace function public.guard_friend() returns trigger
language plpgsql as $$
begin
  new.a := old.a; new.b := old.b; new.ts := old.ts;
  return new;
end $$;
drop trigger if exists guard_friend_t on public.friendships;
create trigger guard_friend_t before update on public.friendships
  for each row execute function public.guard_friend();


-- الطبيب لا يستطيع تغيير تخصصه/إيقافه/صفة "نشط" بدون سعر؛ والمواعيد والسعر ضمن الحدود
create or replace function public.guard_doctor() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.user_id := old.user_id; new.spec := old.spec; new.suspended := old.suspended; new.ts := old.ts;
    if new.fee is distinct from old.fee and new.fee <> 0
       and (new.fee < public.cset('feeMin', 50) or new.fee > public.cset('feeMax', 5000)) then
      raise exception 'fee_range';
    end if;
  end if;
  if not public.valid_hours(new.hours) then raise exception 'bad_hours'; end if;
  if new.suspended then new.active := false; end if;
  if new.active and new.fee <= 0 then raise exception 'fee_required'; end if;
  return new;
end $$;
drop trigger if exists guard_doctor_t on public.doctors;
create trigger guard_doctor_t before insert or update on public.doctors
  for each row execute function public.guard_doctor();

-- لقب "طبيب" يمنحه الأدمن فقط (عند اعتماد طلب التشخيص الأونلاين أو من لوحة الأدمن)
create or replace function public.guard_title() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    if old.title = 'doctor' then new.title := 'doctor';
    elsif old.title = 'business' then new.title := 'business';          -- نوع الحساب التجاري لا يتغيّر من المستخدم
    elsif new.title in ('doctor','business') then new.title := old.title; end if;
    if new.title not in ('member','student','pharmacist','nurse','dentist','other','doctor','business') then new.title := old.title; end if;
    if new.title in ('member','business') then new.spec := 'general'; end if;
  end if;
  return new;
end $$;
drop trigger if exists guard_title_t on public.profiles;
create trigger guard_title_t before update on public.profiles
  for each row execute function public.guard_title();

-- ---------------------------------------------------------------------
-- 4) دوال RPC
-- ---------------------------------------------------------------------
create or replace function public.ad_hit(ad_id text, kind text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then return; end if;
  if kind = 'view' then
    update public.ads set views = views + 1
      where id = ad_id and active and status = 'live' and (owner is null or owner <> auth.uid());
    -- نفاد الكريدت: يتوقف الإعلان ويصل صاحبه إشعار (مرة واحدة)
    with f as (update public.ads set status = 'finished', active = false
                where id = ad_id and owner is not null and cap > 0 and views >= cap and status = 'live' returning owner, id)
    insert into public.notifications(id, to_uid, from_uid, type, ref)
      select gen_random_uuid()::text, owner, owner, 'bz_done', id from f;
  elsif kind = 'click' then
    update public.ads set clicks = clicks + 1 where id = ad_id and active and status = 'live' and (owner is null or owner <> auth.uid());
  end if;
end $$;

create or replace function public.public_stats() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('members', (select count(*) from public.profiles where role <> 'admin' and not banned))
$$;


-- ---------------------------------------------------------------------
-- 4-ب) دوال التشخيص الأونلاين (كل ما يخص الحجز والمال يُنفَّذ هنا في الخادم)
-- ---------------------------------------------------------------------
create or replace function public._cs_notify(p_to uuid, p_type text, p_ref text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_to is null or p_to = auth.uid() then return; end if;
  insert into public.notifications(id, to_uid, from_uid, type, ref) values (gen_random_uuid()::text, p_to, auth.uid(), p_type, p_ref);
end $$;

create or replace function public._cs_notify_admins(p_type text, p_ref text) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications(id, to_uid, from_uid, type, ref)
  select gen_random_uuid()::text, id, auth.uid(), p_type, p_ref from public.profiles where role = 'admin' and not banned and id <> auth.uid();
end $$;

-- تحرير الحجوزات المعلّقة المنتهية
create or replace function public.consult_tick() returns void
language sql security definer set search_path = public as $$
  update public.consult_bookings set status = 'expired' where status = 'held' and hold_until < public.now_ms()
$$;

-- المواعيد المحجوزة للطبيب (بدون كشف هوية الحاجز) لحساب الأوقات المتاحة
create or replace function public.doctor_busy(p_doctor uuid) returns table(start_ts bigint, dur_min int)
language sql stable security definer set search_path = public as $$
  select b.start_ts, b.dur_min from public.consult_bookings b
  where auth.uid() is not null and b.doctor = p_doctor and b.start_ts > public.now_ms() - 86400000
    and (b.status in ('awaiting','confirmed') or (b.status = 'held' and b.hold_until > public.now_ms()))
$$;

create or replace function public.book_consult(p_doctor uuid, p_start bigint, p_complaint text) returns text
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); d public.doctors; dp public.profiles; dur int; pct numeric; bid text;
        fee int; com int; n bigint := public.now_ms();
begin
  if me is null or not public.not_banned() then raise exception 'forbidden'; end if;
  if not public.consult_on() then raise exception 'consult_off'; end if;
  if public.is_admin() then raise exception 'admin_cannot_book'; end if;
  if public.is_business() or public.is_business(p_doctor) then raise exception 'business_not_allowed'; end if;
  if p_doctor = me then raise exception 'self_booking'; end if;
  if public.blocked_between(me, p_doctor) then raise exception 'unavailable'; end if;
  select * into d from public.doctors where user_id = p_doctor;
  select * into dp from public.profiles where id = p_doctor;
  if d.user_id is null or dp.banned or d.suspended or not d.active or d.fee <= 0 then raise exception 'doctor_unavailable'; end if;
  if length(btrim(coalesce(p_complaint, ''))) < 3 or length(p_complaint) > 1500 then raise exception 'complaint_required'; end if;
  dur := public.cset('slotMin', 30)::int;
  if p_start < n + public.cset('leadMin', 60) * 60000 or p_start > n + public.cset('bookDays', 14) * 86400000 then raise exception 'slot_out_of_range'; end if;
  if not public.slot_ok(d.hours, p_start, dur) then raise exception 'slot_invalid'; end if;
  perform pg_advisory_xact_lock(hashtext('consult:' || p_doctor::text));
  update public.consult_bookings set status = 'expired' where status = 'held' and hold_until < n;
  if exists (select 1 from public.consult_bookings b where b.doctor = p_doctor
             and b.status in ('held','awaiting','confirmed')
             and b.start_ts < p_start + dur * 60000 and p_start < b.start_ts + b.dur_min * 60000) then
    raise exception 'slot_taken';
  end if;
  if (select count(*) from public.consult_bookings where patient = me and status = 'held') >= 2 then raise exception 'too_many_holds'; end if;
  pct := public.cset('commissionPct', 30);
  fee := d.fee; com := round(fee * pct / 100.0)::int;
  bid := gen_random_uuid()::text;
  insert into public.consult_bookings(id, patient, doctor, start_ts, dur_min, fee, commission, net, status, hold_until, created_ts)
  values (bid, me, p_doctor, p_start, dur, fee, com, fee - com, 'held', n + public.cset('holdMin', 30) * 60000, n);
  insert into public.consult_content(booking_id, complaint) values (bid, btrim(p_complaint));
  return bid;
end $$;

create or replace function public.submit_payment(p_id text, p_method text, p_ref text, p_proof text default '') returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; n bigint := public.now_ms(); ok boolean;
begin
  select * into b from public.consult_bookings where id = p_id and patient = auth.uid() for update;
  if b.id is null then raise exception 'not_found'; end if;
  if b.status <> 'held' or b.hold_until < n then raise exception 'hold_expired'; end if;
  if p_method not in ('vodafone','instapay') then raise exception 'bad_method'; end if;
  select coalesce((select (value -> 'methods' ->> p_method)::boolean from public.site_settings where key = 'consult'), true) into ok;
  if not ok then raise exception 'method_off'; end if;
  if length(btrim(coalesce(p_ref, ''))) < 4 or length(p_ref) > 60 then raise exception 'ref_required'; end if;
  if coalesce(p_proof, '') <> '' and (p_proof not like auth.uid()::text || '/%' or length(p_proof) > 300) then raise exception 'bad_proof'; end if;
  update public.consult_bookings set status = 'awaiting', pay_method = p_method, pay_ref = btrim(p_ref),
         pay_proof = coalesce(p_proof, ''), paid_ts = n, admin_note = '' where id = p_id;
  perform public._cs_notify_admins('cs_pay', p_id);
end $$;

create or replace function public.cancel_consult(p_id text) returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; me uuid := auth.uid(); adm boolean := public.is_admin(); who text; ref text := 'none'; n bigint := public.now_ms();
begin
  select * into b from public.consult_bookings where id = p_id for update;
  if b.id is null then raise exception 'not_found'; end if;
  if not (adm or b.patient = me or b.doctor = me) then raise exception 'forbidden'; end if;
  if b.status not in ('held','awaiting','confirmed') then raise exception 'bad_state'; end if;
  who := case when adm then 'admin' when b.doctor = me then 'doctor' else 'patient' end;
  if b.status = 'awaiting' then ref := 'due';
  elsif b.status = 'confirmed' then
    if who <> 'patient' or b.start_ts - n >= public.cset('cancelHrs', 12) * 3600000 then ref := 'due'; end if;
  end if;
  update public.consult_bookings set status = 'cancelled', cancelled_by = who, refund_status = ref where id = p_id;
  if who <> 'patient' then perform public._cs_notify(b.patient, 'cs_cancel', p_id); end if;
  if who <> 'doctor' and b.status <> 'held' then perform public._cs_notify(b.doctor, 'cs_cancel', p_id); end if;
  if who <> 'admin' and ref = 'due' then perform public._cs_notify_admins('cs_refund', p_id); end if;
end $$;

create or replace function public.complete_consult(p_id text) returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; n bigint := public.now_ms();
begin
  select * into b from public.consult_bookings where id = p_id and doctor = auth.uid() for update;
  if b.id is null then raise exception 'not_found'; end if;
  if b.status <> 'confirmed' then raise exception 'bad_state'; end if;
  if n < b.start_ts then raise exception 'too_early'; end if;
  update public.consult_bookings set status = 'completed', completed_ts = n, payout_status = 'due' where id = p_id;
  perform public._cs_notify(b.patient, 'cs_done', p_id);
  perform public._cs_notify_admins('cs_payout', p_id);
end $$;

create or replace function public.consult_send(p_id text, p_text text) returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; other uuid; t text := btrim(coalesce(p_text, ''));
begin
  select * into b from public.consult_bookings where id = p_id and (patient = auth.uid() or doctor = auth.uid());
  if b.id is null then raise exception 'not_found'; end if;
  if b.status not in ('confirmed','completed') then raise exception 'bad_state'; end if;
  if b.status = 'completed' and public.now_ms() - b.completed_ts > 3 * 86400000 then raise exception 'chat_closed'; end if;
  if length(t) < 1 or length(t) > 1000 then raise exception 'bad_text'; end if;
  if not public.not_banned() then raise exception 'forbidden'; end if;
  insert into public.consult_messages(id, booking_id, from_uid, text) values (gen_random_uuid()::text, p_id, auth.uid(), t);
  other := case when b.patient = auth.uid() then b.doctor else b.patient end;
  if other is not null and not exists (select 1 from public.notifications where to_uid = other and type = 'cs_msg' and ref = p_id and not read) then
    perform public._cs_notify(other, 'cs_msg', p_id);
  end if;
end $$;

create or replace function public.save_consult(p_id text, p_meet text, p_diag text) returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; old text;
begin
  select * into b from public.consult_bookings where id = p_id and doctor = auth.uid();
  if b.id is null then raise exception 'not_found'; end if;
  if b.status not in ('confirmed','completed') then raise exception 'bad_state'; end if;
  p_meet := btrim(coalesce(p_meet, '')); p_diag := btrim(coalesce(p_diag, ''));
  if p_meet <> '' and (p_meet !~* '^https://[^\s<>"]+$' or length(p_meet) > 300) then raise exception 'bad_link'; end if;
  if length(p_diag) > 3000 then raise exception 'bad_text'; end if;
  select diagnosis into old from public.consult_content where booking_id = p_id;
  update public.consult_content set meet_link = p_meet, diagnosis = p_diag where booking_id = p_id;
  if p_diag <> '' and p_diag is distinct from old then perform public._cs_notify(b.patient, 'cs_diag', p_id); end if;
end $$;

create or replace function public.rate_consult(p_id text, p_stars int, p_comment text default '') returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings;
begin
  select * into b from public.consult_bookings where id = p_id and patient = auth.uid();
  if b.id is null then raise exception 'not_found'; end if;
  if b.status <> 'completed' then raise exception 'bad_state'; end if;
  if p_stars not between 1 and 5 then raise exception 'bad_stars'; end if;
  if exists (select 1 from public.consult_reviews where booking_id = p_id) then raise exception 'already_rated'; end if;
  insert into public.consult_reviews(booking_id, doctor, patient, stars, comment)
  values (p_id, b.doctor, b.patient, p_stars, left(btrim(coalesce(p_comment, '')), 500));
  perform public._cs_notify(b.doctor, 'cs_rated', p_id);
end $$;

-- ===== عمليات الأدمن =====
create or replace function public.review_doctor_application(p_id text, p_decision text, p_note text default '') returns void
language plpgsql security definer set search_path = public as $$
declare a public.doctor_applications;
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  select * into a from public.doctor_applications where id = p_id and status = 'pending' for update;
  if a.id is null then raise exception 'not_pending'; end if;
  if p_decision = 'approved' then
    update public.doctor_applications set status = 'approved', note = left(coalesce(p_note, ''), 500), reviewed_ts = public.now_ms() where id = p_id;
    insert into public.doctors(user_id, spec) values (a.user_id, a.spec)
      on conflict (user_id) do update set spec = excluded.spec, suspended = false;
    update public.profiles set title = 'doctor', verified = true where id = a.user_id;
    perform public._cs_notify(a.user_id, 'cs_app_ok', p_id);
  elsif p_decision = 'rejected' then
    update public.doctor_applications set status = 'rejected', note = left(coalesce(p_note, ''), 500), reviewed_ts = public.now_ms() where id = p_id;
    perform public._cs_notify(a.user_id, 'cs_app_no', p_id);
  else raise exception 'bad_decision'; end if;
end $$;

-- بعد حذف الملفات من التخزين (من المتصفح) يُسجَّل الحذف في الطلب
create or replace function public.purge_application_files(p_id text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  update public.doctor_applications set id_photo = '', selfie = '' where id = p_id and status <> 'pending';
end $$;

create or replace function public.admin_doctor(p_doctor uuid, p_action text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  if p_action = 'suspend' then update public.doctors set suspended = true, active = false where user_id = p_doctor;
  elsif p_action = 'unsuspend' then update public.doctors set suspended = false where user_id = p_doctor;
  elsif p_action = 'revoke' then
    if exists (select 1 from public.consult_bookings where doctor = p_doctor and status in ('awaiting','confirmed')) then raise exception 'has_open_bookings'; end if;
    delete from public.doctors where user_id = p_doctor;
    update public.profiles set title = 'member' where id = p_doctor and title = 'doctor';
  else raise exception 'bad_action'; end if;
end $$;

create or replace function public.admin_consult_action(p_id text, p_action text, p_note text default '') returns void
language plpgsql security definer set search_path = public as $$
declare b public.consult_bookings; n bigint := public.now_ms(); note text := left(btrim(coalesce(p_note, '')), 300);
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  select * into b from public.consult_bookings where id = p_id for update;
  if b.id is null then raise exception 'not_found'; end if;
  if p_action = 'confirm' then
    if b.status <> 'awaiting' then raise exception 'bad_state'; end if;
    update public.consult_bookings set status = 'confirmed', confirmed_ts = n, admin_note = '' where id = p_id;
    perform public._cs_notify(b.patient, 'cs_confirmed', p_id);
    perform public._cs_notify(b.doctor, 'cs_new', p_id);
  elsif p_action = 'reject' then
    if b.status <> 'awaiting' then raise exception 'bad_state'; end if;
    update public.consult_bookings set status = 'held', hold_until = n + public.cset('holdMin', 30) * 60000, admin_note = note, paid_ts = null where id = p_id;
    perform public._cs_notify(b.patient, 'cs_pay_rej', p_id);
  elsif p_action = 'refund_due' then
    if b.status not in ('cancelled','completed') or b.refund_status <> 'none' then raise exception 'bad_state'; end if;
    update public.consult_bookings set refund_status = 'due' where id = p_id;
  elsif p_action = 'refund_done' then
    if b.refund_status <> 'due' then raise exception 'bad_state'; end if;
    update public.consult_bookings set refund_status = 'done', refund_ref = note where id = p_id;
    perform public._cs_notify(b.patient, 'cs_refunded', p_id);
  elsif p_action = 'payout_done' then
    if b.payout_status <> 'due' then raise exception 'bad_state'; end if;
    update public.consult_bookings set payout_status = 'paid', payout_ts = n, payout_ref = note where id = p_id;
    perform public._cs_notify(b.doctor, 'cs_paidout', p_id);
  else raise exception 'bad_action'; end if;
end $$;

create or replace function public.hide_review(p_id text, p_hidden boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  update public.consult_reviews set hidden = p_hidden where booking_id = p_id;
end $$;

-- إشعار الأدمن عند وصول طلب طبيب جديد
create or replace function public.docapp_notify() returns trigger
language plpgsql security definer set search_path = public as $$
begin perform public._cs_notify_admins('cs_app', new.id); return new; end $$;
drop trigger if exists docapp_notify_t on public.doctor_applications;
create trigger docapp_notify_t after insert on public.doctor_applications
  for each row execute function public.docapp_notify();

-- ---------------------------------------------------------------------
-- 4-ج) حسابات الأنشطة التجارية + إعلانات بالكريدت
--   • حساب "نشاط تجاري" (profiles.title = 'business'): نشر + انضمام لمجموعات + إعلانات فقط.
--   • الإعلان يُشترى بكريدت (حد أدنى وسعر الكريدت وعدد المشاهدات لكل كريدت من لوحة الأدمن: site_settings.bizads).
--   • الدفع تحويل يدوي (فودافون كاش / إنستا باي) لأرقام المنصة (site_settings.consult_pay) ثم يراجعه الأدمن.
-- ---------------------------------------------------------------------
create or replace function public.is_business(p_uid uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select title = 'business' from public.profiles where id = p_uid), false)
$$;

create or replace function public.bz_cfg(k text, d numeric) returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce((select nullif(value ->> k, '')::numeric from public.site_settings where key = 'bizads'), d)
$$;

create table if not exists public.ad_orders (
  id        text primary key,
  ad_id     text not null references public.ads(id) on delete cascade,
  owner     uuid not null references public.profiles(id) on delete cascade,
  kind      text not null default 'new' check (kind in ('new','topup')),
  credits   int  not null check (credits > 0),
  unit      int  not null check (unit >= 0),          -- سعر الكريدت وقت الطلب (لا يتأثر بتغييره لاحقًا)
  amount    int  not null check (amount >= 0),        -- credits × unit
  views     bigint not null check (views >= 0),       -- المشاهدات التي يضيفها الطلب (credits × viewsPerCredit وقت الطلب)
  method    text not null check (method in ('vodafone','instapay')),
  pay_from  text not null check (length(pay_from) between 4 and 40),   -- الرقم/الحساب الذي حُوِّل منه المبلغ
  pay_ref   text not null default '' check (length(pay_ref) <= 60),
  pay_proof text not null default '' check (length(pay_proof) <= 300),
  status    text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  note      text not null default '' check (length(note) <= 500),
  refund_status text not null default 'none' check (refund_status in ('none','due','done')),
  refund_ref    text not null default '' check (length(refund_ref) <= 60),
  ts        bigint not null default (extract(epoch from now()) * 1000)::bigint,
  reviewed_ts bigint
);
create index if not exists ad_orders_owner_idx on public.ad_orders(owner);
create unique index if not exists ad_orders_one_pending on public.ad_orders(ad_id) where status = 'pending';

-- حالة الإعلان التجاري تحدد active تلقائيًا (إعلانات الأدمن owner is null لا تتأثر)
create or replace function public.ads_biz_guard() returns trigger
language plpgsql as $$
begin
  if new.owner is not null then new.active := (new.status = 'live'); end if;
  return new;
end $$;
drop trigger if exists ads_biz_guard_t on public.ads;
create trigger ads_biz_guard_t before insert or update on public.ads
  for each row execute function public.ads_biz_guard();

-- إنشاء طلب شراء كريدت (داخلي)
create or replace function public._bz_order(p_ad text, p_kind text, p_credits int, p_method text, p_from text, p_ref text, p_proof text) returns text
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); minc int := public.bz_cfg('minCredits', 50)::int; price int := public.bz_cfg('creditPrice', 10)::int;
        vpc int := public.bz_cfg('viewsPerCredit', 100)::int; oid text := gen_random_uuid()::text; ok boolean; num text;
begin
  if p_credits is null or p_credits < minc or p_credits > 100000 then raise exception 'credits_min'; end if;
  if p_method not in ('vodafone','instapay') then raise exception 'bad_method'; end if;
  select coalesce((value -> 'methods' ->> p_method)::boolean, true) into ok from public.site_settings where key = 'bizads';
  if not coalesce(ok, true) then raise exception 'method_off'; end if;
  select value -> p_method ->> (case when p_method = 'vodafone' then 'number' else 'handle' end) into num from public.site_settings where key = 'consult_pay';
  if coalesce(num, '') = '' then raise exception 'pay_not_configured'; end if;
  if length(btrim(coalesce(p_from, ''))) not between 4 and 40 then raise exception 'from_required'; end if;
  if length(coalesce(p_ref, '')) > 60 then raise exception 'bad_ref'; end if;
  if coalesce(p_proof, '') <> '' and p_proof not like me::text || '/%' then raise exception 'bad_proof'; end if;
  insert into public.ad_orders(id, ad_id, owner, kind, credits, unit, amount, views, method, pay_from, pay_ref, pay_proof)
  values (oid, p_ad, me, p_kind, p_credits, price, p_credits * price, p_credits::bigint * vpc, p_method, btrim(p_from), coalesce(p_ref, ''), coalesce(p_proof, ''));
  perform public._cs_notify_admins('bz_new', oid);
  return oid;
end $$;

create or replace function public.submit_ad(p_title text, p_body text, p_cta text, p_url text, p_tone int, p_credits int,
                                            p_method text, p_from text, p_ref text, p_proof text) returns text
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); aid text := gen_random_uuid()::text; nm jsonb;
begin
  if me is null or not public.not_banned() then raise exception 'forbidden'; end if;
  if not public.is_business() then raise exception 'business_only'; end if;
  if not public.setting_on('ads') then raise exception 'ads_off'; end if;
  if length(btrim(coalesce(p_title, ''))) not between 3 and 80 then raise exception 'bad_title'; end if;
  if length(coalesce(p_body, '')) > 300 or length(coalesce(p_cta, '')) > 30 then raise exception 'bad_text'; end if;
  if coalesce(p_url, '') !~* '^https?://[^[:space:]]{3,250}$' then raise exception 'bad_url'; end if;
  select name into nm from public.profiles where id = me;
  insert into public.ads(id, title, body, cta, advertiser, url, tone, active, owner, status, cap)
  values (aid, to_jsonb(btrim(p_title)), to_jsonb(btrim(coalesce(p_body, ''))), to_jsonb(btrim(coalesce(p_cta, ''))), nm, p_url,
          least(2, greatest(0, coalesce(p_tone, 0))), false, me, 'pending', 0);
  return public._bz_order(aid, 'new', p_credits, p_method, p_from, p_ref, p_proof);
end $$;

create or replace function public.topup_ad(p_ad text, p_credits int, p_method text, p_from text, p_ref text, p_proof text) returns text
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); a public.ads;
begin
  if me is null or not public.not_banned() then raise exception 'forbidden'; end if;
  select * into a from public.ads where id = p_ad and owner = me;
  if not found then raise exception 'not_found'; end if;
  if a.status not in ('live','paused','finished') then raise exception 'bad_state'; end if;
  if exists (select 1 from public.ad_orders where ad_id = p_ad and status = 'pending') then raise exception 'pending_exists'; end if;
  return public._bz_order(p_ad, 'topup', p_credits, p_method, p_from, p_ref, p_proof);
end $$;

create or replace function public.cancel_ad_order(p_id text) returns void
language plpgsql security definer set search_path = public as $$
declare o public.ad_orders;
begin
  select * into o from public.ad_orders where id = p_id and owner = auth.uid();
  if not found then raise exception 'not_found'; end if;
  if o.status <> 'pending' then raise exception 'bad_state'; end if;
  update public.ad_orders set status = 'cancelled', refund_status = 'due', reviewed_ts = public.now_ms() where id = p_id;
  if o.kind = 'new' then update public.ads set status = 'rejected' where id = o.ad_id; end if;
  perform public._cs_notify_admins('bz_refund', p_id);
end $$;

create or replace function public.review_ad_order(p_id text, p_decision text, p_note text) returns void
language plpgsql security definer set search_path = public as $$
declare o public.ad_orders;
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  select * into o from public.ad_orders where id = p_id for update;
  if not found then raise exception 'not_found'; end if;
  if p_decision = 'approved' then
    if o.status <> 'pending' then raise exception 'bad_state'; end if;
    update public.ad_orders set status = 'approved', note = left(coalesce(p_note, ''), 500), reviewed_ts = public.now_ms() where id = p_id;
    update public.ads set cap = cap + o.views,
           status = case when o.kind = 'new' or status = 'finished' then 'live' else status end
     where id = o.ad_id;
    perform public._cs_notify(o.owner, 'bz_ok', o.ad_id);
  elsif p_decision = 'rejected' then
    if o.status <> 'pending' then raise exception 'bad_state'; end if;
    update public.ad_orders set status = 'rejected', note = left(coalesce(p_note, ''), 500), refund_status = 'due', reviewed_ts = public.now_ms() where id = p_id;
    if o.kind = 'new' then update public.ads set status = 'rejected' where id = o.ad_id; end if;
    perform public._cs_notify(o.owner, 'bz_no', o.ad_id);
  elsif p_decision = 'refund_done' then
    if o.refund_status <> 'due' then raise exception 'bad_state'; end if;
    update public.ad_orders set refund_status = 'done', refund_ref = left(coalesce(p_note, ''), 60) where id = p_id;
    perform public._cs_notify(o.owner, 'bz_refunded', o.ad_id);
  else raise exception 'bad_decision'; end if;
end $$;

create or replace function public.ad_owner_toggle(p_ad text) returns void
language plpgsql security definer set search_path = public as $$
declare a public.ads;
begin
  select * into a from public.ads where id = p_ad and owner = auth.uid();
  if not found then raise exception 'not_found'; end if;
  if a.status = 'live' then update public.ads set status = 'paused' where id = p_ad;
  elsif a.status = 'paused' and (a.cap = 0 or a.views < a.cap) then update public.ads set status = 'live' where id = p_ad;
  else raise exception 'bad_state'; end if;
end $$;

-- ---------------------------------------------------------------------
-- 5) Row Level Security
-- ---------------------------------------------------------------------
alter table public.profiles              enable row level security;
alter table public.profiles_private      enable row level security;
alter table public.verification_requests enable row level security;
alter table public.medical_records       enable row level security;
alter table public.groups                enable row level security;
alter table public.group_members         enable row level security;
alter table public.group_requests        enable row level security;
alter table public.posts                 enable row level security;
alter table public.post_likes            enable row level security;
alter table public.comments              enable row level security;
alter table public.saved_posts           enable row level security;
alter table public.jobs                  enable row level security;
alter table public.job_applicants        enable row level security;
alter table public.job_saved             enable row level security;
alter table public.ads                   enable row level security;
alter table public.ad_orders             enable row level security;
alter table public.reports               enable row level security;
alter table public.friendships           enable row level security;
alter table public.user_blocks           enable row level security;
alter table public.notifications         enable row level security;
alter table public.site_settings         enable row level security;
alter table public.ai_usage              enable row level security;

-- ---- التشخيص الأونلاين ----
alter table public.doctor_applications enable row level security;
alter table public.doctors             enable row level security;
alter table public.doctor_payout       enable row level security;
alter table public.consult_bookings    enable row level security;
alter table public.consult_content     enable row level security;
alter table public.consult_messages    enable row level security;
alter table public.consult_reviews     enable row level security;

-- helper: حذف السياسات القديمة لتكون إعادة التشغيل آمنة
do $$ declare r record; begin
  for r in select schemaname, tablename, policyname from pg_policies where schemaname = 'public' loop
    execute format('drop policy %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

-- profiles
create policy profiles_select on public.profiles for select to authenticated using (true);
create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy profiles_delete on public.profiles for delete to authenticated using (public.is_admin());

-- profiles_private
create policy pp_select on public.profiles_private for select to authenticated using (id = auth.uid() or public.is_admin());

-- verification_requests
create policy vr_select on public.verification_requests for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy vr_insert on public.verification_requests for insert to authenticated with check ((user_id = auth.uid() and public.not_banned() and not public.is_business()) or public.is_admin());
create policy vr_update on public.verification_requests for update to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy vr_delete on public.verification_requests for delete to authenticated using (public.is_admin());

-- medical_records (خاصة بصاحبها فقط)
create policy mr_select on public.medical_records for select to authenticated using (user_id = auth.uid());
create policy mr_insert on public.medical_records for insert to authenticated with check (user_id = auth.uid());
create policy mr_update on public.medical_records for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- groups
create policy groups_select on public.groups for select to authenticated using (true);
create policy groups_insert on public.groups for insert to authenticated with check (
  public.is_admin()
  or (public.not_banned() and kind is null and verified = false and mod_uid is null and owner = auth.uid() and public.setting_on('userGroups') and not public.is_business())
);
create policy groups_update on public.groups for update to authenticated
  using (public.is_admin() or (owner = auth.uid() and kind is null))
  with check (public.is_admin() or (owner = auth.uid() and kind is null));
create policy groups_delete on public.groups for delete to authenticated
  using (public.is_admin() or (owner = auth.uid() and kind is null));

-- group_members
create policy gm_select on public.group_members for select to authenticated using (true);
create policy gm_insert on public.group_members for insert to authenticated with check (
  public.is_admin()
  or public.is_mod(group_id)
  or (user_id = auth.uid() and public.not_banned() and public.group_exists(group_id) and public.group_kind(group_id) is null)
);
create policy gm_delete on public.group_members for delete to authenticated using (
  user_id = auth.uid() or public.is_admin() or public.is_mod(group_id)
);

-- group_requests
create policy gr_select on public.group_requests for select to authenticated using (
  user_id = auth.uid() or public.is_admin() or public.is_mod(group_id)
);
create policy gr_insert on public.group_requests for insert to authenticated with check (
  user_id = auth.uid() and public.not_banned() and public.group_kind(group_id) = 'uni'
);
create policy gr_delete on public.group_requests for delete to authenticated using (
  user_id = auth.uid() or public.is_admin() or public.is_mod(group_id)
);

-- posts
create policy posts_select on public.posts for select to authenticated using (
  (group_id is null or public.is_member(group_id) or public.is_mod(group_id) or public.is_admin())
  and (public.is_admin() or public.is_mod(group_id) or not public.blocked_between(auth.uid(), uid))   -- الحظر يخفي المحتوى في الاتجاهين
);
create policy posts_insert on public.posts for insert to authenticated with check (
  uid = auth.uid() and public.not_banned()
  and (group_id is null or public.is_member(group_id) or public.is_admin())
);
create policy posts_update on public.posts for update to authenticated
  using (uid = auth.uid() or public.is_admin()) with check (uid = auth.uid() or public.is_admin());
create policy posts_delete on public.posts for delete to authenticated
  using (uid = auth.uid() or public.is_admin() or public.is_mod(group_id));

-- post_likes (يُرى فقط ما تُرى منشوراته)
create policy pl_select on public.post_likes for select to authenticated using (exists (select 1 from public.posts p where p.id = post_id) and (public.is_admin() or not public.blocked_between(auth.uid(), user_id)));
create policy pl_insert on public.post_likes for insert to authenticated with check (
  user_id = auth.uid() and public.not_banned() and exists (select 1 from public.posts p where p.id = post_id)
);
create policy pl_delete on public.post_likes for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- comments
create policy cm_select on public.comments for select to authenticated using (exists (select 1 from public.posts p where p.id = post_id) and (public.is_admin() or not public.blocked_between(auth.uid(), uid)));
create policy cm_insert on public.comments for insert to authenticated with check (
  uid = auth.uid() and public.not_banned() and exists (select 1 from public.posts p where p.id = post_id)
);
create policy cm_update on public.comments for update to authenticated using (uid = auth.uid() or public.is_admin()) with check (uid = auth.uid() or public.is_admin());
create policy cm_delete on public.comments for delete to authenticated using (
  uid = auth.uid() or public.is_admin() or public.is_mod(public.post_group(post_id))
);

-- saved_posts (خاصة)
create policy sp_select on public.saved_posts for select to authenticated using (user_id = auth.uid());
create policy sp_insert on public.saved_posts for insert to authenticated with check (user_id = auth.uid());
create policy sp_delete on public.saved_posts for delete to authenticated using (user_id = auth.uid());

-- jobs
create policy jobs_select on public.jobs for select to authenticated using (true);
create policy jobs_insert on public.jobs for insert to authenticated with check ((by_uid = auth.uid() and public.not_banned() and not public.is_business()) or public.is_admin());
create policy jobs_update on public.jobs for update to authenticated using (by_uid = auth.uid() or public.is_admin()) with check (by_uid = auth.uid() or public.is_admin());
create policy jobs_delete on public.jobs for delete to authenticated using (by_uid = auth.uid() or public.is_admin());

-- job_applicants (يراها المتقدم وصاحب الوظيفة والأدمن)
create policy ja_select on public.job_applicants for select to authenticated using (
  user_id = auth.uid() or public.job_owner(job_id) = auth.uid() or public.is_admin()
);
create policy ja_insert on public.job_applicants for insert to authenticated with check (user_id = auth.uid() and public.not_banned() and not public.is_business());
create policy ja_delete on public.job_applicants for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- job_saved (خاصة)
create policy js_select on public.job_saved for select to authenticated using (user_id = auth.uid());
create policy js_insert on public.job_saved for insert to authenticated with check (user_id = auth.uid() and not public.is_business());
create policy js_delete on public.job_saved for delete to authenticated using (user_id = auth.uid());

-- ads (الأدمن فقط يكتب؛ العدّادات عبر ad_hit)
create policy ads_select on public.ads for select to authenticated using (status = 'live' or owner = auth.uid() or public.is_admin());
-- طلبات الكريدت: صاحبها والأدمن فقط، والكتابة عبر الدوال فقط
create policy ao_select on public.ad_orders for select to authenticated using (owner = auth.uid() or public.is_admin());
create policy ads_insert on public.ads for insert to authenticated with check (public.is_admin());
create policy ads_update on public.ads for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy ads_delete on public.ads for delete to authenticated using (public.is_admin());

-- reports
create policy rp_select on public.reports for select to authenticated using (by_uid = auth.uid()::text or public.is_admin());
create policy rp_insert on public.reports for insert to authenticated with check (
  public.is_admin() or (by_uid = auth.uid()::text and source = 'user' and status = 'open' and public.not_banned())
);
create policy rp_update on public.reports for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy rp_delete on public.reports for delete to authenticated using (public.is_admin());

-- friendships
create policy fr_select on public.friendships for select to authenticated using (a = auth.uid() or b = auth.uid() or public.is_admin());
create policy fr_insert on public.friendships for insert to authenticated with check (a = auth.uid() and status = 'pending' and public.not_banned() and not public.blocked_between(a, b) and not public.is_business(a) and not public.is_business(b));
create policy fr_update on public.friendships for update to authenticated using (b = auth.uid()) with check (b = auth.uid());
create policy fr_delete on public.friendships for delete to authenticated using (a = auth.uid() or b = auth.uid() or public.is_admin());

-- user_blocks: الحاظر فقط يرى ويضيف ويحذف (ولا يمكن حظر الأدمن)
create policy ub_select on public.user_blocks for select to authenticated using (blocker = auth.uid());
create policy ub_insert on public.user_blocks for insert to authenticated with check (
  blocker = auth.uid() and public.not_banned()
  and not exists (select 1 from public.profiles p where p.id = blocked and p.role = 'admin')
);
create policy ub_delete on public.user_blocks for delete to authenticated using (blocker = auth.uid());

-- notifications
create policy nt_select on public.notifications for select to authenticated using (to_uid = auth.uid());
create policy nt_insert on public.notifications for insert to authenticated with check (from_uid = auth.uid() and to_uid <> auth.uid() and public.not_banned() and not public.blocked_between(from_uid, to_uid));
create policy nt_update on public.notifications for update to authenticated using (to_uid = auth.uid()) with check (to_uid = auth.uid());
create policy nt_delete on public.notifications for delete to authenticated using (to_uid = auth.uid());

-- site_settings: القراءة للجميع (حتى الزائر لعرض الصفحة الرئيسية)، الكتابة للأدمن
-- 'consult_pay' (أرقام استلام المدفوعات) لا يقرؤها إلا المسجّلون
create policy ss_select on public.site_settings for select to anon, authenticated using (key <> 'consult_pay' or (auth.uid() is not null and public.not_banned()));
create policy ss_insert on public.site_settings for insert to authenticated with check (public.is_admin());
create policy ss_update on public.site_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());


-- doctor_applications: صاحبها والأدمن فقط. الإدخال بحالة pending فقط. القرار عبر review_doctor_application.
create policy da_select on public.doctor_applications for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy da_insert on public.doctor_applications for insert to authenticated with check (
  user_id = auth.uid() and public.not_banned() and status = 'pending' and note = '' and reviewed_ts is null
  and public.consult_on() and not public.is_admin() and not public.is_business()
  and not exists (select 1 from public.doctors d where d.user_id = auth.uid())
  and id_photo like auth.uid()::text || '/%' and selfie like auth.uid()::text || '/%'
);
create policy da_delete on public.doctor_applications for delete to authenticated using ((user_id = auth.uid() and status = 'pending') or public.is_admin());

-- doctors: الدليل مقروء لكل الأعضاء (الموقوف لا يظهر إلا لصاحبه والأدمن). الإنشاء عبر الأدمن فقط.
create policy doc_select on public.doctors for select to authenticated using (not suspended or user_id = auth.uid() or public.is_admin());
create policy doc_update on public.doctors for update to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

-- doctor_payout: الطبيب والأدمن
create policy dp_select on public.doctor_payout for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy dp_insert on public.doctor_payout for insert to authenticated with check (user_id = auth.uid() and exists (select 1 from public.doctors d where d.user_id = auth.uid()));
create policy dp_update on public.doctor_payout for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy dp_delete on public.doctor_payout for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- consult_bookings: قراءة فقط (المريض/الطبيب/الأدمن). الكتابة عبر RPC.
create policy cb_select on public.consult_bookings for select to authenticated using (patient = auth.uid() or doctor = auth.uid() or public.is_admin());

-- محتوى الاستشارة والمحادثة: الطرفان فقط (الأدمن لا يقرأ المحتوى الطبي)
create policy cc_select on public.consult_content  for select to authenticated using (public.consult_party(booking_id));
create policy cm_select2 on public.consult_messages for select to authenticated using (public.consult_party(booking_id));

-- التقييمات: مقروءة لكل الأعضاء؛ المخفي لا يراه إلا صاحبه والأدمن
create policy cr_select on public.consult_reviews for select to authenticated using (not hidden or patient = auth.uid() or public.is_admin());

-- ai_usage: بدون سياسات = مغلقة تمامًا أمام العميل (service role فقط)

-- ---------------------------------------------------------------------
-- 6) الصلاحيات (grants)
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;
grant select on public.site_settings to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
revoke all on public.ai_usage from anon, authenticated;
grant all on all tables in schema public to service_role;
grant execute on function public.public_stats() to anon, authenticated;
grant execute on function public.ad_hit(text, text) to authenticated;
grant execute on function public.is_admin() to authenticated;
-- دوال التشخيص: للمسجّلين فقط
do $$ declare f text; begin
  foreach f in array array[
    'consult_tick()','doctor_busy(uuid)','book_consult(uuid,bigint,text)','submit_payment(text,text,text,text)','cancel_consult(text)',
    'complete_consult(text)','consult_send(text,text)','save_consult(text,text,text)','rate_consult(text,int,text)',
    'review_doctor_application(text,text,text)','purge_application_files(text)','admin_doctor(uuid,text)',
    'admin_consult_action(text,text,text)','hide_review(text,boolean)',
    'submit_ad(text,text,text,text,int,int,text,text,text,text)','topup_ad(text,int,text,text,text,text)','cancel_ad_order(text)','review_ad_order(text,text,text)','ad_owner_toggle(text)','_bz_order(text,text,int,text,text,text,text)','_cs_notify(uuid,text,text)','_cs_notify_admins(text,text)']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    if left(f,1) <> '_' then execute format('grant execute on function public.%s to authenticated', f); end if;
  end loop;
end $$;
revoke all on public.ad_orders from anon;
revoke insert, update, delete on public.ad_orders from authenticated;
revoke all on public.doctor_applications, public.doctor_payout, public.consult_bookings, public.consult_content, public.consult_messages, public.consult_reviews from anon;
grant select on public.doctor_ratings to authenticated;
-- المحتوى الحساس والمال: لا كتابة مباشرة من العميل (تتم عبر الدوال أعلاه)
revoke insert, update, delete on public.consult_bookings, public.consult_content, public.consult_messages, public.consult_reviews from authenticated;
revoke insert, delete on public.doctors from authenticated;
revoke update on public.doctor_applications from authenticated;

-- ---------------------------------------------------------------------
-- 7) Realtime (إشعارات لحظية)
-- ---------------------------------------------------------------------
do $$ begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin alter publication supabase_realtime add table public.notifications; exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.group_requests; exception when duplicate_object then null; end;
  end if;
end $$;

-- ---------------------------------------------------------------------
-- 7b) ترقية مشروع قديم (لو شغّلت نسخة سابقة من هذا الملف): أعمدة الصور
-- ---------------------------------------------------------------------
alter table public.profiles add column if not exists avatar text;
alter table public.posts    add column if not exists images jsonb not null default '[]'::jsonb;
do $$ begin
  begin alter table public.profiles add constraint profiles_avatar_chk check (avatar is null or length(avatar) <= 600); exception when duplicate_object then null; end;
  begin alter table public.posts add constraint posts_images_chk check (jsonb_typeof(images) = 'array' and jsonb_array_length(images) <= 4); exception when duplicate_object then null; end;
end $$;


-- ---------------------------------------------------------------------
-- 7c) ترقية مشروع قديم: التشخيص الأونلاين + عضو غير طبيب
-- ---------------------------------------------------------------------
alter table public.profiles alter column title set default 'member';
-- إعدادات التشخيص الافتراضية (يعدّلها الأدمن من لوحة التحكم). لا تُستبدل إن وُجدت.
insert into public.site_settings(key, value) values
  ('consult', '{"commissionPct":30,"slotMin":30,"bookDays":14,"holdMin":30,"leadMin":60,"cancelHrs":12,"feeMin":50,"feeMax":5000,"methods":{"vodafone":true,"instapay":true}}'::jsonb),
  ('consult_pay', '{"vodafone":{"number":"","name":""},"instapay":{"handle":"","name":""}}'::jsonb)
on conflict (key) do nothing;
-- القسم مغلق افتراضيًا: فعّله من لوحة الأدمن > الموقع > المزايا
update public.site_settings set value = jsonb_set(value, '{toggles,consult}', 'false'::jsonb, true)
  where key = 'site' and not (coalesce(value -> 'toggles', '{}'::jsonb) ? 'consult');

-- ---------------------------------------------------------------------
-- 8) كيف تجعل نفسك أدمن؟  (بعد أن تسجّل حسابك من الموقع)
--    استبدل البريد ببريدك ثم شغّل:
--
 update public.profiles set role = 'admin'
 where id = (select id from auth.users where email = 'adminms@medrosocialdia.com');
-- ---------------------------------------------------------------------
