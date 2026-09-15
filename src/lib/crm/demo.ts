export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("YOUR_PROJECT") || key.includes("your-anon")) return false;
  return true;
}

export const DEMO_USERS = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    email: "admin@kairo.ai",
    password: "demo123",
    full_name: "Alex Admin",
    role: "admin" as const,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    email: "sales@kairo.ai",
    password: "demo123",
    full_name: "Sam Seller",
    role: "sales" as const,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    email: "accounting@kairo.ai",
    password: "demo123",
    full_name: "Casey Cash",
    role: "accounting" as const,
  },
] as const;

export const DEMO_COOKIE = "kairo_demo_session";
