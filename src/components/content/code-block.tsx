"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "text", filename }: CodeBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-6 rounded-sm border border-fg-primary/10 overflow-hidden"
    >
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-fg-primary/[0.04] border-b border-fg-primary/10">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-sienna/60" />
          <span className="text-[10px] font-medium tracking-wider text-fg-muted">
            {filename}
          </span>
          <span className="ml-auto text-[9px] tracking-[0.2em] uppercase text-fg-muted/60">
            {language}
          </span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-fg-primary/[0.02]">
        <code className="text-xs leading-relaxed text-fg-secondary font-[family-name:var(--font-body)]">
          {code}
        </code>
      </pre>
    </motion.div>
  );
}
