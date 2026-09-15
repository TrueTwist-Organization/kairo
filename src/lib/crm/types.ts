export type UserRole = "admin" | "sales" | "accounting";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string | null;
  interest: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  assigned_to: string | null;
  created_at: string;
};

export type Deal = {
  id: string;
  title: string;
  company: string;
  value_cents: number;
  currency: string;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  lead_id: string | null;
  owner_id: string;
  expected_close: string | null;
  notes: string | null;
  created_at: string;
};

export type Invoice = {
  id: string;
  number: string;
  customer_name: string;
  customer_email: string;
  company: string | null;
  amount_cents: number;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue" | "void";
  deal_id: string | null;
  created_by: string;
  stripe_checkout_session_id: string | null;
  paid_at: string | null;
  due_date: string | null;
  line_items: { description: string; amount_cents: number; quantity: number }[];
  created_at: string;
};

export const PIPELINE_STAGES: Deal["stage"][] = [
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export const STAGE_LABELS: Record<Deal["stage"], string> = {
  lead: "Lead",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function dashboardHomeForRole(role: UserRole) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "sales":
      return "/dashboard/sales";
    case "accounting":
      return "/dashboard/accounting";
    default: {
      const _exhaustive: never = role;
      return _exhaustive;
    }
  }
}
