"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { TESTIMONIALS } from "@/lib/home-content";
import { cn } from "@/lib/cn";

const ROTATE_MS = 7000;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const current = TESTIMONIALS[active];

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  return (
    <section
      className="nc-testimonials"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="nc-container-wide">
        <div className="nc-testi-card">
          <div className="nc-testi-media">
            {TESTIMONIALS.map((item, index) => (
              <Image
                key={item.name}
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 991px) 100vw, 741px"
                className={cn(
                  "nc-testi-image nc-testi-slide-img",
                  active === index && "is-active"
                )}
              />
            ))}

            <Image
              src="/images/ref/quote_4.png"
              alt=""
              width={140}
              height={120}
              className="nc-testi-quote-img"
              aria-hidden="true"
            />
          </div>

          <div className="nc-testi-content" key={active}>
            <Image
              src="/images/ref/quote_3.png"
              alt=""
              width={553}
              height={474}
              className="nc-testi-bgquote"
              aria-hidden="true"
            />

            <span className="nc-subtitle">
              Testimonials
              <Image
                src="/images/ref/title_right.svg"
                alt=""
                width={119}
                height={10}
                aria-hidden="true"
              />
            </span>

            <h2 className="nc-title">Our Customer Feedback</h2>
            <p className="nc-testi-text">{current.text}</p>
            <h3 className="nc-testi-name">{current.name}</h3>
            <span className="nc-testi-role">{current.role}</span>
          </div>

          <div className="nc-testi-tabs">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={cn(
                  "nc-testi-tab",
                  active === index && "is-active"
                )}
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <Image
                  src={item.image}
                  alt=""
                  width={64}
                  height={64}
                  aria-hidden="true"
                />
              </button>
            ))}

            <button
              type="button"
              className="nc-testi-next"
              aria-label="Next testimonial"
              onClick={() =>
                setActive((value) => (value + 1) % TESTIMONIALS.length)
              }
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
