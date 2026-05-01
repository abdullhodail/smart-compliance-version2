"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="lg:w-1/2 text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 font-heading">
                اعرف جاهزية نشاطك لحماية بيانات العملاء خلال <span className="text-primary italic">5 دقائق</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-body">
                تقييم مبسط بدون تعقيد قانوني يوضح لك وضعك ويعطيك خطة عمل واضحة.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-end">
                <Link
                  href="/register?next=/dashboard/pdpl"
                  className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all flex items-center gap-2 group text-lg shadow-xl shadow-primary/20"
                >
                  ابدأ التقييم الآن
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Visual Preview Card */}
          <div className="lg:w-1/2 relative w-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full"
            >
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden max-w-md mx-auto w-full">
                {/* Header */}
                <div className="p-8 bg-primary text-white text-center">
                  <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest font-body">مؤشر الجاهزية الرقمي</p>
                  <div className="text-6xl font-black mb-4 font-heading">62%</div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary" 
                      initial={{ width: 0 }}
                      animate={{ width: "62%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                </div>

                {/* Gaps */}
                <div className="p-8 space-y-6 text-right">
                  <h4 className="text-lg font-black text-gray-900 flex items-center justify-end gap-2 font-heading">
                    الفجوات المكتشفة
                    <AlertCircle size={20} className="text-amber-500" />
                  </h4>
                  <div className="space-y-3 font-body">
                    {[
                      "لا توجد سياسة خصوصية واضحة",
                      "لا يوجد تنظيم لمعالجة البيانات",
                      "ضعف في إدارة الموافقات"
                    ].map((gap, i) => (
                      <div key={i} className="flex items-center justify-end gap-3 p-3 bg-red-50/50 rounded-xl border border-red-50">
                        <span className="text-sm font-bold text-red-900">{gap}</span>
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Plan Preview */}
                <div className="p-8 pt-0 space-y-4">
                  <h4 className="text-lg font-black text-gray-900 flex items-center justify-end gap-2 text-right font-heading">
                    خطة العمل المقترحة
                    <CheckCircle2 size={20} className="text-green-500" />
                  </h4>
                  <div className="space-y-2 opacity-50 blur-[0.5px]">
                    <div className="h-4 bg-gray-100 rounded-lg w-full" />
                    <div className="h-4 bg-gray-100 rounded-lg w-3/4 mr-auto" />
                  </div>
                  <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold text-sm font-body text-center">
                    الخطة الكاملة متاحة بعد التقييم
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
