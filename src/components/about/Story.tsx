import Link from "next/link";
import Container from "@/components/Container";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";

export default function Story() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="relative lg:col-span-5">
          <div
            aria-hidden="true"
            className="absolute -left-6 -top-6 hidden h-36 w-36 rounded-full border border-gold/30 lg:block"
          />
          <ImageReveal
            src="/images/founder.jpg"
            alt="Naheed, founder of Nunchi Salon, in her studio"
            className="aspect-[3/4] w-full rounded-t-[999px]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 hidden h-28 w-28 rounded-full bg-sand/40 blur-2xl lg:block"
          />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Our Story
              </span>
            </div>
          </Reveal>

          <h2 className="mt-6 font-serif text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.12] tracking-[-0.01em] text-ink">
            A salon built on a <span className="italic text-champagne">simple idea</span>.
          </h2>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-[15px] leading-[1.95] text-cocoa">
              <p>
                Nunchi Salon by Naheed began with a single belief — that every
                woman deserves to feel extraordinary, without ever having to
                explain why she came in. What began as a devotion to craft has
                grown into a beauty salon in Wapda Town, Lahore, where hair,
                makeup and skin are treated as a ritual, not a transaction.
              </p>
              <p>
                Here, the mirror is not the finish line. It is a small moment of
                discovery — a pause in a day that rarely pauses for you. Our team
                listens before they recommend, refine before they finish, and
                leave you with a look that is unmistakably, effortlessly yours.
                Brides and clients travel to us from Valencia Town, Lake City,
                Township, Johar Town and across Lahore for that quiet,
                considered experience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-12 bg-gold/60" aria-hidden="true" />
              <div>
                <p className="font-serif text-2xl italic text-ink">
                  Naheed
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-taupe">
                  Founder &amp; Creative Director
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <Link
              href="/beauty-salon-wapda-town-lahore"
              className="group mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
            >
              Visit our Wapda Town salon
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
