/* MedRo — app.js (مولَّد من المصدر). الوضع التجريبي المحلي أو Supabase حسب config.js */
const MARK_L="assets/mark-light.png",MARK_D="assets/mark-dark.png";
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lget=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const lset=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
let lang=lget('medro_lang','ar');
let theme=lget('medro_theme',(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
const D={};
var OV={};
const t=(k,...a)=>{const v=OV[k]||D[k];if(!v)return k;let s=v[lang==='ar'?0:1];a.forEach((x,i)=>{s=s.split('{'+i+'}').join(x)});return s};
const L=x=>Array.isArray(x)?x[lang==='ar'?0:1]:(x==null?'':x);
function applyEnv(){const h=document.documentElement;h.setAttribute('lang',lang);h.setAttribute('dir',lang==='ar'?'rtl':'ltr');h.setAttribute('data-theme',theme)}
applyEnv();
Object.assign(D,{
 now:['الآن','now'],mago:['منذ {0} دقيقة','{0}m ago'],hago:['منذ {0} ساعة','{0}h ago'],dago:['منذ {0} يوم','{0}d ago'],
 verified:['حساب موثق','Verified account'],
 r_doctor:['طبيب','Doctor'],r_member:['عضو','Member'],r_business:['نشاط تجاري','Business'],r_student:['طالب طب','Med student'],r_pharmacist:['صيدلي','Pharmacist'],r_nurse:['ممرض/ة','Nurse'],r_dentist:['طبيب أسنان','Dentist'],r_other:['أخرى','Other'],r_admin:['إدارة المنصة','Platform admin'],
 sp_internal:['باطنة','Internal medicine'],sp_surgery:['جراحة','Surgery'],sp_peds:['أطفال','Pediatrics'],sp_ob:['نساء وتوليد','OB/GYN'],sp_ortho:['عظام','Orthopedics'],sp_cardio:['قلب','Cardiology'],sp_neuro:['أعصاب','Neurology'],sp_derm:['جلدية','Dermatology'],sp_radio:['أشعة','Radiology'],sp_anes:['تخدير','Anesthesia'],sp_dental:['أسنان','Dentistry'],sp_pharma:['صيدلة','Pharmacy'],sp_nursing:['تمريض','Nursing'],sp_general:['طب عام','General medicine'],
 tg_q:['سؤال','Question'],tg_case:['حالة سريرية','Clinical case'],tg_info:['معلومة','Insight'],tg_disc:['نقاش','Discussion'],
 gc_edu:['تعليم','Education'],gc_spec:['تخصص','Specialty'],gc_disc:['نقاش عام','General'],gc_jobs:['وظائف','Jobs'],
 jt_full:['دوام كامل','Full-time'],jt_part:['دوام جزئي','Part-time'],jt_contract:['عقد','Contract'],jt_training:['تدريب','Training'],
 cancel:['إلغاء','Cancel'],save:['حفظ','Save'],del:['حذف','Delete'],edit:['تعديل','Edit'],confirm:['تأكيد','Confirm'],close:['إغلاق','Close'],back:['رجوع','Back'],
 login:['تسجيل الدخول','Log in'],signup:['إنشاء حساب','Sign up'],logout:['تسجيل الخروج','Log out'],
 theme:['تبديل المظهر','Toggle theme'],language:['English','العربية']
});
const TAGS=['q','case','info','disc'],ROLES=['member','student','pharmacist','nurse','dentist'],ROLES_ALL=['doctor','member','student','pharmacist','nurse','dentist','other','business'],isBiz=u=>!!u&&u.title==='business',noSpec=u=>!u||u.title==='member'||u.title==='business',rolesFor=u=>isBiz(u)?['business']:ROLES.concat(u&&u.title==='doctor'?['doctor']:[],u&&u.title==='other'?['other']:[]),JTYPES=['full','part','contract','training'];
const SPECS=['internal','surgery','peds','ob','ortho','cardio','neuro','derm','radio','anes','dental','pharma','nursing','general'];
const SPIC={internal:'IM',surgery:'SX',peds:'PD',ob:'OB',ortho:'OR',cardio:'CV',neuro:'NE',derm:'DE',radio:'RX',anes:'AN',dental:'DT',pharma:'Rx',nursing:'RN',general:'GP'};
const IC={
store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-4h4v4"/>',
coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2-.4-2.5-1.2M12 6.5V8m0 8v1.5"/>',
megaphone:'<path d="M4 10v4h3l8 4V6L7 10z"/><path d="M18 9.5a3.5 3.5 0 010 5"/><path d="M7 14l1.5 5h2.5l-1.2-4.2"/>',
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 010 6.8"/><path d="M18 14.3c2.1.6 3.5 2.4 3.5 5.7"/>',
group:'<circle cx="12" cy="7" r="3"/><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M9.5 9.5l-3 5M14.5 9.5l3 5M8 17h8"/>',
job:'<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M3 13h18"/>',
ai:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
shield:'<path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0112 7.6 4.5 4.5 0 0119.5 10c0 5.4-7.5 10-7.5 10z"/>',
bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
comment:'<path d="M4 5h16v11H9l-5 4z"/>',flag:'<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>',
more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',mega:'<path d="M3 11v3l12 5V6z"/><path d="M15 9c2 0 3.5 1.3 3.5 3s-1.5 3-3.5 3"/><path d="M6 15l1 5h3l-1-4"/>',
file:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',pulse:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
send:'<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
out:'<path d="M9 4H5v16h4"/><path d="M16 8l4 4-4 4"/><path d="M20 12H9"/>',chart:'<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/>',
eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',click:'<path d="M6 3l12 8-5.5 1.5L10 18z"/>',
lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',bm:'<path d="M6 3h12v18l-6-4-6 4z"/>',
share:'<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4"/>',
link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
copy:'<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6a2 2 0 012-2h9"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
moon:'<path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
bell:'<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
repost:'<path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 013-3h13"/><path d="M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 01-3 3H4"/>',
stamp:'<path d="M12 3l2.2 2 3-.3 1 2.8 2.6 1.6-.9 2.9 1.1 2.8-2.4 1.9-.5 3-3 .4-2.1 2.2-2.6-1.5-2.9.8-1.3-2.8-2.7-1.4.4-3L3.6 12l1.9-2.4.1-3 3-.6z"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/>'
};
const ic=(n,c='')=>`<svg class="ico ${c}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||''}</svg>`;
const VB=()=>`<svg class="vb" viewBox="0 0 24 24" role="img" aria-label="${esc(t('verified'))}"><title>${esc(t('verified'))}</title><circle cx="12" cy="12" r="11" fill="var(--cyan)"/><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const mark=(c='')=>`<img class="mk mk-l ${c}" src="${MARK_L}" alt="MedRo" draggable="false"><img class="mk mk-d ${c}" src="${MARK_D}" alt="" draggable="false">`;
const wm=()=>`<span class="wm">Med<b>R</b><i>o</i></span>`;
const uid=()=>'x'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const M=60000,H=3600000,Dd=86400000;
function seed(){
  const now=Date.now();
  const mk=(id,name,email,title,spec,place,city,bio,days,x={})=>({id,name,email,pass:'demo123',role:'user',title,spec,place,city,bio,banned:false,joined:now-days*Dd,record:{blood:'',dob:'',gender:'',height:'',weight:'',allergies:'',chronic:'',meds:'',emergency:'',history:[]},verified:false,vreq:null,saved:[],...x});
  const users=[
    mk('u_admin',['إدارة MedRo','MedRo Admin'],'admin@medro.app','admin','general','MedRo',['القاهرة','Cairo'],['الحساب الرسمي لإدارة المنصة.','Official platform administration account.'],90,{role:'admin',pass:'admin123',verified:true}),
    mk('u_demo',['د. سارة منصور','Dr. Sarah Mansour'],'demo@medro.app','doctor','internal',['مستشفى الأمل التخصصي','Al-Amal Specialized Hospital'],['القاهرة','Cairo'],['طبيبة باطنة، مهتمة بالسكري والرعاية الأولية.','Internist focused on diabetes and primary care.'],60),
    mk('u1',['د. أحمد الشرقاوي','Dr. Ahmed El-Sharkawy'],'ahmed@example.com','doctor','cardio',['مركز النيل للقلب','Nile Heart Center'],['الإسكندرية','Alexandria'],['استشاري قلب وقسطرة.','Consultant cardiologist, cath lab.'],70,{verified:true}),
    mk('u2',['نور الهدى حسن','Nour El-Hoda Hassan'],'nour@example.com','student','general',['كلية الطب','Faculty of Medicine'],['بني سويف','Beni Suef'],['طالبة بالفرقة الخامسة، أحب الجراحة.','Fifth-year student who loves surgery.'],40),
    mk('u3',['د. كريم عبد الله','Dr. Karim Abdallah'],'karim@example.com','doctor','ortho',['مستشفى المقطم','Mokattam Hospital'],['القاهرة','Cairo'],['أخصائي عظام وإصابات ملاعب.','Orthopedic and sports injury specialist.'],55,{vreq:{status:'pending',type:'syndicate',license:'EG-48213',note:'',ts:now-3*H}}),
    mk('u4',['منى إبراهيم','Mona Ibrahim'],'mona@example.com','pharmacist','pharma',['صيدلية الشفاء','Al-Shifa Pharmacy'],['الجيزة','Giza'],['صيدلانية إكلينيكية.','Clinical pharmacist.'],35,{verified:true}),
    mk('u5',['د. هبة فاروق','Dr. Heba Farouk'],'heba@example.com','doctor','peds',['عيادة الصغار','Little Ones Clinic'],['المنصورة','Mansoura'],['أخصائية أطفال وحديثي الولادة.','Pediatrician and neonatal specialist.'],48,{verified:true}),
    mk('u6',['محمود سمير','Mahmoud Samir'],'mahmoud@example.com','nurse','nursing',['مستشفى الدلتا','Delta Hospital'],['طنطا','Tanta'],['تمريض عناية مركزة.','ICU nurse.'],20),
    mk('u7',['د. ياسمين عادل','Dr. Yasmin Adel'],'yasmin@example.com','dentist','dental',['عيادة ابتسامة','Smile Clinic'],['الإسكندرية','Alexandria'],['تجميل وزراعة أسنان.','Cosmetic dentistry and implants.'],26),
    mk('u8',['هاني مصطفى','Hany Mostafa'],'hany@example.com','member','general','',['القاهرة','Cairo'],'',5),
    mk('u_biz',['صيدلية النيل','Nile Pharmacy'],'biz@example.com','business','general',['صيدلية','Pharmacy'],['القاهرة','Cairo'],'',12)
  ];
  const p=(id,u,tag,text,min,likes,cms,g,x={})=>({id,uid:u,tag,text,ts:now-min*M,groupId:g||null,likes,comments:(cms||[]).map((c,i)=>({id:id+'c'+i,uid:c[0],text:c[1],ts:now-(min-6*(i+1))*M})),shares:0,shared:null,...x});
  const posts=[
   p('p1','u1','disc',['ما رأيكم في الاعتماد على الفحص بالموجات فوق الصوتية كخطوة أولى لتقييم ألم الصدر في الطوارئ؟ أرحب بتجاربكم العملية.','What is your take on using point-of-care ultrasound as a first step for chest pain in the ED? I would love to hear practical experiences.'],45,['u_demo','u3','u5'],[['u3',['في الحالات المستقرة يفيد كثيرًا بجانب تخطيط القلب.','In stable patients it adds a lot next to the ECG.']],['u_demo',['أوافق، بشرط ربطه بالتاريخ المرضي والفحص الإكلينيكي.','Agreed, as long as it is tied to history and examination.']]]),
   p('p2','u2','q',['سؤال لزملائي: كيف أنظم مذاكرة الباطنة قبل الامتحان العملي؟ هل الأفضل مراجعة الحالات أم المراجع؟','Question for my colleagues: how should I organize internal medicine revision before the practical exam? Cases or textbooks first?'],120,['u_demo'],[['u_demo',['ابدئي بالحالات ثم ارجعي للمرجع لتثبيت المعلومة.','Start with cases, then return to the textbook to consolidate.']]]),
   p('p3','u4','info',['تذكير: تأكدوا دائمًا من تداخلات الأدوية عند صرف أكثر من دواء لكبار السن، وراجعوا الجرعات حسب وظائف الكلى.','Reminder: always check drug interactions when dispensing multiple medicines to older adults, and adjust doses to kidney function.'],200,['u1','u2','u5','u_demo']),
   p('p4','u5','case',['طفل عمره 3 سنوات، حرارة لثلاثة أيام مع طفح جلدي خفيف. ما التشخيصات التفريقية التي تضعونها أولًا؟','A 3-year-old with fever for three days and a mild rash. Which differentials do you rule out first?'],330,['u1'],[['u1',['أضع الأمراض الفيروسية الشائعة أولًا مع استبعاد حمى كاواساكي.','Common viral illnesses first, while excluding Kawasaki disease.']]]),
   p('p5','u3','info',['أهمية التأهيل المبكر بعد إصابات الرباط الصليبي: البدء المبكر بالعلاج الطبيعي يحسن النتائج الوظيفية.','Early rehab after ACL injuries matters: starting physiotherapy early improves functional outcomes.'],520,['u2','u6']),
   p('p6','u6','disc',['كيف تنظمون تسليم المرضى بين الورديات في العناية المركزة؟ نستخدم نموذجًا مكتوبًا ونريد تحسينه.','How do you structure patient handover between ICU shifts? We use a written template and want to improve it.'],700,[],[['u_demo',['نموذج SBAR مفيد جدًا في التسليم.','The SBAR template works very well for handover.']]]),
   p('p7','u8','info',['عرض خاص: أدوية بدون روشتة وبأسعار خرافية، تواصلوا معنا على واتساب الآن واطلبوا بدون استشارة!','Special offer: prescription drugs with no prescription at crazy prices, message us on WhatsApp now and order with no consultation!'],90,[]),
   p('p8','u_demo','q',['هل لدى أحدكم تجربة مع بروتوكول متابعة مرضى السكري النوع الثاني في الرعاية الأولية؟','Has anyone tried a follow-up protocol for type 2 diabetes in primary care?'],260,['u1'],[],'g2')
  ];
  const g=(id,name,desc,cat,owner,mem,days)=>({id,name,desc,cat,owner,members:mem,ts:now-days*Dd});
  const groups=[
   g('g1',['طلاب الطب المصريون','Egyptian Med Students'],['مجتمع لطلاب كليات الطب لتبادل المذاكرة والخبرات.','A community for medical students to share study notes and experience.'],'edu','u2',['u2','u_demo','u3'],30),
   g('g2',['الباطنة والرعاية الأولية','Internal & Primary Care'],['نقاشات الحالات والإرشادات الحديثة في الباطنة.','Case discussions and up-to-date guidelines in internal medicine.'],'spec','u_demo',['u_demo','u1','u5'],50),
   g('g3',['مجتمع الصيادلة','Pharmacists Hub'],['تداخلات دوائية وأخبار المهنة.','Drug interactions and profession news.'],'spec','u4',['u4','u_demo'],20),
   g('g4',['التمريض والرعاية','Nursing & Care'],['خبرات التمريض ومهارات الرعاية المركزة.','Nursing experience and critical-care skills.'],'spec','u6',['u6'],12)
  ];
  const j=(id,title,org,city,spec,type,desc,days)=>({id,title,org,city,spec,type,desc,ts:now-days*Dd,by:'u_admin',applicants:[],saved:[]});
  const jobs=[
   j('j1',['أخصائي باطنة','Internal Medicine Specialist'],['مستشفى الأمل التخصصي','Al-Amal Specialized Hospital'],['القاهرة','Cairo'],'internal','full',['للعمل بالعيادات الخارجية والأقسام الداخلية. خبرة سنتان على الأقل.','Outpatient clinics and inpatient wards. At least two years of experience.'],2),
   j('j2',['صيدلي إكلينيكي','Clinical Pharmacist'],['مجموعة الشفاء الدوائية','Al-Shifa Pharma Group'],['الجيزة','Giza'],'pharma','full',['المتابعة الدوائية للمرضى ومراجعة التداخلات مع الفريق الطبي.','Medication follow-up and interaction review with the care team.'],4),
   j('j3',['ممرض عناية مركزة','ICU Nurse'],['مستشفى الدلتا','Delta Hospital'],['طنطا','Tanta'],'nursing','full',['وحدة العناية المركزة، وردية ليلية.','Intensive care unit, night shift.'],6),
   j('j4',['طبيب أسنان','Dentist'],['عيادة ابتسامة','Smile Clinic'],['الإسكندرية','Alexandria'],'dental','part',['ثلاثة أيام أسبوعيًا بعيادة متكاملة.','Three days a week in a full-service clinic.'],9),
   j('j5',['نائب أطفال (تدريب)','Pediatric Resident (Training)'],['مركز النيل التخصصي','Nile Specialty Center'],['القاهرة','Cairo'],'peds','training',['برنامج تدريبي لحديثي التخرج بإشراف استشاريين.','A training program for new graduates supervised by consultants.'],12)
  ];
  const ad=(id,title,body,cta,adv,tone,v,c)=>({id,title,body,cta,url:'https://example.com',advertiser:adv,tone,active:true,views:v,clicks:c,ts:now-5*Dd});
  const ads=[
   ad('a1',['تحاليل طبية بدقة عالية','High-accuracy lab tests'],['نتائج سريعة وخدمة سحب عينات منزلية في القاهرة الكبرى.','Fast results and home sampling across Greater Cairo.'],['احجز الآن','Book now'],['مختبرات الندى (مثال)','Al-Nada Labs (sample)'],0,320,24),
   ad('a2',['دورات تعليم طبي مستمر','Continuing medical education'],['دورات معتمدة للأطباء وطلاب الطب أونلاين.','Accredited online courses for doctors and students.'],['اعرف المزيد','Learn more'],['أكاديمية ميد ليرن (مثال)','MedLearn Academy (sample)'],1,210,11),
   ad('a3',['مستلزمات طبية للعيادات','Clinic medical supplies'],['أجهزة قياس ومستهلكات بأسعار الجملة.','Diagnostic devices and consumables at wholesale prices.'],['تصفح المنتجات','Browse products'],['نبض للمستلزمات (مثال)','Nabd Supplies (sample)'],2,150,6)
  ];
  const reports=[{id:'r1',postId:'p7',by:'u2',reason:'promo',note:'',ts:now-60*M,status:'open',source:'user'}];
  const friends=[{a:'u1',b:'u_demo',status:'accepted',ts:now-20*Dd},{a:'u_demo',b:'u5',status:'accepted',ts:now-15*Dd},{a:'u3',b:'u_demo',status:'pending',ts:now-2*H},{a:'u4',b:'u_demo',status:'pending',ts:now-5*H}];
  const us=uniSeed();return {v:3,users,posts:posts.concat(us.posts),groups:groups.concat(us.groups),jobs,ads,reports,friends,me:null,settings:{autoRemove:false}};
}
const TIPS=[['اغسل يديك قبل وبعد الفحص، فهي أبسط وسيلة للحد من العدوى.','Wash your hands before and after every exam; it is the simplest infection-control step.'],['اسأل دائمًا عن الأدوية الحالية والحساسية قبل وصف أي دواء جديد.','Always ask about current medicines and allergies before prescribing anything new.'],['النوم الكافي جزء من العلاج، لا تتجاهله في خطة المريض.','Enough sleep is part of treatment; include it in the patient plan.'],['وثّق ما تراه بدقة، فالسجل الجيد هو أفضل مرجع لمن يأتي بعدك.','Document precisely; a good record is the best reference for whoever follows you.']];
function uniSeed(){
  const now=Date.now();
  return {groups:[
   {id:'g5',kind:'uni',verified:true,name:['كلية الطب - جامعة بني سويف الأهلية','Faculty of Medicine – Beni Suef National University'],desc:['المجموعة الرسمية لطلاب الكلية: الجداول والإعلانات والمذاكرة.','Official group for faculty students: schedules, announcements and study.'],cat:'edu',owner:'u_admin',mod:'u2',members:['u2','u_demo'],ts:now-9*Dd},
   {id:'g6',kind:'uni',verified:true,name:['كلية طب قصر العيني - جامعة القاهرة','Kasr Al-Ainy Faculty of Medicine – Cairo University'],desc:['مجتمع طلاب وخريجي قصر العيني لتبادل الخبرات والفرص.','A community of Kasr Al-Ainy students and alumni to share experience and opportunities.'],cat:'edu',owner:'u_admin',mod:'u1',members:['u1','u3'],ts:now-7*Dd}],
   posts:[{id:'p9',uid:'u2',tag:'info',text:['أهلًا بكم في المجموعة الرسمية للكلية. التزموا بالنقاش الأكاديمي المحترم.','Welcome to the faculty\'s official group. Please keep discussions academic and respectful.'],ts:now-3*H,groupId:'g5',likes:['u_demo'],comments:[],shares:0,shared:null}]};
}
var BE=null;
const REAL=!!(window.MEDRO_CONFIG&&MEDRO_CONFIG.SUPABASE_URL&&MEDRO_CONFIG.SUPABASE_ANON_KEY&&window.supabase);
let S;
if(REAL){S={v:3,users:[],posts:[],groups:[],jobs:[],ads:[],reports:[],friends:[],notifs:[],blocks:[],me:null,settings:{autoRemove:false},site:{}}}
else{try{const r=lget('medro_v2','');if(r)S=JSON.parse(r)}catch(e){}
if(!S||!S.users||(S.v!==2&&S.v!==3))S=seed()}
if(S.v===2){const u=uniSeed();if(!S.groups.some(g=>g.kind==='uni')){S.groups=S.groups.concat(u.groups.filter(g=>S.users.some(x=>x.id===g.mod)));S.posts=S.posts.concat(u.posts.filter(p=>S.users.some(x=>x.id===p.uid)&&S.groups.some(g=>g.id===p.groupId)))}S.v=3;lset('medro_v2',JSON.stringify(S))}
if(!S.site)S.site={};
S.site.texts=S.site.texts||{};
S.site.banner=Object.assign({on:false,ar:'',en:'',tone:'info'},S.site.banner||{});
S.site.toggles=Object.assign({ai:true,jobs:true,ads:true,signup:true,userGroups:true,consult:!REAL},S.site.toggles||{});
OV=S.site.texts;
S.groups.forEach(g=>{if(!Array.isArray(g.pending))g.pending=[]});
if(!Array.isArray(S.blocks))S.blocks=[];
if(!Array.isArray(S.notifs))S.notifs=S.friends.filter(f=>f.status==='pending').map((f,i)=>({id:'n_'+i+f.a,to:f.b,from:f.a,type:'friend_req',ref:f.a,ts:f.ts||Date.now(),read:false}));
const save=()=>{if(REAL){if(BE)BE.push()}else lset('medro_v2',JSON.stringify(S))};
const ui={draftImgs:[],busy:false,view:'landing',param:null,q:'',draft:'',draftTag:'q',adminTab:'overview',frTab:'in',pfTab:'posts',jobQ:'',jobSpec:'',jobCity:'',openCm:{},menu:null,chat:[],aiBusy:false,scanBusy:false,seen:new Set(),spec:'all',feedTab:'all',compOpen:false,enter:false,hold:'',txq:'',editLanding:false,ntab:'all'};
const U=id=>S.users.find(u=>u.id===id),me=()=>S.me?U(S.me):null,isAdmin=()=>{const m=me();return !!m&&m.role==='admin'};
function ago(ts){const d=Date.now()-ts;if(d<M)return t('now');if(d<H)return t('mago',Math.floor(d/M));if(d<Dd)return t('hago',Math.floor(d/H));if(d<30*Dd)return t('dago',Math.floor(d/Dd));return fdate(ts)}
const fdate=ts=>new Date(ts).toLocaleDateString(lang==='ar'?'ar-EG-u-nu-latn':'en-GB',{day:'numeric',month:'short',year:'numeric'});
const hue=id=>{let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))%360;return h};
const init=n=>{const s=String(L(n)||'?').replace(/^(د\.|Dr\.?)\s*/i,'').trim();return Array.from(s||'?')[0].toUpperCase()};
const AVC=[['#FFC21A','#FF9500','#3a2a00'],['#F20F5F','#B3138F','#fff'],['#05B2EA','#0A6FD0','#fff'],['#7C5CFF','#4B2FD6','#fff'],['#12B886','#0B7F66','#fff'],['#FF7A45','#E0432A','#fff']];
const avatar=(u,c='')=>{const k=AVC[hue(u?u.id:'x')%AVC.length];const im=u&&u.avatar&&imgOk(u.avatar)?`<img src="${esc(u.avatar)}" alt="" loading="lazy">`:'';return `<div class="av ${c} ${u&&u.verified?'vf':''}" style="background:linear-gradient(135deg,${k[0]},${k[1]});color:${k[2]}">${esc(init(u&&u.name))}${im}</div>`};
const tchip=u=>(!u||u.role==='admin'||u.title==='doctor')?'':`<span class="pill ${u.title==='business'?'yl':'gr'} tchip">${esc(t('r_'+(u.title||'member')))}</span>`;
const nm=u=>esc(L(u.name))+(u.verified?VB():'')+tchip(u);
const sub=u=>esc(t('r_'+u.title))+(u.spec&&u.role!=='admin'&&!noSpec(u)?' · '+esc(t('sp_'+u.spec)):'');
const safeUrl=u=>/^https?:\/\//i.test(u||'')?u:'#';
function fstatus(a,b){const f=S.friends.find(x=>(x.a===a&&x.b===b)||(x.a===b&&x.b===a));if(!f)return 'none';if(f.status==='accepted')return 'friends';return f.a===a?'sent':'received'}
const blkMine=id=>!!S.me&&(S.blocks||[]).some(b=>b.by===S.me&&b.id===id);
const hid=id=>!!S.me&&id!==S.me&&(S.blocks||[]).some(b=>(b.by===S.me&&b.id===id)||(b.by===id&&b.id===S.me));
const friendIds=id=>S.friends.filter(f=>f.status==='accepted'&&(f.a===id||f.b===id)).map(f=>f.a===id?f.b:f.a);
const incoming=id=>S.friends.filter(f=>f.status==='pending'&&f.b===id);
function toast(m){const e=$('#toast');e.innerHTML=`<div class="toast">${esc(m)}</div>`;clearTimeout(toast.h);toast.h=setTimeout(()=>{e.innerHTML=''},2600)}
function openModal(html,wide){$('#modal').innerHTML=`<div class="ov" data-action="ovclose"><div class="modal ${wide?'w':''}" role="dialog" aria-modal="true">${html}</div></div>`;const f=$('#modal input:not([type=checkbox]),#modal textarea,#modal select');if(f)f.focus()}
const closeModal=()=>{$('#modal').innerHTML=''};
const permalink=(k,id)=>{let b='';try{b=location.href.split('#')[0]}catch(e){}return b+'#'+k+'-'+id};
Object.assign(D,{
 proto:['نموذج تجريبي: البيانات محفوظة في متصفحك فقط والأسماء والإعلانات أمثلة.','Prototype: data stays in your browser only; names and ads are samples.'],
 nav_feat:['المزايا','Features'],nav_how:['كيف تعمل','How it works'],nav_join:['انضم','Join'],
 eyebrow:['منصة مجتمع المهنيين الصحيين','The community platform for health professionals'],
 h1:['عالم طبي واحد يجمعك بكل زملائك','One medical world with every colleague in it'],
 lead:['تواصل مع الأطباء والصيادلة وطلاب الطب، ناقش الحالات، اسأل مساعدًا طبيًا ذكيًا، ووثّق حسابك لتكسب ثقة مجتمعك.','Connect with doctors, pharmacists and students, discuss cases, ask a medical AI assistant, and verify your account to earn your community\'s trust.'],
 cta1:['ابدأ مجانًا','Get started free'],proof:['انضم إلى {0} مهنيًا صحيًا','Join {0} health professionals'],
 ch_ai:['مساعد طبي ذكي','AI medical assistant'],ch_ver:['حساب موثق','Verified'],ch_jobs:['وظائف طبية','Medical jobs'],ch_grp:['مجموعات','Groups'],ch_shr:['مشاركة','Share'],
 sec1_t:['كل ما يحتاجه مجتمعك الطبي','Everything your medical community needs'],sec1_p:['أدوات مصممة لإيقاع عملك، لا لإشغالك.','Tools built around the rhythm of clinical work.'],
 f_ai_t:['مساعد طبي بالذكاء الاصطناعي','Medical AI assistant'],f_ai_p:['إجابات منظمة عن الأعراض والأدوية والتحاليل، مع تنبيه واضح عند الحالات الطارئة.','Structured answers on symptoms, drugs and labs, with a clear warning for emergencies.'],
 ai_q:['ما الفرق بين السكري النوع الأول والثاني؟','What is the difference between type 1 and type 2 diabetes?'],
 ai_a:['النوع الأول مناعة ذاتية تدمّر خلايا بيتا فيتوقف الإنسولين، والنوع الثاني مقاومة للإنسولين مع نقص نسبي في إفرازه.','Type 1 is autoimmune destruction of beta cells, so insulin stops. Type 2 is insulin resistance with a relative drop in secretion.'],
 ai_q2:['متى أطلب تحليل HbA1c؟','When should I order an HbA1c?'],ai_a2:['لتشخيص السكري ومتابعة متوسط سكر الدم خلال آخر ثلاثة أشهر تقريبًا.','To diagnose diabetes and track average blood sugar over roughly the last three months.'],
 f_ver_t:['توثيق يراجعه الأدمن','Verification reviewed by admins'],f_ver_p:['اطلب التوثيق وأرسل بيانات ترخيصك، ولا تحصل على الشارة إلا بموافقة فريق الإدارة.','Request verification with your credentials. The badge is only granted when an admin approves.'],
 f_rec_t:['سجل طبي شخصي','Personal medical record'],f_rec_p:['فصيلة الدم والحساسية والأمراض المزمنة وتاريخك المرضي في مكان واحد وخاص بك.','Blood type, allergies, chronic conditions and history in one private place.'],
 v_allergy:['الحساسية: بنسلين','Allergy: penicillin'],v_blood:['الفصيلة','Blood'],
 f_grp_t:['مجموعات عامة','Public groups'],f_grp_p:['أنشئ مجموعة لتخصصك أو دفعتك.','Create a group for your specialty or class.'],
 f_job_t:['وظائف طبية','Medical jobs'],f_job_p:['بحث بالتخصص والمدينة وتقديم بضغطة.','Search by specialty and city, apply in a tap.'],
 f_shr_t:['مشاركة في كل مكان','Share anywhere'],f_shr_p:['شارك أي منشور أو وظيفة أو ملف برابط أو على ملفك أو خارج المنصة.','Share any post, job or profile by link, on your profile or outside the platform.'],
 how_t:['ثلاث خطوات وتبدأ','Up and running in three steps'],
 st1_t:['أنشئ حسابك','Create your account'],st1_p:['اختر صفتك وتخصصك ومدينتك.','Pick your role, specialty and city.'],
 st2_t:['وثّق وابنِ شبكتك','Verify and build your network'],st2_p:['اطلب الشارة وأضف زملاءك وانضم للمجموعات.','Request the badge, add colleagues and join groups.'],
 st3_t:['شارك وتعلّم وتقدّم','Share, learn and apply'],st3_p:['انشر حالاتك واسأل المساعد وتقدّم للوظائف.','Post cases, ask the assistant and apply for jobs.'],
 cta_t:['جاهز تنضم لعالم طبي واحد؟','Ready to join one medical world?'],cta_p:['حسابك مجاني، وتبدأ في أقل من دقيقة.','Your account is free and takes under a minute.'],
 ft_note:['المعلومات في المنصة والمساعد للتوعية فقط ولا تغني عن استشارة الطبيب.','Information on the platform and from the assistant is educational and does not replace a physician.']
});
const LF={u1:{id:'u1',name:['د. أحمد الشرقاوي','Dr. Ahmed El-Sharkawy']},u2:{id:'u2',name:['نور الهدى حسن','Nour El-Hoda Hassan']},u3:{id:'u3',name:['د. كريم عبد الله','Dr. Karim Abdallah']},u4:{id:'u4',name:['منى إبراهيم','Mona Ibrahim']},u5:{id:'u5',name:['د. هبة فاروق','Dr. Heba Farouk']},u6:{id:'u6',name:['محمود سمير','Mahmoud Samir']},u7:{id:'u7',name:['د. ياسمين عادل','Dr. Yasmin Adel']}};
const LFJ=[{title:['أخصائي باطنة','Internal medicine specialist'],org:['مستشفى الأمل','Al-Amal Hospital'],city:['القاهرة','Cairo']},{title:['صيدلي إكلينيكي','Clinical pharmacist'],org:['صيدلية الشفاء','Al-Shifa Pharmacy'],city:['الجيزة','Giza']}];
const LU=id=>U(id)||LF[id]||{id,name:'M'};
function landing(){
  const edit=ui.editLanding&&isAdmin();
  const T=(k,...a)=>edit?`<span class="ed" data-action="edtext" data-k="${k}" title="${esc(t('ed_click'))}">${t(k,...a)}</span>`:t(k,...a);
  const mem=S.stats?S.stats.members:S.users.filter(u=>u.role!=='admin').length;
  const w=t('h1').split(' ');const hl=w.length-2;
  const h1=w.map((x,i)=>`<span class="w" style="--i:${i}">${i>=hl?`<span class="gt">${esc(x)}</span>`:esc(x)}</span>`).join(' ');
  const chip=(ico,col,tx)=>`<div class="chip"><span class="cd" style="background:${col}">${ic(ico)}</span>${esc(tx)}</div>`;
  const cols=['var(--y)','var(--pink)','var(--cyan)'];
  const mq=a=>[...a,...a].map((s,i)=>`<span><i style="background:${cols[i%3]}"></i>${esc(t('sp_'+s))}</span>`).join('');
  const faces=['u1','u5','u4','u2'].map(i=>avatar(LU(i))).join('');
  const rvd=n=>`class="rv" style="--d:${n}"`;
  return `<div class="land" id="land">${edit?`<div class="edbar"><span>${ic('edit')} ${t('ed_bar')}</span><button class="btn s" data-action="edexit">${t('ed_exit')}</button></div>`:''}<div class="proto">${T('proto')}</div>${bannerHtml()}
<header class="nav" id="nav"><div class="wrap"><button class="brand" data-action="home" aria-label="MedRo">${mark()}${wm()}</button>
<nav class="lk"><a data-action="scroll" data-to="feat">${T('nav_feat')}</a><a data-action="scroll" data-to="how">${T('nav_how')}</a></nav><span class="spacer"></span>
${ctrls()}${edit?'':`<button class="btn line s hide-s" data-action="auth" data-mode="login">${T('login')}</button><button class="btn s" data-action="auth" data-mode="signup">${T('signup')}</button>`}</div></header>
<section class="hero" id="hero"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>
<div class="wrap hero-grid"><div>
<span class="eyebrow fu" style="--d:0"><span class="dot"></span>${T('eyebrow')}</span>
<h1 class="h1${edit?' ed':''}"${edit?' data-action="edtext" data-k="h1"':''}>${h1}</h1><p class="lead fu" style="--d:1">${T('lead')}</p>
<div class="cta-row fu" style="--d:2"><button class="btn l" data-action="auth" data-mode="signup">${T('cta1')}</button><button class="btn line l" data-action="auth" data-mode="login">${T('login')}</button></div>
<div class="proof fu" style="--d:3"><div class="stack">${faces}</div><span>${T('proof','<b data-count="'+mem+'">'+mem+'</b>')}</span></div></div>
<div class="art" id="art"><div class="orb o2"><div class="cw" style="--t:14.6%;--l:14.6%">${chip('share','var(--o)',t('ch_shr'))}</div></div>
<div class="orb o1"><div class="cw">${chip('ai','var(--cyan)',t('ch_ai'))}</div><div class="cw" style="--t:100%">${chip('shield','var(--pink)',t('ch_ver'))}</div></div>
<div class="orb o3"><div class="cw" style="--t:50%;--l:0%">${chip('job','var(--y)',t('ch_jobs'))}</div><div class="cw" style="--t:50%;--l:100%">${chip('group','var(--pink)',t('ch_grp'))}</div></div>
<div class="core">${mark()}</div></div></div></section>
<section style="padding:18px 0 6px"><div class="mq"><div class="mq-t">${mq(SPECS)}</div></div><div class="mq rev" style="margin-top:12px"><div class="mq-t">${mq(SPECS.slice().reverse())}</div></div></section>
<section class="sect" id="feat"><div class="wrap"><div class="sh rv"><span class="tgl">One Medical World</span><h2 style="margin-top:14px">${T('sec1_t')}</h2><p>${T('sec1_p')}</p></div>
<div class="bento">
<div class="bt s3 r2 rv"><div class="bi" style="background:var(--cyan)">${ic('ai')}</div><h3>${T('f_ai_t')}</h3><p>${T('f_ai_p')}</p><div class="chatm"><div class="bub q">${T('ai_q')}</div><div class="bub a"><span id="typed" data-text="${esc(t('ai_a'))}"></span><i class="caret"></i></div><div class="bub q">${T('ai_q2')}</div><div class="bub a">${T('ai_a2')}</div></div><div class="chips" style="margin-top:18px">${[1,3,4].map(i=>`<button tabindex="-1" style="pointer-events:none">${t('ai_c'+i)}</button>`).join('')}</div></div>
<div class="bt s3 rv" style="--d:1"><div class="bi" style="background:var(--pink)">${ic('shield')}</div><h3>${T('f_ver_t')}</h3><p>${T('f_ver_p')}</p><div class="stamp"><svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IC.stamp}</svg><b>${esc(L(LU('u1').name))}${VB()}</b></div></div>
<div class="bt s3 rv" style="--d:2"><div class="bi" style="background:var(--o)">${ic('file')}</div><h3>${T('f_rec_t')}</h3><p>${T('f_rec_p')}</p><svg class="ecgm" viewBox="0 0 300 64" preserveAspectRatio="none"><path pathLength="1" d="M0 36H70l8-8 8 8H120l8 6 12-32 14 52 10-26H210l10-10 12 10H300"/></svg><div class="vit"><span>${T('v_blood')} <b>O+</b></span><span>BMI <b>23.4</b></span><span>${T('v_allergy')}</span></div></div>
<div class="bt rv"><div class="bi" style="background:var(--y);color:#3a2a00">${ic('group')}</div><h3>${T('f_grp_t')}</h3><p>${T('f_grp_p')}</p><div class="stack" style="margin-top:16px">${['u3','u6','u7','u2','u4'].map(i=>avatar(LU(i))).join('')}</div></div>
<div class="bt rv" style="--d:1"><div class="bi" style="background:var(--cyan)">${ic('job')}</div><h3>${T('f_job_t')}</h3><p>${T('f_job_p')}</p>${(S.jobs.length?S.jobs:LFJ).slice(0,2).map(j=>`<div class="jb">${ic('pin')}<span class="grow">${esc(L(j.title))}</span><span class="pill gr">${esc(L(j.city))}</span></div>`).join('')}</div>
<div class="bt rv" style="--d:2"><div class="bi" style="background:var(--pink)">${ic('share')}</div><h3>${T('f_shr_t')}</h3><p>${T('f_shr_p')}</p><div class="shr"><span style="background:var(--cyan)">${ic('link')}</span><span style="background:var(--pink)">${ic('repost')}</span><span style="background:var(--o)">${ic('copy')}</span><span style="background:var(--ink)">${ic('send')}</span></div></div>
</div></div></section>
<section class="sect" id="how" style="padding-top:20px"><div class="wrap"><div class="sh rv"><h2>${T('how_t')}</h2></div>
<div class="steps">${[1,2,3].map(n=>`<div class="st rv" style="--d:${n-1}"><div class="n">${n}</div><h3>${T('st'+n+'_t')}</h3><p>${T('st'+n+'_p')}</p></div>`).join('')}</div></div></section>
<section class="sect" style="padding-top:20px"><div class="wrap"><div class="cta rv"><i class="rb"></i><i class="rb"></i><i class="rb"></i><h2>${T('cta_t')}</h2><p>${T('cta_p')}</p><div class="cta-row" style="justify-content:center"><button class="btn l" data-action="auth" data-mode="signup">${T('signup')}</button><button class="btn line l" data-action="auth" data-mode="login">${T('login')}</button></div></div></div></section>
<footer class="ft"><div class="wrap"><div class="brand" style="cursor:default">${mark()}${wm()}</div><span class="tgl">One Medical World</span><span style="max-width:420px">${T('ft_note')}</span></div></footer></div>`;
}
function ctrls(){
  return `<span class="tg2"><button data-action="lang" aria-label="${esc(t('language'))}" title="${esc(t('language'))}">${lang==='ar'?'EN':'ع'}</button><button data-action="theme" aria-label="${esc(t('theme'))}" title="${esc(t('theme'))}">${ic('moon','th-moon')}${ic('sun','th-sun')}</button></span>`;
}
/* landing motion */
let lio=null,cio=null,typeT=null;
function initLanding(){
  const land=$('#land');if(!land)return;
  clearTimeout(typeT);if(lio)lio.disconnect();if(cio)cio.disconnect();
  const vh=window.innerHeight||800;
  if('IntersectionObserver' in window){
    lio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pre');lio.unobserve(e.target)}}),{threshold:.12});
    $$('.rv',land).forEach(el=>{if(el.getBoundingClientRect().top>vh*.92){el.classList.add('pre');lio.observe(el)}});
    setTimeout(()=>$$('.rv.pre').forEach(e=>e.classList.remove('pre')),4500);
    cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,to=+el.dataset.count,t0=performance.now();const st=n=>{const p=Math.min(1,(n-t0)/1300);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)}));
    $$('[data-count]',land).forEach(el=>cio.observe(el));
  }
  const hero=$('#hero'),core=$('#art .core');
  if(hero&&core&&matchMedia('(hover:hover)').matches)hero.onmousemove=e=>{const r=hero.getBoundingClientRect();core.style.setProperty('--rx',((e.clientX-r.left)/r.width-.5)*16);core.style.setProperty('--ry',((e.clientY-r.top)/r.height-.5)*12)};
  $$('.bt',land).forEach(b=>b.onmousemove=e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left)+'px');b.style.setProperty('--my',(e.clientY-r.top)+'px')});
  const ty=$('#typed');
  if(ty){const txt=ty.dataset.text;let i=0;const step=()=>{if(!$('#typed'))return;i++;ty.textContent=txt.slice(0,i);typeT=setTimeout(step,i>=txt.length?5200:34);if(i>txt.length)i=0};typeT=setTimeout(step,1600)}
  onScroll();
}
function onScroll(){
  const p=$('#prog');if(!p)return;
  const h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=window.scrollY||h.scrollTop;
  p.style.transform='scaleX('+(S.me||max<=0?0:Math.min(1,y/max))+')';
  const n=$('#nav');if(n)n.classList.toggle('sc',y>12);
}
window.addEventListener('scroll',onScroll,{passive:true});
Object.assign(D,{
 nav_feed:['الرئيسية','Home'],nav_friends:['الأصدقاء','Friends'],nav_groups:['المجموعات','Groups'],nav_jobs:['الوظائف','Jobs'],nav_ai:['المساعد الطبي','Medical AI'],nav_profile:['ملفي','My profile'],nav_admin:['لوحة الأدمن','Admin'],nav_ai_s:['المساعد','AI'],
 search_ph:['ابحث عن أشخاص أو مجموعات أو وظائف','Search people, groups or jobs'],s_people:['أشخاص','People'],s_groups:['مجموعات','Groups'],s_jobs:['وظائف','Jobs'],s_none:['لا توجد نتائج','No results'],
 comp_ph:['شارك سؤالًا أو حالة أو معلومة مع زملائك','Share a question, case or insight with your colleagues'],comp_note:['لا تنشر بيانات تعريفية عن المرضى.','Never post identifying patient data.'],comp_g:['اكتب للمجموعة','Write to the group'],publish:['نشر','Post'],
 all:['الكل','All'],tab_all:['للجميع','Everyone'],tab_friends:['الأصدقاء','Friends'],tab_ver:['الموثقون','Verified'],
 feed_empty:['لا توجد منشورات هنا بعد. كن أول من ينشر.','Nothing here yet. Be the first to post.'],
 useful:['مفيد','Useful'],comments:['تعليق','Comment'],share:['مشاركة','Share'],saved:['محفوظ','Saved'],savep:['حفظ المنشور','Save post'],
 ph_cm:['اكتب تعليقًا','Write a comment'],send:['إرسال','Send'],del_post:['حذف المنشور','Delete post'],rep_post:['إبلاغ عن محتوى غير ملائم','Report inappropriate content'],copy_link:['نسخ الرابط','Copy link'],
 in_g:['في','in'],ad:['إعلان','Sponsored'],orig_gone:['المنشور الأصلي لم يعد متاحًا.','The original post is no longer available.'],reposted:['أعاد النشر','reposted'],
 tip_t:['نصيحة اليوم','Tip of the day'],know:['قد تعرفهم','People you may know'],no_sug:['لا توجد اقتراحات حاليًا','No suggestions right now'],add:['إضافة','Add'],sug_g:['مجموعات مقترحة','Suggested groups'],join:['انضمام','Join'],members:['{0} عضو','{0} members'],all_joined:['انضممت لكل المجموعات','You joined every group'],
 get_ver:['احصل على شارة التوثيق','Get your verified badge'],get_ver_p:['أرسل بيانات ترخيصك ليراجعها فريق الإدارة.','Send your credentials for the admin team to review.'],get_ver_b:['اطلب التوثيق','Request verification'],
 acct:['الحساب','Account'],
 sh_t:['مشاركة','Share'],sh_prof:['أعد النشر على ملفك','Repost to your profile'],sh_cmt:['أضف تعليقًا (اختياري)','Add a comment (optional)'],sh_do:['إعادة النشر','Repost'],sh_link:['رابط المشاركة','Share link'],sh_copy:['نسخ','Copy'],sh_copied:['تم نسخ الرابط','Link copied'],sh_ext:['أو شارك خارج المنصة','Or share outside the platform'],sh_ok:['تمت إعادة النشر على ملفك','Reposted to your profile'],sh_note:['الرابط يفتح هذا المحتوى على هذا المتصفح لأن بيانات النموذج محلية.','The link opens this content in this browser only, because prototype data is local.'],sh_user:['ملف {0} على MedRo','{0} on MedRo'],sh_job:['وظيفة على MedRo','A job on MedRo'],
 pst:['منشور','Post'],cm_n:['تعليقات','Comments']
});
function go(v,param){ui.view=v;ui.param=param||null;ui.menu=null;ui.q='';ui.pfTab='posts';ui.enter=true;render();window.scrollTo(0,0)}
function render(){
  const m=me();if(m&&m.banned){S.me=null;save()}
  const land=!S.me||(ui.editLanding&&isAdmin());
  $('#root').innerHTML=land?landing():app();
  const col=$('#main');if(col&&ui.enter)col.classList.add('enter');ui.enter=false;
  if(land){const l=$('#land');if(l&&ui.booted)l.classList.add('go');initLanding()}
  observeAds();onScroll();
}
const NAV=[['feed','home'],['friends','users'],['groups','group'],['myads','megaphone'],['jobs','job'],['consult','steth'],['ai','ai']];
const isOn=v=>ui.view===v||(v==='groups'&&ui.view==='group')||(v==='feed'&&ui.view==='post')||(v==='profile'&&ui.view==='profile'&&!ui.param);
function rail(){
  const n=incoming(me().id).length,items=NAV.filter(i=>navOn(i[0])).concat([['profile','user']]);if(isAdmin())items.push(['admin','shield']);
  return `<nav class="rail" aria-label="menu">${items.map(i=>`<button class="${isOn(i[0])?'on':''}" data-action="nav" data-v="${i[0]}"><span class="ri">${ic(i[1])}</span><span>${t('nav_'+i[0])}</span>${navBadge(i[0])?`<span class="bdg">${navBadge(i[0])}</span>`:''}</button>`).join('')}</nav>`;
}
function tbar(){
  const n=incoming(me().id).length;
  const b=(v,i,l)=>`<button class="${isOn(v)?'on':''}" data-action="nav" data-v="${v}">${ic(i)}<span>${t(l)}</span>${navBadge(v)?`<span class="bdg">${navBadge(v)}</span>`:''}</button>`;
  if(isBiz(me()))return `<nav class="tbar" aria-label="menu">${b('feed','home','nav_feed')}${b('groups','group','nav_groups')}<button class="fab" data-action="compose" aria-label="${esc(t('publish'))}">${ic('plus')}</button>${b('myads','megaphone','nav_myads_s')}${b('profile','user','nav_profile')}</nav>`;
  return `<nav class="tbar" aria-label="menu">${b('feed','home','nav_feed')}${b('groups','group','nav_groups')}<button class="fab" data-action="compose" aria-label="${esc(t('publish'))}">${ic('plus')}</button>${csOn()?b('consult','steth','nav_consult_s')+(S.site.toggles.ai?b('ai','ai','nav_ai_s'):b('friends','users','nav_friends')):(S.site.toggles.ai?b('ai','ai','nav_ai_s'):b('friends','users','nav_friends'))+b('profile','user','nav_profile')}</nav>`;
}
function topApp(){
  const m=me(),open=ui.menu==='user',n=incoming(m.id).length;
  const mi=(v,i)=>`<button data-action="nav" data-v="${v}">${ic(i)} ${t('nav_'+v)}</button>`;
  return `<header class="top"><div class="wrap"><button class="brand" data-action="nav" data-v="feed" aria-label="MedRo">${mark()}${wm()}</button>
<div class="srch">${ic('search')}<input id="gsearch" class="in" data-in="search" placeholder="${esc(t('search_ph'))}" value="${esc(ui.q)}" autocomplete="off" aria-label="${esc(t('search_ph'))}"><div id="searchDrop">${searchHtml()}</div></div><span class="spacer"></span>
${ctrls()}<button class="tg2" style="border:0;background:none;padding:0;position:relative" data-action="nav" data-v="notifs" aria-label="${esc(t('nt_title'))}" title="${esc(t('nt_title'))}"><span style="width:38px;height:38px;border-radius:50%;background:${ui.view==='notifs'?'var(--y-s)':'var(--surface2)'};display:grid;place-items:center;color:${ui.view==='notifs'?'var(--o)':'var(--muted)'}">${ic('bell')}</span>${unreadCount()?`<span class="bdg" style="position:absolute;top:-4px;inset-inline-end:-4px">${unreadCount()}</span>`:''}</button>
<div class="um"><button class="brand" data-action="menu" data-id="user" aria-label="${esc(t('acct'))}">${avatar(m,'s')}</button>
${open?`<div class="drop"><div style="padding:8px 12px"><b>${nm(m)}</b><div class="muted sm">${esc(m.email)}</div></div>${mi('profile','user')}${isBiz(m)?mi('myads','megaphone'):mi('friends','users')+(S.site.toggles.jobs?mi('jobs','job'):'')+(csOn()?mi('consult','steth'):'')}${isAdmin()?mi('admin','shield'):''}<button data-action="logout">${ic('out')} ${t('logout')}</button></div>`:''}</div></div></header>`;
}
function searchHtml(){
  const q=ui.q.trim().toLowerCase();if(!q)return '';
  const has=s=>String(s).toLowerCase().includes(q),l=x=>[].concat(x).map(y=>Array.isArray(y)?y.join(' '):y).join(' ');
  const ppl=S.users.filter(u=>!u.banned&&u.role!=='admin'&&!hid(u.id)&&has(l(u.name)+' '+t('sp_'+u.spec)+' '+t('r_'+u.title))).slice(0,4);
  const grp=S.groups.filter(g=>has(l(g.name)+' '+l(g.desc))).slice(0,3);
  const jb=!S.site.toggles.jobs?[]:S.jobs.filter(j=>has(l(j.title)+' '+l(j.org)+' '+t('sp_'+j.spec))).slice(0,3);
  let h='';
  if(ppl.length)h+=`<h5>${t('s_people')}</h5>`+ppl.map(u=>`<button data-action="user" data-id="${u.id}">${avatar(u,'s')}<span>${nm(u)}<small class="muted"> · ${sub(u)}</small></span></button>`).join('');
  if(grp.length)h+=`<h5>${t('s_groups')}</h5>`+grp.map(g=>`<button data-action="group" data-id="${g.id}">${ic('group')}<span>${esc(L(g.name))}${g.verified?VB():''}</span></button>`).join('');
  if(jb.length)h+=`<h5>${t('s_jobs')}</h5>`+jb.map(j=>`<button data-action="nav" data-v="jobs">${ic('job')}<span>${esc(L(j.title))}<small class="muted"> · ${esc(L(j.org))}</small></span></button>`).join('');
  return `<div class="drop">${h||`<div class="empty">${t('s_none')}</div>`}</div>`;
}
function app(){return topApp()+bannerHtml()+`<div class="wrap shell">${rail()}<main class="col" id="main">${main()}</main>${aside()}</div>`+tbar()}
function main(){
  if(isBiz(me())&&['friends','jobs','ai','consult'].includes(ui.view))return feedView();
  switch(ui.view){
    case 'myads':return isBiz(me())?bzView():feedView();
    case 'friends':return friendsView();case 'groups':return groupsView();case 'group':return groupView();case 'jobs':return S.site.toggles.jobs?jobsView():feedView();
    case 'ai':return S.site.toggles.ai?aiView():feedView();case 'profile':return profileView();case 'post':return postView();
    case 'notifs':return notifsView();
    case 'consult':return csOn()?consultView():feedView();
    case 'admin':return isAdmin()?adminView():feedView();
    default:return feedView();
  }
}
function visiblePosts(){
  const m=me(),fr=friendIds(m.id);
  return S.posts.filter(p=>{const a=U(p.uid);if(!a||a.banned||hid(a.id))return false;
    if(p.groupId){const g=S.groups.find(x=>x.id===p.groupId);if(!g||!g.members.includes(m.id))return false}
    if(ui.spec!=='all'&&a.spec!==ui.spec)return false;
    if(ui.feedTab==='friends'&&!(a.id===m.id||fr.includes(a.id)))return false;
    if(ui.feedTab==='verified'&&!a.verified)return false;return true}).sort((a,b)=>b.ts-a.ts);
}
function composer(gid){
  const m=me();
  return `<div class="card comp"><div class="item" style="align-items:flex-start;flex-wrap:nowrap">${avatar(m)}<div class="grow"><textarea id="draft" class="ta" data-in="draft" aria-label="${esc(t('publish'))}" placeholder="${esc(gid?t('comp_g'):t('comp_ph'))}">${esc(ui.draft)}</textarea>
<div class="tpills">${TAGS.map(g=>`<button class="tp t-${g} ${ui.draftTag===g?'on':''}" data-action="dtag" data-id="${g}">${t('tg_'+g)}</button>`).join('')}</div>
<div id="pvbox" class="pv">${prevHtml()}</div>
<div class="sw" style="margin-top:8px;flex-wrap:wrap"><button type="button" class="btn line s" data-action="pickimg">${ic('img')} ${t('add_photo')}</button><span class="muted sm grow">${t('comp_note')} ${t('img_note')}</span><button class="btn s" data-action="publish" data-g="${gid||''}">${ic('send')} ${t('publish')}</button><input id="imgin" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden></div></div></div></div>`;
}
function postHtml(p,o={}){
  const m=me(),a=U(p.uid);if(!a)return '';
  const g=p.groupId?S.groups.find(x=>x.id===p.groupId):null;
  const liked=p.likes.includes(m.id),mine=p.uid===m.id,open=ui.menu==='m'+p.id,cm=o.open||ui.openCm[p.id],sv=m.saved.includes(p.id);
  const cms=p.comments.filter(c=>{const u=U(c.uid);return u&&!u.banned&&!hid(u.id)});
  const og=p.shared?S.posts.find(x=>x.id===p.shared):null,oa=og&&!hid(og.uid)&&U(og.uid);
  const emb=p.shared?(oa?`<div class="emb" data-action="openpost" data-id="${og.id}" style="cursor:pointer"><div class="item" style="flex-wrap:nowrap">${avatar(oa,'s')}<div class="who"><b>${nm(oa)}</b><div class="muted sm">${sub(oa)} · ${ago(og.ts)}</div></div></div><div style="margin-top:8px;overflow-wrap:anywhere">${esc(L(og.text))}</div></div>`:`<div class="emb muted">${t('orig_gone')}</div>`):'';
  const menu=`${mine||isAdmin()||canModGroup(p.groupId)?`<button data-action="delpost" data-id="${p.id}">${ic('trash')} ${t('del_post')}</button>`:''}${mine?'':`<button data-action="report" data-id="${p.id}">${ic('flag')} ${t('rep_post')}</button>`}${mine||a.role==='admin'?'':`<button data-action="blk" data-id="${a.id}">${ic('block')} ${t('blk')}</button>`}<button data-action="share" data-k="post" data-id="${p.id}">${ic('link')} ${t('copy_link')}</button>`;
  return `<article class="card post" id="post-${p.id}"><div class="hd"><span data-action="user" data-id="${a.id}" style="cursor:pointer">${avatar(a)}</span>
<div class="who"><b data-action="user" data-id="${a.id}">${nm(a)}</b><div class="muted sm">${sub(a)} · ${ago(p.ts)}${p.shared?' · '+t('reposted'):''}${g?` · ${t('in_g')} <span style="color:var(--cyan);cursor:pointer;font-weight:700" data-action="group" data-id="${g.id}">${esc(L(g.name))}${g.verified?VB():''}</span>`:''}</div></div>
${p.shared?'':`<span class="tagc t-${p.tag}">${t('tg_'+p.tag)}</span>`}
<div class="menu"><button class="btn line ic s" data-action="menu" data-id="m${p.id}" aria-label="menu">${ic('more')}</button>${open?`<div class="drop">${menu}</div>`:''}</div></div>
${L(p.text)?`<div class="txt">${esc(L(p.text))}</div>`:'<div style="height:8px"></div>'}${postImgs(p)}${emb}
<div class="acts"><button class="${liked?'on':''}" data-action="like" data-id="${p.id}">${ic('bulb',liked?'f':'')} ${p.likes.length||''} ${t('useful')}</button><button data-action="cm" data-id="${p.id}">${ic('comment')} ${cms.length||''} ${t('comments')}</button><button data-action="share" data-k="post" data-id="${p.id}">${ic('share')} ${p.shares||''} ${t('share')}</button><button class="sp ${sv?'on':''}" data-action="savep" data-id="${p.id}" aria-label="${esc(t('savep'))}">${ic('bm',sv?'f':'')}</button></div>
${cm?`${cms.map(c=>{const u=U(c.uid);return `<div class="cm">${avatar(u,'s')}<div class="b"><b class="sm">${nm(u)}</b> <span class="muted sm">${ago(c.ts)}</span><div>${esc(L(c.text))}</div></div>${(c.uid===m.id||isAdmin()||canModGroup(p.groupId))?`<button class="btn line ic s" data-action="delcm" data-p="${p.id}" data-id="${c.id}" aria-label="${esc(t('del'))}">${ic('trash')}</button>`:''}</div>`}).join('')}<div class="cform"><input class="in" data-cin="${p.id}" placeholder="${esc(t('ph_cm'))}" aria-label="${esc(t('ph_cm'))}"><button class="btn s" data-action="addcm" data-id="${p.id}">${t('send')}</button></div>`:''}</article>`;
}
const TONES=['linear-gradient(120deg,#05B2EA,#0A6FD0)','linear-gradient(120deg,#F20F5F,#B3138F)','linear-gradient(120deg,#FFA928,#F2552C)'];
function adHtml(a){
  return `<article class="card ad" data-ad="${a.id}"><div class="bn" style="background:${TONES[a.tone%3]}"><span style="position:relative;z-index:1">${esc(L(a.title))}</span></div><div class="bd"><div class="item" style="margin-bottom:6px"><span class="pill yl">${t('ad')}</span><span class="muted sm grow">${esc(L(a.advertiser))}</span></div><p>${esc(L(a.body))}</p><div style="margin-top:12px"><a class="btn s" href="${esc(safeUrl(a.url))}" target="_blank" rel="noopener noreferrer" data-action="adclick" data-id="${a.id}">${esc(L(a.cta)||'...')}</a></div></div></article>`;
}
function feedList(list){
  const ads=S.site.toggles.ads?S.ads.filter(bzIsLive):[];let out='',k=0;
  list.forEach((p,i)=>{out+=postHtml(p);if(ads.length&&i%3===2){out+=adHtml(ads[k%ads.length]);k++}});
  return out||`<div class="card empty">${t('feed_empty')}</div>`;
}
function spotlight(){
  return `<div class="spot"><button class="${ui.spec==='all'?'on':''}" data-action="spec" data-id="all"><span class="ringw all"><i>${ic('pulse')}</i></span>${t('all')}</button>${SPECS.map(s=>`<button class="${ui.spec===s?'on':''}" data-action="spec" data-id="${s}"><span class="ringw"><i>${SPIC[s]}</i></span>${esc(t('sp_'+s))}</button>`).join('')}</div>`;
}
function feedView(){
  const T=['all','friends','ver'];
  return composer(null)+spotlight()+`<div class="subtabs">${T.map(x=>`<button class="${(ui.feedTab==='all'?'all':ui.feedTab==='friends'?'friends':'ver')===x?'on':''}" data-action="ftab" data-id="${x==='ver'?'verified':x}">${t('tab_'+x)}</button>`).join('')}</div>`+feedList(visiblePosts());
}
function postView(){
  const p0=S.posts.find(x=>x.id===ui.param),pg=p0&&p0.groupId&&S.groups.find(g=>g.id===p0.groupId),p=(pg&&!isAdmin()&&!pg.members.includes(me().id))?null:p0;
  return `<button class="btn line s" style="align-self:flex-start" data-action="nav" data-v="feed">${t('back')}</button>`+(p?postHtml(p,{open:true}):`<div class="card empty">${t('orig_gone')}</div>`);
}
function aside(){
  const m=me(),sg=suggestions().slice(0,4),gs=S.groups.filter(g=>!g.members.includes(m.id)).slice(0,3);
  const TL=tipList(),tip=TL[Math.floor(Date.now()/Dd)%TL.length];
  const vp=!m.verified&&m.role!=='admin'&&!isBiz(m)?`<div class="card" style="text-align:center"><div style="display:grid;place-items:center">${VB().replace('class="vb"','class="vb" style="width:40px;height:40px;margin:0"')}</div><h4 style="margin:8px 0 4px">${t('get_ver')}</h4><p class="muted sm" style="margin-bottom:12px">${t('get_ver_p')}</p><button class="btn s" data-action="vreq">${t('get_ver_b')}</button></div>`:'';
  return `<aside class="aside"><div class="card tip"><h4>${ic('bulb')} ${t('tip_t')}</h4><p>${esc(L(tip))}</p></div>${vp}${isBiz(m)?bzPromo():''}
${isBiz(m)?'':`<div class="card"><h4 style="margin-bottom:12px">${t('know')}</h4><div class="list">${sg.map(u=>`<div class="item" style="flex-wrap:nowrap"><span data-action="user" data-id="${u.id}" style="cursor:pointer">${avatar(u,'s')}</span><div class="grow"><b class="sm">${nm(u)}</b><div class="muted sm">${esc(noSpec(u)?t('r_'+u.title):t('sp_'+u.spec))}</div></div><button class="btn soft s" data-action="fr-send" data-id="${u.id}">${t('add')}</button></div>`).join('')||`<div class="muted sm">${t('no_sug')}</div>`}</div></div>`}
<div class="card"><h4 style="margin-bottom:12px">${t('sug_g')}</h4><div class="list">${gs.map(g=>`<div class="item" style="flex-wrap:nowrap"><div class="grow"><b class="sm" style="cursor:pointer" data-action="group" data-id="${g.id}">${esc(L(g.name))}${g.verified?VB():''}</b><div class="muted sm">${t('members',g.members.length)}</div></div>${joinBtn(g,'btn soft s',t('join'))}</div>`).join('')||`<div class="muted sm">${t('all_joined')}</div>`}</div></div></aside>`;
}
function suggestions(){const m=me();if(isBiz(m))return [];return S.users.filter(u=>u.id!==m.id&&!isBiz(u)&&u.role!=='admin'&&!u.banned&&!hid(u.id)&&fstatus(m.id,u.id)==='none')}
/* share */
function shareModal(kind,id){
  const url=permalink(kind,id);let ttl='',snip='';
  if(kind==='post'){const p=S.posts.find(x=>x.id===id);if(!p)return;const a=U(p.uid);ttl=L(a.name);snip=L(p.text)||'';}
  else if(kind==='user'){const u=U(id);if(!u)return;ttl=t('sh_user',L(u.name));snip=L(u.bio)}
  else{const j=S.jobs.find(x=>x.id===id);if(!j)return;ttl=L(j.title)+' · '+L(j.org);snip=t('sh_job')}
  const txt=(snip.slice(0,160)||ttl)+'\n'+url,e=encodeURIComponent,en=e(txt);
  const ch=[['WhatsApp','https://wa.me/?text='+en,'#25D366'],['Telegram','https://t.me/share/url?url='+e(url)+'&text='+e(snip.slice(0,160)||ttl),'#2AA3DF'],['X','https://twitter.com/intent/tweet?text='+e((snip.slice(0,160)||ttl))+'&url='+e(url),'var(--ink)'],['Facebook','https://www.facebook.com/sharer/sharer.php?u='+e(url),'#1877F2'],['LinkedIn','https://www.linkedin.com/sharing/share-offsite/?url='+e(url),'#0A66C2']];
  openModal(`<h3>${ic('share')} ${t('sh_t')}</h3><div class="emb" style="margin:0 0 14px"><b>${esc(ttl)}</b><div class="muted sm" style="margin-top:4px;overflow-wrap:anywhere">${esc(snip.slice(0,180))}</div></div>
${kind==='post'?`<div class="field"><label for="sh_c">${t('sh_prof')}</label><textarea id="sh_c" class="ta" style="min-height:60px" placeholder="${esc(t('sh_cmt'))}"></textarea></div><button class="btn" style="margin-bottom:14px" data-action="repost" data-id="${id}">${ic('repost')} ${t('sh_do')}</button>`:''}
<div class="field"><label for="sh_u">${t('sh_link')}</label><div class="cform" style="margin:0"><input id="sh_u" class="in" dir="ltr" readonly value="${esc(url)}"><button class="btn cy s" data-action="copyurl">${ic('copy')} ${t('sh_copy')}</button></div></div>
<div class="muted sm" style="margin-bottom:6px">${t('sh_ext')}</div><div class="item" style="gap:8px">${ch.map(c=>`<a class="btn soft s" target="_blank" rel="noopener noreferrer" href="${esc(c[1])}"><i style="width:9px;height:9px;border-radius:50%;background:${c[2]}"></i>${c[0]}</a>`).join('')}</div>
<p class="muted sm" style="margin-top:12px">${t('sh_note')}</p><div class="mfoot"><button class="btn line" data-action="closem">${t('close')}</button></div>`);
}
let io=null;
function observeAds(){
  if(io){io.disconnect();io=null}
  if(!S.me||isAdmin()||!('IntersectionObserver' in window))return;
  io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const id=en.target.dataset.ad;if(ui.seen.has(id))return;ui.seen.add(id);const a=S.ads.find(x=>x.id===id);if(a&&!isAdmin()){if(REAL){if(!(a.owner&&a.owner===S.me)){a.views=(a.views||0)+1;BE.adHit(a.id,'view')}}else{bzHitLocal(a);save()}}}),{threshold:.5});
  $$('[data-ad]').forEach(e=>io.observe(e));
}
Object.assign(D,{
 uni_groups:['مجموعات الجامعات الموثقة','Verified university groups'],other_groups:['مجموعات المجتمع','Community groups'],uni_pill:['مجموعة جامعية','University group'],uni_ver:['مجموعة موثقة','Verified group'],mod:['المشرف','Moderator'],mod_of:['المشرف: {0}','Moderator: {0}'],mod_groups:['يشرف على','Moderates'],g_members:['الأعضاء','Members'],kick:['إزالة','Remove'],kicked:['تمت إزالة العضو من المجموعة','Member removed from the group'],mod_tools_p:['أدوات المشرف: يمكنك حذف منشورات المجموعة وإزالة الأعضاء المخالفين.','Moderator tools: you can delete group posts and remove violating members.'],
 friends:['الأصدقاء','Friends'],fr_in:['الطلبات الواردة ({0})','Requests ({0})'],fr_sug:['اقتراحات','Suggestions'],fr_all:['أصدقائي ({0})','My friends ({0})'],
 fr_none_in:['لا توجد طلبات صداقة جديدة','No new friend requests'],fr_none_all:['لم تضف أصدقاء بعد','No friends yet'],fr_sent:['طلبات أرسلتها','Requests you sent'],
 accept:['قبول','Accept'],reject:['رفض','Decline'],remove:['إزالة','Remove'],unreq:['إلغاء الطلب','Cancel request'],addfr:['إضافة صديق','Add friend'],acc_req:['قبول الطلب','Accept request'],rm_fr:['إزالة من الأصدقاء','Remove friend'],fr_sent_t:['تم إرسال طلب الصداقة','Friend request sent'],fr_now:['أصبحتما صديقين','You are now friends'],
 groups:['المجموعات','Groups'],new_group:['إنشاء مجموعة','Create group'],open:['فتح','Open'],leave:['مغادرة','Leave'],public:['عامة','Public'],g_back:['رجوع للمجموعات','Back to groups'],g_by:['أنشأها {0}','Created by {0}'],g_join_post:['انضم للمجموعة لتتمكن من النشر.','Join the group to post.'],g_empty:['لا توجد منشورات في المجموعة بعد.','No posts in this group yet.'],g_join2:['انضمام للمجموعة','Join group'],
 g_new_t:['إنشاء مجموعة عامة','Create a public group'],g_edit_t:['تعديل المجموعة','Edit group'],g_name:['اسم المجموعة','Group name'],g_desc:['الوصف','Description'],g_cat:['التصنيف','Category'],g_name_err:['اكتب اسم المجموعة.','Enter a group name.'],g_create:['إنشاء','Create'],saved_t:['تم الحفظ','Saved'],joined:['انضممت إلى {0}','You joined {0}'],
 jobs:['الوظائف الطبية','Medical jobs'],post_job:['نشر وظيفة','Post a job'],job_q:['ابحث بالمسمى أو الجهة','Search title or employer'],all_spec:['كل التخصصات','All specialties'],all_city:['كل المدن','All cities'],job_none:['لا توجد وظائف مطابقة لبحثك.','No jobs match your search.'],apply:['قدّم الآن','Apply now'],applied:['تم التقديم','Applied'],savej:['حفظ','Save'],savedj:['محفوظة','Saved'],apply_ok:['تم إرسال طلب التقديم','Application sent'],
 j_title:['المسمى الوظيفي','Job title'],j_org:['الجهة','Employer'],j_city:['المدينة','City'],j_spec:['التخصص','Specialty'],j_type:['النوع','Type'],j_desc:['الوصف','Description'],j_err:['المسمى والجهة مطلوبان.','Title and employer are required.'],j_unset:['غير محدد','Unspecified'],
 ai_t:['المساعد الطبي','Medical assistant'],ai_badge:['بالذكاء الاصطناعي','AI-powered'],ai_hi:['مرحبًا، أنا المساعد الطبي في MedRo. اسألني عن الأعراض أو الأدوية أو التحاليل أو الإرشادات، وسأجيبك بمعلومات تثقيفية. للحالات الطارئة توجه لأقرب طوارئ.','Hi, I am the MedRo medical assistant. Ask me about symptoms, medicines, lab tests or guidelines and I will reply with educational information. In an emergency, go to the nearest ER.'],
 ai_ph:['اكتب سؤالك الطبي','Type your medical question'],ai_disc:['للتوعية فقط ولا يغني عن الطبيب. في الطوارئ توجه لأقرب مستشفى.','Educational only; not a substitute for a physician. In an emergency go to the nearest hospital.'],ai_think:['جارٍ التفكير','Thinking'],
 ai_c1:['ما أسباب نقص فيتامين د؟','What causes vitamin D deficiency?'],ai_c2:['اشرح الفرق بين السكري النوع الأول والثاني','Explain type 1 vs type 2 diabetes'],ai_c3:['ما التداخلات الدوائية الشائعة مع الوارفارين؟','Common drug interactions with warfarin?'],ai_c4:['كيف أقرأ تحليل صورة الدم CBC؟','How do I read a CBC?'],
 ai_off:['المساعد الطبي غير متاح في هذا العرض. افتح الصفحة داخل Claude وامنحها الإذن لاستخدامه.','The assistant is not available in this view. Open the page inside Claude and allow it.'],ai_deny:['لم يتم السماح باستخدام المساعد. اسمح به من نافذة الإذن ثم أعد المحاولة.','Access was not allowed. Allow it in the permission prompt and try again.'],ai_rate:['عدد الطلبات كبير الآن، حاول بعد قليل.','Too many requests right now, try again shortly.'],ai_fail:['تعذر الحصول على إجابة الآن، حاول مرة أخرى.','Could not get an answer, please try again.'],ai_cut:['(انقطعت الإجابة)','(answer interrupted)'],
 p_edit:['تعديل الملف','Edit profile'],p_posts:['المنشورات','Posts'],p_saved:['المحفوظات','Saved'],p_rec:['السجل الطبي','Medical record'],p_nop:['لا توجد منشورات بعد.','No posts yet.'],p_nosv:['لا توجد منشورات محفوظة.','No saved posts.'],p_work:['مكان العمل أو الدراسة','Workplace or school'],p_city:['المدينة','City'],p_fr:['الأصدقاء','Friends'],p_join:['انضم','Joined'],p_name:['الاسم','Name'],p_role:['الصفة','Role'],p_bio:['نبذة','About'],p_done:['تم حفظ الملف','Profile saved'],
 rec_basic:['البيانات الطبية الأساسية','Basic medical data'],rec_priv:['هذا السجل خاص بك ولا يظهر للمستخدمين الآخرين ولا للإدارة. هو مرجع شخصي ولا يغني عن ملفك لدى الطبيب.','This record is private to you: other users and admins cannot see it. It is a personal reference, not a substitute for your doctor\'s file.'],
 blood:['فصيلة الدم','Blood type'],age:['العمر','Age'],gender:['النوع','Gender'],height:['الطول','Height'],weight:['الوزن','Weight'],bmi:['مؤشر كتلة الجسم','BMI'],allergies:['الحساسية','Allergies'],chronic:['الأمراض المزمنة','Chronic conditions'],meds:['الأدوية الحالية','Current medicines'],emerg:['جهة اتصال للطوارئ','Emergency contact'],unset:['غير مسجل','Not set'],yrs:['{0} سنة','{0} yrs'],male:['ذكر','Male'],female:['أنثى','Female'],
 hist:['التاريخ المرضي','Medical history'],add_hist:['إضافة سجل','Add entry'],no_hist:['لا توجد سجلات. أضف تشخيصًا أو عملية أو تحليلًا لتكوّن تاريخك المرضي.','No entries yet. Add a diagnosis, surgery or lab result to build your history.'],
 rec_edit:['تعديل البيانات الطبية','Edit medical data'],dob:['تاريخ الميلاد','Date of birth'],h_cm:['الطول (سم)','Height (cm)'],w_kg:['الوزن (كجم)','Weight (kg)'],rec_ok:['تم حفظ السجل الطبي','Medical record saved'],none_sel:['غير محدد','Not set'],
 h_add_t:['إضافة للتاريخ المرضي','Add to medical history'],h_date:['التاريخ','Date'],h_title:['العنوان','Title'],h_title_ph:['مثال: استئصال الزائدة الدودية','e.g. Appendectomy'],h_notes:['ملاحظات','Notes'],h_err:['اكتب عنوانًا للسجل.','Enter a title.'],h_added:['تمت الإضافة','Added'],
 ht_dx:['تشخيص','Diagnosis'],ht_surg:['عملية جراحية','Surgery'],ht_lab:['تحليل','Lab test'],ht_img:['أشعة','Imaging'],ht_vac:['تطعيم','Vaccination'],ht_adm:['دخول مستشفى','Hospital stay'],ht_oth:['أخرى','Other'],
 v_title:['توثيق الحساب','Account verification'],v_p:['أرسل بيانات ترخيصك. لا تُمنح الشارة إلا بعد مراجعة الإدارة والموافقة عليها.','Submit your credentials. The badge is only granted after an admin reviews and approves.'],
 v_type:['نوع الوثيقة','Credential type'],vt_syndicate:['كارنيه النقابة','Syndicate card'],vt_license:['ترخيص مزاولة المهنة','Practice license'],vt_student:['كارنيه كلية','Student ID'],vt_other:['وثيقة أخرى','Other'],v_num:['رقم الوثيقة','Credential number'],v_note:['ملاحظات للإدارة','Note to admins'],v_send:['إرسال الطلب','Submit request'],v_err:['اكتب رقم الوثيقة.','Enter the credential number.'],v_sent:['تم إرسال طلب التوثيق للإدارة','Verification request sent to admins'],
 vs_ok:['حسابك موثق','Your account is verified'],vs_pend:['طلب التوثيق قيد المراجعة من الإدارة.','Your verification request is under admin review.'],vs_rej:['تم رفض طلب التوثيق. يمكنك إرسال طلب جديد ببيانات صحيحة.','Your request was declined. You can submit a new one with correct details.'],vs_none:['حسابك غير موثق بعد.','Your account is not verified yet.'],v_resend:['إرسال طلب جديد','Submit a new request']
});
function personRow(u,btns){
  return `<div class="card item"><span data-action="user" data-id="${u.id}" style="cursor:pointer">${avatar(u)}</span><div class="grow"><b data-action="user" data-id="${u.id}" style="cursor:pointer">${nm(u)}</b><div class="muted sm">${sub(u)}${u.city?' · '+esc(L(u.city)):''}</div></div>${btns}</div>`;
}
function friendsView(){
  const m=me(),inc=incoming(m.id),all=friendIds(m.id).map(U).filter(u=>u&&!u.banned),sg=suggestions();
  const tabs=[['in',t('fr_in',inc.length)],['sug',t('fr_sug')],['all',t('fr_all',all.length)]];
  let body='';
  if(ui.frTab==='in')body=inc.length?inc.map(f=>{const u=U(f.a);return u?personRow(u,`<button class="btn s" data-action="fr-accept" data-id="${u.id}">${t('accept')}</button><button class="btn line s" data-action="fr-reject" data-id="${u.id}">${t('reject')}</button>`):''}).join(''):`<div class="card empty">${t('fr_none_in')}</div>`;
  if(ui.frTab==='sug')body=sg.length?sg.map(u=>personRow(u,`<button class="btn s" data-action="fr-send" data-id="${u.id}">${ic('plus')} ${t('addfr')}</button>`)).join(''):`<div class="card empty">${t('no_sug')}</div>`;
  if(ui.frTab==='all'){
    const sent=S.friends.filter(f=>f.status==='pending'&&f.a===m.id).map(f=>U(f.b)).filter(Boolean);
    body=(all.length?all.map(u=>personRow(u,`<button class="btn line s" data-action="fr-remove" data-id="${u.id}">${t('remove')}</button>`)).join(''):`<div class="card empty">${t('fr_none_all')}</div>`)+(sent.length?`<h4>${t('fr_sent')}</h4>`+sent.map(u=>personRow(u,`<button class="btn line s" data-action="fr-remove" data-id="${u.id}">${t('unreq')}</button>`)).join(''):'');
  }
  return `<h2>${t('friends')}</h2><div class="subtabs">${tabs.map(x=>`<button class="${ui.frTab===x[0]?'on':''}" data-action="frtab" data-id="${x[0]}">${x[1]}</button>`).join('')}</div>${body}`;
}
const canModGroup=gid=>{const g=gid&&S.groups.find(x=>x.id===gid);return !!g&&!!S.me&&g.mod===S.me};
function groupCard(g){
  const m=me(),j=g.members.includes(m.id),uni=g.kind==='uni',md=g.mod&&U(g.mod);
  return `<div class="card gcard ${uni?'uni':''}">${uni?`<span class="pill">${ic('stamp')} ${t('uni_pill')}</span>`:`<span class="pill gr">${t('gc_'+g.cat)}</span>`}<h3 style="margin:10px 0 4px;cursor:pointer" data-action="group" data-id="${g.id}">${esc(L(g.name))}${g.verified?VB():''}</h3><p class="muted sm" style="min-height:46px">${esc(L(g.desc))}</p>${md?`<div class="muted sm" style="margin-top:6px">${ic('shield')} ${t('mod_of',esc(L(md.name)))}</div>`:''}
<div class="item" style="margin-top:12px"><span class="muted sm grow">${t('members',g.members.length)}</span>${g.mod===m.id?`<span class="pill pk">${t('mod')}</span>`:j?`<button class="btn line s" data-action="leave" data-id="${g.id}">${t('leave')}</button>`:joinBtn(g,'btn s',t('join'))}<button class="btn soft s" data-action="group" data-id="${g.id}">${t('open')}</button></div></div>`;
}
function groupsView(){
  const uni=S.groups.filter(g=>g.kind==='uni'),rest=S.groups.filter(g=>g.kind!=='uni');
  return `<div class="item"><h2 class="grow">${t('groups')}</h2>${isAdmin()?`<button class="btn cy" data-action="newuni">${ic('stamp')} ${t('new_uni')}</button>`:''}${isAdmin()||(S.site.toggles.userGroups&&!isBiz(me()))?`<button class="btn" data-action="newgroup">${ic('plus')} ${t('new_group')}</button>`:''}</div>
${uni.length?`<h4>${t('uni_groups')}</h4><div class="g2">${uni.map(groupCard).join('')}</div>`:''}<h4>${t('other_groups')}</h4><div class="g2">${rest.map(groupCard).join('')}</div>`;
}
function groupView(){
  const m=me(),g=S.groups.find(x=>x.id===ui.param);if(!g)return groupsView();
  const uni=g.kind==='uni',md=g.mod?U(g.mod):null,canMod=isAdmin()||g.mod===m.id,j=g.members.includes(m.id);
  const list=S.posts.filter(p=>p.groupId===g.id&&U(p.uid)&&!U(p.uid).banned).sort((a,b)=>b.ts-a.ts);
  const mem=g.members.map(U).filter(u=>u&&!u.banned&&!hid(u.id));
  const join=g.mod===m.id?`<span class="pill pk">${t('mod')}</span>`:j?`<button class="btn line s" data-action="leave" data-id="${g.id}">${t('leave')}</button>`:joinBtn(g,'btn s',t('g_join2'));
  const locked=uni&&!j&&!isAdmin()&&g.mod!==m.id;
  const pend=canMod?pendList(g):[];
  const reqCard=pend.length?`<div class="card"><h4 style="margin-bottom:12px">${t('jr_title')} (${pend.length})</h4><div class="list">${pend.map(u=>`<div class="item" style="flex-wrap:nowrap">${avatar(u,'s')}<div class="grow"><b class="sm">${nm(u)}</b><div class="muted sm">${sub(u)}</div></div><button class="btn s" data-action="jr_ok" data-g="${g.id}" data-id="${u.id}">${t('accept')}</button><button class="btn line s" data-action="jr_no" data-g="${g.id}" data-id="${u.id}">${t('reject')}</button></div>`).join('')}</div></div>`:'';
  const memCard=locked?'':`<div class="card"><h4 style="margin-bottom:12px">${t('g_members')} (${mem.length})</h4>${canMod?`<p class="muted sm" style="margin-bottom:12px">${ic('shield')} ${t('mod_tools_p')}</p><div class="list">${mem.map(u=>`<div class="item" style="flex-wrap:nowrap">${avatar(u,'s')}<div class="grow"><b class="sm">${nm(u)}</b><div class="muted sm">${sub(u)}</div></div>${u.id===g.mod?`<span class="pill pk">${t('mod')}</span>`:u.id===m.id?'':`<button class="btn line s" data-action="g-kick" data-g="${g.id}" data-id="${u.id}">${t('kick')}</button>`}</div>`).join('')}</div>`:`<div class="stack">${mem.slice(0,10).map(u=>avatar(u)).join('')}</div>`}</div>`;
  return `<button class="btn line s" style="align-self:flex-start" data-action="nav" data-v="groups">${t('g_back')}</button>
<div class="card gcard ${uni?'uni':''}"><span class="pill ${uni?'':'gr'}">${uni?ic('stamp')+' '+t('uni_pill'):t('gc_'+g.cat)+' · '+t('public')}</span><h2 style="margin:10px 0 4px">${esc(L(g.name))}${g.verified?VB().replace('class="vb"','class="vb" style="width:24px;height:24px"'):''}</h2><p class="muted">${esc(L(g.desc))}</p>
<div class="item" style="margin-top:14px"><span class="muted sm grow">${t('members',g.members.length)}${uni?'':' · '+t('g_by',esc(L((U(g.owner)||{}).name)))}</span>${join}</div>
${uni&&md?`<div class="item" style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line)"><span data-action="user" data-id="${md.id}" style="cursor:pointer">${avatar(md)}</span><div class="grow"><div class="muted sm">${t('mod')}</div><b>${nm(md)}</b><div class="muted sm">${sub(md)}</div></div><span class="pill">${ic('shield')} ${t('uni_ver')}</span></div>`:''}</div>
${locked?`<div class="card empty">${ic('shield')} ${t('jr_locked')}</div>`:`${reqCard}${j||isAdmin()?composer(g.id):`<div class="card empty">${t('g_join_post')}</div>`}${list.map(p=>postHtml(p)).join('')||`<div class="card empty">${t('g_empty')}</div>`}${memCard}`}`;
}
function jobsList(){
  const m=me(),q=ui.jobQ.trim().toLowerCase();
  const l=S.jobs.filter(j=>(!q||([L(j.title),L(j.org),L(j.desc)].join(' ')).toLowerCase().includes(q))&&(!ui.jobSpec||j.spec===ui.jobSpec)&&(!ui.jobCity||L(j.city)===ui.jobCity)).sort((a,b)=>b.ts-a.ts);
  return l.map(j=>{const ap=j.applicants.includes(m.id),sv=j.saved.includes(m.id);
    return `<div class="card"><div class="item"><div class="grow"><h3>${esc(L(j.title))}</h3><div class="muted sm">${esc(L(j.org))} · ${ic('pin')} ${esc(L(j.city))} · ${ago(j.ts)}</div></div><span class="pill">${esc(t('sp_'+j.spec))}</span><span class="pill gr">${t('jt_'+j.type)}</span></div>
<p style="margin:12px 0">${esc(L(j.desc))}</p><div class="item"><button class="btn s" data-action="apply" data-id="${j.id}" ${ap?'disabled':''}>${ap?t('applied'):t('apply')}</button><button class="btn line s" data-action="savejob" data-id="${j.id}">${ic('bm',sv?'f':'')} ${sv?t('savedj'):t('savej')}</button><button class="btn soft s" data-action="share" data-k="job" data-id="${j.id}">${ic('share')} ${t('share')}</button></div></div>`}).join('')||`<div class="card empty">${t('job_none')}</div>`;
}
function jobsView(){
  const cities=[...new Set(S.jobs.map(j=>L(j.city)))];
  return `<div class="item"><h2 class="grow">${t('jobs')}</h2><button class="btn" data-action="newjob">${ic('plus')} ${t('post_job')}</button></div>
<div class="card"><div class="row"><div class="field" style="margin:0;flex:2 1 200px"><input class="in" data-in="jobQ" placeholder="${esc(t('job_q'))}" value="${esc(ui.jobQ)}" aria-label="${esc(t('job_q'))}"></div>
<div class="field" style="margin:0"><select class="sel" data-in="jobSpec" aria-label="${esc(t('j_spec'))}"><option value="">${t('all_spec')}</option>${SPECS.map(s=>`<option value="${s}" ${ui.jobSpec===s?'selected':''}>${esc(t('sp_'+s))}</option>`).join('')}</select></div>
<div class="field" style="margin:0"><select class="sel" data-in="jobCity" aria-label="${esc(t('j_city'))}"><option value="">${t('all_city')}</option>${cities.map(s=>`<option ${ui.jobCity===s?'selected':''}>${esc(s)}</option>`).join('')}</select></div></div></div>
<div class="list" id="jobsList">${jobsList()}</div>`;
}
function jobModal(j){
  j=j||{title:'',org:'',city:'',spec:'general',type:'full',desc:''};
  openModal(`<h3>${t('post_job')}</h3><div class="field"><label for="j_title">${t('j_title')}</label><input id="j_title" class="in" value="${esc(L(j.title))}"></div>
<div class="field"><label for="j_org">${t('j_org')}</label><input id="j_org" class="in" value="${esc(L(j.org))}"></div>
<div class="row"><div class="field"><label for="j_city">${t('j_city')}</label><input id="j_city" class="in" value="${esc(L(j.city))}"></div><div class="field"><label for="j_spec">${t('j_spec')}</label><select id="j_spec" class="sel">${SPECS.map(s=>`<option value="${s}" ${j.spec===s?'selected':''}>${esc(t('sp_'+s))}</option>`).join('')}</select></div><div class="field"><label for="j_type">${t('j_type')}</label><select id="j_type" class="sel">${JTYPES.map(s=>`<option value="${s}" ${j.type===s?'selected':''}>${t('jt_'+s)}</option>`).join('')}</select></div></div>
<div class="field"><label for="j_desc">${t('j_desc')}</label><textarea id="j_desc" class="ta">${esc(L(j.desc))}</textarea></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="createjob" data-id="${j.id||''}">${j.id?t('save'):t('publish')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
/* profile */
function vStatus(u){
  if(u.verified)return `<div class="vbanner">${VB().replace('class="vb"','class="vb" style="width:26px;height:26px;margin:0"')}<b>${t('vs_ok')}</b></div>`;
  const r=u.vreq;
  if(r&&r.status==='pending')return `<div class="vbanner pend">${ic('lock')}<span>${t('vs_pend')}</span></div>`;
  if(r&&r.status==='rejected')return `<div class="vbanner rej">${ic('flag')}<span class="grow">${t('vs_rej')}</span><button class="btn s" data-action="vreq">${t('v_resend')}</button></div>`;
  return `<div class="vbanner pend">${ic('shield')}<span class="grow">${t('vs_none')}</span><button class="btn s" data-action="vreq">${t('get_ver_b')}</button></div>`;
}
function profileView(){
  const m=me(),u=ui.param?U(ui.param):m;if(!u)return feedView();
  const self=u.id===m.id,st=fstatus(m.id,u.id);
  if(!self&&hid(u.id))return blockedProfile(u);
  let act='';
  if(self)act=`<button class="btn line s" data-action="editprofile">${ic('edit')} ${t('p_edit')}</button>`;
  else if(isBiz(m)||isBiz(u))act='';
  else if(st==='none')act=`<button class="btn s" data-action="fr-send" data-id="${u.id}">${ic('plus')} ${t('addfr')}</button>`;
  else if(st==='sent')act=`<button class="btn line s" data-action="fr-remove" data-id="${u.id}">${t('unreq')}</button>`;
  else if(st==='received')act=`<button class="btn s" data-action="fr-accept" data-id="${u.id}">${t('acc_req')}</button>`;
  else act=`<button class="btn line s" data-action="fr-remove" data-id="${u.id}">${t('rm_fr')}</button>`;
  act+=` <button class="btn soft s" data-action="share" data-k="user" data-id="${u.id}">${ic('share')} ${t('share')}</button>`;
  if(!self&&u.role!=='admin')act+=` <button class="btn soft s" data-action="blk" data-id="${u.id}">${ic('block')} ${t('blk')}</button>`;
  const tab=self?ui.pfTab:'posts';
  const posts=S.posts.filter(p=>p.uid===u.id&&(!p.groupId||S.groups.some(g=>g.id===p.groupId&&g.members.includes(m.id)))).sort((a,b)=>b.ts-a.ts);
  let body;
  if(tab==='record'&&self&&!isBiz(u))body=recordView(u);
  else if(tab==='saved'&&self){const sv=S.posts.filter(p=>u.saved.includes(p.id));body=sv.map(p=>postHtml(p)).join('')||`<div class="card empty">${t('p_nosv')}</div>`}
  else body=posts.map(p=>postHtml(p)).join('')||`<div class="card empty">${t('p_nop')}</div>`;
  const ecg='<svg viewBox="0 0 600 60" preserveAspectRatio="none"><path d="M0 34H150l8-8 8 8H250l8 6 12-30 14 50 10-26H400l10-10 12 10H600"/></svg>';
  return `<div class="card"><div class="cover">${ecg}</div><div class="pf">${avatar(u,'xl')}<div class="grow" style="padding-bottom:6px"><h2 style="font-size:26px">${nm(u)}</h2><div class="muted">${sub(u)}</div></div><div style="padding-bottom:6px">${act}</div></div>
${L(u.bio)?`<p style="margin-top:14px">${esc(L(u.bio))}</p>`:''}
<div class="kv" style="margin-top:14px">${L(u.place)?`<div><small>${t('p_work')}</small><b>${esc(L(u.place))}</b></div>`:''}${L(u.city)?`<div><small>${t('p_city')}</small><b>${esc(L(u.city))}</b></div>`:''}${S.groups.some(g=>g.mod===u.id)?`<div><small>${t('mod_groups')}</small><b>${S.groups.filter(g=>g.mod===u.id).map(g=>esc(L(g.name))).join(' · ')}</b></div>`:''}<div><small>${t('p_fr')}</small><b>${friendIds(u.id).length}</b></div><div><small>${t('p_join')}</small><b>${fdate(u.joined)}</b></div></div>
${self&&u.role!=='admin'&&!isBiz(u)?`<div style="margin-top:14px">${vStatus(u)}</div>`:''}</div>
${self?`<div class="subtabs"><button class="${tab==='posts'?'on':''}" data-action="pftab" data-id="posts">${t('p_posts')}</button><button class="${tab==='saved'?'on':''}" data-action="pftab" data-id="saved">${t('p_saved')}</button>${isBiz(u)?'':`<button class="${tab==='record'?'on':''}" data-action="pftab" data-id="record">${ic('lock')} ${t('p_rec')}</button>`}</div>`:''}${body}`;
}
function ageOf(dob){if(!dob)return '';const d=new Date(dob);if(isNaN(d))return '';const n=new Date();let a=n.getFullYear()-d.getFullYear();const mo=n.getMonth()-d.getMonth();if(mo<0||(mo===0&&n.getDate()<d.getDate()))a--;return a>=0?a:''}
function recordView(u){
  const r=u.record,h=parseFloat(r.height),w=parseFloat(r.weight),bmi=h>0&&w>0?(w/Math.pow(h/100,2)).toFixed(1):'';
  const blk=(l,v)=>`<div><small>${l}</small><b>${v?esc(v):`<span class="muted">${t('unset')}</span>`}</b></div>`;
  const hist=(r.history||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const gdr=r.gender==='m'?t('male'):r.gender==='f'?t('female'):'';
  return `<div class="card"><div class="item"><h3 class="grow">${t('rec_basic')}</h3><button class="btn s" data-action="editrec">${ic('edit')} ${t('edit')}</button></div>
<p class="muted sm" style="margin:6px 0 14px">${ic('lock')} ${t('rec_priv')}</p>
<div class="kv">${blk(t('blood'),r.blood)}${blk(t('age'),ageOf(r.dob)!==''?t('yrs',ageOf(r.dob)):'')}${blk(t('gender'),gdr)}${blk(t('height'),r.height?r.height+' cm':'')}${blk(t('weight'),r.weight?r.weight+' kg':'')}${blk(t('bmi'),bmi)}</div>
<div class="kv" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${blk(t('allergies'),r.allergies)}${blk(t('chronic'),r.chronic)}${blk(t('meds'),r.meds)}${blk(t('emerg'),r.emergency)}</div></div>
<div class="card"><div class="item"><h3 class="grow">${t('hist')}</h3><button class="btn s" data-action="addhist">${ic('plus')} ${t('add_hist')}</button></div>
${hist.length?`<div class="tl" style="margin-top:18px">${hist.map(e=>`<div class="e"><div class="item"><b class="grow">${esc(e.title)}</b><span class="pill gr">${esc(t('ht_'+e.type))}</span><button class="btn line ic s" data-action="delhist" data-id="${e.id}" aria-label="${esc(t('del'))}">${ic('trash')}</button></div><div class="muted sm">${esc(e.date)}</div>${e.notes?`<div class="sm" style="margin-top:2px">${esc(e.notes)}</div>`:''}</div>`).join('')}</div>`:`<div class="empty">${t('no_hist')}</div>`}</div>`;
}
function recModal(){
  const r=me().record,BL=['','A+','A-','B+','B-','AB+','AB-','O+','O-'];
  openModal(`<h3>${t('rec_edit')}</h3><div class="row"><div class="field"><label for="r_blood">${t('blood')}</label><select id="r_blood" class="sel">${BL.map(b=>`<option value="${b}" ${r.blood===b?'selected':''}>${b||t('none_sel')}</option>`).join('')}</select></div>
<div class="field"><label for="r_gender">${t('gender')}</label><select id="r_gender" class="sel"><option value="">${t('none_sel')}</option><option value="m" ${r.gender==='m'?'selected':''}>${t('male')}</option><option value="f" ${r.gender==='f'?'selected':''}>${t('female')}</option></select></div>
<div class="field"><label for="r_dob">${t('dob')}</label><input id="r_dob" class="in" type="date" value="${esc(r.dob)}"></div></div>
<div class="row"><div class="field"><label for="r_h">${t('h_cm')}</label><input id="r_h" class="in" type="number" min="30" max="250" value="${esc(r.height)}"></div><div class="field"><label for="r_w">${t('w_kg')}</label><input id="r_w" class="in" type="number" min="1" max="400" value="${esc(r.weight)}"></div></div>
<div class="field"><label for="r_al">${t('allergies')}</label><textarea id="r_al" class="ta" style="min-height:56px">${esc(r.allergies)}</textarea></div>
<div class="field"><label for="r_ch">${t('chronic')}</label><textarea id="r_ch" class="ta" style="min-height:56px">${esc(r.chronic)}</textarea></div>
<div class="field"><label for="r_me">${t('meds')}</label><textarea id="r_me" class="ta" style="min-height:56px">${esc(r.meds)}</textarea></div>
<div class="field"><label for="r_em">${t('emerg')}</label><input id="r_em" class="in" value="${esc(r.emergency)}"></div>
<div class="mfoot"><button class="btn" data-action="saverec">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`,true);
}
function histModal(){
  const T=['dx','surg','lab','img','vac','adm','oth'];
  openModal(`<h3>${t('h_add_t')}</h3><div class="row"><div class="field"><label for="h_date">${t('h_date')}</label><input id="h_date" class="in" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
<div class="field"><label for="h_type">${t('j_type')}</label><select id="h_type" class="sel">${T.map(x=>`<option value="${x}">${t('ht_'+x)}</option>`).join('')}</select></div></div>
<div class="field"><label for="h_title">${t('h_title')}</label><input id="h_title" class="in" placeholder="${esc(t('h_title_ph'))}"></div>
<div class="field"><label for="h_notes">${t('h_notes')}</label><textarea id="h_notes" class="ta"></textarea></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="savehist">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function profModal(){
  const u=me();
  openModal(`<h3>${t('p_edit')}</h3><div class="avedit"><span id="avprev">${avatar(u,'xl')}</span><div class="avbtns"><button type="button" class="btn line s" data-action="pickav">${ic('img')} ${t('p_photo')}</button>${u.avatar?`<button type="button" class="btn line s" data-action="rmav">${t('p_photo_rm')}</button>`:''}</div></div><div class="field"><label for="p_name">${t('p_name')}</label><input id="p_name" class="in" value="${esc(L(u.name))}"></div>
${isBiz(u)?'':`<div class="row"><div class="field"><label for="p_role">${t('p_role')}</label><select id="p_role" class="sel">${rolesFor(u).map(r=>`<option value="${r}" ${u.title===r?'selected':''}>${t('r_'+r)}</option>`).join('')}</select></div><div class="field" id="p_specf" ${noSpec(u)?'hidden':''}><label for="p_spec">${t('j_spec')}</label><select id="p_spec" class="sel">${SPECS.map(r=>`<option value="${r}" ${u.spec===r?'selected':''}>${t('sp_'+r)}</option>`).join('')}</select></div></div>`}
<div class="row"><div class="field"><label for="p_place">${t(isBiz(u)?'a_bplace':'p_work')}</label><input id="p_place" class="in" value="${esc(L(u.place))}"></div><div class="field"><label for="p_city">${t('p_city')}</label><input id="p_city" class="in" value="${esc(L(u.city))}"></div></div>
<div class="field"><label for="p_bio">${t('p_bio')}</label><textarea id="p_bio" class="ta">${esc(L(u.bio))}</textarea></div>
<div class="mfoot"><button class="btn" data-action="saveprofile">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div><div class="dz"><button type="button" class="lnk" data-action="blklist">${ic('block')} ${t('blk_list')}${(S.blocks||[]).filter(b=>b.by===S.me).length?' ('+(S.blocks||[]).filter(b=>b.by===S.me).length+')':''}</button><button type="button" class="lnk dg" data-action="delacc">${ic('trash')} ${t('del_acc')}</button>${REAL?`<a class="lnk" href="privacy.html" target="_blank" rel="noopener">${t('priv')}</a>`:''}</div><input id="avin" type="file" accept="image/jpeg,image/png,image/webp" hidden>`);
}
function vreqModal(){
  const r=me().vreq||{};
  openModal(`<h3>${VB().replace('class="vb"','class="vb" style="width:26px;height:26px;margin:0 0 0 8px"')} ${t('v_title')}</h3><div class="hint">${t('v_p')}</div>
<div class="field"><label for="v_type">${t('v_type')}</label><select id="v_type" class="sel">${['syndicate','license','student','other'].map(x=>`<option value="${x}">${t('vt_'+x)}</option>`).join('')}</select></div>
<div class="field"><label for="v_num">${t('v_num')}</label><input id="v_num" class="in" dir="ltr" value="${esc(r.license||'')}"></div>
<div class="field"><label for="v_note">${t('v_note')}</label><textarea id="v_note" class="ta" style="min-height:64px"></textarea></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="sendvreq">${t('v_send')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
Object.assign(D,{
 uni_note:['المجموعات الجامعية موثقة وينشئها الأدمن فقط، ويديرها مشرف يختاره الأدمن.','University groups are verified, created by admins only, and run by a moderator the admin picks.'],new_uni:['مجموعة جامعية','University group'],uni_new_t:['إنشاء مجموعة جامعية موثقة','Create a verified university group'],uni_edit_t:['تعديل المجموعة الجامعية','Edit university group'],uni_ar:['اسم الجامعة أو الكلية (عربي)','University or faculty name (Arabic)'],uni_en:['اسم الجامعة أو الكلية (إنجليزي)','University or faculty name (English)'],uni_mod:['المشرف على المجموعة','Group moderator'],uni_pick:['اختر مشرفًا','Choose a moderator'],uni_err:['اكتب اسم الجامعة واختر مشرفًا.','Enter the university name and choose a moderator.'],
 rs_promo:['محتوى ترويجي أو مضلل','Promotional or misleading'],rs_danger:['معلومات طبية خطيرة','Dangerous medical information'],rs_abuse:['إساءة أو تحرش','Abuse or harassment'],rs_adult:['محتوى جنسي أو عنيف','Sexual or violent content'],rs_privacy:['نشر بيانات مريض','Patient data exposure'],rs_other:['أخرى','Other'],
 rp_t:['الإبلاغ عن محتوى غير ملائم','Report inappropriate content'],rp_reason:['السبب','Reason'],rp_more:['تفاصيل إضافية (اختياري)','More details (optional)'],rp_send:['إرسال البلاغ','Send report'],rp_dup:['سبق أن أبلغت عن هذا المنشور','You already reported this post'],rp_ok:['وصل بلاغك للإدارة، شكرًا لك','Your report reached the admins, thank you'],
 adm_t:['لوحة الأدمن','Admin panel'],ad_ov:['نظرة عامة','Overview'],ad_rep:['البلاغات','Reports'],ad_ver:['التوثيق','Verification'],ad_usr:['المستخدمون','Users'],ad_pst:['المنشورات','Posts'],ad_grp:['المجموعات','Groups'],ad_job:['الوظائف','Jobs'],ad_ads:['الإعلانات','Ads'],
 st_users:['المستخدمون','Users'],st_posts:['المنشورات','Posts'],st_groups:['المجموعات','Groups'],st_jobs:['الوظائف','Jobs'],st_rep:['بلاغات مفتوحة','Open reports'],st_ver:['طلبات توثيق','Verification requests'],st_views:['مشاهدات الإعلانات','Ad views'],st_clicks:['نقرات الإعلانات','Ad clicks'],
 ad_perf:['أداء الإعلانات','Ad performance'],ad_vc:['{0} مشاهدة · {1} نقرة','{0} views · {1} clicks'],no_ads:['لا توجد إعلانات.','No ads.'],
 scan_t:['الفحص الذكي للمحتوى','AI content scan'],scan_p:['يراجع الذكاء الاصطناعي المنشورات ويضيف المخالف منها إلى البلاغات لتقرر أنت.','The AI reviews posts and adds violations to reports for you to decide.'],scan_b:['فحص المنشورات','Scan posts'],scan_ing:['جارٍ الفحص...','Scanning...'],scan_auto:['حذف المحتوى شديد المخالفة تلقائيًا أثناء الفحص','Auto-delete clearly violating content during a scan'],
 rep_open:['بلاغات مفتوحة ({0})','Open reports ({0})'],rep_none:['لا توجد بلاغات مفتوحة.','No open reports.'],rep_done:['آخر البلاغات المعالجة','Recently handled'],rep_ai:['فحص ذكي','AI scan'],rep_usr:['بلاغ مستخدم','User report'],rep_gone:['المنشور محذوف.','The post was deleted.'],rep_by:['المُبلّغ: {0}','Reporter: {0}'],rep_author:['الكاتب: {0}','Author: {0}'],
 rep_rm:['حذف المحتوى','Delete content'],rep_ban:['حظر الكاتب','Ban author'],rep_dis:['تجاهل البلاغ','Dismiss'],rs_removed:['تم حذف المحتوى','Content removed'],rs_banned:['تم حظر الكاتب','Author banned'],rs_dismissed:['تم التجاهل','Dismissed'],
 vq_pend:['طلبات بانتظار الموافقة ({0})','Awaiting approval ({0})'],vq_none:['لا توجد طلبات توثيق معلقة.','No pending verification requests.'],vq_ok:['الحسابات الموثقة ({0})','Verified accounts ({0})'],approve:['موافقة وتوثيق','Approve'],decline:['رفض','Decline'],revoke:['سحب التوثيق','Revoke'],grant:['توثيق','Verify'],vq_doc:['الوثيقة','Credential'],vq_approved:['تم توثيق الحساب','Account verified'],vq_declined:['تم رفض الطلب','Request declined'],
 col_user:['المستخدم','User'],col_email:['البريد','Email'],col_state:['الحالة','Status'],col_act:['إجراءات','Actions'],col_ad:['الإعلان','Ad'],col_views:['مشاهدات','Views'],col_clicks:['نقرات','Clicks'],col_ctr:['نسبة النقر','CTR'],
 admin_b:['أدمن','Admin'],active:['نشط','Active'],banned:['محظور','Banned'],ban:['حظر','Ban'],unban:['رفع الحظر','Unban'],paused:['متوقف','Paused'],on:['نشط','Live'],
 ask_user:['حذف المستخدم {0} وكل منشوراته؟','Delete user {0} and all their posts?'],ask_post:['حذف هذا المنشور؟','Delete this post?'],ask_group:['حذف المجموعة {0} ومنشوراتها؟','Delete group {0} and its posts?'],ask_job:['حذف الوظيفة {0}؟','Delete job {0}?'],ask_ad:['حذف الإعلان {0}؟','Delete ad {0}?'],
 jobs_n:['{0} وظيفة','{0} jobs'],add_job:['إضافة وظيفة','Add job'],applicants:['{0} متقدم','{0} applicants'],
 ads_sum:['إجمالي: {0} مشاهدة · {1} نقرة. الإعلانات النشطة تظهر بين المنشورات كل ثلاثة منشورات. مشاهدات الأدمن لا تُحتسب.','Total: {0} views · {1} clicks. Live ads appear between posts every third post. Admin views are not counted.'],new_ad:['إعلان جديد','New ad'],pause:['إيقاف','Pause'],resume:['تشغيل','Resume'],
 ad_new_t:['إعلان جديد','New ad'],ad_edit_t:['تعديل الإعلان','Edit ad'],ad_title:['العنوان','Title'],ad_body:['النص','Text'],ad_adv:['المعلن','Advertiser'],ad_cta:['نص الزر','Button text'],ad_url:['رابط الوجهة','Destination URL'],ad_tone:['لون الإعلان','Ad color'],ad_blue:['سماوي','Cyan'],ad_pink:['وردي','Pink'],ad_orange:['برتقالي','Orange'],ad_err1:['عنوان الإعلان مطلوب.','Ad title is required.'],ad_err2:['الرابط يجب أن يبدأ بـ http:// أو https://','The URL must start with http:// or https://'],ad_saved:['تم حفظ الإعلان','Ad saved'],
 e_user:['تعديل المستخدم','Edit user'],e_perm:['الصلاحية','Permission'],e_usr:['مستخدم','User'],e_post:['تعديل المنشور','Edit post'],e_text:['النص','Text'],e_type:['النوع','Type'],
 scan_na:['الفحص الذكي غير متاح في هذا العرض','AI scan is not available in this view'],scan_empty:['لا توجد منشورات للفحص','No posts to scan'],scan_found:['أضاف الفحص {0} بلاغ','The scan added {0} report(s)'],scan_rm:[' وحذف {0} تلقائيًا',' and auto-deleted {0}'],scan_clean:['لم يجد الفحص مخالفات','The scan found no violations'],scan_deny:['لم يتم السماح بالفحص الذكي','AI scan was not allowed'],scan_fail:['تعذر إتمام الفحص الآن','The scan could not complete'],scan_reason:['مخالفة محتملة','Possible violation']
});
/* AI assistant */
const aiRules=()=>'You are a specialized medical assistant inside MedRo, a community for doctors, medical students and health professionals. Reply in '+(lang==='ar'?'clear modern Arabic, keeping English medical terms in parentheses when helpful':'clear English')+'. Give accurate, well-structured, concise educational information. Never give a final diagnosis or an individual dosing instruction; advise seeing a qualified clinician. If the user describes red-flag symptoms (severe chest pain, trouble breathing, heavy bleeding, loss of consciousness, thoughts of self-harm) tell them to seek emergency care immediately. If the question is outside medicine, politely decline and steer back to medicine.';
let _s;
async function getSample(){if(REAL)return BE.sample;if(_s!==undefined)return _s;try{_s=(window.claude&&window.claude.use)?await window.claude.use('sample'):null}catch(e){_s=null}return _s}
function chatHtml(){
  if(!ui.chat.length)return `<div class="msg a">${t('ai_hi')}</div><div class="chips">${[1,2,3,4].map(i=>`<button data-action="aichip" data-q="${esc(t('ai_c'+i))}">${t('ai_c'+i)}</button>`).join('')}</div>`;
  return ui.chat.map(m=>`<div class="msg ${m.role==='user'?'u':'a'}">${m.pending&&!m.content?`<span class="dots"><i></i><i></i><i></i></span>`:esc(m.content)}</div>`).join('');
}
function refreshChat(){const l=$('#chatLog');if(l){l.innerHTML=chatHtml();l.scrollTop=l.scrollHeight}const b=$('#aisend');if(b)b.disabled=ui.aiBusy}
function aiView(){
  return `<div class="item"><h2 class="grow">${t('ai_t')}</h2><span class="pill">${ic('ai')} ${t('ai_badge')}</span></div>
<div class="card chat"><div class="log" id="chatLog">${chatHtml()}</div><div class="muted sm" style="margin:8px 0">${t('ai_disc')}</div>
<div class="cform" style="margin:0"><textarea id="aiq" class="ta" style="min-height:48px;height:48px;border-radius:24px" rows="1" placeholder="${esc(t('ai_ph'))}" aria-label="${esc(t('ai_ph'))}"></textarea><button id="aisend" class="btn" data-action="aisend" ${ui.aiBusy?'disabled':''}>${ic('send')} ${t('send')}</button></div></div>`;
}
async function sendAI(text){
  text=(text||'').trim();if(!text||ui.aiBusy)return;
  const turns=ui.chat.filter(m=>!m.pending&&!m.err).map(m=>({role:m.role,content:m.content}));turns.push({role:'user',content:text});
  let hist=turns.slice(-7);while(hist.length&&hist[0].role!=='user')hist.shift();
  ui.chat.push({role:'user',content:text});const pend={role:'assistant',content:'',pending:true};ui.chat.push(pend);ui.aiBusy=true;refreshChat();
  const fail=m=>{pend.pending=false;pend.err=true;pend.content=pend.content?pend.content+'\n\n'+t('ai_cut'):m};
  const sample=await getSample();
  if(!sample)fail(t('ai_off'));
  else{try{
    const r=await sample([{role:'user',content:aiRules()}].concat(hist),{cache:false,onText:({text})=>{pend.content=text;const els=$$('#chatLog .msg.a');const el=els[els.length-1];if(el){el.textContent=text;const l=$('#chatLog');l.scrollTop=l.scrollHeight}}});
    pend.content=r.text;pend.pending=false;
  }catch(e){if(e&&e.text)pend.content=e.text;const c=e&&e.code;fail(c==='not_granted'?t('ai_deny'):c==='rate_limited'?t('ai_rate'):t('ai_fail'))}}
  ui.aiBusy=false;if(ui.view==='ai')refreshChat();
}
/* admin */
const ctr=a=>a.views?((a.clicks/a.views)*100).toFixed(1):'0.0';
const rsn=r=>D['rs_'+r]?t('rs_'+r):r;
const askBtn=(msg,act,id)=>`<button class="btn line ic s" data-action="ask" data-do="${act}" data-id="${id}" data-msg="${esc(msg)}" aria-label="${esc(t('del'))}">${ic('trash')}</button>`;
function adminView(){
  const open=S.reports.filter(r=>r.status==='open').length,vp=S.users.filter(u=>u.vreq&&u.vreq.status==='pending').length;
  const T=[['overview','ad_ov',''],['reports','ad_rep',open?' ('+open+')':''],['verify','ad_ver',vp?' ('+vp+')':''],['users','ad_usr',''],['posts','ad_pst',''],['groups','ad_grp',''],['jobs','ad_job',''],['ads','ad_ads',(typeof bzPending==='function'&&bzPending()?' ('+bzPending()+')':'')],['cons','ad_cons',(typeof acPending==='function'&&(acPending()+acNeed())?' ('+(acPending()+acNeed())+')':'')],['site','ad_site',''],['texts','ad_texts','']];
  const fn={overview:adOverview,reports:adReports,verify:adVerify,users:adUsers,posts:adPosts,groups:adGroups,jobs:adJobs,ads:bzAdminView,cons:adCons,site:adSite,texts:adTexts}[ui.adminTab]||adOverview;
  return `<h2>${ic('shield')} ${t('adm_t')}</h2><div class="subtabs">${T.map(x=>`<button class="${ui.adminTab===x[0]?'on':''}" data-action="admtab" data-id="${x[0]}">${t(x[1])}${x[2]}</button>`).join('')}</div>${fn()}`;
}
function adOverview(){
  const v=S.ads.reduce((s,a)=>s+(a.views||0),0),c=S.ads.reduce((s,a)=>s+(a.clicks||0),0),mx=Math.max(1,...S.ads.map(a=>a.views||0));
  const st=[['st_users',S.users.length],['st_posts',S.posts.length],['st_groups',S.groups.length],['st_jobs',S.jobs.length],['st_rep',S.reports.filter(r=>r.status==='open').length],['st_ver',S.users.filter(u=>u.vreq&&u.vreq.status==='pending').length],['st_views',v],['st_clicks',c]];
  return `<div class="stats">${st.map(s=>`<div class="card"><span class="muted sm">${t(s[0])}</span><b>${s[1]}</b></div>`).join('')}</div>
<div class="card"><h3 style="margin-bottom:14px">${t('ad_perf')}</h3>${S.ads.length?S.ads.map(a=>`<div style="margin-bottom:14px"><div class="item"><b class="grow">${esc(L(a.title))}</b><span class="muted sm">${t('ad_vc',a.views||0,a.clicks||0)} · ${ctr(a)}%</span></div><div class="bar" style="margin-top:6px"><i style="width:${Math.round((a.views||0)/mx*100)}%"></i></div></div>`).join(''):`<div class="muted">${t('no_ads')}</div>`}</div>`;
}
function adReports(){
  const open=S.reports.filter(r=>r.status==='open').sort((a,b)=>b.ts-a.ts),done=S.reports.filter(r=>r.status!=='open').sort((a,b)=>b.ts-a.ts).slice(0,6);
  const card=(r,o)=>{const p=S.posts.find(x=>x.id===r.postId),a=p?U(p.uid):null,rep=U(r.by);
    return `<div class="card"><div class="item"><span class="pill ${r.source==='ai'?'':'pk'}">${r.source==='ai'?t('rep_ai'):t('rep_usr')}</span><b class="grow">${esc(rsn(r.reason))}</b>${o?'':`<span class="pill gr">${t('rs_'+r.status)}</span>`}<span class="muted sm">${ago(r.ts)}</span></div>
${p?`<div class="hint" style="margin:12px 0 6px;white-space:pre-wrap;overflow-wrap:anywhere">${esc(L(p.text))}</div><div class="muted sm">${a?t('rep_author',esc(L(a.name))):''}${rep?' · '+t('rep_by',esc(L(rep.name))):''}</div>`:`<div class="hint" style="margin:12px 0 6px">${t('rep_gone')}</div>`}
${o?`<div class="item" style="margin-top:12px">${p?`<button class="btn danger s" data-action="rep-remove" data-id="${r.id}">${ic('trash')} ${t('rep_rm')}</button>${a&&a.role!=='admin'?`<button class="btn danger s" data-action="rep-ban" data-id="${r.id}">${ic('ban')} ${t('rep_ban')}</button>`:''}`:''}<button class="btn line s" data-action="rep-dismiss" data-id="${r.id}">${t('rep_dis')}</button></div>`:''}</div>`};
  return `<div class="card"><div class="item"><div class="grow"><b>${t('scan_t')}</b><div class="muted sm">${t('scan_p')}</div></div><button class="btn" data-action="aiscan" ${ui.scanBusy?'disabled':''}>${ic('ai')} ${ui.scanBusy?t('scan_ing'):t('scan_b')}</button></div>
<label class="sw sm" style="margin-top:12px;cursor:pointer"><input type="checkbox" data-action="toggleauto" ${S.settings.autoRemove?'checked':''}> ${t('scan_auto')}</label></div>
<h4>${t('rep_open',open.length)}</h4>${open.map(r=>card(r,true)).join('')||`<div class="card empty">${t('rep_none')}</div>`}${done.length?`<h4>${t('rep_done')}</h4>`+done.map(r=>card(r,false)).join(''):''}`;
}
function adVerify(){
  const pend=S.users.filter(u=>u.vreq&&u.vreq.status==='pending').sort((a,b)=>b.vreq.ts-a.vreq.ts),ok=S.users.filter(u=>u.verified&&u.role!=='admin');
  return `<h4>${t('vq_pend',pend.length)}</h4>${pend.map(u=>`<div class="card"><div class="item">${avatar(u)}<div class="grow"><b>${nm(u)}</b><div class="muted sm">${sub(u)} · ${ago(u.vreq.ts)}</div></div></div>
<div class="kv" style="margin:12px 0"><div><small>${t('vq_doc')}</small><b>${esc(t('vt_'+u.vreq.type))}</b></div><div><small>${t('v_num')}</small><b dir="ltr">${esc(u.vreq.license)}</b></div></div>${u.vreq.note?`<div class="hint">${esc(u.vreq.note)}</div>`:''}
<div class="item"><button class="btn s" data-action="v-approve" data-id="${u.id}">${ic('check')} ${t('approve')}</button><button class="btn line s" data-action="v-reject" data-id="${u.id}">${t('decline')}</button><button class="btn soft s" data-action="user" data-id="${u.id}">${t('p_posts')}</button></div></div>`).join('')||`<div class="card empty">${t('vq_none')}</div>`}
<h4>${t('vq_ok',ok.length)}</h4><div class="list">${ok.map(u=>`<div class="card item">${avatar(u)}<div class="grow"><b>${nm(u)}</b><div class="muted sm">${sub(u)}</div></div><button class="btn line s" data-action="v-revoke" data-id="${u.id}">${t('revoke')}</button></div>`).join('')}</div>`;
}
function adUsers(){
  const m=me();
  return `<div class="item" style="margin-bottom:12px"><span class="grow"></span><button class="btn" data-action="newuser">${ic('plus')} ${t('add_user')}</button></div><div class="card tw"><table class="t"><thead><tr><th>${t('col_user')}</th><th>${t('col_email')}</th><th>${t('col_state')}</th><th>${t('col_act')}</th></tr></thead><tbody>${S.users.map(u=>`<tr><td><b>${nm(u)}</b><div class="muted sm">${sub(u)}</div></td><td dir="ltr" style="text-align:start">${esc(u.email)}</td>
<td>${u.role==='admin'?`<span class="pill">${t('admin_b')}</span> `:''}${u.banned?`<span class="pill pk">${t('banned')}</span>`:`<span class="pill gr">${t('active')}</span>`}</td>
<td><div class="item" style="flex-wrap:nowrap"><button class="btn line ic s" data-action="uedit" data-id="${u.id}" aria-label="${esc(t('edit'))}">${ic('edit')}</button>${u.id===m.id?'':`<button class="btn line s" data-action="uban" data-id="${u.id}">${u.banned?t('unban'):t('ban')}</button>${askBtn(t('ask_user',L(u.name)),'udel',u.id)}`}</div></td></tr>`).join('')}</tbody></table></div>`;
}
function adPosts(){
  const l=S.posts.slice().sort((a,b)=>b.ts-a.ts);
  return `<div class="list">${l.map(p=>{const a=U(p.uid);const x=L(p.text)||'';return `<div class="card item"><div class="grow"><b>${a?nm(a):'—'}</b> <span class="muted sm">${ago(p.ts)}</span><div class="sm" style="overflow-wrap:anywhere">${esc(x.slice(0,140))}${x.length>140?'...':''}</div></div><button class="btn line ic s" data-action="pedit" data-id="${p.id}" aria-label="${esc(t('edit'))}">${ic('edit')}</button>${askBtn(t('ask_post'),'delpostadm',p.id)}</div>`}).join('')||`<div class="card empty">${t('feed_empty')}</div>`}</div>`;
}
function adGroups(){
  return `<div class="item"><span class="grow muted sm">${t('uni_note')}</span><button class="btn cy s" data-action="newuni">${ic('stamp')} ${t('new_uni')}</button></div><div class="list">${S.groups.map(g=>{const md=g.mod&&U(g.mod);return `<div class="card item"><div class="grow"><b>${esc(L(g.name))}${g.verified?VB():''}</b><div class="muted sm">${t('members',g.members.length)} · ${g.kind==='uni'?t('uni_pill'):t('gc_'+g.cat)}${md?' · '+t('mod_of',esc(L(md.name))):''}</div></div><button class="btn line ic s" data-action="gedit" data-id="${g.id}" aria-label="${esc(t('edit'))}">${ic('edit')}</button>${askBtn(t('ask_group',L(g.name)),'gdel',g.id)}</div>`}).join('')}</div>`;
}
function uniModal(id){
  if(!isAdmin())return;
  const g=S.groups.find(x=>x.id===id)||{name:'',desc:'',mod:''};
  const na=Array.isArray(g.name)?g.name[0]:(lang==='ar'?g.name:''),ne=Array.isArray(g.name)?g.name[1]:(lang==='en'?g.name:'');
  const cand=S.users.filter(u=>u.role!=='admin'&&!u.banned);
  openModal(`<h3>${ic('stamp')} ${id?t('uni_edit_t'):t('uni_new_t')}</h3><div class="hint">${t('uni_note')}</div>
<div class="field"><label for="u_ar">${t('uni_ar')}</label><input id="u_ar" class="in" value="${esc(na)}"></div>
<div class="field"><label for="u_en">${t('uni_en')}</label><input id="u_en" class="in" dir="ltr" value="${esc(ne)}"></div>
<div class="field"><label for="u_desc">${t('g_desc')}</label><textarea id="u_desc" class="ta" style="min-height:60px">${esc(L(g.desc))}</textarea></div>
<div class="field"><label for="u_mod">${t('uni_mod')}</label><select id="u_mod" class="sel"><option value="">${t('uni_pick')}</option>${cand.map(u=>`<option value="${u.id}" ${g.mod===u.id?'selected':''}>${esc(L(u.name))} — ${esc(t('r_'+u.title))}</option>`).join('')}</select></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="saveuni" data-id="${id||''}">${id?t('save'):t('g_create')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function adJobs(){
  return `<div class="item"><span class="grow muted sm">${t('jobs_n',S.jobs.length)}</span><button class="btn s" data-action="newjob">${ic('plus')} ${t('add_job')}</button></div><div class="list">${S.jobs.map(j=>`<div class="card item"><div class="grow"><b>${esc(L(j.title))}</b><div class="muted sm">${esc(L(j.org))} · ${esc(L(j.city))} · ${t('applicants',j.applicants.length)}</div></div><button class="btn line ic s" data-action="jedit" data-id="${j.id}" aria-label="${esc(t('edit'))}">${ic('edit')}</button>${askBtn(t('ask_job',L(j.title)),'jdel',j.id)}</div>`).join('')}</div>`;
}
function adAds(){
  const v=S.ads.reduce((s,a)=>s+(a.views||0),0),c=S.ads.reduce((s,a)=>s+(a.clicks||0),0);
  return `<div class="item"><span class="grow muted sm">${t('ads_sum',v,c)}</span><button class="btn s" data-action="newad">${ic('plus')} ${t('new_ad')}</button></div>
<div class="card tw"><table class="t"><thead><tr><th>${t('col_ad')}</th><th>${t('col_state')}</th><th>${t('col_views')}</th><th>${t('col_clicks')}</th><th>${t('col_ctr')}</th><th>${t('col_act')}</th></tr></thead><tbody>${S.ads.map(a=>`<tr><td><b>${esc(L(a.title))}</b><div class="muted sm">${esc(L(a.advertiser))}${a.owner?' · '+t('bz_a_owner_col'):''}</div></td><td>${a.owner?`<span class="pill ${({live:'ok',pending:'yl',rejected:'pk'})[a.status]||'gr'}">${t('bz_st_'+(a.status||'live'))}</span>`:a.active?`<span class="pill ok">${t('on')}</span>`:`<span class="pill gr">${t('paused')}</span>`}</td><td style="font-variant-numeric:tabular-nums">${a.views||0}</td><td style="font-variant-numeric:tabular-nums">${a.clicks||0}</td><td style="font-variant-numeric:tabular-nums">${ctr(a)}%</td>
<td><div class="item" style="flex-wrap:nowrap">${a.owner&&!['live','paused'].includes(a.status)?'':`<button class="btn line s" data-action="adtoggle" data-id="${a.id}">${a.active?t('pause'):t('resume')}</button>`}<button class="btn line ic s" data-action="adedit" data-id="${a.id}" aria-label="${esc(t('edit'))}">${ic('edit')}</button>${askBtn(t('ask_ad',L(a.title)),'addel',a.id)}</div></td></tr>`).join('')||`<tr><td colspan="6" class="empty">${t('no_ads')}</td></tr>`}</tbody></table></div>`;
}
function confirmModal(msg,act,id){openModal(`<h3>${t('confirm')}</h3><p style="margin-bottom:14px">${esc(msg)}</p><div class="mfoot"><button class="btn danger" data-action="${esc(act)}" data-id="${esc(id)}">${t('confirm')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`)}
function adModal(id){
  const a=S.ads.find(x=>x.id===id)||{title:'',body:'',cta:(lang==='ar'?'اعرف المزيد':'Learn more'),url:'https://',advertiser:'',tone:0};
  openModal(`<h3>${id?t('ad_edit_t'):t('ad_new_t')}</h3><div class="field"><label for="d_title">${t('ad_title')}</label><input id="d_title" class="in" value="${esc(L(a.title))}"></div>
<div class="field"><label for="d_body">${t('ad_body')}</label><textarea id="d_body" class="ta" style="min-height:60px">${esc(L(a.body))}</textarea></div>
<div class="row"><div class="field"><label for="d_adv">${t('ad_adv')}</label><input id="d_adv" class="in" value="${esc(L(a.advertiser))}"></div><div class="field"><label for="d_cta">${t('ad_cta')}</label><input id="d_cta" class="in" value="${esc(L(a.cta))}"></div></div>
<div class="field"><label for="d_url">${t('ad_url')}</label><input id="d_url" class="in" dir="ltr" value="${esc(a.url)}"></div>
<div class="field"><label for="d_tone">${t('ad_tone')}</label><select id="d_tone" class="sel">${['ad_blue','ad_pink','ad_orange'].map((n,i)=>`<option value="${i}" ${a.tone===i?'selected':''}>${t(n)}</option>`).join('')}</select></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="savead" data-id="${id||''}">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function postEditModal(id){const p=S.posts.find(x=>x.id===id);if(!p)return;openModal(`<h3>${t('e_post')}</h3><div class="field"><label for="e_text">${t('e_text')}</label><textarea id="e_text" class="ta">${esc(L(p.text))}</textarea></div><div class="field"><label for="e_tag">${t('e_type')}</label><select id="e_tag" class="sel">${TAGS.map(x=>`<option value="${x}" ${p.tag===x?'selected':''}>${t('tg_'+x)}</option>`).join('')}</select></div><div class="mfoot"><button class="btn" data-action="savepost" data-id="${id}">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`)}
function groupEditModal(id){
  const g=S.groups.find(x=>x.id===id)||{name:'',desc:'',cat:'disc'},C=['edu','spec','disc','jobs'];
  openModal(`<h3>${id?t('g_edit_t'):t('g_new_t')}</h3><div class="field"><label for="g_name">${t('g_name')}</label><input id="g_name" class="in" value="${esc(L(g.name))}"></div>
<div class="field"><label for="g_desc">${t('g_desc')}</label><textarea id="g_desc" class="ta" style="min-height:60px">${esc(L(g.desc))}</textarea></div>
<div class="field"><label for="g_cat">${t('g_cat')}</label><select id="g_cat" class="sel">${C.map(c=>`<option value="${c}" ${g.cat===c?'selected':''}>${t('gc_'+c)}</option>`).join('')}</select></div><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="savegroup" data-id="${id||''}">${id?t('save'):t('g_create')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function userEditModal(id){
  const u=U(id);if(!u)return;
  openModal(`<h3>${t('e_user')}</h3><div class="field"><label for="x_name">${t('p_name')}</label><input id="x_name" class="in" value="${esc(L(u.name))}"></div>
<div class="row"><div class="field"><label for="x_title">${t('p_role')}</label><select id="x_title" class="sel">${ROLES_ALL.concat(u.role==='admin'?['admin']:[]).map(r=>`<option value="${r}" ${u.title===r?'selected':''}>${t('r_'+r)}</option>`).join('')}</select></div>
<div class="field"><label for="x_role">${t('e_perm')}</label><select id="x_role" class="sel"><option value="user" ${u.role==='user'?'selected':''}>${t('e_usr')}</option><option value="admin" ${u.role==='admin'?'selected':''}>${t('admin_b')}</option></select></div></div>
<div class="field"><label for="x_city">${t('p_city')}</label><input id="x_city" class="in" value="${esc(L(u.city))}"></div>
<div class="mfoot"><button class="btn" data-action="saveuser" data-id="${id}">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function reportModal(id){
  const R=['promo','danger','abuse','adult','privacy','other'];
  openModal(`<h3>${ic('flag')} ${t('rp_t')}</h3><div class="field"><label for="rp_r">${t('rp_reason')}</label><select id="rp_r" class="sel">${R.map(r=>`<option value="${r}">${t('rs_'+r)}</option>`).join('')}</select></div>
<div class="field"><label for="rp_n">${t('rp_more')}</label><textarea id="rp_n" class="ta" style="min-height:60px"></textarea></div>
<div class="mfoot"><button class="btn danger" data-action="sendreport" data-id="${id}">${t('rp_send')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function removePost(id){const rp=S.posts.find(p=>p.id===id);if(rp&&S.me&&rp.uid!==S.me)notify(rp.uid,'removed','');if(rp)dropImgs(rp.images);S.posts=S.posts.filter(p=>p.id!==id);S.reports.forEach(r=>{if(r.postId===id&&r.status==='open')r.status='removed'})}
const scanPrompt=()=>'You moderate a medical community platform. Review the posts below and flag only policy violations: promotion of selling prescription drugs without a prescription, dangerous medical misinformation, abuse or harassment, sexual or violent content, exposure of identifiable patient data, spam. Do NOT flag normal medical discussion. Reply with only a JSON array of objects {"id":"...","reason":"short reason in '+(lang==='ar'?'Arabic':'English')+'","severity":"high"|"low"}; high = clear violation, low = suspected. If nothing violates, reply []. Posts:\n';
async function aiScan(){
  if(ui.scanBusy)return;const sample=await getSample();
  if(!sample){toast(t('scan_na'));return}
  const openIds=new Set(S.reports.filter(r=>r.status==='open').map(r=>r.postId));
  const list=S.posts.filter(p=>!openIds.has(p.id)).slice(0,40).map(p=>({id:p.id,text:L(p.text).slice(0,400)}));
  if(!list.length){toast(t('scan_empty'));return}
  ui.scanBusy=true;render();let found=0,removed=0;
  try{
    const res=await sample.json(scanPrompt()+JSON.stringify(list),{modelTier:'quick',cache:false});
    (Array.isArray(res)?res:[]).forEach(x=>{
      if(!x||!list.some(p=>p.id===x.id))return;const sev=x.severity==='high'?'high':'low';
      S.reports.push({id:uid(),postId:x.id,by:'ai',reason:String(x.reason||t('scan_reason')).slice(0,120),note:'',ts:Date.now(),status:'open',source:'ai'});found++;
      if(S.settings.autoRemove&&sev==='high'){removePost(x.id);removed++}
    });
    save();toast(found?t('scan_found',found)+(removed?t('scan_rm',removed):''):t('scan_clean'));
  }catch(e){toast(e&&e.code==='not_granted'?t('scan_deny'):t('scan_fail'))}
  ui.scanBusy=false;render();
}
Object.assign(D,{
 ad_site:['الموقع','Site'],ad_texts:['النصوص','Texts'],
 si_land:['الصفحة الرئيسية','Landing page'],si_land_p:['عدّل نصوص الصفحة الترحيبية مباشرة بالضغط عليها، بالعربية والإنجليزية.','Edit the landing page copy by clicking it, in Arabic and English.'],si_land_b:['فتح المحرر المرئي','Open visual editor'],
 ed_bar:['وضع التحرير: اضغط على أي نص لتعديله بالعربية والإنجليزية.','Edit mode: click any text to edit it in Arabic and English.'],ed_exit:['إنهاء التحرير','Exit editor'],ed_t:['تعديل النص','Edit text'],ed_click:['اضغط للتعديل','Click to edit'],ed_reset:['استعادة الأصل','Restore default'],ed_mod:['معدّل','Edited'],ed_saved:['تم حفظ النص','Text saved'],
 si_banner:['شريط إعلان للمنصة','Platform announcement bar'],si_b_on:['إظهار الشريط في المنصة والصفحة الرئيسية','Show the bar on the platform and landing page'],si_b_ar:['النص بالعربية','Arabic text'],si_b_en:['النص بالإنجليزية','English text'],si_b_tone:['اللون','Tone'],tn_info:['معلومة','Info'],tn_warn:['تنبيه','Warning'],tn_alert:['هام','Important'],
 si_ctrl:['التحكم في مزايا المنصة','Platform feature controls'],tg_ai:['المساعد الطبي','Medical assistant'],tg_jobs:['الوظائف','Jobs'],tg_ads:['الإعلانات بين المنشورات','Ads between posts'],tg_signup:['فتح التسجيل للمستخدمين الجدد','Open sign-up for new users'],tg_ug:['السماح للمستخدمين بإنشاء مجموعات عامة','Let users create public groups'],
 si_tips:['نصائح اليوم','Tips of the day'],tip_add:['إضافة نصيحة','Add tip'],tip_ar:['النصيحة بالعربية','Tip in Arabic'],tip_en:['النصيحة بالإنجليزية','Tip in English'],
 tx_search:['ابحث في كل نصوص المنصة','Search every text in the platform'],tx_count:['{0} نص','{0} texts'],tx_note:['عدّل أي نص في المنصة بالعربية والإنجليزية. التعديل يطبق فورًا على كل الشاشات.','Edit any text in the platform in Arabic and English. Changes apply instantly everywhere.'],
 su_closed:['التسجيل مغلق حاليًا. يمكنك تسجيل الدخول إذا كان لديك حساب.','Sign-up is closed right now. You can log in if you already have an account.'],
 add_user:['إضافة مستخدم','Add user'],nu_pass:['كلمة المرور (6 أحرف على الأقل)','Password (6+ characters)'],nu_ver:['حساب موثق','Verified account'],nu_err:['اكتب الاسم وبريدًا صحيحًا وكلمة مرور من 6 أحرف.','Enter a name, a valid email and a 6+ character password.'],nu_dup:['هذا البريد مسجل بالفعل.','This email is already registered.'],nu_ok:['تمت إضافة المستخدم','User added']
});
Object.assign(D,{
 jr_req:['طلب انضمام','Request to join'],jr_pending:['بانتظار الموافقة','Pending approval'],jr_sent:['تم إرسال طلب الانضمام للمشرف','Join request sent to the moderator'],
 jr_title:['طلبات الانضمام','Join requests'],jr_ok:['تمت الموافقة على الانضمام','Join approved'],jr_no:['تم رفض الطلب','Request declined'],
 jr_locked:['محتوى المجموعة متاح للأعضاء فقط. أرسل طلب انضمام وسيراجعه المشرف.','Group content is for members only. Send a join request and the moderator will review it.']
});
const pendRaw=g=>g.pending||(g.pending=[]);
const pendList=g=>pendRaw(g).map(U).filter(u=>u&&!u.banned&&!g.members.includes(u.id));
function pendingFor(m){return S.groups.filter(g=>g.kind==='uni'&&(isAdmin()||g.mod===m.id)).reduce((a,g)=>a+pendList(g).length,0)}
function navBadge(v){const m=me();if(!m)return 0;if(v==='friends')return incoming(m.id).length;if(v==='groups')return pendingFor(m);if(v==='consult')return unreadCs();return 0}
const unreadCs=()=>(typeof myNotifs==='function'?myNotifs().filter(n=>!n.read&&/^cs_/.test(n.type)&&n.type!=='cs_app'&&!['cs_pay','cs_refund','cs_payout'].includes(n.type)).length:0);
function joinBtn(g,cls,label){const m=me();
  if(g.kind==='uni'&&!isAdmin()){
    if(pendRaw(g).includes(m.id))return `<button class="btn line s" data-action="jcancel" data-id="${g.id}">${t('jr_pending')}</button>`;
    return `<button class="${cls}" data-action="join" data-id="${g.id}">${t('jr_req')}</button>`}
  return `<button class="${cls}" data-action="join" data-id="${g.id}">${label}</button>`}
const clean=s=>String(s==null?'':s).replace(/[<>]/g,'').replace(/"/g,'\u201D').trim();
const navOn=v=>!(isBiz(me())&&['friends','jobs','ai','consult'].includes(v))&&!(v==='myads'&&!isBiz(me()))&&!(v==='jobs'&&!S.site.toggles.jobs)&&!(v==='ai'&&!S.site.toggles.ai)&&!(v==='consult'&&!csOn());
function ensureTips(){if(!S.site.tips)S.site.tips=TIPS.map(x=>[x[0],x[1]])}
function tipList(){const l=(S.site.tips||[]).filter(x=>x[0]||x[1]);return l.length?l:TIPS}
function bannerHtml(){const b=S.site.banner,tx=lang==='ar'?b.ar:b.en;return `<div class="bslot">${(!b.on||!tx)?'':`<div class="bnr ${esc(b.tone)}" role="status">${ic('mega')}<span>${esc(tx)}</span></div>`}</div>`}
function edTextModal(k){
  if(!D[k])return;const ov=OV[k]||D[k];
  openModal(`<h3>${ic('edit')} ${t('ed_t')}</h3><div class="hint" dir="ltr" style="text-align:start">${esc(k)}</div>
<div class="field"><label for="e_ar">العربية</label><textarea id="e_ar" class="ta" style="min-height:76px">${esc(ov[0])}</textarea></div>
<div class="field"><label for="e_en">English</label><textarea id="e_en" class="ta" dir="ltr" style="min-height:76px">${esc(ov[1])}</textarea></div>
<div class="mfoot"><button class="btn" data-action="sav_text" data-k="${esc(k)}">${t('save')}</button>${OV[k]?`<button class="btn line" data-action="rst_text" data-k="${esc(k)}">${t('ed_reset')}</button>`:''}<button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function adSite(){
  const tg=S.site.toggles,b=S.site.banner,tips=S.site.tips||TIPS;
  const sw=(path,on,label)=>`<label class="sw" style="cursor:pointer;padding:6px 0"><input type="checkbox" data-sf="${path}" ${on?'checked':''}> <span>${label}</span></label>`;
  return `<div class="card"><div class="item"><div class="grow"><h3>${t('si_land')}</h3><p class="muted sm">${t('si_land_p')}</p></div><button class="btn" data-action="editpage">${ic('edit')} ${t('si_land_b')}</button></div></div>
<div class="card"><h3 style="margin-bottom:10px">${ic('mega')} ${t('si_banner')}</h3>${sw('banner.on',b.on,t('si_b_on'))}
<div class="row"><div class="field"><label for="sf_ar">${t('si_b_ar')}</label><input id="sf_ar" class="in" data-sf="banner.ar" value="${esc(b.ar)}"></div><div class="field"><label for="sf_en">${t('si_b_en')}</label><input id="sf_en" class="in" dir="ltr" data-sf="banner.en" value="${esc(b.en)}"></div>
<div class="field" style="flex:0 1 150px"><label for="sf_tn">${t('si_b_tone')}</label><select id="sf_tn" class="sel" data-sf="banner.tone">${['info','warn','alert'].map(x=>`<option value="${x}" ${b.tone===x?'selected':''}>${t('tn_'+x)}</option>`).join('')}</select></div></div>${bannerHtml()}</div>
<div class="card"><h3 style="margin-bottom:6px">${t('si_ctrl')}</h3>${sw('toggles.ai',tg.ai,t('tg_ai'))}${sw('toggles.jobs',tg.jobs,t('tg_jobs'))}${sw('toggles.ads',tg.ads,t('tg_ads'))}${sw('toggles.signup',tg.signup,t('tg_signup'))}${sw('toggles.userGroups',tg.userGroups,t('tg_ug'))}</div>
<div class="card"><div class="item"><h3 class="grow">${ic('bulb')} ${t('si_tips')}</h3><button class="btn s" data-action="tipadd">${ic('plus')} ${t('tip_add')}</button></div><div class="list" style="margin-top:12px">${tips.map((x,i)=>`<div class="row" style="align-items:flex-start"><div class="field" style="margin:0"><textarea class="ta" style="min-height:56px" data-tip="${i}|0" aria-label="${esc(t('tip_ar'))}" placeholder="${esc(t('tip_ar'))}">${esc(x[0])}</textarea></div><div class="field" style="margin:0"><textarea class="ta" dir="ltr" style="min-height:56px" data-tip="${i}|1" aria-label="${esc(t('tip_en'))}" placeholder="${esc(t('tip_en'))}">${esc(x[1])}</textarea></div><button class="btn line ic s" data-action="tipdel" data-i="${i}" aria-label="${esc(t('del'))}">${ic('trash')}</button></div>`).join('')}</div></div>`;
}
function textRows(){
  const q=ui.txq.trim().toLowerCase();
  const keys=Object.keys(D).filter(k=>!q||k.toLowerCase().includes(q)||(OV[k]||D[k]).join(' ').toLowerCase().includes(q));
  return `<div class="muted sm">${t('tx_count',keys.length)}</div>`+keys.slice(0,40).map(k=>{const v=OV[k]||D[k];return `<div class="card"><div class="item" style="margin-bottom:8px"><code class="muted sm">${esc(k)}</code>${OV[k]?`<span class="pill yl">${t('ed_mod')}</span><button class="btn line s" data-action="rst_text" data-k="${esc(k)}">${t('ed_reset')}</button>`:''}</div><div class="row"><div class="field" style="margin:0"><textarea class="ta" style="min-height:52px" data-ov="${esc(k)}|0" aria-label="AR">${esc(v[0])}</textarea></div><div class="field" style="margin:0"><textarea class="ta" dir="ltr" style="min-height:52px" data-ov="${esc(k)}|1" aria-label="EN">${esc(v[1])}</textarea></div></div></div>`}).join('');
}
function adTexts(){
  return `<div class="card"><p class="muted sm" style="margin-bottom:10px">${t('tx_note')}</p><input id="txq" class="in" data-in="txq" placeholder="${esc(t('tx_search'))}" aria-label="${esc(t('tx_search'))}" value="${esc(ui.txq)}"></div><div class="list" id="txList">${textRows()}</div>`;
}
function userNewModal(){
  openModal(`<h3>${ic('plus')} ${t('add_user')}</h3><div class="field"><label for="n_name">${t('a_name')}</label><input id="n_name" class="in"></div>
<div class="field"><label for="n_email">${t('a_email')}</label><input id="n_email" class="in" type="email" dir="ltr"></div>
<div class="field"><label for="n_pass">${t('nu_pass')}</label><input id="n_pass" class="in" type="text" dir="ltr"></div>
<div class="row"><div class="field"><label for="n_role">${t('a_role')}</label><select id="n_role" class="sel">${ROLES_ALL.map(r=>`<option value="${r}">${t('r_'+r)}</option>`).join('')}</select></div><div class="field"><label for="n_spec">${t('a_spec')}</label><select id="n_spec" class="sel">${SPECS.map(r=>`<option value="${r}">${t('sp_'+r)}</option>`).join('')}</select></div></div>
<label class="sw" style="cursor:pointer;margin-bottom:6px"><input type="checkbox" id="n_ver"> ${t('nu_ver')}</label><div class="err" id="aerr"></div>
<div class="mfoot"><button class="btn" data-action="saveuser2">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
document.addEventListener('change',e=>{
  const el=e.target,d=el.dataset||{};if(!isAdmin())return;
  if(d.sf){const [a,b]=d.sf.split('.');if(!S.site[a])return;S.site[a][b]=el.type==='checkbox'?el.checked:clean(el.value);save();toast(t('saved_t'));if(el.type==='checkbox')render();else if(a==='banner')document.querySelectorAll('.bslot').forEach(n=>{n.outerHTML=bannerHtml()})}
  else if(d.ov){const [k,i]=d.ov.split('|');if(!D[k])return;const pair=(OV[k]||D[k]).slice();pair[+i]=clean(el.value);if(pair[0]===D[k][0]&&pair[1]===D[k][1])delete OV[k];else OV[k]=pair;save();toast(t('ed_saved'));const l=$('#txList');if(l)l.innerHTML=textRows()}
  else if(d.tip){const [i,j]=d.tip.split('|');ensureTips();if(!S.site.tips[+i])return;S.site.tips[+i][+j]=clean(el.value);save()}
});
Object.assign(D,{
 nt_title:['الإشعارات','Notifications'],nt_all:['الكل','All'],nt_unread:['غير المقروءة','Unread'],nt_readall:['تحديد الكل كمقروء','Mark all as read'],nt_clear:['مسح المقروءة','Clear read'],
 nt_empty:['لا توجد إشعارات بعد. ستظهر هنا طلبات الصداقة والتعليقات وقرارات الانضمام والتوثيق.','No notifications yet. Friend requests, comments, join decisions and verification updates will appear here.'],nt_empty_u:['لا توجد إشعارات غير مقروءة.','Nothing unread.'],
 nt_new:['لديك {0} إشعارات جديدة','You have {0} new notifications'],nt_gone:['المحتوى لم يعد متاحًا.','This content is no longer available.'],nt_sys:['إدارة MedRo','MedRo team'],
 nt_friend_req:['{0} أرسل لك طلب صداقة','{0} sent you a friend request'],nt_friend_ok:['{0} قبل طلب صداقتك','{0} accepted your friend request'],
 nt_like:['{0} وجد منشورك مفيدًا','{0} found your post useful'],nt_comment:['{0} علّق على منشورك','{0} commented on your post'],nt_repost:['{0} أعاد نشر منشورك','{0} reposted your post'],
 nt_join_req:['{0} يطلب الانضمام إلى «{1}»','{0} asked to join “{1}”'],nt_join_ok:['تمت الموافقة على انضمامك إلى «{1}»','Your request to join “{1}” was approved'],nt_join_no:['تم رفض طلب انضمامك إلى «{1}»','Your request to join “{1}” was declined'],
 nt_kicked:['تمت إزالتك من مجموعة «{1}»','You were removed from “{1}”'],nt_mod_set:['تم تعيينك مشرفًا على «{1}»','You were appointed moderator of “{1}”'],
 nt_v_req:['{0} أرسل طلب توثيق','{0} sent a verification request'],nt_v_ok:['تم توثيق حسابك. مبروك!','Your account is now verified. Congratulations!'],nt_v_no:['لم تتم الموافقة على طلب التوثيق. يمكنك إرسال طلب جديد.','Your verification request was not approved. You can send a new one.'],
 nt_removed:['تم حذف أحد منشوراتك لمخالفته سياسة المجتمع.','One of your posts was removed for breaking community guidelines.']
});
const NT_ICON={friend_req:'users',friend_ok:'check',like:'bulb',comment:'comment',repost:'repost',join_req:'group',join_ok:'group',join_no:'group',kicked:'ban',mod_set:'shield',v_req:'stamp',v_ok:'stamp',v_no:'stamp',removed:'trash'};
const NT_COL={friend_req:'var(--cyan)',friend_ok:'var(--ok)',like:'var(--y)',comment:'var(--cyan)',repost:'var(--o)',join_req:'var(--pink)',join_ok:'var(--ok)',join_no:'var(--muted)',kicked:'var(--danger)',mod_set:'var(--pink)',v_req:'var(--pink)',v_ok:'var(--cyan)',v_no:'var(--muted)',removed:'var(--danger)'};
function notify(to,type,ref){
  const m=me();if(!m||!to||to===m.id||!U(to)||hid(to))return;
  if(!Array.isArray(S.notifs))S.notifs=[];
  if(['like','comment','repost'].includes(type)&&S.notifs.some(n=>n.to===to&&n.from===m.id&&n.type===type&&n.ref===ref&&!n.read))return;
  S.notifs.push({id:uid(),to,from:m.id,type,ref:ref||'',ts:Date.now(),read:false});
  if(S.notifs.length>600)S.notifs=S.notifs.filter(n=>!n.read||Date.now()-n.ts<7*Dd).slice(-600);
}
const notifyAdmins=(type,ref,except)=>S.users.filter(u=>u.role==='admin'&&u.id!==except&&!u.banned).forEach(a=>notify(a.id,type,ref));
const myNotifs=()=>S.me?(S.notifs||[]).filter(n=>n.to===S.me&&U(n.from)&&!hid(n.from)).sort((a,b)=>b.ts-a.ts):[];
const unreadCount=()=>myNotifs().filter(n=>!n.read).length;
function ntText(n){
  const u=U(n.from),g=S.groups.find(x=>x.id===n.ref);
  return t('nt_'+n.type,u?'<b>'+esc(L(u.name))+'</b>':'',g?'<b>'+esc(L(g.name))+'</b>':'');
}
function notifsView(){
  const all=myNotifs(),list=ui.ntab==='unread'?all.filter(n=>!n.read):all,un=all.filter(n=>!n.read).length;
  const row=n=>{const u=U(n.from),ic0=NT_ICON[n.type]||'bell';
    return `<div class="card nt ${n.read?'':'un'}" role="button" tabindex="0" data-action="nopen" data-id="${n.id}"><span class="nti" style="background:${NT_COL[n.type]||'var(--cyan)'}">${ic(ic0)}</span><div class="grow"><div>${ntText(n)}</div><div class="muted sm">${ago(n.ts)}</div></div>${n.read?'':'<i class="ndot" aria-label="new"></i>'}</div>`};
  return `<div class="item"><h2 class="grow">${ic('bell')} ${t('nt_title')}</h2>${un?`<button class="btn line s" data-action="nreadall">${t('nt_readall')}</button>`:''}${all.some(n=>n.read)?`<button class="btn line s" data-action="nclear">${t('nt_clear')}</button>`:''}</div>
<div class="subtabs"><button class="${ui.ntab!=='unread'?'on':''}" data-action="ntab" data-id="all">${t('nt_all')}</button><button class="${ui.ntab==='unread'?'on':''}" data-action="ntab" data-id="unread">${t('nt_unread')}${un?' ('+un+')':''}</button></div>
<div class="list">${list.map(row).join('')||`<div class="card empty">${t(ui.ntab==='unread'?'nt_empty_u':'nt_empty')}</div>`}</div>`;
}
function nOpen(id){
  const n=(S.notifs||[]).find(x=>x.id===id);if(!n||n.to!==S.me)return;
  n.read=true;save();
  const gone=()=>{render();toast(t('nt_gone'))};
  switch(n.type){
    case 'friend_req':ui.frTab='in';go('friends');break;
    case 'friend_ok':U(n.ref)?go('profile',n.ref):gone();break;
    case 'like':case 'comment':case 'repost':S.posts.some(p=>p.id===n.ref)?go('post',n.ref):gone();break;
    case 'join_req':case 'join_ok':case 'mod_set':S.groups.some(g=>g.id===n.ref)?go('group',n.ref):gone();break;
    case 'join_no':case 'kicked':go('groups');break;
    case 'v_req':ui.adminTab='verify';go(isAdmin()?'admin':'feed');break;
    case 'v_ok':case 'v_no':go('profile');break;
    default:if(/^cs_/.test(n.type)){const v=csNOpen(n);go(v==='admin'&&!isAdmin()?'feed':v)}else if(/^bz_/.test(n.type)){const v=bzNOpen(n);go(v==='admin'&&!isAdmin()?'feed':v)}else go('feed');
  }
}
function nReadAll(){myNotifs().forEach(n=>{n.read=true});save();render()}
function nClear(){S.notifs=(S.notifs||[]).filter(n=>n.to!==S.me||!n.read);save();render()}
function markRead(pred){(S.notifs||[]).forEach(n=>{if(n.to===S.me&&!n.read&&pred(n))n.read=true})}
/* ===== MedRo — الصور: ضغط داخل المتصفح ثم رفع إلى Supabase Storage (أو data: في الوضع التجريبي) ===== */
Object.assign(D,{
 add_photo:['إضافة صور','Add photos'],
 img_max:['الحد الأقصى 4 صور في المنشور.','Up to 4 photos per post.'],
 img_bad:['الملف ليس صورة صالحة (JPG أو PNG أو WebP أو GIF).','That file is not a valid image (JPG, PNG, WebP or GIF).'],
 img_big:['الصورة كبيرة جدًا (الحد 20MB).','The image is too large (20MB max).'],
 img_up:['جارٍ رفع الصور…','Uploading photos…'],
 img_fail:['تعذّر رفع الصورة. حاول مرة أخرى.','Could not upload the photo. Please try again.'],
 rm_img:['إزالة الصورة','Remove photo'],
 post_img:['صورة مرفقة بالمنشور','Photo attached to the post'],
 p_photo:['تغيير الصورة الشخصية','Change profile photo'],
 p_photo_rm:['إزالة الصورة','Remove photo'],
 photo_ok:['تم تحديث الصورة الشخصية','Profile photo updated'],
 img_note:['تُزال بيانات الموقع (EXIF) من الصور تلقائيًا. لا تنشر صورًا تكشف هوية مريض.','Location data (EXIF) is stripped automatically. Never post photos that identify a patient.']
});
IC.img='<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 9"/>';
const IMG_MAX=4;
const imgPrefix=()=>{try{return REAL?String(window.MEDRO_CONFIG.SUPABASE_URL).replace(/\/+$/,'')+'/storage/v1/object/public/media/':''}catch(e){return ''}};
/* لا يُعرض في <img> إلا رابط من تخزيننا (حقيقي) أو data: صورة (تجريبي) — يمنع روابط التتبّع الخارجية */
const imgOk=u=>{if(typeof u!=='string')return false;if(REAL){const p=imgPrefix();return !!p&&u.length<=600&&u.startsWith(p)}
  return u.length<=600000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(u)};
function compressImg(file,max,q,square){
  return new Promise((res,rej)=>{
    if(!file||!/^image\/(jpeg|png|webp|gif)$/.test(file.type))return rej(new Error('type'));
    if(file.size>20*1048576)return rej(new Error('big'));
    const url=URL.createObjectURL(file),im=new Image();
    im.onload=()=>{try{
      const w=im.naturalWidth,h=im.naturalHeight;if(!w||!h)throw new Error('type');
      let sx=0,sy=0,sw=w,sh=h;
      if(square){const s=Math.min(w,h);sx=(w-s)/2;sy=(h-s)/2;sw=s;sh=s}
      const k=Math.min(1,max/Math.max(sw,sh)),cw=Math.max(1,Math.round(sw*k)),ch=Math.max(1,Math.round(sh*k));
      const c=document.createElement('canvas');c.width=cw;c.height=ch;const x=c.getContext('2d');
      x.fillStyle='#fff';x.fillRect(0,0,cw,ch);x.drawImage(im,sx,sy,sw,sh,0,0,cw,ch);
      c.toBlob(b=>{URL.revokeObjectURL(url);b?res(b):rej(new Error('type'))},'image/jpeg',q);
    }catch(e){URL.revokeObjectURL(url);rej(e)}};
    im.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('type'))};
    im.src=url;
  });
}
const blobToData=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(new Error('read'));r.readAsDataURL(b)});
async function uploadImgs(blobs,kind){return REAL?BE.upload(blobs,kind):Promise.all(blobs.map(blobToData))}
const dropImgs=urls=>{if(REAL&&BE&&urls&&urls.length)BE.rmFiles(urls)};
const imgErr=e=>t(e&&e.message==='type'?'img_bad':e&&e.message==='big'?'img_big':'img_fail');

/* ----- مسودة المنشور ----- */
function prevHtml(){return ui.draftImgs.map(i=>`<div class="pvi"><img src="${i.url}" alt=""><button type="button" class="x" data-action="rmimg" data-id="${i.id}" aria-label="${esc(t('rm_img'))}">×</button></div>`).join('')}
function drawPrev(){const b=$('#pvbox');if(b)b.innerHTML=prevHtml()}
function rmDraftImg(id){const i=ui.draftImgs.findIndex(x=>x.id===id);if(i<0)return;try{URL.revokeObjectURL(ui.draftImgs[i].url)}catch(e){}ui.draftImgs.splice(i,1);drawPrev()}
function clearDraftImgs(){ui.draftImgs.forEach(i=>{try{URL.revokeObjectURL(i.url)}catch(e){}});ui.draftImgs=[]}

/* ----- عرض صور المنشور + التكبير ----- */
function postImgs(p){
  const im=(p.images||[]).filter(imgOk).slice(0,IMG_MAX);if(!im.length)return '';
  return `<div class="pimgs n${im.length}">${im.map((u,i)=>`<button type="button" class="pim" data-action="zoom" data-id="${p.id}" data-i="${i}"><img src="${esc(u)}" loading="lazy" alt="${esc(t('post_img'))}"></button>`).join('')}</div>`;
}
function imgZoom(el){
  const p=S.posts.find(x=>x.id===el.dataset.id);if(!p)return;
  const u=(p.images||[]).filter(imgOk)[+el.dataset.i];if(!u)return;
  $('#modal').innerHTML=`<div class="ov zm" data-action="ovclose"><img class="zimg" src="${esc(u)}" alt="${esc(t('post_img'))}"><button type="button" class="btn line ic s zx" data-action="closem" aria-label="${esc(t('close'))}">×</button></div>`;
}

/* ----- اختيار الملفات (input[type=file] يُعاد رسمه مع الواجهة، لذلك نستمع على المستند) ----- */
document.addEventListener('change',async e=>{
  const el=e.target;if(!el||!el.matches)return;
  if(el.matches('#imgin')){
    const files=[...el.files];el.value='';
    const room=Math.max(IMG_MAX-ui.draftImgs.length,0);
    if(files.length>room)toast(t('img_max'));
    for(const f of files.slice(0,room)){
      try{const b=await compressImg(f,REAL?1600:900,REAL?.82:.7);ui.draftImgs.push({id:uid(),blob:b,url:URL.createObjectURL(b)});drawPrev()}
      catch(err){toast(imgErr(err))}
    }
  }else if(el.matches('#avin')){
    const f=el.files&&el.files[0];el.value='';const u=me();if(!f||!u)return;
    try{
      toast(t('img_up'));
      const b=await compressImg(f,REAL?384:256,REAL?.85:.75,true);
      const [url]=await uploadImgs([b],'avatar');
      const old=u.avatar;u.avatar=url;
      if(old&&old!==url)setTimeout(()=>dropImgs([old]),8000);
      save();render();const pv=$('#avprev');if(pv)pv.innerHTML=avatar(me(),'xl');toast(t('photo_ok'));
    }catch(err){toast(imgErr(err))}
  }
});
/* ===== MedRo — حذف الحساب (مطلوب من Google Play) + زر الرجوع في تطبيق أندرويد ===== */
Object.assign(D,{
 del_acc:['حذف حسابي','Delete my account'],
 del_acc_t:['حذف الحساب نهائيًا','Delete account permanently'],
 del_acc_msg:['سيُحذف حسابك مع منشوراتك وتعليقاتك وصورك وسجلك الطبي وكل بياناتك المرتبطة به. لا يمكن التراجع عن ذلك.','Your account will be deleted together with your posts, comments, photos, medical record and all data linked to it. This cannot be undone.'],
 del_word:['حذف','DELETE'],
 del_type:['اكتب كلمة «حذف» للتأكيد','Type DELETE to confirm'],
 del_do:['حذف حسابي نهائيًا','Delete my account permanently'],
 del_admin:['حساب الأدمن لا يُحذف من هنا. اطلب من أدمن آخر حذفه أو أزل عنه صلاحية الأدمن أولًا.','An admin account cannot be deleted here. Ask another admin to delete it, or remove its admin role first.'],
 del_done:['تم حذف حسابك وبياناتك.','Your account and data were deleted.'],
 del_fail:['تعذّر حذف الحساب. حاول مرة أخرى.','Could not delete the account. Please try again.'],
 priv:['سياسة الخصوصية','Privacy policy']
});
function delAccModal(){
  const u=me();if(!u)return;
  if(u.role==='admin'||isAdmin()){toast(t('del_admin'));return}
  openModal(`<h3>${t('del_acc_t')}</h3><p class="muted" style="line-height:1.8">${t('del_acc_msg')}</p><div class="field"><label for="da_w">${t('del_type')}</label><input id="da_w" class="in" autocomplete="off"></div><div class="mfoot"><button class="btn danger" data-action="delme">${ic('trash')} ${t('del_do')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
async function delMe(){
  const w=val('da_w').trim();
  if(w!==t('del_word')&&w.toUpperCase()!=='DELETE'){toast(t('del_type'));return}
  const u=me();if(!u||u.role==='admin'||isAdmin()){toast(t('del_admin'));return}
  const id=u.id;
  if(REAL){
    try{await BE.fn('admin',{action:'delete_self'})}
    catch(e){toast(e&&e.message==='last_admin'?t('del_admin'):t('del_fail'));return}
    try{await BE.logout(true)}catch(e){}
  }else{
    S.users=S.users.filter(x=>x.id!==id);S.posts=S.posts.filter(p=>p.uid!==id);
    S.posts.forEach(p=>{p.likes=(p.likes||[]).filter(x=>x!==id);p.comments=(p.comments||[]).filter(c=>c.uid!==id)});
    S.friends=S.friends.filter(f=>f.a!==id&&f.b!==id);S.notifs=(S.notifs||[]).filter(n=>n.to!==id&&n.from!==id);
    S.groups.forEach(g=>{g.members=g.members.filter(x=>x!==id);g.pending=(g.pending||[]).filter(x=>x!==id);if(g.mod===id)g.mod=undefined});
    S.jobs.forEach(j=>{j.applicants=(j.applicants||[]).filter(x=>x!==id);j.saved=(j.saved||[]).filter(x=>x!==id)});
  }
  closeModal();
  transition(()=>{S.me=null;if(!REAL)save();ui.view='landing';ui.menu=null;ui.chat=[];render();window.scrollTo(0,0);toast(t('del_done'))});
}

/* زر الرجوع في أندرويد (Capacitor): يغلق النافذة ← يرجع للرئيسية ← يخرج من التطبيق */
(function(){
  try{
    const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
    const App=C.Plugins&&C.Plugins.App;if(!App||!App.addListener)return;
    App.addListener('backButton',()=>{
      if($('#modal')&&$('#modal').innerHTML){closeModal();return}
      if(ui.menu){ui.menu=null;render();return}
      if(S.me&&ui.view!=='feed'){go('feed');return}
      if(App.exitApp)App.exitApp();
    });
  }catch(e){}
})();
/* ===== MedRo — حظر المستخدمين ===== */
Object.assign(D,{
 blk:['حظر','Block'],
 unblk:['إلغاء الحظر','Unblock'],
 blk_t:['حظر {n}؟','Block {n}?'],
 blk_msg:['لن ترى منشوراته وتعليقاته ولن يرى منشوراتك وتعليقاتك، وتُلغى الصداقة بينكما، ولن يستطيع إضافتك أو إرسال إشعارات لك. لن يُبلَّغ بأنك حظرته، ويمكنك إلغاء الحظر في أي وقت من قائمة المحظورين.','You will not see their posts or comments and they will not see yours. Any friendship between you ends, and they cannot add you or send you notifications. They are not told that you blocked them, and you can unblock at any time from the blocked list.'],
 blk_done:['تم حظر المستخدم.','User blocked.'],
 unblk_done:['تم إلغاء الحظر.','User unblocked.'],
 blk_list:['المحظورون','Blocked users'],
 blk_none:['لا يوجد مستخدمون محظورون.','You have not blocked anyone.'],
 blk_prof:['لقد حظرت هذا المستخدم، فلا تظهر لك منشوراته ولا تظهر له منشوراتك.','You blocked this user, so you will not see their posts and they will not see yours.'],
 blk_unavail:['هذا الملف غير متاح.','This profile is not available.']
});
IC.block='<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>';
function blkModal(id){
  const u=U(id);if(!u||id===S.me||u.role==='admin')return;
  ui.menu=null;
  openModal(`<h3>${t('blk_t').replace('{n}',esc(L(u.name)))}</h3><p class="muted" style="line-height:1.8">${t('blk_msg')}</p><div class="mfoot"><button class="btn danger" data-action="blkdo" data-id="${u.id}">${ic('block')} ${t('blk')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function blkDo(id){
  const m=me(),u=U(id);if(!m||!u||id===m.id||u.role==='admin'||blkMine(id))return;
  S.blocks.push({by:m.id,id,ts:Date.now()});
  dropFriend(id);
  closeModal();save();render();toast(t('blk_done'));
}
function unBlk(id){
  const m=me();if(!m)return;
  S.blocks=S.blocks.filter(b=>!(b.by===m.id&&b.id===id));
  save();render();
  if($('#modal')&&$('#modal').querySelector('#blkl'))blkListModal();
  toast(t('unblk_done'));
}
function blkListModal(){
  const list=S.blocks.filter(b=>b.by===S.me).map(b=>U(b.id)).filter(Boolean);
  openModal(`<h3>${t('blk_list')}</h3><div id="blkl" class="list">${list.map(u=>`<div class="item" style="flex-wrap:nowrap">${avatar(u,'s')}<div class="grow"><b>${nm(u)}</b><div class="muted sm">${sub(u)}</div></div><button class="btn line s" data-action="unblk" data-id="${u.id}">${t('unblk')}</button></div>`).join('')||`<div class="empty">${t('blk_none')}</div>`}</div><div class="mfoot"><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function blockedProfile(u){
  const mine=blkMine(u.id);
  return `<div class="card" style="text-align:center;padding:36px 20px"><div style="display:flex;justify-content:center">${avatar(u,'xl')}</div><h2 style="margin-top:12px">${mine?nm(u):''}</h2><p class="muted" style="margin:10px auto 18px;max-width:420px">${t(mine?'blk_prof':'blk_unavail')}</p>${mine?`<button class="btn line" data-action="unblk" data-id="${u.id}">${t('unblk')}</button>`:''}</div>`;
}
/* ===== MedRo — للاستفسارات الطبية (التشخيص الأونلاين): نصوص + بيانات + خدمة (تجريبي/حقيقي) =====
   كل النصوص هنا في القاموس D بمفاتيح تبدأ بـ cs_/cse_/ac_/nt_cs_ فيستطيع الأدمن تعديلها من «النصوص». */
Object.assign(D,{
 nav_consult:['للاستفسارات الطبية','Medical consultations'],nav_consult_s:['استفسارات','Consults'],su_doc_note:['لقب «طبيب» لا يُختار عند التسجيل؛ يمنحه فريق المنصة بعد مراجعة طلبك من قسم «للاستفسارات الطبية». يظهر بجوار اسمك لقبك المسجَّل.','The “Doctor” title cannot be chosen at sign-up; the team grants it after reviewing your application in “Medical consultations”. Your chosen title shows next to your name.'],demo_m:['دخول كعضو','Log in as member'],
 cs_title:['للاستفسارات الطبية','Medical consultations'],
 cs_sub:['احجز كشفًا أونلاين مع أطباء معتمدين من المنصة، وادفع بفودافون كاش أو إنستا باي.','Book an online visit with platform-approved doctors and pay with Vodafone Cash or InstaPay.'],
 cs_disc:['الاستشارة الأونلاين لا تغني عن الفحص المباشر ولا تصلح للحالات الطارئة. في الطوارئ توجّه لأقرب مستشفى أو اتصل بالإسعاف 123.','An online consultation does not replace an in-person exam and is not for emergencies. In an emergency go to the nearest hospital or call ambulance 123.'],
 cs_off:['هذا القسم غير متاح حاليًا.','This section is not available right now.'],
 cs_tab_dir:['الأطباء','Doctors'],cs_tab_mine:['حجوزاتي','My bookings'],cs_tab_doc:['لوحة الطبيب','Doctor dashboard'],cs_tab_apply:['التسجيل كطبيب','Register as a doctor'],
 cs_all:['كل التخصصات','All specialties'],cs_search:['ابحث باسم الطبيب أو التخصص','Search by doctor or specialty'],cs_n_avail:['{0} متاح','{0} available'],
 cs_none:['لا يوجد أطباء مطابقون حاليًا.','No matching doctors right now.'],cs_specs_h:['التخصصات المتاحة','Available specialties'],
 cs_active:['نشط الآن','Active now'],cs_inactive:['غير نشط حاليًا','Not active right now'],cs_fee:['سعر الكشف','Consultation fee'],cs_egp:['ج.م','EGP'],
 cs_no_rating:['لا تقييمات بعد','No ratings yet'],cs_reviews:['{0} تقييم','{0} reviews'],cs_hours:['مواعيد العمل','Working hours'],cs_closed:['إجازة','Off'],
 cs_book:['احجز كشفًا','Book a visit'],cs_view:['التفاصيل','Details'],cs_inactive_note:['الطبيب غير نشط حاليًا ولا يستقبل حجوزات جديدة.','This doctor is not active and is not taking new bookings.'],
 cs_bio_none:['لم يضف الطبيب نبذة بعد.','No bio yet.'],cs_rv_title:['آراء المرضى','Patient reviews'],cs_rv_none:['لا توجد تقييمات بعد.','No reviews yet.'],
 cs_d0:['الأحد','Sunday'],cs_d1:['الاثنين','Monday'],cs_d2:['الثلاثاء','Tuesday'],cs_d3:['الأربعاء','Wednesday'],cs_d4:['الخميس','Thursday'],cs_d5:['الجمعة','Friday'],cs_d6:['السبت','Saturday'],
 cs_admin_note:['أنت أدمن: تتابع القسم من لوحة الإدارة ولا تحجز.','You are an admin: manage this section from the admin panel; booking is for members.'],
 cs_book_t:['حجز كشف مع {0}','Book a visit with {0}'],cs_pick_day:['اختر اليوم','Pick a day'],cs_pick_time:['اختر الموعد (بتوقيت القاهرة)','Pick a time (Cairo time)'],
 cs_no_slots:['لا توجد مواعيد متاحة خلال الأيام القادمة.','No slots available in the coming days.'],
 cs_complaint:['اكتب شكواك باختصار','Briefly describe your complaint'],cs_complaint_ph:['مثال: ألم في الصدر منذ يومين…','e.g. chest pain for two days…'],
 cs_continue:['متابعة للدفع','Continue to payment'],cs_hold_note:['سيُحجز الموعد لك {0} دقيقة حتى تُكمل الدفع.','The slot is held for you for {0} minutes while you pay.'],
 cs_total:['المبلغ المطلوب','Amount due'],cs_slot_min:['مدة الكشف {0} دقيقة','{0}-minute visit'],
 cs_pay_t:['إتمام الدفع','Complete payment'],cs_pay_to:['حوّل المبلغ إلى','Transfer the amount to'],cs_vf:['فودافون كاش','Vodafone Cash'],cs_ip:['إنستا باي','InstaPay'],
 cs_vf_no:['رقم المحفظة','Wallet number'],cs_ip_no:['عنوان إنستا باي','InstaPay address'],cs_acc_name:['باسم','Account name'],
 cs_pay_ref:['رقم عملية التحويل','Transfer reference number'],cs_pay_ref_ph:['رقم العملية من رسالة التأكيد','Reference from the confirmation message'],
 cs_proof:['صورة إيصال التحويل (اختياري ويسرّع التأكيد)','Transfer receipt photo (optional, speeds up confirmation)'],cs_proof_ok:['تم اختيار صورة الإيصال','Receipt photo selected'],
 cs_method:['طريقة الدفع','Payment method'],cs_submit_pay:['أرسلت التحويل','I sent the transfer'],cs_expires:['ينتهي الحجز بعد {0} دقيقة','The hold expires in {0} min'],
 cs_pay_not_set:['لم يضبط الأدمن بيانات الاستلام لهذه الوسيلة بعد.','The admin has not set the receiving details for this method yet.'],
 cs_pay_note:['بعد التحويل اكتب رقم العملية. يؤكد فريق المنصة الدفع ثم يتأكد موعدك.','After transferring, enter the reference. The team confirms the payment, then your slot is confirmed.'],
 cs_pay_sent:['وصل طلبك. بانتظار تأكيد الدفع من المنصة.','Received. Waiting for the platform to confirm the payment.'],
 cs_st_held:['بانتظار الدفع','Awaiting payment'],cs_st_awaiting:['بانتظار تأكيد الدفع','Payment under review'],cs_st_confirmed:['مؤكد','Confirmed'],cs_st_completed:['تمت','Completed'],cs_st_cancelled:['ملغي','Cancelled'],cs_st_expired:['انتهت المهلة','Expired'],
 cs_mine_empty:['لا توجد حجوزات بعد. اختر طبيبًا من تبويب «الأطباء».','No bookings yet. Pick a doctor from the “Doctors” tab.'],
 cs_open:['فتح','Open'],cs_cancel:['إلغاء الحجز','Cancel booking'],cs_cancel_q:['هل تريد إلغاء هذا الحجز؟','Cancel this booking?'],cs_cancel_yes:['نعم، ألغِ','Yes, cancel'],cs_keep:['لا، أبقِه','Keep it'],
 cs_cancel_late:['الإلغاء قبل الموعد بأقل من {0} ساعة لا يُسترد معه المبلغ تلقائيًا.','Cancelling less than {0}h before the visit is not refunded automatically.'],
 cs_pay_now:['ادفع الآن','Pay now'],cs_cancelled_ok:['تم إلغاء الحجز','Booking cancelled'],cs_refund_due:['المبلغ مستحق الرد، وسيحوّله لك فريق المنصة.','A refund is due; the team will transfer it to you.'],cs_refund_done:['تم رد المبلغ إليك.','The amount was refunded.'],
 cs_room_t:['الاستشارة','Consultation'],cs_with:['مع','with'],cs_when:['الموعد','Time'],cs_meet:['رابط الاجتماع (Meet / Zoom …)','Meeting link (Meet / Zoom …)'],cs_join:['انضم للاجتماع','Join meeting'],
 cs_no_meet:['لم يضف الطبيب رابط اجتماع بعد. يمكنكما التواصل عبر المحادثة.','No meeting link yet. You can talk in the chat.'],cs_diag:['التشخيص والتوصيات','Diagnosis & advice'],cs_diag_none:['لم يكتب الطبيب التشخيص بعد.','The doctor has not written a diagnosis yet.'],
 cs_save:['حفظ','Save'],cs_saved:['تم الحفظ','Saved'],cs_chat:['المحادثة','Chat'],cs_chat_ph:['اكتب رسالة…','Write a message…'],cs_send:['إرسال','Send'],cs_chat_empty:['لا رسائل بعد.','No messages yet.'],cs_chat_closed:['المحادثة متاحة بعد تأكيد الحجز.','Chat opens once the booking is confirmed.'],
 cs_complaint_l:['شكوى المريض','Patient complaint'],cs_complete:['إنهاء الاستشارة','Mark as completed'],cs_complete_ok:['تم إنهاء الاستشارة. نصيبك مستحق التحويل.','Completed. Your share is due for transfer.'],
 cs_rate_t:['قيّم الطبيب','Rate the doctor'],cs_rate_ph:['تعليق (اختياري)','Comment (optional)'],cs_rate_send:['إرسال التقييم','Submit rating'],cs_rated:['شكرًا لتقييمك','Thanks for rating'],cs_rate_none:['اختر عدد النجوم','Pick a star rating'],
 cs_priv:['محتوى الاستشارة خاص بك وبالطبيب فقط، ولا يراه الأدمن.','The consultation content is private to you and the doctor; admins cannot see it.'],
 cs_dash:['لوحة الطبيب','Doctor dashboard'],cs_active_sw:['نشط (أستقبل حجوزات)','Active (taking bookings)'],cs_active_h:['عند إيقافه يظهر ملفك للمرضى بحالة «غير نشط» ولا يستطيعون الحجز.','When off, patients see you as “not active” and cannot book.'],
 cs_suspended:['تم إيقاف حسابك من الإدارة. تواصل مع فريق المنصة.','Your account was suspended by the team. Contact the platform.'],
 cs_fee_l:['سعر الكشف (جنيه)','Consultation fee (EGP)'],cs_fee_hint:['الحد من {0} إلى {1} جنيه. تخصم المنصة {2}% وتحصل أنت على {3} جنيه.','Allowed {0}–{1} EGP. The platform takes {2}% and you receive {3} EGP.'],
 cs_bio:['نبذة عنك للمرضى','About you (for patients)'],cs_hours_l:['مواعيد العمل الأسبوعية (بتوقيت القاهرة)','Weekly working hours (Cairo time)'],cs_from:['من','From'],cs_to:['إلى','To'],cs_work:['يعمل','Works'],
 cs_payout:['طريقة استلام مستحقاتك','How you receive your earnings'],cs_payout_h:['تحوّل المنصة نصيبك يدويًا بعد إتمام كل استشارة.','The platform transfers your share manually after each completed consultation.'],cs_handle:['الرقم / العنوان','Number / address'],
 cs_earn:['الأرباح','Earnings'],cs_earn_due:['مستحق لك','Due to you'],cs_earn_paid:['تم تحويله لك','Transferred to you'],cs_my_bk:['حجوزات المرضى','Patient bookings'],cs_none_bk:['لا توجد حجوزات بعد.','No bookings yet.'],
 cs_need_fee:['حدد سعر الكشف أولًا.','Set your fee first.'],cs_need_hours:['أضف مواعيد عمل أولًا.','Add working hours first.'],cs_hours_bad:['مواعيد العمل غير صحيحة (تأكد أن «إلى» بعد «من» وأن الفترات لا تتداخل).','Working hours are invalid (“to” must be after “from”, no overlaps).'],
 cs_net:['صافي لك','Your share'],cs_commission:['عمولة المنصة','Platform fee'],cs_patient:['المريض','Patient'],cs_payout_due:['بانتظار تحويل نصيبك','Your share is due'],cs_payout_paid:['تم تحويل نصيبك','Your share was transferred'],
 cs_apply_t:['التسجيل كطبيب للتشخيص الأونلاين','Register as an online-consultation doctor'],cs_apply_p:['املأ البيانات ليراجعها فريق المنصة. لن تظهر في دليل الأطباء إلا بعد الموافقة.','Fill in the details for the team to review. You will not be listed until approved.'],
 cs_f_name:['الاسم الكامل','Full name'],cs_f_age:['السن','Age'],cs_f_phone:['رقم التليفون الشخصي','Personal phone number'],cs_f_uni:['الجامعة التي تخرجت منها','University you graduated from'],cs_f_lic:['رقم القيد (النقابة)','Registration (syndicate) number'],cs_f_spec:['التخصص','Specialty'],
 cs_f_id:['صورة البطاقة (الرقم القومي)','ID card photo'],cs_f_selfie:['صورة حية من خلال الموقع','Live photo taken here'],cs_pick_file:['اختيار صورة','Choose a photo'],
 cs_cam_open:['فتح الكاميرا','Open camera'],cs_cam_snap:['التقاط الصورة','Capture'],cs_cam_retake:['إعادة التقاط','Retake'],cs_cam_stop:['إغلاق الكاميرا','Close camera'],
 cs_cam_denied:['تعذّر فتح الكاميرا. اسمح للموقع بالوصول للكاميرا ثم أعد المحاولة.','Could not open the camera. Allow camera access and try again.'],cs_cam_fallback:['التقاط بكاميرا الجهاز','Use device camera'],
 cs_consent:['أوافق على استخدام بياناتي وصوري لأغراض التحقق فقط، وأعلم أنها تُحفظ في مخزن خاص لا يراه إلا فريق الإدارة.','I agree my data and photos are used for verification only and are stored privately, visible only to the admin team.'],
 cs_submit_app:['إرسال الطلب','Submit application'],cs_app_pending:['طلبك قيد المراجعة. سنُشعرك بالقرار.','Your application is under review. You will be notified.'],cs_app_rej:['لم تتم الموافقة على طلبك.','Your application was not approved.'],
 cs_app_rej_note:['ملاحظة الإدارة: {0}','Admin note: {0}'],cs_app_again:['تقديم طلب جديد','Submit a new application'],cs_app_err:['أكمل كل الحقول، وارفع الصورتين، ووافق على الشرط.','Complete all fields, add both photos and accept the agreement.'],
 cs_sent:['تم إرسال طلبك للمراجعة','Application sent for review'],cs_apply_cta:['هل أنت طبيب؟ سجّل لتقدّم استشارات أونلاين وتستقبل حجوزات.','Are you a doctor? Register to give online consultations.'],
 cs_member_note:['الأعضاء غير الأطباء يحجزون فقط. لقب «طبيب» يمنحه فريق المنصة بعد مراجعة طلبك.','Non-doctor members can only book. The “Doctor” title is granted by the team after reviewing your application.'],
 cse_slot_taken:['هذا الموعد حُجز للتو. اختر موعدًا آخر.','That slot was just taken. Pick another.'],cse_slot_invalid:['هذا الموعد خارج مواعيد الطبيب.','That time is outside the doctor’s hours.'],cse_slot_out_of_range:['هذا الموعد غير متاح للحجز.','That time cannot be booked.'],
 cse_doctor_unavailable:['الطبيب غير متاح حاليًا.','The doctor is not available right now.'],cse_complaint_required:['اكتب شكواك أولًا.','Please describe your complaint.'],cse_too_many_holds:['لديك حجوزات كثيرة بانتظار الدفع. أتمم الدفع أو ألغِ أحدها.','You have too many bookings awaiting payment. Pay or cancel one.'],
 cse_hold_expired:['انتهت مهلة الحجز. احجز موعدًا جديدًا.','The hold expired. Please book again.'],cse_ref_required:['اكتب رقم عملية التحويل.','Enter the transfer reference.'],cse_bad_method:['وسيلة دفع غير صحيحة.','Invalid payment method.'],cse_method_off:['هذه الوسيلة غير متاحة حاليًا.','That method is not available right now.'],cse_bad_proof:['صورة الإيصال غير صالحة.','Invalid receipt photo.'],
 cse_fee_range:['السعر خارج الحد المسموح.','The fee is outside the allowed range.'],cse_fee_required:['حدد سعرًا أكبر من صفر.','Set a fee above zero.'],cse_bad_hours:['مواعيد العمل غير صحيحة.','Invalid working hours.'],cse_bad_link:['الرابط يجب أن يبدأ بـ https://','The link must start with https://'],
 cse_too_early:['لا يمكن إنهاء الاستشارة قبل موعدها.','You cannot complete it before its scheduled time.'],cse_bad_state:['لا يمكن تنفيذ هذا الإجراء في الحالة الحالية.','That action is not possible in the current state.'],cse_chat_closed:['أُغلقت المحادثة بعد انتهاء المدة.','The chat is closed.'],
 cse_self_booking:['لا يمكنك حجز كشف عند نفسك.','You cannot book yourself.'],cse_admin_cannot_book:['حساب الأدمن لا يحجز.','Admin accounts cannot book.'],cse_consult_off:['القسم غير متاح حاليًا.','This section is not available right now.'],cse_has_open_bookings:['لدى الطبيب حجوزات مفتوحة.','The doctor has open bookings.'],
 cse_pending_exists:['لديك طلب قيد المراجعة بالفعل.','You already have a pending application.'],cse_already_doctor:['أنت طبيب معتمد بالفعل.','You are already an approved doctor.'],cse_bad_stars:['اختر من 1 إلى 5 نجوم.','Pick 1 to 5 stars.'],cse_already_rated:['قيّمت هذه الاستشارة من قبل.','You already rated this.'],
 cse_unavailable:['غير متاح.','Unavailable.'],cse_forbidden:['غير مسموح.','Not allowed.'],cse_files_required:['ارفع صورة البطاقة والصورة الحية.','Upload the ID photo and the live photo.'],cse_x:['تعذّرت العملية. حاول مرة أخرى.','Something went wrong. Please try again.'],
 nt_cs_pay:['حجز جديد بانتظار تأكيد الدفع','A new booking awaits payment confirmation'],nt_cs_refund:['حجز ملغي يحتاج رد مبلغ','A cancelled booking needs a refund'],nt_cs_payout:['استشارة اكتملت: نصيب طبيب بانتظار التحويل','Consultation completed: a doctor’s share is due'],
 nt_cs_app_ok:['تمت الموافقة على طلبك. أصبحت طبيبًا معتمدًا في «للاستفسارات الطبية»','Approved! You are now a doctor in “Medical consultations”'],nt_cs_app_no:['لم تتم الموافقة على طلب التسجيل كطبيب','Your doctor application was not approved'],
 nt_cs_confirmed:['تم تأكيد دفعك وموعدك','Your payment and slot are confirmed'],nt_cs_new:['لديك حجز مؤكد جديد','You have a new confirmed booking'],nt_cs_pay_rej:['لم يُقبل إثبات الدفع. راجع البيانات وأعد المحاولة','Payment proof was not accepted. Check and try again'],
 nt_cs_cancel:['تم إلغاء حجز','A booking was cancelled'],nt_cs_done:['أنهى الطبيب الاستشارة. يمكنك تقييمه الآن','The doctor completed your consultation. You can rate now'],nt_cs_msg:['{0} أرسل رسالة في الاستشارة','{0} sent a message in the consultation'],
 nt_cs_diag:['أضاف الطبيب التشخيص والتوصيات','The doctor added a diagnosis and advice'],nt_cs_rated:['{0} قيّمك بعد الاستشارة','{0} rated you'],nt_cs_refunded:['تم رد المبلغ إليك','Your payment was refunded'],nt_cs_paidout:['حوّلت المنصة نصيبك من استشارة','The platform transferred your share'],
 ad_cons:['التشخيص الأونلاين','Online consults'],
 ac_apps:['طلبات الأطباء','Applications'],ac_docs:['الأطباء','Doctors'],ac_pay:['المدفوعات','Payments'],ac_rev:['التقييمات','Reviews'],ac_set:['الإعدادات','Settings'],
 ac_review:['مراجعة','Review'],ac_approve:['قبول','Approve'],ac_reject:['رفض','Reject'],ac_note:['ملاحظة للطبيب (تظهر له عند الرفض)','Note to the applicant (shown on rejection)'],ac_files_del:['حذف صور الهوية بعد المراجعة','Delete ID photos after review'],ac_files_gone:['تم حذف ملفات الهوية','ID files deleted'],
 ac_none:['لا توجد عناصر.','Nothing here.'],ac_pending:['قيد المراجعة','Pending'],ac_approved:['مقبول','Approved'],ac_rejected:['مرفوض','Rejected'],ac_id_photo:['صورة البطاقة','ID photo'],ac_selfie:['الصورة الحية','Live photo'],ac_loading:['جارٍ تحميل الصورة…','Loading photo…'],ac_no_files:['لا توجد ملفات (حُذفت).','No files (deleted).'],
 ac_suspend:['إيقاف','Suspend'],ac_unsuspend:['إلغاء الإيقاف','Unsuspend'],ac_revoke:['سحب لقب طبيب','Revoke doctor'],ac_revoke_q:['سحب لقب الطبيب من هذا الحساب؟','Revoke the doctor title from this account?'],ac_suspended:['موقوف','Suspended'],ac_spec_change:['تغيير التخصص','Change specialty'],
 ac_payout_info:['وسيلة استلامه','Payout method'],ac_not_set:['غير مضبوطة','Not set'],
 ac_f_need:['يحتاج إجراء','Needs action'],ac_f_all:['الكل','All'],ac_f_awaiting:['بانتظار التأكيد','Awaiting'],ac_f_refund:['استرداد','Refunds'],ac_f_payout:['مستحقات أطباء','Payouts'],
 ac_confirm:['تأكيد الدفع','Confirm payment'],ac_rej_pay:['رفض الإثبات','Reject proof'],ac_refund_done:['تم رد المبلغ','Refund sent'],ac_refund_mark:['تسجيل رد مستحق','Mark refund due'],ac_payout_done:['تم تحويل نصيب الطبيب','Doctor paid'],ac_cancel_b:['إلغاء الحجز','Cancel booking'],ac_ref_prompt:['رقم/ملاحظة العملية (اختياري)','Reference / note (optional)'],ac_proof:['صورة الإيصال','Receipt'],
 ac_sum_in:['إجمالي المحصَّل','Collected'],ac_sum_fee:['عمولة المنصة (للاستشارات المكتملة)','Platform fees (completed)'],ac_sum_due:['مستحق للأطباء','Due to doctors'],ac_sum_paid:['حُوِّل للأطباء','Paid to doctors'],ac_sum_ref:['مبالغ للرد','Refunds due'],
 ac_hide:['إخفاء','Hide'],ac_show:['إظهار','Show'],ac_hidden:['مخفي','Hidden'],
 ac_s_gen:['الأسعار والعمولة والمواعيد','Fees, commission & slots'],ac_s_comm:['نسبة عمولة المنصة %','Platform commission %'],ac_s_slot:['مدة الكشف (دقيقة)','Visit length (min)'],ac_s_days:['أيام الحجز المسبق','Days open for booking'],ac_s_hold:['مهلة الدفع بعد الحجز (دقيقة)','Payment hold (min)'],ac_s_lead:['أقل مدة قبل الموعد (دقيقة)','Minimum lead time (min)'],ac_s_cancel:['ساعات الإلغاء المجاني','Free-cancellation window (h)'],ac_s_fmin:['أقل سعر كشف','Minimum fee'],ac_s_fmax:['أعلى سعر كشف','Maximum fee'],
 ac_s_pay:['بيانات استلام المدفوعات (تظهر للمريض عند الدفع)','Receiving details (shown to the patient at checkout)'],ac_s_vf_on:['تفعيل فودافون كاش','Enable Vodafone Cash'],ac_s_ip_on:['تفعيل إنستا باي','Enable InstaPay'],
 ac_s_specs:['التخصصات المتاحة','Available specialties'],ac_s_specs_h:['تظهر للمرضى ولطلبات الأطباء. اتركها فارغة لاستخدام القائمة الافتراضية.','Shown to patients and in applications. Leave empty to use the default list.'],ac_spec_ar:['الاسم بالعربية','Arabic name'],ac_spec_en:['English name','English name'],ac_spec_add:['إضافة تخصص','Add specialty'],ac_spec_def:['استخدام القائمة الافتراضية','Use default list'],
 ac_s_on:['تفعيل قسم «للاستفسارات الطبية» للمستخدمين','Turn on the “Medical consultations” section'],ac_s_texts:['تعديل نصوص هذا القسم','Edit this section’s texts'],ac_s_saved:['تم حفظ الإعدادات','Settings saved'],ac_s_note:['تغيير النسبة أو السعر لا يؤثر على الحجوزات القائمة؛ تُحسب عند الحجز.','Changing the commission or fees does not affect existing bookings; they are priced at booking time.']
});
IC.steth='<path d="M6 3v6a4 4 0 008 0V3"/><path d="M10 13v2a5 5 0 0010 0v-2"/><circle cx="20" cy="11" r="2"/><path d="M5 3h2M13 3h2"/>';
IC.cam='<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>';
IC.clock='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
IC.cash='<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>';

/* ---------- إعدادات ---------- */
const CS_DEF={commissionPct:30,slotMin:30,bookDays:14,holdMin:30,leadMin:60,cancelHrs:12,feeMin:50,feeMax:5000,methods:{vodafone:true,instapay:true},specs:[]};
const csCfg=()=>{const c=Object.assign({},CS_DEF,S.site.consult||{});c.methods=Object.assign({},CS_DEF.methods,(S.site.consult||{}).methods||{});if(!Array.isArray(c.specs))c.specs=[];return c};
const csPayCfg=()=>{const p=S.site.consult_pay||{};return {vodafone:Object.assign({number:'',name:''},p.vodafone||{}),instapay:Object.assign({handle:'',name:''},p.instapay||{})}};
const csOn=()=>!!S.site.toggles.consult;
const csSpecs=()=>{const c=csCfg();return c.specs.length?c.specs.map(s=>({id:s.id,name:[s.ar||s.id,s.en||s.ar||s.id]})):SPECS.filter(x=>x!=='general').map(x=>({id:x,name:D['sp_'+x]?[t('sp_'+x),t('sp_'+x)]:[x,x],builtin:true}))};
const csSpecName=id=>{const s=csSpecs().find(x=>x.id===id);return s?(s.builtin?t('sp_'+id):L(s.name)):(D['sp_'+id]?t('sp_'+id):String(id||''))};
const money=n=>`${Number(n)||0} ${t('cs_egp')}`;
const csNewId=()=>uid();

/* ---------- بيانات (S.cs) ---------- */
function csEnsure(){if(!S.cs)S.cs={};['apps','docs','bk','msgs','rv'].forEach(k=>{if(!Array.isArray(S.cs[k]))S.cs[k]=[]});if(!S.cs.cc)S.cs.cc={};if(!S.cs.payouts)S.cs.payouts={};return S.cs}
const csDoc=id=>csEnsure().docs.find(d=>d.uid===id);
const csBk=id=>csEnsure().bk.find(b=>b.id===id);
const csRv=bid=>csEnsure().rv.find(r=>r.bid===bid);
const csRating=uid=>{const r=csEnsure().rv.filter(x=>x.dr===uid&&!x.hidden);return {n:r.length,avg:r.length?r.reduce((a,x)=>a+x.stars,0)/r.length:0}};
const csMyApp=()=>csEnsure().apps.filter(a=>a.uid===S.me).sort((a,b)=>b.ts-a.ts)[0]||null;
const csIsDoc=()=>!!csDoc(S.me)&&(me()||{}).title==='doctor';
/* حالة الحجز الفعلية (الانتهاء المحلي لمهلة الدفع) */
const csStatus=b=>(b.status==='held'&&b.hold<Date.now())?'expired':b.status;

/* ---------- وقت القاهرة ---------- */
const CAIRO='Africa/Cairo';
function cairoParts(ts){
  const f=new Intl.DateTimeFormat('en-US',{timeZone:CAIRO,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',weekday:'short'});
  const o={};f.formatToParts(new Date(ts)).forEach(p=>{o[p.type]=p.value});
  return {y:+o.year,m:+o.month,d:+o.day,h:+o.hour,mi:+o.minute,dow:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday)};
}
function cairoTs(y,m,d,h,mi){
  let g=Date.UTC(y,m-1,d,h,mi)-2*H;
  for(let i=0;i<3;i++){const p=cairoParts(g),want=Date.UTC(y,m-1,d,h,mi),got=Date.UTC(p.y,p.m-1,p.d,p.h,p.mi);g+=want-got}
  return g;
}
const fmtDay=ts=>new Date(ts).toLocaleDateString(lang==='ar'?'ar-EG-u-nu-latn':'en-GB',{timeZone:CAIRO,weekday:'long',day:'numeric',month:'short'});
const fmtTime=ts=>new Date(ts).toLocaleTimeString(lang==='ar'?'ar-EG-u-nu-latn':'en-GB',{timeZone:CAIRO,hour:'numeric',minute:'2-digit',hour12:true});
const fmtWhen=ts=>fmtDay(ts)+' · '+fmtTime(ts);
const hm=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const toMin=s=>{const p=String(s).split(':');return (+p[0])*60+(+p[1])};
const fmtHM=s=>{const m=toMin(s);return new Date(Date.UTC(2000,0,1,Math.floor(m/60),m%60)).toLocaleTimeString(lang==='ar'?'ar-EG-u-nu-latn':'en-US',{timeZone:'UTC',hour:'numeric',minute:'2-digit',hour12:true})};
function hoursOk(h){
  if(!h||typeof h!=='object')return false;
  for(const k of Object.keys(h)){
    if(!/^[0-6]$/.test(k)||!Array.isArray(h[k])||h[k].length>4)return false;let prev=-1;
    for(const iv of h[k]){if(!Array.isArray(iv)||iv.length!==2||!/^([01]\d|2[0-3]):[0-5]\d$/.test(iv[0])||!/^([01]\d|2[0-3]):[0-5]\d$/.test(iv[1]))return false;const s=toMin(iv[0]),e=toMin(iv[1]);if(s>=e||s<prev)return false;prev=e}
  }
  return true;
}
/* نفس قاعدة الخادم slot_ok */
function slotOk(h,st,dur){
  if(st%60000)return false;const p=cairoParts(st),m=p.h*60+p.mi,day=h&&h[String(p.dow)];if(!day)return false;
  return day.some(iv=>{const s=toMin(iv[0]),e=toMin(iv[1]);return m>=s&&m+dur<=e&&(m-s)%dur===0});
}
function csDaySlots(d,k,busy){
  const c=csCfg(),now=Date.now(),base=now+k*Dd,p=cairoParts(base),day=(d.hours||{})[String(p.dow)]||[],out=[];
  day.forEach(iv=>{for(let m=toMin(iv[0]);m+c.slotMin<=toMin(iv[1]);m+=c.slotMin){
    const ts=cairoTs(p.y,p.m,p.d,Math.floor(m/60),m%60);
    if(ts<now+c.leadMin*M||ts>now+c.bookDays*Dd)continue;
    if((busy||[]).some(b=>b.st<ts+c.slotMin*M&&ts<b.st+b.dur*M))continue;
    out.push(ts)}});
  return out;
}

/* ---------- الخدمة: تجريبي محلي أو Supabase ---------- */
const csErr=e=>{const m=String((e&&e.message)||e||'x').replace(/^.*?:\s*/,'').trim();return D['cse_'+m]?t('cse_'+m):t('cse_x')};
const csThrow=c=>{throw new Error(c)};
function csDataUrlOk(s){return typeof s==='string'&&s.length<700000}
const CSD={ /* ===== التنفيذ التجريبي (يطابق قواعد الخادم) ===== */
  tick(){const n=Date.now();csEnsure().bk.forEach(b=>{if(b.status==='held'&&b.hold<n)b.status='expired'})},
  apply(f){
    const m=me(),C=csEnsure();if(!m||m.role==='admin')csThrow('forbidden');if(!csOn())csThrow('consult_off');
    if(C.apps.some(a=>a.uid===m.id&&a.status==='pending'))csThrow('pending_exists');if(csDoc(m.id))csThrow('already_doctor');
    if(!f.idp||!f.selfie)csThrow('files_required');
    C.apps.push({id:csNewId(),uid:m.id,name:f.name,age:f.age,phone:f.phone,uni:f.uni,lic:f.lic,spec:f.spec,idp:f.idp,selfie:f.selfie,status:'pending',note:'',ts:Date.now(),rts:null});
    notifyAdmins('cs_app',m.id);
  },
  review(id,dec,note){
    const a=csEnsure().apps.find(x=>x.id===id);if(!isAdmin())csThrow('forbidden');if(!a||a.status!=='pending')csThrow('bad_state');
    a.note=String(note||'').slice(0,500);a.rts=Date.now();
    if(dec==='approved'){a.status='approved';const C=csEnsure();if(!csDoc(a.uid))C.docs.push({uid:a.uid,spec:a.spec,bio:'',fee:0,active:false,suspended:false,hours:{},ts:Date.now()});
      const u=U(a.uid);if(u){u.title='doctor';u.verified=true;u.spec=a.spec||u.spec}notify(a.uid,'cs_app_ok',a.id)}
    else if(dec==='rejected'){a.status='rejected';notify(a.uid,'cs_app_no',a.id)}else csThrow('bad_decision');
  },
  purgeApp(id){if(!isAdmin())csThrow('forbidden');const a=csEnsure().apps.find(x=>x.id===id);if(a&&a.status!=='pending'){a.idp='';a.selfie=''}},
  saveDoc(f){
    const d=csDoc(S.me),c=csCfg();if(!d)csThrow('forbidden');
    if(f.fee!==d.fee&&f.fee!==0&&(f.fee<c.feeMin||f.fee>c.feeMax))csThrow('fee_range');
    if(!hoursOk(f.hours))csThrow('bad_hours');
    if(d.suspended)f.active=false;if(f.active&&f.fee<=0)csThrow('fee_required');
    d.fee=f.fee;d.hours=f.hours;d.active=!!f.active;d.bio=f.bio;
    if(f.payout&&f.payout.handle){csEnsure().payouts[S.me]={method:f.payout.method,handle:f.payout.handle}}
  },
  busy(did){const n=Date.now();return csEnsure().bk.filter(b=>b.dr===did&&b.st>n-Dd&&(['awaiting','confirmed'].includes(b.status)||(b.status==='held'&&b.hold>=n))).map(b=>({st:b.st,dur:b.dur}))},
  book(did,st,complaint){
    const m=me(),d=csDoc(did),c=csCfg(),n=Date.now(),C=csEnsure();
    if(!m||m.banned)csThrow('forbidden');if(!csOn())csThrow('consult_off');if(m.role==='admin')csThrow('admin_cannot_book');if(did===m.id)csThrow('self_booking');if(hid(did))csThrow('unavailable');
    const du=U(did);if(!d||!du||du.banned||d.suspended||!d.active||d.fee<=0)csThrow('doctor_unavailable');
    if(String(complaint||'').trim().length<3||String(complaint).length>1500)csThrow('complaint_required');
    if(st<n+c.leadMin*M||st>n+c.bookDays*Dd)csThrow('slot_out_of_range');if(!slotOk(d.hours,st,c.slotMin))csThrow('slot_invalid');
    CSD.tick();
    if(C.bk.some(b=>b.dr===did&&['held','awaiting','confirmed'].includes(b.status)&&b.st<st+c.slotMin*M&&st<b.st+b.dur*M))csThrow('slot_taken');
    if(C.bk.filter(b=>b.pt===m.id&&b.status==='held').length>=2)csThrow('too_many_holds');
    const com=Math.round(d.fee*c.commissionPct/100),id=csNewId();
    C.bk.push({id,pt:m.id,dr:did,st,dur:c.slotMin,fee:d.fee,com,net:d.fee-com,status:'held',hold:n+c.holdMin*M,pm:'',pref:'',pproof:'',anote:'',cts:n,pts:null,cfts:null,cmts:null,cby:'',rf:'none',rfref:'',po:'none',pots:null,poref:''});
    C.cc[id]={complaint:String(complaint).trim(),diagnosis:'',meet:''};
    return id;
  },
  pay(id,method,ref,proof){
    const b=csBk(id),m=me(),c=csCfg();if(!b||b.pt!==m.id)csThrow('forbidden');
    if(b.status!=='held'||b.hold<Date.now())csThrow('hold_expired');if(!['vodafone','instapay'].includes(method))csThrow('bad_method');if(!c.methods[method])csThrow('method_off');
    if(String(ref||'').trim().length<4||String(ref).length>60)csThrow('ref_required');
    b.status='awaiting';b.pm=method;b.pref=String(ref).trim();b.pproof=proof||'';b.pts=Date.now();b.anote='';notifyAdmins('cs_pay',id);
  },
  cancel(id){
    const b=csBk(id),m=me(),adm=isAdmin();if(!b)csThrow('not_found');if(!(adm||b.pt===m.id||b.dr===m.id))csThrow('forbidden');
    if(!['held','awaiting','confirmed'].includes(b.status))csThrow('bad_state');
    const who=adm?'admin':b.dr===m.id?'doctor':'patient',was=b.status;let rf='none';
    if(b.status==='awaiting')rf='due';else if(b.status==='confirmed'&&(who!=='patient'||b.st-Date.now()>=csCfg().cancelHrs*H))rf='due';
    b.status='cancelled';b.cby=who;b.rf=rf;
    if(who!=='patient')notify(b.pt,'cs_cancel',id);if(who!=='doctor'&&was!=='held')notify(b.dr,'cs_cancel',id);if(who!=='admin'&&rf==='due')notifyAdmins('cs_refund',id);
  },
  complete(id){const b=csBk(id);if(!b||b.dr!==S.me)csThrow('forbidden');if(b.status!=='confirmed')csThrow('bad_state');if(Date.now()<b.st)csThrow('too_early');
    b.status='completed';b.cmts=Date.now();b.po='due';notify(b.pt,'cs_done',id);notifyAdmins('cs_payout',id)},
  send(id,text){
    const b=csBk(id),m=me();if(!b||(b.pt!==m.id&&b.dr!==m.id))csThrow('not_found');if(!['confirmed','completed'].includes(b.status))csThrow('bad_state');
    if(b.status==='completed'&&Date.now()-b.cmts>3*Dd)csThrow('chat_closed');const t0=String(text||'').trim();if(!t0||t0.length>1000)csThrow('bad_text');
    csEnsure().msgs.push({id:csNewId(),bid:id,from:m.id,text:t0,ts:Date.now()});
    const other=b.pt===m.id?b.dr:b.pt;if(!(S.notifs||[]).some(n=>n.to===other&&n.type==='cs_msg'&&n.ref===id&&!n.read))notify(other,'cs_msg',id);
  },
  saveCons(id,meet,diag){
    const b=csBk(id);if(!b||b.dr!==S.me)csThrow('not_found');if(!['confirmed','completed'].includes(b.status))csThrow('bad_state');
    meet=String(meet||'').trim();diag=String(diag||'').trim();if(meet&&(!/^https:\/\/[^\s<>"]+$/i.test(meet)||meet.length>300))csThrow('bad_link');if(diag.length>3000)csThrow('bad_text');
    const c=csEnsure().cc[id]||(csEnsure().cc[id]={complaint:'',diagnosis:'',meet:''});const old=c.diagnosis;c.meet=meet;c.diagnosis=diag;
    if(diag&&diag!==old)notify(b.pt,'cs_diag',id);
  },
  rate(id,stars,comment){
    const b=csBk(id);if(!b||b.pt!==S.me)csThrow('not_found');if(b.status!=='completed')csThrow('bad_state');
    if(!(stars>=1&&stars<=5))csThrow('bad_stars');if(csRv(id))csThrow('already_rated');
    csEnsure().rv.push({bid:id,dr:b.dr,pt:b.pt,stars:Math.round(stars),comment:String(comment||'').trim().slice(0,500),hidden:false,ts:Date.now()});notify(b.dr,'cs_rated',id);
  },
  adm(id,action,note){
    if(!isAdmin())csThrow('forbidden');const b=csBk(id);if(!b)csThrow('not_found');note=String(note||'').trim().slice(0,300);
    if(action==='confirm'){if(b.status!=='awaiting')csThrow('bad_state');b.status='confirmed';b.cfts=Date.now();b.anote='';notify(b.pt,'cs_confirmed',id);notify(b.dr,'cs_new',id)}
    else if(action==='reject'){if(b.status!=='awaiting')csThrow('bad_state');b.status='held';b.hold=Date.now()+csCfg().holdMin*M;b.anote=note;b.pts=null;notify(b.pt,'cs_pay_rej',id)}
    else if(action==='refund_due'){if(!['cancelled','completed'].includes(b.status)||b.rf!=='none')csThrow('bad_state');b.rf='due'}
    else if(action==='refund_done'){if(b.rf!=='due')csThrow('bad_state');b.rf='done';b.rfref=note;notify(b.pt,'cs_refunded',id)}
    else if(action==='cancel'){CSD.cancel(id)}
    else if(action==='payout_done'){if(b.po!=='due')csThrow('bad_state');b.po='paid';b.pots=Date.now();b.poref=note;notify(b.dr,'cs_paidout',id)}
    else csThrow('bad_action');
  },
  admDoc(uid,action){
    if(!isAdmin())csThrow('forbidden');const C=csEnsure(),d=csDoc(uid);if(!d)csThrow('not_found');
    if(action==='suspend'){d.suspended=true;d.active=false}else if(action==='unsuspend')d.suspended=false;
    else if(action==='revoke'){if(C.bk.some(b=>b.dr===uid&&['awaiting','confirmed'].includes(b.status)))csThrow('has_open_bookings');C.docs=C.docs.filter(x=>x.uid!==uid);const u=U(uid);if(u&&u.title==='doctor')u.title='member'}
    else if(action.indexOf('spec:')===0){d.spec=action.slice(5);const u=U(uid);if(u)u.spec=d.spec}
    else csThrow('bad_action');
  },
  hideRv(bid,h){if(!isAdmin())csThrow('forbidden');const r=csRv(bid);if(r)r.hidden=!!h},
  file(p){return Promise.resolve(p)},
  upload(blob){return blobToData(blob)}
};
/* واجهة موحّدة: في الوضع الحقيقي تُنفَّذ العملية عبر Supabase ثم تُحمَّل البيانات من جديد */
const CS={
  async op(name,...a){
    if(REAL){return BE.cs(name,a)}
    const r=CSD[name](...a);save();return r;
  },
  busy:async did=>REAL?BE.csBusy(did):CSD.busy(did),
  file:async p=>{if(!p)return '';return REAL?BE.csFile(p):CSD.file(p)},
  upload:async(blob,kind)=>REAL?BE.csUpload(blob,kind):CSD.upload(blob),
  reload:async()=>{if(REAL){await BE.csLoad()}else{CSD.tick();save()}}
};

/* ---------- بيانات تجريبية ---------- */
function csSeed(){
  const now=Date.now(),wk=d=>({0:d,1:d,2:d,3:d,4:d,6:d}),ev=[['18:00','22:00']],mo=[['10:00','14:00']];
  const days=n=>now-n*Dd;
  const bk=(id,pt,dr,ago,fee,st)=>({id,pt,dr,st:days(ago),dur:30,fee,com:Math.round(fee*.3),net:fee-Math.round(fee*.3),status:st||'completed',hold:0,pm:'vodafone',pref:'DEMO'+id,pproof:'',anote:'',cts:days(ago+1),pts:days(ago+1),cfts:days(ago+1),cmts:days(ago),cby:'',rf:'none',rfref:'',po:'paid',pots:days(ago-1),poref:'demo'});
  return {
    apps:[{id:'ap1',uid:'u7',name:'ياسمين عادل محمد',age:31,phone:'01012345678',uni:'جامعة الإسكندرية',lic:'DT-48211',spec:'dental',idp:'',selfie:'',status:'pending',note:'',ts:now-3*H,rts:null}],
    docs:[
      {uid:'u1',spec:'cardio',bio:['استشاري قلب وقسطرة، خبرة أكثر من 12 سنة في أمراض الشرايين التاجية.','Consultant cardiologist with 12+ years in coronary disease.'],fee:500,active:true,suspended:false,hours:wk(ev),ts:days(40)},
      {uid:'u_demo',spec:'internal',bio:['طبيبة باطنة، متابعة السكري وضغط الدم والغدة الدرقية.','Internist: diabetes, hypertension and thyroid follow-up.'],fee:300,active:true,suspended:false,hours:wk(mo.concat([['17:00','20:00']])),ts:days(30)},
      {uid:'u5',spec:'peds',bio:['أخصائية أطفال وحديثي الولادة.','Pediatric and neonatal specialist.'],fee:250,active:true,suspended:false,hours:wk([['16:00','21:00']]),ts:days(25)},
      {uid:'u3',spec:'ortho',bio:['أخصائي عظام وإصابات الملاعب.','Orthopedics & sports injuries.'],fee:400,active:false,suspended:false,hours:{6:[['12:00','16:00']]},ts:days(20)}
    ],
    payouts:{u1:{method:'vodafone',handle:'01000000001'},u_demo:{method:'instapay',handle:'sarah@instapay'}},
    bk:[bk('sb1','u2','u1',9,500),bk('sb2','u6','u1',7,500),bk('sb3','u8','u5',5,250),bk('sb4','u2','u_demo',3,300)],
    cc:{sb1:{complaint:'خفقان متكرر عند المجهود.',diagnosis:'يُنصح بتخطيط قلب وفحص دم.',meet:''},sb2:{complaint:'ضغط مرتفع.',diagnosis:'',meet:''},sb3:{complaint:'سعال طفل منذ أسبوع.',diagnosis:'',meet:''},sb4:{complaint:'متابعة سكر.',diagnosis:'',meet:''}},
    msgs:[],
    rv:[{bid:'sb1',dr:'u1',pt:'u2',stars:5,comment:'شرح واضح ومطمئن، شكرًا دكتور.',hidden:false,ts:days(8)},{bid:'sb2',dr:'u1',pt:'u6',stars:4,comment:'ممتاز والتزم بالموعد.',hidden:false,ts:days(6)},{bid:'sb3',dr:'u5',pt:'u8',stars:5,comment:'دكتورة رائعة مع الأطفال.',hidden:false,ts:days(4)}]
  };
}
if(!REAL){if(!S.cs)S.cs=csSeed();csEnsure();S.users.forEach(u=>{if(u.id==='u8'&&u.title==='other')u.title='member'})}
else csEnsure();
/* ===== للاستفسارات الطبية — الواجهات (مريض + طبيب) ===== */
ui.cs={tab:'dir',spec:'all',q:'',bk:null,app:{},pay:null};
const stars=(v,big)=>{const f=Math.round(v);return `<span class="stars${big?' big':''}" aria-label="${v.toFixed(1)}/5" style="color:var(--y);letter-spacing:1px">${'★'.repeat(f)}<span style="color:var(--line)">${'★'.repeat(5-f)}</span></span>`};
const stPill=b=>{const s=csStatus(b),cl={held:'yl',awaiting:'yl',confirmed:'ok',completed:'',cancelled:'gr',expired:'gr'}[s];return `<span class="pill ${cl}">${t('cs_st_'+s)}</span>`};
function hoursSummary(d){
  const days=[0,1,2,3,4,5,6].filter(k=>((d.hours||{})[k]||[]).length);
  if(!days.length)return '—';
  const f=d.hours[days[0]][0];return days.map(k=>t('cs_d'+k)).join('، ')+' · '+fmtHM(f[0])+' – '+fmtHM(f[1]);
}
function hoursTable(d){
  return `<div class="hrs">${[6,0,1,2,3,4,5].map(k=>{const iv=(d.hours||{})[k]||[];return `<div class="item" style="padding:4px 0"><b class="grow">${t('cs_d'+k)}</b><span class="${iv.length?'':'muted'}">${iv.length?iv.map(x=>fmtHM(x[0])+' – '+fmtHM(x[1])).join(' ، '):t('cs_closed')}</span></div>`}).join('')}</div>`;
}
function csTabs(){
  const m=me(),tabs=[['dir','cs_tab_dir']];
  if(m.role!=='admin'){tabs.push(['mine','cs_tab_mine']);tabs.push(csIsDoc()?['doc','cs_tab_doc']:['apply','cs_tab_apply'])}
  if(!tabs.some(x=>x[0]===ui.cs.tab))ui.cs.tab='dir';
  const nMine=csEnsure().bk.filter(b=>(b.pt===m.id||b.dr===m.id)&&['held','awaiting','confirmed'].includes(csStatus(b))).length;
  return `<div class="subtabs" role="tablist">${tabs.map(x=>`<button class="${ui.cs.tab===x[0]?'on':''}" data-action="cstab" data-id="${x[0]}" role="tab">${t(x[1])}${x[0]==='mine'&&nMine?' ('+nMine+')':''}</button>`).join('')}</div>`;
}
function consultView(){
  const m=me();csEnsure();
  const tabs=csTabs(),body={dir:csDir,mine:csMine,doc:csDash,apply:csApply}[ui.cs.tab]||csDir;
  return `<div class="item"><h2 class="grow">${ic('steth')} ${t('cs_title')}</h2></div><p class="muted" style="margin:4px 0 12px">${t('cs_sub')}</p>
<div class="card tip" style="margin-bottom:12px">${ic('shield')} <span>${t('cs_disc')}</span></div>${isAdmin()?`<div class="hint" style="margin-bottom:10px">${t('cs_admin_note')}</div>`:''}${tabs}<div id="csBody">${body()}</div>`;
}

/* ---------- دليل الأطباء ---------- */
function csDocList(){
  const q=ui.cs.q.trim().toLowerCase(),adm=isAdmin();
  return csEnsure().docs.filter(d=>{const u=U(d.uid);return u&&!u.banned&&!hid(d.uid)&&(!d.suspended||adm)&&(ui.cs.spec==='all'||d.spec===ui.cs.spec)&&(!q||(L(u.name)+' '+csSpecName(d.spec)).toLowerCase().includes(q))})
    .sort((a,b)=>(b.active-a.active)||(csRating(b.uid).avg-csRating(a.uid).avg));
}
function csDocCard(d){
  const u=U(d.uid),r=csRating(d.uid),m=me();
  return `<div class="card csd"><div class="item" style="align-items:flex-start;gap:12px">${avatar(u,'m')}<div class="grow"><b>${nm(u)}</b><div class="muted sm">${esc(csSpecName(d.spec))}</div>
<div style="margin-top:4px">${r.n?`${stars(r.avg)} <b>${r.avg.toFixed(1)}</b> <span class="muted sm">(${t('cs_reviews',r.n)})</span>`:`<span class="muted sm">${t('cs_no_rating')}</span>`}</div></div>
<span class="pill ${d.suspended?'pk':d.active?'ok':'gr'}">${d.suspended?t('ac_suspended'):d.active?t('cs_active'):t('cs_inactive')}</span></div>
<div class="item muted sm" style="margin-top:8px;gap:14px;flex-wrap:wrap"><span>${ic('cash')} ${t('cs_fee')}: <b style="color:var(--ink)">${d.fee?money(d.fee):'—'}</b></span><span>${ic('clock')} ${esc(hoursSummary(d))}</span></div>
<div class="mfoot" style="margin-top:10px"><button class="btn s" data-action="csbook" data-id="${d.uid}" ${(!d.active||d.suspended||isAdmin()||d.uid===S.me)?'disabled':''}>${t('cs_book')}</button><button class="btn line s" data-action="csdoc" data-id="${d.uid}">${t('cs_view')}</button></div></div>`;
}
function csDir(){
  const all=csEnsure().docs.filter(d=>{const u=U(d.uid);return u&&!u.banned&&!d.suspended});
  const cnt=id=>all.filter(d=>d.active&&(id==='all'||d.spec===id)).length;
  const specs=csSpecs().filter(s=>all.some(d=>d.spec===s.id));
  const chips=[{id:'all',label:t('cs_all')}].concat(specs.map(s=>({id:s.id,label:s.builtin?t('sp_'+s.id):L(s.name)})));
  return `<div class="card"><input class="in" data-in="csq" id="csq" placeholder="${esc(t('cs_search'))}" aria-label="${esc(t('cs_search'))}" value="${esc(ui.cs.q)}"><div class="chips" style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px" role="group" aria-label="${esc(t('cs_specs_h'))}">${chips.map(c=>`<button class="pill ${ui.cs.spec===c.id?'':'gr'}" style="border:0;cursor:pointer" data-action="csspec" data-id="${c.id}">${esc(c.label)} <small>· ${t('cs_n_avail',cnt(c.id))}</small></button>`).join('')}</div></div>
<div class="list" id="csList" style="margin-top:12px">${csDirList()}</div>`;
}
function csDirList(){const l=csDocList();return l.length?l.map(csDocCard).join(''):`<div class="card empty">${t('cs_none')}</div>`}

function csDocModal(uid){
  const d=csDoc(uid),u=U(uid);if(!d||!u)return;const r=csRating(uid),rv=csEnsure().rv.filter(x=>x.dr===uid&&!x.hidden).sort((a,b)=>b.ts-a.ts).slice(0,8);
  const bio=L(d.bio);
  openModal(`<div class="item" style="align-items:flex-start;gap:12px">${avatar(u,'l')}<div class="grow"><h3 style="margin:0">${nm(u)}</h3><div class="muted">${esc(csSpecName(d.spec))}</div>
<div style="margin-top:4px">${r.n?`${stars(r.avg,1)} <b>${r.avg.toFixed(1)}</b> <span class="muted sm">(${t('cs_reviews',r.n)})</span>`:`<span class="muted sm">${t('cs_no_rating')}</span>`}</div></div><span class="pill ${d.active?'ok':'gr'}">${d.active?t('cs_active'):t('cs_inactive')}</span></div>
<p style="margin:12px 0">${bio?esc(bio):`<span class="muted">${t('cs_bio_none')}</span>`}</p>
<div class="item"><b class="grow">${t('cs_fee')}</b><b>${d.fee?money(d.fee):'—'}</b></div><div class="muted sm" style="margin-bottom:10px">${t('cs_slot_min',csCfg().slotMin)}</div>
<h4 style="margin:10px 0 4px">${ic('clock')} ${t('cs_hours')}</h4>${hoursTable(d)}
<h4 style="margin:14px 0 6px">${t('cs_rv_title')}</h4>${rv.length?rv.map(x=>{const p=U(x.pt);return `<div style="padding:8px 0;border-top:1px solid var(--line)">${stars(x.stars)} <b class="sm">${esc(p?String(L(p.name)).split(' ')[0]:'')}</b> <span class="muted sm">${ago(x.ts)}</span>${x.comment?`<div>${esc(x.comment)}</div>`:''}</div>`}).join(''):`<div class="muted sm">${t('cs_rv_none')}</div>`}
${d.active?'':`<div class="hint" style="margin-top:10px">${t('cs_inactive_note')}</div>`}
<div class="mfoot"><button class="btn" data-action="csbook" data-id="${uid}" ${(!d.active||isAdmin()||uid===S.me)?'disabled':''}>${t('cs_book')}</button><button class="btn line" data-action="closem">${t('close')}</button></div>`,1);
}

/* ---------- الحجز ---------- */
async function csBookOpen(uid){
  const d=csDoc(uid);if(!d)return;
  ui.cs.bk={doc:uid,day:null,slot:null,busy:[],complaint:''};
  try{ui.cs.bk.busy=await CS.busy(uid)}catch(e){}
  const c=csCfg();for(let k=0;k<=c.bookDays;k++){if(csDaySlots(d,k,ui.cs.bk.busy).length){ui.cs.bk.day=k;break}}
  csBookDraw();
}
function csBookDraw(){
  const B=ui.cs.bk,d=csDoc(B.doc),u=U(B.doc);if(!d||!u)return;const c=csCfg();
  const days=[];for(let k=0;k<=c.bookDays;k++){const s=csDaySlots(d,k,B.busy);if(s.length)days.push({k,ts:s[0],n:s.length})}
  const slots=B.day==null?[]:csDaySlots(d,B.day,B.busy);
  openModal(`<h3>${t('cs_book_t',nm(u))}</h3><div class="item muted sm"><span>${esc(csSpecName(d.spec))}</span><span class="grow"></span><b style="color:var(--ink)">${money(d.fee)}</b></div>
${days.length?`<h4 style="margin:12px 0 6px">${t('cs_pick_day')}</h4><div class="dayrow" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px">${days.map(x=>`<button class="pill ${B.day===x.k?'':'gr'}" style="border:0;cursor:pointer;white-space:nowrap" data-action="csday" data-k="${x.k}">${esc(fmtDay(x.ts))}</button>`).join('')}</div>
<h4 style="margin:12px 0 6px">${t('cs_pick_time')}</h4><div class="slots" style="display:flex;flex-wrap:wrap;gap:8px">${slots.map(ts=>`<button class="pill ${B.slot===ts?'':'gr'}" style="border:0;cursor:pointer" data-action="csslot" data-ts="${ts}">${esc(fmtTime(ts))}</button>`).join('')}</div>
<div class="field" style="margin-top:12px"><label for="cs_complaint">${t('cs_complaint')}</label><textarea id="cs_complaint" class="ta" maxlength="1500" placeholder="${esc(t('cs_complaint_ph'))}">${esc(B.complaint||'')}</textarea></div>
<div class="muted sm">${t('cs_hold_note',c.holdMin)}</div><div class="hint" style="margin-top:8px">${t('cs_disc')}</div><div id="aerr" class="err" role="alert"></div>
<div class="mfoot"><button class="btn" data-action="csgo" ${B.slot?'':'disabled'}>${t('cs_continue')} · ${money(d.fee)}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`
:`<div class="card empty" style="margin:12px 0">${t('cs_no_slots')}</div><div class="mfoot"><button class="btn line" data-action="closem">${t('close')}</button></div>`}`,1);
}
const csKeepComplaint=()=>{const e=$('#cs_complaint');if(e&&ui.cs.bk)ui.cs.bk.complaint=e.value};
async function csBookGo(){
  const B=ui.cs.bk;csKeepComplaint();const complaint=(B.complaint||'').trim();
  if(!B.slot){return}if(complaint.length<3){aerr(t('cse_complaint_required'));return}
  const btn=$('[data-action="csgo"]');if(btn)btn.disabled=true;
  try{const id=await CS.op('book',B.doc,B.slot,complaint);ui.cs.bk=null;ui.cs.tab='mine';await CS.reload();render();csPayModal(id)}
  catch(e){console.warn(e);aerr(csErr(e));if(btn)btn.disabled=false;if(/slot_taken/.test(String(e.message))){try{B.busy=await CS.busy(B.doc)}catch(_){}B.slot=null;setTimeout(csBookDraw,900)}}
}

/* ---------- الدفع (فودافون كاش / إنستا باي) ---------- */
function csPayModal(id,method){
  const b=csBk(id);if(!b)return;const c=csCfg(),pc=csPayCfg(),d=U(b.dr);
  const ms=['vodafone','instapay'].filter(x=>c.methods[x]);method=method||ui.cs.pm||ms[0];ui.cs.pm=method;
  const mins=Math.max(0,Math.ceil((b.hold-Date.now())/M)),det=method==='vodafone'?pc.vodafone:pc.instapay,no=method==='vodafone'?det.number:det.handle;
  if(csStatus(b)!=='held'){openModal(`<h3>${t('cs_pay_t')}</h3><p>${t(csStatus(b)==='expired'?'cs_expired_n':'cs_pay_sent')}</p><div class="mfoot"><button class="btn line" data-action="closem">${t('close')}</button></div>`);return}
  openModal(`<h3>${ic('cash')} ${t('cs_pay_t')}</h3><div class="item muted sm"><span>${nm(d)} · ${esc(fmtWhen(b.st))}</span></div>
<div class="card" style="margin:10px 0;text-align:center"><div class="muted sm">${t('cs_total')}</div><div style="font-size:28px;font-weight:800">${money(b.fee)}</div><div class="muted sm">${t('cs_expires',mins)}</div></div>
${b.anote?`<div class="hint" style="margin-bottom:8px;color:var(--danger)">${esc(b.anote)}</div>`:''}
<div class="field"><label>${t('cs_method')}</label><div style="display:flex;gap:8px">${ms.map(x=>`<button class="pill ${method===x?'':'gr'}" style="border:0;cursor:pointer" data-action="cspm" data-id="${id}" data-m="${x}">${t(x==='vodafone'?'cs_vf':'cs_ip')}</button>`).join('')}</div></div>
<div class="card" style="margin:8px 0"><div class="muted sm">${t('cs_pay_to')} ${t(method==='vodafone'?'cs_vf':'cs_ip')}</div>${no?`<div dir="ltr" style="font-size:22px;font-weight:800;margin:4px 0;user-select:all">${esc(no)}</div>${det.name?`<div class="muted sm">${t('cs_acc_name')}: ${esc(det.name)}</div>`:''}`:`<div class="muted">${t('cs_pay_not_set')}</div>`}</div>
<div class="muted sm" style="margin-bottom:8px">${t('cs_pay_note')}</div>
<div class="field"><label for="cs_ref">${t('cs_pay_ref')}</label><input id="cs_ref" class="in" dir="ltr" maxlength="60" placeholder="${esc(t('cs_pay_ref_ph'))}"></div>
<div class="field"><label for="csProofIn">${t('cs_proof')}</label><input id="csProofIn" type="file" accept="image/jpeg,image/png,image/webp"><div id="csProofOk" class="muted sm">${ui.cs.pay&&ui.cs.pay.blob?t('cs_proof_ok'):''}</div></div><div id="aerr" class="err" role="alert"></div>
<div class="mfoot"><button class="btn" data-action="cssubmitpay" data-id="${id}" ${no?'':'disabled'}>${t('cs_submit_pay')}</button><button class="btn line" data-action="csclosepay">${t('close')}</button></div>`);
}
D.cs_expired_n=['انتهت مهلة الحجز. احجز موعدًا جديدًا.','The hold expired. Please book again.'];
async function csSubmitPay(id){
  const ref=val('cs_ref'),btn=$('[data-action="cssubmitpay"]');if(btn)btn.disabled=true;
  try{
    let proof='';if(ui.cs.pay&&ui.cs.pay.blob){const [p]=[await CS.upload(ui.cs.pay.blob,'pay')];proof=p}
    await CS.op('pay',id,ui.cs.pm,ref,proof);ui.cs.pay=null;await CS.reload();render();csPayModal(id);toast(t('cs_pay_sent'))
  }catch(e){console.warn(e);aerr(csErr(e));if(btn)btn.disabled=false}
}

/* ---------- حجوزاتي (كمريض) ---------- */
function csBkCard(b,asDoc){
  const s=csStatus(b),other=U(asDoc?b.pt:b.dr),rv=csRv(b.id);
  let acts='';
  if(asDoc){
    if(s==='confirmed'||s==='completed')acts+=`<button class="btn s" data-action="csroom" data-id="${b.id}">${t('cs_open')}</button>`;
    if(s==='confirmed')acts+=`<button class="btn line s" data-action="cscancelq" data-id="${b.id}">${t('cs_cancel')}</button>`;
  }else{
    if(s==='held')acts+=`<button class="btn s" data-action="cspay" data-id="${b.id}">${t('cs_pay_now')}</button><button class="btn line s" data-action="cscancelq" data-id="${b.id}">${t('cs_cancel')}</button>`;
    if(s==='awaiting')acts+=`<button class="btn line s" data-action="cspay" data-id="${b.id}">${t('cs_st_awaiting')}</button><button class="btn line s" data-action="cscancelq" data-id="${b.id}">${t('cs_cancel')}</button>`;
    if(s==='confirmed'||s==='completed')acts+=`<button class="btn s" data-action="csroom" data-id="${b.id}">${t('cs_open')}</button>`;
    if(s==='confirmed')acts+=`<button class="btn line s" data-action="cscancelq" data-id="${b.id}">${t('cs_cancel')}</button>`;
    if(s==='completed'&&!rv)acts+=`<button class="btn soft s" data-action="csroom" data-id="${b.id}">${t('cs_rate_t')}</button>`;
  }
  const note=s==='cancelled'||s==='expired'?(b.rf==='due'?`<div class="muted sm">${asDoc?'':t('cs_refund_due')}</div>`:b.rf==='done'?`<div class="muted sm">${asDoc?'':t('cs_refund_done')}</div>`:''):'';
  const pay=asDoc&&s==='completed'?`<span class="pill ${b.po==='paid'?'ok':'yl'}">${t(b.po==='paid'?'cs_payout_paid':'cs_payout_due')}</span>`:'';
  return `<div class="card"><div class="item" style="align-items:flex-start;gap:10px">${avatar(other,'s')}<div class="grow"><b>${other?nm(other):''}</b><div class="muted sm">${asDoc?t('cs_patient'):esc(csSpecName((csDoc(b.dr)||{}).spec))} · ${esc(fmtWhen(b.st))}</div><div class="sm">${asDoc?`${t('cs_fee')}: ${money(b.fee)} · ${t('cs_commission')}: ${money(b.com)} · <b>${t('cs_net')}: ${money(b.net)}</b>`:`${t('cs_fee')}: <b>${money(b.fee)}</b>`}</div>${note}</div><div style="display:grid;gap:6px;justify-items:end">${stPill(b)}${pay}</div></div>${acts?`<div class="mfoot" style="margin-top:8px">${acts}</div>`:''}</div>`;
}
function csMine(){
  const l=csEnsure().bk.filter(b=>b.pt===S.me).sort((a,b)=>b.st-a.st);
  return `<div class="list">${l.map(b=>csBkCard(b,false)).join('')||`<div class="card empty">${t('cs_mine_empty')}</div>`}</div>`;
}
function csCancelQ(id){
  const b=csBk(id);if(!b)return;const late=b.status==='confirmed'&&b.pt===S.me&&b.st-Date.now()<csCfg().cancelHrs*H;
  openModal(`<h3>${t('cs_cancel_q')}</h3>${late?`<div class="hint">${t('cs_cancel_late',csCfg().cancelHrs)}</div>`:''}<div class="mfoot"><button class="btn" style="background:var(--danger)" data-action="cscancel" data-id="${id}">${t('cs_cancel_yes')}</button><button class="btn line" data-action="closem">${t('cs_keep')}</button></div>`);
}

/* ---------- غرفة الاستشارة (تفاصيل + محادثة + تشخيص + تقييم) ---------- */
function csMsgsHtml(id){
  const l=csEnsure().msgs.filter(x=>x.bid===id).sort((a,b)=>a.ts-b.ts);
  return l.length?l.map(x=>`<div style="display:flex;justify-content:${x.from===S.me?'flex-end':'flex-start'};margin:4px 0"><div style="max-width:80%;padding:6px 12px;border-radius:14px;background:${x.from===S.me?'var(--cyan-s)':'var(--surface2)'}">${esc(x.text)}<div class="muted" style="font-size:11px">${esc(fmtTime(x.ts))}</div></div></div>`).join(''):`<div class="muted sm">${t('cs_chat_empty')}</div>`;
}
function csRoomDraw(id){
  const b=csBk(id);if(!b){closeModal();return}
  const asDoc=b.dr===S.me,other=U(asDoc?b.pt:b.dr),cc=csEnsure().cc[id]||{complaint:'',diagnosis:'',meet:''},s=csStatus(b),rv=csRv(id);
  const live=s==='confirmed'||s==='completed';
  const meet=asDoc?`<div class="field"><label for="cs_meet">${t('cs_meet')}</label><input id="cs_meet" class="in" dir="ltr" placeholder="https://" value="${esc(cc.meet||'')}"></div>`
    :(cc.meet&&/^https:\/\//i.test(cc.meet)?`<a class="btn" href="${esc(cc.meet)}" target="_blank" rel="noopener noreferrer">${t('cs_join')}</a>`:`<div class="muted sm">${t('cs_no_meet')}</div>`);
  const diag=asDoc?`<div class="field"><label for="cs_diag">${t('cs_diag')}</label><textarea id="cs_diag" class="ta" maxlength="3000">${esc(cc.diagnosis||'')}</textarea></div>`
    :`<h4 style="margin:12px 0 4px">${t('cs_diag')}</h4><div style="white-space:pre-wrap">${cc.diagnosis?esc(cc.diagnosis):`<span class="muted">${t('cs_diag_none')}</span>`}</div>`;
  const rate=(!asDoc&&s==='completed')?(rv?`<div class="item" style="margin-top:12px">${stars(rv.stars)} <span class="muted sm">${t('cs_rated')}</span></div>`
    :`<h4 style="margin:14px 0 6px">${t('cs_rate_t')}</h4><div id="csStars" style="font-size:30px;cursor:pointer">${[1,2,3,4,5].map(n=>`<button type="button" data-action="csstar" data-n="${n}" aria-label="${n}" style="border:0;background:none;font-size:30px;cursor:pointer;color:${(ui.cs.rate||0)>=n?'var(--y)':'var(--line)'}">★</button>`).join('')}</div><div class="field"><textarea id="cs_rv" class="ta" maxlength="500" placeholder="${esc(t('cs_rate_ph'))}"></textarea></div><button class="btn s" data-action="csrate" data-id="${id}">${t('cs_rate_send')}</button>`):'';
  const canDone=asDoc&&s==='confirmed'&&Date.now()>=b.st;
  openModal(`<div class="item" style="align-items:flex-start;gap:10px">${avatar(other,'m')}<div class="grow"><h3 style="margin:0">${t('cs_room_t')} ${t('cs_with')} ${other?nm(other):''}</h3><div class="muted sm">${esc(fmtWhen(b.st))} · ${t('cs_slot_min',b.dur)}</div></div>${stPill(b)}</div>
${asDoc?`<h4 style="margin:12px 0 4px">${t('cs_complaint_l')}</h4><div style="white-space:pre-wrap">${esc(cc.complaint||'')}</div>`:`<div class="muted sm" style="margin-top:8px">${esc(cc.complaint||'')}</div>`}
<div style="margin-top:12px">${meet}</div>${diag}
${asDoc?`<div class="mfoot" style="margin-top:6px"><button class="btn s" data-action="cssavecons" data-id="${id}">${t('cs_save')}</button>${canDone?`<button class="btn soft s" data-action="cscomplete" data-id="${id}">${t('cs_complete')}</button>`:''}</div>`:''}
<h4 style="margin:14px 0 6px">${ic('comment')} ${t('cs_chat')}</h4>${live?`<div id="csMsgs" style="max-height:220px;overflow:auto;padding:6px;border:1px solid var(--line);border-radius:12px">${csMsgsHtml(id)}</div>
<div class="item" style="margin-top:8px"><input id="cs_msg" class="in grow" maxlength="1000" placeholder="${esc(t('cs_chat_ph'))}" data-cs-chat="${id}" aria-label="${esc(t('cs_chat_ph'))}"><button class="btn s" data-action="cssend" data-id="${id}">${t('cs_send')}</button></div>`:`<div class="muted sm">${t('cs_chat_closed')}</div>`}
${rate}<div class="hint" style="margin-top:12px">${ic('lock')} ${t('cs_priv')}</div><div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn line" data-action="csroomclose">${t('close')}</button></div>`,1);
  const box=$('#csMsgs');if(box)box.scrollTop=box.scrollHeight;
  ui.cs.room=id;
  if(!ui.cs.roomTimer)ui.cs.roomTimer=setInterval(async()=>{if(!ui.cs.room||!$('#csMsgs')){csRoomStop();return}try{await CS.reload()}catch(e){return}const bx=$('#csMsgs');if(bx){const atEnd=bx.scrollHeight-bx.scrollTop-bx.clientHeight<40,h=csMsgsHtml(ui.cs.room);if(bx.innerHTML!==h){bx.innerHTML=h;if(atEnd)bx.scrollTop=bx.scrollHeight}}},REAL?8000:2500);
}
function csRoomStop(){clearInterval(ui.cs.roomTimer);ui.cs.roomTimer=null;ui.cs.room=null}

/* ---------- لوحة الطبيب ---------- */
function csDash(){
  const d=csDoc(S.me);if(!d)return csApply();
  const c=csCfg(),po=csEnsure().payouts[S.me]||{method:'vodafone',handle:''},mine=csEnsure().bk.filter(b=>b.dr===S.me).sort((a,b)=>b.st-a.st);
  const due=mine.filter(b=>b.status==='completed'&&b.po==='due').reduce((a,b)=>a+b.net,0),paid=mine.filter(b=>b.po==='paid').reduce((a,b)=>a+b.net,0);
  const net=Math.round((d.fee||0)*(100-c.commissionPct)/100);
  const hrs=[6,0,1,2,3,4,5].map(k=>{const iv=(d.hours||{})[k]||[];const row=i=>`<input type="time" id="ch_${k}_${i}_a" class="in" style="width:120px" value="${esc(iv[i]?iv[i][0]:'')}" aria-label="${t('cs_from')}"> <span class="muted">→</span> <input type="time" id="ch_${k}_${i}_b" class="in" style="width:120px" value="${esc(iv[i]?iv[i][1]:'')}" aria-label="${t('cs_to')}">`;
    return `<div class="item" style="flex-wrap:wrap;gap:8px;padding:6px 0;border-top:1px solid var(--line)"><label class="sw" style="min-width:110px"><input type="checkbox" id="ch_${k}_on" ${iv.length?'checked':''}> <b>${t('cs_d'+k)}</b></label>${row(0)}${row(1)}</div>`}).join('');
  return `${d.suspended?`<div class="hint" style="color:var(--danger);margin-bottom:10px">${t('cs_suspended')}</div>`:''}
<div class="card"><div class="item"><h3 class="grow">${t('cs_dash')}</h3><span class="pill ${d.active&&!d.suspended?'ok':'gr'}">${d.active&&!d.suspended?t('cs_active'):t('cs_inactive')}</span></div>
<label class="sw" style="padding:8px 0;cursor:pointer"><input type="checkbox" id="cd_active" ${d.active?'checked':''} ${d.suspended?'disabled':''}> <span>${t('cs_active_sw')}</span></label><div class="muted sm">${t('cs_active_h')}</div>
<div class="row" style="margin-top:12px"><div class="field"><label for="cd_fee">${t('cs_fee_l')}</label><input id="cd_fee" class="in" type="number" min="0" step="10" value="${d.fee||''}" dir="ltr"><div class="muted sm" id="cd_hint">${t('cs_fee_hint',c.feeMin,c.feeMax,c.commissionPct,net)}</div></div></div>
<div class="field"><label for="cd_bio">${t('cs_bio')}</label><textarea id="cd_bio" class="ta" maxlength="600">${esc(L(d.bio))}</textarea></div>
<h4 style="margin:12px 0 4px">${ic('clock')} ${t('cs_hours_l')}</h4>${hrs}<div class="muted sm">${t('cs_slot_min',c.slotMin)}</div>
<h4 style="margin:14px 0 4px">${ic('cash')} ${t('cs_payout')}</h4><div class="muted sm">${t('cs_payout_h')}</div>
<div class="row"><div class="field"><label for="cd_pm">${t('cs_method')}</label><select id="cd_pm" class="sel"><option value="vodafone" ${po.method==='vodafone'?'selected':''}>${t('cs_vf')}</option><option value="instapay" ${po.method==='instapay'?'selected':''}>${t('cs_ip')}</option></select></div><div class="field"><label for="cd_ph">${t('cs_handle')}</label><input id="cd_ph" class="in" dir="ltr" maxlength="60" value="${esc(po.handle||'')}"></div></div>
<div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn" data-action="cssavedoc">${t('cs_save')}</button></div></div>
<div class="card" style="margin-top:12px"><h3>${t('cs_earn')}</h3><div class="row"><div class="field"><div class="muted sm">${t('cs_earn_due')}</div><b style="font-size:22px">${money(due)}</b></div><div class="field"><div class="muted sm">${t('cs_earn_paid')}</div><b style="font-size:22px">${money(paid)}</b></div></div></div>
<h3 style="margin:14px 0 8px">${t('cs_my_bk')}</h3><div class="list">${mine.map(b=>csBkCard(b,true)).join('')||`<div class="card empty">${t('cs_none_bk')}</div>`}</div>`;
}
function csReadHours(){
  const h={};
  for(let k=0;k<7;k++){
    const on=$('#ch_'+k+'_on');if(!on||!on.checked)continue;const iv=[];
    for(let i=0;i<2;i++){const a=($('#ch_'+k+'_'+i+'_a')||{}).value,b=($('#ch_'+k+'_'+i+'_b')||{}).value;if(a&&b)iv.push([a,b]);else if(a||b)return null}
    if(iv.length)h[k]=iv;
  }
  return h;
}

/* ---------- تسجيل الطبيب (طلب التشخيص الأونلاين) ---------- */
let csStream=null;
function csCamStop(){if(csStream){try{csStream.getTracks().forEach(x=>x.stop())}catch(e){}csStream=null}const v=$('#csVid');if(v)v.srcObject=null}
function csPrev(kind){
  const a=ui.cs.app,u=a[kind+'Url'];
  return u?`<img src="${u}" alt="" style="max-width:100%;max-height:200px;border-radius:12px;border:1px solid var(--line)">`:'';
}
function csApply(){
  const a=csMyApp(),m=me();
  const dis=`<div class="hint" style="margin-top:10px">${t('cs_member_note')}</div>`;
  if(a&&a.status==='pending')return `<div class="card"><h3>${t('cs_apply_t')}</h3><p>${ic('clock')} ${t('cs_app_pending')}</p></div>${dis}`;
  const rej=a&&a.status==='rejected'?`<div class="card" style="border-color:var(--danger)"><b>${t('cs_app_rej')}</b>${a.note?`<div class="muted">${t('cs_app_rej_note',esc(a.note))}</div>`:''}</div>`:'';
  return `${rej}<div class="card" id="csApplyCard"><h3>${ic('steth')} ${t('cs_apply_t')}</h3><p class="muted sm">${t('cs_apply_p')}</p>
<div class="row"><div class="field"><label for="ca_name">${t('cs_f_name')}</label><input id="ca_name" class="in" maxlength="120" autocomplete="name" value="${esc(L(m.name))}"></div><div class="field" style="flex:0 1 110px"><label for="ca_age">${t('cs_f_age')}</label><input id="ca_age" class="in" type="number" min="21" max="90" dir="ltr"></div></div>
<div class="row"><div class="field"><label for="ca_phone">${t('cs_f_phone')}</label><input id="ca_phone" class="in" type="tel" dir="ltr" maxlength="20" autocomplete="tel"></div><div class="field"><label for="ca_lic">${t('cs_f_lic')}</label><input id="ca_lic" class="in" dir="ltr" maxlength="40"></div></div>
<div class="row"><div class="field"><label for="ca_uni">${t('cs_f_uni')}</label><input id="ca_uni" class="in" maxlength="120"></div><div class="field"><label for="ca_spec">${t('cs_f_spec')}</label><select id="ca_spec" class="sel">${csSpecs().map(s=>`<option value="${esc(s.id)}">${esc(s.builtin?t('sp_'+s.id):L(s.name))}</option>`).join('')}</select></div></div>
<div class="field"><label for="csIdIn">${ic('file')} ${t('cs_f_id')}</label><input id="csIdIn" type="file" accept="image/jpeg,image/png,image/webp"><div id="csIdPrev" style="margin-top:6px">${csPrev('id')}</div></div>
<div class="field"><label>${ic('cam')} ${t('cs_f_selfie')}</label><div id="csCam"><button class="btn line s" type="button" data-action="cscam">${t('cs_cam_open')}</button></div><div id="csSelfPrev" style="margin-top:6px">${csPrev('selfie')}</div><div id="csCamMsg" class="muted sm"></div></div>
<label class="sw" style="cursor:pointer;padding:8px 0"><input type="checkbox" id="ca_ok"> <span>${t('cs_consent')}</span></label><div id="aerr" class="err" role="alert"></div>
<div class="mfoot"><button class="btn" data-action="csapply">${t('cs_submit_app')}</button></div></div>${dis}`;
}
async function csCamOpen(){
  const box=$('#csCam'),msg=$('#csCamMsg');if(!box)return;if(msg)msg.textContent='';
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('nocam');
    csStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:720},height:{ideal:720}},audio:false});
    box.innerHTML=`<video id="csVid" autoplay playsinline muted style="width:100%;max-width:360px;border-radius:12px;background:#000;transform:scaleX(-1)"></video><div class="mfoot" style="margin-top:8px"><button class="btn s" type="button" data-action="cssnap">${t('cs_cam_snap')}</button><button class="btn line s" type="button" data-action="cscamstop">${t('cs_cam_stop')}</button></div>`;
    const v=$('#csVid');v.srcObject=csStream;try{await v.play()}catch(e){}
  }catch(e){
    csCamStop();if(msg)msg.textContent=t('cs_cam_denied');
    box.innerHTML=`<button class="btn line s" type="button" data-action="cscam">${t('cs_cam_open')}</button> <label class="btn line s" style="cursor:pointer">${t('cs_cam_fallback')}<input id="csSelfIn" type="file" accept="image/*" capture="user" hidden></label>`;
  }
}
function csSnap(){
  const v=$('#csVid');if(!v||!v.videoWidth)return;
  const w=Math.min(720,v.videoWidth),h=Math.round(v.videoHeight*w/v.videoWidth),c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d');x.drawImage(v,0,0,w,h);
  c.toBlob(b=>{if(!b)return;const a=ui.cs.app;if(a.selfieUrl)try{URL.revokeObjectURL(a.selfieUrl)}catch(e){}a.selfie=b;a.selfieUrl=URL.createObjectURL(b);csCamStop();
    const box=$('#csCam');if(box)box.innerHTML=`<button class="btn line s" type="button" data-action="cscam">${t('cs_cam_retake')}</button>`;const p=$('#csSelfPrev');if(p)p.innerHTML=csPrev('selfie')},'image/jpeg',.85);
}
async function csApplySubmit(){
  const a=ui.cs.app,v={name:val('ca_name'),age:+val('ca_age'),phone:val('ca_phone'),uni:val('ca_uni'),lic:val('ca_lic'),spec:val('ca_spec')},ok=$('#ca_ok');
  if(v.name.length<3||!(v.age>=21&&v.age<=90)||v.phone.length<7||v.uni.length<2||v.lic.length<2||!v.spec||!a.id||!a.selfie||!ok||!ok.checked){aerr(t('cs_app_err'));return}
  const btn=$('[data-action="csapply"]');if(btn)btn.disabled=true;
  try{
    const [idp]=await Promise.all([CS.upload(a.id,'id')]),[selfie]=await Promise.all([CS.upload(a.selfie,'selfie')]);
    await CS.op('apply',Object.assign({},v,{idp,selfie}));
    csCamStop();ui.cs.app={};await CS.reload();render();toast(t('cs_sent'));
  }catch(e){console.warn(e);aerr(csErr(e));if(btn)btn.disabled=false}
}
/* اختيار الملفات (البطاقة / السيلفي الاحتياطي / إيصال الدفع) */
document.addEventListener('change',async e=>{
  const el=e.target;if(!el||!el.matches)return;
  try{
    if(el.matches('#csIdIn')){const f=el.files&&el.files[0];if(!f)return;const b=await compressImg(f,REAL?1600:1000,REAL?.85:.6);const a=ui.cs.app;if(a.idUrl)try{URL.revokeObjectURL(a.idUrl)}catch(x){}a.id=b;a.idUrl=URL.createObjectURL(b);const p=$('#csIdPrev');if(p)p.innerHTML=csPrev('id')}
    else if(el.matches('#csSelfIn')){const f=el.files&&el.files[0];if(!f)return;const b=await compressImg(f,720,.85);const a=ui.cs.app;if(a.selfieUrl)try{URL.revokeObjectURL(a.selfieUrl)}catch(x){}a.selfie=b;a.selfieUrl=URL.createObjectURL(b);const p=$('#csSelfPrev');if(p)p.innerHTML=csPrev('selfie')}
    else if(el.matches('#csProofIn')){const f=el.files&&el.files[0];if(!f)return;const b=await compressImg(f,REAL?1400:900,REAL?.8:.6);ui.cs.pay={blob:b};const o=$('#csProofOk');if(o)o.textContent=t('cs_proof_ok')}
  }catch(err){toast(imgErr(err))}
});
document.addEventListener('input',e=>{
  const el=e.target;if(!el||!el.dataset)return;
  if(el.dataset.in==='csq'){ui.cs.q=el.value;const l=$('#csList');if(l)l.innerHTML=csDirList()}
  if(el.id==='cd_fee'){const c=csCfg(),h=$('#cd_hint');if(h)h.textContent=t('cs_fee_hint',c.feeMin,c.feeMax,c.commissionPct,Math.round((+el.value||0)*(100-c.commissionPct)/100))}
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.dataset&&e.target.dataset.csChat){e.preventDefault();CA.cssend({dataset:{id:e.target.dataset.csChat}})}});
/* ===== للاستفسارات الطبية — لوحة الأدمن + الأفعال + الإشعارات ===== */
ui.ac={tab:'apps',f:'need'};
/* ---------- الأدمن ---------- */
const acPending=()=>csEnsure().apps.filter(a=>a.status==='pending').length;
const acNeed=()=>csEnsure().bk.filter(b=>b.status==='awaiting').length+csEnsure().bk.filter(b=>b.rf==='due').length+csEnsure().bk.filter(b=>b.po==='due').length;
function adCons(){
  const T=[['apps','ac_apps',acPending()?' ('+acPending()+')':''],['docs','ac_docs',''],['pay','ac_pay',acNeed()?' ('+acNeed()+')':''],['rev','ac_rev',''],['set','ac_set','']];
  const fn={apps:acApps,docs:acDocs,pay:acPay,rev:acRev,set:acSet}[ui.ac.tab]||acApps;
  return `<div class="subtabs" style="margin-top:8px">${T.map(x=>`<button class="${ui.ac.tab===x[0]?'on':''}" data-action="acsub" data-id="${x[0]}">${t(x[1])}${x[2]}</button>`).join('')}</div>${fn()}`;
}
const appPill=a=>`<span class="pill ${a.status==='pending'?'yl':a.status==='approved'?'ok':'pk'}">${t('ac_'+a.status)}</span>`;
function acApps(){
  const l=csEnsure().apps.slice().sort((a,b)=>(a.status==='pending'?0:1)-(b.status==='pending'?0:1)||b.ts-a.ts);
  return `<div class="list">${l.map(a=>{const u=U(a.uid);return `<div class="card"><div class="item" style="align-items:flex-start;gap:10px">${avatar(u,'s')}<div class="grow"><b>${esc(a.name)}</b> ${appPill(a)}<div class="muted sm">${esc(csSpecName(a.spec))} · ${esc(a.uni)} · ${t('cs_f_lic')}: <span dir="ltr">${esc(a.lic)}</span></div><div class="muted sm">${t('cs_f_age')}: ${esc(a.age)} · <span dir="ltr">${esc(a.phone)}</span> · ${ago(a.ts)}</div></div><button class="btn s" data-action="acreview" data-id="${a.id}">${t('ac_review')}</button></div></div>`}).join('')||`<div class="card empty">${t('ac_none')}</div>`}</div>`;
}
async function acReview(id){
  const a=csEnsure().apps.find(x=>x.id===id);if(!a)return;
  const files=a.idp||a.selfie;
  openModal(`<h3>${esc(a.name)} ${appPill(a)}</h3><div class="muted sm">${esc(csSpecName(a.spec))} · ${esc(a.uni)}<br>${t('cs_f_lic')}: <b dir="ltr">${esc(a.lic)}</b> · ${t('cs_f_age')}: ${esc(a.age)} · <span dir="ltr">${esc(a.phone)}</span></div>
${files?`<div class="row" style="margin-top:10px"><div class="field"><div class="muted sm">${t('ac_id_photo')}</div><img id="acImgId" alt="" style="width:100%;border-radius:10px;border:1px solid var(--line)"><div class="muted sm" id="acLdId">${t('ac_loading')}</div></div><div class="field"><div class="muted sm">${t('ac_selfie')}</div><img id="acImgSelf" alt="" style="width:100%;border-radius:10px;border:1px solid var(--line)"><div class="muted sm" id="acLdSelf">${t('ac_loading')}</div></div></div>`:`<div class="hint" style="margin:10px 0">${t('ac_no_files')}</div>`}
${a.status==='pending'?`<div class="field"><label for="ac_note">${t('ac_note')}</label><textarea id="ac_note" class="ta" maxlength="500"></textarea></div><div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn" data-action="acdecide" data-id="${id}" data-d="approved">${t('ac_approve')}</button><button class="btn line" style="color:var(--danger)" data-action="acdecide" data-id="${id}" data-d="rejected">${t('ac_reject')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`
:`<div class="mfoot">${files?`<button class="btn line" style="color:var(--danger)" data-action="acpurge" data-id="${id}">${ic('trash')} ${t('ac_files_del')}</button>`:''}<button class="btn line" data-action="closem">${t('close')}</button></div>`}`,1);
  if(files){
    for(const [k,p,i,l] of [['id',a.idp,'acImgId','acLdId'],['self',a.selfie,'acImgSelf','acLdSelf']]){
      try{const u=p?await CS.file(p):'';const im=$('#'+i),ld=$('#'+l);if(im&&u){im.src=u;if(ld)ld.remove()}else if(ld)ld.textContent=t('ac_no_files')}catch(e){const ld=$('#'+l);if(ld)ld.textContent=t('cse_x')}
    }
  }
}
function acDocs(){
  const l=csEnsure().docs.slice().sort((a,b)=>b.ts-a.ts),po=csEnsure().payouts;
  return `<div class="list">${l.map(d=>{const u=U(d.uid),r=csRating(d.uid),p=po[d.uid];
    return `<div class="card"><div class="item" style="align-items:flex-start;gap:10px">${avatar(u,'s')}<div class="grow"><b>${u?nm(u):d.uid}</b> <span class="pill ${d.suspended?'pk':d.active?'ok':'gr'}">${d.suspended?t('ac_suspended'):d.active?t('cs_active'):t('cs_inactive')}</span>
<div class="muted sm">${esc(csSpecName(d.spec))} · ${t('cs_fee')}: ${d.fee?money(d.fee):'—'} · ${r.n?stars(r.avg)+' '+r.avg.toFixed(1)+' ('+r.n+')':t('cs_no_rating')}</div>
<div class="muted sm">${t('ac_payout_info')}: ${p?esc(t(p.method==='vodafone'?'cs_vf':'cs_ip'))+' · <span dir="ltr">'+esc(p.handle)+'</span>':t('ac_not_set')}</div></div></div>
<div class="mfoot" style="margin-top:8px"><select class="sel" style="max-width:190px" data-acspec="${d.uid}" aria-label="${esc(t('ac_spec_change'))}">${csSpecs().map(s=>`<option value="${esc(s.id)}" ${s.id===d.spec?'selected':''}>${esc(s.builtin?t('sp_'+s.id):L(s.name))}</option>`).join('')}${csSpecs().some(s=>s.id===d.spec)?'':`<option value="${esc(d.spec)}" selected>${esc(csSpecName(d.spec))}</option>`}</select>
<button class="btn line s" data-action="acdoc" data-id="${d.uid}" data-a="${d.suspended?'unsuspend':'suspend'}">${t(d.suspended?'ac_unsuspend':'ac_suspend')}</button><button class="btn line s" style="color:var(--danger)" data-action="acdocrevoke" data-id="${d.uid}">${t('ac_revoke')}</button></div></div>`}).join('')||`<div class="card empty">${t('ac_none')}</div>`}</div>`;
}
function acSummary(){
  const B=csEnsure().bk,sum=(f,k)=>B.filter(f).reduce((a,b)=>a+b[k],0);
  const rows=[['ac_sum_in',sum(b=>['confirmed','completed'].includes(b.status),'fee')],['ac_sum_fee',sum(b=>b.status==='completed','com')],['ac_sum_due',sum(b=>b.po==='due','net')],['ac_sum_paid',sum(b=>b.po==='paid','net')],['ac_sum_ref',sum(b=>b.rf==='due','fee')]];
  return `<div class="card"><div class="row" style="flex-wrap:wrap">${rows.map(r=>`<div class="field" style="min-width:130px"><div class="muted sm">${t(r[0])}</div><b style="font-size:20px">${money(r[1])}</b></div>`).join('')}</div></div>`;
}
function acPay(){
  const F=[['need','ac_f_need'],['awaiting','ac_f_awaiting'],['refund','ac_f_refund'],['payout','ac_f_payout'],['all','ac_f_all']];
  const need=b=>b.status==='awaiting'||b.rf==='due'||b.po==='due',f=ui.ac.f;
  const l=csEnsure().bk.filter(b=>f==='all'||(f==='need'&&need(b))||(f==='awaiting'&&b.status==='awaiting')||(f==='refund'&&b.rf!=='none')||(f==='payout'&&b.po!=='none')).sort((a,b)=>b.cts-a.cts);
  return `${acSummary()}<div class="subtabs" style="margin:10px 0">${F.map(x=>`<button class="${f===x[0]?'on':''}" data-action="acfilter" data-id="${x[0]}">${t(x[1])}</button>`).join('')}</div><div class="list">${l.map(acBkCard).join('')||`<div class="card empty">${t('ac_none')}</div>`}</div>`;
}
function acBkCard(b){
  const pt=U(b.pt),dr=U(b.dr),s=csStatus(b),A=(a,l,x='')=>`<button class="btn ${x||'line'} s" data-action="acbk" data-id="${b.id}" data-a="${a}">${t(l)}</button>`;
  let acts='';
  if(s==='awaiting')acts+=A('confirm','ac_confirm','')+A('reject','ac_rej_pay','line');
  if(b.rf==='due')acts+=A('refund_done','ac_refund_done','');
  if(b.po==='due')acts+=A('payout_done','ac_payout_done','');
  if(['cancelled','completed'].includes(b.status)&&b.rf==='none'&&b.pm)acts+=A('refund_due','ac_refund_mark','line');
  if(['held','awaiting','confirmed'].includes(b.status))acts+=A('cancel','ac_cancel_b','line');
  const po=csEnsure().payouts[b.dr];
  return `<div class="card"><div class="item" style="align-items:flex-start;gap:10px"><div class="grow"><b>${pt?nm(pt):'—'}</b> → <b>${dr?nm(dr):'—'}</b><div class="muted sm">${esc(fmtWhen(b.st))} · ${money(b.fee)} (${t('cs_commission')} ${money(b.com)} · ${t('cs_net')} ${money(b.net)})</div>
${b.pm?`<div class="sm">${t(b.pm==='vodafone'?'cs_vf':'cs_ip')} · <span dir="ltr">${esc(b.pref)}</span>${b.pproof?` · <button class="lnk" data-action="acproof" data-id="${b.id}">${ic('eye')} ${t('ac_proof')}</button>`:''}</div>`:''}
${b.po==='due'?`<div class="sm">${t('ac_payout_info')}: ${po?esc(t(po.method==='vodafone'?'cs_vf':'cs_ip'))+' · <span dir="ltr">'+esc(po.handle)+'</span>':t('ac_not_set')}</div>`:''}
${b.rf!=='none'?`<div class="sm" style="color:var(--danger)">${t('ac_f_refund')}: ${b.rf==='due'?t('ac_f_need'):t('cs_refund_done')}</div>`:''}</div><div style="display:grid;gap:6px;justify-items:end">${stPill(b)}${b.po!=='none'?`<span class="pill ${b.po==='paid'?'ok':'yl'}">${t(b.po==='paid'?'cs_payout_paid':'cs_payout_due')}</span>`:''}</div></div>${acts?`<div class="mfoot" style="margin-top:8px">${acts}</div>`:''}</div>`;
}
function acRev(){
  const l=csEnsure().rv.slice().sort((a,b)=>b.ts-a.ts);
  return `<div class="list">${l.map(r=>{const d=U(r.dr),p=U(r.pt);return `<div class="card"><div class="item"><div class="grow">${stars(r.stars)} <b>${p?esc(String(L(p.name)).split(' ')[0]):''}</b> → ${d?nm(d):''} ${r.hidden?`<span class="pill gr">${t('ac_hidden')}</span>`:''}<div>${esc(r.comment)}</div><div class="muted sm">${ago(r.ts)}</div></div><button class="btn line s" data-action="achide" data-id="${r.bid}" data-h="${r.hidden?0:1}">${t(r.hidden?'ac_show':'ac_hide')}</button></div></div>`}).join('')||`<div class="card empty">${t('ac_none')}</div>`}</div>`;
}
function acSet(){
  const c=csCfg(),pc=csPayCfg(),sp=c.specs,n=(id,k,mn,mx)=>`<div class="field"><label for="${id}">${t(k)}</label><input id="${id}" class="in" type="number" min="${mn}" max="${mx}" dir="ltr" value="${c[id.slice(3)]}"></div>`;
  return `<div class="card"><label class="sw" style="cursor:pointer;padding:6px 0"><input type="checkbox" data-sf="toggles.consult" ${csOn()?'checked':''}> <span>${t('ac_s_on')}</span></label>
<div class="item" style="margin-top:6px"><button class="btn line s" data-action="actexts">${ic('edit')} ${t('ac_s_texts')}</button></div></div>
<div class="card" style="margin-top:12px"><h3>${t('ac_s_gen')}</h3><div class="row" style="flex-wrap:wrap">${n('as_commissionPct','ac_s_comm',0,90)}${n('as_slotMin','ac_s_slot',10,120)}${n('as_bookDays','ac_s_days',1,60)}${n('as_holdMin','ac_s_hold',5,240)}${n('as_leadMin','ac_s_lead',0,2880)}${n('as_cancelHrs','ac_s_cancel',0,168)}${n('as_feeMin','ac_s_fmin',0,100000)}${n('as_feeMax','ac_s_fmax',0,100000)}</div><div class="muted sm">${t('ac_s_note')}</div></div>
<div class="card" style="margin-top:12px"><h3>${ic('cash')} ${t('ac_s_pay')}</h3>
<label class="sw" style="cursor:pointer"><input type="checkbox" id="as_m_vodafone" ${c.methods.vodafone?'checked':''}> <span>${t('ac_s_vf_on')}</span></label>
<div class="row"><div class="field"><label for="as_vf_no">${t('cs_vf_no')}</label><input id="as_vf_no" class="in" dir="ltr" maxlength="30" value="${esc(pc.vodafone.number)}"></div><div class="field"><label for="as_vf_nm">${t('cs_acc_name')}</label><input id="as_vf_nm" class="in" maxlength="80" value="${esc(pc.vodafone.name)}"></div></div>
<label class="sw" style="cursor:pointer"><input type="checkbox" id="as_m_instapay" ${c.methods.instapay?'checked':''}> <span>${t('ac_s_ip_on')}</span></label>
<div class="row"><div class="field"><label for="as_ip_no">${t('cs_ip_no')}</label><input id="as_ip_no" class="in" dir="ltr" maxlength="60" value="${esc(pc.instapay.handle)}"></div><div class="field"><label for="as_ip_nm">${t('cs_acc_name')}</label><input id="as_ip_nm" class="in" maxlength="80" value="${esc(pc.instapay.name)}"></div></div></div>
<div class="card" style="margin-top:12px"><h3>${t('ac_s_specs')}</h3><div class="muted sm">${t('ac_s_specs_h')}</div><div id="asSpecs">${sp.map((s,i)=>`<div class="row" style="align-items:flex-end"><div class="field"><label>${t('ac_spec_ar')}</label><input class="in" id="as_sp_${i}_ar" maxlength="60" value="${esc(s.ar||'')}"></div><div class="field"><label>${t('ac_spec_en')}</label><input class="in" dir="ltr" id="as_sp_${i}_en" maxlength="60" value="${esc(s.en||'')}"></div><button class="btn line ic s" data-action="acsprm" data-i="${i}" aria-label="${esc(t('rm_img'))}">${ic('trash')}</button></div>`).join('')}</div>
<div class="mfoot"><button class="btn line s" data-action="acspadd">${ic('plus')} ${t('ac_spec_add')}</button>${sp.length?`<button class="btn line s" data-action="acspdef">${t('ac_spec_def')}</button>`:''}</div></div>
<div id="aerr" class="err" role="alert"></div><div class="mfoot" style="margin-top:12px"><button class="btn" data-action="acsave">${t('save')}</button></div>`;
}
function acReadSpecs(){
  const out=[];let i=0;while($('#as_sp_'+i+'_ar')){const ar=val('as_sp_'+i+'_ar'),en=val('as_sp_'+i+'_en'),old=(csCfg().specs[i]||{}).id;if(ar||en)out.push({id:old||('s'+Date.now().toString(36)+i),ar:clean(ar),en:clean(en)});i++}
  return out;
}
function acRead(){
  const c=csCfg(),o=Object.assign({},S.site.consult||{});
  const num=(k,mn,mx)=>{const e=$('#as_'+k);if(!e)return c[k];const v=Math.round(+e.value);return Number.isFinite(v)&&e.value!==''?Math.min(mx,Math.max(mn,v)):c[k]};
  o.commissionPct=num('commissionPct',0,90);o.slotMin=num('slotMin',10,120);o.bookDays=num('bookDays',1,60);o.holdMin=num('holdMin',5,240);o.leadMin=num('leadMin',0,2880);o.cancelHrs=num('cancelHrs',0,168);
  o.feeMin=num('feeMin',0,100000);o.feeMax=Math.max(o.feeMin,num('feeMax',0,100000));
  if($('#as_m_vodafone'))o.methods={vodafone:$('#as_m_vodafone').checked,instapay:$('#as_m_instapay').checked};
  return {o,pay:$('#as_vf_no')?{vodafone:{number:clean(val('as_vf_no')),name:clean(val('as_vf_nm'))},instapay:{handle:clean(val('as_ip_no')),name:clean(val('as_ip_nm'))}}:null};
}
/* يقرأ النموذج كله (دون حفظ نهائي) حتى لا تضيع التعديلات عند إضافة/حذف تخصص */
function acDraft(specs){const r=acRead();r.o.specs=specs;S.site.consult=r.o;if(r.pay)S.site.consult_pay=r.pay;}
function acSave(){acDraft(acReadSpecs());save();render();toast(t('ac_s_saved'))}

/* ---------- الأفعال ---------- */
const csBusy=async(el,fn)=>{if(el&&el.disabled)return;if(el)el.disabled=true;try{await fn()}catch(e){console.warn(e);try{aerr(csErr(e));toast(csErr(e))}catch(_){}}finally{if(el)el.disabled=false}};
const csRender=async()=>{await CS.reload();render()};
const CA={
  cstab(el){csCamStop();ui.cs.tab=el.dataset.id;render()},
  csspec(el){ui.cs.spec=el.dataset.id;render()},
  csdoc(el){csDocModal(el.dataset.id)},
  csbook(el){if(el.disabled)return;csBookOpen(el.dataset.id)},
  csday(el){csKeepComplaint();ui.cs.bk.day=+el.dataset.k;ui.cs.bk.slot=null;csBookDraw()},
  csslot(el){csKeepComplaint();ui.cs.bk.slot=+el.dataset.ts;csBookDraw()},
  csgo(el){csBookGo()},
  cspay(el){csPayModal(el.dataset.id)},
  cspm(el){csPayModal(el.dataset.id,el.dataset.m)},
  cssubmitpay(el){csSubmitPay(el.dataset.id)},
  csclosepay(){ui.cs.pay=null;closeModal()},
  cscancelq(el){csCancelQ(el.dataset.id)},
  cscancel(el){csBusy(el,async()=>{await CS.op('cancel',el.dataset.id);closeModal();await csRender();toast(t('cs_cancelled_ok'))})},
  csroom(el){ui.cs.rate=0;csRoomDraw(el.dataset.id)},
  csroomclose(){csRoomStop();closeModal();render()},
  cssend(el){const id=el.dataset.id,i=$('#cs_msg');if(!i)return;const tx=i.value.trim();if(!tx)return;i.value='';
    CS.op('send',id,tx).then(async()=>{await CS.reload();const bx=$('#csMsgs');if(bx){bx.innerHTML=csMsgsHtml(id);bx.scrollTop=bx.scrollHeight}}).catch(e=>{i.value=tx;toast(csErr(e))})},
  cssavecons(el){csBusy(el,async()=>{await CS.op('saveCons',el.dataset.id,val('cs_meet'),val('cs_diag'));await CS.reload();toast(t('cs_saved'))})},
  cscomplete(el){csBusy(el,async()=>{await CS.op('complete',el.dataset.id);await csRender();csRoomDraw(el.dataset.id);toast(t('cs_complete_ok'))})},
  csstar(el){const ta=$('#cs_rv'),keep=ta?ta.value:'';ui.cs.rate=+el.dataset.n;const id=ui.cs.room;csRoomDraw(id);const t2=$('#cs_rv');if(t2)t2.value=keep},
  csrate(el){if(!ui.cs.rate){aerr(t('cs_rate_none'));return}csBusy(el,async()=>{await CS.op('rate',el.dataset.id,ui.cs.rate,val('cs_rv'));await csRender();csRoomDraw(el.dataset.id);toast(t('cs_rated'))})},
  cssavedoc(el){
    const d=csDoc(S.me);if(!d)return;const hours=csReadHours(),fee=Math.round(+val('cd_fee')||0),active=$('#cd_active').checked;
    if(!hours||!hoursOk(hours)){aerr(t('cs_hours_bad'));return}
    if(active&&fee<=0){aerr(t('cs_need_fee'));return}if(active&&!Object.keys(hours).length){aerr(t('cs_need_hours'));return}
    const bio=val('cd_bio'),ph=val('cd_ph');
    csBusy(el,async()=>{await CS.op('saveDoc',{fee,hours,active,bio:bio?bio:'',payout:ph?{method:val('cd_pm'),handle:ph}:null});await csRender();toast(t('cs_saved'))});
  },
  cscam(){csCamOpen()},cssnap(){csSnap()},cscamstop(){csCamStop();const b=$('#csCam');if(b)b.innerHTML=`<button class="btn line s" type="button" data-action="cscam">${t('cs_cam_open')}</button>`},
  csapply(){csApplySubmit()},
  /* أدمن */
  acsub(el){ui.ac.tab=el.dataset.id;render()},
  acfilter(el){ui.ac.f=el.dataset.id;render()},
  acreview(el){acReview(el.dataset.id)},
  acdecide(el){csBusy(el,async()=>{await CS.op('review',el.dataset.id,el.dataset.d,val('ac_note'));closeModal();await csRender()})},
  acpurge(el){csBusy(el,async()=>{const a=csEnsure().apps.find(x=>x.id===el.dataset.id);if(REAL&&a)await BE.csRemove([a.idp,a.selfie]);await CS.op('purgeApp',el.dataset.id);closeModal();await csRender();toast(t('ac_files_gone'))})},
  acdoc(el){csBusy(el,async()=>{await CS.op('admDoc',el.dataset.id,el.dataset.a);await csRender()})},
  acdocrevoke(el){if(!confirmOnce(el,t('ac_revoke_q')))return;csBusy(el,async()=>{await CS.op('admDoc',el.dataset.id,'revoke');await csRender()})},
  acbk(el){const a=el.dataset.a;
    if(['refund_done','payout_done','reject','cancel'].includes(a)){openModal(`<h3>${t(el.textContent.trim()?'ac_ref_prompt':'ac_ref_prompt')}</h3><div class="field"><input id="ac_n" class="in" maxlength="300"></div><div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn" data-action="acbkgo" data-id="${el.dataset.id}" data-a="${a}">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);return}
    csBusy(el,async()=>{await CS.op('adm',el.dataset.id,a,'');await csRender()})},
  acbkgo(el){csBusy(el,async()=>{await CS.op('adm',el.dataset.id,el.dataset.a,val('ac_n'));closeModal();await csRender()})},
  acproof(el){const b=csBk(el.dataset.id);if(!b||!b.pproof)return;CS.file(b.pproof).then(u=>{openModal(`<h3>${t('ac_proof')}</h3><img src="${esc(u)}" alt="" style="width:100%;border-radius:10px"><div class="mfoot"><button class="btn line" data-action="closem">${t('close')}</button></div>`)}).catch(()=>toast(t('cse_x')))},
  achide(el){csBusy(el,async()=>{await CS.op('hideRv',el.dataset.id,el.dataset.h==='1');await csRender()})},
  acsave(){acSave()},
  acspadd(){const sp=acReadSpecs();acDraft(sp.concat([{id:'s'+Date.now().toString(36),ar:'',en:''}]));render()},
  acsprm(el){const sp=acReadSpecs();sp.splice(+el.dataset.i,1);acDraft(sp);render()},
  acspdef(){acDraft([]);save();render()},
  actexts(){ui.adminTab='texts';ui.txq='cs_';render()}
};
/* تأكيد بسيط داخل الصفحة لأن confirm() غير متاح في كل البيئات */
function confirmOnce(el,msg){if(el.dataset.armed==='1')return true;el.dataset.armed='1';el.textContent=msg;setTimeout(()=>{el.dataset.armed='';render()},4000);return false}
document.addEventListener('change',e=>{const el=e.target;if(el&&el.dataset&&el.dataset.acspec){CS.op('admDoc',el.dataset.acspec,'spec:'+el.value).then(csRender).catch(x=>toast(csErr(x)))}});

/* ---------- إشعارات (تُضاف لنظام c8) ---------- */
['cs_pay','cs_refund','cs_payout','cs_app','cs_app_ok','cs_app_no','cs_confirmed','cs_new','cs_pay_rej','cs_cancel','cs_done','cs_msg','cs_diag','cs_rated','cs_refunded','cs_paidout'].forEach(k=>{NT_ICON[k]=['cs_pay','cs_refund','cs_payout','cs_pay_rej','cs_refunded','cs_paidout'].includes(k)?'cash':'steth';NT_COL[k]=['cs_cancel','cs_pay_rej','cs_app_no'].includes(k)?'var(--danger)':'var(--cyan)'});
D.nt_cs_app=['{0} قدّم طلب تسجيل كطبيب','{0} applied as a doctor'];
function csNOpen(n){
  const adm=isAdmin();
  if(n.type==='cs_app'){ui.adminTab='cons';ui.ac.tab='apps';return 'admin'}
  if(['cs_pay','cs_refund','cs_payout'].includes(n.type)){ui.adminTab='cons';ui.ac.tab='pay';ui.ac.f='need';return 'admin'}
  if(n.type==='cs_app_ok'){ui.cs.tab='doc';return 'consult'}
  if(n.type==='cs_app_no'){ui.cs.tab='apply';return 'consult'}
  const b=csBk(n.ref);ui.cs.tab=b&&b.dr===S.me?'doc':'mine';return 'consult';
}
/* ===== MedRo — حسابات الأنشطة التجارية + إعلانات بالكريدت =====
   • حساب "نشاط تجاري": نشر + انضمام لمجموعات + إعلانات فقط.
   • الإعلان يُشترى بكريدت: الحد الأدنى وسعر الكريدت وعدد المشاهدات لكل كريدت يحددها الأدمن (S.site.bizads).
   • الدفع تحويل يدوي (فودافون كاش / إنستا باي) لأرقام المنصة، مع رقم الحساب الذي حُوِّل منه، ثم مراجعة الأدمن.
   • كل النصوص في القاموس D بمفاتيح bz_/bze_/nt_bz_ فيعدّلها الأدمن من محرر النصوص. */
Object.assign(D,{
 nav_myads:['إعلاناتي','My ads'],nav_myads_s:['إعلاناتي','Ads'],
 bz_title:['إعلاناتي','My ads'],bz_sub:['اشترِ كريدت لتشغيل إعلانك بين منشورات المنصة. يراجع فريقنا الإعلان والدفع قبل ظهوره.','Buy credits to run your ad between platform posts. Our team reviews the ad and the payment before it goes live.'],
 bz_price_line:['سعر الكريدت {0} · الحد الأدنى للإعلان الواحد {1} كريدت ({2}) · كل كريدت = {3} مشاهدة','Credit price {0} · minimum {1} credits per ad ({2}) · each credit = {3} views'],
 bz_new:['إعلان جديد','New ad'],bz_new_t:['إنشاء إعلان','Create an ad'],bz_topup:['شحن كريدت','Add credits'],bz_topup_t:['شحن كريدت للإعلان','Add credits to the ad'],
 bz_none:['لم تنشئ أي إعلان بعد. اضغط «إعلان جديد» للبدء.','You have no ads yet. Press “New ad” to start.'],
 bz_off:['الإعلانات متوقفة حاليًا من الإدارة.','Ads are currently disabled by the administration.'],
 bz_f_title:['عنوان الإعلان','Ad title'],bz_f_body:['نص الإعلان (اختياري)','Ad text (optional)'],bz_f_cta:['نص الزر','Button text'],bz_f_url:['رابط الإعلان (https://…)','Ad link (https://…)'],bz_f_tone:['لون البانر','Banner color'],
 bz_f_credits:['عدد الكريدت','Number of credits'],bz_total:['المطلوب تحويله','Amount to transfer'],bz_views_est:['≈ {0} مشاهدة','≈ {0} views'],
 bz_method:['وسيلة الدفع','Payment method'],bz_pay_to:['حوّل المبلغ إلى','Transfer the amount to'],bz_f_from:['الرقم أو الحساب الذي حوّلت منه (مطلوب)','The number/account you transferred from (required)'],
 bz_f_from_ph:['مثال: 01012345678 أو name@instapay','e.g. 01012345678 or name@instapay'],bz_f_ref:['رقم العملية (اختياري)','Transaction reference (optional)'],bz_f_proof:['صورة إيصال التحويل (اختياري ويسرّع المراجعة)','Transfer receipt photo (optional, speeds up review)'],
 bz_proof_ok:['تم اختيار الصورة','Image selected'],bz_pay_note:['حوّل المبلغ ثم اكتب الرقم الذي حوّلت منه ليتأكد الأدمن. لن يظهر الإعلان قبل المراجعة والموافقة.','Transfer the amount, then enter the number you sent from so the admin can verify. The ad will not appear before review and approval.'],
 bz_pay_not_set:['لم يضبط الأدمن بيانات الاستلام لهذه الوسيلة بعد.','The admin has not set the receiving details for this method yet.'],
 bz_submit:['إرسال للمراجعة','Submit for review'],bz_sent:['تم إرسال الإعلان للمراجعة','Ad submitted for review'],bz_topup_sent:['تم إرسال طلب الشحن للمراجعة','Top-up submitted for review'],
 bz_st_pending:['بانتظار المراجعة','Pending review'],bz_st_live:['يعمل','Live'],bz_st_paused:['متوقف','Paused'],bz_st_rejected:['مرفوض','Rejected'],bz_st_finished:['انتهى الكريدت','Credits used up'],
 bz_os_pending:['بانتظار المراجعة','Pending review'],bz_os_approved:['تمت الموافقة','Approved'],bz_os_rejected:['مرفوض','Rejected'],bz_os_cancelled:['ملغي','Cancelled'],
 bz_rf_due:['الاسترداد مستحق وسيحوّله الأدمن','Refund due, the admin will transfer it'],bz_rf_done:['تم رد المبلغ','Refund sent'],
 bz_views:['المشاهدات','Views'],bz_clicks:['النقرات','Clicks'],bz_bought:['كريدت مشترى','Credits bought'],bz_left:['المتبقي ≈ {0} كريدت','≈ {0} credits left'],
 bz_pause:['إيقاف مؤقت','Pause'],bz_resume:['استئناف','Resume'],bz_cancel_o:['إلغاء الطلب','Cancel order'],bz_cancel_q:['اضغط مرة أخرى لتأكيد الإلغاء (سيُسترد المبلغ يدويًا)','Press again to confirm (refund is manual)'],
 bz_admin_note:['ملاحظة الإدارة','Admin note'],bz_orders_h:['طلباتي','My orders'],bz_order_line:['{0} كريدت · {1} · {2}','{0} credits · {1} · {2}'],
 bz_promo_t:['أعلن عن نشاطك','Advertise your business'],bz_promo_d:['اشترِ كريدت وابدأ إعلانك أمام أعضاء المنصة.','Buy credits and start your ad in front of the members.'],
 bz_promo_b:['إعلاناتي','My ads'],
 /* لوحة الأدمن */
 ac_bz:['إعلانات الأنشطة','Business ads'],bz_a_ads:['كل الإعلانات','All ads'],bz_a_orders:['طلبات الكريدت','Credit orders'],bz_a_set:['إعدادات الكريدت','Credit settings'],
 bz_a_f_need:['تحتاج قرارًا','Needs action'],bz_a_f_refund:['استرداد مستحق','Refund due'],bz_a_f_all:['الكل','All'],
 bz_a_sum:['إجمالي الكريدت المباع: {0} · مبيعات مؤكدة: {1} · بانتظار المراجعة: {2} · استرداد مستحق: {3}','Credits sold: {0} · confirmed sales: {1} · pending: {2} · refunds due: {3}'],
 bz_a_none:['لا توجد طلبات.','No orders.'],bz_a_from:['حُوِّل من','Sent from'],bz_a_ref:['رقم العملية','Reference'],bz_a_proof:['عرض الإيصال','View receipt'],
 bz_a_approve:['موافقة وتشغيل','Approve & run'],bz_a_reject:['رفض','Reject'],bz_a_refund_done:['تم رد المبلغ','Refund sent'],
 bz_a_reject_p:['سبب الرفض (يصل لصاحب الإعلان)','Rejection reason (sent to the advertiser)'],bz_a_ref_p:['رقم عملية الاسترداد (اختياري)','Refund reference (optional)'],
 bz_a_kind_new:['إعلان جديد','New ad'],bz_a_kind_topup:['شحن كريدت','Top-up'],bz_a_owner:['صاحب الإعلان','Advertiser'],
 bz_s_price:['سعر الكريدت الواحد (جنيه)','Price of one credit (EGP)'],bz_s_min:['الحد الأدنى للكريدت في الإعلان الواحد','Minimum credits per ad'],bz_s_vpc:['عدد المشاهدات لكل كريدت','Views per credit'],
 bz_s_methods:['وسائل الدفع المتاحة للمعلنين','Payment methods offered to advertisers'],bz_s_numbers:['أرقام استلام المنصة تُضبط من «الاستشارات ← الإعدادات» وتُستخدم هنا أيضًا.','Platform receiving numbers are set in “Consultations → Settings” and are used here too.'],
 bz_s_go:['فتح إعدادات الأرقام','Open numbers settings'],bz_s_saved:['تم حفظ إعدادات الكريدت','Credit settings saved'],bz_s_note:['تغيير السعر لا يؤثر على الطلبات القائمة (سعرها مثبّت وقت الطلب).','Changing the price does not affect existing orders (their price is fixed at order time).'],
 bz_a_owner_col:['المعلن','Advertiser'],
 /* أخطاء */
 bze_business_only:['هذه الميزة لحسابات الأنشطة التجارية فقط.','This feature is for business accounts only.'],bze_ads_off:['الإعلانات متوقفة حاليًا.','Ads are currently disabled.'],
 bze_bad_title:['اكتب عنوانًا من 3 إلى 80 حرفًا.','Enter a title of 3 to 80 characters.'],bze_bad_text:['النص أطول من المسموح.','The text is too long.'],bze_bad_url:['اكتب رابطًا صحيحًا يبدأ بـ https://','Enter a valid link starting with https://'],
 bze_credits_min:['الحد الأدنى {0} كريدت.','The minimum is {0} credits.'],bze_bad_method:['اختر وسيلة دفع صحيحة.','Choose a valid payment method.'],bze_method_off:['وسيلة الدفع هذه غير متاحة حاليًا.','This payment method is currently unavailable.'],
 bze_pay_not_configured:['لم يضبط الأدمن أرقام الاستلام لهذه الوسيلة بعد.','The admin has not set the receiving number for this method yet.'],bze_from_required:['اكتب الرقم أو الحساب الذي حوّلت منه (4 إلى 40 حرفًا).','Enter the number/account you transferred from (4 to 40 characters).'],
 bze_bad_ref:['رقم العملية طويل جدًا.','The reference is too long.'],bze_bad_proof:['ملف الإيصال غير صالح.','Invalid receipt file.'],bze_not_found:['العنصر غير موجود.','Item not found.'],bze_bad_state:['لا يمكن تنفيذ هذا الإجراء في الحالة الحالية.','This action is not possible in the current state.'],
 bze_pending_exists:['يوجد طلب قيد المراجعة لهذا الإعلان بالفعل.','There is already a pending order for this ad.'],bze_forbidden:['غير مسموح.','Not allowed.'],bze_x:['تعذّر تنفيذ العملية. حاول مرة أخرى.','Could not complete the action. Please try again.'],
 /* إشعارات */
 nt_bz_new:['طلب إعلان بانتظار المراجعة من {0}','{0} submitted an ad order for review'],nt_bz_refund:['طلب إعلان أُلغي ويحتاج رد مبلغ','A cancelled ad order needs a refund'],
 nt_bz_ok:['تمت الموافقة على إعلانك وهو يعمل الآن','Your ad was approved and is now live'],nt_bz_no:['لم تتم الموافقة على طلب إعلانك. راجع ملاحظة الإدارة','Your ad order was not approved. See the admin note'],
 nt_bz_refunded:['تم تحويل المبلغ المسترد لك','Your refund has been sent'],nt_bz_done:['انتهى كريدت إعلانك فتوقف. اشحن كريدت لاستئنافه','Your ad ran out of credits and stopped. Add credits to resume']
});
['bz_new','bz_refund','bz_ok','bz_no','bz_refunded','bz_done'].forEach(k=>{NT_ICON[k]=['bz_refund','bz_refunded'].includes(k)?'cash':'megaphone';NT_COL[k]=['bz_no'].includes(k)?'var(--danger)':'var(--pink)'});
function bzNOpen(n){
  if(isAdmin()){ui.adminTab='ads';ui.adsTab='orders';ui.bzf=n.type==='bz_refund'?'refund':'need';return 'admin'}
  return 'myads';
}

/* ---------- إعدادات وحالة ---------- */
const bzCfg=()=>{const c=S.site.bizads||{};const n=(v,d,mn)=>{v=+v;return Number.isFinite(v)&&v>=mn?Math.round(v):d};
  return {creditPrice:n(c.creditPrice,10,1),minCredits:n(c.minCredits,50,1),viewsPerCredit:n(c.viewsPerCredit,100,1),methods:Object.assign({vodafone:true,instapay:true},c.methods||{})}};
const bzEnsure=()=>{if(!S.bz||!Array.isArray(S.bz.orders))S.bz={orders:[]};return S.bz};
const bzOrders=()=>bzEnsure().orders;
const bzMyAds=()=>S.ads.filter(a=>a.owner&&a.owner===S.me);
const bzOrdersOf=id=>bzOrders().filter(o=>o.ad===id).sort((a,b)=>b.ts-a.ts);
const bzIsLive=a=>a.active&&(!a.status||a.status==='live');
const bzPending=()=>bzOrders().filter(o=>o.status==='pending').length+bzOrders().filter(o=>o.rf==='due').length;
const bzErr=e=>{const m=String((e&&e.message)||e||'x').replace(/^.*?:\s*/,'').trim();return D['bze_'+m]?t('bze_'+m,bzCfg().minCredits):(D['cse_'+m]?t('cse_'+m):t('bze_x'))};
const bzThrow=c=>{throw new Error(c)};
const bzDate=ts=>new Date(ts).toLocaleDateString(lang==='ar'?'ar-EG':'en-GB',{day:'numeric',month:'short',year:'numeric'});
const bzPay=pm=>{const p=csPayCfg();return pm==='vodafone'?{no:p.vodafone.number,name:p.vodafone.name}:{no:p.instapay.handle,name:p.instapay.name}};

/* ---------- التنفيذ التجريبي (يطابق قواعد الخادم) ---------- */
function bzHitLocal(a){
  if(a.owner&&a.owner===S.me)return;
  a.views=(a.views||0)+1;
  if(a.owner&&a.cap>0&&a.views>=a.cap&&a.status==='live'){a.status='finished';a.active=false;if(!Array.isArray(S.notifs))S.notifs=[];S.notifs.push({id:uid(),to:a.owner,from:a.owner,type:'bz_done',ref:a.id,ts:Date.now(),read:false})}
}
const BZD={
  chkOrder(credits,pm,from,ref){
    const c=bzCfg();
    if(!Number.isFinite(credits)||credits<c.minCredits||credits>100000)bzThrow('credits_min');
    if(!['vodafone','instapay'].includes(pm))bzThrow('bad_method');
    if(!c.methods[pm])bzThrow('method_off');
    if(!bzPay(pm).no)bzThrow('pay_not_configured');
    from=String(from||'').trim();if(from.length<4||from.length>40)bzThrow('from_required');
    if(String(ref||'').length>60)bzThrow('bad_ref');
    return c;
  },
  mkOrder(adId,kind,credits,pm,from,ref,proof){
    const c=bzCfg(),o={id:uid(),ad:adId,uid:S.me,kind,credits,unit:c.creditPrice,amount:credits*c.creditPrice,views:credits*c.viewsPerCredit,pm,from:String(from).trim(),ref:ref||'',proof:proof||'',status:'pending',note:'',rf:'none',rfref:'',ts:Date.now(),rts:null};
    bzEnsure().orders.push(o);notifyAdmins('bz_new',o.id);return o.id;
  },
  submit(f){
    if(!isBiz(me()))bzThrow('business_only');
    if(!S.site.toggles.ads)bzThrow('ads_off');
    const title=String(f.title||'').trim();if(title.length<3||title.length>80)bzThrow('bad_title');
    if(String(f.body||'').length>300||String(f.cta||'').length>30)bzThrow('bad_text');
    if(!/^https?:\/\/\S{3,250}$/i.test(f.url||''))bzThrow('bad_url');
    this.chkOrder(f.credits,f.pm,f.from,f.ref);
    const a={id:uid(),title,body:String(f.body||'').trim(),cta:String(f.cta||'').trim(),advertiser:me().name,url:f.url,tone:Math.min(2,Math.max(0,+f.tone||0)),active:false,owner:S.me,status:'pending',cap:0,ts:Date.now(),views:0,clicks:0};
    S.ads.push(a);return this.mkOrder(a.id,'new',f.credits,f.pm,f.from,f.ref,f.proof);
  },
  topup(adId,f){
    const a=S.ads.find(x=>x.id===adId&&x.owner===S.me);if(!a)bzThrow('not_found');
    if(!['live','paused','finished'].includes(a.status))bzThrow('bad_state');
    if(bzOrdersOf(adId).some(o=>o.status==='pending'))bzThrow('pending_exists');
    this.chkOrder(f.credits,f.pm,f.from,f.ref);
    return this.mkOrder(adId,'topup',f.credits,f.pm,f.from,f.ref,f.proof);
  },
  cancel(id){
    const o=bzOrders().find(x=>x.id===id&&x.uid===S.me);if(!o)bzThrow('not_found');if(o.status!=='pending')bzThrow('bad_state');
    o.status='cancelled';o.rf='due';o.rts=Date.now();
    if(o.kind==='new'){const a=S.ads.find(x=>x.id===o.ad);if(a){a.status='rejected';a.active=false}}
    notifyAdmins('bz_refund',o.id);
  },
  review(id,dec,note){
    if(!isAdmin())bzThrow('forbidden');
    const o=bzOrders().find(x=>x.id===id);if(!o)bzThrow('not_found');const a=S.ads.find(x=>x.id===o.ad);
    if(dec==='approved'){
      if(o.status!=='pending')bzThrow('bad_state');
      o.status='approved';o.note=String(note||'').slice(0,500);o.rts=Date.now();
      if(a){a.cap=(a.cap||0)+o.views;if(o.kind==='new'||a.status==='finished')a.status='live';a.active=a.status==='live'}
      notify(o.uid,'bz_ok',o.ad);
    }else if(dec==='rejected'){
      if(o.status!=='pending')bzThrow('bad_state');
      o.status='rejected';o.note=String(note||'').slice(0,500);o.rf='due';o.rts=Date.now();
      if(o.kind==='new'&&a){a.status='rejected';a.active=false}
      notify(o.uid,'bz_no',o.ad);
    }else if(dec==='refund_done'){
      if(o.rf!=='due')bzThrow('bad_state');
      o.rf='done';o.rfref=String(note||'').slice(0,60);notify(o.uid,'bz_refunded',o.ad);
    }else bzThrow('bad_decision');
  },
  toggle(adId){
    const a=S.ads.find(x=>x.id===adId&&x.owner===S.me);if(!a)bzThrow('not_found');
    if(a.status==='live'){a.status='paused';a.active=false}
    else if(a.status==='paused'&&(!a.cap||(a.views||0)<a.cap)){a.status='live';a.active=true}
    else bzThrow('bad_state');
  }
};
const BZ={
  async op(name,...a){if(REAL)return BE.bz(name,a);const r=BZD[name](...a);save();return r},
  reload:async()=>{if(REAL)await BE.bzLoad();else save()}
};

/* ---------- واجهة صاحب النشاط ---------- */
function bzPromo(){
  return `<div class="card"><h4 style="margin-bottom:6px">${ic('megaphone')} ${t('bz_promo_t')}</h4><div class="muted sm" style="margin-bottom:10px">${t('bz_promo_d')}</div><button class="btn s" data-action="nav" data-v="myads">${t('bz_promo_b')}</button></div>`;
}
function bzProgress(a){
  const cap=a.cap||0,used=a.views||0,pct=cap?Math.min(100,Math.round(used/cap*100)):0,left=cap?Math.max(0,Math.ceil((cap-used)/bzCfg().viewsPerCredit)):0;
  return cap?`<div style="height:8px;border-radius:99px;background:var(--surface2);overflow:hidden;margin:8px 0 4px"><div style="height:100%;width:${pct}%;background:var(--cyan)"></div></div><div class="muted sm">${t('bz_left',left)} · ${used}/${cap}</div>`:'';
}
function bzAdCard(a){
  const os=bzOrdersOf(a.id),last=os[0],pend=os.find(o=>o.status==='pending'),bought=os.filter(o=>o.status==='approved').reduce((s,o)=>s+o.credits,0);
  const st=a.status||'live',cls={live:'ok',pending:'yl',paused:'gr',finished:'gr',rejected:'pk'}[st]||'gr';
  const rfo=os.find(o=>o.rf==='due'||o.rf==='done');
  const acts=[];
  if(st==='live'||st==='paused')acts.push(`<button class="btn line s" data-action="bztoggle" data-id="${a.id}">${t(st==='live'?'bz_pause':'bz_resume')}</button>`);
  if(['live','paused','finished'].includes(st)&&!pend)acts.push(`<button class="btn s" data-action="bztopup" data-id="${a.id}">${ic('coin')} ${t('bz_topup')}</button>`);
  if(pend)acts.push(`<button class="btn line s" data-action="bzcancel" data-id="${pend.id}">${t('bz_cancel_o')}</button>`);
  return `<div class="card" data-bzad="${a.id}"><div class="item" style="align-items:flex-start"><div class="grow" style="min-width:0"><b>${esc(L(a.title))}</b><div class="muted sm" style="overflow-wrap:anywhere">${esc(a.url)}</div></div><span class="pill ${cls}">${t('bz_st_'+st)}</span></div>
<div class="item muted sm" style="gap:14px;flex-wrap:wrap;margin-top:6px"><span>${t('bz_views')}: <b>${a.views||0}</b></span><span>${t('bz_clicks')}: <b>${a.clicks||0}</b></span><span>${t('bz_bought')}: <b>${bought}</b></span><span>${t('col_ctr')}: <b>${ctr(a)}%</b></span></div>
${bzProgress(a)}
${last?`<div class="hint" style="margin-top:8px">${t('bz_order_line',last.credits,money(last.amount),t('bz_os_'+last.status))}${last.note?`<div style="margin-top:4px"><b>${t('bz_admin_note')}:</b> ${esc(last.note)}</div>`:''}${rfo?`<div style="margin-top:4px">${t('bz_rf_'+rfo.rf)}</div>`:''}</div>`:''}
${acts.length?`<div class="item" style="margin-top:10px;gap:8px;flex-wrap:wrap">${acts.join('')}</div>`:''}</div>`;
}
function bzView(){
  const c=bzCfg(),mine=bzMyAds().sort((a,b)=>(b.ts||0)-(a.ts||0)),on=!!S.site.toggles.ads;
  return `<h2>${ic('megaphone')} ${t('bz_title')}</h2><p class="muted" style="margin:4px 0 12px">${t('bz_sub')}</p>
<div class="card"><div class="muted sm" style="margin-bottom:10px">${t('bz_price_line',money(c.creditPrice),c.minCredits,money(c.minCredits*c.creditPrice),c.viewsPerCredit)}</div>${on?`<button class="btn" data-action="bznew">${ic('plus')} ${t('bz_new')}</button>`:`<div class="muted">${t('bz_off')}</div>`}</div>
<div class="list" style="margin-top:12px">${mine.map(bzAdCard).join('')||`<div class="card empty">${t('bz_none')}</div>`}</div>`;
}

/* نموذج الدفع المشترك بين إعلان جديد وشحن كريدت */
function bzPayFields(){
  const c=bzCfg(),ms=['vodafone','instapay'].filter(x=>c.methods[x]),pm=ms.includes(ui.bz.pm)?ui.bz.pm:ms[0];ui.bz.pm=pm;
  const block=m=>{const d=bzPay(m);return `<div class="card" id="bz_pm_${m}" style="margin:8px 0" ${m===pm?'':'hidden'}><div class="muted sm">${t('bz_pay_to')} ${t(m==='vodafone'?'cs_vf':'cs_ip')}</div>${d.no?`<div dir="ltr" style="font-size:22px;font-weight:800;margin:4px 0;user-select:all">${esc(d.no)}</div>${d.name?`<div class="muted sm">${t('cs_acc_name')}: ${esc(d.name)}</div>`:''}`:`<div class="muted">${t('bz_pay_not_set')}</div>`}</div>`};
  return `<div class="field"><label for="bz_credits">${t('bz_f_credits')}</label><input id="bz_credits" class="in" type="number" inputmode="numeric" min="${c.minCredits}" step="1" value="${c.minCredits}" data-in="bzcr"></div>
<div class="card" style="margin:6px 0;text-align:center"><div class="muted sm">${t('bz_total')}</div><div id="bz_tot" style="font-size:26px;font-weight:800">${money(c.minCredits*c.creditPrice)}</div><div id="bz_est" class="muted sm">${t('bz_views_est',c.minCredits*c.viewsPerCredit)}</div></div>
<div class="field"><label>${t('bz_method')}</label><div style="display:flex;gap:8px">${ms.map(x=>`<button type="button" class="pill ${pm===x?'':'gr'}" style="border:0;cursor:pointer" data-action="bzpm" data-m="${x}">${t(x==='vodafone'?'cs_vf':'cs_ip')}</button>`).join('')}</div></div>
${ms.map(block).join('')}
<div class="muted sm" style="margin-bottom:8px">${t('bz_pay_note')}</div>
<div class="field"><label for="bz_from">${t('bz_f_from')}</label><input id="bz_from" class="in" dir="ltr" maxlength="40" placeholder="${esc(t('bz_f_from_ph'))}"></div>
<div class="field"><label for="bz_ref">${t('bz_f_ref')}</label><input id="bz_ref" class="in" dir="ltr" maxlength="60"></div>
<div class="field"><label for="bzProofIn">${t('bz_f_proof')}</label><input id="bzProofIn" type="file" accept="image/jpeg,image/png,image/webp"><div id="bzProofOk" class="muted sm"></div></div>`;
}
function bzNewModal(){
  ui.bz={pm:null,blob:null};
  openModal(`<h3>${ic('megaphone')} ${t('bz_new_t')}</h3>
<div class="field"><label for="bz_title">${t('bz_f_title')}</label><input id="bz_title" class="in" maxlength="80"></div>
<div class="field"><label for="bz_body">${t('bz_f_body')}</label><textarea id="bz_body" class="ta" maxlength="300" style="min-height:60px"></textarea></div>
<div class="row"><div class="field"><label for="bz_cta">${t('bz_f_cta')}</label><input id="bz_cta" class="in" maxlength="30" value="${esc(lang==='ar'?'اعرف المزيد':'Learn more')}"></div>
<div class="field"><label for="bz_tone">${t('bz_f_tone')}</label><select id="bz_tone" class="sel">${['ad_blue','ad_pink','ad_orange'].map((n,i)=>`<option value="${i}">${t(n)}</option>`).join('')}</select></div></div>
<div class="field"><label for="bz_url">${t('bz_f_url')}</label><input id="bz_url" class="in" dir="ltr" value="https://"></div>
${bzPayFields()}<div id="aerr" class="err" role="alert"></div>
<div class="mfoot"><button class="btn" data-action="bzsubmit" data-id="">${t('bz_submit')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
function bzTopupModal(id){
  const a=S.ads.find(x=>x.id===id);if(!a)return;ui.bz={pm:null,blob:null};
  openModal(`<h3>${ic('coin')} ${t('bz_topup_t')}</h3><div class="muted sm" style="margin-bottom:8px">${esc(L(a.title))}</div>${bzPayFields()}<div id="aerr" class="err" role="alert"></div>
<div class="mfoot"><button class="btn" data-action="bzsubmit" data-id="${id}">${t('bz_submit')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`);
}
async function bzSubmit(el){
  const id=el.dataset.id,c=bzCfg(),credits=Math.round(+val('bz_credits'));
  if(!id){
    if(val('bz_title').length<3){aerr(t('bze_bad_title'));return}
    if(!/^https?:\/\/\S{3,250}$/i.test(val('bz_url'))){aerr(t('bze_bad_url'));return}
  }
  if(!(credits>=c.minCredits)){aerr(t('bze_credits_min',c.minCredits));return}
  if(val('bz_from').length<4){aerr(t('bze_from_required'));return}
  if(el.disabled)return;el.disabled=true;
  try{
    let proof='';if(ui.bz&&ui.bz.blob)proof=await CS.upload(ui.bz.blob,'bzpay');
    const f={credits,pm:ui.bz.pm,from:val('bz_from'),ref:val('bz_ref'),proof};
    if(id)await BZ.op('topup',id,f);
    else await BZ.op('submit',Object.assign(f,{title:val('bz_title'),body:val('bz_body'),cta:val('bz_cta'),url:val('bz_url'),tone:+val('bz_tone')}));
    await BZ.reload();closeModal();render();toast(t(id?'bz_topup_sent':'bz_sent'));
  }catch(e){console.warn(e);aerr(bzErr(e));el.disabled=false}
}

/* ---------- لوحة الأدمن: إعلانات الأنشطة ---------- */
function bzAdminTabs(){
  const tab=ui.adsTab||'ads',n=bzPending();
  const T=[['ads','bz_a_ads',''],['orders','bz_a_orders',n?' ('+n+')':''],['set','bz_a_set','']];
  return `<div class="subtabs" style="margin-bottom:10px">${T.map(x=>`<button class="${tab===x[0]?'on':''}" data-action="bzatab" data-id="${x[0]}">${t(x[1])}${x[2]}</button>`).join('')}</div>`;
}
function bzAdminView(){
  const tab=ui.adsTab||'ads';
  return bzAdminTabs()+(tab==='orders'?bzAdminOrders():tab==='set'?bzAdminSet():adAds());
}
function bzOrderCard(o){
  const a=S.ads.find(x=>x.id===o.ad)||{title:'—',body:'',cta:'',url:'',tone:0},u=U(o.uid);
  const cls={pending:'yl',approved:'ok',rejected:'pk',cancelled:'gr'}[o.status]||'gr';
  const btn=(act,l,x='')=>`<button class="btn ${x||'line'} s" data-action="${act}" data-id="${o.id}">${t(l)}</button>`;
  return `<div class="card" data-bzo="${o.id}"><div class="item" style="align-items:flex-start"><div class="grow" style="min-width:0"><b>${esc(L(a.title))}</b><div class="muted sm">${t('bz_a_owner')}: ${u?nm(u):'—'} · ${esc(bzDate(o.ts))}</div></div><span class="pill ${cls}">${t('bz_os_'+o.status)}</span></div>
<div class="tbanner" style="background:${TONES[(a.tone||0)%3]};color:#fff;border-radius:10px;padding:10px 12px;margin:8px 0"><b>${esc(L(a.title))}</b>${a.body?`<div class="sm">${esc(L(a.body))}</div>`:''}<div class="sm" dir="ltr" style="overflow-wrap:anywhere">${esc(L(a.cta))} → ${esc(a.url)}</div></div>
<div class="item sm" style="gap:6px 16px;flex-wrap:wrap"><span><span class="pill">${t('bz_a_kind_'+o.kind)}</span></span><span><b>${o.credits}</b> ${t('bz_bought')} × ${money(o.unit)} = <b>${money(o.amount)}</b></span><span>${t('bz_views_est',o.views)}</span><span>${t(o.pm==='vodafone'?'cs_vf':'cs_ip')}</span></div>
<div class="item sm" style="gap:6px 16px;flex-wrap:wrap;margin-top:4px"><span>${t('bz_a_from')}: <b dir="ltr" style="user-select:all">${esc(o.from)}</b></span>${o.ref?`<span>${t('bz_a_ref')}: <b dir="ltr" style="user-select:all">${esc(o.ref)}</b></span>`:''}${o.proof?`<button class="btn line s" data-action="bzproof" data-id="${o.id}">${t('bz_a_proof')}</button>`:''}</div>
${o.note?`<div class="hint" style="margin-top:6px"><b>${t('bz_admin_note')}:</b> ${esc(o.note)}</div>`:''}
${o.rf!=='none'?`<div class="hint" style="margin-top:6px">${t('bz_rf_'+o.rf)}${o.rfref?' · '+esc(o.rfref):''}</div>`:''}
<div class="item" style="margin-top:10px;gap:8px;flex-wrap:wrap">${o.status==='pending'?btn('bzapprove','bz_a_approve','')+btn('bzreject','bz_a_reject'):''}${o.rf==='due'?btn('bzrefund','bz_a_refund_done'):''}</div></div>`;
}
function bzAdminOrders(){
  const f=ui.bzf||'need',all=bzOrders().slice().sort((a,b)=>b.ts-a.ts);
  const list=f==='all'?all:f==='refund'?all.filter(o=>o.rf==='due'):all.filter(o=>o.status==='pending');
  const ap=all.filter(o=>o.status==='approved');
  const sold=ap.reduce((s,o)=>s+o.credits,0),rev=ap.reduce((s,o)=>s+o.amount,0),pend=all.filter(o=>o.status==='pending').reduce((s,o)=>s+o.amount,0),rfd=all.filter(o=>o.rf==='due').reduce((s,o)=>s+o.amount,0);
  const F=[['need','bz_a_f_need'],['refund','bz_a_f_refund'],['all','bz_a_f_all']];
  return `<div class="card muted sm" style="margin-bottom:10px">${t('bz_a_sum',sold,money(rev),money(pend),money(rfd))}</div>
<div class="subtabs" style="margin-bottom:10px">${F.map(x=>`<button class="${f===x[0]?'on':''}" data-action="bzaf" data-id="${x[0]}">${t(x[1])}</button>`).join('')}</div>
<div class="list">${list.map(bzOrderCard).join('')||`<div class="card empty">${t('bz_a_none')}</div>`}</div>`;
}
function bzAdminSet(){
  const c=bzCfg();
  return `<div class="card"><div class="muted sm" style="margin-bottom:10px">${t('bz_s_note')}</div>
<div class="row"><div class="field"><label for="bs_price">${t('bz_s_price')}</label><input id="bs_price" class="in" type="number" min="1" step="1" value="${c.creditPrice}"></div>
<div class="field"><label for="bs_min">${t('bz_s_min')}</label><input id="bs_min" class="in" type="number" min="1" step="1" value="${c.minCredits}"></div></div>
<div class="field"><label for="bs_vpc">${t('bz_s_vpc')}</label><input id="bs_vpc" class="in" type="number" min="1" step="1" value="${c.viewsPerCredit}"></div>
<div class="field"><label>${t('bz_s_methods')}</label><div style="display:flex;gap:16px;flex-wrap:wrap"><label class="chk"><input type="checkbox" id="bs_m_vodafone" ${c.methods.vodafone?'checked':''}> ${t('cs_vf')}</label><label class="chk"><input type="checkbox" id="bs_m_instapay" ${c.methods.instapay?'checked':''}> ${t('cs_ip')}</label></div></div>
<div class="hint" style="margin-bottom:10px">${t('bz_s_numbers')} <button class="btn line s" data-action="bzgonum">${t('bz_s_go')}</button></div>
<div class="mfoot" style="justify-content:flex-start"><button class="btn" data-action="bzsaveset">${t('save')}</button></div></div>`;
}

/* ---------- الأفعال ---------- */
const bzBusy=async(el,fn)=>{if(el&&el.disabled)return;if(el)el.disabled=true;try{await fn()}catch(e){console.warn(e);toast(bzErr(e));try{aerr(bzErr(e))}catch(_){}}finally{if(el)el.disabled=false}};
const BA={
  bznew(){bzNewModal()},
  bztopup(el){bzTopupModal(el.dataset.id)},
  bzpm(el){const m=el.dataset.m;ui.bz.pm=m;['vodafone','instapay'].forEach(x=>{const b=$('#bz_pm_'+x);if(b)b.hidden=x!==m});$$('[data-action="bzpm"]').forEach(b=>b.classList.toggle('gr',b.dataset.m!==m))},
  bzsubmit(el){bzSubmit(el)},
  bztoggle(el){bzBusy(el,async()=>{await BZ.op('toggle',el.dataset.id);await BZ.reload();render()})},
  bzcancel(el){if(!confirmOnce(el,t('bz_cancel_q')))return;bzBusy(el,async()=>{await BZ.op('cancel',el.dataset.id);await BZ.reload();render()})},
  bzatab(el){ui.adsTab=el.dataset.id;render()},
  bzaf(el){ui.bzf=el.dataset.id;render()},
  bzapprove(el){bzBusy(el,async()=>{await BZ.op('review',el.dataset.id,'approved','');await BZ.reload();render()})},
  bzreject(el){openModal(`<h3>${t('bz_a_reject')}</h3><div class="field"><label for="bz_n">${t('bz_a_reject_p')}</label><input id="bz_n" class="in" maxlength="300"></div><div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn danger" data-action="bzrejgo" data-id="${el.dataset.id}">${t('bz_a_reject')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`)},
  bzrejgo(el){bzBusy(el,async()=>{await BZ.op('review',el.dataset.id,'rejected',val('bz_n'));await BZ.reload();closeModal();render()})},
  bzrefund(el){openModal(`<h3>${t('bz_a_refund_done')}</h3><div class="field"><label for="bz_n">${t('bz_a_ref_p')}</label><input id="bz_n" class="in" dir="ltr" maxlength="60"></div><div id="aerr" class="err" role="alert"></div><div class="mfoot"><button class="btn" data-action="bzrefgo" data-id="${el.dataset.id}">${t('save')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`)},
  bzrefgo(el){bzBusy(el,async()=>{await BZ.op('review',el.dataset.id,'refund_done',val('bz_n'));await BZ.reload();closeModal();render()})},
  bzproof(el){const o=bzOrders().find(x=>x.id===el.dataset.id);if(!o||!o.proof)return;CS.file(o.proof).then(u=>openModal(`<h3>${t('bz_a_proof')}</h3><img src="${esc(u)}" alt="" style="width:100%;border-radius:10px"><div class="mfoot"><button class="btn line" data-action="closem">${t('close')}</button></div>`)).catch(()=>toast(t('bze_x')))},
  bzgonum(){ui.adminTab='cons';ui.ac.tab='set';render()},
  bzsaveset(){
    const n=(id,mn)=>{const v=Math.round(+val(id));return Number.isFinite(v)&&v>=mn?v:null};
    const price=n('bs_price',1),min=n('bs_min',1),vpc=n('bs_vpc',1);
    if(price===null||min===null||vpc===null){toast(t('bze_x'));return}
    S.site.bizads={creditPrice:price,minCredits:min,viewsPerCredit:vpc,methods:{vodafone:$('#bs_m_vodafone').checked,instapay:$('#bs_m_instapay').checked}};
    save();render();toast(t('bz_s_saved'));
  }
};
/* إظهار/إخفاء التخصص الطبي حسب الصفة: العضو بلا تخصص */
document.addEventListener('change',e=>{const el=e.target;if(!el||!el.id)return;
  if(el.id==='a_role'||el.id==='p_role'){const f=$(el.id==='a_role'?'#a_specf':'#p_specf');if(f)f.hidden=(el.value==='member'||el.value==='business')}});
document.addEventListener('input',e=>{
  const el=e.target;if(!el||!el.dataset||el.dataset.in!=='bzcr')return;
  const c=bzCfg(),n=Math.max(0,Math.round(+el.value)||0),tot=$('#bz_tot'),es=$('#bz_est');
  if(tot)tot.textContent=money(n*c.creditPrice);if(es)es.textContent=t('bz_views_est',n*c.viewsPerCredit);
});
document.addEventListener('change',async e=>{
  const el=e.target;if(!el||!el.matches||!el.matches('#bzProofIn'))return;
  try{const f=el.files&&el.files[0];if(!f)return;const b=await compressImg(f,REAL?1400:900,REAL?.8:.6);ui.bz.blob=b;const o=$('#bzProofOk');if(o)o.textContent=t('bz_proof_ok')}catch(err){toast(imgErr(err))}
});
/* ===== MedRo backend layer (Supabase) — يعمل فقط لو config.js فيه المفاتيح، وإلا يبقى الوضع التجريبي المحلي ===== */
Object.assign(D,{
 sync_err:['تعذّر حفظ آخر تغيير. تم تحديث البيانات من الخادم.','Could not save your last change. Data was refreshed from the server.'],
 e_confirm:['أكّد بريدك الإلكتروني من الرسالة التي وصلتك ثم سجّل الدخول.','Please confirm your email from the message we sent, then log in.'],
 su_confirm:['تم إنشاء الحساب. افتح بريدك واضغط رابط التأكيد ثم سجّل الدخول.','Account created. Open your email, tap the confirmation link, then log in.'],
 e_net:['تعذّر الاتصال بالخادم. تحقق من الإنترنت وحاول مرة أخرى.','Could not reach the server. Check your connection and try again.'],
 e_noprof:['هذا الحساب ليس له ملف شخصي. تواصل مع الإدارة.','This account has no profile. Contact the admin.'],
 e_fn:['تعذّر تنفيذ العملية على الخادم.','The server could not complete that action.']
});
const beSleep=ms=>new Promise(r=>setTimeout(r,ms));
(function(){
if(!REAL)return;
const cfg=window.MEDRO_CONFIG;
const sb=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
const jf=(x,d)=>x==null?d:x;
const HIST=()=>({blood:'',dob:'',gender:'',height:'',weight:'',allergies:'',chronic:'',meds:'',emergency:'',history:[]});
const adm=()=>isAdmin();

/* ---------- تعريف الجداول: كيف تتحول حالة التطبيق S إلى صفوف ---------- */
const TB=[
 {t:'profiles',pk:['id'],noInsert:true,noDelete:true,rows:()=>S.users.map(u=>({id:u.id,name:u.name,role:u.role||'user',title:u.title||'other',spec:u.spec||'general',place:jf(u.place,''),city:jf(u.city,''),bio:jf(u.bio,''),banned:!!u.banned,verified:!!u.verified,avatar:u.avatar||null}))},
 {t:'verification_requests',pk:['user_id'],rows:()=>S.users.filter(u=>u.vreq).map(u=>({user_id:u.id,data:u.vreq}))},
 {t:'medical_records',pk:['user_id'],noDelete:true,rows:()=>S.users.filter(u=>u.id===owner&&u.record).map(u=>({user_id:u.id,data:u.record}))},
 {t:'groups',pk:['id'],rows:()=>S.groups.map(g=>({id:g.id,kind:g.kind||null,verified:!!g.verified,name:g.name,descr:jf(g.desc,''),cat:g.cat||null,owner:g.owner||null,mod_uid:g.mod||null,ts:g.ts||0}))},
 {t:'group_members',pk:['group_id','user_id'],rows:()=>S.groups.flatMap(g=>(g.members||[]).map(u=>({group_id:g.id,user_id:u})))},
 {t:'group_requests',pk:['group_id','user_id'],rows:()=>S.groups.flatMap(g=>(g.pending||[]).map(u=>({group_id:g.id,user_id:u})))},
 {t:'posts',pk:['id'],rows:()=>S.posts.slice().sort((a,b)=>a.ts-b.ts).map(p=>({id:p.id,uid:p.uid,tag:p.tag||'disc',text:p.text,ts:p.ts,group_id:p.groupId||null,shared:p.shared||null,images:Array.isArray(p.images)?p.images:[]}))},
 {t:'post_likes',pk:['post_id','user_id'],rows:()=>S.posts.flatMap(p=>(p.likes||[]).map(u=>({post_id:p.id,user_id:u})))},
 {t:'saved_posts',pk:['user_id','post_id'],rows:()=>S.users.filter(u=>u.id===owner).flatMap(u=>(u.saved||[]).map(p=>({user_id:u.id,post_id:p})))},
 {t:'comments',pk:['id'],rows:()=>S.posts.flatMap(p=>(p.comments||[]).map(c=>({id:c.id,post_id:p.id,uid:c.uid,text:c.text,ts:c.ts})))},
 {t:'jobs',pk:['id'],rows:()=>S.jobs.map(j=>({id:j.id,title:j.title,org:j.org,city:jf(j.city,''),spec:j.spec||null,type:j.type||null,descr:jf(j.desc,''),ts:j.ts||0,by_uid:j.by||null}))},
 {t:'job_applicants',pk:['job_id','user_id'],rows:()=>S.jobs.flatMap(j=>(j.applicants||[]).map(u=>({job_id:j.id,user_id:u})))},
 {t:'job_saved',pk:['job_id','user_id'],rows:()=>S.jobs.flatMap(j=>(j.saved||[]).map(u=>({job_id:j.id,user_id:u})))},
 {t:'ads',pk:['id'],rows:()=>S.ads.map(a=>({id:a.id,title:a.title,body:jf(a.body,''),cta:jf(a.cta,''),advertiser:jf(a.advertiser,''),url:a.url||'',tone:a.tone||0,active:!!a.active,status:a.status||'live',ts:a.ts||0}))},
 {t:'reports',pk:['id'],noUpdate:()=>!adm(),noDelete:()=>!adm(),rows:()=>S.reports.map(r=>({id:r.id,post_id:r.postId,by_uid:String(r.by),reason:r.reason||null,note:r.note||null,ts:r.ts||0,status:r.status||'open',source:r.source||'user'}))},
 {t:'friendships',pk:['a','b'],rows:()=>S.friends.map(f=>({a:f.a,b:f.b,status:f.status,ts:f.ts||0}))},
 {t:'user_blocks',pk:['blocker','blocked'],noUpdate:()=>true,rows:()=>(S.blocks||[]).filter(b=>b.by===owner).map(b=>({blocker:b.by,blocked:b.id,ts:b.ts||0}))},
 {t:'notifications',pk:['id'],rows:()=>S.notifs.map(n=>({id:n.id,to_uid:n.to,from_uid:n.from,type:n.type,ref:n.ref||'',ts:n.ts,read:!!n.read}))},
 {t:'site_settings',pk:['key'],noDelete:true,noInsert:false,noUpdate:()=>!adm(),rows:()=>[{key:'site',value:{texts:S.site.texts,banner:S.site.banner,toggles:S.site.toggles,tips:S.site.tips||null}},{key:'settings',value:S.settings}].concat(S.site.consult?[{key:'consult',value:S.site.consult}]:[]).concat(S.site.consult_pay?[{key:'consult_pay',value:S.site.consult_pay}]:[]).concat(S.site.bizads?[{key:'bizads',value:S.site.bizads}]:[])}
];
const key=(tb,r)=>tb.pk.map(k=>r[k]).join('|');
let last={},pushing=false,dirty=false,timer=null,owner=null;

function markTable(t){const tb=TB.find(x=>x.t===t);if(!tb)return;const m=new Map();tb.rows().forEach(r=>m.set(key(tb,r),snapRow(r)));last[t]=m}
function mark(){last={};TB.forEach(tb=>{const m=new Map();tb.rows().forEach(r=>m.set(key(tb,r),snapRow(r)));last[tb.t]=m})}
const snapRow=(r,j)=>{j=j||JSON.stringify(r);return {j,r:JSON.parse(j)}};
const fail=r=>{if(r&&r.error)throw r.error;return r};

async function flushOnce(){
  for(const tb of TB){
    const cur=new Map();tb.rows().forEach(r=>cur.set(key(tb,r),r));
    const prev=last[tb.t]||(last[tb.t]=new Map());
    const ins=[],upd=[],del=[];
    cur.forEach((r,k)=>{const j=JSON.stringify(r),p=prev.get(k);if(!p)ins.push([k,r,j]);else if(p.j!==j)upd.push([k,r,j])});
    prev.forEach((p,k)=>{if(!cur.has(k))del.push([k,p.r])});
    if(ins.length){
      if(!tb.noInsert)fail(await sb.from(tb.t).insert(ins.map(x=>x[1])));
      ins.forEach(x=>prev.set(x[0],snapRow(x[1],x[2])));
    }
    const canU=!(tb.noUpdate&&tb.noUpdate());
    for(const [k,r,j] of upd){
      if(canU){const old=(prev.get(k)||{}).r||{},set={};Object.keys(r).forEach(c=>{if(!tb.pk.includes(c)&&JSON.stringify(r[c])!==JSON.stringify(old[c]))set[c]=r[c]});
        if(Object.keys(set).length){let q=sb.from(tb.t).update(set);tb.pk.forEach(c=>{q=q.eq(c,r[c])});fail(await q)}}
      prev.set(k,snapRow(r,j));
    }
    const dOK=typeof tb.noDelete==='function'?!tb.noDelete():!tb.noDelete;
    if(del.length){
      if(dOK){
        if(tb.pk.length===1)fail(await sb.from(tb.t).delete().in(tb.pk[0],del.map(x=>x[1][tb.pk[0]])));
        else for(const [k,r] of del){let q=sb.from(tb.t).delete();tb.pk.forEach(c=>{q=q.eq(c,r[c])});fail(await q)}
      }
      del.forEach(x=>prev.delete(x[0]));
    }
  }
}
async function flush(){
  if(!owner)return;
  if(pushing){dirty=true;return}
  pushing=true;
  try{do{dirty=false;await flushOnce()}while(dirty)}
  catch(e){console.error('MedRo sync error',e);dirty=false;try{toast(t('sync_err'))}catch(_){}try{await loadAll(S.me);render()}catch(_){}}
  finally{pushing=false}
}
function push(){clearTimeout(timer);timer=setTimeout(flush,250)}
async function drain(){clearTimeout(timer);await flush();while(pushing||dirty)await beSleep(15)}

/* ---------- التحميل ---------- */
const ld=(t,f)=>{let q=sb.from(t).select('*');if(f)q=f(q);return Promise.resolve(q).then(r=>{if(r.error)throw r.error;return r.data||[]})};
function applySite(rows){
  const m={};rows.forEach(r=>m[r.key]=r.value||{});
  const v=m.site||{};
  S.site={texts:v.texts||{},banner:Object.assign({on:false,ar:'',en:'',tone:'info'},v.banner||{}),toggles:Object.assign({ai:true,jobs:true,ads:true,signup:true,userGroups:true,consult:false},v.toggles||{})};
  if(m.consult&&typeof m.consult==='object')S.site.consult=m.consult;if(m.consult_pay&&typeof m.consult_pay==='object')S.site.consult_pay=m.consult_pay;if(m.bizads&&typeof m.bizads==='object')S.site.bizads=m.bizads;
  if(Array.isArray(v.tips)&&v.tips.length)S.site.tips=v.tips;
  OV=S.site.texts;
  S.settings=Object.assign({autoRemove:false},m.settings||{});
}
async function loadSite(){
  try{applySite(await ld('site_settings'))}catch(e){console.warn('site',e)}
  try{const r=await sb.rpc('public_stats');if(r&&r.data&&typeof r.data.members==='number')S.stats={members:r.data.members}}catch(e){}
}
async function loadAll(uid){
  owner=uid;
  const posts=await ld('posts',q=>q.order('ts',{ascending:false}).limit(300));
  const ids=posts.map(p=>p.id),chunks=[];for(let i=0;i<ids.length;i+=100)chunks.push(ids.slice(i,i+100));
  const [pr,pp,vr,mr,gr,gm,rq,jb,ja,js,ad,rp,fr,nt,ss,sv,lk,cm,bk]=await Promise.all([
    ld('profiles'),ld('profiles_private'),ld('verification_requests'),ld('medical_records'),ld('groups'),ld('group_members'),ld('group_requests'),
    ld('jobs'),ld('job_applicants'),ld('job_saved'),ld('ads'),ld('reports',q=>q.order('ts',{ascending:false}).limit(500)),ld('friendships'),
    ld('notifications',q=>q.order('ts',{ascending:false}).limit(200)),ld('site_settings'),ld('saved_posts'),
    Promise.all(chunks.map(c=>ld('post_likes',q=>q.in('post_id',c)))).then(a=>a.flat()),
    Promise.all(chunks.map(c=>ld('comments',q=>q.in('post_id',c)))).then(a=>a.flat()),
    ld('user_blocks').catch(()=>[])]);
  const by=(rows,k,v)=>{const o={};rows.forEach(r=>(o[r[k]]=o[r[k]]||[]).push(v?r[v]:r));return o};
  const email={};pp.forEach(r=>email[r.id]=r.email);
  const vq={};vr.forEach(r=>vq[r.user_id]=r.data);
  const rec={};mr.forEach(r=>rec[r.user_id]=Object.assign(HIST(),r.data||{}));
  const sav=by(sv,'user_id','post_id');
  S.users=pr.map(p=>({id:p.id,name:p.name,email:email[p.id]||'',role:p.role,title:p.title,spec:p.spec,place:p.place,city:p.city,bio:p.bio,banned:p.banned,verified:p.verified,avatar:p.avatar||undefined,joined:p.joined,record:rec[p.id]||HIST(),vreq:vq[p.id]||null,saved:sav[p.id]||[]}));
  const lkb=by(lk,'post_id','user_id'),cmb=by(cm,'post_id');
  const reposts={};posts.forEach(p=>{if(p.shared)reposts[p.shared]=(reposts[p.shared]||0)+1});
  S.posts=posts.map(p=>({id:p.id,uid:p.uid,tag:p.tag,text:p.text,ts:p.ts,groupId:p.group_id||undefined,shared:p.shared||undefined,images:Array.isArray(p.images)?p.images:[],likes:lkb[p.id]||[],comments:(cmb[p.id]||[]).map(c=>({id:c.id,uid:c.uid,text:c.text,ts:c.ts})).sort((a,b)=>a.ts-b.ts),shares:reposts[p.id]||0}));
  const gmb=by(gm,'group_id','user_id'),rqb=by(rq,'group_id','user_id');
  S.groups=gr.map(g=>{const o={id:g.id,verified:g.verified,name:g.name,desc:g.descr,cat:g.cat||undefined,owner:g.owner||undefined,mod:g.mod_uid||undefined,members:gmb[g.id]||[],pending:rqb[g.id]||[],ts:g.ts};if(g.kind)o.kind=g.kind;return o});
  const jab=by(ja,'job_id','user_id'),jsb=by(js,'job_id','user_id');
  S.jobs=jb.map(j=>({id:j.id,title:j.title,org:j.org,city:j.city,spec:j.spec||undefined,type:j.type||undefined,desc:j.descr,ts:j.ts,by:j.by_uid||undefined,applicants:jab[j.id]||[],saved:jsb[j.id]||[]}));
  S.ads=ad.map(mapAd);
  S.reports=rp.map(r=>({id:r.id,postId:r.post_id,by:r.by_uid,reason:r.reason||'',note:r.note||'',ts:r.ts,status:r.status,source:r.source}));
  S.friends=fr.map(f=>({a:f.a,b:f.b,status:f.status,ts:f.ts}));
  S.blocks=bk.map(b=>({by:b.blocker,id:b.blocked,ts:b.ts}));
  S.notifs=nt.map(n=>({id:n.id,to:n.to_uid,from:n.from_uid,type:n.type,ref:n.ref||'',ts:n.ts,read:n.read}));
  applySite(ss);
  await csLoad(pr);await bzLoadOrders();
  mark();
}

/* ---------- المصادقة ---------- */
function authErr(e){const m=String((e&&e.message)||e||'').toLowerCase();
  if(m.includes('invalid login')||m.includes('invalid credentials'))return t('e_login');
  if(m.includes('not confirmed'))return t('e_confirm');
  if(m.includes('already')||m.includes('registered'))return t('e_dup');
  if(m.includes('fetch')||m.includes('network'))return t('e_net');
  return String((e&&e.message)||e||t('e_net'))}
async function login(email,pw){
  const r=await sb.auth.signInWithPassword({email,password:pw});
  if(r.error)return {error:authErr(r.error)};
  const uid=r.data.user.id;
  await loadAll(uid);
  const u=U(uid);
  if(!u){await sb.auth.signOut();return {error:t('e_noprof')}}
  if(u.banned){await sb.auth.signOut();owner=null;resetData();return {error:t('e_ban')}}
  subscribe(uid);
  return {user:u};
}
async function signup(f){
  const r=await sb.auth.signUp({email:f.email,password:f.pw,options:{data:{name:f.name,title:f.title,spec:f.spec,city:f.city,place:f.place||''}}});
  if(r.error)return {error:authErr(r.error)};
  if(!r.data.session)return {confirm:true};
  const uid=r.data.user.id;
  await loadAll(uid);
  const u=U(uid);
  if(!u)return {error:t('e_noprof')};
  subscribe(uid);
  return {user:u};
}
function resetData(){S.cs=null;S.bz=null;csEnsure();S.users=[];S.posts=[];S.groups=[];S.jobs=[];S.ads=[];S.reports=[];S.friends=[];S.notifs=[];S.blocks=[];last={}}
async function logout(skipDrain){
  if(!skipDrain){try{await drain()}catch(e){}}
  unsubscribe();
  try{await sb.auth.signOut()}catch(e){}
  owner=null;resetData();
}

/* ---------- لحظي (Realtime) + تحديث دوري ---------- */
let chan=null,poll=null;
function subscribe(uid){
  unsubscribe();
  try{
    chan=sb.channel('nt-'+uid).on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications',filter:'to_uid=eq.'+uid},p=>onNotif(p.new)).subscribe();
  }catch(e){console.warn('realtime',e)}
  poll=setInterval(()=>{if(document.hidden||!S.me)return;const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))return;if(document.getElementById('modal')&&document.getElementById('modal').classList.contains('open'))return;refresh()},60000);
}
function unsubscribe(){try{if(chan)sb.removeChannel(chan)}catch(e){}chan=null;if(poll)clearInterval(poll);poll=null}
function onNotif(n){
  if(!n||!S.me||S.notifs.some(x=>x.id===n.id))return;
  const o={id:n.id,to:n.to_uid,from:n.from_uid,type:n.type,ref:n.ref||'',ts:n.ts,read:n.read};
  S.notifs.push(o);
  const tb=TB.find(x=>x.t==='notifications'),row=tb.rows().find(r=>r.id===o.id);last.notifications.set(o.id,snapRow(row));
  try{toast(ntText(o).replace(/<[^>]+>/g,''))}catch(e){}
  const ae=document.activeElement;if(!(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)))render();
}
async function refresh(){
  if(!S.me||pushing)return;
  try{await drain();await loadAll(S.me);render()}catch(e){console.warn('refresh',e)}
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&S.me)refresh()});

/* ---------- الإقلاع ---------- */
async function boot(){
  try{
    await loadSite();
    const s=await sb.auth.getSession();
    if(s&&s.data&&s.data.session){
      const uid=s.data.session.user.id;
      await loadAll(uid);
      const u=U(uid);
      if(u&&!u.banned){S.me=uid;subscribe(uid)}else{await sb.auth.signOut();owner=null;resetData()}
    }
  }catch(e){console.error('boot',e)}
  sb.auth.onAuthStateChange(ev=>{if(ev==='SIGNED_OUT'&&S.me){S.me=null;owner=null;resetData();render()}});
}

/* ---------- دوال الخادم: إعلانات / أدمن / ذكاء اصطناعي ---------- */
/* ---------- الصور: Supabase Storage (حاوية media العامة) ---------- */
const MB='media';
const pfx=()=>String(cfg.SUPABASE_URL).replace(/\/+$/,'')+'/storage/v1/object/public/'+MB+'/';
async function upload(blobs,kind){
  if(!owner)throw new Error('auth');
  const done=[];
  try{for(const b of blobs){
    const path=owner+'/'+kind+'-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8)+'.jpg';
    const {error}=await sb.storage.from(MB).upload(path,b,{contentType:'image/jpeg',cacheControl:'31536000',upsert:false});
    if(error)throw error;done.push(path)}}
  catch(e){if(done.length)sb.storage.from(MB).remove(done).then(()=>{},()=>{});throw e}
  return done.map(p=>sb.storage.from(MB).getPublicUrl(p).data.publicUrl);
}
function rmFiles(urls){try{const p=pfx();const paths=urls.filter(u=>typeof u==='string'&&u.startsWith(p)).map(u=>decodeURIComponent(u.slice(p.length)));if(paths.length)sb.storage.from(MB).remove(paths).then(()=>{},()=>{})}catch(e){}}
function adHit(id,kind){try{sb.rpc('ad_hit',{ad_id:id,kind}).then(()=>{},()=>{})}catch(e){}}
async function fn(name,body){
  const r=await sb.functions.invoke(name,{body});
  if(r.error){let status=0;try{status=r.error.context&&r.error.context.status}catch(e){}
    let msg='';try{const j=await r.error.context.json();msg=j&&j.error}catch(e){}
    const err=new Error(msg||String(r.error.message||r.error));err.status=status;throw err}
  if(r.data&&r.data.error)throw new Error(r.data.error);
  return r.data;
}
async function invokeAI(body){
  try{return await fn('ai',body)}
  catch(e){const code=e.status===429?'rate_limited':(e.status===401||e.status===403)?'not_granted':'failed';throw {code,message:e.message}}
}
const sample=async(msgs,opts)=>{
  const first=msgs[0],sys=(first&&first.role==='user'&&/^You are a specialized medical assistant/.test(first.content))?first.content:'';
  const rest=sys?msgs.slice(1):msgs;
  const r=await invokeAI({mode:'chat',system:sys,messages:rest.map(m=>({role:m.role,content:m.content}))});
  if(opts&&opts.onText)opts.onText({text:r.text,delta:r.text});
  return {text:r.text,truncated:false};
};
sample.json=async(prompt)=>{const r=await invokeAI({mode:'json',prompt:typeof prompt==='string'?prompt:JSON.stringify(prompt)});return r.json};


/* ---------- التشخيص الأونلاين (للاستفسارات الطبية): تحميل + عمليات عبر RPC + ملفات خاصة ---------- */
const PRIV='private';
const mapAd=a=>({id:a.id,title:a.title,body:a.body,cta:a.cta,advertiser:a.advertiser,url:a.url,tone:a.tone,active:a.active,status:a.status||'live',owner:a.owner||undefined,cap:Number(a.cap)||0,ts:a.ts,views:a.views||0,clicks:a.clicks||0});
const mapOrder=o=>({id:o.id,ad:o.ad_id,uid:o.owner,kind:o.kind,credits:o.credits,unit:o.unit,amount:o.amount,views:Number(o.views)||0,pm:o.method,from:o.pay_from,ref:o.pay_ref||'',proof:o.pay_proof||'',status:o.status,note:o.note||'',rf:o.refund_status,rfref:o.refund_ref||'',ts:Number(o.ts),rts:o.reviewed_ts?Number(o.reviewed_ts):null});
async function bzLoadOrders(){try{const od=await ld('ad_orders',q=>q.order('ts',{ascending:false}).limit(1000));S.bz={orders:od.map(mapOrder)}}catch(e){S.bz={orders:[]}}}
async function bzLoad(){try{const ad=await ld('ads');S.ads=ad.map(mapAd);await bzLoadOrders();markTable('ads')}catch(e){console.warn('bz',e)}}
async function bzOp(name,a){
  switch(name){
    case 'submit':{const f=a[0];return rpcOk('submit_ad',{p_title:f.title,p_body:f.body||'',p_cta:f.cta||'',p_url:f.url,p_tone:f.tone||0,p_credits:f.credits,p_method:f.pm,p_from:f.from,p_ref:f.ref||'',p_proof:f.proof||''})}
    case 'topup':{const f=a[1];return rpcOk('topup_ad',{p_ad:a[0],p_credits:f.credits,p_method:f.pm,p_from:f.from,p_ref:f.ref||'',p_proof:f.proof||''})}
    case 'cancel':return rpcOk('cancel_ad_order',{p_id:a[0]});
    case 'review':return rpcOk('review_ad_order',{p_id:a[0],p_decision:a[1],p_note:a[2]||''});
    case 'toggle':return rpcOk('ad_owner_toggle',{p_ad:a[0]});
    default:throw new Error('bad_action');
  }
}
async function csLoad(prof){
  try{await sb.rpc('consult_tick')}catch(e){}
  const q=(t,f)=>ld(t,f).catch(()=>[]);
  const [ap,dc,po,bk,cc,ms,rv,pr]=await Promise.all([q('doctor_applications'),q('doctors'),q('doctor_payout'),q('consult_bookings'),q('consult_content'),q('consult_messages',x=>x.order('ts',{ascending:true}).limit(1500)),q('consult_reviews'),prof?Promise.resolve(prof):q('profiles')]);
  const C=csEnsure();
  C.apps=ap.map(a=>({id:a.id,uid:a.user_id,name:a.name,age:a.age,phone:a.phone,uni:a.university,lic:a.license_no,spec:a.spec,idp:a.id_photo||'',selfie:a.selfie||'',status:a.status,note:a.note||'',ts:a.ts,rts:a.reviewed_ts||null}));
  C.docs=dc.map(d=>({uid:d.user_id,spec:d.spec,bio:typeof d.bio==='string'?d.bio:(d.bio&&d.bio.ar!==undefined?[d.bio.ar,d.bio.en||d.bio.ar]:''),fee:d.fee||0,active:!!d.active,suspended:!!d.suspended,hours:d.hours||{},ts:d.ts}));
  C.payouts={};po.forEach(p=>{C.payouts[p.user_id]={method:p.method,handle:p.handle}});
  C.bk=bk.map(b=>({id:b.id,pt:b.patient,dr:b.doctor,st:b.start_ts,dur:b.dur_min,fee:b.fee,com:b.commission,net:b.net,status:b.status,hold:b.hold_until||0,pm:b.pay_method||'',pref:b.pay_ref||'',pproof:b.pay_proof||'',anote:b.admin_note||'',cts:b.created_ts,pts:b.paid_ts||null,cfts:b.confirmed_ts||null,cmts:b.completed_ts||null,cby:b.cancelled_by||'',rf:b.refund_status,rfref:b.refund_ref||'',po:b.payout_status,pots:b.payout_ts||null,poref:b.payout_ref||''}));
  C.cc={};cc.forEach(c=>{C.cc[c.booking_id]={complaint:c.complaint,diagnosis:c.diagnosis,meet:c.meet_link}});
  C.msgs=ms.map(m=>({id:m.id,bid:m.booking_id,from:m.from_uid,text:m.text,ts:m.ts}));
  C.rv=rv.map(r=>({bid:r.booking_id,dr:r.doctor,pt:r.patient,stars:r.stars,comment:r.comment||'',hidden:!!r.hidden,ts:r.ts}));
  /* لقب/توثيق/تخصص الأطباء قد يتغير بقرار الأدمن: نحدّثه في الذاكرة */
  pr.forEach(p=>{const u=S.users.find(x=>x.id===p.id);if(u){u.title=p.title;u.verified=p.verified;u.spec=p.spec}});
}
const rpcOk=async(name,args)=>{const r=await sb.rpc(name,args);if(r.error)throw new Error(r.error.message);return r.data};
const dbOk=r=>{if(r&&r.error)throw new Error(r.error.message);return r};
async function csOp(name,a){
  switch(name){
    case 'apply':{const f=a[0];dbOk(await sb.from('doctor_applications').insert({id:uid(),user_id:owner,name:f.name,age:f.age,phone:f.phone,university:f.uni,license_no:f.lic,spec:f.spec,id_photo:f.idp,selfie:f.selfie}));return}
    case 'review':return rpcOk('review_doctor_application',{p_id:a[0],p_decision:a[1],p_note:a[2]||''});
    case 'purgeApp':return rpcOk('purge_application_files',{p_id:a[0]});
    case 'saveDoc':{const f=a[0];dbOk(await sb.from('doctors').update({fee:f.fee,hours:f.hours,active:f.active,bio:f.bio||''}).eq('user_id',owner));
      if(f.payout&&f.payout.handle)dbOk(await sb.from('doctor_payout').upsert({user_id:owner,method:f.payout.method,handle:f.payout.handle}));return}
    case 'book':return rpcOk('book_consult',{p_doctor:a[0],p_start:a[1],p_complaint:a[2]});
    case 'pay':return rpcOk('submit_payment',{p_id:a[0],p_method:a[1],p_ref:a[2],p_proof:a[3]||''});
    case 'cancel':return rpcOk('cancel_consult',{p_id:a[0]});
    case 'complete':return rpcOk('complete_consult',{p_id:a[0]});
    case 'send':return rpcOk('consult_send',{p_id:a[0],p_text:a[1]});
    case 'saveCons':return rpcOk('save_consult',{p_id:a[0],p_meet:a[1]||'',p_diag:a[2]||''});
    case 'rate':return rpcOk('rate_consult',{p_id:a[0],p_stars:a[1],p_comment:a[2]||''});
    case 'adm':return a[1]==='cancel'?rpcOk('cancel_consult',{p_id:a[0]}):rpcOk('admin_consult_action',{p_id:a[0],p_action:a[1],p_note:a[2]||''});
    case 'admDoc':{const act=a[1];if(act.indexOf('spec:')===0){const sp=act.slice(5);dbOk(await sb.from('doctors').update({spec:sp}).eq('user_id',a[0]));dbOk(await sb.from('profiles').update({spec:sp}).eq('id',a[0]));return}
      return rpcOk('admin_doctor',{p_doctor:a[0],p_action:act})}
    case 'hideRv':return rpcOk('hide_review',{p_id:a[0],p_hidden:!!a[1]});
    default:throw new Error('bad_action');
  }
}
async function csBusy(did){const d=await rpcOk('doctor_busy',{p_doctor:did});return (d||[]).map(x=>({st:x.start_ts,dur:x.dur_min}))}
async function csFile(path){const r=await sb.storage.from(PRIV).createSignedUrl(path,300);if(r.error)throw r.error;return r.data.signedUrl}
async function csUpload(blob,kind){
  if(!owner)throw new Error('auth');
  const path=owner+'/'+kind+'-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8)+'.jpg';
  const {error}=await sb.storage.from(PRIV).upload(path,blob,{contentType:'image/jpeg',cacheControl:'3600',upsert:false});
  if(error)throw error;return path;
}
async function csRemove(paths){const p=(paths||[]).filter(Boolean);if(p.length){const r=await sb.storage.from(PRIV).remove(p);if(r.error)throw r.error}}

BE={bz:bzOp,bzLoad,cs:csOp,csLoad:()=>csLoad(),csBusy,csFile,csUpload,csRemove,sb,push,drain,flush,refresh,reload:async()=>{await loadAll(S.me);render()},login,signup,logout,boot,adHit,upload,rmFiles,fn,sample,mark,_TB:TB};
})();

/* مغلّفات تستخدمها الأفعال في c6 */
async function beLogin(){
  const em=($('#a_email').value||'').trim().toLowerCase(),pw=$('#a_pass').value;
  if(!em||!pw){aerr(t('e_login'));return}
  const b=$('[data-action="login"]');if(b)b.disabled=true;
  try{const r=await BE.login(em,pw);if(r.error){aerr(r.error);return}closeModal();enter(r.user)}
  catch(e){console.error(e);aerr(t('e_net'))}
  finally{if(b)b.disabled=false}
}
async function beSignup(f){
  const b=$('[data-action="signup"]:not(.tabs2 button)');if(b)b.disabled=true;
  try{const r=await BE.signup(f);if(r.error){aerr(r.error);return}if(r.confirm){const e=$('#aerr');if(e){e.textContent=t('su_confirm');e.style.color='var(--ok)'}return}closeModal();enter(r.user,t('welcome'))}
  catch(e){console.error(e);aerr(t('e_net'))}
  finally{if(b)b.disabled=false}
}
Object.assign(D,{
 su_personal:['حساب شخصي','Personal account'],su_business:['نشاط تجاري','Business'],a_bname:['اسم النشاط التجاري','Business name'],a_bplace:['نوع النشاط (مثال: صيدلية، مركز تحاليل، مستلزمات طبية)','Business type (e.g. pharmacy, lab, medical supplies)'],su_biz_note:['حساب النشاط التجاري مخصص للنشر والانضمام للمجموعات وشراء الإعلانات فقط. لا يشمل الأصدقاء ولا الوظائف ولا السجل الطبي ولا الاستشارات.','A business account is for posting, joining groups and buying ads only. It does not include friends, jobs, medical records or consultations.'],a_email:['البريد الإلكتروني','Email'],a_pass:['كلمة المرور','Password'],a_name:['الاسم الكامل','Full name'],a_pass6:['كلمة المرور (6 أحرف على الأقل)','Password (at least 6 characters)'],a_role:['الصفة','Role'],a_spec:['التخصص','Specialty'],a_city:['المدينة','City'],a_in:['دخول','Log in'],a_create:['إنشاء الحساب','Create account'],
 e_login:['البريد الإلكتروني أو كلمة المرور غير صحيحة.','Incorrect email or password.'],e_name:['اكتب اسمك الكامل.','Enter your full name.'],e_mail:['البريد الإلكتروني غير صالح.','The email address is invalid.'],e_pw:['كلمة المرور يجب ألا تقل عن 6 أحرف.','Password must be at least 6 characters.'],e_dup:['هذا البريد مسجل بالفعل، سجّل الدخول بدلًا من ذلك.','This email is already registered, log in instead.'],e_ban:['هذا الحساب محظور من المنصة.','This account is banned from the platform.'],
 demo_h:['للتجربة:','Try it:'],demo_b:['دخول كنشاط تجاري','Business demo'],demo_u:['دخول كمستخدم','Log in as user'],demo_a:['دخول كأدمن','Log in as admin'],welcome:['أهلًا بك في MedRo','Welcome to MedRo'],posted:['تم النشر','Posted'],write_first:['اكتب شيئًا أولًا','Write something first']
});
const val=id=>{const e=document.getElementById(id);return e?e.value.trim():''};
const aerr=m=>{const e=$('#aerr');if(e)e.textContent=m};
const setL=(o,k,v)=>{if(v!==L(o[k]))o[k]=v};
function authModal(mode){
  if(mode!=='signup'||!ui.suKeep){ui.suType=ui.suType||'personal'}
  const closed=!S.site.toggles.signup,login=mode==='login'||closed;
  const tabs=`<div class="tabs2"><button class="${login?'on':''}" data-action="auth" data-mode="login">${t('login')}</button><button class="${login?'':'on'}" data-action="auth" data-mode="signup"${closed?' disabled':''}>${t('signup')}</button></div>${closed?`<div class="hint">${t('su_closed')}</div>`:''}<div class="err" id="aerr"></div>`;
  const f=login?`<div class="field"><label for="a_email">${t('a_email')}</label><input id="a_email" class="in" type="email" dir="ltr" autocomplete="email"></div>
<div class="field"><label for="a_pass">${t('a_pass')}</label><input id="a_pass" class="in" type="password" dir="ltr" autocomplete="current-password"></div>
<div class="mfoot"><button class="btn" data-action="login">${t('a_in')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>
${REAL?'':`<div class="hint" style="margin-top:16px">${t('demo_h')} <button class="btn soft s" data-action="quick" data-id="u_demo">${t('demo_u')}</button> <button class="btn soft s" data-action="quick" data-id="u_admin">${t('demo_a')}</button> <button class="btn soft s" data-action="quick" data-id="u_biz">${t('demo_b')}</button> <button class="btn soft s" data-action="quick" data-id="u8">${t('demo_m')}</button><div dir="ltr" style="margin-top:8px;text-align:start">demo@medro.app / demo123<br>admin@medro.app / admin123</div></div>`}`
  :(()=>{const biz=ui.suType==='business',d=ui.suDraft||{};ui.suDraft=null;
  const pick=`<div class="tabs2" style="margin-bottom:12px" role="group" aria-label="${esc(t('signup'))}"><button class="${biz?'':'on'}" data-action="sutype" data-id="personal">${t('su_personal')}</button><button class="${biz?'on':''}" data-action="sutype" data-id="business">${ic('store')} ${t('su_business')}</button></div>`;
  const base=`<div class="field"><label for="a_name">${t(biz?'a_bname':'a_name')}</label><input id="a_name" class="in" autocomplete="${biz?'organization':'name'}" value="${esc(d.name||'')}"></div>
<div class="field"><label for="a_email">${t('a_email')}</label><input id="a_email" class="in" type="email" dir="ltr" autocomplete="email" value="${esc(d.email||'')}"></div>
<div class="field"><label for="a_pass">${t('a_pass6')}</label><input id="a_pass" class="in" type="password" dir="ltr" autocomplete="new-password"></div>`;
  const mid=biz?`<div class="field"><label for="a_place">${t('a_bplace')}</label><input id="a_place" class="in" maxlength="80" value="${esc(d.place||'')}"></div>`
   :`<div class="row"><div class="field"><label for="a_role">${t('a_role')}</label><select id="a_role" class="sel">${ROLES.map(r=>`<option value="${r}" ${d.role===r?'selected':''}>${t('r_'+r)}</option>`).join('')}</select></div>
<div class="field" id="a_specf" ${(d.role||'member')==='member'?'hidden':''}><label for="a_spec">${t('a_spec')}</label><select id="a_spec" class="sel">${SPECS.map(r=>`<option value="${r}" ${d.spec===r?'selected':''}>${t('sp_'+r)}</option>`).join('')}</select></div></div>`;
  return pick+base+mid+`<div class="field"><label for="a_city">${t('a_city')}</label><input id="a_city" class="in" value="${esc(d.city||'')}"></div>
<div class="hint" style="margin-bottom:10px">${t(biz?'su_biz_note':'su_doc_note')}</div>
<div class="mfoot"><button class="btn" data-action="signup">${t('a_create')}</button><button class="btn line" data-action="closem">${t('cancel')}</button></div>`})();
  openModal(tabs+f);
}
function transition(fn){
  const b=$('#boot'),c=b.cloneNode(true);b.replaceWith(c);c.classList.remove('off');
  setTimeout(fn,900);setTimeout(()=>c.classList.add('off'),1500);
}
function enter(u,msg){
  if(u.banned){aerr(t('e_ban'));return}
  closeModal();
  transition(()=>{S.me=u.id;save();ui.view='feed';ui.param=null;ui.chat=[];ui.enter=true;render();window.scrollTo(0,0);const un=unreadCount();if(msg)toast(msg);else if(un)toast(t('nt_new',un));routeHash()});
}
function routeHash(){
  let h='';try{h=location.hash||''}catch(e){}
  const m=/^#(post|user|job)-(.+)$/.exec(h);if(!m)return;
  if(!S.me){ui.hold=h;return}
  if(m[1]==='post'&&S.posts.some(p=>p.id===m[2]))go('post',m[2]);
  else if(m[1]==='user'&&U(m[2]))go('profile',m[2]);
  else if(m[1]==='job')go('jobs');
}
function keepScroll(fn){const s=$('.spot'),x=s?s.scrollLeft:0;fn();const n=$('.spot');if(n)n.scrollLeft=x}
function addFriend(id){const m=me();if(isBiz(m)||isBiz(U(id))||hid(id)||fstatus(m.id,id)!=='none')return;S.friends.push({a:m.id,b:id,status:'pending',ts:Date.now()});notify(id,'friend_req',m.id);save();toast(t('fr_sent_t'))}
function dropFriend(id){const m=me();S.friends=S.friends.filter(f=>!((f.a===m.id&&f.b===id)||(f.a===id&&f.b===m.id)))}
const A={
  home(){ui.view='landing';render();window.scrollTo(0,0)},
  editpage(){if(!isAdmin())return;ui.editLanding=true;render();window.scrollTo(0,0)},
  edexit(){ui.editLanding=false;ui.view='admin';ui.adminTab='site';render();window.scrollTo(0,0)},
  edtext(el){if(isAdmin())edTextModal(el.dataset.k)},
  sav_text(el){if(!isAdmin())return;const k=el.dataset.k;if(!D[k])return;const a=clean($('#e_ar').value),b=clean($('#e_en').value);const pair=[a||D[k][0],b||D[k][1]];if(pair[0]===D[k][0]&&pair[1]===D[k][1])delete OV[k];else OV[k]=pair;save();closeModal();render();toast(t('ed_saved'))},
  rst_text(el){if(!isAdmin())return;delete OV[el.dataset.k];save();closeModal();render();toast(t('ed_saved'))},
  tipadd(){if(!isAdmin())return;ensureTips();S.site.tips.push(['','']);save();render()},
  tipdel(el){if(!isAdmin())return;ensureTips();S.site.tips.splice(+el.dataset.i,1);save();render()},
  delcm(el){const p=S.posts.find(x=>x.id===el.dataset.p);if(!p||!S.me)return;const c=p.comments.find(x=>x.id===el.dataset.id);if(!c)return;if(!(c.uid===S.me||isAdmin()||canModGroup(p.groupId)))return;p.comments=p.comments.filter(x=>x!==c);save();render()},
  newuser(){if(isAdmin())userNewModal()},
  saveuser2(){if(!isAdmin())return;const name=clean(val('n_name')),em=val('n_email').toLowerCase(),pw=$('#n_pass').value.trim();if(name.length<3||!/^\S+@\S+\.\S+$/.test(em)||pw.length<6){aerr(t('nu_err'));return}if(REAL){BE.fn('admin',{action:'create_user',email:em,password:pw,name,title:val('n_role'),spec:val('n_spec'),verified:$('#n_ver').checked}).then(async()=>{closeModal();await BE.reload();toast(t('nu_ok'))}).catch(e=>aerr(e.message||t('e_fn')));return}if(S.users.some(u=>u.email.toLowerCase()===em)){aerr(t('nu_dup'));return}S.users.push({id:uid(),name,email:em,pass:pw,role:'user',title:val('n_role'),spec:val('n_spec'),place:'',city:'',bio:'',banned:false,joined:Date.now(),record:{blood:'',dob:'',gender:'',height:'',weight:'',allergies:'',chronic:'',meds:'',emergency:'',history:[]},verified:$('#n_ver').checked,vreq:null,saved:[]});save();closeModal();render();toast(t('nu_ok'))},
  auth(el){if(ui.editLanding&&isAdmin())return;authModal(el.dataset.mode)},closem(){closeModal()},ovclose(el,e){if(e.target===el)closeModal()},
  scroll(el){const x=document.getElementById(el.dataset.to);if(x)x.scrollIntoView({behavior:'smooth',block:'start'})},
  lang(){lang=lang==='ar'?'en':'ar';lset('medro_lang',lang);applyEnv();closeModal();render()},
  theme(){theme=theme==='dark'?'light':'dark';lset('medro_theme',theme);applyEnv()},
  login(){if(REAL){beLogin();return}const em=val('a_email').toLowerCase(),pw=$('#a_pass').value,u=S.users.find(x=>x.email.toLowerCase()===em&&x.pass===pw);if(!u){aerr(t('e_login'));return}enter(u)},
  quick(el){if(REAL)return;const u=U(el.dataset.id);if(u)enter(u)},
  sutype(el){ui.suDraft={name:val('a_name'),email:val('a_email'),city:val('a_city'),place:val('a_place')};ui.suType=el.dataset.id==='business'?'business':'personal';authModal('signup')},
  signup(){
    if(!S.site.toggles.signup)return;
    const biz=ui.suType==='business',name=val('a_name'),em=val('a_email').toLowerCase(),pw=$('#a_pass').value;
    if(name.length<3){aerr(t('e_name'));return}if(!/^\S+@\S+\.\S+$/.test(em)){aerr(t('e_mail'));return}
    if(pw.length<6){aerr(t('e_pw'));return}
    const title=biz?'business':(ROLES.includes(val('a_role'))?val('a_role'):'member'),spec=(biz||title==='member')?'general':val('a_spec'),place=biz?clean(val('a_place')):'';
    if(REAL){beSignup({name:clean(name),email:em,pw,title,spec,place,city:clean(val('a_city'))});return}
    if(S.users.some(u=>u.email.toLowerCase()===em)){aerr(t('e_dup'));return}
    const u={id:uid(),name,email:em,pass:pw,role:'user',title,spec,place,city:val('a_city'),bio:'',banned:false,joined:Date.now(),record:{blood:'',dob:'',gender:'',height:'',weight:'',allergies:'',chronic:'',meds:'',emergency:'',history:[]},verified:false,vreq:null,saved:[]};
    S.users.push(u);save();enter(u,t('welcome'));
  },
  logout(){closeModal();if(REAL)BE.logout();transition(()=>{S.me=null;save();ui.view='landing';ui.menu=null;ui.chat=[];render();window.scrollTo(0,0)})},
  nav(el){go(el.dataset.v)},menu(el){const id=el.dataset.id;ui.menu=ui.menu===id?null:id;render()},
  user(el){go('profile',el.dataset.id)},group(el){go('group',el.dataset.id)},openpost(el){go('post',el.dataset.id)},
  compose(){if(ui.view!=='feed')go('feed');setTimeout(()=>{const d=$('#draft');if(d){d.focus();d.scrollIntoView({block:'center',behavior:'smooth'})}},80)},
  dtag(el){ui.draftTag=el.dataset.id;$$('.tp').forEach(b=>b.classList.toggle('on',b.dataset.id===ui.draftTag))},
  spec(el){ui.spec=el.dataset.id;keepScroll(render)},ftab(el){ui.feedTab=el.dataset.id;keepScroll(render)},
  async publish(el){
    if(ui.busy)return;
    const text=ui.draft.trim(),imgs=ui.draftImgs.slice(),gid=el.dataset.g||null;
    if(!text&&!imgs.length){toast(t('write_first'));return}
    let urls=[];
    if(imgs.length){ui.busy=true;toast(t('img_up'));
      try{urls=await uploadImgs(imgs.map(x=>x.blob),'post')}catch(e){ui.busy=false;toast(imgErr(e));return}
      ui.busy=false}
    S.posts.push({id:uid(),uid:me().id,tag:ui.draftTag,text,ts:Date.now(),groupId:gid,likes:[],comments:[],shares:0,shared:null,images:urls});
    clearDraftImgs();ui.draft='';save();render();toast(t('posted'));
  },
  blk(el){blkModal(el.dataset.id)},blkdo(el){blkDo(el.dataset.id)},unblk(el){unBlk(el.dataset.id)},blklist(){blkListModal()},
  delacc(){delAccModal()},delme(){delMe()},
  pickimg(){const i=$('#imgin');if(i)i.click()},rmimg(el){rmDraftImg(el.dataset.id)},zoom:imgZoom,
  pickav(){const i=$('#avin');if(i)i.click()},
  rmav(){const u=me();if(!u||!u.avatar)return;const old=u.avatar;u.avatar='';dropImgs([old]);save();render();const pv=$('#avprev');if(pv)pv.innerHTML=avatar(me(),'xl');toast(t('photo_ok'))},
  like(el){const p=S.posts.find(x=>x.id===el.dataset.id);if(!p)return;const i=p.likes.indexOf(me().id);if(i>=0)p.likes.splice(i,1);else{p.likes.push(me().id);notify(p.uid,'like',p.id)}save();render()},
  savep(el){const m=me(),id=el.dataset.id,i=m.saved.indexOf(id);if(i>=0)m.saved.splice(i,1);else m.saved.push(id);save();render()},
  cm(el){const id=el.dataset.id;ui.openCm[id]=!ui.openCm[id];render();if(ui.openCm[id]){const i=document.querySelector(`[data-cin="${id}"]`);if(i)i.focus()}},
  addcm(el){const id=el.dataset.id,i=document.querySelector(`[data-cin="${id}"]`),text=i?i.value.trim():'';if(!text)return;const p=S.posts.find(x=>x.id===id);if(!p)return;p.comments.push({id:uid(),uid:me().id,text,ts:Date.now()});notify(p.uid,'comment',p.id);save();render();const n=document.querySelector(`[data-cin="${id}"]`);if(n)n.focus()},
  delpost(el){const p=S.posts.find(x=>x.id===el.dataset.id);if(!p)return;if(!(p.uid===me().id||isAdmin()||canModGroup(p.groupId)))return;removePost(p.id);ui.menu=null;save();render()},
  report(el){ui.menu=null;render();reportModal(el.dataset.id)},
  sendreport(el){const id=el.dataset.id;if(S.reports.some(r=>r.postId===id&&r.by===me().id&&r.status==='open')){closeModal();toast(t('rp_dup'));return}S.reports.push({id:uid(),postId:id,by:me().id,reason:val('rp_r'),note:val('rp_n'),ts:Date.now(),status:'open',source:'user'});save();closeModal();toast(t('rp_ok'))},
  share(el){ui.menu=null;if(S.me)render();shareModal(el.dataset.k,el.dataset.id)},
  copyurl(){const i=$('#sh_u');if(!i)return;i.focus();i.select();const ok=()=>toast(t('sh_copied'));try{navigator.clipboard.writeText(i.value).then(ok,()=>{try{document.execCommand('copy')}catch(e){}ok()})}catch(e){try{document.execCommand('copy')}catch(_){}ok()}},
  repost(el){const o=S.posts.find(x=>x.id===el.dataset.id);if(!o)return;const src=o.shared&&S.posts.some(x=>x.id===o.shared)?o.shared:o.id;
    S.posts.push({id:uid(),uid:me().id,tag:'disc',text:val('sh_c'),ts:Date.now(),groupId:null,likes:[],comments:[],shares:0,shared:src});o.shares=(o.shares||0)+1;notify(o.uid,'repost',o.id);save();closeModal();render();toast(t('sh_ok'))},
  adclick(el){const a=S.ads.find(x=>x.id===el.dataset.id);if(a&&!isAdmin()&&!(a.owner&&a.owner===S.me)){a.clicks=(a.clicks||0)+1;if(REAL)BE.adHit(a.id,'click');else save()}},
  'fr-send'(el){addFriend(el.dataset.id);render()},
  'fr-accept'(el){const f=S.friends.find(x=>x.a===el.dataset.id&&x.b===me().id&&x.status==='pending');if(f){f.status='accepted';notify(el.dataset.id,'friend_ok',me().id);markRead(n=>n.type==='friend_req'&&n.from===el.dataset.id)}save();render();toast(t('fr_now'))},
  'fr-reject'(el){dropFriend(el.dataset.id);markRead(n=>n.type==='friend_req'&&n.from===el.dataset.id);save();render()},'fr-remove'(el){dropFriend(el.dataset.id);save();render()},frtab(el){ui.frTab=el.dataset.id;render()},
  join(el){const g=S.groups.find(x=>x.id===el.dataset.id),m=me();if(!g||!m||g.members.includes(m.id))return;
    if(g.kind==='uni'&&!isAdmin()){const p=pendRaw(g);if(!p.includes(m.id)){p.push(m.id);if(g.mod)notify(g.mod,'join_req',g.id);notifyAdmins('join_req',g.id,g.mod);save();render();toast(t('jr_sent'))}return}
    g.members.push(m.id);save();render();toast(t('joined',L(g.name)))},
  jcancel(el){const g=S.groups.find(x=>x.id===el.dataset.id),m=me();if(!g||!m)return;g.pending=pendRaw(g).filter(x=>x!==m.id);save();render()},
  jr_ok(el){const g=S.groups.find(x=>x.id===el.dataset.g),id=el.dataset.id;if(!g||!(isAdmin()||g.mod===me().id))return;g.pending=pendRaw(g).filter(x=>x!==id);if(U(id)&&!g.members.includes(id))g.members.push(id);notify(id,'join_ok',g.id);markRead(n=>n.type==='join_req'&&n.ref===g.id&&n.from===id);save();render();toast(t('jr_ok'))},
  jr_no(el){const g=S.groups.find(x=>x.id===el.dataset.g),id=el.dataset.id;if(!g||!(isAdmin()||g.mod===me().id))return;g.pending=pendRaw(g).filter(x=>x!==id);notify(id,'join_no',g.id);markRead(n=>n.type==='join_req'&&n.ref===g.id&&n.from===id);save();render();toast(t('jr_no'))},
  leave(el){const g=S.groups.find(x=>x.id===el.dataset.id);if(g&&g.mod!==me().id){g.members=g.members.filter(x=>x!==me().id);save();render()}},
  newgroup(){if(!isAdmin()&&(!S.site.toggles.userGroups||isBiz(me())))return;groupEditModal(null)},
  savegroup(el){const name=val('g_name');if(name.length<3){aerr(t('g_name_err'));return}const id=el.dataset.id,g=id?S.groups.find(x=>x.id===id):null;
    if(g){setL(g,'name',name);setL(g,'desc',val('g_desc'));g.cat=val('g_cat')}else{const n={id:uid(),name,desc:val('g_desc'),cat:val('g_cat'),owner:me().id,members:[me().id],ts:Date.now()};S.groups.push(n);ui.view='group';ui.param=n.id}
    save();closeModal();render();toast(t('saved_t'))},
  newjob(){jobModal()},
  jedit(el){const j=S.jobs.find(x=>x.id===el.dataset.id);if(j)jobModal(j)},
  createjob(el){const title=val('j_title'),org=val('j_org');if(!title||!org){aerr(t('j_err'));return}const id=el.dataset.id,j=id?S.jobs.find(x=>x.id===id):null;
    if(j){setL(j,'title',title);setL(j,'org',org);setL(j,'city',val('j_city')||t('j_unset'));setL(j,'desc',val('j_desc'));j.spec=val('j_spec');j.type=val('j_type')}
    else S.jobs.push({id:uid(),title,org,city:val('j_city')||t('j_unset'),spec:val('j_spec'),type:val('j_type'),desc:val('j_desc'),ts:Date.now(),by:me().id,applicants:[],saved:[]});
    save();closeModal();render();toast(t('saved_t'))},
  apply(el){const j=S.jobs.find(x=>x.id===el.dataset.id);if(j&&!j.applicants.includes(me().id)){j.applicants.push(me().id);save();render();toast(t('apply_ok'))}},
  savejob(el){const j=S.jobs.find(x=>x.id===el.dataset.id);if(!j)return;const i=j.saved.indexOf(me().id);if(i>=0)j.saved.splice(i,1);else j.saved.push(me().id);save();render()},
  aisend(){const e=$('#aiq');const q=e.value;e.value='';sendAI(q)},aichip(el){sendAI(el.dataset.q)},
  pftab(el){ui.pfTab=el.dataset.id;render()},editprofile(){profModal()},
  saveprofile(){const u=me(),n=val('p_name');if(n.length<3)return;setL(u,'name',n);{const r=val('p_role');if(!isBiz(u)&&u.title!=='doctor'&&r!=='doctor'&&r!=='business'&&ROLES_ALL.includes(r))u.title=r}if(noSpec(u))u.spec='general';else if($('#p_spec'))u.spec=val('p_spec');setL(u,'place',val('p_place'));setL(u,'city',val('p_city'));setL(u,'bio',val('p_bio'));save();closeModal();render();toast(t('p_done'))},
  editrec(){recModal()},
  saverec(){me().record=Object.assign(me().record,{blood:val('r_blood'),gender:val('r_gender'),dob:val('r_dob'),height:val('r_h'),weight:val('r_w'),allergies:val('r_al'),chronic:val('r_ch'),meds:val('r_me'),emergency:val('r_em')});save();closeModal();render();toast(t('rec_ok'))},
  addhist(){histModal()},
  savehist(){const title=val('h_title');if(!title){aerr(t('h_err'));return}me().record.history.push({id:uid(),date:val('h_date'),type:val('h_type'),title,notes:val('h_notes')});save();closeModal();render();toast(t('h_added'))},
  delhist(el){const r=me().record;r.history=r.history.filter(e=>e.id!==el.dataset.id);save();render()},
  vreq(){vreqModal()},
  sendvreq(){const n=val('v_num');if(!n){aerr(t('v_err'));return}me().vreq={status:'pending',type:val('v_type'),license:n,note:val('v_note'),ts:Date.now()};notifyAdmins('v_req',me().id);save();closeModal();render();toast(t('v_sent'))},
  /* admin */
  admtab(el){ui.adminTab=el.dataset.id;render()},ask(el){confirmModal(el.dataset.msg,el.dataset.do,el.dataset.id)},
  'rep-remove'(el){const r=S.reports.find(x=>x.id===el.dataset.id);if(r)removePost(r.postId);save();render()},
  'rep-ban'(el){const r=S.reports.find(x=>x.id===el.dataset.id),p=r&&S.posts.find(x=>x.id===r.postId);if(p){const u=U(p.uid);if(u&&u.role!=='admin'){u.banned=true;S.reports.forEach(x=>{const q=S.posts.find(y=>y.id===x.postId);if(x.status==='open'&&q&&q.uid===u.id)x.status='banned'})}}save();render()},
  'rep-dismiss'(el){const r=S.reports.find(x=>x.id===el.dataset.id);if(r)r.status='dismissed';save();render()},
  'v-approve'(el){const u=U(el.dataset.id);if(u&&u.vreq){u.verified=true;u.vreq.status='approved';notify(u.id,'v_ok','');markRead(n=>n.type==='v_req'&&n.from===u.id);save();render();toast(t('vq_approved'))}},
  'v-reject'(el){const u=U(el.dataset.id);if(u&&u.vreq){u.vreq.status='rejected';notify(u.id,'v_no','');markRead(n=>n.type==='v_req'&&n.from===u.id);save();render();toast(t('vq_declined'))}},
  'v-revoke'(el){const u=U(el.dataset.id);if(u){u.verified=false;u.vreq=null;save();render()}},
  nopen(el){nOpen(el.dataset.id)},nreadall(){nReadAll()},nclear(){nClear()},ntab(el){ui.ntab=el.dataset.id;render()},
  toggleauto(el){S.settings.autoRemove=!!el.checked;save()},aiscan(){aiScan()},
  uedit(el){userEditModal(el.dataset.id)},
  saveuser(el){const u=U(el.dataset.id);if(!u)return;const n=val('x_name');if(n)setL(u,'name',n);u.title=val('x_title');u.role=val('x_role');setL(u,'city',val('x_city'));save();closeModal();render();toast(t('saved_t'))},
  uban(el){const u=U(el.dataset.id);if(u&&u.id!==me().id){u.banned=!u.banned;save();render()}},
  udel(el){const id=el.dataset.id;if(id===me().id)return;if(REAL){BE.fn('admin',{action:'delete_user',id}).then(async()=>{closeModal();await BE.reload()}).catch(e=>toast(e.message||t('e_fn')));return}S.users=S.users.filter(u=>u.id!==id);S.posts=S.posts.filter(p=>p.uid!==id);S.friends=S.friends.filter(f=>f.a!==id&&f.b!==id);S.groups.forEach(g=>{g.members=g.members.filter(x=>x!==id)});closeModal();save();render()},
  pedit(el){postEditModal(el.dataset.id)},
  savepost(el){const p=S.posts.find(x=>x.id===el.dataset.id),tx=val('e_text');if(p&&tx){setL(p,'text',tx);p.tag=val('e_tag');save();closeModal();render();toast(t('saved_t'))}},
  delpostadm(el){removePost(el.dataset.id);closeModal();save();render()},
  gedit(el){const g=S.groups.find(x=>x.id===el.dataset.id);if(g&&g.kind==='uni')uniModal(g.id);else groupEditModal(el.dataset.id)},
  newuni(){uniModal(null)},
  saveuni(el){
    if(!isAdmin())return;const a=val('u_ar'),e=val('u_en'),mod=val('u_mod');
    if(!(a||e)||!mod||!U(mod)){aerr(t('uni_err'));return}
    const name=(a&&e)?[a,e]:(a||e),desc=val('u_desc'),id=el.dataset.id,g=id?S.groups.find(x=>x.id===id):null;
    let gid=id;if(g){const prev=g.mod;g.name=name;if(desc!==L(g.desc))g.desc=desc;g.mod=mod;if(!g.members.includes(mod))g.members.push(mod);if(prev!==mod)notify(mod,'mod_set',g.id)}
    else{gid=uid();S.groups.push({id:gid,kind:'uni',verified:true,name,desc,cat:'edu',owner:me().id,mod,members:[mod],pending:[],ts:Date.now()});notify(mod,'mod_set',gid)}
    save();closeModal();render();toast(t('saved_t'))},
  'g-kick'(el){const g=S.groups.find(x=>x.id===el.dataset.g),id=el.dataset.id;if(!g||!(isAdmin()||g.mod===me().id)||id===g.mod)return;g.members=g.members.filter(x=>x!==id);notify(id,'kicked',g.id);save();render();toast(t('kicked'))},
  gdel(el){const id=el.dataset.id;S.groups=S.groups.filter(g=>g.id!==id);S.posts=S.posts.filter(p=>p.groupId!==id);closeModal();save();if(ui.view==='group')ui.view='groups';render()},
  jdel(el){S.jobs=S.jobs.filter(j=>j.id!==el.dataset.id);closeModal();save();render()},
  newad(){adModal(null)},adedit(el){adModal(el.dataset.id)},
  savead(el){const title=val('d_title');if(!title){aerr(t('ad_err1'));return}const url=val('d_url');if(!/^https?:\/\//i.test(url)){aerr(t('ad_err2'));return}
    const id=el.dataset.id,a=id?S.ads.find(x=>x.id===id):null,tone=parseInt(val('d_tone'),10)||0;
    if(a){setL(a,'title',title);setL(a,'body',val('d_body'));setL(a,'cta',val('d_cta'));setL(a,'advertiser',val('d_adv')||'—');a.url=url;a.tone=tone}
    else S.ads.push({id:uid(),title,body:val('d_body'),cta:val('d_cta'),url,advertiser:val('d_adv')||'—',tone,active:true,views:0,clicks:0,ts:Date.now()});
    save();closeModal();render();toast(t('ad_saved'))},
  adtoggle(el){const a=S.ads.find(x=>x.id===el.dataset.id);if(!a)return;if(a.owner){if(a.status==='live'){a.status='paused';a.active=false}else if(a.status==='paused'){a.status='live';a.active=true}else return}else a.active=!a.active;save();render()},
  addel(el){S.ads=S.ads.filter(a=>a.id!==el.dataset.id);closeModal();save();render()}
};
Object.assign(A,CA);Object.assign(A,BA);
document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('.btn');
  if(b&&!b.disabled){const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');sp.className='rip';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),650)}
  const el=e.target.closest('[data-action]');
  if(el){const f=A[el.dataset.action];if(f){if(el.tagName==='INPUT')return;f(el,e);return}}
  if(ui.menu){ui.menu=null;if(S.me)render()}
});
document.addEventListener('change',e=>{const el=e.target;if(el.matches&&el.matches('input[data-action="toggleauto"]'))A.toggleauto(el)});
document.addEventListener('input',e=>{
  const el=e.target,k=el.dataset&&el.dataset.in;if(!k)return;
  if(k==='draft')ui.draft=el.value;
  else if(k==='txq'){ui.txq=el.value;const l=$('#txList');if(l)l.innerHTML=textRows()}
  else if(k==='search'){ui.q=el.value;const d=$('#searchDrop');if(d)d.innerHTML=searchHtml()}
  else if(k==='jobQ'||k==='jobSpec'||k==='jobCity'){ui[k]=el.value;const l=$('#jobsList');if(l)l.innerHTML=jobsList()}
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if($('#modal').innerHTML)closeModal();else if(ui.q){ui.q='';const i=$('#gsearch');if(i)i.value='';const d=$('#searchDrop');if(d)d.innerHTML=''}}
  if(e.key==='Enter'&&!e.shiftKey){const el=e.target;
    if(el.dataset&&el.dataset.cin){e.preventDefault();A.addcm({dataset:{id:el.dataset.cin}})}
    else if(el.id==='aiq'){e.preventDefault();A.aisend()}
    else if(el.id==='a_pass'&&$('[data-action="login"]')){e.preventDefault();A.login()}}
});
window.addEventListener('hashchange',routeHash);
function endBoot(){ui.booted=true;$('#boot').classList.add('off');const l=$('#land');if(l)l.classList.add('go');routeHash()}
if(REAL){render();Promise.all([BE.boot(),beSleep(1900)]).then(()=>{render();endBoot()}).catch(()=>{render();endBoot()})}
else{if(S.me&&(!U(S.me)||U(S.me).banned))S.me=null;
render();
setTimeout(endBoot,2300)}
