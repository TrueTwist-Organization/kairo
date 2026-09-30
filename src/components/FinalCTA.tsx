"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-[#11151d] via-ink to-[#2a2208] px-6 py-14 text-white sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 0%, rgba(240,197,61,0.28), transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(240,197,61,0.12), transparent 40%)",
              }}
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Start the fully automated AI business
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
                Website design, SEO, GEO, AEO, a mobile application, and an AI
                agent. Unhappy? Don&apos;t pay.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary !bg-accent !text-accent-ink hover:!bg-accent-hot">
                  Book a call
                  <ArrowRight size={16} />
                </Link>
                <a href="mailto:hello@kairo.ai" className="btn-secondary !border-white/15 !text-white hover:!bg-white/10">
                  hello@kairo.ai
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
