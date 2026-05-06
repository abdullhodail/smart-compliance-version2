"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userEmail: string;
  isNGO: boolean;
  orgName?: string;
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

export default function Sidebar({ userEmail, isNGO, orgName, signOutAction }: SidebarProps) {
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
    <aside className="w-72 bg-white border-l border-gray-200 hidden md:flex flex-col h-screen sticky top-0 shadow-sm" dir="rtl">
      {/* Logo Area */}
      <div className="p-8 border-b border-gray-50 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
          </div>
          <span className="text-xl font-black text-primary tracking-tight">الامتثال الذكي</span>
        </Link>
      </div>

      {/* Navigation Area */}
      <nav className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {sections.map((section) => {
          const visibleLinks = section.links.filter(link => link.visible !== false);
          if (visibleLinks.length === 0) return null;

          return (
            <div key={section.title} className="space-y-4">
              <h3 className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
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
                        "flex items-center gap-3 px-4 h-[52px] rounded-2xl transition-all group relative",
                        isActive 
                          ? "bg-primary text-white shadow-md shadow-primary/20" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <link.icon size={22} className={cn("shrink-0 transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                      
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={cn("text-[15px] truncate transition-all", isActive ? "font-black" : "font-bold")}>
                          {link.name}
                        </span>
                        
                        {link.badge && (
                          <span className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded-md font-black shrink-0",
                            isActive 
                              ? "bg-white/20 text-white" 
                              : "bg-amber-100 text-amber-700"
                          )}>
                            {link.badge}
                          </span>
                        )}
                      </div>

                      {isActive && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full shadow-sm" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer Area - Redesigned */}
      <div className="p-6 bg-gray-50/50 border-t border-gray-100 shrink-0">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                <UserCircle size={24} />
             </div>
             <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5 truncate">
                  {orgName || "الحساب"}
                </span>
                <span className="text-[13px] font-bold text-gray-700 truncate">{userEmail}</span>
             </div>
          </div>
        </div>
        
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full h-[48px] bg-white hover:bg-red-50 text-red-500 border border-red-100 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
