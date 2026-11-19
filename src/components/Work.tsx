"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectGlyph } from "./ProjectGlyph";
import { TiltCard } from "./TiltCard";

const bySpan: Record<string, string> = {
  basecase: "sm:col-span-2 sm:row-span-2",
  criclens: "sm:col-span-2 sm:row-span-1",
  resumeforge: "sm:col-span-1 sm:row-span-1",
  examen: "sm:col-span-1 sm:row-span-1",
  vayu: "sm:col-span-1 sm:row-span-1",
};

// Every card except BaseCase (the only row-span-2 tile) has just 220px of
// height to work with, so they all need the same compact vertical rhythm —
// one-line description, a trimmed tag count — or the tags get crammed
// against the bottom edge. Title size still follows column width (wide
// 2-col cards can afford a bigger title than 1-col ones).
const WIDE_TITLE = new Set(["basecase", "criclens"]);
const VCOMPACT = new Set(["criclens", "resumeforge", "examen", "vayu"]);
const MAX_TAGS: Record<string, number> = {
  basecase: 4,
  criclens: 3,
  resumeforge: 2,
  examen: 2,
  vayu: 2,
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
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 sm:[grid-auto-rows:220px]">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={bySpan[p.id]}
            >
              <TiltCard
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] p-7 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(130% 110% at 18% 12%, ${p.accent} 0%, ${p.accent}55 32%, #0B0B0C 68%)`,
                  }}
                />
                <ProjectGlyph
                  id={p.id}
                  className={`pointer-events-none absolute -bottom-8 -right-8 text-cream/15 ${
                    WIDE_TITLE.has(p.id) ? "h-48 w-48 sm:h-56 sm:w-56" : "h-28 w-28"
                  }`}
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
                  <h3
                    className={`font-display font-extrabold leading-tight drop-shadow-sm ${
                      WIDE_TITLE.has(p.id) ? "text-3xl sm:text-4xl" : "text-2xl"
                    }`}
                  >
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
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
