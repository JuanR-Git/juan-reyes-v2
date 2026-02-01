"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  label: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative my-8 pl-6">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-accent-teal/25" />

      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="relative mb-8 last:mb-0"
        >
          {/* Dot */}
          <div className="absolute left-[-19px] top-[6px] w-[9px] h-[9px] rounded-full border-2 border-accent-teal bg-bg-primary" />

          <span className="block text-[10px] font-medium tracking-[0.2em] uppercase text-accent-teal mb-1">
            {event.label}
          </span>
          <h4 className="font-[family-name:var(--font-display)] text-base font-semibold text-fg-primary mb-1">
            {event.title}
          </h4>
          <p className="text-xs leading-relaxed text-fg-secondary">
            {event.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
