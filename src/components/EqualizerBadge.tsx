"use client";

import { motion } from "framer-motion";

const BARS = [0.4, 1, 0.6, 0.9, 0.5];

export default function EqualizerBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 backdrop-blur-sm">
      <div className="flex h-4 items-end gap-[3px]">
        {BARS.map((base, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-cream"
            animate={{ scaleY: [base * 0.4, base, base * 0.3, base * 0.8, base * 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 1.1 + i * 0.12,
              ease: "easeInOut",
            }}
            style={{ height: "100%", originY: 1 }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide text-cream/80">
        Lo-fi on repeat while I build
      </span>
    </div>
  );
}
