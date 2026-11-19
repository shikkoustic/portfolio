"use client";

import { useEffect, useRef, useState } from "react";
import { TRACK_LABEL, getFftLevels, isPlaying, pauseAudio, resumeAudio, startAudio } from "@/lib/audio";

const BAR_COUNT = 28;
// Skip the first couple of bins (sub-bass, barely ever moves on a pad loop)
// and the long silent tail at the top of the spectrum, so the whole row
// actually has visible motion instead of a few live bars and a dead flat line.
const BIN_START = 2;
const BIN_END = 34;

export default function MixerPanel() {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafId = useRef(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function loop() {
      const fft = getFftLevels();
      if (fft && isPlaying()) {
        const span = BIN_END - BIN_START;
        for (let i = 0; i < BAR_COUNT; i++) {
          const bin = BIN_START + Math.floor((i / BAR_COUNT) * span);
          const db = fft[bin] ?? -100;
          // Ambient pad levels mostly sit in the -70..-20dB range, not
          // -90..0 — normalizing against the full theoretical range left
          // the bars nearly flat. This window gives real, visible motion.
          const norm = Math.min(1, Math.max(0.08, (db + 72) / 55));
          const el = barRefs.current[i];
          if (el) el.style.transform = `scaleY(${norm})`;
        }
      } else {
        for (let i = 0; i < BAR_COUNT; i++) {
          const el = barRefs.current[i];
          if (el) el.style.transform = "scaleY(0.06)";
        }
      }
      rafId.current = requestAnimationFrame(loop);
    }
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const started = useRef(false);

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
    <div className="flex w-full max-w-xl items-center gap-4 rounded-2xl border border-cream/15 bg-black/20 px-4 py-3 backdrop-blur-sm sm:px-5">
      <button
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition hover:scale-105"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" rx="1" />
            <rect x="8" y="1" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M2 1.3v11.4a.8.8 0 0 0 1.22.68l9.1-5.7a.8.8 0 0 0 0-1.36l-9.1-5.7A.8.8 0 0 0 2 1.3Z" />
          </svg>
        )}
      </button>

      <div className="flex h-9 flex-1 items-end gap-[3px] overflow-hidden">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className="w-full flex-1 origin-bottom rounded-full bg-gradient-to-t from-[#C17A2E] to-[#F0A456]"
            style={{ height: "100%", transform: "scaleY(0.06)" }}
          />
        ))}
      </div>

      <div className="hidden shrink-0 flex-col items-end text-right sm:flex">
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
