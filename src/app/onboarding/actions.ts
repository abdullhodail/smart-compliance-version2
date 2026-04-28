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
    // Note: We use email to find or create the user in our DB since they just signed up in Supabase
    await prisma.user.upsert({
      where: { email: user.email! },
      update: { organizationId: organization.id },
      create: {
        id: user.id, // Use the same ID as Supabase for consistency
        email: user.email!,
        organizationId: organization.id,
      },
    });

    // 3. Logic-based Redirection
    if (entityType === "NGO" && primaryGoal === "GOVERNANCE") {
      redirect("/dashboard/governance-lite");
    } else {
      redirect("/dashboard/pdpl");
    }
  } catch (error) {
    console.error("Onboarding error:", error);
    // On error, we could redirect to an error page or handle it via a state, 
    // but for now we satisfy the void return type.
  }
}
