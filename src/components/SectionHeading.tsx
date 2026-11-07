import { cn } from "@/lib/cn";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  italicWords?: number[];
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  italicWords = [],
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const center = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        center && "mx-auto flex flex-col items-center text-center",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.32em]",
              tone === "dark" ? "text-champagne" : "text-gold"
            )}
          >
            {eyebrow}
          </span>
          {center && <span className="h-px w-8 bg-gold/70" aria-hidden="true" />}
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text={title}
        italicWords={italicWords}
        className={cn(
          "mt-5 font-serif text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.08] tracking-[-0.01em]",
          tone === "dark" ? "text-ivory" : "text-ink"
        )}
      />

      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-6 max-w-xl text-[15px] leading-[1.85] md:text-base",
              tone === "dark" ? "text-ivory/70" : "text-taupe",
              center && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
