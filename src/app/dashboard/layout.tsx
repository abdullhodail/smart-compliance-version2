import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LayoutDashboard, ShieldCheck, LogOut, Settings, UserCircle } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email!,
    },
    include: { organization: true }
  });

  if (!dbUser.organizationId) {
    redirect("/onboarding");
  }

  const isNGO = dbUser?.organization?.entityType === "NGO";

  const sidebarLinks = [
    { name: "نظرة عامة", href: "/dashboard", icon: LayoutDashboard },
    ...(isNGO ? [{ name: "الحوكمة", href: "/dashboard/governance-lite", icon: LayoutDashboard }] : []),
    { name: "حماية البيانات", href: "/dashboard/pdpl", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-50">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <span className="text-xl font-bold text-primary">الامتثال الذكي</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50 space-y-1">
           <div className="px-4 py-3 flex items-center gap-3 text-gray-400 text-sm">
              <UserCircle size={20} />
              <span className="truncate">{user.email}</span>
           </div>
          <button
            formAction={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
           <div className="md:hidden flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={24} height={24} />
              <span className="font-bold text-primary">الامتثال الذكي</span>
           </div>
           <div className="hidden md:block">
              <h1 className="text-gray-500 font-medium">لوحة التحكم</h1>
           </div>
           <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                 <Settings size={20} />
              </button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
