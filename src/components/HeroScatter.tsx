"use client";

import { motion } from "framer-motion";

const ICONS = [
  { id: "keyboard", left: "4%", top: "14%", size: 76, rot: -8, delay: 0 },
  { id: "book", left: "88%", top: "18%", size: 60, rot: 10, delay: 0.4 },
  { id: "laptop", left: "8%", top: "68%", size: 84, rot: 6, delay: 0.8 },
  { id: "basketball", left: "90%", top: "64%", size: 56, rot: -12, delay: 1.2 },
];

function Icon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "keyboard":
      return (
        <svg {...common}>
          <rect x="4" y="20" width="56" height="28" rx="3" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={10 + i * 8} y1="22" x2={10 + i * 8} y2="34" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={13.5 + i * 8} y="22" width="5" height="18" rx="1" fill="currentColor" stroke="none" opacity="0.9" />
          ))}
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M32 14c-6-5-16-6-24-4v38c8-2 18-1 24 4" />
          <path d="M32 14c6-5 16-6 24-4v38c-8-2-18-1-24 4" />
          <path d="M32 14v42" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="12" y="10" width="40" height="26" rx="2" />
          <path d="M4 48h56l-5-10H9Z" />
          <line x1="26" y1="42" x2="38" y2="42" />
        </svg>
      );
    case "basketball":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" />
          <path d="M10 32h44M32 10v44" />
          <path d="M16 14c6 8 6 28 0 36M48 14c-6 8-6 28 0 36" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HeroScatter() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
      {ICONS.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-ink/[0.08]"
          style={{ left: icon.left, top: icon.top, width: icon.size, height: icon.size }}
          initial={{ opacity: 0, rotate: icon.rot - 6, y: 10 }}
          animate={{ opacity: 1, rotate: icon.rot, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: icon.delay },
            rotate: { duration: 0.8, delay: icon.delay },
            y: { duration: 5 + icon.delay, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
          }}
        >
          <Icon id={icon.id} />
        </motion.div>
      ))}
    </div>
  );
}
