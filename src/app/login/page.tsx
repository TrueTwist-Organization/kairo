import { Suspense } from "react";
import { LoginForm } from "@/components/crm/LoginForm";

export const metadata = {
  title: "Login · Kairo MicroCRM",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f4f4f1] px-4 pb-16 pt-32">
      <Suspense
        fallback={<div className="text-sm text-black/50">Loading…</div>}
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
