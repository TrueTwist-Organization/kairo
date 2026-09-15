"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  return (
    <section className="border-y border-line bg-bg-elevated py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Testimonials
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Sleek ops delivery, rated 5.0 by teams
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal>
            <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-line bg-ink p-8 text-white sm:p-10">
              <div className="absolute -right-8 top-0 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    “{item.quote}”
                  </p>
                  <div className="mt-8">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-white/55">{item.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    i === index
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white hover:border-ink/20"
                  }`}
                >
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p
                    className={`mt-1 text-xs ${
                      i === index ? "text-white/55" : "text-muted"
                    }`}
                  >
                    {t.role}
                  </p>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
