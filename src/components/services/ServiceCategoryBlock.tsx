import Link from "next/link";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import type { ServiceCategory } from "@/lib/services";
import { cn } from "@/lib/cn";

type ServiceCategoryBlockProps = {
  category: ServiceCategory;
  index: number;
};

export default function ServiceCategoryBlock({
  category,
  index,
}: ServiceCategoryBlockProps) {
  const reverse = index % 2 === 1;

  return (
    <section id={category.id} className="scroll-mt-28 py-24 md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div
          className={cn(
            "lg:col-span-5",
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <Reveal>
            <ImageReveal
              src={category.image}
              alt={category.alt}
              className="aspect-[4/5] w-full max-w-md lg:max-w-none"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </Reveal>
        </div>

        <div
          className={cn(
            "lg:col-span-7",
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl italic text-gold/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                {category.tagline}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.01em] text-ink">
              {category.title}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-taupe">
              {category.description}
            </p>
          </Reveal>

          <ul className="mt-10">
            {category.services.map((service, i) => (
              <Reveal key={service.name} delay={0.1 + i * 0.06}>
                <li className="group flex items-baseline justify-between gap-6 border-b border-linen py-4">
                  <span className="font-serif text-lg text-ink transition-all duration-500 group-hover:italic group-hover:text-champagne md:text-xl">
                    {service.name}
                  </span>
                  <span className="flex-1 border-b border-dotted border-sand/60" aria-hidden="true" />
                  <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {service.price}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
            >
              Book this service
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
