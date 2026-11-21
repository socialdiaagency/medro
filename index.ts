// MedRo — Edge Function: ai
// وسيط آمن بين المنصة ومزوّد الذكاء الاصطناعي. المفتاح السري يبقى على الخادم فقط.
//   mode "chat": مساعد طبي (لأي مستخدم مسجّل)        body: { mode, system?, messages:[{role,content}] }
//   mode "json": فحص المحتوى (للأدمن فقط)             body: { mode, prompt }
// المزوّدون: Gemini (مجاني) أو Anthropic. يُحدَّد بالأسرار (Secrets) — انظر README.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

type Msg = { role: "user" | "assistant"; content: string };

async function callGemini(system: string, messages: Msg[], asJson: boolean): Promise<string> {
  const key = Deno.env.get("GEMINI_API_KEY")!;
  const model = Deno.env.get("AI_MODEL") ?? "gemini-2.5-flash";
  const generationConfig: Record<string, unknown> = { temperature: asJson ? 0 : 0.4, maxOutputTokens: 2048 };
  if (asJson) generationConfig.responseMimeType = "application/json";
  if (model.includes("flash")) generationConfig.thinkingConfig = { thinkingBudget: 0 };
  const body: Record<string, unknown> = {
    contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
    generationConfig,
  };
  if (system) body.systemInstruction = { parts: [{ text: system }] };
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify(body),
  });
  if (r.status === 429) throw Object.assign(new Error("provider_rate_limited"), { status: 429 });
  if (!r.ok) throw new Error(`gemini ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const text = (j.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("");
  if (!text) throw new Error("empty_response");
  return text;
}

async function callAnthropic(system: string, messages: Msg[], asJson: boolean): Promise<string> {
  const key = Deno.env.get("ANTHROPIC_API_KEY")!;
  const model = Deno.env.get("AI_MODEL") ?? "claude-haiku-5-5";
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      temperature: asJson ? 0 : 0.4,
      ...(system ? { system } : {}),
      messages,
    }),
  });
  if (r.status === 429) throw Object.assign(new Error("provider_rate_limited"), { status: 429 });
  if (!r.ok) throw new Error(`anthropic ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const text = (j.content ?? []).map((c: { text?: string }) => c.text ?? "").join("");
  if (!text) throw new Error("empty_response");
  return text;
}

function provider(): "gemini" | "anthropic" | null {
  const forced = Deno.env.get("AI_PROVIDER");
  if (forced === "gemini" && Deno.env.get("GEMINI_API_KEY")) return "gemini";
  if (forced === "anthropic" && Deno.env.get("ANTHROPIC_API_KEY")) return "anthropic";
  if (Deno.env.get("GEMINI_API_KEY")) return "gemini";
  if (Deno.env.get("ANTHROPIC_API_KEY")) return "anthropic";
  return null;
}

function parseJson(text: string): unknown {
  const t = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  try { return JSON.parse(t); } catch (_) { /* try to find the first JSON value */ }
  const a = t.search(/[\[{]/);
  const b = Math.max(t.lastIndexOf("]"), t.lastIndexOf("}"));
  if (a >= 0 && b > a) return JSON.parse(t.slice(a, b + 1));
  throw new Error("bad_json");
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

    // 1) هوية المستدعي (نتحقق من توكن الجلسة بأنفسنا؛ لذلك ننشر الدالة بدون verify_jwt)
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return json({ error: "unauthorized" }, 401);

    const { data: prof } = await admin.from("profiles").select("role,banned,title").eq("id", user.id).maybeSingle();
    if (!prof || prof.banned) return json({ error: "forbidden" }, 403);
    if (prof.title === "business") return json({ error: "business_not_allowed" }, 403);   // حساب النشاط التجاري لا يشمل المساعد الطبي

    // 2) هل المساعد مفعّل من لوحة الأدمن؟
    const { data: site } = await admin.from("site_settings").select("value").eq("key", "site").maybeSingle();
    if (site?.value?.toggles?.ai === false) return json({ error: "disabled" }, 403);

    // 3) مدخلات
    const body = await req.json().catch(() => ({}));
    const mode = body.mode === "json" ? "json" : "chat";
    if (mode === "json" && prof.role !== "admin") return json({ error: "forbidden" }, 403);

    let system = "";
    let messages: Msg[] = [];
    if (mode === "json") {
      const prompt = String(body.prompt ?? "").slice(0, 30000);
      if (!prompt) return json({ error: "bad_request" }, 400);
      messages = [{ role: "user", content: prompt + "\n\nReturn ONLY valid JSON. No markdown fences, no commentary." }];
    } else {
      system = String(body.system ?? "").slice(0, 6000);
      const raw = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
      messages = raw
        .map((m: Msg) => ({ role: m?.role === "assistant" ? "assistant" : "user", content: String(m?.content ?? "").slice(0, 4000) }))
        .filter((m: Msg) => m.content.trim());
      if (!messages.length || messages[messages.length - 1].role !== "user") return json({ error: "bad_request" }, 400);
    }

    // 4) حد يومي لحماية المفتاح المجاني (الأدمن مستثنى)
    if (prof.role !== "admin") {
      const limit = Number(Deno.env.get("AI_DAILY_LIMIT") ?? "40");
      const day = new Date().toISOString().slice(0, 10);
      const { data: row } = await admin.from("ai_usage").select("n").eq("user_id", user.id).eq("day", day).maybeSingle();
      const n = row?.n ?? 0;
      if (n >= limit) return json({ error: "rate_limited" }, 429);
      await admin.from("ai_usage").upsert({ user_id: user.id, day, n: n + 1 });
    }

    // 5) استدعاء المزوّد
    const p = provider();
    if (!p) return json({ error: "ai_not_configured" }, 503);
    const text = p === "gemini"
      ? await callGemini(system, messages, mode === "json")
      : await callAnthropic(system, messages, mode === "json");

    return mode === "json" ? json({ json: parseJson(text) }) : json({ text });
  } catch (e) {
    const status = (e as { status?: number }).status === 429 ? 429 : 500;
    console.error("ai function error:", (e as Error).message);
    return json({ error: status === 429 ? "rate_limited" : "ai_failed" }, status);
  }
});
