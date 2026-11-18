"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BasketballSwish() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.1"],
  });

  // ball arcs from bottom-left, up over the apex, down into the rim
  const ballLeft = useTransform(
    scrollYProgress,
    [0, 0.5, 0.88, 1],
    ["4%", "48%", "80%", "80%"],
  );
  const ballTop = useTransform(
    scrollYProgress,
    [0, 0.45, 0.88, 1],
    ["78%", "6%", "30%", "92%"],
  );
  const ballScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.88, 1],
    [0.9, 1.15, 0.85, 0.7],
  );
  const ballOpacity = useTransform(scrollYProgress, [0, 0.03, 0.96, 1], [0, 1, 1, 0]);
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 620]);

  const netSwish = useTransform(
    scrollYProgress,
    [0, 0.82, 0.88, 0.94, 1],
    [0, 0, 1, 0.3, 0],
  );
  const badgeOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.86, 0.95], [16, 0]);

  return (
    <div ref={ref} className="relative mx-auto h-[420px] w-full max-w-md">
      {/* hoop */}
      <div className="absolute right-[6%] top-[14%] flex flex-col items-end">
        <div className="h-16 w-20 rounded-sm border-2 border-ink bg-cream shadow-sm" />
        <div className="relative -mt-1 h-3 w-24 rounded-full border-2 border-[#C17A2E] bg-cream" />
        <motion.svg
          width="96"
          height="60"
          viewBox="0 0 96 60"
          className="relative -mt-0.5"
          style={{
            scaleY: useTransform(netSwish, (v) => 1 + v * 0.25),
            opacity: 0.85,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1={8 + i * 13}
              y1={0}
              x2={20 + i * 8}
              y2={56}
              stroke="#4A463D"
              strokeWidth="1.5"
            />
          ))}
        </motion.svg>
      </div>

      {/* ball */}
      <motion.div
        aria-hidden
        className="absolute h-9 w-9 rounded-full"
        style={{
          left: ballLeft,
          top: ballTop,
          scale: ballScale,
          opacity: ballOpacity,
          rotate: ballRotate,
          background:
            "radial-gradient(circle at 35% 30%, #E08A3E, #C17A2E 70%)",
          boxShadow: "inset -3px -3px 6px rgba(0,0,0,0.35), inset 2px 2px 4px rgba(255,255,255,0.25)",
        }}
      >
        <svg viewBox="0 0 36 36" className="h-full w-full">
          <path d="M18 0V36M0 18H36M6 6 30 30M30 6 6 30" stroke="#15130F" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </motion.div>

      {/* badge */}
      <motion.div
        style={{ opacity: badgeOpacity, y: badgeY }}
        className="absolute bottom-0 left-0 right-0 flex justify-center"
      >
        <span className="rounded-full bg-ink px-5 py-2 text-xs font-bold uppercase tracking-wide text-cream">
          Swish — state-level basketball player
        </span>
      </motion.div>
    </div>
  );
}
