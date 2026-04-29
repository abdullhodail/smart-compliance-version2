"use client";

import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { value: "2", label: "مسارات رئيسية", sub: "الحوكمة والامتثال" },
    { value: "3", label: "معايير حوكمة", sub: "للقطاع غير الربحي" },
    { value: "100%", label: "تجربة رقمية", sub: "مبسطة وموجهة" },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={idx !== 0 ? "md:border-r md:border-gray-100" : ""}
            >
              <p className="text-5xl font-black text-primary mb-2">{stat.value}</p>
              <p className="text-lg font-bold text-gray-800">{stat.label}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
