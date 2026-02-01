"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import Nav from "@/components/nav";
import ProjectCard from "@/components/project-card";
import SocialLinks from "@/components/social-links";
import RotatingText from "@/components/rotating-text";
import HeroNameReveal from "@/components/hero-name-reveal";
import MagneticCursor from "@/components/magnetic-cursor";
import ChibiAvatar from "@/components/chibi-avatar";
import { getAllProjects } from "@/lib/projects";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const initial =
    direction === "left"
      ? { opacity: 0, x: -50 }
      : direction === "right"
        ? { opacity: 0, x: 50 }
        : { opacity: 0, y: 40 };
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Cinematic parallax wrapper */
function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

const filters = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Machine Learning", value: "ml" },
  { label: "Software", value: "software" },
  { label: "Robotics", value: "embedded" },
] as const;

const aboutPhotos = [
  {
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1067&fit=crop",
    title: "In the Lab",
    description: "Assembling and testing a robotic exoskeleton prototype for my capstone project at McMaster.",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1067&fit=crop",
    title: "Demo Day",
    description: "Presenting the AI-powered chess board to faculty and industry judges at our engineering showcase.",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=1067&fit=crop",
    title: "Hackathon Weekend",
    description: "Building a working prototype from scratch with my team over 48 hours at DeltaHacks.",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1067&fit=crop",
    title: "On Campus",
    description: "Walking through McMaster's campus in Hamilton — home for the last five years.",
  },
];

function AboutContent() {
  const [activeSlide, setActiveSlide] = useState(0);

  const next = useCallback(
    () => setActiveSlide((i) => (i + 1) % aboutPhotos.length),
    []
  );
  const prev = useCallback(
    () => setActiveSlide((i) => (i - 1 + aboutPhotos.length) % aboutPhotos.length),
    []
  );

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = aboutPhotos[activeSlide];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
      {/* Left — Photo slideshow */}
      <ScrollReveal direction="left" className="lg:col-span-5 relative z-10">
        <div className="relative">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-bg-secondary">
            {aboutPhotos.map((p, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: i === activeSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
            ))}

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-divider flex items-center justify-center text-fg-muted hover:text-fg-primary transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-divider flex items-center justify-center text-fg-muted hover:text-fg-primary transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {aboutPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? "bg-accent-blue w-4" : "bg-fg-muted/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating description card — changes per slide */}
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute -bottom-8 -right-4 lg:-right-12 rounded-lg border border-divider bg-white p-5 shadow-sm z-20 max-w-[240px]"
          >
            <span className="block text-[11px] font-semibold tracking-wide text-fg-primary mb-1.5">
              {slide.title}
            </span>
            <p className="text-[11px] leading-[1.6] text-fg-muted">
              {slide.description}
            </p>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Right — Bio text */}
      <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 lg:col-start-6 lg:pl-16 xl:pl-20 mt-16 lg:mt-12">
        <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-fg-primary mb-8 leading-[1.1]">
          Hey, I&apos;m Juan{" "}
          <span className="text-accent-blue">&mdash;</span>
        </h3>

        <div className="space-y-5 text-sm md:text-base leading-[1.9] text-fg-secondary">
          <p>
            I&apos;m a mechatronics engineering new grad from McMaster with a deep love
            for building things that live at the intersection of hardware and software.
            Whether it&apos;s a robotic exoskeleton, an AI-powered chess board, or a
            VS Code extension, I&apos;m drawn to projects that make me think across
            every layer of the stack.
          </p>
          <p>
            I believe the best engineering happens when you understand the problem
            end-to-end — from the sensor reading to the user interface, from the
            training data to the deployed model. That curiosity is what drives me.
          </p>
          <p>
            When I&apos;m not building, you&apos;ll find me exploring new technologies,
            tinkering with hardware, or helping others learn to code. I&apos;m always
            looking for the next challenge that pushes me somewhere new.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function Home() {
  const projects = getAllProjects();
  const [activeFilter, setActiveFilter] = useState<string>("featured");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "featured") return projects;
    if (activeFilter === "newest") {
      return [...projects].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div className="min-h-screen bg-white">
      <MagneticCursor />
      <Nav />

      {/* ═══ Hero — Full viewport, dramatic name reveal ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* Faint grid background for hero */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--fg-primary) 1px, transparent 1px), linear-gradient(90deg, var(--fg-primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 pt-24 max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left column — name + tagline */}
          <div>
            <HeroNameReveal />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
              className="text-lg md:text-xl lg:text-2xl tracking-wide text-fg-secondary mt-6"
            >
              <RotatingText />
            </motion.div>

            <SocialLinks className="mt-8" delay={2.0} />
          </div>

          {/* Right column — Chibi avatar centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex items-center justify-end"
          >
            <ChibiAvatar className="w-[80%] lg:w-[85%] xl:w-[90%] max-w-[500px]" />
          </motion.div>
        </div>

        {/* Centered scroll-down arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          onClick={() => {
            const el = document.getElementById("projects");
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-fg-muted hover:text-accent-blue transition-colors"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Projects</span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.button>

        {/* Large watermark number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-8 left-6 md:left-12 lg:left-24 font-[family-name:var(--font-display)] text-[12rem] md:text-[18rem] font-extrabold text-fg-primary/[0.02] leading-none select-none pointer-events-none"
        >
          JR
        </motion.span>
      </section>

      {/* ═══ Projects heading + Filter bar ═══ */}
      <section id="projects" className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto pt-16 pb-6">
        <ScrollReveal className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-fg-primary">
            Projects
          </h2>
        </ScrollReveal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              data-magnetic
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeFilter === f.value
                  ? "bg-accent-blue text-white"
                  : "bg-bg-secondary text-fg-primary hover:bg-divider"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ═══ Projects section ═══ */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-6 md:mx-12 h-px bg-divider" />

      {/* ═══ About section with parallax ═══ */}
      <section className="py-24 md:py-32 overflow-hidden">
        <ScrollReveal className="text-center mb-24 px-8">
          <span className="text-xs font-medium tracking-widest uppercase text-accent-blue block mb-4">
            About
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-fg-primary leading-tight mb-4">
            Oh, you made it this far?
          </h2>
          <p className="text-sm md:text-base text-fg-muted max-w-lg mx-auto leading-relaxed">
            Well, here&apos;s a little about the person behind the projects.
          </p>
        </ScrollReveal>

        {/* Photo + Bio */}
        <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <AboutContent />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider px-6 py-10 flex flex-col items-center gap-4">
        <SocialLinks delay={0} />
        <span className="text-xs text-fg-muted">
          Juan Reyes &mdash; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
