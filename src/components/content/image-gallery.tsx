"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3;
}

export default function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const gridCols = columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <>
      <div ref={ref} className={`grid ${gridCols} gap-4 my-8`}>
        {images.map((img, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-secondary dot-grid border border-grid-line-major">
              {/* Corner marks */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-accent-teal/30" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-accent-teal/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] tracking-widest uppercase text-fg-muted/40">
                  {img.alt}
                </span>
              </div>
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-[10px] leading-relaxed text-fg-muted tracking-wide">
                {img.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-fg-primary/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full mx-6 aspect-[16/10] rounded-sm bg-bg-secondary dot-grid border border-grid-line-major flex items-center justify-center">
            <span className="text-sm tracking-widest uppercase text-fg-muted/60">
              {images[lightbox].alt}
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
