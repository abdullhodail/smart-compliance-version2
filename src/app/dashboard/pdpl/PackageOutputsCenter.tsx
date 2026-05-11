"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  FileText, 
  ClipboardCheck, 
  ShieldCheck, 
  Map, 
  Bell, 
  CheckCircle2,
  AlertCircle,
  Layout,
  Users,
  BookOpen,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OutputItem {
  id: string;
  title: string;
  minPrice: number;
  icon: any;
  category: string;
}

const ALL_OUTPUTS: OutputItem[] = [
  // 149 Level
  { id: "brief-report", title: "تقرير مختصر", minPrice: 149, icon: FileText, category: "التحليل" },
  { id: "top-gaps", title: "أهم الفجوات", minPrice: 149, icon: AlertCircle, category: "التحليل" },
  { id: "initial-rec", title: "توصيات أولية", minPrice: 149, icon: CheckCircle2, category: "التحليل" },
  
  // 299 Level
  { id: "full-report", title: "تقرير جاهزية PDPL", minPrice: 299, icon: ShieldCheck, category: "التحليل" },
  { id: "priority-analysis", title: "تحليل الفجوات حسب الأولوية", minPrice: 299, icon: ClipboardCheck, category: "التحليل" },
  { id: "14day-plan", title: "خطة تنفيذ 14 يوم", minPrice: 299, icon: Map, category: "أدوات التنفيذ" },
  { id: "privacy-notice", title: "إشعار خصوصية قابل للتعديل", minPrice: 299, icon: FileText, category: "السياسات" },
  { id: "data-map", title: "خارطة التعامل مع البيانات", minPrice: 299, icon: Map, category: "أدوات التنفيذ" },
  { id: "consent-forms", title: "صيغ التنبيه والموافقة", minPrice: 299, icon: Bell, category: "السياسات" },
  
  // 499 Level
  { id: "checklists", title: "قوائم التشغيل المتقدمة", minPrice: 499, icon: ClipboardCheck, category: "أدوات التنفيذ" },
  { id: "site-texts", title: "نصوص الموقع", minPrice: 499, icon: Layout, category: "السياسات" },
  { id: "external-sharing", title: "قائمة مشاركة البيانات مع الأطراف الخارجية", minPrice: 499, icon: Users, category: "العمليات" },
  { id: "dsr-guide", title: "دليل طلبات أصحاب البيانات", minPrice: 499, icon: BookOpen, category: "العمليات" },
  { id: "entity-specific", title: "مخرجات إضافية حسب نوع المنشأة", minPrice: 499, icon: Plus, category: "العمليات" },
];

export default function PackageOutputsCenter() {
  const [selectedPackage, setSelectedPackage] = useState<149 | 299 | 499>(299);

  const categories = ["التحليل", "أدوات التنفيذ", "السياسات", "العمليات"];

  const packages = [
    { price: 149, label: "تشخيص الجاهزية" },
    { price: 299, label: "بداية التطبيق" },
    { price: 499, label: "الحزمة الكاملة" },
  ];

  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mt-16 mb-20 relative px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary font-bold text-sm mb-4"
          >
            <Layout size={16} />
            مركز المخرجات
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">مركز المخرجات</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed font-body text-sm">
            استكشف المخرجات المتاحة حسب الباقة المختارة، وما يمكن تفعيله بعد تأكيد الطلب.
          </p>
        </div>

        {/* Package Selector (Tabs) */}
        <div className="flex justify-center mb-12 p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-3xl w-fit mx-auto border border-gray-200">
          {packages.map((pkg) => (
            <button
              key={pkg.price}
              onClick={() => setSelectedPackage(pkg.price as any)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-black transition-all relative",
                selectedPackage === pkg.price 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {selectedPackage === pkg.price && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white shadow-md rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{pkg.label}</span>
              <span className="relative z-10 block text-[10px] font-bold opacity-60 mt-0.5">{pkg.price} ريال</span>
            </button>
          ))}
        </div>

        {/* Manual Activation Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedPackage}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold font-body">
            <Bell size={14} />
            المخرجات يتم تفعيلها بعد تأكيد الطلب عبر واتساب، وتختلف حسب الباقة المختارة.
          </div>
        </motion.div>

        {/* Outputs Grid */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catOutputs = ALL_OUTPUTS.filter(o => o.category === cat);
            if (catOutputs.length === 0) return null;

            return (
              <div key={cat} className="text-right">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center justify-end gap-2 pr-2 border-r-4 border-primary/20">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catOutputs.map((item) => {
                    const isLocked = item.minPrice > selectedPackage;
                    const Icon = item.icon;

                    return (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={cn(
                          "relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-end text-right h-full overflow-hidden group",
                          isLocked 
                            ? "bg-gray-50/50 border-gray-100 opacity-75 grayscale-[0.3]" 
                            : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
                        )}
                      >
                        {/* Background Decoration */}
                        <div className={cn(
                          "absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-5 blur-3xl transition-all group-hover:scale-150",
                          isLocked ? "bg-gray-400" : "bg-primary"
                        )} />

                        {/* Icon & Status */}
                        <div className="flex items-center justify-between w-full mb-4">
                          <div className={cn(
                            "w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                            isLocked ? "bg-gray-200/50 text-gray-500" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                          )}>
                            <Icon size={20} />
                          </div>
                          {isLocked ? (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                              <Lock size={10} />
                              متاح في باقة أعلى
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">
                              <CheckCircle2 size={10} />
                              مشمول في الباقة
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className={cn(
                          "font-black text-sm mb-2 transition-colors",
                          isLocked ? "text-gray-500" : "text-gray-900 group-hover:text-primary"
                        )}>
                          {item.title}
                        </h4>

                        {/* Description (Static for now to keep UI clean) */}
                        <p className={cn(
                          "text-[11px] font-body leading-relaxed",
                          isLocked ? "text-gray-400" : "text-gray-500"
                        )}>
                          {isLocked 
                            ? "قم بترقية الباقة للحصول على هذا المخرج القابل للتعديل."
                            : "مخرج عملي جاهز للتخصيص حسب نشاطك."
                          }
                        </p>

                        {/* Visual Lock Overlay */}
                        {isLocked && (
                          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToPackages}
            className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-gray-800 transition-all flex items-center gap-3 mx-auto"
          >
            اختر الباقة المناسبة لتفعيل المخرجات
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.button>
          <p className="mt-6 text-xs text-gray-400 font-body">
            تذكر: المخرجات هي مسودات استرشادية تساعدك على البدء، وليست استشارة قانونية.
          </p>
        </div>
      </div>
    </section>
  );
}
