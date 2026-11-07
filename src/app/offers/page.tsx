import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import OfferGrid from "@/components/offers/OfferGrid";
import BookingCTA from "@/components/home/BookingCTA";
import { getActiveOffers } from "@/lib/offers";
import { buildOffersJsonLd } from "@/lib/offers-jsonld";

// Refresh periodically so expired offers stop appearing without a redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Salon Offers in Lahore",
  description:
    "Explore limited-time beauty offers and packages at Nunchi Salon by Naheed in Wapda Town, Lahore — treatments for hair, makeup, skin and nails.",
  alternates: {
    canonical: "/offers",
  },
};

export default async function OffersPage() {
  const offers = await getActiveOffers();
  const offersJsonLd = buildOffersJsonLd(offers);

  return (
    <>
      {offersJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(offersJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <PageHeader
        eyebrow="Offers"
        title="Exclusive offers, thoughtfully timed."
        italicWords={[2]}
        description="A curated collection of limited-time packages and seasonal rituals at our Wapda Town, Lahore salon — created to make your next visit even more beautiful."
      />

      <section className="pb-28 md:pb-36" aria-labelledby="offers-list-title">
        <Container>
          <h2 id="offers-list-title" className="nc-sr-only">
            Active offers and packages
          </h2>
          <Reveal>
            {offers.length > 0 ? (
              <>
                <OfferGrid offers={offers} />
                <p className="nc-offers-note">
                  Prices are shown in the currency listed on each package and
                  include the stated treatment. Offers are valid while displayed
                  and cannot be combined with other promotions.
                </p>
              </>
            ) : (
              <div className="nc-offer-state">
                <span className="nc-offer-state-mark" aria-hidden="true">
                  N
                </span>
                <div>
                  <h2>New offers are being prepared</h2>
                  <p>
                    Our next collection of exclusive packages is on its way.
                    Book a visit and our team will help you create a treatment
                    plan that is just right for you.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="nc-lux-btn nc-lux-btn--outline"
                >
                  Book a Visit
                </Link>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}
