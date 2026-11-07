"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      category === "All"
        ? items
        : items.filter((item) => item.category === category),
    [category, items]
  );

  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((current) =>
        current === null
          ? current
          : (current + dir + filtered.length) % filtered.length
      );
    },
    [filtered.length]
  );

  const selectCategory = (next: GalleryCategory) => {
    setActive(null);
    setCategory(next);
  };

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <>
      <div className="nc-gallery-toolbar">
        <div
          className="nc-gallery-filters"
          role="group"
          aria-label="Filter gallery by category"
        >
          {GALLERY_CATEGORIES.map((option) => {
            const count =
              option === "All"
                ? items.length
                : items.filter((item) => item.category === option).length;

            return (
              <button
                key={option}
                type="button"
                className={cn(
                  "nc-gallery-filter",
                  category === option && "is-active"
                )}
                aria-pressed={category === option}
                onClick={() => selectCategory(option)}
              >
                {option}
                <span aria-hidden="true">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <p className="nc-gallery-hint">
          {String(filtered.length).padStart(2, "0")} images &middot; tap to view
        </p>
      </div>

      <motion.div layout className="nc-gallery-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((item, index) => (
            <motion.div
              key={item.src}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="nc-gallery-cell"
            >
              <button
                type="button"
                className="nc-gallery-card group"
                onClick={() => setActive(index)}
                aria-label={`View ${item.caption}`}
              >
                <span className={cn("nc-gallery-media", item.aspect)}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="nc-gallery-shade"
                  />
                  <span className="nc-gallery-caption">
                    <span className="nc-gallery-caption-kicker">
                      {item.category}
                    </span>
                    <span className="nc-gallery-caption-title">
                      {item.caption}
                    </span>
                  </span>
                  <span className="nc-gallery-expand" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active !== null && filtered[active] ? (
          <motion.div
            className="nc-gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={filtered[active].caption}
          >
            <button
              type="button"
              onClick={close}
              className="nc-gallery-lb-btn nc-gallery-lb-close"
              aria-label="Close gallery"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className="nc-gallery-lb-btn nc-gallery-lb-prev"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className="nc-gallery-lb-btn nc-gallery-lb-next"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.figure
              key={filtered[active].src}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="nc-gallery-figure"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="nc-gallery-figure-media">
                <Image
                  src={filtered[active].src}
                  alt={filtered[active].alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="nc-gallery-figcaption">
                <span>
                  <span className="nc-gallery-caption-kicker">
                    {filtered[active].category}
                  </span>
                  <span className="nc-gallery-caption-title">
                    {filtered[active].caption}
                  </span>
                </span>
                <span className="nc-gallery-counter">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(filtered.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
