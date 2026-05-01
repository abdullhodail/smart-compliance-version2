import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EntityType } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log("[DashboardPage] User session check:", user ? `Authenticated (${user.id})` : "Not Authenticated");

  if (!user) {
    console.log("[DashboardPage] Redirecting to /login");
    redirect("/login");
  }

  console.log("[DashboardPage] Fetching dbUser from Prisma...");

  // Fetch the user's organization from our DB (Auto-sync if missing)
  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: { id: user.id, email: user.email! },
    include: { organization: true },
  });

  if (!dbUser.organization) {
    console.log("[DashboardPage] No organization found, redirecting to /onboarding");
    redirect("/onboarding");
  }

  const { entityType, primaryGoal } = dbUser.organization;
  console.log(`[DashboardPage] Organization found: ${entityType}, goal: ${primaryGoal}`);

  // Track-based Redirection logic
  // PDPL is now the main commercial track for all users.
  // NGOs can access Governance Lite via the sidebar.
  console.log("[DashboardPage] Redirecting to /dashboard/pdpl (Main Track)");
  redirect("/dashboard/pdpl");
}
