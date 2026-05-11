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

    // 3. Delete related data safely
    // Order matters to avoid foreign key violations if they existed
    
    // Clear Assessment Results
    await prisma.assessmentResult.deleteMany({
      where: { organizationId: orgId }
    });

    // Clear Subscriptions
    await prisma.subscription.deleteMany({
      where: { organizationId: orgId }
    });

    // 4. Dissociate all users from this organization
    // (In case multiple demo users were somehow linked, though unlikely here)
    await prisma.user.updateMany({
      where: { organizationId: orgId },
      data: { organizationId: null }
    });

    // 5. Delete the Organization
    await prisma.organization.delete({
      where: { id: orgId }
    });

    console.log(`[DemoReset] Successfully cleared data for org: ${orgId}`);

    revalidatePath("/dashboard", "layout");
    revalidatePath("/onboarding");
    
    return { success: true };
  } catch (error) {
    console.error("[DemoReset] Error during reset:", error);
    return { success: false, error: "حدث خطأ أثناء مسح البيانات" };
  }
}
