"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LayoutDashboard, FileCheck, Target, Users2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "مسار الحوكمة (Governance Lite)",
    description: "تشخيص سريع وشامل لجاهزية الحوكمة في الجمعيات والمؤسسات الأهلية مع خطة عمل واضحة.",
    icon: LayoutDashboard,
    color: "bg-blue-500",
  },
  {
    title: "امتثال حماية البيانات (PDPL)",
    description: "امتثال متكامل لنظام حماية البيانات الشخصية السعودي للمنشآت والجهات الحكومية والخاصة.",
    icon: ShieldCheck,
    color: "bg-primary",
  },
  {
    title: "إدارة الشواهد الذكية",
    description: "أتمتة عملية رفع ومراجعة الشواهد والوثائق الإدارية لضمان استمرارية الامتثال.",
    icon: FileCheck,
    color: "bg-secondary",
  },
  {
    title: "تقارير الجاهزية الفورية",
    description: "لوحات معلومات تفاعلية توضح فجوات الامتثال وتوصيات التحسين بشكل لحظي.",
    icon: Zap,
    color: "bg-amber-500",
  },
  {
    title: "تخصيص حسب نوع الكيان",
    description: "تجربة مخصصة لكل نوع من أنواع الكيانات (جمعيات، متاجر إلكترونية، شركات متوسطة).",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    title: "دعم فني واستشاري",
    description: "فريق متخصص لمساندتكم في رحلة الامتثال وتجاوز التحديات التنظيمية.",
    icon: Users2,
    color: "bg-teal-500",
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
            حلول رقمية متكاملة لبيئة أعمال نظامية
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            صممنا منصة الامتثال الذكي لتكون رفيقكم في رحلة التحول الرقمي والتنظيمي، مع التركيز على الكفاءة والبساطة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-black/5",
                feature.color
              )}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
