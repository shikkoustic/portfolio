"use client";

import { motion } from "framer-motion";
import Aurora from "./Aurora";
import HeroScatter from "./HeroScatter";
import MixerPanel from "./MixerPanel";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#E7EAF4] px-5 pb-20 pt-32 text-ink sm:px-10"
    >
      <Aurora />
      <HeroScatter />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-ink-soft">
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
                className="rounded-full border border-ink/25 px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream"
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <span
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 right-0 select-none text-[28vw] font-black leading-none text-ink/[0.04]"
      >
        SS
      </span>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-ink-soft"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 6L8 11L13 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
