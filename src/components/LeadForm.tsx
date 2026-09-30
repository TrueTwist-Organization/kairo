"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const interests = [
  { value: "website-design", label: "Website design" },
  { value: "seo", label: "SEO" },
  { value: "geo", label: "GEO" },
  { value: "aeo", label: "AEO" },
  { value: "mobile-application", label: "Mobile application" },
  { value: "ai-agent", label: "AI agent" },
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: (typeof interests)[number]["value"];
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  interest: "website-design",
  message: "",
};

const fieldClass =
  "w-full rounded-[14px] border border-line bg-white px-[0.95rem] py-[0.85rem] text-[0.95rem] outline-none transition focus:border-ink/35 focus:shadow-[0_0_0_4px_rgba(240,197,61,0.25)]";

export function LeadForm({ type = "demo" }: { type?: "demo" | "contact" }) {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type, source: "website" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setDone(true);
      setForm(initial);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[24px] border border-line bg-bg-elevated p-8 text-center">
        <CheckCircle2 className="mx-auto text-success" size={36} />
        <h3 className="font-display mt-4 text-2xl font-bold">Request received</h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;ll reply within one business day with next steps for your demo
          or pilot.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setDone(false)}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[24px] border border-line bg-bg-elevated p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
            placeholder="Alex Morgan"
          />
        </Field>
        <Field label="Work email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClass}
            placeholder="alex@company.com"
          />
        </Field>
        <Field label="Company" required>
          <input
            required
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={fieldClass}
            placeholder="Acme Logistics"
          />
        </Field>
        <Field label="Role">
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={fieldClass}
            placeholder="Head of Ops"
          />
        </Field>
      </div>

      <Field label="Interest" className="mt-4">
        <select
          value={form.interest}
          onChange={(e) =>
            setForm({
              ...form,
              interest: e.target.value as FormState["interest"],
            })
          }
          className={fieldClass}
        >
          {interests.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" required className="mt-4">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${fieldClass} resize-y`}
          placeholder="Which process should we automate first?"
        />
      </Field>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6 w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Sending…
          </>
        ) : type === "demo" ? (
          "Request demo"
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
