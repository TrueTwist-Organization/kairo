"use client";

import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { results } from "@/lib/content";

export function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Example view
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                What the dashboard shows
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              Figures from the source video are labeled as examples. They are not
              verified client results and they are not a guarantee.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {results.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-bg-elevated">
                <div className="relative h-44 bg-gradient-to-br from-ink via-[#1c2230] to-[#2a2410] p-6 text-white">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle at 80% 20%, rgba(240,197,61,0.45), transparent 45%)",
                    }}
                  />
                  <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    {item.industry}
                  </p>
                  <p className="font-display relative mt-6 text-4xl font-bold text-accent-hot">
                    <CountUp
                      value={item.value}
                      suffix={item.suffix}
                      decimals={item.value % 1 === 0 ? 0 : 1}
                    />
                  </p>
                  <p className="font-display relative mt-3 text-xl font-bold">
                    {item.company}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
