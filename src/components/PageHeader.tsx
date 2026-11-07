import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  italicWords?: number[];
  description: string;
};

export default function PageHeader({
  eyebrow,
  title,
  italicWords = [],
  description,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-cream blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <h1
          className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.4rem)] leading-[1.04] tracking-[-0.01em] text-ink"
        >
          {title.split(" ").map((word, i) => (
            <Reveal
              key={`${word}-${i}`}
              className="inline-block"
              y={26}
              delay={i * 0.06}
            >
              <span
                className={
                  italicWords.includes(i)
                    ? "italic text-champagne"
                    : undefined
                }
              >
                {word}
                {i < title.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            </Reveal>
          ))}
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-taupe md:text-base">
            {description}
          </p>
        </Reveal>
      </Container>
    </header>
  );
}
