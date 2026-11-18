"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Direction", href: "#direction" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-line/80 bg-cream/90 px-3 py-2 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-cream"
        >
          <span className="font-display text-xs font-extrabold leading-none tracking-tight">
            SS
          </span>
        </a>

        <div className="hidden items-center gap-5 text-xs font-medium uppercase tracking-wide text-ink-soft sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:opacity-90"
        >
          Let&rsquo;s talk
        </a>
      </nav>
    </motion.header>
  );
}
