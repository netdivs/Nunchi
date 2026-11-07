import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import OfferGrid from "@/components/offers/OfferGrid";
import { getActiveOffers } from "@/lib/offers";
import { buildOffersJsonLd } from "@/lib/offers-jsonld";

export default async function OffersSection() {
  const offers = await getActiveOffers();
  const offersJsonLd = buildOffersJsonLd(offers);

  return (
    <section
      className="nc-offers nc-sec"
      id="offers"
      aria-labelledby="offers-title"
    >
      {offersJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(offersJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <div className="nc-offers-glow" aria-hidden="true" />

      <div className="nc-container">
        <div className="nc-sec-head">
          <div className="nc-sec-head-copy">
            <span className="nc-eyebrow">Limited-time beauty</span>
            <h2 id="offers-title" className="nc-sec-title">
              Exclusive <em>Offers</em> &amp; Packages
            </h2>
            <p className="nc-sec-desc">
              Discover our special beauty treatments and exclusive salon deals.
            </p>
          </div>

          <Link href="/offers" className="nc-lux-btn nc-lux-btn--outline">
            View All Offers
            <ArrowRightIcon size={13} />
          </Link>
        </div>

        {offers.length > 0 ? (
          <>
            <OfferGrid offers={offers} />
            <p className="nc-offers-note">
              Prices are shown in the currency listed on each package and include
              the stated treatment. Offers are valid while displayed and cannot
              be combined with other promotions.
            </p>
          </>
        ) : (
          <div className="nc-offer-state">
            <span className="nc-offer-state-mark" aria-hidden="true">
              N
            </span>
            <div>
              <h3>New offers are being prepared</h3>
              <p>
                Our next collection of exclusive packages is on its way. Book a
                visit and our team will help you create a treatment plan that is
                just right for you.
              </p>
            </div>
            <Link href="/contact" className="nc-lux-btn nc-lux-btn--outline">
              Book a Visit
              <ArrowRightIcon size={13} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
