"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function trackConversionEvent(data: {
  eventName: string;
  packageId?: string;
  packageName?: string;
  entityType?: string;
  path?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let assessmentId: string | undefined = undefined;

    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { organization: true },
      });

      if (dbUser?.organization?.id) {
        const assessment = await prisma.assessmentResult.findFirst({
          where: {
            organizationId: dbUser.organization.id,
            track: "PDPL",
          },
        });
        if (assessment) {
          assessmentId = assessment.id;
        }
      }
    }

    await prisma.conversionEvent.create({
      data: {
        eventName: data.eventName,
        packageId: data.packageId,
        packageName: data.packageName,
        userId: user?.id,
        assessmentId: assessmentId,
        entityType: data.entityType,
        path: data.path,
      },
    });

    return { success: true };
  } catch (error) {
    // Fail silently for the user so it never blocks the flow
    console.error("Tracking event failed:", error);
    return { success: false };
  }
}
