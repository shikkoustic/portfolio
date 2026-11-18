"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BasketballSwish() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.1"],
  });

  const ballLeft = useTransform(
    scrollYProgress,
    [0, 0.5, 0.88, 1],
    ["2%", "46%", "78%", "78%"],
  );
  const ballTop = useTransform(
    scrollYProgress,
    [0, 0.45, 0.88, 1],
    ["80%", "4%", "32%", "92%"],
  );
  const ballScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.88, 1],
    [1, 1.3, 0.95, 0.75],
  );
  const ballOpacity = useTransform(scrollYProgress, [0, 0.03, 0.96, 1], [0, 1, 1, 0]);
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 620]);

  const shadowScale = useTransform(scrollYProgress, [0, 0.45, 0.88], [0.9, 0.4, 1]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.45, 0.88], [0.25, 0.08, 0.3]);

  const netSwish = useTransform(
    scrollYProgress,
    [0, 0.82, 0.88, 0.94, 1],
    [0, 0, 1, 0.3, 0],
  );
  const badgeOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.86, 0.95], [16, 0]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 0.5, 0.5, 0]);

  return (
    <div ref={ref} className="relative mx-auto h-[440px] w-full max-w-md overflow-hidden">
      {/* court floor */}
      <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-xl bg-gradient-to-t from-[#C17A2E]/25 to-transparent" />

      {/* motion trail arc */}
      <motion.svg
        viewBox="0 0 400 420"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: trailOpacity }}
      >
        <path
          d="M 16,340 Q 180,10 310,140"
          fill="none"
          stroke="#C17A2E"
          strokeWidth="3"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* backboard + hoop */}
      <div className="absolute right-[8%] top-[10%] flex flex-col items-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]">
        <div className="relative h-20 w-24 rounded-md border-[3px] border-ink bg-cream">
          <div className="absolute inset-3 rounded-sm border-2 border-[#C17A2E]" />
        </div>
        <div className="relative -mt-[2px] h-3.5 w-28 rounded-full border-[3px] border-[#C17A2E] bg-[#E08A3E] shadow-sm" />
        <motion.svg
          width="104"
          height="64"
          viewBox="0 0 104 64"
          className="relative -mt-0.5"
          style={{
            scaleY: useTransform(netSwish, (v) => 1 + v * 0.3),
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={6 + i * 13}
              y1={0}
              x2={20 + i * 8}
              y2={60}
              stroke="#4A463D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          {[20, 36, 48].map((y, i) => (
            <line
              key={i}
              x1={14 + i * 4}
              y1={y}
              x2={90 - i * 4}
              y2={y}
              stroke="#4A463D"
              strokeWidth="1.2"
              opacity="0.55"
            />
          ))}
        </motion.svg>
      </div>

      {/* ball shadow */}
      <motion.div
        aria-hidden
        className="absolute h-7 w-14 rounded-full bg-ink"
        style={{
          left: "20%",
          bottom: "6%",
          scaleX: shadowScale,
          opacity: shadowOpacity,
        }}
      />

      {/* ball */}
      <motion.div
        aria-hidden
        className="absolute h-11 w-11 rounded-full border-[2.5px] border-[#8A4F18]"
        style={{
          left: ballLeft,
          top: ballTop,
          scale: ballScale,
          opacity: ballOpacity,
          rotate: ballRotate,
          background:
            "radial-gradient(circle at 32% 28%, #F0A456 0%, #D9822F 55%, #B2621C 100%)",
          boxShadow:
            "inset -4px -4px 8px rgba(0,0,0,0.35), inset 3px 3px 5px rgba(255,255,255,0.35), 0 6px 14px -4px rgba(0,0,0,0.4)",
        }}
      >
        <svg viewBox="0 0 44 44" className="h-full w-full">
          <path
            d="M22 1V43M1 22H43M8 8 36 36M36 8 8 36"
            stroke="#5B330F"
            strokeWidth="1.6"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* badge */}
      <motion.div
        style={{ opacity: badgeOpacity, y: badgeY }}
        className="absolute bottom-3 left-0 right-0 flex justify-center"
      >
        <span className="rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-cream shadow-lg">
          Swish — state-level basketball player
        </span>
      </motion.div>
    </div>
  );
}
