"use client";

import { motion } from "framer-motion";
import { cpPlatforms, cpSummary } from "@/data/cp";

const GRADIENTS: Record<string, string> = {
  LeetCode: "radial-gradient(130% 110% at 20% 10%, #E08A3E 0%, #C17A2E55 32%, #0B0B0C 68%)",
  CodeChef: "radial-gradient(130% 110% at 20% 10%, #8F6CE0 0%, #6C4FD655 32%, #0B0B0C 68%)",
  Codeforces: "radial-gradient(130% 110% at 20% 10%, #4C8A54 0%, #2F523355 32%, #0B0B0C 68%)",
};

export default function CompetitiveProgramming() {
  return (
    <section
      id="cp"
      className="flex min-h-screen flex-col justify-center border-b border-line bg-cream px-5 py-20 sm:px-10"
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
            {cpSummary.totalContests} rated contests, three platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cpPlatforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-[28px] p-7 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
              style={{ background: GRADIENTS[p.name] }}
            >
              <div className="relative flex items-center justify-between">
                <p className="font-display text-xl font-extrabold">{p.name}</p>
                <span className="rounded-full bg-black/25 px-2 py-1 text-xs backdrop-blur-sm">
                  ↗
                </span>
              </div>
              <p className="relative mt-0.5 text-xs text-cream/70">@{p.handle}</p>

              <p className="font-display relative mt-7 text-6xl font-black">
                {p.rating}
              </p>
              <p className="relative text-xs uppercase tracking-wide text-cream/80">
                {p.ratingLabel} · {p.rank}
              </p>

              <div className="relative mt-5 border-t border-cream/25 pt-4">
                <p className="font-display text-2xl font-extrabold">{p.stat}</p>
                <p className="text-xs uppercase tracking-wide text-cream/70">
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
