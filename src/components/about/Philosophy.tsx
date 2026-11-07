import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const PRINCIPLES = [
  {
    title: "Listen first",
    text: "Every look begins with understanding who you are, and how you want to feel when you leave.",
  },
  {
    title: "Craft over trend",
    text: "Techniques are refined over years, not seasons. Beauty should outlast a single fashion.",
  },
  {
    title: "Gentle on you",
    text: "Premium products and considered care — kind to your hair, your skin and your time.",
  },
  {
    title: "Calm in every detail",
    text: "From the moment you book to the last mirror moment, everything is unhurried and warm.",
  },
];

export default function Philosophy() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Our Philosophy"
          title="Beauty is a feeling, crafted with care."
          italicWords={[0]}
          align="center"
          description="Four principles guide every appointment at Nunchi — the quiet standards behind every polished result."
        />

        <div className="mt-16 grid gap-px overflow-hidden border border-linen bg-linen sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 0.1}
              className="h-full"
            >
              <div className="group flex h-full flex-col justify-between bg-ivory p-10 transition-colors duration-500 hover:bg-cream md:p-12">
                <span className="font-serif text-5xl font-light italic text-gold/60 md:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-16">
                  <h3 className="font-serif text-2xl text-ink md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-taupe">
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
