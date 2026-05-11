"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { resetDemoJourneyAction } from "@/app/actions/demo";

export default function ResetDemoButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const confirmReset = window.confirm("سيتم حذف بيانات التجربة الحالية لهذا الحساب التجريبي فقط والبدء من جديد. هل أنت متأكد؟");
    
    if (!confirmReset) return;

    setLoading(true);
    try {
      const result = await resetDemoJourneyAction();
      if (result.success) {
        // Force a hard reload to clear any cache/state and go to onboarding
        window.location.href = "/onboarding";
      } else {
        alert(result.error || "حدث خطأ أثناء إعادة التجربة");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="w-full h-[48px] mb-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] disabled:opacity-50"
    >
      <RotateCcw size={18} className={loading ? "animate-spin" : ""} />
      {loading ? "جاري إعادة التجربة..." : "إعادة تجربة العرض"}
    </button>
  );
}
