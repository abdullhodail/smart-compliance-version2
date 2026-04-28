"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { governanceStandards } from "./content";

export async function getGovernanceAssessment() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { organization: true },
  });

  if (!dbUser || !dbUser.organization) throw new Error("Organization not found");

  if (dbUser.organization.entityType !== "NGO") {
    throw new Error("Governance is only for NGOs");
  }

  const assessment = await prisma.assessmentResult.findFirst({
    where: {
      organizationId: dbUser.organization.id,
      track: "GOVERNANCE_LITE",
    },
  });

  return {
    assessment,
    organizationId: dbUser.organization.id,
  };
}

export async function updateGovernanceProgress(organizationId: string, answers: Record<string, boolean>) {
  let totalWeight = 0;
  let earnedWeight = 0;

  governanceStandards.forEach(section => {
    section.items.forEach(item => {
      totalWeight += item.weight;
      if (answers[item.id]) {
        earnedWeight += item.weight;
      }
    });
  });

  const score = Math.round((earnedWeight / totalWeight) * 100);

  await prisma.assessmentResult.upsert({
    where: {
      organizationId_track: {
        organizationId,
        track: "GOVERNANCE_LITE",
      },
    },
    update: {
      answersJson: answers as any,
      score,
      status: score === 100 ? "COMPLETED" : "IN_PROGRESS",
    },
    create: {
      organizationId,
      track: "GOVERNANCE_LITE",
      answersJson: answers as any,
      score,
      status: "IN_PROGRESS",
    },
  });

  revalidatePath("/dashboard/governance-lite");
  return { success: true, score };
}
