import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getSolution, solutions, site } from "@/lib/content";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return solutions.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const solution = getSolution(id);
  if (!solution) return { title: "Solution" };
  return {
    title: solution.title,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { id } = await params;
  const solution = getSolution(id);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.id !== solution.id).slice(0, 2);

  return (
    <div className="surface-noise pb-20 pt-28 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/#solutions"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft size={16} />
          All solutions
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p className="accent-chip w-fit">
              {solution.metric} {solution.metricLabel}
            </p>
            <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {solution.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {solution.description}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-line bg-bg-elevated px-3 py-1.5 text-xs font-semibold text-ink-soft">
              {solution.guarantee}
            </p>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold">The problem</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {solution.problem}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold">How {site.name} works</h2>
              <ol className="mt-5 space-y-4">
                {solution.approach.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-line bg-bg-elevated p-4"
                  >
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[24px] border border-line bg-ink p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Outcomes
              </p>
              <ul className="mt-5 space-y-3">
                {solution.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="btn-primary mt-8 w-full !bg-accent !text-accent-ink hover:!bg-accent-hot"
              >
                Book a demo
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-[24px] border border-line bg-bg-elevated p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                More solutions
              </p>
              <div className="mt-4 space-y-3">
                {others.map((item) => (
                  <Link
                    key={item.id}
                    href={`/solutions/${item.id}`}
                    className="block rounded-2xl border border-line px-4 py-3 transition hover:border-ink/20"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.metric} {item.metricLabel}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
