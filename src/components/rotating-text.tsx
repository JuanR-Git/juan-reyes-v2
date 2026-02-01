"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const phrases = [
  "Mechatronics Engineering Graduate",
  "Embedded Systems Team Lead",
  "Curious About New Technologies",
  "Robotics Innovator",
  "Full-Stack Problem Solver",
  "Hardware Meets Software",
];

export default function RotatingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[phraseIndex];
  const displayText = currentPhrase.slice(0, charIndex);

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        setCharIndex((c) => c + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((p) => (p + 1) % phrases.length);
      }
    }
  }, [charIndex, currentPhrase, isDeleting, isPaused, phraseIndex]);

  useEffect(() => {
    const speed = isDeleting ? 35 : 65;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="inline-flex items-center h-[1.4em]">
      <span className="text-accent-blue">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-accent-blue ml-[2px] translate-y-[1px]"
      />
    </span>
  );
}
