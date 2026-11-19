"use client";

import { motion } from "framer-motion";
import { projects as allProjects } from "@/data/projects";
import { ProjectGlyph } from "./ProjectGlyph";

// ResumeForge dropped from this grid - four projects in a plain, equal 2x2
// is simpler and sturdier than five in an asymmetric layout (which kept
// overflowing its own rows once the section's height budget got tighter).
const projects = allProjects.filter((p) => p.id !== "resumeforge");

const VCOMPACT = new Set(["criclens", "examen", "vayu"]);
const MAX_TAGS: Record<string, number> = {
  basecase: 4,
  criclens: 3,
  examen: 3,
  vayu: 3,
};

export default function Work() {
  return (
    <section
      id="work"
      className="flex h-full flex-col border-b border-line bg-cream px-5 py-6 sm:px-10 sm:py-8"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        <div className="mb-4 shrink-0 sm:mb-5">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            ( Selected work )
          </span>
          <h2 className="font-display mt-1 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Projects
          </h2>
          <span className="mt-1 block text-xs text-ink-soft sm:hidden">
            Tap a card for the full story
          </span>
          <span className="mt-1 hidden text-xs text-ink-soft sm:block">
            Hover a card for the full story
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
          {projects.map((p, i) => {
            const target = p.href.startsWith("http") ? "_blank" : undefined;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group [perspective:1400px]"
              >
                <div
                  className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[850ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] will-change-transform"
                  tabIndex={0}
                  style={{ transformOrigin: "center center" }}
                >
                  {/* FRONT */}
                  <a
                    href={p.href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] sm:p-5"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(130% 110% at 18% 12%, ${p.accent} 0%, ${p.accent}55 32%, #0B0B0C 68%)`,
                      }}
                    />
                    <ProjectGlyph
                      id={p.id}
                      className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 text-cream/15 sm:h-40 sm:w-40"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="rounded-full bg-cream px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                        {p.status === "live" ? "Live" : "In progress"}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-cream/70">
                        {p.period}
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="font-display text-xl font-extrabold leading-tight drop-shadow-sm sm:text-2xl">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-cream/80 sm:text-xs">
                        {p.tagline}
                      </p>
                      <p
                        className={`mt-1.5 max-w-md text-[11px] leading-relaxed text-cream/85 sm:text-xs ${
                          VCOMPACT.has(p.id) ? "line-clamp-1" : "line-clamp-2"
                        }`}
                      >
                        {p.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.tags.slice(0, MAX_TAGS[p.id] ?? 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-cream/30 bg-black/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream backdrop-blur-sm"
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
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5"
                    style={{
                      background: `radial-gradient(130% 110% at 82% 88%, ${p.accent} 0%, ${p.accent}55 32%, #0B0B0C 68%)`,
                    }}
                  >
                    {/* depth vignette */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 70% at 15% 10%, rgba(255,255,255,0.07) 0%, transparent 55%), radial-gradient(100% 80% at 85% 100%, rgba(0,0,0,0.5) 0%, transparent 60%)",
                      }}
                    />
                    {/* ghosted glyph watermark */}
                    <ProjectGlyph
                      id={p.id}
                      className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 text-cream/10 sm:h-40 sm:w-40"
                    />
                    <div className="relative flex items-start justify-between">
                      <h3 className="font-display text-lg font-extrabold leading-tight sm:text-xl">
                        {p.name}
                      </h3>
                      <span className="shrink-0 text-lg opacity-80">↗</span>
                    </div>
                    <p className={`relative max-w-md text-[11px] leading-relaxed text-cream/95 sm:text-xs ${VCOMPACT.has(p.id) ? "line-clamp-2" : "line-clamp-4"}`}>
                      {p.longDescription}
                    </p>
                    <div className="relative flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-cream/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-cream"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-cream/90">
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
