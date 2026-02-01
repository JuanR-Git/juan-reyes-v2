"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TechItem {
  name: string;
  role: string;
}

interface TechStackProps {
  items: TechItem[];
}

export default function TechStack({ items }: TechStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="my-8 grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="rounded-sm border border-tag-border bg-tag-bg/50 p-3"
        >
          <span className="block font-[family-name:var(--font-display)] text-sm font-semibold text-fg-primary">
            {item.name}
          </span>
          <span className="block text-[10px] tracking-wider text-fg-muted mt-0.5">
            {item.role}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
