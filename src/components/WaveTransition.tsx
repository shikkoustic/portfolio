"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Work from "./Work";

// Wave path generator in SVG coordinates (width x height)
function buildWavePath(
  width: number,
  height: number,
  yCrest: number,
  amplitude: number,
  phase: number
): string {
  const steps = 40;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const normX = x / width;
    // Asymmetric organic wave swell (like ocean surf washing onto sand)
    const yOffset =
      amplitude * Math.sin(normX * Math.PI * 2.2 + phase) +
      amplitude * 0.45 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
      amplitude * 0.25 * Math.cos(normX * Math.PI * 1.1 + phase * 0.7);
    points.push([x, yCrest + yOffset]);
  }

  let d = `M 0 ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev[0] + curr[0]) / 2;
    const cy = (prev[1] + curr[1]) / 2;
    d += ` Q ${prev[0].toFixed(2)} ${prev[1].toFixed(2)}, ${cx.toFixed(2)} ${cy.toFixed(2)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
  // Connect seamlessly to bottom of SVG (which touches the Work section)
  d += ` L ${width} ${height + 2}`;
  d += ` L 0 ${height + 2} Z`;
  return d;
}

// Crest line for foam stroke
function buildCrestLine(
  width: number,
  yCrest: number,
  amplitude: number,
  phase: number
): string {
  const steps = 40;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const normX = x / width;
    const yOffset =
      amplitude * Math.sin(normX * Math.PI * 2.2 + phase) +
      amplitude * 0.45 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
      amplitude * 0.25 * Math.cos(normX * Math.PI * 1.1 + phase * 0.7);
    points.push([x, yCrest + yOffset]);
  }

  let d = `M 0 ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev[0] + curr[0]) / 2;
    const cy = (prev[1] + curr[1]) / 2;
    d += ` Q ${prev[0].toFixed(2)} ${prev[1].toFixed(2)}, ${cx.toFixed(2)} ${cy.toFixed(2)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
  return d;
}

export default function WaveTransition() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(900);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportH(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Support ?wave=X parameter for previews
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const waveParam = params.get("wave");
      if (waveParam !== null) {
        const p = Math.min(1, Math.max(0, parseFloat(waveParam)));
        // Set scroll position to match requested preview
        const targetScroll = p * (window.innerHeight + 140);
        window.scrollTo({ top: targetScroll, behavior: "instant" });
        setScrollY(targetScroll);
      }
    }

    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Progress of the wave transition (0 to 1 as user scrolls across ~1 viewport)
  const washDistance = viewportH + 160;
  const progress = Math.min(1, Math.max(0, scrollY / washDistance));

  // Hero subtle receding effects as wave washes over it
  const heroScale = 1 - progress * 0.045;
  const heroOpacity = 1 - progress * 0.5;
  const heroBlur = progress * 5;
  const isHeroHidden = progress >= 1 && scrollY > washDistance * 1.5;

  // SVG dimensions for the wave crest
  const W = 1440;
  const H = 220;

  // Gentle wave ripple phase driven by scroll
  const phase = (scrollY / 320) * Math.PI;

  // The wave crest sits at y = 80 inside the 220px tall SVG
  // Solid cream (#F3EFE6) fills from y = 80 down to y = 220 (where it joins Work)
  const yCrest = 85;
  const amplitude = 24;

  const dMainWave = buildWavePath(W, H, yCrest, amplitude, phase);
  const dSurge1 = buildWavePath(W, H, yCrest - 38, amplitude + 6, phase + 0.5);
  const dSurge2 = buildWavePath(W, H, yCrest - 18, amplitude + 3, phase + 0.9);
  const dFoamLine = buildCrestLine(W, yCrest, amplitude, phase);

  return (
    <div className="relative w-full">
      {/* ──────────────── 1. PINNED HERO (UNDERNEATH) ──────────────── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          zIndex: 0,
          visibility: isHeroHidden ? "hidden" : "visible",
        }}
      >
        <div
          className="h-full w-full origin-center transition-transform duration-75"
          style={{
            transform: `scale(${heroScale})`,
            opacity: heroOpacity,
            filter: heroBlur > 0.2 ? `blur(${heroBlur}px)` : "none",
            pointerEvents: progress > 0.85 ? "none" : "auto",
          }}
        >
          <Hero />
        </div>
      </div>

      {/* ──────────────── 2. WASH DISTANCE SPACER ──────────────── */}
      {/* Ensures at scroll = 0, the incoming wave crest is 100% off-screen below */}
      <div
        className="w-full pointer-events-none"
        style={{
          height: "180px",
        }}
      />

      {/* ──────────────── 3. INCOMING BEACH / PROJECTS SECTION ──────────────── */}
      {/* One single contiguous section — NO duplicate headings, NO static cut lines */}
      <div
        className="relative w-full bg-cream"
        style={{
          zIndex: 20,
        }}
      >
        {/* INCOMING WAVE CREST (Attached directly to top of Work) */}
        {!reducedMotion && (
          <div
            className="pointer-events-none absolute bottom-full left-0 right-0 w-full overflow-visible select-none"
            style={{
              height: `${H}px`,
              marginBottom: "-1px", // eliminates any subpixel hairline seam
            }}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              style={{
                filter: "drop-shadow(0 -6px 12px rgba(21, 19, 15, 0.12))",
              }}
            >
              <defs>
                <filter id="foam-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* LAYER 1: Deep translucent water wash (rushes ~38px ahead onto shore) */}
              <path
                d={dSurge1}
                fill="rgba(216, 208, 190, 0.42)"
                style={{ transition: "none" }}
              />

              {/* LAYER 2: Mid-level translucent froth water (~18px ahead) */}
              <path
                d={dSurge2}
                fill="rgba(234, 228, 214, 0.72)"
                style={{ transition: "none" }}
              />

              {/* LAYER 3: Main Beach Wave Body (Solid #F3EFE6 seamlessly merging with Work) */}
              <path
                d={dMainWave}
                fill="#F3EFE6"
                style={{ transition: "none" }}
              />

              {/* LAYER 4: Soft Glowing White Foam Aura */}
              <path
                d={dFoamLine}
                fill="none"
                stroke="rgba(255, 253, 247, 0.75)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#foam-glow)"
              />

              {/* LAYER 5: Crisp White Foam Crest Stroke */}
              <path
                d={dFoamLine}
                fill="none"
                stroke="#FFFDF7"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Froth bubbles floating along the foam crest line */}
              {[90, 210, 360, 510, 670, 830, 980, 1140, 1280, 1390].map((bx, idx) => {
                const normX = bx / W;
                const bubbleY =
                  yCrest +
                  amplitude * Math.sin(normX * Math.PI * 2.2 + phase) +
                  amplitude * 0.45 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
                  (idx % 2 === 0 ? 5 : 10);
                return (
                  <circle
                    key={bx}
                    cx={bx}
                    cy={bubbleY}
                    r={idx % 3 === 0 ? 3.2 : idx % 2 === 0 ? 2.4 : 1.6}
                    fill="rgba(255, 255, 255, 0.85)"
                  />
                );
              })}
            </svg>
          </div>
        )}

        {/* The one and only real Work section */}
        <Work />
      </div>
    </div>
  );
}
