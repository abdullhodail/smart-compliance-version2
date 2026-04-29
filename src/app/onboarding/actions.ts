"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EntityType } from "@prisma/client";

export async function submitOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const name = formData.get("organizationName") as string;
  const entityType = formData.get("entityType") as EntityType;
  const primaryGoal = formData.get("primaryGoal") as string;

  let targetPath = "/dashboard";
  try {
    // 1. Create the Organization
    const organization = await prisma.organization.create({
      data: {
        name,
        entityType,
        primaryGoal,
        status: "TRIAL",
      },
    });

    // 2. Update the User with the organizationId
    await prisma.user.upsert({
      where: { email: user.email! },
      update: { organizationId: organization.id },
      create: {
        id: user.id,
        email: user.email!,
        organizationId: organization.id,
      },
    });

    // 3. Logic-based Redirection Path
    if (entityType === "NGO" && primaryGoal === "GOVERNANCE") {
      targetPath = "/dashboard/governance-lite";
    } else {
      targetPath = "/dashboard/pdpl";
    }
  } catch (error) {
    console.error("Onboarding error:", error);
    // You might want to redirect to an error page or return an error state
  }

  redirect(targetPath);
}
