"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "التقييم الأساسي",
      price: "مجاناً",
      desc: "اعرف وضع نشاطك الحالي خلال دقائق",
      features: [
        "تقييم كامل للامتثال (PDPL)",
        "مؤشر الجاهزية الرقمي",
        "تحليل أولي للفجوات",
        "دليل الاستخدام الأساسي"
      ],
      cta: "ابدأ الآن",
      href: "/dashboard/pdpl",
      highlight: false
    },
    {
      name: "باقة الامتثال الكاملة",
      price: "499 ريال",
      desc: "كل ما تحتاجه لسد الفجوات القانونية",
      badge: "عرض إطلاق محدود",
      features: [
        "خطة عمل تفصيلية (Action Plan)",
        "سياسة خصوصية جاهزة للنشر",
        "تقرير الجاهزية الشامل (PDF)",
        "تحديثات مستمرة للأنظمة",
        "دعم فني متخصص"
      ],
      cta: "احصل على الباقة",
      href: "/dashboard/pdpl",
      highlight: true
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-heading"
          >
            باقات بسيطة وشفافة
          </motion.h2>
          <p className="text-gray-600 font-body">ابدأ بتقييم نشاطك مجاناً، وقم بالترقية متى ما احتجت للوثائق الكاملة.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 rounded-[40px] border ${
                plan.highlight 
                  ? "border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5" 
                  : "border-gray-100 bg-gray-50/50"
              } text-right flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-secondary text-white font-black text-xs rounded-full shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-end gap-1 mb-4">
                  <span className="text-4xl font-black text-primary font-heading">{plan.price}</span>
                </div>
                <p className="text-gray-500 text-sm font-body">{plan.desc}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-end gap-3 text-gray-700 font-medium text-sm">
                    {feature}
                    <CheckCircle2 size={18} className={plan.highlight ? "text-primary" : "text-gray-400"} />
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-4 rounded-2xl font-black text-center transition-all ${
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary-light shadow-xl shadow-primary/20"
                    : "bg-white text-gray-900 border-2 border-gray-100 hover:border-primary/20"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
