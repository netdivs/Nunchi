import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon,
  ClockIcon,
  GridIcon,
  MapPinIcon,
} from "@/components/Icons";
import { SITE } from "@/lib/site";

const HIGHLIGHTS = [
  {
    icon: MapPinIcon,
    title: "Wapda Town, Lahore",
    text: "Our salon is at 13-E2 Wapda Town, Lahore — easy to reach from Township, Valencia Town and Lake City.",
  },
  {
    icon: ClockIcon,
    title: "Open every day",
    text: "Visit us Monday to Sunday, 11:00 AM to 9:00 PM. Walk in for a consultation or book ahead for bridal and party appointments.",
  },
  {
    icon: GridIcon,
    title: "All under one roof",
    text: "Hair, bridal and party makeup, facials, nails, waxing and beauty treatments — a full beauty service in one calm space.",
  },
];

export default function LocalSection() {
  return (
    <section
      className="nc-sec nc-local"
      id="visit"
      aria-labelledby="local-title"
    >
      <div className="nc-container">
        <div className="nc-sec-head">
          <div className="nc-sec-head-copy">
            <span className="nc-eyebrow">Visit us in Lahore</span>
            <h2 id="local-title" className="nc-sec-title">
              Your beauty salon in <em>Wapda Town</em>, Lahore
            </h2>
            <p className="nc-sec-desc">
              Nunchi Salon by Naheed welcomes clients from Wapda Town, Valencia
              Town, Lake City, Township, Green Town, Johar Town and across
              Lahore. Come to us for a haircut, bridal makeup trial, facial,
              manicure or a complete pre-wedding beauty plan.
            </p>
          </div>

          <Link
            href="/beauty-salon-wapda-town-lahore"
            className="nc-lux-btn nc-lux-btn--outline"
          >
            Explore Our Lahore Salon
            <ArrowRightIcon size={13} />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-linen bg-linen sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
                <div className="flex h-full flex-col bg-white p-8 md:p-10">
                  <span className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-7 font-serif text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-taupe">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-linen pt-7 md:flex-row md:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-taupe">
            Serving brides and beauty clients across Lahore, including{" "}
            {SITE.areaServed.slice(0, 6).join(", ")} and nearby areas. Call us
            for directions or to check availability.
          </p>
          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
          >
            Get directions
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
