import {
  daysUntilExpiry,
  formatOfferDate,
  formatOfferPrice,
  getActiveOffers,
  getDiscountPercent,
} from "@/lib/offers";
import OfferBannerClient, { type BannerOffer } from "./OfferBannerClient";

/**
 * Pulls the newest active offers from the CMS-backed offers file. Because the
 * home page revalidates every five minutes, a newly added offer appears here
 * automatically without a redeploy.
 */
export default async function OfferBanner() {
  const offers = (await getActiveOffers()).slice(0, 3);
  if (offers.length === 0) return null;

  const bannerOffers: BannerOffer[] = offers.map((offer) => {
    const discount = getDiscountPercent(offer);

    return {
      id: offer.id,
      title: offer.title,
      description: offer.description,
      image: offer.image,
      imageAlt: offer.imageAlt,
      price: formatOfferPrice(offer.discountedPrice, offer.currency),
      oldPrice:
        discount > 0
          ? formatOfferPrice(offer.originalPrice, offer.currency)
          : "",
      discount,
      badge: offer.badge || "Special Offer",
      expiry: formatOfferDate(offer.expiryDate),
      daysLeft: daysUntilExpiry(offer),
      bookingHref: offer.bookingHref,
      isExternal: /^https?:\/\//i.test(offer.bookingHref),
    };
  });

  return <OfferBannerClient offers={bannerOffers} />;
}
