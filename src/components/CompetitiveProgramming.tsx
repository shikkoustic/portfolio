"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cpPlatforms, cpSummary, CPBadgeItem } from "@/data/cp";
import GithubHeatmap from "./GithubHeatmap";

// Front face: accent blooms top-left → near-black
const FRONT_GRADIENTS: Record<string, string> = {
  LeetCode:
    "radial-gradient(130% 110% at 20% 10%, #E08A3E 0%, #C17A2E55 32%, #0B0B0C 68%)",
  CodeChef:
    "radial-gradient(130% 110% at 20% 10%, #8F6CE0 0%, #6C4FD655 32%, #0B0B0C 68%)",
  Codeforces:
    "radial-gradient(130% 110% at 20% 10%, #4C8A54 0%, #2F523355 32%, #0B0B0C 68%)",
};

// Back face: mirrored bloom with rich depth
const BACK_GRADIENTS: Record<string, string> = {
  LeetCode:
    "radial-gradient(130% 110% at 85% 90%, #E08A3E 0%, #C17A2E55 32%, #0B0B0C 68%)",
  CodeChef:
    "radial-gradient(130% 110% at 85% 90%, #8F6CE0 0%, #6C4FD655 32%, #0B0B0C 68%)",
  Codeforces:
    "radial-gradient(130% 110% at 85% 90%, #4C8A54 0%, #2F523355 32%, #0B0B0C 68%)",
};

const DEPTH_OVERLAY =
  "radial-gradient(80% 70% at 15% 10%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(100% 80% at 85% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)";

export default function CompetitiveProgramming() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [liveLcBadges, setLiveLcBadges] = useState<CPBadgeItem[]>([]);

  useEffect(() => {
    fetch("/api/lc-badges")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: CPBadgeItem[] = data.map((b) => {
            const gif = b.medal?.config?.iconGif;
            const iconUrl = gif
              ? gif.startsWith("http")
                ? gif
                : `https://leetcode.com${gif}`
              : b.icon?.startsWith("http")
              ? b.icon
              : `https://leetcode.com${b.icon}`;
            return {
              name: b.displayName || "Badge",
              icon: iconUrl,
              category: b.category,
              description: b.displayName,
            };
          });
          setLiveLcBadges(mapped);
        }
      })
      .catch(() => {
        // Keeps fallback badges from cp.ts
      });
  }, []);

  return (
    <section
      id="cp"
      className="relative flex min-h-screen flex-col justify-center border-b border-line bg-cream px-5 py-6 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-3 flex flex-col justify-between gap-3 sm:mb-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              ( Competitive programming )
            </span>
            <h2 className="font-display mt-1 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              1000+ problems deep
            </h2>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="text-sm font-medium text-ink-soft">
              {cpSummary.totalContests} rated contests across three platforms.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-soft/70 hidden sm:inline">
                Hover cards or toggle:
              </span>
              <button
                type="button"
                onClick={() => setIsFlipped((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-cream-2 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-cream shadow-sm"
              >
                <span>{isFlipped ? "Show Ratings" : "Show All Badges"}</span>
                <span className="text-sm leading-none">↺</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Cards Grid with Synchronized Flip & Smooth Hover */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          {cpPlatforms.map((p, i) => {
            const badgesToDisplay =
              p.name === "LeetCode" && liveLcBadges.length > 0
                ? liveLcBadges.slice(0, 6)
                : p.badges;

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative min-h-[260px] [perspective:1400px]"
              >
                {/* Smooth 3D rotating container - gradual, elegant flip */}
                <motion.div
                  className="relative h-full min-h-[260px] w-full [transform-style:preserve-3d] will-change-transform"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0, 0.2, 1], // Gradual, physical ease-in-out curve
                  }}
                  tabIndex={0}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ───────────────── FRONT (Ratings & Stats) ───────────────── */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] p-5 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    style={{
                      background: FRONT_GRADIENTS[p.name],
                      pointerEvents: isFlipped ? "none" : "auto",
                    }}
                  >
                    <div className="relative flex items-start justify-between">
                      <div>
                        <p className="font-display text-2xl font-extrabold tracking-tight">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-xs text-cream/70">
                          @{p.handle}
                        </p>
                      </div>

                      {/* Featured Official Badge Pill on Front */}
                      {p.name === "LeetCode" && (
                        <div
                          className="flex items-center gap-2 rounded-full border border-cream/25 bg-black/35 px-3 py-1.5 backdrop-blur-md shadow-inner"
                          title="Knight Badge"
                        >
                          <img
                            src={p.featuredBadge.icon}
                            alt="Knight Badge"
                            className="h-7 w-7 object-contain drop-shadow"
                          />
                          <span className="font-display text-[11px] font-black uppercase tracking-wider text-[#F0A456]">
                            Knight
                          </span>
                        </div>
                      )}

                      {p.name === "CodeChef" && (
                        <div
                          className="flex items-center gap-1.5 rounded-full border border-cream/25 bg-black/35 px-3 py-1.5 backdrop-blur-md"
                          title="CodeChef 3★"
                        >
                          <span className="font-display text-xs font-black tracking-wide text-[#A07EF0]">
                            ★★★
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cream/80">
                            Div 2
                          </span>
                        </div>
                      )}

                      {p.name === "Codeforces" && (
                        <div
                          className="flex items-center gap-1.5 rounded-full border border-cream/25 bg-black/35 px-3 py-1.5 backdrop-blur-md"
                          title="Specialist"
                        >
                          <span className="inline-block h-2 w-2 rounded-full bg-[#55FF55] animate-pulse" />
                          <span className="font-display text-[11px] font-black uppercase tracking-wider text-[#7FD4E8]">
                            Specialist
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="relative my-auto py-2">
                      <p className="font-display text-5xl font-black leading-none tracking-tight">
                        {p.rating}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/80">
                        {p.ratingLabel} · {p.rank}
                      </p>
                    </div>

                    <div className="relative border-t border-cream/20 pt-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="font-display text-2xl font-extrabold leading-tight">
                            {p.stat}
                          </p>
                          <p className="text-[10px] uppercase tracking-wide text-cream/70">
                            {p.statLabel}
                          </p>
                        </div>
                        <span className="rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream/80 backdrop-blur-sm">
                          Flip ↺
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ───────────────── BACK (Official Badges Showcase) ───────────────── */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] p-5 text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      background: BACK_GRADIENTS[p.name],
                      pointerEvents: isFlipped ? "auto" : "none",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ background: DEPTH_OVERLAY }}
                    />

                    {/* Back Header */}
                    <div className="relative flex items-center justify-between border-b border-cream/15 pb-2.5">
                      <div>
                        <p className="font-display text-base font-extrabold leading-none text-cream">
                          {p.name === "LeetCode"
                            ? "Official Badges"
                            : p.name === "CodeChef"
                            ? "Official Badges"
                            : "Profile Accolades"}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-cream/60">
                          Verified on account
                        </p>
                      </div>
                      <span className="rounded-full bg-black/35 px-2.5 py-0.5 text-[11px] font-bold text-cream/80 border border-cream/15">
                        @{p.handle}
                      </span>
                    </div>

                    {/* Back Body: Badges Showcase */}
                    <div className="relative my-auto flex flex-col items-center justify-center py-2">
                      {p.name === "LeetCode" && (
                        <div className="grid w-full grid-cols-3 gap-2.5">
                          {badgesToDisplay.map((b, idx) => (
                            <div
                              key={b.name + idx}
                              className="group/b relative flex flex-col items-center justify-center rounded-xl border border-cream/20 bg-white/[0.08] p-2 backdrop-blur-md transition-all hover:bg-white/[0.16] hover:scale-105"
                              title={`${b.name} — ${b.description || ""}`}
                            >
                              <img
                                src={b.icon}
                                alt={b.name}
                                className="h-10 w-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                                loading="lazy"
                              />
                              <span className="mt-1 w-full truncate text-center text-[9px] font-semibold text-cream">
                                {b.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {p.name === "CodeChef" && (
                        <div className="flex w-full flex-col gap-2.5">
                          {p.badges.map((b) => (
                            <div
                              key={b.name}
                              className="flex items-center gap-3 rounded-xl border border-cream/20 bg-white/[0.08] px-3 py-2 backdrop-blur-md"
                            >
                              <img
                                src={b.icon}
                                alt={b.name}
                                className="h-9 w-9 shrink-0 object-contain drop-shadow"
                                loading="lazy"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold text-cream">
                                  {b.name}
                                </p>
                                <p className="text-[10px] text-cream/65">
                                  {b.description}
                                </p>
                              </div>
                              <span className="rounded-md bg-cream/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-cream/90">
                                {b.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {p.name === "Codeforces" && (
                        <div className="flex w-full flex-col items-center gap-3 py-1 text-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cream/20 bg-black/40 shadow-inner">
                            <span className="font-display text-2xl font-black text-[#55FF55]">
                              CF
                            </span>
                          </div>
                          <div>
                            <p className="font-display text-xl font-extrabold uppercase text-[#7FD4E8]">
                              Specialist
                            </p>
                            <p className="mt-0.5 text-xs text-cream/70">
                              Peak Rating 1457 · Top Collegiate
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-cream/10 px-2.5 py-1 text-[10px] font-medium text-cream/80">
                              10+ Rated Contests
                            </span>
                            <span className="rounded-full bg-cream/10 px-2.5 py-1 text-[10px] font-medium text-cream/80">
                              Active Solver
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Back Footer: CTA */}
                    <div className="relative pt-2">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-cream/35 bg-cream/15 py-2 text-xs font-bold uppercase tracking-wider text-cream transition hover:bg-cream hover:text-ink shadow-sm"
                      >
                        <span>View on {p.name}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub activity heatmap — same section, no extra screen needed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 sm:mt-6"
        >
          <GithubHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
