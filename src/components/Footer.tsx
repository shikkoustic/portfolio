"use client";

import { motion } from "framer-motion";

const SCOREBOARD = [
  { n: "9.35", l: "CGPA" },
  { n: "741", l: "LeetCode solved" },
  { n: "1959", l: "LC contest rating" },
  { n: "669", l: "DSA problems curated" },
  { n: "1000+", l: "problems solved total" },
];

export default function Footer() {
  return (
    <section
      id="contact"
      className="snap-section flex min-h-screen flex-col justify-between bg-ink px-5 py-16 text-cream sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-cream/15 pb-6 text-xs uppercase tracking-[0.2em] text-cream/50">
          {SCOREBOARD.map((s) => (
            <span key={s.l} className="flex items-baseline gap-2">
              <span className="font-display text-xl font-extrabold text-cream">
                {s.n}
              </span>
              {s.l}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-12"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
          ( Got a problem worth building for? )
        </span>
        <h2 className="font-display mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">
          Let&rsquo;s build
          <br />
          something real.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="mailto:shiragh.4@gmail.com"
            className="rounded-full bg-cream px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:-translate-y-0.5"
          >
            shiragh.4@gmail.com
          </a>
          <a
            href="https://github.com/shikkoustic"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cream/40 px-6 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:bg-cream hover:text-ink"
          >
            GitHub ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cream/40 px-6 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:bg-cream hover:text-ink"
          >
            Resume ↗
          </a>
        </div>
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-wide text-cream/40">
        <span>© 2026 Shikhar Srivastava</span>
        <span>Built with Next.js · deployed on Vercel</span>
      </div>
    </section>
  );
}
