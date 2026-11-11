import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import BookingCTA from "@/components/home/BookingCTA";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/Icons";
import { SITE } from "@/lib/site";

const PAGE_PATH = "/beauty-salon-wapda-town-lahore";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

const PAGE_TITLE = "Beauty Salon in Wapda Town";
const PAGE_DESCRIPTION =
  "Looking for a beauty salon in Wapda Town, Lahore? Nunchi Salon by Naheed offers hair, bridal makeup, facials, nails and party styling at 13-E2 Wapda Town. Open daily 11am–9pm.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: `${PAGE_TITLE} — ${SITE.name}`,
    description: PAGE_DESCRIPTION,
  },
};

const SERVICE_LINKS = [
  "Haircut, colour & balayage",
  "Bridal hair & makeup",
  "Party & event makeup",
  "Facials & skin care",
  "Manicure, pedicure & nails",
  "Waxing, threading & lashes",
];

const AREAS = [
  {
    name: "Wapda Town",
    text: "Our home neighbourhood — step out and you are minutes from the salon.",
  },
  {
    name: "Valencia Town",
    text: "A short drive for haircuts, facials, nails and bridal trials.",
  },
  {
    name: "Lake City",
    text: "Close by for party makeup, skin care and pre-wedding appointments.",
  },
  {
    name: "Township",
    text: "Easy access for everyday grooming, waxing and hair services.",
  },
  {
    name: "Green Town",
    text: "A convenient stop for threading, lash lifts and a fresh blow-dry.",
  },
  {
    name: "Johar Town",
    text: "Worth the drive for bridal artistry and a calm, unhurried experience.",
  },
];

const LOCAL_FAQS = [
  {
    question: "Where is Nunchi Salon by Naheed located?",
    answer:
      "We are at 13-E2 Wapda Town, Lahore, Pakistan — close to Township, Valencia Town and Lake City. Use the directions link on this page for turn-by-turn navigation, or call us if you need help finding the salon.",
  },
  {
    question: "Do you offer bridal makeup in Lahore?",
    answer:
      "Yes. Our bridal services include a complimentary consultation, a trial session and complete hair and makeup for mehndi, barat, walima and reception looks. We also offer family and dholki makeup.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Sunday, 11:00 AM to 9:00 PM. Bridal appointments are best booked in advance so we can reserve enough time for you and your family.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Walk-ins are welcome for many services, but we recommend booking ahead for haircuts, colour, facials, party makeup and especially bridal appointments. Call or WhatsApp us at +92 321 0044497 to check availability.",
  },
  {
    question: "Which areas near Wapda Town do you serve?",
    answer:
      "Clients visit us from Wapda Town, Valencia Town, Lake City, Township, Green Town, Johar Town, Model Town, DHA and other parts of Lahore. If you are travelling from further away, call us and we will help you plan your visit.",
  },
  {
    question: "Do you offer a bridal trial?",
    answer:
      "Yes. A bridal trial session is available so we can refine your hair and makeup before the wedding. The trial is priced separately from the bridal package — contact us for current details and availability.",
  },
  {
    question: "What beauty services can I book?",
    answer:
      "You can book haircuts, colour and balayage, keratin and hair treatments, blow-dry and styling, bridal and party makeup, facials and skin care, waxing, threading, lash lifts, manicures, pedicures, nail art and body treatments.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LOCAL_FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Beauty Salon in Wapda Town, Lahore",
      item: PAGE_URL,
    },
  ],
};

export default function BeautySalonWapdaTownPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        eyebrow="Wapda Town, Lahore"
        title="Your beauty salon in Wapda Town, Lahore."
        italicWords={[4, 5]}
        description="Nunchi Salon by Naheed is a full-service beauty salon at 13-E2 Wapda Town, Lahore. From haircuts and colour to bridal makeup, facials and nails, everything is under one roof — open daily, 11:00 AM to 9:00 PM."
      />

      <section className="pb-24 md:pb-32" aria-labelledby="local-intro-title">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="local-intro-title"
                className="font-serif text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.12] tracking-[-0.01em] text-ink"
              >
                A full-service beauty salon in{" "}
                <span className="italic text-champagne">Lahore</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-6 text-[15px] leading-[1.95] text-cocoa">
                <p>
                  If you are looking for a beauty salon in Wapda Town, Lahore,
                  Nunchi Salon by Naheed is a name built on quiet, considered
                  care. Our studio at 13-E2 Wapda Town brings hair, makeup, skin,
                  nails and bridal styling together in one calm space — so you
                  can prepare for a wedding, a party or a simple reset without
                  running across the city.
                </p>
                <p>
                  Naheed and her team are known for bridal makeup in Lahore that
                  feels polished rather than heavy, haircuts and colour that suit
                  your features, and facials that leave skin calm and luminous.
                  Every appointment begins with a conversation: what you want,
                  what you do not, and how much time you have. We listen first,
                  recommend only what we believe in, and finish with a look that
                  still feels like you.
                </p>
                <p>
                  Brides can book a complimentary consultation and a trial
                  session before the wedding, then return for mehndi, barat,
                  walima or reception styling. For everyday beauty, our Wapda
                  Town salon is a convenient stop for haircuts, blow-dries,
                  facials, waxing, threading, manicures and pedicures.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 border-t border-linen pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">
                  Services at our Lahore salon
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SERVICE_LINKS.map((service) => (
                    <li key={service}>
                      <Link
                        href="/services"
                        className="group flex items-center justify-between gap-4 border-b border-linen pb-3 text-sm text-ink transition-colors duration-300 hover:text-gold"
                      >
                        {service}
                        <ArrowRightIcon
                          size={14}
                          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <aside className="border border-linen bg-cream p-8 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">
                Visit Nunchi
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ink">
                Find us in Wapda Town
              </h2>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-cocoa">
                <div className="flex items-start gap-4">
                  <MapPinIcon className="mt-0.5 shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-taupe">
                      Address
                    </p>
                    <p className="mt-1.5">{SITE.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ClockIcon className="mt-0.5 shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-taupe">
                      Opening hours
                    </p>
                    <p className="mt-1.5">
                      Monday to Sunday
                      <br />
                      11:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <PhoneIcon className="mt-0.5 shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-taupe">
                      Book by phone
                    </p>
                    <a
                      href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                      className="mt-1.5 block text-ink transition-colors duration-300 hover:text-gold"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors duration-300 hover:bg-gold"
                >
                  Get directions
                  <ArrowRightIcon size={14} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 border border-ink/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Book an appointment
                </Link>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-24 md:py-32" aria-labelledby="areas-title">
        <Container>
          <SectionHeading
            eyebrow="Areas we serve"
            title="Close to home, across Lahore."
            italicWords={[4]}
            description="Our Wapda Town studio is easy to reach from nearby neighbourhoods. Clients also travel to us from further across Lahore for bridal makeup and special-occasion styling."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-linen bg-linen sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area, index) => (
              <Reveal key={area.name} delay={index * 0.05} className="h-full">
                <div className="h-full bg-ivory p-8">
                  <h3 className="font-serif text-2xl text-ink">{area.name}</h3>
                  <p className="mt-3 text-sm leading-[1.8] text-taupe">
                    {area.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-[1.9] text-taupe">
            We also welcome clients from Model Town, DHA Lahore, Garden Town,
            Faisal Town and other parts of the city. If you are planning a bridal
            appointment, call ahead so we can reserve the right amount of time
            for your look.
          </p>
        </Container>
      </section>

      <section
        className="py-24 md:py-32"
        aria-labelledby="local-faq-title"
      >
        <Container>
          <SectionHeading
            eyebrow="Good to know"
            title="Questions about visiting us in Lahore."
            italicWords={[5]}
            align="center"
            description="Everything you need to know before you book your visit to our Wapda Town salon."
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={LOCAL_FAQS} />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-taupe">
            Still have a question? Call us at{" "}
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="text-ink underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-gold"
            >
              {SITE.phone}
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-ink underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-gold"
            >
              send a booking request
            </Link>
            .
          </p>
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}
