import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { DEMO_COOKIE, isSupabaseConfigured } from "@/lib/crm/demo";
import { findDemoUser } from "@/lib/crm/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Use Supabase login on this environment" },
      { status: 400 },
    );
  }

  const user = findDemoUser(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password. Try demo accounts below." },
      { status: 401 },
    );
  }

  const profile = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
  };

  const jar = await cookies();
  jar.set(DEMO_COOKIE, encodeURIComponent(JSON.stringify(profile)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true, profile });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(DEMO_COOKIE);
  return NextResponse.json({ ok: true });
}
