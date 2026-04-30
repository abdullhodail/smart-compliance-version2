"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  ListChecks, 
  Lock, 
  Download, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EntityType } from "@prisma/client";
import { pdplQuestions } from "./content";

interface Props {
  answers: Record<string, boolean>;
  entityType: EntityType;
  onBack: () => void;
}

export default function PDPLDocumentGenerator({ answers, entityType, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<"policy" | "action-plan">("policy");

  const getSectorTerms = () => {
    switch (entityType) {
      case "ECOMMERCE": return { users: "العملاء", activities: "عمليات الشراء والتوصيل" };
      case "NGO": return { users: "المانحين والمستفيدين", activities: "الخدمات الرعوية والبرامج" };
      default: return { users: "العملاء والموظفين", activities: "الأنظمة الداخلية والخدمات" };
    }
  };

  const terms = getSectorTerms();
  const gaps = pdplQuestions.filter(q => !answers[q.id]);

  const policyContent = [
    { title: "1. مقدمة", content: `نحن في [اسم المنشأة] نلتزم بحماية خصوصية ${terms.users} وضمان أمان بياناتهم الشخصية وفقاً لنظام حماية البيانات السعودي (PDPL).` },
    { title: "2. البيانات التي نجمعها", content: `نقوم بجمع البيانات الضرورية فقط لتقديم ${terms.activities}، والتي تشمل الاسم، ومعلومات الاتصال، وأي بيانات فنية أخرى لازمة.` },
    { title: "3. الغرض من معالجة البيانات", content: "نستخدم البيانات الشخصية لتحسين جودة الخدمة، والتواصل مع أصحاب البيانات، والوفاء بالالتزامات النظامية." },
    { title: "4. مشاركة البيانات مع أطراف ثالثة", content: "قد نشارك بعض البيانات مع مزودي خدمات موثوقين (مثل شركات التقنية أو التوصيل) لضمان تقديم الخدمة بكفاءة." },
    { title: "5. حقوق أصحاب البيانات", content: "يحق لك طلب مراجعة بياناتك، تعديلها، أو حذفها في أي وقت عبر التواصل معنا مباشرة." }
  ];

  const actionSteps = [
    { title: "تفعيل سياسة الخصوصية", desc: "نشر مسودة السياسة المحدثة في كافة قنوات التواصل مع المستفيدين." },
    { title: "تنظيم سجلات المعالجة", desc: "إنشاء سجل داخلي يوضح كافة أنواع البيانات التي يتم جمعها والغرض منها." },
    { title: "تحديث اتفاقيات الأطراف الثالثة", desc: "التأكد من وجود بنود حماية بيانات في العقود مع مزودي الخدمات." },
    { title: "بروتوكول حماية الوصول", desc: "تفعيل صلاحيات الوصول المقيدة لضمان أن الموظفين المعنيين فقط هم من يصلون للبيانات." },
    { title: "خطة الاستجابة للحوادث", desc: "تجهيز إجراءات واضحة للتعامل مع أي تسرب محتمل للبيانات وإبلاغ الجهات المعنية." }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="text-right">
          <h2 className="text-3xl font-black text-gray-900 mb-2">منشئ الوثائق الذكي</h2>
          <p className="text-gray-500">وثائق جاهزة للتطبيق تم إعدادها بناءً على تقييمك الأخير.</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors"
        >
          العودة للنتائج
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10 max-w-md mx-auto flex-row-reverse">
        <button
          onClick={() => setActiveTab("policy")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            activeTab === "policy" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <FileText size={18} />
          سياسة الخصوصية
        </button>
        <button
          onClick={() => setActiveTab("action-plan")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            activeTab === "action-plan" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <ListChecks size={18} />
          خطة العمل
        </button>
      </div>

      {/* Document Preview Area */}
      <div className="bg-white rounded-[40px] border border-gray-200 shadow-2xl overflow-hidden relative min-h-[600px]">
        <div className="p-10 md:p-16">
          {activeTab === "policy" ? (
            <div className="space-y-10 text-right">
              {policyContent.map((section, idx) => (
                <div key={idx} className={cn(idx > 1 && "blur-[3px] opacity-30 select-none")}>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8 text-right">
              <h3 className="text-2xl font-black text-primary mb-8">خطة معالجة الفجوات التنظيمية</h3>
              {actionSteps.map((step, idx) => (
                <div key={idx} className={cn("flex items-start gap-4 flex-row-reverse", idx > 1 && "blur-[3px] opacity-30 select-none")}>
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                     <p className="text-gray-600">{step.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Paywall Overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-end justify-center pb-20 pointer-events-none">
           <div className="max-w-lg w-full bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center pointer-events-auto">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <Lock className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-2">احصل على الوثيقة كاملة</h4>
              <p className="text-gray-500 mb-8 font-medium">
                هذا استعراض بسيط. النسخة الكاملة تتضمن صياغة قانونية متكاملة وجاهزة للنشر والطباعة.
              </p>
              
              <button className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20">
                فتح الوصول الكامل
                <Download size={24} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400 font-bold">
                 <div className="flex items-center gap-1">
                   <ShieldCheck size={14} className="text-green-500" />
                   صياغة سعودية معتمدة
                 </div>
                 <div className="flex items-center gap-1">
                   <CheckCircle2 size={14} className="text-green-500" />
                   تحميل بصيغة PDF
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
