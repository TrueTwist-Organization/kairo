"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              We&apos;ve got your back
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              FAQ
            </h2>
            <p className="mt-4 text-muted">
              Straight answers for founders, ops leads, and IT partners evaluating
              agentic automation.
            </p>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div className="overflow-hidden rounded-[20px] border border-line bg-bg-elevated">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base font-semibold sm:text-lg">
                        <span className="mr-3 text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                      </span>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
