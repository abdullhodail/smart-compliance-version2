"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustChips() {
  const chips = [
    "مصمم للسوق السعودي",
    "متوافق مع نظام حماية البيانات (PDPL)",
    "دعم فني واستشاري مخصص",
    "تحديثات مستمرة حسب الأنظمة",
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-bold text-gray-800 mb-8">
          لماذا تختار منصة الامتثال الذكي؟
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {chips.map((chip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm md:text-base font-bold text-gray-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-default"
            >
              <CheckCircle2 className="w-5 h-5 text-primary" />
              {chip}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
