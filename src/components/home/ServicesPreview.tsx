import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "./ServiceCard";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/services";

export default function ServicesPreview() {
  const [hair, makeup, skin, nails, bridal] = SERVICES;

  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What We Do"
            title="An art of care, across every detail."
            italicWords={[1]}
            description="Six disciplines, one standard — considered, unhurried and beautifully finished."
          />
          <Reveal delay={0.15} className="shrink-0">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
            >
              View all services
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          <Reveal className="lg:col-span-7">
            <ServiceCard
              category={hair}
              aspect="aspect-[4/3] lg:aspect-[16/11]"
              showDescription
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <ServiceCard
              category={makeup}
              aspect="aspect-[4/3] lg:aspect-[16/11]"
            />
          </Reveal>

          <Reveal className="lg:col-span-4">
            <ServiceCard category={skin} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <ServiceCard category={nails} />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-4">
            <ServiceCard category={bridal} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
