"use client";

import { motion } from "framer-motion";
import Nav from "@/components/nav";
import SocialLinks from "@/components/social-links";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectLayoutProps {
  project: ProjectMeta;
  children: React.ReactNode;
}

export default function ProjectLayout({ project, children }: ProjectLayoutProps) {
  return (
    <div className="min-h-screen schematic-grid">
      <Nav />

      {/* Hero area */}
      <header className="relative pt-28 pb-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        {/* Category + year */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-accent-teal">
            {project.category}
          </span>
          <span className="h-px w-8 bg-accent-teal/30" />
          <span className="text-[10px] font-medium tracking-[0.2em] text-fg-muted">
            {project.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg-primary leading-tight mb-6"
        >
          {project.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm md:text-base leading-relaxed text-fg-secondary max-w-2xl mb-8"
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-sm border border-tag-border bg-tag-bg px-2.5 py-1 text-[11px] font-medium tracking-wider text-tag-text"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Dimension line divider */}
        <div className="dimension-line mt-12" />
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-24"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-divider px-6 py-10 flex flex-col items-center gap-4">
        <SocialLinks delay={0} variant="muted" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-fg-muted">
          Juan Reyes &mdash; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
