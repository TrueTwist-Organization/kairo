"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEMO = [
  { email: "admin@kairo.ai", role: "Admin — full CRM" },
  { email: "sales@kairo.ai", role: "Sales — own pipeline" },
  { email: "accounting@kairo.ai", role: "Accounting — invoices" },
];

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("admin@kairo.ai");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/demo-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push(search.get("next") || "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight text-black">
        MicroCRM Login
      </h1>
      <p className="mt-2 text-sm text-black/60">
        Demo ready — password for all accounts: <strong>demo123</strong>
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-black">
          Email
          <input
            className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black/40"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-black">
          Password
          <input
            className="mt-1.5 w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black/40"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="mt-5 space-y-1 rounded-xl border border-black/10 bg-black/[0.02] p-3">
        <p className="px-1 text-xs font-semibold uppercase tracking-wide text-black/45">
          Quick accounts
        </p>
        {DEMO.map((d) => (
          <button
            key={d.email}
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm hover:bg-white"
            onClick={() => {
              setEmail(d.email);
              setPassword("demo123");
            }}
          >
            <span className="font-medium text-black">{d.email}</span>
            <span className="text-xs text-black/45">{d.role}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-black/45">
        Agents live on the marketing site →{" "}
        <a href="/#agents" className="underline">
          /#agents
        </a>
      </p>
    </div>
  );
}
