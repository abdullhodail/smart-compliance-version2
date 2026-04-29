import Link from "next/link";
import { signup } from "../actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="space-y-8">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
        <p className="text-gray-500">ابدأ رحلتك في تعزيز الحوكمة والامتثال اليوم.</p>
      </div>

      <form className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-right">
            {error}
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
          <label htmlFor="password" className="text-sm font-bold text-gray-700">
            كلمة المرور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right"
            placeholder="••••••••"
          />
        </div>

        <button
          formAction={signup}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all active:scale-[0.98]"
        >
          إنشاء حساب
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
