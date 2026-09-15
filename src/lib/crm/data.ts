import { isSupabaseConfigured } from "@/lib/crm/demo";
import { createClient } from "@/lib/supabase/server";
import {
  demoCreateDeal,
  demoCreateInvoice,
  demoCreateLead,
  demoListDeals,
  demoListInvoices,
  demoListLeads,
  demoUpdateDealStage,
  demoUpdateInvoice,
  demoUpdateLead,
} from "@/lib/crm/demo-store";
import type { Deal, Invoice, Lead, Profile } from "@/lib/crm/types";

export async function getLeads(profile?: Profile | null) {
  if (!isSupabaseConfigured()) {
    const leads = await demoListLeads();
    if (!profile) return leads;
    if (profile.role === "admin" || profile.role === "accounting") return leads;
    return leads.filter(
      (l) => l.assigned_to === profile.id || l.assigned_to === null,
    );
  }
  const supabase = await createClient();
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (profile?.role === "sales") {
    query = query.or(`assigned_to.eq.${profile.id},assigned_to.is.null`);
  }
  const { data } = await query;
  return (data ?? []) as Lead[];
}

export async function getDeals(profile?: Profile | null) {
  if (!isSupabaseConfigured()) {
    const deals = await demoListDeals();
    if (!profile || profile.role === "admin" || profile.role === "accounting") {
      return deals;
    }
    return deals.filter((d) => d.owner_id === profile.id);
  }
  const supabase = await createClient();
  let query = supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false });
  if (profile?.role === "sales") {
    query = query.eq("owner_id", profile.id);
  }
  const { data } = await query;
  return (data ?? []) as Deal[];
}

export async function getInvoices() {
  if (!isSupabaseConfigured()) return demoListInvoices();
  const supabase = await createClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Invoice[];
}

export async function getSalesPeople() {
  if (!isSupabaseConfigured()) {
    return [
      {
        id: "22222222-2222-2222-2222-222222222222",
        full_name: "Sam Seller",
        email: "sales@kairo.ai",
        role: "sales" as const,
      },
    ];
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("role", "sales");
  return data ?? [];
}

export {
  demoCreateDeal,
  demoCreateInvoice,
  demoCreateLead,
  demoUpdateDealStage,
  demoUpdateInvoice,
  demoUpdateLead,
};
