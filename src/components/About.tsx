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
      className="relative overflow-hidden px-5 py-20 text-cream sm:px-10"
      style={{ background: "#13201C" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 45% at 90% 0%, #6C4FD622 0%, transparent 60%), radial-gradient(50% 40% at 0% 100%, #C17A2E1E 0%, transparent 60%)",
        }}
      />

      {/* ── Bio + Accolades ── */}
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Left: text + accolades */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
              ( About )
            </span>
            <h2 className="font-display mt-1 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream sm:text-4xl">
              Hey, I&rsquo;m Shikhar.
              <br />
              Problem first, tools second.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
              Second-year CS at Bennett (
              <Highlight color="#4C8AE0" dark>
                9.35 CGPA
              </Highlight>
              ), interning at{" "}
              <Highlight color="#4C8AE0" dark>
                Zyflow
              </Highlight>{" "}
              on agentic AI, and running the books for{" "}
              <Highlight color="#E0A24C" dark>
                CodeChef Bennett
              </Highlight>{" "}
              as Finance Sub-Head.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
              Off-screen, I&rsquo;ve played competitive basketball at the{" "}
              <Highlight color="#9A7CE0" dark>
                state level
              </Highlight>
              .
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {accolades.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-xl border border-cream/15 bg-cream/5 p-3.5 backdrop-blur-sm"
                >
                  <p className="font-display text-base font-extrabold leading-tight text-cream">
                    {a.title}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-cream/60">
                    {a.org}
                  </p>
                  <p className="mt-1 text-xs text-cream/50">{a.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative mx-auto aspect-[4/5] w-[150px] -rotate-2 rounded-xl border border-cream/15 bg-cream/5 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-ink">
                <Image
                  src="/shikhar.jpg"
                  alt="Shikhar Srivastava"
                  fill
                  sizes="150px"
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
              <span className="absolute -right-3 -top-3 rotate-6 rounded-full bg-cream px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-ink">
                est. 2024
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Basketball Game ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="max-w-xs text-center text-xs leading-relaxed text-cream/60">
            Hold SPACE on the hoop below and try to make the shot.
          </p>
          <BasketballGame />
        </motion.div>
      </div>
    </section>
  );
}
