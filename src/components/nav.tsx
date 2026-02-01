"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-5 xl:px-24 2xl:px-32 transition-[background-color,backdrop-filter,border-color] duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-divider"
          : "border-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-fg-primary hover:text-accent-blue transition-colors duration-300"
      >
        Juan Reyes
      </Link>

      <div className="flex items-center gap-6">
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              href="/"
              className="text-sm text-fg-muted hover:text-accent-blue transition-colors duration-300"
            >
              All Projects
            </Link>
          </motion.div>
        )}

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-fg-muted hidden sm:inline">
            Open to new opportunities
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
