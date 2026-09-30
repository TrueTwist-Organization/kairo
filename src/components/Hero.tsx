"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, ShieldCheck } from "lucide-react";
import { site } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden surface-noise pt-28">
      <div className="pointer-events-none absolute inset-0 grid-fade" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-14">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="accent-chip"
          >
            <Bot size={12} />
            Cash-flowing AI agency
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display mt-5 text-[clamp(2.8rem,7vw,5.2rem)] font-bold leading-none tracking-tight text-ink"
          >
            {site.name}
            <span className="text-accent">.</span>
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-5 max-w-xl text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[1.15] tracking-tight text-ink-soft"
          >
            A fully automated AI business.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            Website design, SEO, GEO, AEO, a mobile application, and an AI
            agent that researches, writes, follows up, and helps book the next
            conversation.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/contact" className="btn-primary">
              Book a demo
              <ArrowRight size={16} />
            </Link>
            <Link href="/#agents" className="btn-secondary">
              See agents
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4 text-sm text-ink-soft"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-success" />
              Unhappy? Don&apos;t pay
            </div>
            <div className="h-3.5 w-px bg-line" />
            <div>Website, SEO, GEO, AEO, app, agent</div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="relative"
        >
          <div className="animate-float relative overflow-hidden rounded-[28px] border border-line bg-ink p-6 text-white shadow-[0_40px_80px_rgba(11,13,18,0.28)] sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink">
                    <Bot size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      AI agent platform
                    </p>
                    <p className="text-sm font-semibold">Cold Email Campaign Agent</p>
                  </div>
                </div>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-ink">
                  RUNNING
                </span>
              </div>

              <p className="font-display mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                Research a prospect.
                <br />
                Draft the outreach.
              </p>

              <div className="mt-7 space-y-2.5">
                {[
                  { step: "Read the knowledge base", state: "done" },
                  { step: "Connect Gmail and calendar", state: "done" },
                  { step: "Draft with the AI email writer", state: "active" },
                  { step: "Wait for a person to review", state: "pending" },
                ].map((row, i) => (
                  <motion.div
                    key={row.step}
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        row.state === "done"
                          ? "bg-success"
                          : row.state === "active"
                            ? "bg-accent animate-pulse"
                            : "bg-white/25"
                      }`}
                    />
                    <span className="text-sm text-white/75">{row.step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
