"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ProjectMeta, ProjectLink } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectMeta;
  index: number;
}

const categoryLabels: Record<string, string> = {
  ml: "Machine Learning",
  embedded: "Robotics",
  software: "Software",
};

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  switch (type) {
    case "github":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "website":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "devpost":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
        </svg>
      );
    case "documentation":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
  }
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px 0px -50px 0px" });
  const rowDelay = (index % 3) * 0.08;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: rowDelay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <article
        className="group relative border border-divider bg-white transition-all will-change-transform"
        style={{
          boxShadow: "0 4px 24px rgba(26,26,46,0.06), 0 1px 4px rgba(26,26,46,0.03)",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          transitionDuration: "400ms",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "perspective(1200px) rotateX(2deg) rotateY(-3deg) translateY(-8px) scale(1.01)";
          el.style.boxShadow = "0 20px 50px rgba(26,26,46,0.12), 0 0 20px rgba(74,108,247,0.08)";
          el.style.borderColor = "rgba(74,108,247,0.15)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "";
          el.style.boxShadow = "0 4px 24px rgba(26,26,46,0.06), 0 1px 4px rgba(26,26,46,0.03)";
          el.style.borderColor = "";
        }}
      >
        {/* Stretched link — covers entire card for project page navigation */}
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0" aria-label={project.title} />

        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-[4/3] bg-bg-secondary">
          {project.thumbnail && /\.(mp4|webm|mov)$/i.test(project.thumbnail) ? (
            <video
              src={project.thumbnail}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized={project.thumbnail.endsWith(".gif")}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-fg-muted/20 uppercase tracking-widest">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-5 md:p-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold mb-3 bg-accent-blue/[0.07] text-accent-blue">
            {categoryLabels[project.category] || project.category}
          </span>

          <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-bold text-fg-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-fg-muted line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-[11px] text-fg-muted/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative z-10 flex items-center gap-2 flex-shrink-0">
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-7 h-7 rounded-full border border-divider flex items-center justify-center text-fg-muted/50 hover:text-accent-blue hover:border-accent-blue/30 transition-colors duration-200"
                >
                  <LinkIcon type={link.type} />
                </a>
              ))}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-fg-muted/30 group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-300 ml-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
