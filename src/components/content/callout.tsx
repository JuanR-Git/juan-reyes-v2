"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CalloutProps {
  children: React.ReactNode;
  label?: string;
}

export default function Callout({ children, label = "Note" }: CalloutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative my-8 rounded-sm border border-accent-sienna/20 bg-gradient-to-r from-accent-sienna/[0.04] to-transparent p-5 pl-6"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-sienna rounded-l-sm" />
      <div className="absolute left-[-5px] top-4 w-[11px] h-[11px] rounded-full bg-accent-sienna border-2 border-bg-primary" />
      <span className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-accent-sienna mb-2">
        {label}
      </span>
      <div className="text-sm leading-relaxed text-fg-secondary">
        {children}
      </div>
    </motion.div>
  );
}
