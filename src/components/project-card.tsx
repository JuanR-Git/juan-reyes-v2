"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectMeta;
  index: number;
}

const categoryLabels: Record<string, string> = {
  ml: "Machine Learning",
  embedded: "Robotics",
  software: "Software",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <article
          className="border border-divider bg-white transition-all will-change-transform"
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
          {/* Thumbnail — rounded independently so 3D transform doesn't break clip */}
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
          <div className="p-5 md:p-6">
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

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-fg-muted/30 group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
