"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, ShoppingBag, Briefcase, ShieldCheck, LayoutDashboard, Target } from "lucide-react";
import { submitOnboarding } from "./actions";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    entityType: "",
    primaryGoal: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const entityTypes = [
    { id: "NGO", label: "جمعية / مؤسسة أهلية", icon: Building2 },
    { id: "ECOMMERCE", label: "متجر إلكتروني", icon: ShoppingBag },
    { id: "SME", label: "منشأة صغيرة أو متوسطة", icon: Briefcase },
  ];

  const goals = [
    { id: "GOVERNANCE", label: "الحوكمة", description: "تقييم الجاهزية وتحسين ممارسات الحوكمة", icon: LayoutDashboard },
    { id: "PDPL", label: "حماية البيانات الشخصية", description: "الامتثال لنظام حماية البيانات الشخصية", icon: ShieldCheck },
    { id: "FULL", label: "تقييم شامل", description: "حوكمة وامتثال متكامل لكافة المسارات", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="mb-12 flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={48} height={48} />
        <h1 className="text-2xl font-bold text-primary">إعداد الحساب</h1>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 flex overflow-hidden">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 transition-all duration-500",
                step >= s ? "bg-primary" : "bg-transparent"
              )}
            />
          ))}
        </div>

        <form className="p-8 md:p-12 text-right" action={submitOnboarding}>
           {/* Hidden inputs to capture state in FormData */}
           <input type="hidden" name="entityType" value={formData.entityType} />
           <input type="hidden" name="primaryGoal" value={formData.primaryGoal} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">ما هو اسم جهتك؟</h2>
                  <p className="text-gray-500">سنقوم بتخصيص التقارير بناءً على اسم الجهة.</p>
                </div>
                <input
                  type="text"
                  name="organizationName"
                  required
                  autoFocus
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition-all text-xl font-bold text-right"
                  placeholder="مثال: جمعية البر الأهلية"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                />
                <button
                  type="button"
                  disabled={!formData.organizationName}
                  onClick={nextStep}
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  المتابعة
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
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
                      onClick={() => {
                        setFormData({ ...formData, entityType: type.id });
                        nextStep();
                      }}
                      className={cn(
                        "flex items-center justify-between p-6 rounded-2xl border-2 transition-all hover:border-primary/50",
                        formData.entityType === type.id ? "border-primary bg-primary/5" : "border-gray-100 bg-white"
                      )}
                    >
                      <CheckCircle2 className={cn("text-primary", formData.entityType === type.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex items-center gap-4">
                         <span className="font-bold text-lg text-gray-800">{type.label}</span>
                         <type.icon size={24} className="text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={prevStep} className="text-gray-400 font-medium">الرجوع</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
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
                      onClick={() => setFormData({ ...formData, primaryGoal: goal.id })}
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
                <div className="pt-4 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={!formData.primaryGoal}
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 disabled:opacity-50"
                  >
                    تأكيد والبدء
                  </button>
                  <button type="button" onClick={prevStep} className="text-gray-400 font-medium">الرجوع</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
