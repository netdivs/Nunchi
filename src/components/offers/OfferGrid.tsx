import OfferCard from "@/components/offers/OfferCard";
import { cn } from "@/lib/cn";
import type { Offer } from "@/lib/offers";

type OfferGridProps = {
  offers: Offer[];
  className?: string;
};

export default function OfferGrid({ offers, className }: OfferGridProps) {
  return (
    <div className={cn("nc-offer-grid", className)}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
