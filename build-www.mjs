// MedRo — يجهّز مجلد www/ الذي يحزّمه Capacitor داخل تطبيق أندرويد:
//  1) ينسخ ملفات الموقع   2) يضع مكتبة supabase-js محليًا (ليفتح التطبيق بدون إنترنت)
//  3) ينزّل خط Cairo ويستضيفه داخل التطبيق   4) يتأكد من ضبط config.js
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const www = join(root, 'www');
const strict = process.env.REQUIRE_CONFIG === '1';
const warn = (m) => console.warn('⚠️  ' + m);
const fail = (m) => { console.error('❌ ' + m); process.exit(1); };

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
for (const f of ['index.html', 'config.js', 'manifest.webmanifest', 'privacy.html', 'delete-account.html', 'css', 'js', 'assets']) {
  cpSync(join(root, f), join(www, f), { recursive: true });
}

// --- 1) التأكد من إعدادات Supabase
const cfg = readFileSync(join(www, 'config.js'), 'utf8');
const url = (cfg.match(/SUPABASE_URL:\s*"([^"]*)"/) || [])[1] || '';
const key = (cfg.match(/SUPABASE_ANON_KEY:\s*"([^"]*)"/) || [])[1] || '';
if (!url || !key) {
  const m = 'config.js فارغ: التطبيق سيعمل بالوضع التجريبي المحلي فقط. املأ SUPABASE_URL و SUPABASE_ANON_KEY أو اضبط متغيرات المستودع.';
  strict ? fail(m) : warn(m);
}
// رفض المفاتيح السرية (فحص القيمة نفسها لا التعليقات)
let secret = key.startsWith('sb_secret_');
if (!secret && key.split('.').length === 3) {
  try { secret = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString('utf8')).role === 'service_role'; } catch { /* ليس JWT صالحًا */ }
}
if (secret) fail('المفتاح في config.js سرّي (secret/service_role)! استخدم publishable key أو anon key فقط.');

// --- 2) supabase-js محليًا
const htmlFiles = ['index.html', 'delete-account.html'].map((f) => join(www, f));
const vendorSrc = join(root, 'node_modules/@supabase/supabase-js/dist/umd/supabase.js');
if (existsSync(vendorSrc)) {
  mkdirSync(join(www, 'vendor'), { recursive: true });
  cpSync(vendorSrc, join(www, 'vendor/supabase.js'));
  for (const f of htmlFiles) {
    const s = readFileSync(f, 'utf8');
    writeFileSync(f, s.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@[^"']*\/dist\/umd\/supabase\.js/g, 'vendor/supabase.js'));
  }
  console.log('✔ supabase-js محليًا');
} else {
  const m = 'مكتبة supabase-js غير مثبتة (npm install). سيُحمَّل من CDN ولن يفتح التطبيق بدون إنترنت.';
  strict ? fail(m) : warn(m);
}

// --- 3) خط Cairo محليًا (فشل التنزيل غير قاتل: يبقى الرابط الأصلي)
async function localizeFonts() {
  const pages = ['index.html', 'privacy.html', 'delete-account.html'].map((f) => join(www, f));
  const seen = new Map(); // href -> local css name
  mkdirSync(join(www, 'fonts'), { recursive: true });
  let n = 0;
  for (const p of pages) {
    let s = readFileSync(p, 'utf8');
    const links = [...s.matchAll(/<link[^>]+href="(https:\/\/fonts\.googleapis\.com\/css2?[^"]+)"[^>]*>/g)];
    for (const m of links) {
      const href = m[1].replace(/&amp;/g, '&');
      if (!seen.has(href)) {
        const res = await fetch(href, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36' } });
        if (!res.ok) throw new Error('fonts css ' + res.status);
        let css = await res.text();
        for (const u of new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((x) => x[1]))) {
          const r = await fetch(u);
          if (!r.ok) throw new Error('font file ' + r.status);
          const name = createHash('sha1').update(u).digest('hex').slice(0, 12) + '.woff2';
          writeFileSync(join(www, 'fonts', name), Buffer.from(await r.arrayBuffer()));
          css = css.split(u).join('../fonts/' + name);
          n++;
        }
        const cssName = `fonts-${seen.size + 1}.css`;
        writeFileSync(join(www, 'css', cssName), css);
        seen.set(href, cssName);
      }
      s = s.replace(m[0], `<link rel="stylesheet" href="css/${seen.get(href)}">`);
    }
    s = s.replace(/<link rel="preconnect"[^>]*fonts\.g[^>]*>\s*/g, '');
    writeFileSync(p, s);
  }
  console.log(`✔ الخطوط محليًا (${n} ملف)`);
}
try { await localizeFonts(); } catch (e) { warn('تعذّر تنزيل الخطوط، سيُستخدم Google Fonts عبر الإنترنت: ' + e.message); }

console.log('✔ www جاهز');
