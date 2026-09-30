"use client";

import { Reveal } from "@/components/Reveal";

export function ProofQuote() {
  return (
    <section className="border-b border-line bg-bg-elevated py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl md:text-[2.15rem]">
            “A fully automated AI business. Unhappy? Don&apos;t pay.”
          </blockquote>
          <div className="mt-8">
            <p className="font-semibold text-ink">Cash-flowing AI agency</p>
            <p className="mt-1 text-sm text-ink-soft">Website, SEO, GEO, AEO, mobile app, AI agent</p>
          </div>
          <div className="mx-auto mt-8 h-px w-16 bg-accent" />
        </Reveal>
      </div>
    </section>
  );
}
