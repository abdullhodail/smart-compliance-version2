"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  ListChecks, 
  Lock, 
  Download, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EntityType } from "@prisma/client";
import { pdplQuestions } from "./content";

interface Props {
  answers: Record<string, boolean | "unknown">;
  entityType: EntityType;
  businessActivity?: string | null;
  onBack: () => void;
}

type Tab = "policy" | "action-plan" | "inventory" | "consent";

export default function PDPLDocumentGenerator({ answers, entityType, businessActivity, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("policy");

  const getSectorTerms = () => {
    if (entityType === "ECOMMERCE") return { users: "العملاء", activities: "عمليات الشراء والتوصيل", data: "بيانات الطلبات" };
    if (entityType === "NGO") return { users: "المانحين والمستفيدين", activities: "الخدمات الرعوية والبرامج", data: "بيانات المتطوعين" };
    
    // SME Personalized
    switch (businessActivity) {
      case "HEALTHCARE": return { users: "المرضى", activities: "الخدمات الطبية", data: "الملفات الصحية" };
      case "CONSTRUCTION": return { users: "الموظفين والعمالة", activities: "عمليات التشغيل والمشاريع", data: "بيانات المقاولين" };
      case "REAL_ESTATE": return { users: "الملاك والمستأجرين", activities: "الوساطة العقارية", data: "العقود العقارية" };
      case "EDUCATION": return { users: "المتدربين والطلاب", activities: "التدريب والتعليم", data: "سجلات الحضور" };
      case "TRADE": return { users: "العملاء", activities: "المبيعات والتجارة", data: "بيانات الطلبات" };
      case "SERVICES": return { users: "العملاء", activities: "الخدمات الاستشارية", data: "بيانات العقود" };
      default: return { users: "العملاء والموظفين", activities: "الأنظمة الداخلية", data: "السجلات العامة" };
    }
  };

  const terms = getSectorTerms();
  const gaps = pdplQuestions.filter(q => answers[q.id] === false || answers[q.id] === "unknown");

  const documents = {
    policy: {
      title: "مسودة سياسة الخصوصية",
      sections: [
        { title: "1. مقدمة", content: `نحن في [اسم المنشأة] نلتزم بحماية خصوصية ${terms.users} وضمان أمان بياناتهم الشخصية وفقاً لنظام حماية البيانات السعودي (PDPL).` },
        { title: "2. البيانات التي نجمعها", content: `نقوم بجمع البيانات الضرورية فقط لتقديم ${terms.activities}، والتي تشمل ${terms.data}، ومعلومات الاتصال.` },
        { title: "3. الغرض من معالجة البيانات", content: `نستخدم البيانات الشخصية لتحسين جودة ${terms.activities}، والوفاء بالالتزامات النظامية.` },
        { title: "4. حقوق أصحاب البيانات", content: "يحق لك طلب مراجعة بياناتك، تعديلها، أو حذفها عبر القنوات الرسمية الموضحة لدينا." }
      ]
    },
    "action-plan": {
      title: "خطة عمل معالجة الفجوات (14 يوم)",
      steps: [
        { title: "اليوم 1-3: حصر البيانات", desc: `تحديد كافة نقاط جمع ${terms.data} وتوثيق الغرض منها.` },
        { title: "اليوم 4-7: تحديث السياسات", desc: "نشر مسودة سياسة الخصوصية المحدثة وتفعيل إشعارات الموافقة." },
        { title: "اليوم 8-10: تنظيم الوصول", desc: "مراجعة صلاحيات الموظفين والتأكد من أن الوصول للبيانات محصور للمخولين فقط." },
        { title: "اليوم 11-14: تدقيق الأطراف الثالثة", desc: "التواصل مع شركاء التقنية أو التوصيل للتأكد من وجود بنود حماية بيانات." }
      ]
    },
    inventory: {
      title: "سجل حصر البيانات الشخصية",
      items: [
        { type: "بيانات الهوية", purpose: "التحقق من الهوية", storage: "قاعدة البيانات الرئيسية" },
        { type: "بيانات التواصل", purpose: "التواصل وتقديم الخدمة", storage: "نظام CRM / المتجر" },
        { type: terms.data, purpose: "إتمام العمليات التشغيلية", storage: "الأنظمة السحابية" },
        { type: "بيانات تقنية (IP)", purpose: "تحسين تجربة المستخدم", storage: "سجلات الموقع" }
      ]
    },
    consent: {
      title: "صياغة نماذج الموافقة والإشعار",
      forms: [
        { label: "نموذج موافقة تسويقية", text: `أوافق على استلام رسائل حول ${terms.activities} عبر البريد أو الجوال.` },
        { label: "إشعار ملفات الارتباط", text: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في التصفح أنت توافق على ذلك." },
        { label: "نموذج جمع بيانات جديد", text: `يتم جمع هذه البيانات لغرض ${terms.activities} فقط.` }
      ]
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-right">
        <div className="text-right w-full md:w-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2">منشئ المسودات الذكي</h2>
          <p className="text-gray-500 text-sm">مخرجات استرشادية بناءً على تقييمك ونوع نشاطك.</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors flex-row-reverse shrink-0"
        >
          <ChevronRight size={20} className="rotate-180" />
          العودة للنتائج
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-100 p-1.5 rounded-2xl mb-10 gap-2">
        {(Object.keys(documents) as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm",
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab === "policy" && <FileText size={16} />}
            {tab === "action-plan" && <ListChecks size={16} />}
            {tab === "inventory" && <Database size={16} />}
            {tab === "consent" && <MessageSquare size={16} />}
            {tab === "policy" && "سياسة الخصوصية"}
            {tab === "action-plan" && "خطة العمل"}
            {tab === "inventory" && "سجل البيانات"}
            {tab === "consent" && "نماذج الموافقة"}
          </button>
        ))}
      </div>

      {/* Document Preview Area */}
      <div className="bg-white rounded-[40px] border border-gray-200 shadow-2xl overflow-hidden relative min-h-[600px]">
        <div className="p-10 md:p-16">
          <h3 className="text-2xl font-black text-gray-900 mb-10 text-right">{documents[activeTab].title}</h3>
          
          {activeTab === "policy" && (
            <div className="space-y-10 text-right">
              {documents.policy.sections.map((section, idx) => (
                <div key={idx} className={cn(idx > 1 && "blur-[3px] opacity-30 select-none")}>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "action-plan" && (
            <div className="space-y-8 text-right">
              {documents["action-plan"].steps.map((step, idx) => (
                <div key={idx} className={cn("flex items-start gap-4 flex-row-reverse", idx > 1 && "blur-[3px] opacity-30 select-none")}>
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                     <p className="text-gray-600 text-sm">{step.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="overflow-hidden border border-gray-100 rounded-2xl text-right" dir="rtl">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold">
                  <tr>
                    <th className="p-4 text-right">نوع البيانات</th>
                    <th className="p-4 text-right">الغرض</th>
                    <th className="p-4 text-right">مكان الحفظ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {documents.inventory.items.map((item, idx) => (
                    <tr key={idx} className={cn(idx > 1 && "blur-[2px] opacity-30 select-none")}>
                      <td className="p-4 font-bold text-gray-900">{item.type}</td>
                      <td className="p-4 text-gray-600">{item.purpose}</td>
                      <td className="p-4 text-gray-600">{item.storage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "consent" && (
            <div className="space-y-6 text-right">
              {documents.consent.forms.map((form, idx) => (
                <div key={idx} className={cn("p-6 bg-gray-50 rounded-2xl border border-gray-100", idx > 1 && "blur-[3px] opacity-30 select-none")}>
                   <h4 className="text-sm font-bold text-primary mb-3">{form.label}</h4>
                   <p className="text-gray-700 font-mono text-sm">{form.text}</p>
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
              <p className="text-gray-500 mb-8 font-medium text-sm">
                هذه المخرجات هي مسودات استرشادية قابلة للتعديل. النسخة الكاملة تتضمن صياغة متكاملة وجاهزة للنشر والطباعة.
              </p>
              
              <button 
                onClick={() => alert("سيتم تفعيل الدفع الإلكتروني قريبًا. للتفعيل التجريبي تواصل معنا.")}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 pointer-events-auto"
              >
                اطلب تفعيل الباقة
                <Download size={24} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-[10px] text-gray-400 font-bold">
                 <div className="flex items-center gap-1">
                   <ShieldCheck size={14} className="text-green-500" />
                   مسودة إرشادية
                 </div>
                 <div className="flex items-center gap-1">
                   <CheckCircle2 size={14} className="text-green-500" />
                   قالب قابل للتعديل
                 </div>
              </div>
              <p className="mt-6 text-[9px] text-gray-300 leading-relaxed">
                لا تعتبر هذه الوثائق استشارة قانونية مهنية. يجب مراجعتها وتكييفها حسب طبيعة المنشأة وعملياتها الفعلية.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
