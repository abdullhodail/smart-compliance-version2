"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 rounded-bl-[100px] hidden md:block" />
      <div className="absolute -top-24 -left-24 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Content */}
        <div className="flex-1 text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary-dark font-bold text-sm mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              منصة سعودية موحدة للحوكمة والامتثال
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              منصة سعودية موحدة… <br />
              <span className="text-primary italic">للحوكمة والامتثال الرقمي</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              نساعد الجهات غير الربحية والمنشآت الصغيرة والمتوسطة على تطبيق معايير الحوكمة وحماية البيانات (PDPL) عبر تجربة رقمية مبسطة ومؤتمتة بالكامل.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-light hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                ابدأ رحلة الامتثال
                <ArrowLeft size={20} />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
              >
                تعرف على الحلول
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 justify-start">
              {[
                "متوافقة مع معايير المركز الوطني",
                "نظام ذكي لإدارة الشواهد",
                "تقارير فورية للجاهزية",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <CheckCircle2 size={16} className="text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual Element */}
        <motion.div
          className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Using a placeholder-style design element for V2 */}
          <div className="relative w-full h-full bg-gradient-to-tr from-primary to-primary-light rounded-[40px] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-inner overflow-hidden">
                  {/* Mock UI elements */}
                  <div className="w-1/2 h-8 bg-white/20 rounded-lg mb-8" />
                  <div className="grid grid-cols-2 gap-4">
                     <div className="aspect-video bg-white/10 rounded-xl" />
                     <div className="aspect-video bg-white/10 rounded-xl" />
                  </div>
                  <div className="mt-8 w-full h-48 bg-white/5 rounded-xl border border-white/10" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-1/2 right-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                     <Image src="/logo.svg" alt="logo" width={32} height={32} />
                  </div>
               </div>
            </div>
          </div>
          
          {/* Stats Overlay */}
          <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden lg:block">
            <p className="text-xs text-gray-400 font-bold mb-1">نسبة الامتثال</p>
            <p className="text-3xl font-black text-primary">94.8%</p>
            <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="w-[94%] h-full bg-secondary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
