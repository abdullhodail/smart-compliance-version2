"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header — Soft Entry */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-heading"
          >
            ابدأ التقييم مجانًا
          </motion.h2>
          <p className="text-gray-600 font-body text-lg leading-relaxed">
            ابدأ التقييم مجانًا، وفعّل التقرير والمستندات عند الحاجة
          </p>
          <p className="text-sm text-gray-400 mt-3 font-body">
            باقات تجريبية مناسبة للمتاجر الصغيرة
          </p>
        </div>

        {/* Single CTA — Keep focus on Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white rounded-[40px] border border-gray-100 shadow-lg p-10 text-right"
        >
          <div className="flex items-start justify-end gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900 font-heading mb-2">التقييم مجاني تمامًا</h3>
              <p className="text-gray-500 font-body text-sm leading-relaxed">
                أجب على أسئلة بسيطة في 5 دقائق، واعرف فجوات نشاطك فورًا.
              </p>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-primary font-heading">0</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8 font-body">
            {[
              "تقييم جاهزية النشاط لحماية البيانات",
              "مؤشر الجاهزية الرقمي",
              "الفجوات الرئيسية المكتشفة",
              "توصيات مختصرة قابلة للتطبيق"
            ].map((f, i) => (
              <li key={i} className="flex items-center justify-end gap-3 text-gray-700 text-sm font-medium">
                {f}
                <CheckCircle2 size={16} className="text-primary shrink-0" />
              </li>
            ))}
          </ul>

          <Link
            href="/register?next=/dashboard/pdpl"
            className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
          >
            ابدأ التقييم الآن
            <ArrowLeft size={20} />
          </Link>

          <p className="mt-6 text-center text-xs text-gray-400 font-body leading-relaxed">
            بعد رؤية نتيجتك، يمكنك فعّل التقارير والمستندات بحسب احتياجك.
          </p>
        </motion.div>

        {/* Legal Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-10 max-w-2xl mx-auto font-body leading-relaxed">
          المخرجات المقدمة هي أدوات استرشادية لمساعدتك على فهم وضعك وتنظيم خطواتك، ولا تعد استشارة قانونية أو شهادة امتثال.
        </p>
      </div>
    </section>
  );
}
