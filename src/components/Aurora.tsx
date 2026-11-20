"use client";

import { motion } from "framer-motion";

const BLOBS = [
  { color: "#3659E3", size: 520, x: "10%", y: "-10%", dur: 22 },
  { color: "#7B5CE0", size: 420, x: "70%", y: "0%", dur: 26 },
  { color: "#D98A32", size: 460, x: "40%", y: "55%", dur: 20 },
  { color: "#1E9BB0", size: 380, x: "85%", y: "60%", dur: 24 },
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
