import { requireProfile } from "@/lib/crm/auth";
import { redirect } from "next/navigation";
import { dashboardHomeForRole } from "@/lib/crm/types";

export default async function DashboardIndexPage() {
  const profile = await requireProfile();
  redirect(dashboardHomeForRole(profile.role));
}
