"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function OutcomeSection() {
  return (
    <section id="outcome" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Mockup / Visual */}
          <div className="flex-1 relative order-2 lg:order-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 md:p-12 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">نتيجة الجاهزية</h4>
                  <p className="text-3xl font-black text-primary">82%</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin-slow" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-900 mb-2">خطة العمل المقترحة</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      تحديث سياسة الخصوصية
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      تعيين مسؤول حماية بيانات
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary text-white rounded-2xl flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold opacity-80">الوثائق الجاهزة</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                  <div className="p-4 bg-secondary text-white rounded-2xl flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold opacity-80">الفجوات المكتشفة</p>
                    <p className="text-xl font-bold">4</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
            </motion.div>
            
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="flex-1 order-1 lg:order-2 text-right">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              مخرجات واضحة <br />
              <span className="text-primary italic">تختصر عليك الجهد</span>
            </motion.h2>

            <div className="space-y-8">
              {[
                {
                  title: "درجة الجاهزية الرقمية",
                  desc: "مؤشر دقيق يوضح مدى توافق نشاطك مع متطلبات حماية البيانات الشخصية.",
                },
                {
                  title: "تحديد الفجوات والمتطلبات",
                  desc: "تقرير مفصل يوضح الجوانب التي تحتاج لتنظيم إداري أو تقني.",
                },
                {
                  title: "خطة عمل مخصصة لنشاطك",
                  desc: "خطوات عملية محددة زمنياً وتوعوياً لتغطية كافة المتطلبات.",
                },
                {
                  title: "وثائق وسياسات نموذجية",
                  desc: "مستندات جاهزة للتعديل والتوقيع، تشمل سياسات الخصوصية ومعالجة البيانات.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <a
                href="/dashboard/pdpl"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              >
                ابدأ رحلتك الآن
                <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
