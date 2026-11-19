"use client";

import { useEffect, useRef, useState } from "react";
import { TRACK_LABEL, getFftLevels, isPlaying, pauseAudio, resumeAudio, startAudio } from "@/lib/audio";

const SPIKE_COUNT = 40;
// Skip the first couple of bins (sub-bass, barely ever moves on a pad loop)
// and the long silent tail at the top of the spectrum, so the whole ring
// actually has visible motion instead of a few live spikes and a dead rest.
const BIN_START = 2;
const BIN_END = 34;

const SIZE = 180;
const CENTER = SIZE / 2;
const BASE_R = 50;
const MAX_EXTRA = 32;

export default function MixerPanel() {
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const rafId = useRef(0);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    function loop() {
      const fft = getFftLevels();
      const active = fft && isPlaying();
      const span = BIN_END - BIN_START;

      for (let i = 0; i < SPIKE_COUNT; i++) {
        let norm = 0.06;
        if (active) {
          // Spikes go around the full circle, but the spectrum only has
          // `span` usable bins — mirror the second half so bass/mid/treble
          // each land on two opposite sides of the ring instead of the
          // whole spectrum being crammed into one semicircle.
          const half = i < SPIKE_COUNT / 2 ? i : SPIKE_COUNT - 1 - i;
          const bin = BIN_START + Math.floor((half / (SPIKE_COUNT / 2)) * span);
          const db = fft![bin] ?? -100;
          norm = Math.min(1, Math.max(0.06, (db + 72) / 55));
        }
        const angle = (i / SPIKE_COUNT) * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const r2 = BASE_R + MAX_EXTRA * norm;
        const el = lineRefs.current[i];
        if (el) {
          el.setAttribute("x1", String(CENTER + BASE_R * cos));
          el.setAttribute("y1", String(CENTER + BASE_R * sin));
          el.setAttribute("x2", String(CENTER + r2 * cos));
          el.setAttribute("y2", String(CENTER + r2 * sin));
        }
      }
      rafId.current = requestAnimationFrame(loop);
    }
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const toggle = async () => {
    if (playing) {
      pauseAudio();
      setPlaying(false);
      return;
    }
    if (!started.current) {
      started.current = true;
      await startAudio();
    } else {
      resumeAudio();
    }
    setPlaying(true);
  };

  return (
    <div className="flex w-full max-w-xl items-center gap-5 rounded-2xl border border-cream/15 bg-black/20 px-4 py-3 backdrop-blur-sm sm:px-5">
      <div className="relative h-[108px] w-[108px] shrink-0 sm:h-[128px] sm:w-[128px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={BASE_R - 10}
            fill="rgba(0,0,0,0.3)"
            stroke="rgba(255,255,255,0.12)"
          />
          <defs>
            <linearGradient id="spikeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0A456" />
              <stop offset="100%" stopColor="#C17A2E" />
            </linearGradient>
          </defs>
          {Array.from({ length: SPIKE_COUNT }).map((_, i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1={CENTER}
              y1={CENTER - BASE_R}
              x2={CENTER}
              y2={CENTER - BASE_R - 4}
              stroke="url(#spikeGradient)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink transition hover:scale-105 sm:h-10 sm:w-10"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2 1.3v11.4a.8.8 0 0 0 1.22.68l9.1-5.7a.8.8 0 0 0 0-1.36l-9.1-5.7A.8.8 0 0 0 2 1.3Z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wide text-cream">
          {TRACK_LABEL}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-cream/50">
          now playing
        </span>
      </div>
    </div>
  );
}
