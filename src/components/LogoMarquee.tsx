"use client";

import { trustedBy } from "@/lib/content";

export function LogoMarquee() {
  const items = [...trustedBy, ...trustedBy];

  return (
    <section className="border-y border-line bg-bg-elevated py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Trusted by 100+ ops & product teams
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track gap-10 px-4">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display whitespace-nowrap text-lg font-semibold text-ink/35"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
