"use client";

import { useEffect, useRef, useState } from "react";

// Local coordinate space for the court (px). Side-on view: player on the
// left, hoop on the right, so you only ever see the rim + net in profile —
// never the backboard face.
const W = 360;
const H = 230;
const LAUNCH_X = 40;
const LAUNCH_Y = 46;
const RIM_X = 276; // front edge of the rim, where a make enters
const RIM_BACK_X = 312; // back edge of the rim / backboard line — bounce wall
const RIM_Y = 152;
const NET_BOTTOM_Y = 108;
const POLE_X = 322;

const ANGLE = (56 * Math.PI) / 180;
const G = 760; // px/s^2
const MIN_SPEED = 420;
const MAX_SPEED = 620;
const CHARGE_MS = 1000;

type Ball = { x: number; y: number };

export default function BasketballGame() {
  const ballRef = useRef<HTMLDivElement>(null);
  const meterFillRef = useRef<HTMLDivElement>(null);
  const meterWrapRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<SVGGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const chargingSince = useRef<number | null>(null);
  const chargeRaf = useRef(0);
  const shotRaf = useRef(0);
  const inFlight = useRef(false);

  const [message, setMessage] = useState("Hold SPACE to charge, release to shoot");
  const [stats, setStats] = useState({ makes: 0, attempts: 0 });

  const placeBall = (b: Ball) => {
    if (ballRef.current) {
      ballRef.current.style.transform = `translate3d(${b.x}px, ${-b.y}px, 0)`;
    }
  };
  const setMeter = (v: number) => {
    if (meterFillRef.current) meterFillRef.current.style.transform = `scaleY(${v})`;
    if (meterWrapRef.current) meterWrapRef.current.style.opacity = v > 0 ? "1" : "0";
  };

  useEffect(() => {
    placeBall({ x: LAUNCH_X, y: LAUNCH_Y });
    setMeter(0);

    const inView = () => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return false;
      return r.bottom > 0 && r.top < innerHeight;
    };
    const keyOwnedByFocus = () =>
      !!document.activeElement?.closest(
        "button, a, input, textarea, select, [contenteditable]",
      );

    function chargeLoop(now: number) {
      if (chargingSince.current == null) return;
      const k = Math.min(1, (now - chargingSince.current) / CHARGE_MS);
      setMeter(k);
      chargeRaf.current = requestAnimationFrame(chargeLoop);
    }

    function shoot(power: number) {
      inFlight.current = true;
      setStats((s) => ({ ...s, attempts: s.attempts + 1 }));
      setMessage("");

      const speed = MIN_SPEED + power * (MAX_SPEED - MIN_SPEED);
      let vx = speed * Math.cos(ANGLE);
      let vy = speed * Math.sin(ANGLE);
      let x = LAUNCH_X;
      let y = LAUNCH_Y;
      let last = performance.now();
      let bounced = false;
      let bounceReason: "backboard" | "rim" | null = null;
      let settled = false;

      const finish = (text: string, made: boolean) => {
        if (settled) return;
        settled = true;
        inFlight.current = false;
        if (made) {
          setStats((s) => ({ ...s, makes: s.makes + 1 }));
          netRef.current?.classList.add("net-flutter");
          setTimeout(() => netRef.current?.classList.remove("net-flutter"), 550);
        }
        setMessage(text);
        setTimeout(() => {
          placeBall({ x: LAUNCH_X, y: LAUNCH_Y });
          setMessage("Hold SPACE to charge, release to shoot");
        }, 700);
      };

      const frame = (now: number) => {
        const dt = Math.min(0.032, (now - last) / 1000);
        last = now;
        vy -= G * dt;
        x += vx * dt;
        y += vy * dt;

        // score: descending through the net opening between the rim's front
        // and back edge
        if (
          !bounced &&
          vy < 0 &&
          x >= RIM_X &&
          x <= RIM_BACK_X &&
          y <= RIM_Y + 6 &&
          y >= NET_BOTTOM_Y
        ) {
          placeBall({ x, y: NET_BOTTOM_Y - 4 });
          finish("Swish.", true);
          return;
        }

        // too much power: sails past the back of the rim while still high —
        // bounces off the backboard line back toward the player
        if (!bounced && x >= RIM_BACK_X && y > RIM_Y - 8) {
          bounced = true;
          bounceReason = "backboard";
          vx = -vx * 0.42;
          vy *= 0.5;
          x = RIM_BACK_X - 2;
        }

        // not enough power, or came in too low: rim-out
        if (
          !bounced &&
          vy < 0 &&
          x >= RIM_X - 6 &&
          x < RIM_X &&
          y < NET_BOTTOM_Y
        ) {
          bounced = true;
          bounceReason = "rim";
          vx = -vx * 0.35;
          vy = Math.max(vy * 0.4, 60);
        }

        if (y <= 2) {
          placeBall({ x, y: 2 });
          const text =
            bounceReason === "backboard"
              ? "Off the backboard — too much."
              : bounceReason === "rim"
                ? "Rimmed out — so close."
                : x < RIM_X - 20
                  ? "Too soft."
                  : "Long.";
          finish(text, false);
          return;
        }

        placeBall({ x, y });
        shotRaf.current = requestAnimationFrame(frame);
      };

      shotRaf.current = requestAnimationFrame(frame);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space" || keyOwnedByFocus() || !inView()) return;
      e.preventDefault();
      if (inFlight.current || chargingSince.current != null) return;
      chargingSince.current = performance.now();
      setMessage("Charging…");
      chargeRaf.current = requestAnimationFrame(chargeLoop);
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.code !== "Space" || chargingSince.current == null) return;
      e.preventDefault();
      const k = Math.min(1, (performance.now() - chargingSince.current) / CHARGE_MS);
      chargingSince.current = null;
      cancelAnimationFrame(chargeRaf.current);
      setMeter(0);
      if (!inFlight.current) shoot(k);
    }

    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);
    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
      cancelAnimationFrame(chargeRaf.current);
      cancelAnimationFrame(shotRaf.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center gap-3">
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-cream-2 to-cream"
        style={{ width: W, maxWidth: "100%", height: H }}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
          {/* floor */}
          <line x1={0} y1={H - 2} x2={W} y2={H - 2} stroke="#D8D0BE" strokeWidth="2" />
          {/* pole */}
          <line
            x1={POLE_X}
            y1={H - 2}
            x2={POLE_X}
            y2={H - RIM_Y - 6}
            stroke="#4A463D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* rim, seen edge-on */}
          <line
            x1={RIM_X - 2}
            y1={H - RIM_Y}
            x2={RIM_BACK_X}
            y2={H - RIM_Y}
            stroke="#C17A2E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* net */}
          <g ref={netRef} style={{ transformOrigin: `${(RIM_X + RIM_BACK_X) / 2}px ${H - RIM_Y}px` }}>
            {Array.from({ length: 6 }).map((_, i) => {
              const topX = RIM_X + (i * (RIM_BACK_X - RIM_X)) / 5;
              const bottomX =
                (RIM_X + RIM_BACK_X) / 2 + (topX - (RIM_X + RIM_BACK_X) / 2) * 0.35;
              return (
                <line
                  key={i}
                  x1={topX}
                  y1={H - RIM_Y}
                  x2={bottomX}
                  y2={H - NET_BOTTOM_Y}
                  stroke="#A69C86"
                  strokeWidth="1.4"
                />
              );
            })}
            <line
              x1={RIM_X + 6}
              y1={H - (RIM_Y + NET_BOTTOM_Y) / 2}
              x2={RIM_BACK_X - 6}
              y2={H - (RIM_Y + NET_BOTTOM_Y) / 2}
              stroke="#A69C86"
              strokeWidth="1"
              opacity="0.7"
            />
          </g>
        </svg>

        {/* power meter */}
        <div
          ref={meterWrapRef}
          className="absolute bottom-3 left-3 h-16 w-2 overflow-hidden rounded-full bg-ink/10 opacity-0 transition-opacity"
        >
          <div
            ref={meterFillRef}
            className="absolute bottom-0 h-full w-full origin-bottom rounded-full bg-[#C17A2E]"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* ball */}
        <div
          ref={ballRef}
          className="absolute bottom-0 left-0 h-4 w-4 rounded-full"
          style={{
            background: "radial-gradient(circle at 32% 28%, #F0A456 0%, #D9822F 55%, #B2621C 100%)",
            boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.35), inset 1px 1px 2px rgba(255,255,255,0.35)",
          }}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-cream/70">
        <span className="min-w-[180px] text-center font-semibold">{message}</span>
        <span className="font-display font-bold text-cream">
          {stats.makes}/{stats.attempts}
        </span>
      </div>
    </div>
  );
}
