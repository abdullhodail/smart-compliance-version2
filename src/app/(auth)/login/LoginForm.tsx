"use client";

import { useFormStatus } from "react-dom";
import { login } from "../actions";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all active:scale-[0.98] flex items-center justify-center gap-2",
        pending && "opacity-80 cursor-not-allowed"
      )}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          جاري تسجيل الدخول...
        </>
      ) : (
        "تسجيل الدخول"
      )}
    </button>
  );
}

export default function LoginForm({ error }: { error?: string }) {
  return (
    <form className="space-y-6" action={login}>
      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-right animate-shake">
          <p className="text-red-700 font-bold text-sm mb-1">تعذّر تسجيل الدخول</p>
          <p className="text-red-600 text-xs leading-relaxed">{decodeURIComponent(error)}</p>
          <p className="text-[10px] text-red-400 mt-2 italic">
            * تأكد من صحة البريد وكلمة المرور، أو تأكد من تأكيد البريد إذا كان مفعلاً.
          </p>
        </div>
      )}

      <div className="space-y-2 text-right">
        <label htmlFor="email" className="text-sm font-bold text-gray-700">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right"
          placeholder="example@domain.com"
        />
      </div>

      <div className="space-y-2 text-right">
        <div className="flex items-center justify-between">
          <button type="button" className="text-xs text-primary font-medium hover:underline">
            نسيت كلمة المرور؟
          </button>
          <label htmlFor="password" className="text-sm font-bold text-gray-700">
            كلمة المرور
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right"
          placeholder="••••••••"
        />
      </div>

      <LoginButton />
    </form>
  );
}
