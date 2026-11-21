-- MedRo — تخزين الصور (Supabase Storage)
-- شغّله بعد schema.sql (من SQL Editor). آمن لإعادة التشغيل.
--
-- حاوية واحدة اسمها media:
--   • عامة للقراءة (الصور تُعرض عبر رابط مباشر في المنشورات والبروفايلات)
--   • الحد الأقصى للملف 3MB، وأنواع الصور فقط (jpeg/png/webp/gif) — يفرضهما الخادم نفسه
--   • الرفع مسموح فقط داخل مجلد باسم معرّف المستخدم:  media/<user-id>/...
--   • الحذف: صاحب الملف أو الأدمن
--
-- ملاحظة خصوصية: روابط الصور غير قابلة للتخمين، لكن من يملك الرابط يستطيع فتحه حتى لو المنشور في مجموعة خاصة.
-- لذلك لا تضع صورًا حساسة. (للخصوصية الكاملة يلزم حاوية خاصة + روابط موقّعة، وهي خطوة مستقبلية.)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 3145728, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists media_select on storage.objects;
create policy media_select on storage.objects for select to authenticated
  using (bucket_id = 'media' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

drop policy if exists media_insert on storage.objects;
create policy media_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text and public.not_banned());

drop policy if exists media_delete on storage.objects;
create policy media_delete on storage.objects for delete to authenticated
  using (bucket_id = 'media' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- =====================================================================
-- حاوية خاصة private — للتشخيص الأونلاين (للاستفسارات الطبية)
--   • خاصة تمامًا (public = false): لا يوجد رابط مباشر لأي ملف
--   • تحتوي: صورة بطاقة الطبيب + الصورة الحية + إثبات الدفع
--   • الرفع داخل مجلد المستخدم فقط:  private/<user-id>/...
--   • القراءة: صاحب الملف أو الأدمن فقط (الأدمن يفتح الملف عبر رابط موقّع مؤقت)
--   • الحذف: صاحب الملف أو الأدمن
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('private', 'private', false, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists private_select on storage.objects;
create policy private_select on storage.objects for select to authenticated
  using (bucket_id = 'private' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

drop policy if exists private_insert on storage.objects;
create policy private_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'private' and (storage.foldername(name))[1] = auth.uid()::text and public.not_banned());

drop policy if exists private_delete on storage.objects;
create policy private_delete on storage.objects for delete to authenticated
  using (bucket_id = 'private' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
