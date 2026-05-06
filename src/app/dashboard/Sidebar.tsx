"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  UserCircle,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userEmail: string;
  isNGO: boolean;
  signOutAction: (formData: FormData) => void;
}

interface SidebarLink {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  visible?: boolean;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

export default function Sidebar({ userEmail, isNGO, signOutAction }: SidebarProps) {
  const pathname = usePathname();

  const sections: SidebarSection[] = [
    {
      title: "عام",
      links: [
        { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
      ]
    },
    {
      title: "المسار الأساسي",
      links: [
        { name: "جاهزية حماية البيانات", href: "/dashboard/pdpl", icon: ShieldCheck },
      ]
    },
    {
      title: "مسارات إضافية",
      links: [
        { 
          name: "حوكمة الجمعيات", 
          href: "/dashboard/governance-lite", 
          icon: LayoutDashboard,
          badge: "تجريبي",
          visible: isNGO
        },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-white border-l border-gray-200 hidden md:flex flex-col h-screen sticky top-0" dir="rtl">
      {/* Logo */}
      <Link href="/" className="p-8 flex items-center gap-3 border-b border-gray-50 hover:bg-gray-50 transition-colors shrink-0">
        <Image src="/logo.svg" alt="logo" width={36} height={36} />
        <span className="text-xl font-black text-primary">الامتثال الذكي</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
        {sections.map((section) => {
          const visibleLinks = section.links.filter(link => link.visible !== false);
          if (visibleLinks.length === 0) return null;

          return (
            <div key={section.title} className="space-y-3">
              <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                {section.title}
              </h3>
              <div className="space-y-1">
                {visibleLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 h-[48px] rounded-2xl transition-all group relative",
                        isActive 
                          ? "bg-primary/5 text-primary shadow-sm" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon size={22} className={cn("transition-colors", isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600")} />
                        <span className={cn("text-[15px] transition-all", isActive ? "font-black" : "font-bold")}>
                          {link.name}
                        </span>
                      </div>
                      
                      {link.badge && (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-md font-black">
                          {link.badge}
                        </span>
                      )}

                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer / User Info */}
      <div className="p-6 border-t border-gray-50 space-y-3 shrink-0">
        <div className="px-4 py-3 bg-gray-50 rounded-2xl flex items-center gap-3 text-gray-600 border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserCircle size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">المستخدم</span>
            <span className="text-xs font-bold truncate leading-none">{userEmail}</span>
          </div>
        </div>
        
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-between px-4 h-[44px] text-red-500 hover:bg-red-50 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-sm font-bold">تسجيل الخروج</span>
            </div>
            <ChevronLeft size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        </form>
      </div>
    </aside>
  );
}
