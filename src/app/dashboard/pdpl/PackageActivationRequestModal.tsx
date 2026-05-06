"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MessageSquare, AlertCircle } from "lucide-react";
import { trackConversionEvent } from "@/app/actions/tracking";

const packageDetailsMap: Record<string, { name: string; description: string }> = {
  "149": {
    name: "تشخيص الجاهزية",
    description:
      "مناسب لمعرفة الوضع الحالي، ويشمل ملخص الجاهزية، أهم الفجوات، وتوصيات أولية.",
  },
  "299": {
    name: "حزمة بداية التطبيق",
    description:
      "الباقة الموصى بها للبدء بالتنفيذ، وتشمل تقرير الجاهزية، تحليل الفجوات، خطة تنفيذ 14 يوم، وإشعار خصوصية قابل للتعديل.",
  },
  "499": {
    name: "الحزمة التشغيلية الكاملة",
    description:
      "تشمل مخرجات بداية التطبيق بالإضافة إلى قوائم تشغيل أوسع، نصوص للموقع، وقائمة مشاركة البيانات مع الأطراف الخارجية.",
  },
};

interface PackageActivationRequestModalProps {
  selectedPlan: { name: string; price: string; whatsappMessage?: string } | null;
  onClose: () => void;
  entityType?: string;
  score?: number;
}

export default function PackageActivationRequestModal({
  selectedPlan,
  onClose,
  entityType,
  score,
}: PackageActivationRequestModalProps) {
  const [phoneError, setPhoneError] = useState(false);

  const packageInfo = selectedPlan
    ? packageDetailsMap[selectedPlan.price] || {
        name: selectedPlan.name,
        description: "",
      }
    : null;

  const handleWhatsAppClick = () => {
    if (!selectedPlan || !packageInfo) return;

    const phoneNumber =
      process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ||
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
      "";

    if (!phoneNumber) {
      setPhoneError(true);
      return;
    }

    const messageParts: string[] = [
      "السلام عليكم",
      `أرغب بتفعيل ${packageInfo.name} في منصة الامتثال الذكي`,
    ];

    if (entityType) {
      messageParts.push(`نوع الجهة: ${entityType}`);
    }

    if (score !== undefined && score !== null) {
      messageParts.push(`درجة الجاهزية: ${score}%`);
    }

    messageParts.push(`الباقة: ${selectedPlan.price} ريال`);

    const encodedMessage = encodeURIComponent(messageParts.join("\n"));

    trackConversionEvent({
      eventName: "whatsapp_click",
      packageId: selectedPlan.price,
      packageName: packageInfo.name,
      entityType: entityType,
      path: window.location.pathname,
    });

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleClose = () => {
    setPhoneError(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {selectedPlan && packageInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-black text-gray-900 mb-2">
              تم إنشاء طلب تفعيل الباقة
            </h3>

            {/* Package Name */}
            <p className="text-lg font-bold text-gray-700 mb-1">
              {packageInfo.name}
            </p>

            {/* Price */}
            <div className="text-2xl font-black text-primary mb-4">
              {selectedPlan.price}{" "}
              <span className="text-sm text-gray-400">ريال</span>
            </div>

            {/* Status */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl py-3 px-4 mb-4">
              <p className="font-bold text-amber-700 text-sm">
                حالة الطلب: بانتظار التفعيل
              </p>
            </div>

            {/* Next Step */}
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              سيتم تأكيد الطلب وتفعيل المخرجات يدويًا بعد التواصل مع فريق المنصة.
            </p>

            {/* Phone Error - inline, non-blocking */}
            {phoneError && (
              <div className="bg-red-50 border border-red-100 rounded-xl py-3 px-4 mb-4 flex items-center justify-center gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-bold text-red-600">
                  رقم التواصل غير مفعّل حاليًا. يرجى التواصل مع فريق المنصة.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare size={20} />
                تأكيد الطلب عبر واتساب
              </button>
              <button
                onClick={handleClose}
                className="w-full py-3 text-gray-400 hover:text-gray-600 font-bold transition-colors"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
