import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center text-white">
          <Link href="/" className="relative w-32 h-32 mx-auto mb-8 animate-pulse block hover:opacity-80 transition-opacity" title="العودة للصفحة الرئيسية">
            <Image
              src="/logo.svg"
              alt="logo"
              fill
              className="object-contain brightness-0 invert"
            />
          </Link>
          <h2 className="text-3xl font-bold mb-4">منصة الامتثال الذكي</h2>
          <p className="text-white/70 max-w-md mx-auto text-lg">
            انضم إلى مئات الجهات التي وثقت بنا لأتمتة عمليات الحوكمة والامتثال.
          </p>
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />
      </div>

      {/* Form Side */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
             <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={40} height={40} />
                <span className="text-xl font-bold text-primary">الامتثال الذكي</span>
             </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
