import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
        <p className="text-gray-500">ابدأ رحلتك في تعزيز الحوكمة والامتثال اليوم.</p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-gray-500">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
