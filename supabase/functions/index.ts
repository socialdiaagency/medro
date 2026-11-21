// MedRo — Edge Function: admin
// عمليات تحتاج صلاحيات الخادم (service role) ولا يجوز تنفيذها من المتصفح:
//   { action: "create_user", email, password, name, title, spec, verified }
//   { action: "delete_user", id }     (أدمن فقط)
//   { action: "delete_self" }         (أي مستخدم يحذف حسابه هو — مطلوب من Google Play)
// create_user و delete_user: تتحقق الدالة أن المستدعي أدمن فعليًا في جدول profiles.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

const TITLES = ["doctor", "student", "pharmacist", "nurse", "dentist", "member", "other", "business"];
const SPECS = ["internal", "surgery", "peds", "ob", "ortho", "cardio", "neuro", "derm", "radio", "anes", "dental", "pharma", "nursing", "general"];

// يحذف كل ملفات مجلد داخل حاوية (يدخل المجلدات الفرعية)
// deno-lint-ignore no-explicit-any
async function rmTree(st: any, prefix: string, depth = 0): Promise<void> {
  const { data: items } = await st.list(prefix, { limit: 1000 });
  if (!items || !items.length) return;
  const files: string[] = [];
  for (const it of items as { name: string; id: string | null }[]) {
    if (it.id === null && depth < 3) await rmTree(st, `${prefix}/${it.name}`, depth + 1); // مجلد فرعي
    else files.push(`${prefix}/${it.name}`);
  }
  if (files.length) await st.remove(files);
}

// يحذف ملفات المستخدم من التخزين (media/<id>/ و private/<id>/ — بطاقة وصورة حية وإثباتات دفع) ثم الحساب؛
// الملف الشخصي وكل محتواه يُحذف تلقائيًا (cascade). سجلات الحجز المالية تبقى بدون ربط بالمستخدم.
// deno-lint-ignore no-explicit-any
async function purge(admin: any, id: string): Promise<string | null> {
  for (const bucket of ["media", "private"]) {
    try { await rmTree(admin.storage.from(bucket), id); } catch (_) { /* لا نوقف الحذف بسبب الملفات */ }
  }
  const { error } = await admin.auth.admin.deleteUser(id);
  return error ? error.message : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    // المفتاح السري: يُحقن تلقائيًا (SUPABASE_SERVICE_ROLE_KEY)؛ وإن لم يتوفر ضع المفتاح الجديد sb_secret_... في السر MEDRO_SECRET_KEY
    const service = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("MEDRO_SECRET_KEY"))!;
    if (!service) return json({ error: "server_not_configured" }, 500);
    const admin = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });

    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return json({ error: "unauthorized" }, 401);

    const { data: me } = await admin.from("profiles").select("role,banned").eq("id", user.id).maybeSingle();
    const b = await req.json().catch(() => ({}));

    // حذف الحساب الذاتي: متاح لأي مستخدم (حتى المحظور) — يحذف حسابه فقط
    if (b.action === "delete_self") {
      if (me?.role === "admin") {
        const { count } = await admin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "admin").neq("id", user.id);
        if (!count) return json({ error: "last_admin" }, 409); // لا نترك المنصة بلا أدمن
      }
      const err = await purge(admin, user.id);
      if (err) return json({ error: err }, 400);
      return json({ ok: true });
    }

    if (!me || me.role !== "admin" || me.banned) return json({ error: "forbidden" }, 403);

    if (b.action === "create_user") {
      const email = String(b.email ?? "").trim().toLowerCase();
      const password = String(b.password ?? "");
      const name = String(b.name ?? "").replace(/[<>]/g, "").trim().slice(0, 80);
      if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6 || name.length < 3) return json({ error: "invalid_input" }, 400);
      const title = TITLES.includes(b.title) ? b.title : "member";
      const spec = SPECS.includes(b.spec) ? b.spec : "general";
      const { data, error } = await admin.auth.admin.createUser({
        // التسجيل العادي يحوّل "doctor" إلى member (trigger)؛ الأدمن وحده يمنح لقب طبيب هنا بعد الإنشاء
        email, password, email_confirm: true, user_metadata: { name, title: title === "doctor" ? "member" : title, spec },
      });
      if (error) return json({ error: error.message }, 400);
      if (data.user && title === "doctor") {
        await admin.from("profiles").update({ title: "doctor" }).eq("id", data.user.id);
      }
      if (b.verified === true && data.user) {
        await admin.from("profiles").update({ verified: true }).eq("id", data.user.id);
      }
      return json({ ok: true, id: data.user?.id });
    }

    if (b.action === "delete_user") {
      const id = String(b.id ?? "");
      if (!id || id === user.id) return json({ error: "invalid_input" }, 400);
      const err = await purge(admin, id);
      if (err) return json({ error: err }, 400);
      return json({ ok: true });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("admin function error:", (e as Error).message);
    return json({ error: "server_error" }, 500);
  }
});
