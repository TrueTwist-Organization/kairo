import { NextResponse, type NextRequest } from "next/server";

const DEMO_COOKIE = "kairo_demo_session";

function hasSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("YOUR_PROJECT") && !key.includes("your-anon"));
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboard = path.startsWith("/dashboard");
  const isLogin = path === "/login";

  // Demo mode only — no network, no Supabase import (keeps /login fast)
  if (!hasSupabase()) {
    const loggedIn = Boolean(request.cookies.get(DEMO_COOKIE)?.value);

    if (isDashboard && !loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }

    if (isLogin && loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Supabase configured: let pages handle auth (avoid hanging getUser in middleware)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
