"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, PieChart, LayoutList, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "1. جاوب على أسئلة بسيطة",
    description: "أسئلة مباشرة وسهلة حول طريقة تعاملك مع البيانات، مصممة لأصحاب الأعمال وليس لخبراء القانون.",
    icon: ClipboardCheck,
    color: "bg-primary",
  },
  {
    title: "2. اعرف نتيجتك فوراً",
    description: "تحليل ذكي يوضح لك مستوى الجاهزية الحالي ويحدد مواطن القوة والفجوات التي تحتاج لتنظيم.",
    icon: PieChart,
    color: "bg-secondary",
  },
  {
    title: "3. احصل على خطة عمل",
    description: "توصيات واضحة ومرتبة بالخطوات العملية التي تحتاج اتخاذها لتحقيق الامتثال الكامل.",
    icon: LayoutList,
    color: "bg-blue-600",
  },
  {
    title: "4. وثائق جاهزة للتطبيق",
    description: "احصل على مسودات لسياسات الخصوصية واتفاقيات معالجة البيانات جاهزة للاستخدام في نشاطك.",
    icon: FileText,
    color: "bg-teal-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            كيف تساعدك منصة الامتثال الذكي؟
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            بسطنا رحلة الامتثال لتكون عملية واضحة تبدأ بتقييم بسيط وتنتهي بتنظيم كامل لمتطلبات حماية البيانات.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-black/5",
                step.color
              )}>
                <step.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
