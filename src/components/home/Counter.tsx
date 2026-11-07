"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function Counter({
  end,
  label,
  icon,
}: {
  end: number;
  label: string;
  icon: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (reduce) {
          setValue(end);
          return;
        }

        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, reduce]);

  return (
    <div className="nc-counter-inner" ref={ref}>
      <span className="nc-counter-icon" aria-hidden="true">
        <Image src={icon} alt="" width={50} height={50} />
      </span>
      <div>
        <p className="nc-counter-num" aria-label={`${end}`}>
          {value}
        </p>
        <p className="nc-counter-label">{label}</p>
      </div>
    </div>
  );
}
