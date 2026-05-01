"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  LayoutDashboard, 
  ClipboardList,
  TrendingUp,
  FileBadge
} from "lucide-react";
import { cn } from "@/lib/utils";
import { governanceStandards } from "./content";
import { updateGovernanceProgress } from "./actions";

interface Props {
  initialAnswers: Record<string, boolean>;
  organizationId: string;
  initialScore: number;
}

export default function GovernanceDashboard({ initialAnswers, organizationId, initialScore }: Props) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [score, setScore] = useState(initialScore);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (id: string) => {
    const newAnswers = { ...answers, [id]: !answers[id] };
    setAnswers(newAnswers);

    startTransition(async () => {
      const result = await updateGovernanceProgress(organizationId, newAnswers);
      if (result.success) {
        setScore(result.score);
      }
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <FileBadge className="text-secondary-dark" size={28} />
             </div>
             <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900">حوكمة القطاع غير الربحي</h1>
                <p className="text-gray-500">
                   نظام تقييم مخصص للجمعيات والمؤسسات الأهلية لقياس الامتثال للمعايير الثلاثة.
                </p>
             </div>
          </div>
        </div>

          <div className="bg-secondary p-8 rounded-[32px] text-white flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
             <p className="text-sm font-bold opacity-80 mb-2">مؤشر الامتثال العام</p>
             <div className="text-6xl font-black mb-2">{score}%</div>
             <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary" 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1 }}
                />
             </div>
             <p className="text-[10px] mt-4 opacity-70 text-center font-medium leading-relaxed">
               مسار Governance Lite هو مسار تجريبي مبسط للجمعيات، ويهدف إلى المساعدة في التنظيم الداخلي.
             </p>
          </div>
        </div>
  
        {/* Standards Checklists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {governanceStandards.map((section) => (
              <div key={section.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                   <span className="text-sm font-bold text-gray-400">{section.items.length} مؤشرات قياس</span>
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
                        answers[item.id] ? "bg-secondary/5" : "hover:bg-gray-50",
                        isPending && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                        answers[item.id] ? "bg-secondary border-secondary" : "border-gray-200 group-hover:border-secondary/50"
                      )}>
                        {answers[item.id] && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <span className={cn(
                        "flex-1 mr-4 font-medium",
                        answers[item.id] ? "text-secondary-dark font-bold" : "text-gray-600"
                      )}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <p className="text-center text-xs text-gray-400 mt-6 font-body leading-relaxed max-w-xl mx-auto">
              * مسار Governance Lite هو مسار تجريبي مبسط للجمعيات والمنظمات غير الربحية، ويهدف إلى المساعدة في التنظيم الداخلي والمراجعة الذاتية. لا يمثل تقييمًا رسميًا أو اعتمادًا من أي جهة تنظيمية.
            </p>
          </div>
  
          <div className="space-y-8">
             {/* Insights */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-end gap-2 text-right">
                تحليل الجاهزية
                <TrendingUp className="text-primary" size={20} />
              </h3>
              <div className="space-y-4">
                 <p className="text-sm text-gray-600 leading-relaxed text-right">
                    الالتزام بمعايير الحوكمة يساهم في زيادة ثقة المانحين ورفع كفاءة العمل الإداري.
                 </p>
                 <button className="w-full mt-4 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
                     عرض التوصيات الأولية
                  </button>
              </div>
            </div>
  
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm border-t-4 border-t-secondary">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-end gap-2 text-right">
                المسار التجريبي
                <ClipboardList className="text-secondary" size={20} />
              </h3>
              <div className="space-y-3">
                 <p className="text-xs text-gray-500 text-right leading-relaxed mb-4">
                   بصفتك جمعية أهلية، يمكنك استخدام هذا المسار تجريبياً لتنظيم الحوكمة الداخلية.
                 </p>
                 <button className="w-full p-4 rounded-xl border-2 border-secondary text-secondary text-center text-sm font-black hover:bg-secondary/5 transition-all">
                    تحميل مسودة التقرير
                 </button>
                 <button 
                  onClick={() => alert("سيتم تفعيل الدفع الإلكتروني للباقات المتقدمة قريباً. هذا المسار مجاني حالياً للجمعيات.")}
                  className="w-full p-4 rounded-xl bg-secondary text-white text-center text-sm font-black hover:bg-secondary/90 transition-all">
                    طلب مراجعة مختص
                 </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
