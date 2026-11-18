"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="snap-section flex min-h-screen flex-col justify-center border-b border-line px-5 py-20 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          ( Experience )
        </span>
        <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          Outside the IDE
        </h2>

        <div className="relative mt-12 flex flex-col gap-10 border-l border-line pl-8 sm:pl-10">
          {experience.map((e, i) => (
            <motion.div
              key={e.org}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[41px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-cream sm:-left-[49px]"
                style={{ background: e.accent }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                  {e.role}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {e.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: e.accent }}>
                {e.org}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {e.points.map((pt) => (
                  <li
                    key={pt}
                    className="text-sm leading-relaxed text-ink-soft sm:text-base"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
