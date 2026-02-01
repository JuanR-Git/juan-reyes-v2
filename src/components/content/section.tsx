"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  annotation?: string;
}

export default function Section({ title, children, annotation }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-2 h-2 rounded-full bg-accent-sienna" />
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-fg-primary">
          {title}
        </h2>
        {annotation && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-fg-muted ml-auto hidden md:block">
            {annotation}
          </span>
        )}
      </div>
      <div className="pl-6 border-l border-grid-line-major space-y-4 text-sm leading-relaxed text-fg-secondary">
        {children}
      </div>
    </motion.section>
  );
}
