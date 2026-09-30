"use client";

import { Reveal } from "@/components/Reveal";
import { capabilities } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-28 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            How it works
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            How a fully automated AI business is set up
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {capabilities.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.05} y={18}>
              <div className="grid gap-3 py-7 md:grid-cols-[120px_1fr_1.2fr] md:items-center md:gap-8">
                <p className="font-display text-sm font-bold text-accent">{item.number}</p>
                <h3 className="font-display text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
