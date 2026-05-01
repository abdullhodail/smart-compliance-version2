"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pdplQuestions } from "./content";
import { EntityType } from "@prisma/client";

interface Props {
  score: number;
  answers: Record<string, boolean>;
  entityType: EntityType;
  onNavigateDocs: () => void;
}

export default function PDPLResultView({ score, answers, entityType, onNavigateDocs }: Props) {
  const gaps = pdplQuestions
    .filter(q => !answers[q.id])
    .slice(0, 3);

  const getStatusLabel = () => {
    if (score <= 40) return { label: "يحتاج مراجعة", color: "text-red-600", bg: "bg-red-50", message: "وضعك الحالي يتطلب بعض الترتيب والتنظيم." };
    if (score <= 75) return { label: "متوسط", color: "text-amber-600", bg: "bg-amber-50", message: "وضعك الحالي يحتاج بعض التحسينات." };
    return { label: "جيد", color: "text-green-600", bg: "bg-green-50", message: "نشاطك في وضع جيد، وهناك خطوات بسيطة لتنظيمه أكثر." };
  };

  const status = getStatusLabel();

  const plans = [
    {
      name: "الفحص الأساسي",
      price: "149",
      desc: "نتائج جاهزيتك الكاملة مع التوصيات",
      features: [
        "نتيجة الجاهزية التفصيلية",
        "أهم الفجوات المكتشفة",
        "توصيات مختصرة قابلة للتطبيق",
      ],
      highlight: false,
      badge: null,
    },
    {
      name: "باقة البداية",
      price: "299",
      desc: "الأنسب لبدء التنظيم الفعلي",
      features: [
        "تقرير جاهزية شامل",
        "خطة عمل تشغيلية لـ 14 يوم",
        "مسودة سياسة خصوصية قابلة للتعديل",
        "تصدير PDF",
      ],
      highlight: true,
      badge: "الأكثر طلبًا",
    },
    {
      name: "الباقة الكاملة",
      price: "499",
      desc: "لمن يريد تنظيماً شاملاً",
      features: [
        "كل ما في باقة البداية",
        "قوالب إضافية قابلة للتعديل",
        "قائمة فحص حوادث البيانات",
        "قائمة مشاركة البيانات مع الأطراف الخارجية",
      ],
      highlight: false,
      badge: null,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* 1. Result Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden mb-8"
      >
        <div className="p-10 md:p-16 text-center border-b border-gray-50">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold text-sm bg-primary/5 text-primary">
            نتيجة تقييم الجاهزية
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{status.message}</h2>
          <p className="text-gray-500">تم تحليل نشاطك بناءً على متطلبات نظام حماية البيانات السعودي (PDPL).</p>
          <p className="text-xs text-gray-400 mt-4 max-w-lg mx-auto">
            هذه النتائج هي مخرجات استرشادية لمساعدتك على فهم وضعك وتنظيم خطواتك، ولا تعد استشارة قانونية أو شهادة امتثال.
          </p>
        </div>

        {/* 2. Top 3 Gaps Section */}
        <div className="p-10 bg-gray-50/50">
          <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center justify-end gap-2 text-right">
            أبرز الفجوات المكتشفة
            <AlertCircle className="text-red-500" size={20} />
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {gaps.map((gap, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm text-right relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-red-400 opacity-20" />
                <h4 className="font-bold text-gray-900 mb-2">{gap.category}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {gap.labels[entityType]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. What This Means Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm text-right"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
            <TrendingUp className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">ماذا يعني هذا لنشاطك؟</h3>
          <p className="text-gray-600 leading-relaxed">
            هذه الفجوات قد تؤدي إلى ثغرات في كيفية معالجة البيانات الشخصية داخل نشاطك، مما قد يؤثر على ثقة العملاء والتوافق مع المتطلبات الوطنية.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary p-10 rounded-[32px] text-white text-right relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="text-secondary" size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4">الخطوات التالية واضحة</h3>
          <p className="text-white/80 leading-relaxed">
            قمنا بتجهيز خطة عمل تشغيلية ومسودات قابلة للتعديل لمساعدتك في تنظيم خطواتك بشكل عملي ومناسب لنوع نشاطك.
          </p>
        </motion.div>
      </div>

      {/* 4. 3-Tier Paywall */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-2 text-center">فعّل مخرجاتك الآن</h3>
        <p className="text-gray-500 text-center mb-10 font-body">اختر الباقة المناسبة لاحتياجك</p>

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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-white font-black text-xs rounded-full shadow-lg flex items-center gap-1">
                  <Star size={10} />
                  {plan.badge}
                </div>
              )}

              <h4 className="text-lg font-black text-gray-900 font-heading mb-1">{plan.name}</h4>
              <p className="text-xs text-gray-400 font-body mb-4">{plan.desc}</p>
              <div className="text-3xl font-black text-primary font-heading mb-6">
                {plan.price} <span className="text-sm font-bold text-gray-400">ريال</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1 font-body">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center justify-end gap-2 text-sm text-gray-700">
                    {f}
                    <CheckCircle2 size={15} className={plan.highlight ? "text-primary shrink-0" : "text-gray-300 shrink-0"} />
                  </li>
                ))}
              </ul>

              <button
                onClick={() => alert("سيتم تفعيل الدفع الإلكتروني قريبًا. للتفعيل التجريبي تواصل معنا.")}
                className={cn(
                  "w-full py-3 rounded-2xl font-black text-sm transition-all",
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                )}
              >
                اطلب تفعيل الباقة
              </button>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto font-body leading-relaxed">
          المخرجات المقدمة هي أدوات استرشادية لمساعدتك على فهم وضعك وتنظيم خطواتك، ولا تعد استشارة قانونية أو شهادة امتثال.
        </p>
      </motion.div>

      {/* 5. Secondary CTA */}
      <div className="text-center">
        <button 
          onClick={onNavigateDocs}
          className="text-primary font-black transition-all flex items-center justify-center gap-2 mx-auto text-lg hover:gap-4"
        >
           استعرض مسودة سياسة الخصوصية
           <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  );
}
