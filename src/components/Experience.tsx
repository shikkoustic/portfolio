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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line bg-cream px-5 py-24 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          ( Experience )
        </span>
        <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          Outside the IDE
        </h2>
      </div>

      <div className="relative mx-auto mt-16 flex w-full max-w-2xl flex-col items-center">
        <span className="absolute top-0 bottom-0 w-px bg-line" />

        {experience.map((e, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={e.org} className="relative z-10 w-full py-7">
              <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cream bg-ink" />

              <motion.div
                initial={{ opacity: 0, x: flip ? 40 : -40, rotate: flip ? 2 : -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: flip ? 1.5 : -1.5 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center gap-4 rounded-full px-6 py-5 text-cream shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] sm:px-8 sm:py-6 ${
                  flip ? "ml-auto flex-row-reverse text-right" : "mr-auto"
                }`}
                style={{
                  background: GRADIENTS[e.org],
                  width: "88%",
                }}
              >
                <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/25 text-lg font-extrabold backdrop-blur-sm">
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
                  <p className="font-display truncate text-xl font-extrabold sm:text-2xl">
                    {e.role}
                  </p>
                  <p className="text-xs font-semibold text-cream/85 sm:text-sm">{e.org}</p>
                </div>

                <span className="font-display shrink-0 text-xl opacity-70">
                  {flip ? "←" : "→"}
                </span>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`mt-4 flex flex-col gap-1.5 text-sm text-ink-soft sm:w-[88%] ${
                  flip ? "ml-auto text-right" : "mr-auto"
                }`}
              >
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
