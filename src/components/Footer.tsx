import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            {site.description}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/#agents" className="hover:text-white">
                Agents
              </Link>
            </li>
            <li>
              <Link href="/#solutions" className="hover:text-white">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/#results" className="hover:text-white">
                Results
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.phone}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Kairo. All rights reserved.</p>
          <p>Built for automation teams who need outcomes, not toolkits.</p>
        </div>
      </div>
    </footer>
  );
}
