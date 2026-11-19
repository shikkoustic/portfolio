"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/experience";

// Keyed by role, not org - two entries now share "CodeChef Bennett
// University" (Junior Core, then Finance Sub-Head), so org alone isn't a
// unique key anymore.
const GRADIENTS: Record<string, string> = {
  "Software Development Intern": "linear-gradient(115deg, #1C3FB0 0%, #3C7BE0 55%, #7FD4E8 100%)",
  "Finance Team Sub-Head": "linear-gradient(115deg, #B0511C 0%, #E08A3E 55%, #F2C86B 100%)",
  "Junior Core Member": "linear-gradient(115deg, #6B4A1C 0%, #9A6E2E 55%, #C9A25C 100%)",
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line px-5 py-6 sm:px-10"
      style={{ background: "#1C1712" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, #3C7BE022 0%, transparent 60%), radial-gradient(55% 45% at 10% 100%, #E08A3E22 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
          ( Experience )
        </span>
        <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-cream sm:text-3xl">
          Outside the IDE
        </h2>

        <div className="relative mt-4 flex flex-col gap-3 border-l border-cream/15 pl-8 sm:mt-5 sm:gap-3.5 sm:pl-10">
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[41px] top-5 h-3.5 w-3.5 rounded-full border-2 sm:-left-[49px]"
                style={{ background: GRADIENTS[e.role], borderColor: "#1C1712" }}
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-2 text-cream shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)] sm:px-5 sm:py-2.5"
                style={{ background: GRADIENTS[e.role] }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream p-1 backdrop-blur-sm sm:h-9 sm:w-9">
                  <Image
                    src={e.logo}
                    alt={e.org}
                    width={24}
                    height={24}
                    className="h-full w-full object-contain"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-cream/70 sm:text-[10px]">
                    {e.period}
                  </p>
                  <p className="font-display truncate text-sm font-extrabold sm:text-base">
                    {e.role}
                  </p>
                  <p className="truncate text-[11px] font-semibold text-cream/85 sm:text-xs">
                    {e.org}
                  </p>
                </div>
              </motion.div>

              <ul className="mt-1.5 flex flex-col gap-0.5 text-[11px] text-cream/60 sm:text-xs">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
