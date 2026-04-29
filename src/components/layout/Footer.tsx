import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.svg"
                  alt="شعار منصة الامتثال الذكي"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold text-white">
                منصة الامتثال الذكي
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              المنصة السعودية الرائدة في أتمتة عمليات الحوكمة والامتثال الرقمي وحماية البيانات الشخصية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">المنصة</h4>
            <ul className="space-y-4">
              {[
                { name: "عن المنصة", href: "#about" },
                { name: "المميزات", href: "#features" },
                { name: "الأسعار", href: "#pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-secondary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">الدعم والنظام</h4>
            <ul className="space-y-4">
              {[
                { name: "سياسة الخصوصية", href: "#" },
                { name: "شروط الاستخدام", href: "#" },
                { name: "مركز المساعدة", href: "#" },
                { name: "اتصل بنا", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-secondary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 منصة الامتثال الذكي. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            {/* Social icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
