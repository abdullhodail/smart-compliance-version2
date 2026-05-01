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

  const name = (formData.get("organizationName") as string) || "جهة جديدة";
  const entityType = formData.get("entityType") as EntityType;
  const primaryGoal = formData.get("primaryGoal") as string;
  const businessActivity = formData.get("businessActivity") as string;

  let targetPath = "/dashboard";
  try {
    // 1. Create the Organization
    const organization = await prisma.organization.create({
      data: {
        name,
        entityType,
        primaryGoal,
        businessActivity: businessActivity || null,
        status: "TRIAL",
      },
    });

    // 2. Link the User to the Organization (handles ID mismatches across Supabase projects)
    const existingUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (existingUser) {
      await prisma.user.update({ where: { id: user.id }, data: { organizationId: organization.id } });
    } else {
      const existingByEmail = await prisma.user.findUnique({ where: { email: user.email! } });
      if (existingByEmail) {
        await prisma.user.update({ where: { email: user.email! }, data: { id: user.id, organizationId: organization.id } });
      } else {
        await prisma.user.create({ data: { id: user.id, email: user.email!, organizationId: organization.id } });
      }
    }

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
