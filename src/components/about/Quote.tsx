import Container from "@/components/Container";
import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";

export default function Quote() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full border border-champagne/10"
      />
      <Container className="relative text-center">
        <Reveal>
          <svg
            className="mx-auto h-8 w-8 text-champagne/70"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 7H6.5C4 7 2 9 2 11.5v5A2.5 2.5 0 0 0 4.5 19H8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5c0-2 1.5-3.5 3-3.5V7zm12 0h-3.5c-2.5 0-4.5 2-4.5 4.5v5A2.5 2.5 0 0 0 16.5 19H20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5c0-2 1.5-3.5 3-3.5V7z" />
          </svg>
        </Reveal>

        <AnimatedText
          as="p"
          text="Somewhere between the first consultation and the final mirror, something shifts. You walk in carrying the day; you leave carrying yourself."
          italicWords={[18, 19]}
          className="mx-auto mt-10 max-w-4xl font-serif text-[clamp(1.8rem,4.2vw,3.3rem)] leading-[1.22] tracking-[-0.01em] text-ivory"
        />
      </Container>
    </section>
  );
}
