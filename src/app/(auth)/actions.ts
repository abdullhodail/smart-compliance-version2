"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect("/login?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
  console.log("[Auth Action] Signup started...");
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("[Auth Action] Attempting signUp for:", email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    console.error("[Auth Action] Signup Error:", error.message);
    return { error: error.message };
  }

  console.log("[Auth Action] Signup successful. User ID:", data.user?.id);

  // If email confirmation is enabled, data.session will be null
  if (!data.session) {
    console.log("[Auth Action] Email confirmation required.");
    return { 
      message: "تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب قبل تسجيل الدخول." 
    };
  }

  console.log("[Auth Action] Session created. Redirecting to onboarding...");
  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
