"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, ShoppingBag, Briefcase, ShieldCheck, LayoutDashboard, Target } from "lucide-react";
import { submitOnboarding } from "./actions";
import { cn } from "@/lib/utils";

interface Props {
  initialData?: {
    organizationName: string;
    entityType: string;
    primaryGoal: string;
  };
}

export default function ClientOnboarding({ initialData }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    organizationName: string;
    entityType: string;
    primaryGoal: string;
    businessActivity?: string;
  }>({
    organizationName: initialData?.organizationName || "",
    entityType: initialData?.entityType || "",
    primaryGoal: initialData?.primaryGoal || "",
    businessActivity: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const entityTypes = [
    { id: "NGO", label: "جمعية / مؤسسة أهلية", icon: Building2 },
    { id: "ECOMMERCE", label: "متجر إلكتروني", icon: ShoppingBag },
    { id: "SME", label: "منشأة صغيرة أو متوسطة", icon: Briefcase },
  ];

  const goals = [
    { id: "GOVERNANCE", label: "مسار الحوكمة المبسطة للجمعيات", description: "تقييم الجاهزية وتحسين ممارسات الحوكمة", icon: LayoutDashboard },
    { id: "PDPL", label: "حماية البيانات الشخصية PDPL", description: "الامتثال لنظام حماية البيانات الشخصية", icon: ShieldCheck },
  ];

  const smeActivities = [
    { id: "SERVICES", label: "خدمات / استشارات" },
    { id: "CONSTRUCTION", label: "مقاولات / تشغيل / صيانة" },
    { id: "REAL_ESTATE", label: "عقار / وساطة عقارية" },
    { id: "EDUCATION", label: "تدريب / تعليم" },
    { id: "HEALTHCARE", label: "رعاية صحية / عيادة" },
    { id: "TRADE", label: "تجارة / مبيعات" },
    { id: "OTHER", label: "أخرى / SME عام" },
  ];

  const handleEntitySelection = (typeId: string) => {
    setFormData({ ...formData, entityType: typeId });
    if (typeId === "ECOMMERCE") {
      // Ecommerce goes straight to PDPL
      setFormData(prev => ({ ...prev, entityType: typeId, primaryGoal: "PDPL" }));
      nextStep();
    } else {
      nextStep();
    }
  };

  const handleSMEActivitySelection = (activityId: string) => {
    setFormData({ ...formData, businessActivity: activityId, primaryGoal: "PDPL" });
    nextStep();
  };

  const getStepTitle = () => {
    if (step === 2) {
      switch (formData.entityType) {
        case "ECOMMERCE": return "ما اسم متجرك؟";
        case "SME": return "ما اسم المنشأة؟";
        case "NGO": return "ما اسم الجمعية؟";
        default: return "ما اسم المنشأة أو النشاط؟";
      }
    }
    return "";
  };

  const getPlaceholder = () => {
    switch (formData.entityType) {
      case "ECOMMERCE": return "مثال: متجر النخبة";
      case "SME": return "مثال: شركة المسار للخدمات";
      case "NGO": return "مثال: جمعية البر الأهلية";
      default: return "مثال: متجر أو منشأة أو جمعية";
    }
  };

  const getConfirmationContent = () => {
    if (formData.entityType === "ECOMMERCE") {
      return {
        title: "جاهز لبدء تقييم متجرِك؟",
        subtitle: "سيبدأ التقييم بمراجعة جاهزية متجرك لحماية بيانات العملاء والطلبات والتوصيل والتسويق."
      };
    }
    if (formData.entityType === "SME") {
      return {
        title: "جاهز لبدء تقييم منشأتك؟",
        subtitle: "سيبدأ التقييم بمراجعة جاهزية منشأتك لحماية بيانات العملاء والموظفين والموردين حسب طبيعة النشاط."
      };
    }
    if (formData.entityType === "NGO") {
      if (formData.primaryGoal === "PDPL") {
        return {
          title: "جاهز لبدء تقييم حماية البيانات؟",
          subtitle: "سيبدأ التقييم بمراجعة جاهزية الجمعية في التعامل مع بيانات المانحين والمستفيدين والمتطوعين."
        };
      }
      return {
        title: "جاهز لبدء مسار الحوكمة المبسطة؟",
        subtitle: "سيبدأ المسار بمراجعة الجوانب الأساسية في الامتثال والشفافية والسلامة المالية."
      };
    }
    return { title: "جاهز للبدء؟", subtitle: "سنقوم الآن ببدء مسار الامتثال المخصص لك." };
  };

  return (
    <form className="p-8 md:p-12 text-right" action={submitOnboarding}>
      {/* Hidden inputs to capture state in FormData */}
      <input type="hidden" name="organizationName" value={formData.organizationName} />
      <input type="hidden" name="entityType" value={formData.entityType} />
      <input type="hidden" name="primaryGoal" value={formData.primaryGoal} />
      <input type="hidden" name="businessActivity" value={formData.businessActivity || ""} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-entity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">اختر نوع الكيان</h2>
              <p className="text-gray-500">نظام الامتثال يختلف بناءً على نوع الكيان القانوني.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {entityTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleEntitySelection(type.id)}
                  className={cn(
                    "flex items-center justify-between p-6 rounded-2xl border-2 transition-all hover:border-primary/50",
                    formData.entityType === type.id ? "border-primary bg-primary/5" : "border-gray-100 bg-white"
                  )}
                >
                  <CheckCircle2 className={cn("text-primary", formData.entityType === type.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex items-center gap-4 text-right">
                      <span className="font-bold text-lg text-gray-800">{type.label}</span>
                      <type.icon size={24} className="text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{getStepTitle()}</h2>
              <p className="text-gray-500">سنقوم بتخصيص التقارير والوثائق بناءً على هذا الاسم.</p>
            </div>
            <input
              type="text"
              name="organizationName"
              required
              autoFocus
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition-all text-xl font-bold text-right"
              placeholder={getPlaceholder()}
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
            />
            <div className="flex flex-col gap-4">
              <button
                type="button"
                disabled={!formData.organizationName}
                onClick={() => {
                  if (formData.entityType === "ECOMMERCE") {
                    setFormData(prev => ({ ...prev, primaryGoal: "PDPL" }));
                    setStep(3); // Go to confirmation
                  } else if (formData.entityType === "SME") {
                    setStep(3); // Go to activity
                  } else if (formData.entityType === "NGO") {
                    setStep(4); // Go to track selection
                  } else {
                    nextStep();
                  }
                }}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                المتابعة
              </button>
              <button type="button" onClick={prevStep} className="text-gray-400 font-medium">الرجوع</button>
            </div>
          </motion.div>
        )}

        {step === 3 && formData.entityType === "SME" && (
          <motion.div
            key="step-sme"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ما نوع نشاط المنشأة الأقرب؟</h2>
              <p className="text-gray-500">سيساعدنا هذا في تخصيص لغة التقييم والوثائق.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smeActivities.map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => handleSMEActivitySelection(activity.id)}
                  className={cn(
                    "flex items-center justify-center p-4 rounded-2xl border-2 transition-all text-center font-bold",
                    formData.businessActivity === activity.id ? "border-primary bg-primary/5 text-primary" : "border-gray-100 bg-white text-gray-600"
                  )}
                >
                  {activity.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={prevStep} className="text-gray-400 font-medium">الرجوع</button>
          </motion.div>
        )}

        {step === 4 && formData.entityType === "NGO" && (
          <motion.div
            key="step-ngo-track"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ما هو هدفك الرئيسي؟</h2>
              <p className="text-gray-500">سنوجهك للمسار الأنسب بناءً على أولوياتك.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, primaryGoal: goal.id });
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center justify-between p-6 rounded-2xl border-2 transition-all hover:border-primary/50",
                    formData.primaryGoal === goal.id ? "border-primary bg-primary/5" : "border-gray-100 bg-white"
                  )}
                >
                  <CheckCircle2 className={cn("text-primary", formData.primaryGoal === goal.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="font-bold text-lg text-gray-800">{goal.label}</p>
                        <p className="text-sm text-gray-500">{goal.description}</p>
                      </div>
                      <goal.icon size={24} className="text-primary" />
                  </div>
                </button>
              ))}
            </div>
            <button type="button" onClick={prevStep} className="text-gray-400 font-medium">الرجوع</button>
          </motion.div>
        )}

        {((step === 5) || (step === 3 && formData.entityType === "ECOMMERCE") || (step === 4 && formData.entityType === "SME")) && (
          <motion.div
            key="step-final"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <ShieldCheck size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{getConfirmationContent().title}</h2>
              <p className="text-gray-500">
                {getConfirmationContent().subtitle}
              </p>
            </div>
            
            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20"
              >
                تأكيد والبدء
              </button>
              <button type="button" onClick={() => {
                if (formData.entityType === "ECOMMERCE") setStep(2);
                else if (formData.entityType === "SME") setStep(3);
                else setStep(4);
              }} className="text-gray-400 font-medium">الرجوع</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
