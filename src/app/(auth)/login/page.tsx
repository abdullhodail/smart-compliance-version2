import Link from "next/link";
import QuickLogin from "./QuickLogin";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="space-y-8">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
        <p className="text-gray-500">أهلاً بك مجدداً في منصة الامتثال الذكي.</p>
      </div>

      <LoginForm error={error} />

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
