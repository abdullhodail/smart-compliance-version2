"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Star,
  HelpCircle,
  Target,
  Lock,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pdplQuestions } from "./content";
import { EntityType } from "@prisma/client";
import { trackConversionEvent } from "@/app/actions/tracking";

interface Props {
  score: number;
  answers: Record<string, boolean | "unknown">;
  entityType: EntityType;
  onNavigateDocs: () => void;
}

export default function PDPLResultView({ score, answers, entityType, onNavigateDocs }: Props) {
  useEffect(() => {
    trackConversionEvent({
      eventName: "result_page_view",
      entityType: entityType,
      path: window.location.pathname
    });
  }, [entityType]);

  const gaps = pdplQuestions
    .filter(q => answers[q.id] === false || answers[q.id] === "unknown")
    .slice(0, 3);

  const getStatusLabel = () => {
    if (score >= 80) return { label: "جيد مبدئيًا", color: "text-green-600", bg: "bg-green-50", message: "جاهزية جيدة مبدئيًا، مع بعض النقاط التي تحتاج توثيق" };
    if (score >= 50) return { label: "متوسط", color: "text-amber-600", bg: "bg-amber-50", message: "جاهزية متوسطة، توجد فجوات تشغيلية تحتاج تنظيم" };
    return { label: "تحتاج ترتيب", color: "text-red-600", bg: "bg-red-50", message: "توجد عدة نقاط تحتاج ترتيب قبل الاعتماد على ممارسات البيانات الحالية" };
  };

  const status = getStatusLabel();

  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, whatsappMessage: string} | null>(null);

  const plans = [
    {
      name: "تشخيص الجاهزية",
      price: "149",
      desc: "لمعرفة وضعك الحالي وأبرز فجوات",
      features: [
        "نتيجة الجاهزية التفصيلية",
        "أهم الفجوات المكتشفة",
        "ملخص التوصيات",
        "معاينة محدودة للمستندات",
      ],
      highlight: false,
      badge: null,
      cta: "اطلب تفعيل التشخيص",
      whatsappMessage: "أبغى أطلب تفعيل تشخيص الجاهزية 149 ريال لمنصة الامتثال الذكي"
    },
    {
      name: "بدء التطبيق",
      price: "299",
      desc: "خطة تنفيذ 14 يوم مع مخرجات جاهزة للاستخدام",
      features: [
        "تقرير جاهزية شامل",
        "خطة عمل لـ 14 يوم",
        "مسودة سياسة الخصوصية",
        "سجل حصر البيانات",
        "صياغة نموذج الموافقة",
        "تصدير PDF",
      ],
      highlight: true,
      badge: "موصى بها",
      cta: "ابدأ تنفيذ خطة الـ 14 يوم",
      whatsappMessage: "أبغى أبدأ حزمة 299 لتنظيم حماية البيانات وخطة تنفيذ 14 يوم"
    },
    {
      name: "حزمة البداية الكاملة",
      price: "499",
      desc: "مخرجات تشغيلية شاملة لملف بداية متكامل",
      features: [
        "كل ما في باقة 299",
        "مخرجات أكثر تفصيلاً",
        "قوائم فحص إضافية",
        "حزمة بداية متكاملة",
      ],
      highlight: false,
      badge: null,
      cta: "اطلب الحزمة التشغيلية",
      whatsappMessage: "أبغى أطلب الحزمة التشغيلية 499 لمنصة الامتثال الذكي"
    },
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    if (!phoneNumber) {
      alert("رقم التواصل غير متاح حاليًا. يرجى المحاولة لاحقًا.");
      return;
    }
    
    if (!selectedPlan) return;

    const encodedMessage = encodeURIComponent(selectedPlan.whatsappMessage);
    
    trackConversionEvent({
      eventName: "whatsapp_click",
      packageId: selectedPlan.price,
      packageName: selectedPlan.name,
      entityType: entityType,
      path: window.location.pathname
    });

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 relative">
      {/* Activation Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-2">
                {selectedPlan.name}
              </h3>
              <div className="text-2xl font-black text-primary mb-6">
                {selectedPlan.price} <span className="text-sm text-gray-400">ريال</span>
              </div>
              
              <p className="font-bold text-gray-700 bg-gray-50 py-3 px-4 rounded-xl mb-4 border border-gray-100">
                التفعيل يتم يدوياً عبر التواصل المباشر.
              </p>
              <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                بعد تأكيد الطلب والدفع، سيتم تفعيل المخرجات والوثائق الخاصة بالباقة المختارة (149، 299، أو 499) لتظهر لك كاملة وقابلة للتحميل.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageSquare size={20} />
                  تواصل عبر واتساب
                </button>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="w-full py-3 text-gray-400 hover:text-gray-600 font-bold transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Score Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden mb-8"
      >
        <div className="p-10 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold text-sm bg-primary/5 text-primary">
            جاهزية الامتثال المبدئية
          </div>
          <div className="relative inline-block mb-8">
             <div className="text-8xl md:text-9xl font-black text-primary">{score}%</div>
             <motion.div 
                className={cn("absolute -top-4 -right-4 px-4 py-1 rounded-lg text-white font-bold text-sm", status.color.replace('text', 'bg'))}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {status.label}
              </motion.div>
          </div>
          <p className="text-gray-500">تم تحليل نشاطك بناءً على متطلبات نظام حماية البيانات السعودي (PDPL).</p>
          <p className="text-xs text-gray-400 mt-4 max-w-lg mx-auto">
            هذه النتائج هي مخرجات استرشادية لمساعدتك على فهم وضعك وتنظيم خطواتك، ولا تعد استشارة قانونية.
          </p>
        </div>
      </motion.div>

      {/* 2. Interpretation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10 mb-8 text-right"
      >
        <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center justify-end gap-2">
          ماذا تعني نتيجتك؟
          <TrendingUp className="text-primary" size={22} />
        </h3>
        <p className="text-gray-700 leading-relaxed font-body">
          {status.message}
        </p>
      </motion.div>

      {/* 3. Top 3 Gaps Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-end gap-2 text-right">
          أهم الفجوات التي تحتاج انتباهك
          <AlertCircle className="text-red-500" size={22} />
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {gaps.map((gap, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm text-right relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-1 h-full bg-red-400 opacity-20" />
              <div className="flex items-center justify-end gap-2 mb-2">
                 <h4 className="font-bold text-gray-900">{gap.category}</h4>
                 {answers[gap.id] === "unknown" && <HelpCircle size={14} className="text-amber-500" />}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">
                {gap.explanation}
              </p>
              <div className="pt-4 border-t border-gray-50 text-[10px] font-bold text-primary">
                 إجراء مقترح: {gap.action}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Impact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-50/50 rounded-[32px] border border-amber-100 p-8 md:p-10 mb-8 text-right"
      >
        <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center justify-end gap-2">
          لماذا هذا مهم؟
          <AlertCircle className="text-amber-500" size={22} />
        </h3>
        <p className="text-gray-700 leading-relaxed font-body">
          هذه الفجوات قد تعني أن جمع بيانات العملاء أو استخدامها أو عرض سياسة الخصوصية غير منظم بالشكل الكافي. الهدف الآن ليس التعقيد، بل ترتيب الأولويات والبدء بخطوات واضحة.
        </p>
      </motion.div>

      {/* 5. Solution Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10 mb-8 text-right"
      >
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-end gap-2">
          الحل المقترح: خطة تنفيذ خلال 14 يوم
          <Target className="text-primary" size={22} />
        </h3>
        <ul className="space-y-4 font-body">
          {[
            "ترتيب الفجوات حسب الأولوية",
            "تجهيز إشعار خصوصية قابل للتعديل",
            "توضيح طريقة التعامل مع بيانات العملاء",
            "خطوات عملية تساعدك تبدأ التنظيم بدون تعقيد",
          ].map((item, i) => (
            <li key={i} className="flex items-center justify-end gap-3 text-sm text-gray-700">
              {item}
              <CheckCircle2 size={16} className="text-primary shrink-0" />
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 5.5 Output Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="mb-16 mt-8"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-2 text-center">معاينة من المخرجات</h3>
        <p className="text-gray-500 text-center mb-8 font-body text-sm max-w-lg mx-auto leading-relaxed">
          هذه عينة مختصرة من المخرجات التي تساعدك على الانتقال من معرفة الفجوات إلى بدء التنظيم العملي.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Preview 1: Privacy Notice */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-right flex flex-col" dir="rtl">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              إشعار خصوصية قابل للتعديل
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed font-body bg-gray-50 p-4 rounded-2xl border border-gray-100 text-right">
              "نستخدم بيانات العملاء لغرض معالجة الطلبات، التواصل بخصوص الخدمة، وتحسين تجربة المستخدم، مع الالتزام بتنظيم الوصول إلى البيانات وعدم استخدامها خارج الأغراض المحددة."
            </p>
          </div>

          {/* Preview 2: 14-day Plan */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-right flex flex-col" dir="rtl">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              خطة تنفيذ 14 يوم
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 font-body bg-gray-50 p-4 rounded-2xl border border-gray-100 list-none">
              <li className="flex items-start gap-2">
                 <span className="text-primary font-black min-w-[60px] shrink-0">يوم 1-2:</span>
                 <span>مراجعة البيانات التي يتم جمعها من العملاء</span>
              </li>
              <li className="flex items-start gap-2">
                 <span className="text-primary font-black min-w-[60px] shrink-0">يوم 3-5:</span>
                 <span>ترتيب سياسة الخصوصية وإشعارات الاستخدام</span>
              </li>
              <li className="flex items-start gap-2">
                 <span className="text-primary font-black min-w-[60px] shrink-0">يوم 6-10:</span>
                 <span>تحديد الفجوات ذات الأولوية</span>
              </li>
              <li className="flex items-start gap-2">
                 <span className="text-primary font-black min-w-[60px] shrink-0">يوم 11-14:</span>
                 <span>تجهيز خطوات العمل والمتابعة</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Blurred/Locked Area */}
        <div className="grid grid-cols-2 gap-4 relative" dir="rtl">
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
             <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full font-bold text-primary shadow-xl flex items-center gap-2 border border-gray-100">
               <Lock size={16} />
               المزيد من المخرجات التشغيلية متوفرة في الباقات
             </div>
          </div>

          {[
            "خارطة التعامل مع البيانات",
            "تحليل الفجوات حسب الأولوية",
            "صيغ التنبيه والموافقة",
            "قائمة مشاركة البيانات مع الأطراف الخارجية"
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-right blur-[3px] select-none pointer-events-none opacity-60 flex items-center gap-2">
               <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                 <Lock size={12} className="text-gray-400" />
               </div>
               <span className="text-xs font-bold text-gray-500 truncate">{item}</span>
            </div>
          ))}
        </div>

        {/* Preview CTA */}
        <div className="text-center mt-10">
           <p className="text-sm font-bold text-gray-600 mb-4 font-body">
             للحصول على المخرجات القابلة للتعديل، اختر الباقة المناسبة وابدأ التفعيل التجريبي.
           </p>
           <button 
             onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-xl"
           >
             اختر الباقة المناسبة
           </button>
        </div>
      </motion.div>

      {/* 6. CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-10 py-8"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-3">
          جاهز تبدأ تنظيم حماية البيانات؟
        </h3>
        <p className="text-gray-500 font-body text-sm max-w-md mx-auto">
          اختر الباقة المناسبة، وسيتم التفعيل التجريبي عبر التواصل المباشر.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-12 h-1 bg-primary/20 rounded-full" />
        </div>
      </motion.div>

      {/* 7. Package Cards */}
      <motion.div
        id="packages"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-12 scroll-mt-8"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative p-8 rounded-[32px] border flex flex-col text-right transition-all",
                plan.highlight
                  ? "border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5 bg-white"
                  : "border-gray-100 bg-white shadow-sm hover:shadow-md"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white font-black text-xs rounded-full shadow-lg flex items-center gap-1">
                  <Star size={10} />
                  {plan.badge}
                </div>
              )}

              <h4 className="text-lg font-black text-gray-900 font-heading mb-1">{plan.name}</h4>
              <p className="text-[10px] text-gray-400 font-body mb-4 leading-tight">{plan.desc}</p>
              <div className="text-3xl font-black text-primary font-heading mb-6">
                {plan.price} <span className="text-sm font-bold text-gray-400">ريال</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1 font-body">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center justify-end gap-2 text-xs text-gray-700">
                    {f}
                    <CheckCircle2 size={13} className={plan.highlight ? "text-primary shrink-0" : "text-gray-300 shrink-0"} />
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  trackConversionEvent({
                    eventName: "package_click",
                    packageId: plan.price,
                    packageName: plan.name,
                    entityType: entityType,
                    path: window.location.pathname
                  });
                  setSelectedPlan({ name: plan.name, price: plan.price, whatsappMessage: plan.whatsappMessage });
                }}
                className={cn(
                  "w-full py-3 rounded-2xl font-black text-sm transition-all",
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-[10px] text-gray-400 mt-8 max-w-2xl mx-auto font-body leading-relaxed">
          المخرجات المقدمة هي مسودات استرشادية لمساعدتك على فهم وضعك وتنظيم خطواتك، ولا تعد استشارة قانونية أو تقييماً نهائياً.
        </p>
      </motion.div>

      {/* Secondary CTA */}
      <div className="text-center">
        <button 
          onClick={onNavigateDocs}
          className="text-primary font-black transition-all flex items-center justify-center gap-2 mx-auto text-lg hover:gap-4"
        >
           معاينة مسودة سياسة الخصوصية
           <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  );
}
