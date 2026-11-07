"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";

const NOTES = [
  {
    title: "Personal consultation",
    text: "Every service begins with a conversation, so the result is never a guess.",
  },
  {
    title: "Premium products",
    text: "We work with products chosen for results — and for how they treat your hair and skin.",
  },
  {
    title: "Unhurried appointments",
    text: "Time is reserved so you never feel rushed from the chair to the door.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-1/3 h-[480px] w-[480px] rounded-full bg-cream blur-[110px]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The Experience"
            title="Quiet luxury, from the moment you arrive."
            italicWords={[0]}
            description="Step inside and the city falls away. Warm light, considered spaces and a team devoted to one thing — you, at your most beautiful."
          />

          <ul className="mt-12 space-y-9">
            {NOTES.map((note, i) => (
              <Reveal key={note.title} delay={i * 0.12}>
                <li className="flex gap-6 border-l border-linen pl-6">
                  <span className="font-serif text-sm italic text-gold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{note.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-taupe">
                      {note.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
            >
              Meet the salon
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <motion.div
              style={reduce ? undefined : { y }}
              className="relative will-change-transform"
            >
              <ImageReveal
                src="/images/salon-1.jpg"
                alt="The calm, elegant interior of Nunchi Salon by Naheed"
                className="aspect-[5/4] w-full"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </motion.div>

            <Reveal delay={0.25} className="relative z-10">
              <figure className="absolute -bottom-12 -left-4 max-w-[280px] border border-linen bg-ivory p-8 shadow-[0_36px_80px_-40px_rgba(33,27,19,0.4)] sm:-left-10 md:-bottom-16">
                <svg
                  className="h-6 w-6 text-gold/60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 7H6.5C4 7 2 9 2 11.5v5A2.5 2.5 0 0 0 4.5 19H8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5c0-2 1.5-3.5 3-3.5V7zm12 0h-3.5c-2.5 0-4.5 2-4.5 4.5v5A2.5 2.5 0 0 0 16.5 19H20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5c0-2 1.5-3.5 3-3.5V7z" />
                </svg>
                <blockquote className="mt-4 font-serif text-lg leading-snug text-ink">
                  “It should feel like a ritual, never an errand.”
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
