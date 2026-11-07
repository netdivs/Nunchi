import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ServiceCategoryBlock from "@/components/services/ServiceCategoryBlock";
import BookingCTA from "@/components/home/BookingCTA";
import { ArrowRightIcon } from "@/components/Icons";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Beauty Services in Lahore",
  description:
    "Hair, bridal and party makeup, facials, nails and beauty treatments at Nunchi Salon by Naheed in Wapda Town, Lahore. Explore services and book your visit.",
  alternates: {
    canonical: "/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Beauty services in Wapda Town, Lahore",
  itemListElement: SERVICES.map((category, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: `${category.title} services in Lahore`,
      serviceType: category.title,
      description: category.description,
      url: `${SITE.url}/services#${category.id}`,
      provider: {
        "@type": "BeautySalon",
        "@id": `${SITE.url}/#salon`,
        name: SITE.name,
        telephone: SITE.phone,
      },
      areaServed: {
        "@type": "City",
        name: "Lahore",
      },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        eyebrow="Salon Services"
        title="Considered care, for every detail."
        italicWords={[3]}
        description="From our salon in Wapda Town, Lahore, we offer hair, makeup, skin, nails, bridal styling and beauty treatments — six disciplines, one uncompromising standard."
      />

      <Container>
        <nav className="nc-service-jump" aria-label="Services menu">
          <span className="nc-service-jump-label">Browse services</span>
          <ul>
            {SERVICES.map((category) => (
              <li key={category.id}>
                <Link href={`#${category.id}`}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="divide-y divide-linen">
          {SERVICES.map((category, i) => (
            <ServiceCategoryBlock
              key={category.id}
              category={category}
              index={i}
            />
          ))}
        </div>

        <Reveal>
          <div className="grid gap-8 border-t border-linen py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Our Lahore salon
              </p>
              <h2 className="mt-4 max-w-md font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-0.01em] text-ink">
                Hair, makeup and skin care in{" "}
                <span className="italic text-champagne">Wapda Town</span>,
                Lahore.
              </h2>
            </div>
            <div className="space-y-5 text-[15px] leading-[1.95] text-cocoa lg:col-span-7">
              <p>
                Nunchi Salon by Naheed is a full-service beauty salon at 13-E2
                Wapda Town, Lahore. Whether you are looking for a haircut and
                colour, bridal or party makeup, a facial, a manicure or a
                pre-wedding beauty plan, our team will tailor every service to
                your features, your hair and the occasion.
              </p>
              <p>
                We welcome clients from Wapda Town, Valencia Town, Lake City,
                Township, Green Town, Johar Town, Model Town, DHA and across
                Lahore. Call or WhatsApp us to check availability, or read more
                about visiting our Wapda Town salon.
              </p>
              <Link
                href="/beauty-salon-wapda-town-lahore"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
              >
                Beauty salon in Wapda Town, Lahore
                <ArrowRightIcon
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>

      <div className="mt-4">
        <BookingCTA />
      </div>
    </>
  );
}
