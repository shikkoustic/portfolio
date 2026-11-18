"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}

export default function Contact() {
  const now = useNow();
  const dateStr = now
    ? now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
  const timeStr = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "—";

  return (
    <section id="contact" className="bg-ink px-5 py-20 text-cream sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-md rounded-sm bg-cream px-7 py-8 text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{
          fontFamily: "var(--font-body)",
          clipPath:
            "polygon(0% 1%, 3% 0%, 7% 1%, 11% 0%, 15% 1%, 19% 0%, 23% 1%, 27% 0%, 31% 1%, 35% 0%, 39% 1%, 43% 0%, 47% 1%, 51% 0%, 55% 1%, 59% 0%, 63% 1%, 67% 0%, 71% 1%, 75% 0%, 79% 1%, 83% 0%, 87% 1%, 91% 0%, 95% 1%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <p className="font-display text-xl font-extrabold">
          Shikhar Srivastava
        </p>
        <p className="text-xs text-ink-soft">Builder &amp; CS student</p>

        <div className="my-4 border-t border-dashed border-ink/30" />

        <div className="flex justify-between text-xs text-ink-soft">
          <span>Date</span>
          <span>{dateStr}</span>
        </div>
        <div className="flex justify-between text-xs text-ink-soft">
          <span>Time</span>
          <span>{timeStr}</span>
        </div>

        <div className="my-4 border-t border-dashed border-ink/30" />

        <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-ink-soft">
          <span>Item</span>
          <span>Qty</span>
        </div>
        {[
          "Intro",
          "Selected work",
          ...projects.map((p) => p.name),
          "About",
          "Direction",
          "Stack",
        ].map((item) => (
          <div key={item} className="flex justify-between text-sm">
            <span>{item}</span>
            <span>1</span>
          </div>
        ))}

        <div className="my-4 border-t border-dashed border-ink/30" />

        <div className="flex justify-between text-sm font-bold">
          <span>Paid in</span>
          <span>Attention</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Change</span>
          <span>A new idea</span>
        </div>

        <div className="my-4 border-t border-dashed border-ink/30" />

        <p className="font-display text-sm font-bold">
          Got a problem worth building for?
        </p>

        <div className="mt-4 flex flex-col gap-2 text-sm">
          <a
            href="mailto:shiragh.4@gmail.com"
            className="underline underline-offset-2"
          >
            shiragh.4@gmail.com
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/shikkoustic"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Resume
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-ink-soft/60">
          thanks for scrolling
        </p>
      </motion.div>

      <p className="mt-10 text-center text-xs text-cream/40">
        © {now ? now.getFullYear() : "2026"} Shikhar Srivastava. Built with
        Next.js, deployed on Vercel.
      </p>
    </section>
  );
}
