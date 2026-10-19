"use client";

import { useEffect, useState } from "react";

/**
 * ATS score ring. The stroke draws from empty to the value with a CSS keyframe
 * (see .ring-draw in globals.css) and the number counts up alongside it.
 * Under prefers-reduced-motion the final value is shown immediately.
 */
export default function AtsScoreRing({
  score,
  size = 120,
  stroke = 10,
  caption = true,
  delay = 120,
}: {
  score: number;
  size?: number;
  stroke?: number;
  caption?: boolean;
  delay?: number;
}) {
  const target = Math.max(0, Math.min(100, Math.round(score)));
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const dur = 1100;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setShown(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, delay]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const to = c - (target / 100) * c;

  const color = target >= 80 ? "#0F6E5E" : target >= 60 ? "#C58A1E" : "#A63D2F";
  const tone = target >= 80 ? "text-brand" : target >= 60 ? "text-gold-700" : "text-rust";
  const numSize = size >= 100 ? "text-3xl" : "text-base";

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`ATS score ${target} out of 100`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E2D4" strokeWidth={stroke} />
        <circle
          className="ring-draw"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={to}
          style={{ ["--c" as string]: c, ["--to" as string]: to, ["--d" as string]: `${delay}ms` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <div className={`font-display ${numSize} font-semibold leading-none tabular-nums ${tone}`}>{shown}</div>
        {caption && <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-500">/ 100</div>}
      </div>
    </div>
  );
}
