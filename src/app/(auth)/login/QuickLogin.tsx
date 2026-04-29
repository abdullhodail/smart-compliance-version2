"use client";

import { login } from "../actions";

export default function QuickLogin() {
  const accounts = [
    { name: "تجربة NGO", email: "ngo_test@gmail.com" },
    { name: "تجربة Ecommerce", email: "ecommerce_test@gmail.com" },
    { name: "تجربة SME", email: "sme_test@gmail.com" },
  ];

  return (
    <div className="mt-10 pt-10 border-t border-gray-100">
      <p className="text-center text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
        بيانات الدخول للتجربة (التجريبية)
      </p>
      <div className="grid grid-cols-1 gap-3">
        {accounts.map((acc) => (
          <form key={acc.email}>
            <input type="hidden" name="email" value={acc.email} />
            <input type="hidden" name="password" value="12345" />
            <button
              formAction={login}
              className="w-full py-3 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold text-gray-600 hover:bg-white hover:border-primary/20 hover:text-primary transition-all flex items-center justify-between group"
            >
              <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity">{acc.email}</span>
              <span>{acc.name}</span>
            </button>
          </form>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed">
        * ملاحظة للمطور: يرجى التأكد من تعطيل "تأكيد البريد" في Supabase أو إنشاء هذه الحسابات يدوياً بكلمة مرور test123456.
      </p>
    </div>
  );
}
