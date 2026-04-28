import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EntityType } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the user's organization from our DB
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { organization: true },
  });

  if (!dbUser || !dbUser.organization) {
    redirect("/onboarding");
  }

  const { entityType, primaryGoal } = dbUser.organization;

  // Track-based Redirection logic
  if (entityType === "NGO" && primaryGoal === "GOVERNANCE") {
    redirect("/dashboard/governance-lite");
  } else {
    redirect("/dashboard/pdpl");
  }
}
