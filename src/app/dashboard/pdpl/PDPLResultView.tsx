"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  FileText, 
  Download, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck
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
  // Identify top 3 gaps (questions answered 'false')
  const gaps = pdplQuestions
    .filter(q => !answers[q.id])
    .slice(0, 3);

  const getStatusLabel = () => {
    if (score <= 40) return { label: "منخفض", color: "text-red-600", bg: "bg-red-50", message: "وضعك الحالي يتطلب اهتماماً فورياً." };
    if (score <= 75) return { label: "متوسط", color: "text-amber-600", bg: "bg-amber-50", message: "وضعك الحالي يحتاج بعض التحسينات." };
    return { label: "جيد", color: "text-green-600", bg: "bg-green-50", message: "نشاطك في وضع جيد، ولكن هناك تفاصيل للامتثال الكامل." };
  };

  const status = getStatusLabel();

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
        </div>

        {/* 2. Top 3 Gaps Section */}
        <div className="p-10 bg-gray-50/50">
          <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center justify-end gap-2 text-right">
            أبرز الفجوات المكتشفة
            <AlertCircle className="text-red-500" size={20} />
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {gaps.map((gap, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm text-right relative overflow-hidden group">
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
            هذه الفجوات قد تؤدي إلى فقدان ثقة العملاء أو وجود ثغرات تنظيمية في كيفية معالجة البيانات الشخصية داخل نشاطك، مما قد يؤثر على استدامة العمل وتوافقه مع المتطلبات الوطنية.
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
          <h3 className="text-xl font-bold mb-4">الحل بسيط وواضح</h3>
          <p className="text-white/80 leading-relaxed">
            قمنا بتجهيز خطة عمل مخصصة ونماذج قانونية جاهزة لسد هذه الفجوات بخطوات عملية واضحة، مصممة خصيصاً لنوع نشاطك الحالي.
          </p>
        </motion.div>
      </div>

      {/* 5. Paywall Integration & Previews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[40px] border border-gray-200 shadow-2xl overflow-hidden relative"
      >
        <div className="p-10 md:p-12">
          <h3 className="text-2xl font-black text-gray-900 mb-8 text-right">محتويات خطة الامتثال الكاملة</h3>
          
          <div className="grid md:grid-cols-2 gap-6 opacity-40 blur-[1px] pointer-events-none select-none">
             {[
               { title: "سياسة الخصوصية للموقع", icon: FileText },
               { title: "خطة معالجة البيانات", icon: FileCheck },
               { title: "تقرير تحليل الفجوات الشامل", icon: TrendingUp },
               { title: "اتفاقية معالجة بيانات (DPA)", icon: FileText },
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4 p-6 border border-gray-100 rounded-2xl bg-gray-50 flex-row-reverse">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <span className="font-bold text-gray-800 text-right">{item.title}</span>
               </div>
             ))}
          </div>

          {/* Paywall Overlay */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-6">
             <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Lock className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-2">افتح تقريرك الكامل الآن</h4>
                <p className="text-gray-500 mb-8 font-medium">احصل على كافة النماذج والوثائق المطلوبة فوراً.</p>
                
                {/* 7. Pricing Display */}
                <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 px-3 py-1 bg-secondary text-white text-[10px] font-black rounded-bl-xl">
                      عرض إطلاق محدود
                   </div>
                   <p className="text-sm font-bold text-gray-400 mb-1">باقة الوصول المبكر (عرض خاص)</p>
                   <div className="text-4xl font-black text-primary">499 ريال</div>
                   <p className="text-[11px] text-amber-600 font-bold mt-1">متاح لعدد محدود من الجهات خلال المرحلة التجريبية</p>
                   <ul className="mt-4 space-y-2 text-sm text-gray-600 font-medium">
                      <li className="flex items-center justify-center gap-2">
                        <span>تقرير الجاهزية الشامل</span>
                        <CheckCircle2 size={14} className="text-green-500" />
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span>سياسة الخصوصية جاهزة</span>
                        <CheckCircle2 size={14} className="text-green-500" />
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span>خطة عمل منظمة</span>
                        <CheckCircle2 size={14} className="text-green-500" />
                      </li>
                   </ul>
                </div>

                <button 
                  onClick={onNavigateDocs}
                  className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-3 text-lg mb-4"
                >
                  احصل على الخطة الكاملة
                  <Download size={24} />
                </button>
                <div className="flex items-center justify-center gap-2 text-amber-600 text-xs font-bold mb-4">
                  <AlertCircle size={14} />
                  <span>متاح حالياً لفترة محدودة</span>
                </div>
                <p className="text-xs text-gray-400 font-bold">
                   "أغلب الجهات تبدأ من نفس هذه المرحلة، وإصلاح هذه النقاط بسيط عند وضوح الخطوات."
                </p>
             </div>
          </div>
        </div>
      </motion.div>

      {/* 8. Secondary CTA & Reinforcement */}
      <div className="mt-12 text-center">
        <button 
          onClick={onNavigateDocs}
          className="text-primary font-black hover:gap-4 transition-all flex items-center justify-center gap-2 mx-auto text-lg"
        >
           توليد سياسة الخصوصية فقط
           <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  );
}
