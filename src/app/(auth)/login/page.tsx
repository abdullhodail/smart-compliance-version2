import Link from "next/link";
import { login } from "../actions";
import QuickLogin from "./QuickLogin";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="space-y-8">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
        <p className="text-gray-500">أهلاً بك مجدداً في منصة الامتثال الذكي.</p>
      </div>

      <form className="space-y-6">
        {searchParams.error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-right">
            {searchParams.error}
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
            <Link href="#" className="text-xs text-primary font-medium hover:underline">
              نسيت كلمة المرور؟
            </Link>
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

        <button
          formAction={login}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all active:scale-[0.98]"
        >
          تسجيل الدخول
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        ليس لديك حساب؟{" "}
        <Link href="/register" className="text-primary font-bold hover:underline">
          إنشاء حساب جديد
        </Link>
      </p>

      <QuickLogin />
    </div>
  );
}
