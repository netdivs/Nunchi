"use client";

import Container from "@/components/Container";
import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";

export default function Intro() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-linen to-transparent"
      />

      <Container className="relative text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              The Salon
            </span>
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
          </div>
        </Reveal>

        <AnimatedText
          as="p"
          text="Beauty is not a look. It is the feeling you carry long after you leave."
          italicWords={[8, 14]}
          className="mx-auto mt-10 max-w-4xl font-serif text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.2] tracking-[-0.01em] text-ink"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-[15px] leading-[1.9] text-taupe">
            At Nunchi, every visit begins with listening — then unfolds into
            something quietly transformative. We believe true beauty is calm,
            considered and unmistakably you.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
