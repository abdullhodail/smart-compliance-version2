import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Settings } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import prisma from "@/lib/prisma";
import Sidebar from "./Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log("[DashboardLayout] User session check:", user ? `Authenticated (${user.id})` : "Not Authenticated");

  if (!user) {
    console.log("[DashboardLayout] Redirecting to /login");
    redirect("/login");
  }

  console.log("[DashboardLayout] Fetching dbUser from Prisma...");

  let dbUser;
  try {
    // Try find by Supabase auth ID first
    dbUser = await prisma.user.findUnique({ where: { id: user.id }, include: { organization: true } });

    if (!dbUser) {
      // ID not found — check if email exists (e.g., user re-registered on a different Supabase project)
      const existingByEmail = await prisma.user.findUnique({ where: { email: user.email! } });

      if (existingByEmail) {
        // Reconcile: update the old record's ID to match the new Supabase auth user
        dbUser = await prisma.user.update({
          where: { email: user.email! },
          data: { id: user.id },
          include: { organization: true },
        });
      } else {
        // Completely new user — create the record
        dbUser = await prisma.user.create({
          data: { id: user.id, email: user.email! },
          include: { organization: true },
        });
      }
    }
  } catch (error) {
    console.error("[DashboardLayout] Prisma error:", error);
    redirect("/login?error=" + encodeURIComponent("خطأ في الاتصال بقاعدة البيانات"));
  }

  if (!dbUser.organizationId) {
    console.log("[DashboardLayout] No organizationId found, redirecting to /onboarding");
    redirect("/onboarding");
  }

  console.log("[DashboardLayout] organizationId exists, rendering children");

  const isNGO = dbUser?.organization?.entityType === "NGO";
  const DEMO_EMAILS = [
    "ecommerce_test@gmail.com",
    "sme_test@gmail.com",
    "ngo_test@gmail.com",
    "demo_journey@gmail.com"
  ];
  const isDemoUser = user.email ? DEMO_EMAILS.includes(user.email.toLowerCase()) : false;

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <Sidebar 
        userEmail={user.email!} 
        isNGO={isNGO} 
        orgName={dbUser?.organization?.name}
        signOutAction={signOut} 
        isDemoUser={isDemoUser}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
           <div className="md:hidden flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={24} height={24} />
              <span className="font-bold text-primary">الامتثال الذكي</span>
           </div>
            <div className="hidden md:block">
               <h1 className="text-gray-900 font-black">لوحة التحكم</h1>
            </div>
            <div className="flex items-center gap-4">
               {/* Settings or other future actions can go here */}
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
