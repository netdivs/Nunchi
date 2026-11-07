"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { GALLERY_BRIDAL as GALLERY } from "@/lib/gallery";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) =>
        cur === null
          ? cur
          : (cur + dir + GALLERY.length) % GALLERY.length
      );
    },
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <section className="bg-cream/50 py-28 md:py-36">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Bridal Gallery"
            title="Real brides, real glow."
            italicWords={[3]}
            description="A glimpse of our Lahore brides — from mehndi to barat and walima — styled at Nunchi Salon by Naheed in Wapda Town."
          />
          <Reveal delay={0.15} className="shrink-0">
            <div className="flex flex-col items-start gap-4 md:items-end">
              <p className="max-w-[240px] text-[12px] leading-relaxed uppercase tracking-[0.2em] text-taupe md:text-right">
                Tap any image to view it closer
              </p>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
              >
                View full gallery
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 columns-2 gap-5 md:columns-3 lg:gap-6">
          {GALLERY.map((item, i) => (
            <Reveal
              key={item.src}
              className="mb-5 break-inside-avoid lg:mb-6"
              y={36}
              delay={(i % 3) * 0.08}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`group relative block w-full overflow-hidden ${item.aspect}`}
                aria-label={`View image: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute bottom-4 left-4 translate-y-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[active].caption}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne"
              aria-label="Close gallery"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne md:left-8"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne md:right-8"
              aria-label="Next image"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.figure
              key={active}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-16 max-h-[82vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full sm:h-[76vh]">
                <Image
                  src={GALLERY[active].src}
                  alt={GALLERY[active].alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.24em] text-ivory/70">
                  {GALLERY[active].caption}
                </span>
                <span className="font-serif italic text-champagne">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(GALLERY.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
