"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEMO_EMAILS = [
  "ecommerce_test@gmail.com",
  "sme_test@gmail.com",
  "ngo_test@gmail.com",
  "demo_journey@gmail.com"
];

export async function resetDemoJourneyAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { success: false, error: "غير مصرح لك بالقيام بهذا الإجراء" };
    }

    // 1. Whitelist Check
    if (!DEMO_EMAILS.includes(user.email.toLowerCase())) {
      return { success: false, error: "هذا الإجراء متاح فقط للحسابات التجريبية المعتمدة" };
    }

    console.log(`[DemoReset] Resetting journey for: ${user.email}`);

    // 2. Find Database User
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { organizationId: true }
    });

    if (!dbUser?.organizationId) {
      return { success: true }; // Already reset or never started
    }

    const orgId = dbUser.organizationId;

    // 3. Check for shared organization
    const userCount = await prisma.user.count({
      where: { organizationId: orgId }
    });

    if (userCount > 1) {
      console.log(`[DemoReset] Org ${orgId} is shared by ${userCount} users. Only decoupling user.`);
      await prisma.user.update({
        where: { id: user.id },
        data: { organizationId: null }
      });
    } else {
      console.log(`[DemoReset] Org ${orgId} is exclusive to this user. Cleaning up and deleting.`);
      
      // Clear Assessment Results
      await prisma.assessmentResult.deleteMany({
        where: { organizationId: orgId }
      });

      // Clear Subscriptions
      await prisma.subscription.deleteMany({
        where: { organizationId: orgId }
      });

      // Decouple user first to avoid FK constraint on Organization delete
      await prisma.user.update({
        where: { id: user.id },
        data: { organizationId: null }
      });

      // Delete the Organization
      await prisma.organization.delete({
        where: { id: orgId }
      });
    }

    console.log(`[DemoReset] Successfully reset journey for user: ${user.email}`);

    revalidatePath("/dashboard", "layout");
    revalidatePath("/onboarding");
    
    return { success: true };
  } catch (error) {
    console.error("[DemoReset] Error during reset:", error);
    return { success: false, error: "حدث خطأ أثناء مسح البيانات" };
  }
}
