"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";
import { HERO_SLIDES } from "@/lib/home-content";
import { cn } from "@/lib/cn";

const SLIDE_DURATION = 6500;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActive((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX;
    const delta = endX - startX;
    if (Math.abs(delta) < 48) return;
    goTo(delta < 0 ? active + 1 : active - 1);
  };

  return (
    <section
      className="nc-hero"
      aria-label="Welcome to Nunchi Salon by Naheed"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {HERO_SLIDES.map((slide, index) => {
        const Heading = index === 0 ? "h1" : "h2";
        return (
          <div
            key={slide.image}
            className={cn("nc-hero-slide", active === index && "is-active")}
            aria-hidden={active !== index}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="nc-hero-img"
            />
            <div className="nc-hero-shade" aria-hidden="true" />

            <div className="nc-hero-slide-inner">
              <div className="nc-container">
                <div className="nc-hero-content">
                  <p className="nc-hero-sub">
                    <Image
                      src="/images/ref/title_left2.svg"
                      alt=""
                      width={21}
                      height={21}
                      aria-hidden="true"
                    />
                    {slide.subtitle}
                  </p>

                  <Heading className="nc-hero-title">
                    {slide.title} <span className="nc-accent">{slide.accent}</span>
                  </Heading>

                  <div className="nc-hero-watermark" aria-hidden="true">
                    {slide.watermarkTop}
                    <span>{slide.watermarkBottom}</span>
                  </div>

                  <p className="nc-hero-text">{slide.text}</p>

                  <div className="nc-hero-buttons">
                    <Link href="/about" className="nc-btn">
                      About Nunchi
                      <ArrowRightIcon size={15} />
                    </Link>
                    <Link href="/contact" className="nc-btn nc-btn--outline">
                      Contact Nunchi
                      <ArrowRightIcon size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="nc-hero-arrows">
        <button
          type="button"
          className="nc-hero-arrow"
          aria-label="Previous slide"
          onClick={() => goTo(active - 1)}
        >
          <ArrowLeftIcon size={18} />
        </button>
        <button
          type="button"
          className="nc-hero-arrow"
          aria-label="Next slide"
          onClick={() => goTo(active + 1)}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <div className="nc-hero-dots" role="tablist" aria-label="Hero slides">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Slide ${index + 1}: ${slide.subtitle}`}
            className={cn("nc-hero-dot", active === index && "is-active")}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      <Image
        src="/images/ref/leaves_9.png"
        alt=""
        width={164}
        height={212}
        className="nc-hero-leaves"
        aria-hidden="true"
      />
    </section>
  );
}
