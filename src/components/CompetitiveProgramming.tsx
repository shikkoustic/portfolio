"use client";

import { motion } from "framer-motion";
import { cpPlatforms, cpSummary } from "@/data/cp";

export default function CompetitiveProgramming() {
  return (
    <section
      id="cp"
      className="snap-section flex min-h-screen flex-col justify-center border-b border-line bg-cream-2 px-5 py-20 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              ( Competitive programming )
            </span>
            <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
              1000+ problems deep
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-soft">
            {cpSummary.totalContests} rated contests across three platforms,
            building a habit of time-efficient problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cpPlatforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-cream p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                style={{ background: p.accent, opacity: 0.22 }}
              />
              <div className="relative flex items-center justify-between">
                <p className="font-display text-xl font-extrabold">{p.name}</p>
                <span className="text-xs text-ink-soft">↗</span>
              </div>
              <p className="relative mt-0.5 text-xs text-ink-soft">
                @{p.handle}
              </p>

              <p
                className="font-display relative mt-6 text-5xl font-black"
                style={{ color: p.accent }}
              >
                {p.rating}
              </p>
              <p className="relative text-xs uppercase tracking-wide text-ink-soft">
                {p.ratingLabel} · {p.rank}
              </p>

              <div className="relative mt-5 border-t border-line pt-4">
                <p className="font-display text-2xl font-extrabold">
                  {p.stat}
                </p>
                <p className="text-xs uppercase tracking-wide text-ink-soft">
                  {p.statLabel}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
