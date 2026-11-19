"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BasketballGame from "./BasketballGame";

export default function PlayGame() {
  return (
    <section
      className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-5 py-6 text-cream sm:px-10"
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
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center gap-5"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[150px] -rotate-2 rounded-xl border border-cream/15 bg-cream/5 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
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

        <p className="max-w-xs text-center text-xs leading-relaxed text-cream/60">
          Hold SPACE on the hoop below and try to make the shot.
        </p>

        <BasketballGame />
      </motion.div>
    </section>
  );
}
