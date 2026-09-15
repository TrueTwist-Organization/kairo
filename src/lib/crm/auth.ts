import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_COOKIE, DEMO_USERS, isSupabaseConfigured } from "@/lib/crm/demo";
import type { Profile } from "@/lib/crm/types";
import { createClient } from "@/lib/supabase/server";

export async function getSessionProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) {
    const jar = await cookies();
    const raw = jar.get(DEMO_COOKIE)?.value;
    if (!raw) return null;
    try {
      const parsed = JSON.parse(decodeURIComponent(raw)) as Profile;
      if (!parsed?.id || !parsed?.role) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile) return null;
  return profile as Profile;
}

export async function requireProfile(roles?: Profile["role"][]) {
  const profile = await getSessionProfile();
  if (!profile) redirect("/login");
  if (roles && !roles.includes(profile.role)) {
    redirect("/dashboard");
  }
  return profile;
}

export function findDemoUser(email: string, password: string) {
  return DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
}
