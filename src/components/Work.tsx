"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { projects } from "@/data/projects";

export default function Work() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      setMaxTranslate(Math.max(trackWidth - window.innerWidth + 48, 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [32, -maxTranslate]);

  useMotionValueEvent(x, "change", () => {
    let bestIdx = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setActive(bestIdx);
  });

  return (
    <section
      id="work"
      ref={targetRef}
      className="snap-section relative h-[420vh] bg-cream"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-b border-line px-5 pt-28 sm:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              ( Selected work )
            </span>
            <h2 className="font-display mt-2 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
              Scroll to browse
            </h2>
          </div>
          <span className="font-display text-sm text-ink-soft">
            ( {String(active + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")} )
          </span>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-8 will-change-transform"
          >
            {projects.map((p, i) => (
              <a
                key={p.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative flex h-[58vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-cream-2 p-8 transition-opacity duration-300 sm:w-[60vw] lg:w-[42vw]"
                style={{
                  opacity: Math.abs(active - i) <= 1 ? 1 : 0.35,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: p.accent, opacity: 0.2 }}
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cream"
                    style={{ background: p.accent }}
                  >
                    {p.status === "live" ? "Live" : "In progress"}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-ink-soft">
                    {p.period}
                  </span>
                </div>

                <div className="relative mt-6">
                  <h3 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-wide text-ink-soft">
                    {p.tagline}
                  </p>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    {p.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-cream px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mb-8 flex items-center gap-2">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className="h-1 flex-1 rounded-full bg-line transition-colors"
              style={{ background: i === active ? p.accent : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
