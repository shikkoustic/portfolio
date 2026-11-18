"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="border-b border-line px-5 py-20 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
            I&rsquo;m a B.Tech CSE student who&rsquo;d rather ship a working,
            slightly rough prototype than talk about a perfect one. Most of
            what&rsquo;s here started as a hackathon problem statement or a
            course project that I kept pushing past the deadline — computer
            vision, applied ML, and full-stack apps, end to end.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            I use AI tools heavily in how I build — so what you see live is
            usually close to what shipped.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-xl border border-line bg-cream-2 p-4 shadow-sm"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
