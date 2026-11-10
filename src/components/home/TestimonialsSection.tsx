"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import Stars from "@/components/reviews/Stars";
import { TESTIMONIALS } from "@/lib/home-content";
import { cn } from "@/lib/cn";

const ROTATE_MS = 7000;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
          <div className="nc-testi-content" key={active}>
            <span className="nc-subtitle">
              Testimonials
              <span className="nc-subtitle-flourish" aria-hidden="true" />
            </span>

            <h2 className="nc-title">Our Customer Feedback</h2>
            <p className="nc-testi-text">{current.text}</p>

            <div className="nc-testi-meta">
              <span className="nc-testi-avatar" aria-hidden="true">
                {initials(current.name)}
              </span>
              <div>
                <h3 className="nc-testi-name">{current.name}</h3>
                <span className="nc-testi-role">{current.role}</span>
              </div>
              <Stars rating={5} />
            </div>
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
                aria-label={`Show review from ${item.name}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span className="nc-testi-tab-initials" aria-hidden="true">
                  {initials(item.name)}
                </span>
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
