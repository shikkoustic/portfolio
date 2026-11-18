"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-4 rounded-full border border-line/80 bg-cream/90 py-2 pl-4 pr-2 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
        <a href="#top" className="font-display text-sm font-extrabold tracking-tight text-ink">
          Shikhar Srivastava
        </a>
        <a
          href="#contact"
          className="rounded-full bg-ink px-5 py-2 text-xs font-bold uppercase tracking-wide text-cream transition hover:opacity-90"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
