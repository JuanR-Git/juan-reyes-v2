"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";

// Character colors
const SKIN = "#b8895e"; // Warm medium skin tone
const SKIN_SHADOW = "#a47850";
const HAIR = "#1a1410"; // Black hair
const GLASSES = "#1a1a2e"; // Black glasses

// Track whether the entrance animation has already played this session.
// On client-side navigation back, we skip the entrance and show immediately.
let hasPlayedEntrance = false;

export default function ChibiAvatar({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  // Refs for animation state
  const dizzyIsPlaying = useRef(false);
  const isHoveringClickable = useRef(false);
  const storedX = useRef(0);
  const storedY = useRef(0);
  const mouseX = useRef<number | null>(null);
  const mouseY = useRef<number | null>(null);
  const windowSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;

    // DOM element references - cache these for performance
    const dom = {
      face: svg.querySelector(".face"),
      eye: svg.querySelectorAll(".eye"),
      innerFace: svg.querySelector(".inner-face"),
      hairFront: svg.querySelector(".hair-front"),
      hairBack: svg.querySelector(".hair-back"),
      shadow: svg.querySelectorAll(".shadow"),
      ear: svg.querySelectorAll(".ear"),
      eyebrowLeft: svg.querySelector(".eyebrow-left"),
      eyebrowRight: svg.querySelector(".eyebrow-right"),
    };

    // Set initial states
    gsap.set(svg.querySelector(".bg"), { transformOrigin: "50% 50%" });
    gsap.set(svg.querySelector(".ear-right"), { transformOrigin: "0% 50%" });
    gsap.set(svg.querySelector(".ear-left"), { transformOrigin: "100% 50%" });
    gsap.set(svg.querySelector(".me"), { opacity: 1 });

    // Window size tracking
    const updateWindowSize = () => {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // Percentage helper
    const percentage = (partial: number, total: number) => (100 * partial) / total;

    // Face animation function - runs every frame via gsap.ticker
    const animateFace = () => {
      // Check if we have valid mouse position
      if (mouseX.current === null || mouseY.current === null) return;
      // Skip if position hasn't changed
      if (storedX.current === mouseX.current && storedY.current === mouseY.current) return;

      const x = percentage(mouseX.current, windowSize.current.width) - 50;
      const y = percentage(mouseY.current, windowSize.current.height) - 50;
      const yHigh = percentage(mouseY.current, windowSize.current.height) - 20;
      const yLow = percentage(mouseY.current, windowSize.current.height) - 80;

      gsap.to(dom.face, { duration: 0.3, yPercent: yLow / 30, xPercent: x / 30 });
      gsap.to(dom.eye, { duration: 0.3, yPercent: yHigh / 3, xPercent: x / 2 });
      gsap.to(dom.innerFace, { duration: 0.3, yPercent: y / 6, xPercent: x / 8 });
      gsap.to(dom.hairFront, { duration: 0.3, yPercent: yHigh / 15, xPercent: x / 22 });
      gsap.to([dom.hairBack, ...Array.from(dom.shadow)], { duration: 0.3, yPercent: (yLow / 20) * -1, xPercent: (x / 20) * -1 });
      gsap.to(dom.ear, { duration: 0.3, yPercent: (y / 1.5) * -1, xPercent: (x / 10) * -1 });
      gsap.to([dom.eyebrowLeft, dom.eyebrowRight], { duration: 0.3, yPercent: y * 2.5 });

      storedX.current = mouseX.current;
      storedY.current = mouseY.current;
    };

    // Dizzy animation timeline
    const dizzy = gsap.timeline({
      paused: true,
      onComplete: () => {
        dizzyIsPlaying.current = false;
        isHoveringClickable.current = false;
        // Kill any competing hover tweens and force mouth to closed state
        gsap.killTweensOf(svg.querySelector(".mouth-open"));
        gsap.killTweensOf(svg.querySelector(".mouth-closed"));
        gsap.set(svg.querySelector(".mouth-open"), { opacity: 0 });
        gsap.set(svg.querySelector(".mouth-closed"), { opacity: 1 });
      },
    });

    // Build dizzy animation - total ~6 seconds
    dizzy
      // Hide normal eyes, show dizzy spirals and open mouth
      .to(svg.querySelector(".eyes"), { duration: 0.01, opacity: 0 }, 0)
      .to(svg.querySelectorAll(".dizzy"), { duration: 0.01, opacity: 1 }, 0)
      .to(svg.querySelector(".mouth-closed"), { duration: 0.01, opacity: 0 }, 0)
      .to(svg.querySelector(".mouth-open"), { duration: 0.01, opacity: 1 }, 0)
      .to(svg.querySelector(".oh"), { duration: 0.01, opacity: 0 }, 0)
      // Head wobble - use keyframes for wiggle effect
      .to(svg.querySelectorAll(".head, .hair-back, .shadow"), {
        duration: 6,
        keyframes: [
          { rotate: 2, ease: "sine.inOut" },
          { rotate: -2, ease: "sine.inOut" },
          { rotate: 1.5, ease: "sine.inOut" },
          { rotate: -1.5, ease: "sine.inOut" },
          { rotate: 1, ease: "sine.inOut" },
          { rotate: -1, ease: "sine.inOut" },
          { rotate: 0.5, ease: "sine.inOut" },
          { rotate: 0, ease: "sine.inOut" },
        ],
        transformOrigin: "50% 50%",
      }, 0)
      // Body wobble
      .to(svg.querySelector(".me"), {
        duration: 6,
        keyframes: [
          { rotate: -2, ease: "sine.inOut" },
          { rotate: 2, ease: "sine.inOut" },
          { rotate: -1.5, ease: "sine.inOut" },
          { rotate: 1.5, ease: "sine.inOut" },
          { rotate: -1, ease: "sine.inOut" },
          { rotate: 1, ease: "sine.inOut" },
          { rotate: -0.5, ease: "sine.inOut" },
          { rotate: 0, ease: "sine.inOut" },
        ],
        transformOrigin: "50% 100%",
      }, 0)
      // Scale pulse
      .to(svg.querySelector(".me"), {
        duration: 4,
        keyframes: [
          { scale: 0.99 },
          { scale: 1 },
          { scale: 0.995 },
          { scale: 1 },
        ],
        transformOrigin: "50% 100%",
      }, 0)
      // Dizzy spiral rotations
      .to(svg.querySelector(".dizzy-1"), {
        rotate: -2160, // 6 full rotations
        duration: 6,
        transformOrigin: "50% 50%",
        ease: "none",
      }, 0)
      .to(svg.querySelector(".dizzy-2"), {
        rotate: 2160, // 6 full rotations
        duration: 6,
        transformOrigin: "50% 50%",
        ease: "none",
      }, 0)
      // Recovery - restore normal eyes at 4 seconds
      .to(svg.querySelector(".eyes"), { duration: 0.01, opacity: 1 }, 4)
      .to(svg.querySelectorAll(".dizzy"), { duration: 0.01, opacity: 0 }, 4)
      .to(svg.querySelector(".oh"), { duration: 0.01, opacity: 0 }, 4)
      .to(svg.querySelector(".mouth-open"), { duration: 0.01, opacity: 0 }, 4)
      .to(svg.querySelector(".mouth-closed"), { duration: 0.01, opacity: 1 }, 4);

    // Blink animation timeline
    const blink = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      paused: true,
    });

    blink
      .to(svg.querySelectorAll(".eye-right, .eye-left"), { duration: 0.01, opacity: 0 }, 0)
      .to(svg.querySelectorAll(".eye-right-2, .eye-left-2"), { duration: 0.01, opacity: 1 }, 0)
      .to(svg.querySelectorAll(".eye-right, .eye-left"), { duration: 0.01, opacity: 1 }, 0.15)
      .to(svg.querySelectorAll(".eye-right-2, .eye-left-2"), { duration: 0.01, opacity: 0 }, 0.15);

    // Mouse move handler
    const updateScreenCoords = (event: MouseEvent) => {
      // Update mouse position for face tracking (unless dizzy)
      if (!dizzyIsPlaying.current) {
        mouseX.current = event.clientX;
        mouseY.current = event.clientY;
      }

      // Check for rapid mouse movement using native movementX
      // movementX gives the delta since last mousemove event
      if (!dizzyIsPlaying.current && Math.abs(event.movementX) > 500) {
        dizzyIsPlaying.current = true;
        dizzy.restart();
      }
    };

    // Hover detection for clickable elements - shows open mouth smile
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-magnetic]")) {
        if (!isHoveringClickable.current && !dizzyIsPlaying.current) {
          isHoveringClickable.current = true;
          gsap.to(svg.querySelector(".mouth-closed"), { duration: 0.1, opacity: 0 });
          gsap.to(svg.querySelector(".mouth-open"), { duration: 0.1, opacity: 1 });
        }
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-magnetic]")) {
        if (isHoveringClickable.current && !dizzyIsPlaying.current) {
          isHoveringClickable.current = false;
          gsap.to(svg.querySelector(".mouth-open"), { duration: 0.1, opacity: 0 });
          gsap.to(svg.querySelector(".mouth-closed"), { duration: 0.1, opacity: 1 });
        }
      }
    };

    // Add mouse event after entrance animation completes
    const addMouseEvent = () => {
      const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

      if (safeToAnimate) {
        window.addEventListener("mousemove", updateScreenCoords);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        gsap.ticker.add(animateFace);
        blink.play();
      }
    };

    // Main entrance timeline — skip animation on client-side re-navigation
    let meTl: gsap.core.Timeline;

    if (hasPlayedEntrance) {
      // Already played once this session — show immediately and wire up events
      gsap.set(svg.querySelector(".me"), { opacity: 1 });
      gsap.set(svg.querySelectorAll(".eye-right, .eye-left"), { opacity: 1 });
      gsap.set(svg.querySelectorAll(".eye-right-2, .eye-left-2"), { opacity: 0 });
      meTl = gsap.timeline({ onComplete: addMouseEvent });
      // Tiny no-op tween so the timeline fires onComplete
      meTl.to({}, { duration: 0.01 });
    } else {
      hasPlayedEntrance = true;
      meTl = gsap.timeline({
        onComplete: addMouseEvent,
        delay: 1,
      });

      meTl
        .from(svg.querySelector(".me"), {
          duration: 1,
          yPercent: 100,
          ease: "elastic.out(0.5, 0.4)",
        }, 0.5)
        .from(svg.querySelectorAll(".head, .hair-back, .shadow"), {
          duration: 0.9,
          yPercent: 20,
          ease: "elastic.out(0.58, 0.25)",
        }, 0.6)
        .from(svg.querySelector(".ear-right"), {
          duration: 1,
          rotate: 40,
          yPercent: 10,
          ease: "elastic.out(0.5, 0.2)",
        }, 0.7)
        .from(svg.querySelector(".ear-left"), {
          duration: 1,
          rotate: -40,
          yPercent: 10,
          ease: "elastic.out(0.5, 0.2)",
        }, 0.7)
        .to(svg.querySelector(".glasses"), {
          duration: 1,
          keyframes: [{ yPercent: -10 }, { yPercent: 0 }],
          ease: "elastic.out(0.5, 0.2)",
        }, 0.75)
        .from(svg.querySelectorAll(".eyebrow-right, .eyebrow-left"), {
          duration: 1,
          yPercent: 300,
          ease: "elastic.out(0.5, 0.2)",
        }, 0.7)
        .to(svg.querySelectorAll(".eye-right, .eye-left"), {
          duration: 0.01,
          opacity: 1,
        }, 0.85)
        .to(svg.querySelectorAll(".eye-right-2, .eye-left-2"), {
          duration: 0.01,
          opacity: 0,
        }, 0.85);
    }

    // Blob gradient color cycle — slow ~8s loop through blue/purple palette
    const blobGradient = gsap.timeline({ repeat: -1, yoyo: true });
    const stop1 = svg.querySelector(".blob-stop-1");
    const stop2 = svg.querySelector(".blob-stop-2");
    const stop3 = svg.querySelector(".blob-stop-3");

    if (stop1 && stop2 && stop3) {
      blobGradient
        .to(stop1, { attr: { "stop-color": "#7c5cfc" }, duration: 2, ease: "sine.inOut" }, 0)
        .to(stop2, { attr: { "stop-color": "#6366f1" }, duration: 2, ease: "sine.inOut" }, 0)
        .to(stop3, { attr: { "stop-color": "#4a6cf7" }, duration: 2, ease: "sine.inOut" }, 0)
        .to(stop1, { attr: { "stop-color": "#818cf8" }, duration: 2, ease: "sine.inOut" }, 2)
        .to(stop2, { attr: { "stop-color": "#4a6cf7" }, duration: 2, ease: "sine.inOut" }, 2)
        .to(stop3, { attr: { "stop-color": "#7c5cfc" }, duration: 2, ease: "sine.inOut" }, 2)
        .to(stop1, { attr: { "stop-color": "#6366f1" }, duration: 2, ease: "sine.inOut" }, 4)
        .to(stop2, { attr: { "stop-color": "#7c5cfc" }, duration: 2, ease: "sine.inOut" }, 4)
        .to(stop3, { attr: { "stop-color": "#818cf8" }, duration: 2, ease: "sine.inOut" }, 4)
        .to(stop1, { attr: { "stop-color": "#4a6cf7" }, duration: 2, ease: "sine.inOut" }, 6)
        .to(stop2, { attr: { "stop-color": "#818cf8" }, duration: 2, ease: "sine.inOut" }, 6)
        .to(stop3, { attr: { "stop-color": "#6366f1" }, duration: 2, ease: "sine.inOut" }, 6);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateScreenCoords);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(animateFace);
      meTl.kill();
      blink.kill();
      dizzy.kill();
      blobGradient.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        ref={svgRef}
        viewBox="0 10 211.73 180"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id={`background-clip-${uid}`}>
            <path d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-8.82-80.28-33.59-86.29C136.84-6.57 114.13-5.82 88-2.82S34.73 11.45 16.71 48.24C-1.5 66.64-4.88 125.2 39 153.73z" fill="none" />
          </clipPath>

          {/* Animated gradient for blob background */}
          <linearGradient id={`blob-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop className="blob-stop-1" offset="0%" stopColor="#4a6cf7" />
            <stop className="blob-stop-2" offset="50%" stopColor="#7c5cfc" />
            <stop className="blob-stop-3" offset="100%" stopColor="#818cf8" />
          </linearGradient>

          {/* Clip path matching the sculpted mouth shape */}
          <clipPath id={`mouth-clip-${uid}`}>
            <path d="M96.5,109 C96.5,106.5 98,105.5 101,105.5 C103,105.5 104,107 105,107 C106,107 107,105.5 109,105.5 C112,105.5 113.5,106.5 113.5,109 C113.5,111.5 110,112.5 105,112 C100,112.5 96.5,111.5 96.5,109 Z" />
          </clipPath>
        </defs>

        {/* Background blob — animated gradient */}
        <path
          className="bg"
          d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-10.51-57-35.28-63-50.22 17-76.31 20-60.12-15.88-78.32 2.51S-4.88 125.2 39 153.73z"
          fill={`url(#blob-grad-${uid})`}
        />

        <g clipPath={`url(#background-clip-${uid})`}>
          <g className="me" opacity="0">
            <g className="body">
              {/* Body shadows */}
              <path
                className="shadow"
                d="m 145.41538,69.163039 c 0,0 8.88529,13.869724 5.63458,21.0213 -3.25072,7.151576 -7.58501,6.501432 -4.33429,11.052431 3.25072,4.55101 1.04065,10.9367 -2.60058,12.35273 -7.80172,3.034 -7.80172,2.81729 -12.56942,10.619 -2.62115,4.28916 -8.36589,5.7409 -8.23516,10.18558 0.21671,7.3683 -1.517,4.55101 0.43343,4.76772 4.24814,0.472 12.78615,6.28471 15.17001,9.96886 2.38386,3.68414 10.619,17.55388 10.619,17.55388 l -39.87545,6.50142 c 0,0 -12.786151,-91.670199 -8.66858,-91.886913 4.11758,-0.216715 44.42646,-12.136008 44.42646,-12.136008 z"
                opacity="0.09"
                style={{ isolation: "isolate" }}
              />
              <path
                className="shadow"
                d="m 65.881186,71.330183 c 0,0 -6.790658,17.850124 -4.117574,20.804585 4.117574,4.551003 3.90086,4.984432 0.433428,6.068004 -4.363498,1.363592 -4.297462,8.252128 -2.383858,12.352718 1.517002,3.25073 5.612201,6.6708 10.619007,6.50143 7.170422,-0.24255 3.656154,4.27946 15.17001,11.70258 5.617569,3.62171 -3.759509,11.96831 -9.535435,17.55387 -6.878453,6.65175 -8.668577,11.48586 -8.668577,11.48586 -8.299095,19.57892 -35.790794,38.06225 4.551005,20.80459 47.760688,-20.43134 28.480358,-15.79924 33.157308,-23.62187 6.73243,-11.26062 8.23515,7.15158 8.23515,7.15158 L 69.348617,82.816048 c 0,0 15.386724,-22.755015 -3.467431,-11.485865 z"
                opacity="0.09"
                style={{ isolation: "isolate" }}
              />

              {/* Hair back */}
              <path
                className="hair-back hair"
                d="M 73.249477,108.82178 C 60.896755,81.94919 69.782045,87.583765 66.097901,83.249477 63.311938,79.971874 56.995894,70.68004 63.714041,61.361319 c 6.718148,-9.31872 -3.900859,-7.151576 8.018435,-19.504298 11.919293,-12.352723 21.021299,-3.684145 21.021299,-3.684145 0,0 14.856025,-16.234855 20.154445,-1.517002 1.95042,5.417861 25.13887,-14.519866 30.99016,10.619008 7.39744,31.781625 0.21672,26.43916 0.21672,26.43916 0,0 6.50143,16.470296 -0.86686,22.321586 -7.36829,5.851292 -39.0086,18.637432 -39.0086,18.637432 z"
                fill={HAIR}
              />

              {/* Neck */}
              <path
                className="neck"
                d="M114.26 143.16v-14a9.22 9.22 0 10-18.43 0v14c-15.27 2.84-24.74 15.08-24.74 27.33H139c0-12.24-9.5-24.49-24.74-27.33z"
                fill={SKIN}
              />

              {/* Top/shirt */}
              <path
                className="top"
                d="M105.61 167c-30.17 0-25.36-40-25.36 15.84h25.35l25-2.14c-.05-55.79 5.17-13.7-24.99-13.7z"
                fill="#fff"
                stroke="#404040"
                strokeWidth=".5"
              />

              {/* Shoulders */}
              <path className="shoulder" d="M95.82 142.87c-16 1.84-29.37 19.5-29.37 40h29.37z" fill="#404040" />
              <path className="shoulder" d="M114.23 142.67c15.76 1.85 29 19.6 29 40.2h-29z" fill="#404040" />
            </g>

            {/* Neck shadow */}
            <path className="neck-shadow" d="M95.82 122.36h18.41v14.31s-10.5 5.54-18.41 0z" fill={SKIN_SHADOW} />

            <g className="head">
              {/* Left ear */}
              <g className="ear-left ear">
                <path d="M63.52 105.14A8.21 8.21 0 0072 113.2a8.36 8.36 0 008.51-8.1A8.21 8.21 0 0072 97a8.36 8.36 0 00-8.48 8.14z" fill={SKIN} />
                <path d="M68.54 104.48a17 17 0 014.14.41c1.07.31 1.94 1 3 1.31a.39.39 0 00.43-.57c-1.15-2.38-5.49-1.86-7.58-1.67a.26.26 0 000 .52z" fill={SKIN_SHADOW} />
              </g>

              {/* Right ear */}
              <g className="ear-right ear">
                <path d="M144.37 105.24a8.2 8.2 0 01-8.37 8.06 8.35 8.35 0 01-8.51-8.1 8.21 8.21 0 018.42-8.06 8.35 8.35 0 018.46 8.1z" fill={SKIN} />
                <path d="M139.6 104c-2.1-.19-6.43-.72-7.59 1.67a.39.39 0 00.44.57c1.07-.26 1.92-1 3-1.31a17.51 17.51 0 014.15-.41.26.26 0 000-.52z" fill={SKIN_SHADOW} />
              </g>

              <g className="face">
                {/* Face shape */}
                <rect x="73.99" y="48.26" width="61.54" height="80.49" rx="26.08" transform="rotate(180 104.76 88.5)" fill={SKIN} />

                <g className="inner-face">
                  {/* Eyebrows */}
                  <path className="eyebrow-right" d="M120.73 79a9 9 0 00-4-1.22 9.8 9.8 0 00-4.19.87" fill="none" stroke={HAIR} strokeWidth="1.04" />
                  <path className="eyebrow-left" d="M97.12 79.41a9.53 9.53 0 00-4-1.11 10.58 10.58 0 00-4.2.76" fill="none" stroke={HAIR} strokeWidth="1.04" />

                  {/* Mouth group */}
                  <g className="mouth-g">
                    {/* Open mouth smile (shown on hover) */}
                    <g className="mouth-open" opacity="0">
                      <path
                        d="M96.5,109
                           C96.5,106.5 98,105.5 101,105.5
                           C103,105.5 104,107 105,107
                           C106,107 107,105.5 109,105.5
                           C112,105.5 113.5,106.5 113.5,109
                           C113.5,111.5 110,112.5 105,112
                           C100,112.5 96.5,111.5 96.5,109 Z"
                        fill="#000000"
                      />
                      {/* Tongue */}
                      <g clipPath={`url(#mouth-clip-${uid})`}>
                        <ellipse cx="105" cy="111" rx="3.5" ry="1.5" fill="#ffaa96" />
                      </g>
                    </g>

                    {/* Closed mouth (default) */}
                    <path className="mouth-closed" d="M97 107.52s7.06 4.62 14 1.59" fill="none" stroke="#8a6a5a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.04" />
                  </g>

                  {/* Oh mouth (for dizzy only) */}
                  <path
                    className="oh"
                    opacity="0"
                    d="M105.56,117.06c4-.14,5-2.89,4.7-5.64s-1.88-6.7-4.84-6.62-4.73,4.36-4.9,6.72S101.57,117.19,105.56,117.06Z"
                    fill="#262528"
                  />

                  {/* Eyes */}
                  <g className="eyes">
                    <path className="eye-left eye" d="M89.48 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z" fill="#000000" />
                    <path className="eye-right eye" d="M113.67 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z" fill="#000000" />
                    <path className="eye-right-2 eye" d="M114.11 88a5.72 5.72 0 002.48.72 6.46 6.46 0 002.59-.45" opacity="0" fill="none" stroke="#282828" strokeWidth="1.04" />
                    <path className="eye-left-2 eye" d="M89.85 88a5.77 5.77 0 002.56.3 6.48 6.48 0 002.49-.87" fill="none" opacity="0" stroke="#282828" strokeWidth="1.04" />
                  </g>

                  {/* Dizzy spirals */}
                  <path
                    className="dizzy dizzy-1"
                    opacity="0"
                    d="M113.61,87.6c.54-2.66,2.66-3.84,4.63-3.37A3.3,3.3,0,0,1,117,90.71a2.53,2.53,0,0,1-2-3,2.48,2.48,0,0,1,2.73-1.92A1.71,1.71,0,0,1,119.32,88a1.59,1.59,0,0,1-1.75,1.34c-.79-.1-1.41-.59-1-1.42s1-.72,1.22-.24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="0.75"
                  />
                  <path
                    className="dizzy dizzy-2"
                    opacity="0"
                    d="M96.15,87.27c-.54-2.66-2.66-3.84-4.63-3.37s-2.89,1.9-2.46,4a3.11,3.11,0,0,0,3.68,2.45,2.53,2.53,0,0,0,2-3A2.49,2.49,0,0,0,92,85.49a1.71,1.71,0,0,0-1.57,2.13A1.57,1.57,0,0,0,92.19,89c.79-.11,1.41-.6,1-1.43s-1-.72-1.22-.23"
                    fill="none"
                    stroke="#000"
                    strokeWidth="0.75"
                  />

                  {/* Nose */}
                  <path className="nose" d="M102.39 98.13s3.09 1.55 5.78 0" fill="none" stroke={SKIN_SHADOW} />

                  {/* Glasses */}
                  <path
                    className="glasses"
                    d="M133.54 81.76c-4.7-1.42-15.29-2.42-19.83-.45-5.82 2.17-3.18 1.57-8.55 1.17-5.36.4-2.74 1-8.55-1.18-7.3-2.55-15.58-.24-22.25.72v2.75c2.46.24 1.26 6.78 3.06 10.32 2.13 7.23 12.69 9.55 18.19 5.49 3.9-2 7.08-10.32 7.21-12.86 0-1.64 4.15-2.57 4.61.24.11 2.53 3.42 10.69 7.28 12.62 5.5 4 16 1.74 18.17-5.49 1.8-3.54 1.69-9.92 2.88-10.32s.74-2.67 0-2.75-1.02-.1-2.22-.26zM97.25 97.49C90.94 104.81 79 101.2 78 92.3c-.7-2.62-1-7.3 1.27-9.12s6.88-1.87 9.23-2c11.14-.26 16.62 5.6 8.75 16.31zm35.12-5.19c-3.71 17.2-27.26 7.42-22.09-7.36 1.87-3.11 9.09-3.84 11.55-3.73 8.07-.04 12.7 1.79 10.54 11.09z"
                    fill={GLASSES}
                    opacity="0.85"
                  />
                </g>

                {/* Hair front */}
                <path
                  className="hair-front"
                  d="m 115.29208,65.262179 c 0,0 -17.553873,13.653009 -17.987302,2.600573 -0.433429,-11.052436 0.216714,5.201146 -8.018434,5.417861 -8.235148,0.216714 -7.801719,-6.284719 -7.801719,-6.284719 0,0 -3.90086,12.136008 -7.80172,8.668578 -3.900859,-3.467431 -1.083572,-27.089304 2.167145,-27.306018 3.250716,-0.216715 0,-5.85129 27.95616,-6.934862 27.95616,-1.083572 20.15444,6.718147 18.85416,9.102006 -1.30029,2.383859 7.36829,-13.436295 12.78615,-0.433429 5.41786,13.002866 3.034,36.841453 -7.80172,17.12044 -10.83572,-19.721013 14.51986,26.222446 -12.35272,-1.95043 z"
                  fill={HAIR}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
