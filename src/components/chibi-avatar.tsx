"use client";

import { useEffect, useRef, useState, useCallback, useId } from "react";

const SKIN = "#c68c5c";
const SKIN_DARK = "#a8744a";
const HAIR = "#1a1410";
const DARK = "#1a1a2e";

function curlyRing(
  cx: number, cy: number, rx: number, ry: number,
  startDeg: number, endDeg: number, n: number,
  rMin: number, rMax: number
) {
  const balls: { x: number; y: number; r: number }[] = [];
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg * Math.PI) / 180;
  for (let i = 0; i < n; i++) {
    const t = s + (e - s) * (i / (n - 1));
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    const r = rMin + (rMax - rMin) * (0.5 + 0.5 * Math.sin(i * 2.7));
    balls.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, r: Math.round(r * 10) / 10 });
  }
  return balls;
}

export default function ChibiAvatar({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const uid = useId().replace(/:/g, "");

  const onMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy) || 1;
    const f = Math.min(d / 400, 1);
    setMx((dx / d) * f);
    setMy((dy / d) * f);
  }, []);

  // Blink every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Track hover on clickable elements
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-magnetic]")) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  // Subtler parallax — all depths halved
  const tx = (depth: number) =>
    `translate(${(mx * depth).toFixed(2)}, ${(my * depth).toFixed(2)})`;

  const afroBalls = curlyRing(100, 98, 38, 36, 200, -20, 26, 6, 10);

  const bangRow1 = curlyRing(100, 72, 34, 2, 180, 0, 11, 7, 9.5);
  const bangRow2 = curlyRing(100, 79, 33, 2, 180, 0, 10, 7.5, 10);
  const bangRow3 = curlyRing(100, 86, 34, 2, 180, 0, 11, 7, 9);
  const bangRow4 = curlyRing(100, 93, 32, 3, 180, 0, 10, 6.5, 9);
  const bangRow5 = curlyRing(100, 99, 30, 2, 180, 0, 9, 6, 8);

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id={`bc-${uid}`}>
            <circle cx="100" cy="130" r="82" />
          </clipPath>
        </defs>

        <circle cx="100" cy="130" r="82" fill="#f0f0f5" stroke="#e5e7ee" strokeWidth="2" />

        {/* LAYER 0: BODY (static, clipped) */}
        <g clipPath={`url(#bc-${uid})`}>
          <rect x="88" y="145" width="24" height="58" fill={SKIN} />
          <path d="M88 193 L88 240 L10 240 Q10 208 42 198 Q66 190 88 193 Z" fill={DARK} />
          <path d="M112 193 L112 240 L190 240 Q190 208 158 198 Q134 190 112 193 Z" fill={DARK} />
        </g>

        {/* NECK SHADOW */}
        <g clipPath={`url(#bc-${uid})`}>
          <rect x="88" y="145" width="24" height="28" fill={SKIN_DARK} opacity="0.5" />
        </g>

        {/* LAYER 1: HAIR BACK (depth 1) */}
        <g transform={tx(1)}>
          <ellipse cx="100" cy="98" rx="38" ry="36" fill={HAIR} />
          {afroBalls.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
          <circle cx="64" cy="84" r="8.5" fill={HAIR} />
          <circle cx="64" cy="76" r="9" fill={HAIR} />
          <circle cx="68" cy="69" r="9.5" fill={HAIR} />
          <circle cx="76" cy="63" r="10" fill={HAIR} />
          <circle cx="88" cy="59" r="10.5" fill={HAIR} />
          <circle cx="100" cy="57" r="11" fill={HAIR} />
          <circle cx="112" cy="59" r="10.5" fill={HAIR} />
          <circle cx="124" cy="63" r="10" fill={HAIR} />
          <circle cx="132" cy="69" r="9.5" fill={HAIR} />
          <circle cx="136" cy="76" r="9" fill={HAIR} />
          <circle cx="136" cy="84" r="8.5" fill={HAIR} />
        </g>

        {/* LAYER 3: EARS (depth 2.8) */}
        <g transform={tx(2.8)}>
          <ellipse cx="64" cy="126" rx="8" ry="10" fill={SKIN} />
          <path d="M60 128 Q64 122 68 128" stroke={SKIN_DARK} strokeWidth="1" fill="none" strokeLinecap="round" />
          <ellipse cx="136" cy="126" rx="8" ry="10" fill={SKIN} />
          <path d="M132 128 Q136 122 140 128" stroke={SKIN_DARK} strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* LAYER 2: HEAD (depth 2) */}
        <g transform={tx(2)}>
          <rect x="66" y="74" width="68" height="90" rx="27" ry="27" fill={SKIN} />
        </g>

        {/* LAYER 4: GLASSES (depth 2.3) */}
        <g transform={tx(2.3)}>
          <rect x="72" y="112" width="22" height="16" rx="5" ry="5" stroke={DARK} strokeWidth="2" fill="none" />
          <rect x="106" y="112" width="22" height="16" rx="5" ry="5" stroke={DARK} strokeWidth="2" fill="none" />
          <path d="M94 118 Q100 114 106 118" stroke={DARK} strokeWidth="1.6" fill="none" />
          <line x1="72" y1="118" x2="65" y2="116" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="128" y1="118" x2="135" y2="116" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* LAYER 5: FACE FEATURES (depth 4) */}
        <g transform={tx(4)}>
          {/* Eyebrows */}
          <path d="M76 109 Q83 104 91 108" stroke={HAIR} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M109 108 Q117 104 124 109" stroke={HAIR} strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Eyes — vertical pills, squash to line when blinking */}
          <ellipse cx="83" cy="120" rx="2.8" ry={blinking ? 0.5 : 4.5} fill={DARK} />
          <ellipse cx="117" cy="120" rx="2.8" ry={blinking ? 0.5 : 4.5} fill={DARK} />

          {/* Nose */}
          <path d="M97 133 Q100 137 103 133" stroke={SKIN_DARK} strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Smile — closed curve normally, open mouth on hover */}
          {hovering ? (
            <path d="M93 143 Q100 155 107 143 Z" fill="#4a1a1a" />
          ) : (
            <path d="M93 143 Q100 147 107 143" stroke="#8a5a3a" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* LAYER 6: BANGS (depth 3.5) */}
        <g transform={tx(3.5)}>
          <rect x="66" y="70" width="68" height="36" fill={HAIR} />
          {bangRow1.map((b, i) => (
            <circle key={`b1${i}`} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
          {bangRow2.map((b, i) => (
            <circle key={`b2${i}`} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
          {bangRow3.map((b, i) => (
            <circle key={`b3${i}`} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
          {bangRow4.map((b, i) => (
            <circle key={`b4${i}`} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
          {bangRow5.map((b, i) => (
            <circle key={`b5${i}`} cx={b.x} cy={b.y} r={b.r} fill={HAIR} />
          ))}
        </g>
      </svg>
    </div>
  );
}
