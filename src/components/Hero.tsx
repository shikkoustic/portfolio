"use client";

import { motion } from "framer-motion";
import Aurora from "./Aurora";
import HeroScatter from "./HeroScatter";
import MixerPanel from "./MixerPanel";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink px-5 pb-20 pt-32 text-cream sm:px-10"
    >
      <Aurora />
      <HeroScatter />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-cream/60">
          <span className="tick pl-3">&nbsp;Builder &amp; CS student</span>
          <span>( 2026 )</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MixerPanel />
        </motion.div>

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
              <span className="font-display text-2xl font-extrabold text-cream/60 sm:text-4xl">
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
            <p className="max-w-sm text-sm leading-relaxed text-cream/75 sm:text-base">
              I&rsquo;m Shikhar — B.Tech CSE at Bennett University. I build
              computer-vision, ML, and full-stack products end to end: data,
              model, interface, deploy. { "{ "}mostly shipped, occasionally still cooking
              {" }" }.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-cream px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                View my work
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
        </div>
      </div>

      <span
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 right-0 select-none text-[28vw] font-black leading-none text-cream/[0.045]"
      >
        SS
      </span>
    </section>
  );
}
