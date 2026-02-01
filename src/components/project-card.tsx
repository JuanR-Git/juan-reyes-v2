"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectMeta;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.15 * index + 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <article className="rounded-xl border border-divider bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* Image container */}
          <div className="relative overflow-hidden aspect-[4/3] bg-bg-secondary">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                unoptimized={project.thumbnail.endsWith(".gif")}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-fg-muted/20 uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            )}
          </div>

          {/* Text block */}
          <div className="p-5 md:p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-semibold text-fg-primary mb-1.5 group-hover:text-accent-blue transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-fg-muted line-clamp-2 mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-fg-muted/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
