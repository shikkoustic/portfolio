"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden border-b border-line px-5 pb-20 pt-40 sm:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink-soft">
          <span className="tick pl-3">&nbsp;Builder &amp; CS student</span>
          <span>( 2026 )</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display text-[14vw] font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Pick the
            <br />
            problem.
            <br />
            <span className="inline-flex items-center gap-3">
              Ship it.
              <span className="font-display text-2xl font-extrabold text-ink-soft sm:text-4xl">
                ✺
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              I&rsquo;m Shikhar — B.Tech CSE at Bennett University. I build
              computer-vision, ML, and full-stack products end to end: data,
              model, interface, deploy. { "{ "}mostly shipped, occasionally still cooking
              {" }" }.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                View my work
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/70 px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream"
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* oversized background numerals, OldSoul-style large type as texture */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 right-0 select-none text-[28vw] font-black leading-none text-ink/[0.035]"
      >
        SS
      </span>
    </section>
  );
}
