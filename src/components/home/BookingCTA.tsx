import Container from "@/components/Container";
import Button from "@/components/Button";
import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export default function BookingCTA() {
  return (
    <section className="grain relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full border border-champagne/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 -right-24 h-[520px] w-[520px] rounded-full border border-champagne/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
      />

      <Container className="relative py-32 text-center md:py-44">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-champagne/70" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-champagne">
              Reserve Your Visit
            </span>
            <span className="h-px w-8 bg-champagne/70" aria-hidden="true" />
          </div>
        </Reveal>

        <AnimatedText
          as="h2"
          text="Your moment of beauty awaits."
          italicWords={[1, 3]}
          className="mx-auto mt-8 max-w-3xl font-serif text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.05] tracking-[-0.01em] text-ivory"
        />

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-ivory/60">
            A seat is reserved for you. Let us take care of everything else.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="light">
              Book an Appointment
            </Button>
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-ivory/80 transition-colors duration-300 hover:text-champagne"
            >
              or call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
