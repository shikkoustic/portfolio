"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

const GRADIENTS: Record<string, string> = {
  "Zyflow Automation": "linear-gradient(115deg, #1C3FB0 0%, #3C7BE0 55%, #7FD4E8 100%)",
  "CodeChef Bennett University": "linear-gradient(115deg, #B0511C 0%, #E08A3E 55%, #F2C86B 100%)",
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative flex h-full flex-col justify-center overflow-hidden px-5 py-6 sm:px-10"
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
        <h2 className="font-display mt-1 text-3xl font-extrabold uppercase tracking-tight text-cream sm:text-4xl">
          Outside the IDE
        </h2>

        <div className="relative mt-6 flex flex-col gap-5 border-l border-cream/15 pl-8 sm:mt-8 sm:gap-6 sm:pl-10">
          {experience.map((e, i) => (
            <motion.div
              key={e.org}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[41px] top-6 h-3.5 w-3.5 rounded-full border-2 sm:-left-[49px]"
                style={{ background: GRADIENTS[e.org], borderColor: "#1C1712" }}
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-3 text-cream shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)] sm:px-6 sm:py-4"
                style={{ background: GRADIENTS[e.org] }}
              >
                <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/25 text-sm font-extrabold backdrop-blur-sm">
                  {e.org
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/70">
                    {e.period}
                  </p>
                  <p className="font-display truncate text-base font-extrabold sm:text-lg">
                    {e.role}
                  </p>
                  <p className="truncate text-xs font-semibold text-cream/85 sm:text-sm">
                    {e.org}
                  </p>
                </div>
              </motion.div>

              <ul className="mt-2 flex flex-col gap-1 text-xs text-cream/60 sm:text-sm">
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
