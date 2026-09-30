"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { solutions } from "@/lib/content";

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-28 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Services
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            What a cash-flowing AI agency installs
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Website design, SEO, GEO, AEO, a mobile application, and an AI
            agent. Each piece feeds the next one.
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
                  <h3 className="min-w-0 flex-1 font-display text-2xl font-bold leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-[6.75rem] shrink-0 rounded-2xl bg-accent px-2 py-2 text-center">
                    <p className="font-display text-xl font-bold leading-none text-accent-ink">
                      {item.metric}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold leading-tight text-accent-ink">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="min-w-0 flex-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold leading-snug text-ink-soft">
                    {item.guarantee}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
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
