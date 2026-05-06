"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "../actions";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-right">
          {state.error}
        </div>
      )}

      {state?.message && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 text-sm text-right">
          {state.message}
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
          disabled={isPending}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right disabled:bg-gray-50 disabled:text-gray-400"
          placeholder="example@domain.com"
        />
      </div>

      <div className="space-y-2 text-right">
        <label htmlFor="password" className="text-sm font-bold text-gray-700">
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          disabled={isPending}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right disabled:bg-gray-50 disabled:text-gray-400"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            جاري المعالجة...
          </>
        ) : (
          "إنشاء حساب"
        )}
      </button>
    </form>
  );
}
