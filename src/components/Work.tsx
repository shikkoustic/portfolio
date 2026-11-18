"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <section id="work" className="border-b border-line px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              ( Selected work )
            </span>
            <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
              Look through my lens
            </h2>
          </div>
          <span className="hidden text-xs uppercase tracking-wide text-ink-soft sm:block">
            scroll →
          </span>
        </div>

        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative flex w-[280px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-line bg-cream-2 p-6 sm:w-[320px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: p.accent, opacity: 0.18 }}
              />

              <div className="relative flex items-start justify-between">
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cream"
                  style={{ background: p.accent }}
                >
                  {p.status === "live" ? "Live" : "In progress"}
                </span>
                <span className="font-display text-xs text-ink-soft">↗</span>
              </div>

              <div className="relative mt-10">
                <h3 className="font-display text-2xl font-extrabold leading-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
                  {p.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-cream px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
