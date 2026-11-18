"use client";

import { motion } from "framer-motion";

const ROLES = [
  {
    title: "Smart India Hackathon 2026",
    org: "Team ELAVI — CadastraAI",
    note: "Parcel-boundary mapping from satellite imagery",
    accent: "#2A4FD6",
  },
  {
    title: "Smart India Hackathon 2026",
    org: "Team DepthWizard",
    note: "Depth-map generation, Copernicus DEM + fine-tuned DA-V2",
    accent: "#2F5233",
  },
  {
    title: "Amazon ML Challenge 2026",
    org: "Participant",
    note: "Leaderboard score improved 0.919 → 0.9425",
    accent: "#C17A2E",
  },
  {
    title: "DSA Club, Bennett University",
    org: "BaseCase",
    note: "Built the club's 669-problem tracker end to end",
    accent: "#6C4FD6",
  },
];

export default function Direction() {
  return (
    <section
      id="direction"
      className="border-b border-line bg-cream-2 px-5 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          ( Direction )
        </span>
        <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          Where I&rsquo;ve pointed my time
        </h2>

        <div className="scrollbar-none -mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-4">
          {ROLES.map((r, i) => (
            <motion.div
              key={r.org}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ x: 6 }}
              className="flex min-w-[300px] shrink-0 items-center gap-4 rounded-full border-l-8 bg-ink px-6 py-4 text-cream shadow-sm sm:min-w-[380px]"
              style={{ borderColor: r.accent }}
            >
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cream/60">
                  {r.title}
                </p>
                <p className="font-display truncate text-lg font-bold">
                  {r.org}
                </p>
                <p className="mt-0.5 text-xs text-cream/70">{r.note}</p>
              </div>
              <span className="ml-auto font-display text-xl text-cream/50">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
