"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { accolades } from "@/data/accolades";
import { Highlight } from "./Highlight";
import BasketballGame from "./BasketballGame";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line bg-cream px-5 py-6 text-ink sm:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 45% at 90% 0%, #7B5CE014 0%, transparent 60%), radial-gradient(50% 40% at 0% 100%, #D98A3212 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* ── LEFT: Text + Accolades ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            ( About )
          </span>
          <h2 className="font-display mt-1 text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Hey, I&rsquo;m Shikhar.
            <br />
            Problem first, tools second.
          </h2>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-soft sm:text-sm">
            Second-year CS at Bennett (
            <Highlight color="#3659E3">9.35 CGPA</Highlight>
            ), interning at <Highlight color="#3659E3">Zyflow</Highlight>{" "}
            on agentic AI, and running the books for{" "}
            <Highlight color="#D98A32">CodeChef Bennett</Highlight> as
            Finance Sub-Head.
          </p>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-soft sm:text-sm">
            Off-screen, I&rsquo;ve played competitive basketball at the{" "}
            <Highlight color="#7B5CE0">state level</Highlight>.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {accolades.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-xl border border-line bg-cream-2/60 p-3 backdrop-blur-sm"
              >
                <p className="font-display text-sm font-extrabold leading-tight text-ink">
                  {a.title}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                  {a.org}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-soft">{a.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Photo AND Basketball Game ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col items-center gap-3 lg:items-center"
        >
          {/* Photo */}
          <div className="relative aspect-[4/5] w-[210px] sm:w-[230px] -rotate-2 rounded-2xl border border-line bg-cream p-3 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:rotate-0">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink">
              <Image
                src="/shikhar.jpg"
                alt="Shikhar Srivastava"
                fill
                sizes="(max-width: 640px) 210px, 230px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(19,32,28,0.65) 0%, transparent 35%)",
                }}
              />
            </div>
            <span className="absolute -right-3 -top-3 rotate-6 rounded-full bg-ink px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-cream shadow-md">
              est. 2024
            </span>
          </div>

          {/* Interactive Basketball Game */}
          <div className="flex flex-col items-center">
            <p className="mb-1 text-[11px] text-ink-soft">
              Hold SPACE on the hoop below and try to make the shot.
            </p>
            <div className="origin-top scale-[0.88] sm:scale-95">
              <BasketballGame />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
