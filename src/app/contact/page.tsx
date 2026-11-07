import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Our Wapda Town Salon",
  description:
    "Book an appointment at Nunchi Salon by Naheed in Wapda Town, Lahore. Call or WhatsApp +92 321 0044497, email us or use the booking form for hair, makeup and bridal services.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & Directions"
        title="We would love to meet you."
        italicWords={[4]}
        description="Our salon is at 13-E2 Wapda Town, Lahore — close to Township, Valencia Town and Lake City. Call, WhatsApp or send a booking request, and we will take care of the rest."
      />

      <section className="pb-28 md:pb-36">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <ContactInfo />

            <div className="mt-12 border-t border-linen pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">
                Follow us
              </p>
              <div className="mt-4 flex items-center gap-6">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="border border-linen bg-white/40 p-8 md:p-12">
              <p className="font-serif text-3xl text-ink">Book your visit</p>
              <p className="mt-2 mb-10 text-sm text-taupe">
                Tell us what you have in mind and your preferred date — we will
                confirm everything on WhatsApp.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </Container>

        <Container className="mt-20">
          <Reveal>
            <div className="grid gap-8 border-t border-linen pt-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                  Directions
                </p>
                <h2 className="mt-4 max-w-md font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-0.01em] text-ink">
                  Visiting our salon in{" "}
                  <span className="italic text-champagne">Wapda Town</span>,
                  Lahore.
                </h2>
              </div>
              <div className="space-y-5 text-[15px] leading-[1.95] text-cocoa lg:col-span-7">
                <p>
                  Our salon is at 13-E2 Wapda Town, Lahore — close to Township,
                  Valencia Town and Lake City. Whether you are coming for a
                  haircut, bridal trial, facial or party makeup, the map below
                  will bring you straight to our door.
                </p>
                <p>
                  We welcome clients from Wapda Town, Valencia Town, Lake City,
                  Township, Green Town, Johar Town, Model Town, DHA and across
                  Lahore. If you are planning a bridal appointment or bringing
                  family members, call ahead so we can reserve enough time for
                  everyone.
                </p>
                <Link
                  href="/beauty-salon-wapda-town-lahore"
                  className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:text-gold"
                >
                  More about our Lahore salon &rarr;
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="mt-12">
          <Reveal>
            <div className="relative overflow-hidden border border-linen bg-cream">
              <iframe
                title="Map showing the location of the salon"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  SITE.address
                )}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 md:h-[400px]"
              />
              <div className="flex flex-col items-start justify-between gap-5 border-t border-linen bg-ivory px-6 py-6 md:flex-row md:items-center md:px-8">
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-0.5 h-6 w-6 shrink-0 text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">
                      Find us
                    </p>
                    <p className="mt-1.5 font-serif text-xl text-ink">
                      {SITE.address}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    SITE.address
                  )}`}
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
