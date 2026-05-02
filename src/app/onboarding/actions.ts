"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EntityType } from "@prisma/client";

export async function submitOnboarding(prevState: any, data: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log("[submitOnboarding] Server side call started.");
  console.log("[submitOnboarding] Auth User:", user ? { id: user.id, email: user.email } : "NULL");

  if (!user) {
    console.error("[submitOnboarding] No user found in session.");
    return { error: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى." };
  }

  const { organizationName: name, entityType, primaryGoal, businessActivity } = data || {};
  console.log("[submitOnboarding] Payload:", { name, entityType, primaryGoal, businessActivity });

  if (!name || !entityType || !primaryGoal) {
    console.error("[submitOnboarding] Validation failed. Missing required fields.");
    return { error: "تعذر إكمال الإعداد بسبب نقص البيانات. حاول مرة أخرى." };
  }

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
    console.log(`[Onboarding] Organization created: ${organization.id} (${entityType})`);

    // 2. Link the User to the Organization
    const existingUser = await prisma.user.findUnique({ where: { id: user.id } });
    
    if (existingUser) {
      await prisma.user.update({ 
        where: { id: user.id }, 
        data: { organizationId: organization.id } 
      });
    } else {
      const existingByEmail = await prisma.user.findUnique({ where: { email: user.email! } });
      
      if (existingByEmail) {
        await prisma.user.update({ 
          where: { email: user.email! }, 
          data: { id: user.id, organizationId: organization.id } 
        });
      } else {
        await prisma.user.create({ 
          data: { id: user.id, email: user.email!, organizationId: organization.id } 
        });
      }
    }

    // 3. Logic-based Redirection Path
    if (entityType === "NGO" && primaryGoal === "GOVERNANCE") {
      targetPath = "/dashboard/governance-lite";
    } else {
      targetPath = "/dashboard/pdpl";
    }
  } catch (error: any) {
    console.error("[Onboarding Error]", {
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
    return { error: "تعذر إكمال الإعداد. حاول مرة أخرى أو سجل الخروج ثم ادخل من جديد." };
  }

  console.log(`[Onboarding] Redirecting user ${user.id} to ${targetPath}`);
  redirect(targetPath);
}
