/* =====================================================================
   إعدادات الاتصال بـ Supabase
   - اتركهما فارغين  => الوضع التجريبي (البيانات تُحفظ في متصفح كل زائر فقط).
   - املأهما          => يعمل الموقع بالباك إند الحقيقي (حسابات وبيانات مشتركة).
   المفتاح هنا هو publishable key (يبدأ بـ sb_publishable_) أو anon key القديم (يبدأ بـ eyJ).
   هذا المفتاح عام بطبيعته ومحمي بسياسات RLS. لا تضع هنا أبدًا secret key أو service_role.
   ===================================================================== */
window.MEDRO_CONFIG = {
  SUPABASE_URL: "https://icpqdnyggiknjrcnuive.supabase.co/",
  SUPABASE_ANON_KEY: "sb_publishable_PxQHJiI21VGvNUUVdlK0mg_vpDUVfhS",
  /* تظهر في صفحة سياسة الخصوصية وصفحة حذف الحساب (مطلوبة من Google Play) */
  APP_OPERATOR: "SOCIALDIA AGENCY",
  SUPPORT_EMAIL: ""
};
