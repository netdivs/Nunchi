import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import {
  daysUntilExpiry,
  formatOfferDate,
  formatOfferPrice,
  getDiscountPercent,
  type Offer,
} from "@/lib/offers";

function OfferMedia({ offer }: { offer: Offer }) {
  const isLocal = offer.image.startsWith("/");

  return (
    <div className="nc-offer-media">
      {isLocal ? (
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="nc-offer-image"
        />
      ) : (
        // Admin-entered remote images use a native lazy image so any CMS host
        // can be used without loosening the Next.js image allow-list.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={offer.image}
          alt={offer.imageAlt}
          loading="lazy"
          decoding="async"
          className="nc-offer-image nc-offer-image--remote"
        />
      )}

      <span className="nc-offer-media-fade" aria-hidden="true" />
      <span className="nc-offer-badge">{offer.badge || "Special Offer"}</span>

      {getDiscountPercent(offer) > 0 ? (
        <span className="nc-offer-discount">
          -{getDiscountPercent(offer)}%
        </span>
      ) : null}
    </div>
  );
}

export default function OfferCard({ offer }: { offer: Offer }) {
  const discount = getDiscountPercent(offer);
  const daysLeft = daysUntilExpiry(offer);
  const endingSoon = Number.isFinite(daysLeft) && daysLeft >= 0 && daysLeft <= 7;
  const isExternal = /^https?:\/\//i.test(offer.bookingHref);
  const bookContent = (
    <>
      Book Now
      <ArrowRightIcon size={13} />
    </>
  );

  return (
    <article className="nc-offer-card">
      <OfferMedia offer={offer} />

      <div className="nc-offer-body">
        <div className="nc-offer-kicker">
          <span>Nunchi Exclusive</span>
          {endingSoon ? (
            <span className="nc-offer-ending">Ending soon</span>
          ) : null}
        </div>

        <h3 className="nc-offer-title">{offer.title}</h3>
        <p className="nc-offer-text">{offer.description}</p>

        <div className="nc-offer-prices">
          <span className="nc-offer-price">
            {formatOfferPrice(offer.discountedPrice, offer.currency)}
          </span>
          {discount > 0 ? (
            <span className="nc-offer-old">
              {formatOfferPrice(offer.originalPrice, offer.currency)}
            </span>
          ) : null}
        </div>

        <div className="nc-offer-meta">
          <time dateTime={offer.expiryDate}>
            Valid until {formatOfferDate(offer.expiryDate)}
          </time>
          {isExternal ? (
            <a
              className="nc-offer-book"
              href={offer.bookingHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookContent}
            </a>
          ) : (
            <Link className="nc-offer-book" href={offer.bookingHref}>
              {bookContent}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
