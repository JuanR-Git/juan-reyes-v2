"use client";

import { motion } from "framer-motion";
import Nav from "@/components/nav";
import SocialLinks from "@/components/social-links";
import type { ProjectMeta, ProjectLink } from "@/lib/projects";

interface ProjectLayoutProps {
  project: ProjectMeta;
  children: React.ReactNode;
}

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  switch (type) {
    case "github":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "website":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "devpost":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
        </svg>
      );
    case "documentation":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
  }
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

        {/* Quick links */}
        {project.links && project.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 mt-6"
          >
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-divider text-fg-muted text-xs font-medium tracking-wide hover:text-accent-blue hover:border-accent-blue/30 transition-colors duration-200"
              >
                <LinkIcon type={link.type} />
                {link.label}
              </a>
            ))}
          </motion.div>
        )}

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
