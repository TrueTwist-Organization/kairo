"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { solutions } from "@/lib/content";

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Solutions
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Guaranteed outcomes — not another automation toolkit
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Production patterns for freight, payables, inventory, and claims —
            priced per completed unit of work with contractual guarantees.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {solutions.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <Link
                href={`/solutions/${item.id}`}
                className="group block h-full rounded-[24px] border border-line bg-bg-elevated p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,13,18,0.08)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                  <div className="rounded-2xl bg-accent/90 px-3 py-2 text-right">
                    <p className="font-display text-xl font-bold leading-none text-accent-ink">
                      {item.metric}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-accent-ink/70">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="inline-flex rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft">
                    {item.guarantee}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink opacity-0 transition group-hover:opacity-100">
                    Details
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
