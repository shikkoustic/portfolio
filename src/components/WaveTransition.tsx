"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Work from "./Work";

// Normalized path for clipPathUnits="objectBoundingBox" (coordinates 0..1)
function buildNormalizedWavePath(
  yBaseNorm: number,
  amplitudeNorm: number,
  phase: number
): string {
  const steps = 36;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = i / steps; // 0.0 to 1.0
    const yOffset =
      amplitudeNorm * Math.sin(x * Math.PI * 2.2 + phase) +
      amplitudeNorm * 0.42 * Math.sin(x * Math.PI * 4.6 + phase * 1.5) +
      amplitudeNorm * 0.22 * Math.cos(x * Math.PI * 1.1 + phase * 0.8);
    points.push([x, yBaseNorm + yOffset]);
  }

  let d = `M 0 ${points[0][1].toFixed(4)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev[0] + curr[0]) / 2;
    const cy = (prev[1] + curr[1]) / 2;
    d += ` Q ${prev[0].toFixed(4)} ${prev[1].toFixed(4)}, ${cx.toFixed(4)} ${cy.toFixed(4)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(4)} ${last[1].toFixed(4)}`;
  // Close polygon down past bottom of screen
  d += ` L 1 1.25 L 0 1.25 Z`;
  return d;
}

// Pixel coordinate wave path generator for visual SVG overlay
function buildWavePath(
  width: number,
  height: number,
  yBaseline: number,
  amplitude: number,
  phase: number
): string {
  const steps = 36;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const normX = x / width;
    const yOffset =
      amplitude * Math.sin(normX * Math.PI * 2.2 + phase) +
      amplitude * 0.42 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
      amplitude * 0.22 * Math.cos(normX * Math.PI * 1.1 + phase * 0.8);
    points.push([x, yBaseline + yOffset]);
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
  d += ` L ${width} ${height + 200}`;
  d += ` L 0 ${height + 200} Z`;
  return d;
}

// Crest line for foam stroke in pixel coordinates
function buildCrestLine(
  width: number,
  yBaseline: number,
  amplitude: number,
  phase: number
): string {
  const steps = 36;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const normX = x / width;
    const yOffset =
      amplitude * Math.sin(normX * Math.PI * 2.2 + phase) +
      amplitude * 0.42 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
      amplitude * 0.22 * Math.cos(normX * Math.PI * 1.1 + phase * 0.8);
    points.push([x, yBaseline + yOffset]);
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Debug / Preview override support: ?wave=0.5
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const waveParam = params.get("wave");
      if (waveParam !== null) {
        setProgress(Math.min(1, Math.max(0, parseFloat(waveParam))));
        return;
      }
    }

    let rafId: number;
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Scroll distance dedicated to the wave transition (100vh)
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / viewportHeight));
      setProgress(p);
    };

    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Water motion curve: gentle surge and settle
  // At p=0 -> 0; p=0.5 -> 0.52; p=1.0 -> 1.0
  const eased =
    progress === 0
      ? 0
      : progress === 1
      ? 1
      : 1 - Math.pow(1 - progress, 1.35);

  // SVG coordinate system
  const W = 1440;
  const H = 900;

  // Pixel baseline travels from H + 60 (below viewport) to -60 (above viewport)
  const yBase = (H + 60) * (1 - eased) - 60 * eased;

  // Normalized baseline (0..1) for objectBoundingBox clipPath
  const yBaseNorm = 1.06 * (1 - eased) - 0.06 * eased;
  const amplitudeNorm = 0.024;
  const phase = progress * 2.2;

  // Normalized wave path for clipping Work content
  const dNormalizedWave = buildNormalizedWavePath(yBaseNorm, amplitudeNorm, phase);

  // Pixel wave paths for the visual foam/water layers
  const dSurge1 = buildWavePath(W, H, yBase - 36, 32, phase + 0.4);
  const dSurge2 = buildWavePath(W, H, yBase - 18, 26, phase + 0.9);
  const dFoamLine = buildCrestLine(W, yBase, 22, phase);

  // Hero receding effects
  const heroScale = 1 - progress * 0.045;
  const heroOpacity = 1 - progress * 0.55;
  const heroBlur = progress * 5.5;

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{
        // 100vh hero pinned distance + 100vh wave scroll distance
        minHeight: "200vh",
      }}
    >
      {/* ──────────────── SVG CLIPPATH DEFINITION ──────────────── */}
      <svg
        width="0"
        height="0"
        className="pointer-events-none absolute"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path d={dNormalizedWave} />
          </clipPath>
        </defs>
      </svg>

      {/* ──────────────── STICKY VIEWPORT STAGE ──────────────── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          contain: "paint",
          zIndex: 10,
        }}
      >
        {/* 1. HERO LAYER (PINNED UNDERNEATH) */}
        <div
          className="absolute inset-0 h-full w-full pointer-events-auto origin-center transition-transform duration-75"
          style={{
            transform: `scale(${heroScale}) translateY(${progress * 12}px)`,
            opacity: heroOpacity,
            filter: heroBlur > 0.2 ? `blur(${heroBlur}px)` : "none",
            pointerEvents: progress > 0.85 ? "none" : "auto",
            visibility: progress >= 1 ? "hidden" : "visible",
          }}
        >
          <Hero />
        </div>

        {/* 2. REVEALED PROJECTS SECTION (CLIPPED BY ORGANIC WAVE) */}
        {!reducedMotion && progress > 0.01 && (
          <div
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{
              clipPath: "url(#wave-clip)",
              WebkitClipPath: "url(#wave-clip)",
              zIndex: 20,
              pointerEvents: progress > 0.85 ? "auto" : "none",
            }}
          >
            {/* The actual Work section rendered inside the wave reveal */}
            <Work isPreview={true} />
          </div>
        )}

        {/* 3. WAVE FOAM & WATER SURGE OVERLAY */}
        {!reducedMotion && progress > 0.01 && progress < 0.99 && (
          <div
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            style={{
              zIndex: 30,
            }}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{
                willChange: "transform",
              }}
            >
              <defs>
                <filter id="foam-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="water-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="5" floodColor="#15130F" floodOpacity="0.14" />
                </filter>
              </defs>

              {/* LAYER 1: Deep translucent surge wash (leads wave ~36px ahead) */}
              <path
                d={dSurge1}
                fill="rgba(216, 208, 190, 0.42)"
                style={{ transition: "none" }}
              />

              {/* LAYER 2: Mid frothy water layer (~18px ahead) */}
              <path
                d={dSurge2}
                fill="rgba(234, 228, 214, 0.72)"
                style={{ transition: "none" }}
              />

              {/* LAYER 3: Soft Leading Foam Aura */}
              <path
                d={dFoamLine}
                fill="none"
                stroke="rgba(255, 253, 247, 0.7)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#foam-glow)"
              />

              {/* LAYER 4: Crisp White Foam Crest Stroke */}
              <path
                d={dFoamLine}
                fill="none"
                stroke="#FFFDF7"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Froth bubbles along the wave crest */}
              {[90, 220, 370, 520, 680, 840, 990, 1150, 1290, 1400].map((bx, idx) => {
                const normX = bx / W;
                const bubbleY =
                  yBase +
                  22 * Math.sin(normX * Math.PI * 2.2 + phase) +
                  9 * Math.sin(normX * Math.PI * 4.6 + phase * 1.5) +
                  (idx % 2 === 0 ? 6 : 12);
                return (
                  <circle
                    key={bx}
                    cx={bx}
                    cy={bubbleY}
                    r={idx % 3 === 0 ? 3.2 : idx % 2 === 0 ? 2.4 : 1.7}
                    fill="rgba(255, 255, 255, 0.85)"
                  />
                );
              })}
            </svg>
          </div>
        )}

        {/* Reduced motion accessible crossfade */}
        {reducedMotion && (
          <div
            className="absolute inset-0 bg-cream"
            style={{
              opacity: progress,
              zIndex: 20,
              pointerEvents: progress > 0.5 ? "auto" : "none",
            }}
          >
            <Work isPreview={true} />
          </div>
        )}
      </div>

      {/* ──────────────── NORMAL FLOW CONTINUATION ──────────────── */}
      {/* At progress = 1.0 (scrollY = 100vh), this element arrives at top: 0px */}
      {/* Smoothly taking over full normal scrolling with 0px jump */}
      <div className="relative z-40 bg-cream">
        <Work />
      </div>
    </div>
  );
}
