"use client";

import { motion } from "framer-motion";
import { accolades } from "@/data/accolades";
import BasketballSwish from "./BasketballSwish";

export default function About() {
  return (
    <section
      id="about"
      className="snap-section flex min-h-screen flex-col justify-center border-b border-line px-5 py-20 sm:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            ( About )
          </span>
          <h2 className="font-display mt-2 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Hey, I&rsquo;m Shikhar.
            <br />
            Problem first,
            <br />
            tools second.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            B.Tech CSE at Bennett University (9.35 CGPA), currently interning
            at Zyflow Automation on agentic AI systems. Outside of that I
            mentor DS-Algo at CodeChef Bennett, and I&rsquo;d rather ship a
            working, slightly rough prototype than talk about a perfect one.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            Off-screen: state-level competitive basketball, still played
            regularly — keep scrolling.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {accolades.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl border border-line bg-cream-2 p-4"
              >
                <p className="font-display text-base font-extrabold leading-tight">
                  {a.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {a.org}
                </p>
                <p className="mt-1 text-xs text-ink-soft">{a.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs -rotate-2 rounded-xl border border-line bg-cream-2 p-4 shadow-sm">
            <div className="grain relative h-full w-full overflow-hidden rounded-lg bg-ink">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, #6C4FD6 0%, transparent 45%), radial-gradient(circle at 75% 70%, #2A4FD6 0%, transparent 50%), radial-gradient(circle at 50% 100%, #C17A2E 0%, transparent 55%)",
                }}
              />
              <span className="font-display absolute bottom-4 left-4 text-5xl font-black text-cream">
                SS
              </span>
            </div>
            <span className="absolute -right-3 -top-3 rotate-6 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
              est. 2024
            </span>
          </div>

          <BasketballSwish />
        </motion.div>
      </div>
    </section>
  );
}
