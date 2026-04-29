"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LayoutDashboard, FileCheck, Target, Users2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "مسار الحوكمة (Governance)",
    description: "نظام يتعرف على نوع الجهة ويقدم مسار حوكمة مناسب بدون تعقيد إداري، مخصص للقطاع غير الربحي.",
    icon: LayoutDashboard,
    color: "bg-blue-500",
  },
  {
    title: "امتثال حماية البيانات (PDPL)",
    description: "امتثال متكامل لنظام حماية البيانات الشخصية السعودي للمنشآت والمتاجر الإلكترونية والجهات الحكومية.",
    icon: ShieldCheck,
    color: "bg-primary",
  },
  {
    title: "إدارة الشواهد الموحدة",
    description: "تنظيم وحفظ المستندات الإدارية والشواهد في مكان واحد آمن، مما يسهل عملية المراجعة والتدقيق.",
    icon: FileCheck,
    color: "bg-secondary",
  },
  {
    title: "رؤية فورية للجاهزية",
    description: "لوحات معلومات ذكية توضح مستوى الامتثال اللحظي مع توصيات واضحة لسد الفجوات التنظيمية.",
    icon: Zap,
    color: "bg-amber-500",
  },
  {
    title: "تجربة رقمية موجهة",
    description: "مسارات عمل مؤتمتة تقودك خطوة بخطوة نحو تحقيق الامتثال الكامل دون الحاجة لخبرة قانونية عميقة.",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    title: "دعم فني واستشاري",
    description: "فريق من الخبراء متاح لمساندتكم في تطبيق المعايير وتجاوز التحديات الرقابية بكفاءة عالية.",
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
