"use client";

import { motion } from "framer-motion";

const firstName = "JUAN";
const lastName = "REYES";

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.08,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedWord({
  word,
  offset = 0,
}: {
  word: string;
  offset?: number;
}) {
  return (
    <span className="inline-flex overflow-hidden">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + offset}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ perspective: 600 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroNameReveal() {
  return (
    <div className="flex flex-col items-start">
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-extrabold leading-[0.85] tracking-[-0.03em] text-fg-primary">
        <AnimatedWord word={firstName} />
        <br />
        <AnimatedWord word={lastName} offset={firstName.length} />
      </h1>

      {/* Accent line that draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="h-[3px] w-24 bg-accent-blue origin-left mt-6"
      />
    </div>
  );
}
