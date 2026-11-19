"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Work from "./Work";

export default function WaveTransition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle hero receding response as user scrolls down
  const progress = Math.min(1, Math.max(0, scrollY / 700));
  const heroScale = 1 - progress * 0.04;
  const heroOpacity = 1 - progress * 0.45;

  return (
    <div className="relative w-full">
      {/* ──────────────── 1. PINNED HERO ──────────────── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          zIndex: 0,
        }}
      >
        <div
          className="h-full w-full origin-center transition-transform duration-75"
          style={{
            transform: `scale(${heroScale})`,
            opacity: heroOpacity,
            pointerEvents: progress > 0.85 ? "none" : "auto",
          }}
        >
          <Hero />
        </div>
      </div>

      {/* ──────────────── 2. SHORELINE SPACER ──────────────── */}
      {/* 160px spacer guarantees the wave crest is 100% off-screen on initial load */}
      <div className="h-[160px] w-full pointer-events-none" />

      {/* ──────────────── 3. INCOMING WORK SECTION ──────────────── */}
      <div
        className="relative w-full bg-cream"
        style={{
          zIndex: 20,
        }}
      >
        {/* WAVE CREST (Incoming water edge at the shore) */}
        <div
          className="pointer-events-none absolute bottom-full left-0 right-0 w-full overflow-visible select-none"
          style={{
            height: "140px",
            marginBottom: "-1px", // eliminates subpixel gap
          }}
        >
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{
              filter: "drop-shadow(0 -5px 12px rgba(0, 0, 0, 0.16))",
            }}
          >
            <defs>
              <filter id="foam-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Solid Cream Water Body (#F3EFE6 seamlessly merges with Work) */}
            <path
              d="M 0 38 Q 180 50, 360 44 Q 540 38, 720 28 Q 900 18, 1080 24 Q 1260 32, 1440 30 L 1440 142 L 0 142 Z"
              fill="#F3EFE6"
            />

            {/* Glowing White Foam Aura */}
            <path
              d="M 0 38 Q 180 50, 360 44 Q 540 38, 720 28 Q 900 18, 1080 24 Q 1260 32, 1440 30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#foam-glow)"
            />

            {/* Crisp White Foam Crest Stroke */}
            <path
              d="M 0 38 Q 180 50, 360 44 Q 540 38, 720 28 Q 900 18, 1080 24 Q 1260 32, 1440 30"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Froth bubbles along the white foam crest */}
            <circle cx="120" cy="40" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="280" cy="46" r="2" fill="#FFFFFF" opacity="0.85" />
            <circle cx="480" cy="41" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="680" cy="30" r="2.2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="860" cy="21" r="2.8" fill="#FFFFFF" opacity="0.95" />
            <circle cx="1020" cy="22" r="2" fill="#FFFFFF" opacity="0.85" />
            <circle cx="1210" cy="29" r="2.6" fill="#FFFFFF" opacity="0.9" />
            <circle cx="1360" cy="31" r="2" fill="#FFFFFF" opacity="0.85" />
          </svg>
        </div>

        {/* Real Work section */}
        <Work />
      </div>
    </div>
  );
}
