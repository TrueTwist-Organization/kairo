import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a demo",
  description: `Talk to ${site.name} about website design, SEO, GEO, AEO, a mobile app, or an AI agent.`,
};

export default function ContactPage() {
  return (
    <div className="surface-noise pt-28 pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Contact
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Book a demo
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Tell us which piece you want first: the website, SEO, GEO, AEO,
            the mobile app, or the AI agent.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div className="rounded-2xl border border-line bg-bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block font-semibold hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Phone
              </p>
              <p className="mt-1 font-semibold">{site.phone}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <LeadForm type="demo" />
        </Reveal>
      </div>
    </div>
  );
}
