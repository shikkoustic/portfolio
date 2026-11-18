"use client";

import { motion } from "framer-motion";

const PHRASE = "PICK THE PROBLEM ✦ SHIP THE SOLUTION ✦ ";
const TEXT = PHRASE.repeat(2);

export default function RotatingBadge({ size = 176 }: { size?: number }) {
  const r = size / 2 - 15;
  const cx = size / 2;
  const cy = size / 2;
  const pathId = "badge-ring";

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${2 * r},0`}
          />
        </defs>
        <text className="font-display" fontSize="10.5" letterSpacing="2.5" fontWeight={800}>
          <textPath href={`#${pathId}`} fill="#15130F">
            {TEXT}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink">
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="font-display text-2xl text-cream"
          >
            ✦
          </motion.span>
        </span>
      </div>
    </div>
  );
}
