"use client";

import { motion } from "framer-motion";

const BLOBS = [
  { color: "#2A4FD6", size: 520, x: "10%", y: "-10%", dur: 22 },
  { color: "#6C4FD6", size: 420, x: "70%", y: "0%", dur: 26 },
  { color: "#C17A2E", size: 460, x: "40%", y: "55%", dur: 20 },
  { color: "#2F8FB5", size: 380, x: "85%", y: "60%", dur: 24 },
];

export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            opacity: 0.45,
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: b.dur,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-ink/40" />
    </div>
  );
}
