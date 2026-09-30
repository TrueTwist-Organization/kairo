"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { platformSteps } from "@/lib/content";

export function Platform() {
  return (
    <section id="platform" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Platform
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            The AI agent platform
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Connect the tools, launch the offer, let the agent follow up, and
            read the work on the dashboard.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative h-full overflow-hidden rounded-[22px] border border-line bg-bg-elevated p-6"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/15 blur-2xl" />
                <p className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-ink p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Agent pipeline
                </p>
                <p className="font-display mt-3 text-2xl font-bold sm:text-3xl">
                  Connect → Launch → Automate → Review
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  A chat model, memory, Gmail, Google Calendar, HTTP requests,
                  and search sit in one workflow. A person reviews the send.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Chat model", "Memory", "Gmail", "Calendar", "HTTP", "Search"].map(
                  (label, i) => (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
                    >
                      {label}
                    </motion.span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
