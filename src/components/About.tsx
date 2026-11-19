"use client";

import { motion } from "framer-motion";
import { accolades } from "@/data/accolades";
import { Highlight } from "./Highlight";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex h-full flex-col justify-center overflow-hidden px-5 py-6 text-cream sm:px-10"
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-2xl"
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
    </section>
  );
}
