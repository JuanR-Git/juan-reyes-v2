"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/nav";
import SocialLinks from "@/components/social-links";
import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("mcmaster-exoskeleton")!;

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

/* Alternating zigzag section: text + image, flipping sides */
function ZigzagSection({
  title,
  accent,
  text,
  imageSrc,
  imageAlt,
  imageCaption,
  reverse = false,
  children,
}: {
  title: React.ReactNode;
  accent?: string;
  text: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 md:py-28">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? "direction-rtl" : ""
        }`}
        style={reverse ? { direction: "rtl" } : {}}
      >
        {/* Text side */}
        <ScrollReveal
          direction={reverse ? "right" : "left"}
          className="text-left"
          style-override
        >
          <div style={{ direction: "ltr" }}>
            {accent && (
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent-blue block mb-4">
                {accent}
              </span>
            )}
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-fg-primary mb-6 leading-tight">
              {title}
            </h2>
            <div className="space-y-5 text-sm md:text-base leading-[1.9] text-fg-secondary">
              {text}
            </div>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </ScrollReveal>

        {/* Image side */}
        <ScrollReveal direction={reverse ? "left" : "right"} delay={0.12}>
          <div style={{ direction: "ltr" }}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
            {imageCaption && (
              <span className="block text-[11px] text-fg-muted mt-3 tracking-wide">
                {imageCaption}
              </span>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function McMasterExoskeleton() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1920&q=90&auto=format&fit=crop"
          alt="McMaster Exoskeleton"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111]/50 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent-blue">
              {project.category}
            </span>
            <span className="h-px w-10 bg-accent-blue/40" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/50">
              {project.year}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-[0.9] mb-6 max-w-4xl"
          >
            McMaster
            <br />
            Exoskeleton
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-wider text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Body container with consistent max-width */}
      <div className="max-w-[1400px] mx-auto">

      {/* ═══ INTRO — Centered editorial ═══ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-fg-primary leading-[1.15] mb-8">
            Navigation from the{" "}
            <span className="text-accent-blue">ground up.</span>
          </p>
          <p className="text-sm md:text-base leading-[1.9] text-fg-secondary">
            I wanted to understand autonomous navigation from the ground up — not
            just calling library functions, but grasping the math behind SLAM,
            understanding how sensor fusion actually works, and building something
            that could handle real terrain, not just simulation. The goal was a 4WD
            rover capable of navigating unstructured outdoor environments using only
            LiDAR and IMU data, with no GPS dependency.
          </p>
        </ScrollReveal>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* ═══ TECH STACK ═══ */}
      <section className="px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal>
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-accent-blue mb-10 block">
            Tech Stack
          </span>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-divider/50">
          {[
            { name: "ROS2 Humble", role: "Middleware & comms" },
            { name: "C++17", role: "Core nav stack" },
            { name: "Python", role: "Tooling & viz" },
            { name: "RPLiDAR A1", role: "2D LiDAR" },
            { name: "BNO055 IMU", role: "Orientation" },
            { name: "Raspberry Pi 4", role: "Compute" },
          ].map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.06} className="bg-white p-6 lg:p-8">
              <span className="block font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-fg-primary mb-1">
                {item.name}
              </span>
              <span className="block text-[10px] tracking-[0.15em] uppercase text-fg-muted">
                {item.role}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* ═══ ZIGZAG SECTIONS ═══ */}

      {/* 1: Architecture — Text left, Image right */}
      <ZigzagSection
        accent="Architecture"
        title={
          <>
            Modular by <span className="text-accent-blue">design.</span>
          </>
        }
        text={
          <>
            <p>
              The system architecture separates perception, planning, and control
              into independent ROS2 nodes communicating over typed topics. This
              wasn&apos;t just for cleanliness — it allowed me to swap out individual
              components during testing without touching the rest of the stack.
            </p>
            <p>
              Each node publishes and subscribes to well-defined message types,
              creating a clean contract between subsystems. The SLAM node produces
              maps and pose estimates; the planner consumes them and emits velocity
              commands.
            </p>
          </>
        }
        imageSrc="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=85&auto=format&fit=crop"
        imageAlt="System architecture diagram"
        imageCaption="Perception, planning & control as independent ROS2 nodes"
      >
        {/* Inline code block */}
        <div className="rounded-lg border border-divider overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border-b border-divider">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/60" />
            <span className="text-[10px] font-medium tracking-wider text-fg-muted">
              rover_launch.yaml
            </span>
          </div>
          <pre className="p-5 overflow-x-auto bg-bg-secondary/50 text-xs leading-[1.8] text-fg-secondary font-[family-name:var(--font-body)]">
{`nodes:
  - lidar_driver:
      package: rplidar_ros
      parameters: { serial_port: /dev/ttyUSB0 }
  - slam_node:
      package: rover_slam
      subscribers: [/scan, /imu/data]
      publishers: [/map, /pose]
  - planner:
      package: rover_nav
      subscribers: [/map, /pose, /goal]
      publishers: [/cmd_vel]`}
          </pre>
        </div>
      </ZigzagSection>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* 2: Challenges — Text right, Image left */}
      <ZigzagSection
        reverse
        accent="Challenges"
        title={
          <>
            Reality vs. <span className="text-accent-blue">simulation.</span>
          </>
        }
        text={
          <>
            <p>
              The biggest challenge was sensor noise in outdoor environments. Gravel,
              grass, and uneven terrain created LiDAR readings that looked nothing
              like the clean indoor scans I&apos;d been testing with. I ended up
              implementing a custom scan filtering pipeline that classified and
              rejected ground-plane returns.
            </p>
            <p>
              Motor control was another surprise. The four wheels had slightly
              different friction characteristics, causing the rover to drift. I added
              a closed-loop heading correction using IMU data that compensated in
              real-time.
            </p>
          </>
        }
        imageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop"
        imageAlt="Circuit board close-up"
        imageCaption="Custom scan filtering pipeline for outdoor noise"
      >
        {/* Lesson callout */}
        <div className="relative rounded-lg border border-accent-blue/20 p-5 pl-6 bg-accent-blue/[0.03]">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-blue rounded-l-lg" />
          <span className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-accent-blue mb-2">
            Lesson Learned
          </span>
          <p className="text-sm leading-relaxed text-fg-secondary">
            Simulation is necessary but insufficient. Every assumption I made in
            Gazebo was violated within 30 seconds of outdoor testing. Budget twice
            the time for real-world integration.
          </p>
        </div>
      </ZigzagSection>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* 3: Build Progress — Text left, Image right */}
      <ZigzagSection
        accent="Build Progress"
        title={
          <>
            8 weeks. <span className="text-fg-muted">Zero to autonomous.</span>
          </>
        }
        text={
          <>
            <p>
              <strong>Week 1–2: Chassis & Motor Control.</strong> Built the 4WD chassis,
              wired motor drivers, and wrote the low-level PWM control layer in C++.
              First test: driving in a straight line (harder than it sounds).
            </p>
            <p>
              <strong>Week 3–4: LiDAR Integration & SLAM.</strong> Integrated RPLiDAR A1,
              implemented scan matching using ICP algorithm. Initial SLAM accuracy was
              terrible until I added IMU fusion for rotation estimates.
            </p>
            <p>
              <strong>Week 5–6: Path Planning.</strong> Implemented A* on the occupancy
              grid with dynamic replanning. Added a reactive obstacle avoidance layer
              using VFH for real-time corrections.
            </p>
            <p>
              <strong>Week 7–8: Field Testing.</strong> Took it outdoors. The first test
              was humbling — gravel confused the LiDAR. Spent two weeks tuning scan
              matching and adding terrain classification.
            </p>
          </>
        }
        imageSrc="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1100&q=85&auto=format&fit=crop"
        imageAlt="Rover chassis build"
        imageCaption="4WD chassis with custom motor mounts"
      />

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* ═══ GALLERY — Full-width images ═══ */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <ScrollReveal className="mb-12">
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-accent-blue block mb-3">
            Gallery
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=85&auto=format&fit=crop",
              alt: "LiDAR sensor mount",
              caption: "RPLiDAR A1 on vibration-dampened mount",
            },
            {
              src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=85&auto=format&fit=crop",
              alt: "SLAM visualization",
              caption: "Real-time occupancy grid from SLAM",
            },
          ].map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
              <span className="block text-[11px] text-fg-muted mt-3 tracking-wide">
                {img.caption}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-6">
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1600&q=85&auto=format&fit=crop"
              alt="Outdoor field test"
              fill
              className="object-cover"
            />
          </div>
          <span className="block text-[11px] text-fg-muted mt-3 tracking-wide">
            First successful autonomous outdoor navigation run
          </span>
        </ScrollReveal>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* ═══ RESULTS ═══ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <ScrollReveal className="mb-16">
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-accent-blue block mb-3">
            Results
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {[
            { number: "94%", label: "Waypoint accuracy" },
            { number: "50m", label: "Test course distance" },
            { number: "40%", label: "Less compute vs. standard SLAM" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <span className="block font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl font-extrabold text-fg-primary leading-none mb-3">
                {stat.number}
              </span>
              <span className="block text-xs tracking-[0.15em] uppercase text-fg-muted">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
          <ScrollReveal direction="left">
            <p className="text-sm md:text-base leading-[1.9] text-fg-secondary">
              The rover successfully navigated a 50m outdoor course with multiple
              obstacles, achieving a 94% waypoint accuracy rate. Map quality was
              comparable to established SLAM packages, but with 40% lower compute
              usage due to the custom scan matching optimizations.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <p className="text-sm md:text-base leading-[1.9] text-fg-secondary">
              The full codebase is open source and has been used as a teaching
              reference by two university robotics courses. The custom ICP
              implementation has been independently benchmarked against standard
              libraries.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-divider" />

      {/* ═══ REFLECTIONS ═══ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-accent-blue block mb-6">
            Reflections
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-fg-primary mb-10 leading-tight">
            Where real engineering lives.
          </h2>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-[1.9] text-fg-secondary">
              This project taught me more about systems integration than any course
              or textbook. The gap between &ldquo;works in theory&rdquo; and
              &ldquo;works on gravel at 3pm when the sun angle creates LiDAR
              artifacts&rdquo; is where real engineering lives.
            </p>
            <p className="text-sm md:text-base leading-[1.9] text-fg-secondary">
              If I built it again, I&apos;d start with outdoor testing from day one
              and invest in a better IMU earlier. The BNO055 worked but its drift
              characteristics cost me days of debugging.
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <div className="w-12 h-px bg-accent-blue/40" />
          </div>
        </ScrollReveal>
      </section>

      </div>{/* end body container */}

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
