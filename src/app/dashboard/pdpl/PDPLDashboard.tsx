"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Crown,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pdplTemplates } from "./content";
import { updatePDPLProgress } from "./actions";
import { EntityType } from "@prisma/client";

interface Props {
  initialAnswers: Record<string, boolean>;
  organizationId: string;
  initialScore: number;
  entityType: EntityType;
}

export default function PDPLDashboard({ 
  initialAnswers, 
  organizationId, 
  initialScore,
  entityType 
}: Props) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [score, setScore] = useState(initialScore);
  const [isPending, startTransition] = useTransition();

  const sections = pdplTemplates[entityType];

  const handleToggle = async (id: string) => {
    const newAnswers = { ...answers, [id]: !answers[id] };
    setAnswers(newAnswers);

    startTransition(async () => {
      const result = await updatePDPLProgress(organizationId, entityType, newAnswers);
      if (result.success) {
        setScore(result.score);
      }
    });
  };

  const missingCriticalItems = sections
    .flatMap(s => s.items)
    .filter(item => !answers[item.id] && item.weight >= 15);

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-primary" size={28} />
             </div>
             <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900">
                   جاهزية الامتثال (PDPL)
                </h1>
                <p className="text-gray-500">
                   دليل استرشادي لتنظيم وقياس مستوى الامتثال لنظام حماية البيانات السعودي.
                </p>
                <p className="text-[10px] text-gray-400 mt-2">
                   * ملاحظة: هذا التقييم دليل للجاهزية ولا يعتبر استشارة قانونية مهنية.
                </p>
             </div>
          </div>
        </div>

        <div className="bg-primary p-8 rounded-[32px] text-white flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
           <p className="text-sm font-bold opacity-80 mb-2">مؤشر الجاهزية الرقمي</p>
           <div className="text-6xl font-black mb-2">{score}%</div>
           <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-secondary" 
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
              />
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h2 className="text-xl font-black text-gray-900 text-right">
                مسار: {entityType === "NGO" ? "القطاع غير الربحي" : entityType === "ECOMMERCE" ? "التجارة الإلكترونية" : "المنشآت المتوسطة والصغيرة"}
             </h2>
          </div>
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                 <span className="text-sm font-bold text-gray-400">{section.items.length} متطلبات عملية</span>
                 <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="p-2">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    disabled={isPending}
                    onClick={() => handleToggle(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl transition-all group text-right",
                      answers[item.id] ? "bg-primary/5" : "hover:bg-gray-50",
                      isPending && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                      answers[item.id] ? "bg-primary border-primary" : "border-gray-200 group-hover:border-primary/50"
                    )}>
                      {answers[item.id] && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                    <span className={cn(
                      "flex-1 mr-4 font-medium",
                      answers[item.id] ? "text-primary font-bold" : "text-gray-600"
                    )}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-end gap-2 text-right">
              تحليل الفجوات والمخاطر
              <AlertTriangle className="text-amber-500" size={20} />
            </h3>
            {missingCriticalItems.length > 0 ? (
              <div className="space-y-4">
                {missingCriticalItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-right">
                    <p className="text-sm font-bold text-amber-900 mb-1">{item.label}</p>
                    <p className="text-xs text-amber-700">يتطلب هذا البند اهتماماً فورياً لتحسين مستوى الجاهزية.</p>
                  </div>
                ))}
                <button className="w-full mt-4 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
                   عرض خطة العمل الكاملة
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                 <CheckCircle2 className="mx-auto text-green-500 mb-2" size={32} />
                 <p className="text-sm text-gray-500 font-medium">جاهزية عالية - لا توجد فجوات حرجة</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[32px] text-white relative overflow-hidden shadow-xl">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                   <Crown className="text-secondary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-right">الباقة المتقدمة</h3>
                <p className="text-white/60 text-sm text-right leading-relaxed mb-8">
                   افتح التقرير التفصيلي المتكامل مع النماذج القانونية الجاهزة للتطبيق الفوري.
                </p>
                <button className="w-full py-4 bg-secondary text-gray-900 font-black rounded-2xl hover:scale-[1.02] transition-all">
                   الترقية للحصول على التقرير
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
