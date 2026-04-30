"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ابدأ بتأمين امتثالك اليوم
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            لا تترك نشاطك للفجوات التنظيمية. اعرف جاهزيتك في دقائق معدودة وابدأ تنظيم متطلبات حماية البيانات بكل سهولة.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/dashboard/pdpl"
              className="w-full sm:w-auto px-12 py-5 bg-secondary text-white font-bold rounded-2xl shadow-2xl shadow-black/10 hover:bg-secondary-light hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              ابدأ التقييم المجاني
              <ArrowLeft size={24} />
            </Link>
          </div>
          
          <p className="mt-8 text-white/60 text-sm font-medium">
            * لا يتطلب التقييم أي خبرة قانونية سابقة
          </p>
        </motion.div>
      </div>
    </section>
  );
}
