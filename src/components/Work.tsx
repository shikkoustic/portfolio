"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectGlyph } from "./ProjectGlyph";

// Explicit placement, not source-order auto-placement: the implicit grid put
// Examen+Vayu under BaseCase in a new row (auto-placement never backtracks
// into a column it already passed), leaving a gap under CricLens instead of
// the symmetric two-column block that was actually wanted. Explicit
// col-start/row-start removes the ambiguity entirely.
//   Row 1-2, col 1-2: BaseCase (big square)
//   Row 1,   col 3-4: CricLens
//   Row 2,   col 3-4: Vayu — stretches full width, ends flush with CricLens
//   Row 3,   col 1-2: ResumeForge
//   Row 3,   col 3-4: Examen
const bySpan: Record<string, string> = {
  basecase: "sm:col-start-1 sm:col-span-2 sm:row-start-1 sm:row-span-2",
  criclens: "sm:col-start-3 sm:col-span-2 sm:row-start-1 sm:row-span-1",
  vayu: "sm:col-start-3 sm:col-span-2 sm:row-start-2 sm:row-span-1",
  resumeforge: "sm:col-start-1 sm:col-span-2 sm:row-start-3 sm:row-span-1",
  examen: "sm:col-start-3 sm:col-span-2 sm:row-start-3 sm:row-span-1",
};

// Every card except BaseCase (the only row-span-2 tile) has just 220px of
// height to work with, so they all need the same compact vertical rhythm —
// one-line description, a trimmed tag count — or the tags get crammed
// against the bottom edge.
const VCOMPACT = new Set(["criclens", "resumeforge", "examen", "vayu"]);
const MAX_TAGS: Record<string, number> = {
  basecase: 4,
  criclens: 3,
  resumeforge: 3,
  examen: 3,
  vayu: 3,
};

export default function Work() {
  return (
    <section id="work" className="border-b border-line bg-cream px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            ( Selected work )
          </span>
          <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Look through my lens
          </h2>
          <span className="mt-1 block text-xs text-ink-soft sm:hidden">
            Tap a card for the full story
          </span>
          <span className="mt-1 hidden text-xs text-ink-soft sm:block">
            Hover a card for the full story
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 sm:[grid-auto-rows:220px]">
          {projects.map((p, i) => {
            const target = p.href.startsWith("http") ? "_blank" : undefined;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`${bySpan[p.id]} group [perspective:1400px]`}
              >
                <div className="relative h-full min-h-[220px] w-full [transform-style:preserve-3d] transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(.33,.75,.3,1)] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                  {/* FRONT */}
                  <a
                    href={p.href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] p-7 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden]"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(130% 110% at 18% 12%, ${p.accent} 0%, ${p.accent}55 32%, #0B0B0C 68%)`,
                      }}
                    />
                    <ProjectGlyph
                      id={p.id}
                      className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-cream/15 sm:h-48 sm:w-48"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="rounded-full bg-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                        {p.status === "live" ? "Live" : "In progress"}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-cream/70">
                        {p.period}
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="font-display text-3xl font-extrabold leading-tight drop-shadow-sm sm:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-cream/80 sm:text-sm">
                        {p.tagline}
                      </p>
                      <p
                        className={`mt-3 max-w-md text-xs leading-relaxed text-cream/85 sm:text-sm ${
                          VCOMPACT.has(p.id) ? "line-clamp-1" : "line-clamp-2"
                        }`}
                      >
                        {p.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.slice(0, MAX_TAGS[p.id] ?? 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-cream/30 bg-black/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>

                  {/* BACK */}
                  <a
                    href={p.href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] p-7 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{ background: p.accent }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-70"
                      style={{ background: "radial-gradient(120% 100% at 85% 100%, rgba(0,0,0,0.45) 0%, transparent 60%)" }}
                    />
                    <div className="relative flex items-start justify-between">
                      <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">
                        {p.name}
                      </h3>
                      <span className="shrink-0 text-lg opacity-80">↗</span>
                    </div>
                    <p className="relative max-w-md text-xs leading-relaxed text-cream/95 sm:text-sm">
                      {p.longDescription}
                    </p>
                    <div className="relative flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-cream/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-cream/90">
                        {p.href === "#" ? "Not deployed yet" : "View project"}
                      </span>
                    </div>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
