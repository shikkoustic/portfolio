"use client";

import { motion } from "framer-motion";
import activity from "@/data/github-activity.json";

const LEVEL_COLOR = ["#0C0E120D", "#3659E355", "#3659E388", "#3659E3BB", "#3659E3"];

// Real total from github.com/shikkoustic's contribution graph (levels are a 0-4
// bucketed intensity, not a count, so they can't be summed for the real total).
const totalContributions = 1427;

export default function GithubHeatmap() {
  return (
    <div className="rounded-[28px] border border-line bg-cream-2 p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            ( GitHub activity )
          </p>
          <p className="font-display mt-1 text-2xl font-extrabold">
            @shikkoustic — last 12 months
          </p>
        </div>
        <a
          href="https://github.com/shikkoustic"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream"
        >
          View profile ↗
        </a>
      </div>

      <div className="scrollbar-none overflow-x-auto pb-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
        >
          {activity.map((day) => (
            <span
              key={day.d}
              title={`${day.d}: ${day.l === 0 ? "no" : day.l} contributions`}
              className="h-[11px] w-[11px] rounded-[3px]"
              style={{ background: LEVEL_COLOR[day.l] }}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
        <span>
          <span className="font-display font-bold text-ink">
            {totalContributions.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {LEVEL_COLOR.map((c, i) => (
            <span
              key={i}
              className="h-[10px] w-[10px] rounded-[2px]"
              style={{ background: c }}
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
