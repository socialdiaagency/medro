// MedRo — يُشغَّل بعد `npx cap add android`: أيقونة التطبيق + شاشة البداية + رقم الإصدار + إعدادات أمان.
// المتغيرات: VERSION_NAME (مثل 1.0.0) و VERSION_CODE (رقم صحيح يزيد مع كل نسخة ترفعها لـ Play)
import { cpSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, 'android/app');
const res = join(app, 'src/main/res');
if (!existsSync(app)) { console.error('❌ مجلد android غير موجود. شغّل: npx cap add android'); process.exit(1); }

// أيقونات التطبيق (legacy + adaptive) من resources/android/res
cpSync(join(root, 'resources/android/res'), res, { recursive: true, force: true });

// شاشة البداية: نستبدل كل splash.png في القالب
const splash = join(root, 'resources/android/splash.png');
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n === 'splash.png') cpSync(splash, p, { force: true });
  }
})(res);

// رقم الإصدار
const vn = process.env.VERSION_NAME || '1.0.0';
const vc = parseInt(process.env.VERSION_CODE || '1', 10);
if (!Number.isInteger(vc) || vc < 1) { console.error('❌ VERSION_CODE يجب أن يكون رقمًا صحيحًا ≥ 1'); process.exit(1); }
const gradle = join(app, 'build.gradle');
let g = readFileSync(gradle, 'utf8');
const reC = /versionCode(\s*=?\s*)\d+/, reN = /versionName(\s*=?\s*)"[^"]*"/;
if (!reC.test(g) || !reN.test(g)) { console.error('❌ لم أجد versionCode/versionName في build.gradle (تغيّر قالب Capacitor؟)'); process.exit(1); }
g = g.replace(reC, (_, sep) => `versionCode${sep}${vc}`).replace(reN, (_, sep) => `versionName${sep}"${vn}"`);
writeFileSync(gradle, g);

// منع النسخ الاحتياطي التلقائي لبيانات التطبيق (جلسة الدخول) — مناسب لتطبيق فيه بيانات طبية
const mf = join(app, 'src/main/AndroidManifest.xml');
let m = readFileSync(mf, 'utf8');
m = /android:allowBackup="/.test(m) ? m.replace(/android:allowBackup="[^"]*"/, 'android:allowBackup="false"') : m.replace('<application', '<application android:allowBackup="false"');
// الكاميرا: مطلوبة لـ«الصورة الحيّة» في طلب الانضمام كطبيب (غير إلزامية لتثبيت التطبيق)
if (!/android\.permission\.CAMERA/.test(m)) m = m.replace('<application', '<uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n    <application');
writeFileSync(mf, m);

console.log(`✔ تم تخصيص مشروع أندرويد (الإصدار ${vn} / ${vc})`);
