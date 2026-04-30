"use client";

import { motion } from "framer-motion";
import { ShieldAlert, FileWarning, Search, HelpCircle, Users, Scale } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "جمع بيانات العملاء بدون تنظيم",
      icon: Search,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "لا توجد سياسة خصوصية واضحة في الموقع",
      icon: FileWarning,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "استخدام البيانات بدون معرفة الطريقة الصحيحة",
      icon: ShieldAlert,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "الاعتماد على اجتهادات شخصية غير موثقة",
      icon: HelpCircle,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "مخاطر قانونية أو فقدان ثقة العملاء",
      icon: Scale,
      color: "bg-gray-50 text-gray-600",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-right max-w-3xl ml-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-6 font-heading"
          >
            لماذا يجب أن تهتم بخصوصية البيانات الآن؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-body leading-relaxed"
          >
            مع بدء تطبيق متطلبات حماية البيانات في السعودية بشكل فعلي، أصبح من المهم معرفة وضعك وتصحيح الأخطاء مبكرًا لتجنب أي تعقيدات قد تواجه نشاطك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-end text-right"
            >
              <div className={`w-14 h-14 rounded-2xl ${problem.color} flex items-center justify-center mb-6`}>
                <problem.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">{problem.title}</h3>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-primary p-8 rounded-[32px] shadow-sm text-white flex flex-col items-end text-right lg:col-span-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3 italic">لا تترك نشاطك للمصادفة</h3>
            <p className="text-white/80 font-body text-sm leading-relaxed">
              انضم للمنشآت التي بدأت فعلياً في تنظيم بياناتها وضمان ثقة عملائها.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
