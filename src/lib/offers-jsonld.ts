import type { Offer } from "@/lib/offers";
import { SITE } from "@/lib/site";

export function buildOffersJsonLd(
  offers: Offer[],
  name = "Exclusive Offers & Packages"
) {
  if (offers.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    url: `${SITE.url}/offers`,
    itemListElement: offers.map((offer, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: offer.title,
      description: offer.description,
      url: /^https?:\/\//i.test(offer.bookingHref)
        ? offer.bookingHref
        : `${SITE.url}${offer.bookingHref}`,
      price: offer.discountedPrice,
      priceCurrency: offer.currency,
      availability: "https://schema.org/InStock",
      validThrough: `${offer.expiryDate}T23:59:59+05:00`,
      itemOffered: {
        "@type": "Service",
        name: offer.title,
      },
      image: offer.image.startsWith("/")
        ? `${SITE.url}${offer.image}`
        : offer.image,
    })),
  };
}
