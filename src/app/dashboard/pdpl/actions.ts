"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { pdplQuestions } from "./content";
import { EntityType } from "@prisma/client";

export async function getPDPLAssessment() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { organization: true },
  });

  if (!dbUser || !dbUser.organization) throw new Error("Organization not found");

  const assessment = await prisma.assessmentResult.findFirst({
    where: {
      organizationId: dbUser.organization.id,
      track: "PDPL",
    },
  });

  return {
    assessment,
    organizationId: dbUser.organization.id,
    entityType: dbUser.organization.entityType,
    businessActivity: dbUser.organization.businessActivity,
  };
}

export async function updatePDPLProgress(
  organizationId: string, 
  entityType: EntityType,
  answers: Record<string, boolean | "unknown">
) {
  let totalWeight = 0;
  let earnedWeight = 0;

  pdplQuestions.forEach(question => {
    totalWeight += question.weight;
    if (answers[question.id] === true) {
      earnedWeight += question.weight;
    }
    // "unknown" and false earn 0 weight
  });

  const score = Math.round((earnedWeight / totalWeight) * 100);

  await prisma.assessmentResult.upsert({
    where: {
      organizationId_track: {
        organizationId,
        track: "PDPL",
      },
    },
    update: {
      answersJson: answers as any,
      score,
      status: "COMPLETED", // Mark as completed once the wizard is done
    },
    create: {
      organizationId,
      track: "PDPL",
      answersJson: answers as any,
      score,
      status: "COMPLETED",
    },
  });

  revalidatePath("/dashboard/pdpl");
  return { success: true, score };
}
