import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import ClientOnboarding from "./ClientOnboarding";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user already has an organization
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { organizationId: true }
  });

  if (dbUser?.organizationId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="mb-12 flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={48} height={48} />
        <h1 className="text-2xl font-bold text-primary">إعداد الحساب</h1>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
        {/* Progress bar and other UI elements handled by ClientOnboarding */}
        <div className="h-1 bg-gray-50" /> 
        <ClientOnboarding />
      </div>
    </div>
  );
}
