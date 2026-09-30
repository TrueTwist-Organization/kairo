"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/content";

const links = [
  { href: "/#agents", label: "Agents" },
  { href: "/#solutions", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/#results", label: "Results" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "CRM Login" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="flex items-center justify-between gap-3 rounded-full border border-line bg-white px-4 py-3 shadow-[0_8px_40px_rgba(11,13,18,0.06)]"
        >
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-sm">
              Book a demo
            </Link>
          </div>

          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl px-4 md:hidden sm:px-6"
          >
            <div className="glass rounded-3xl p-4 shadow-lg">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium hover:bg-black/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
