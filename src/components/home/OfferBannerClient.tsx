"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { cn } from "@/lib/cn";

export type BannerOffer = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  price: string;
  oldPrice: string;
  discount: number;
  badge: string;
  expiry: string;
  daysLeft: number;
  bookingHref: string;
  isExternal: boolean;
};

const ROTATE_MS = 6500;

function expiryLabel(daysLeft: number) {
  if (!Number.isFinite(daysLeft)) return null;
  if (daysLeft < 0) return null;
  if (daysLeft === 0) return "Ends today";
  if (daysLeft === 1) return "Ends tomorrow";
  if (daysLeft <= 7) return `Ends in ${daysLeft} days`;
  return null;
}

export default function OfferBannerClient({
  offers,
}: {
  offers: BannerOffer[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused || offers.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % offers.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [offers.length, paused, reduce]);

  return (
    <section
      className="nc-offer-banner"
      aria-label="Latest offers from Nunchi Salon"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="nc-container">
        <div className="nc-ob-shell">
          {offers.map((offer, index) => {
            const countdown = expiryLabel(offer.daysLeft);
            const actionContent = (
              <>
                Book this offer
                <ArrowRightIcon size={14} />
              </>
            );

            return (
              <article
                key={offer.id}
                className={cn("nc-ob-slide", active === index && "is-active")}
                aria-hidden={active !== index}
              >
                {offer.image.startsWith("/") ? (
                  <Image
                    src={offer.image}
                    alt={offer.imageAlt}
                    fill
                    sizes="(min-width: 1300px) 1250px, 100vw"
                    className="nc-ob-image"
                    priority={index === 0}
                  />
                ) : (
                  // Admin-entered remote images use a native image so any CMS
                  // host works without loosening the Next.js image allow-list.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={offer.image}
                    alt={offer.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="nc-ob-image"
                  />
                )}
                <span className="nc-ob-shade" aria-hidden="true" />

                <div className="nc-ob-inner">
                  <div className="nc-ob-content">
                    <p className="nc-ob-kicker">
                      <span className="nc-ob-pulse" aria-hidden="true" />
                      Latest offer
                      <span className="nc-ob-kicker-sep" aria-hidden="true" />
                      {offer.badge}
                    </p>

                    <h2 className="nc-ob-title">{offer.title}</h2>
                    <p className="nc-ob-desc">{offer.description}</p>

                    <div className="nc-ob-price-row">
                      <span className="nc-ob-price">{offer.price}</span>
                      {offer.oldPrice ? (
                        <span className="nc-ob-old">{offer.oldPrice}</span>
                      ) : null}
                      {offer.discount > 0 ? (
                        <span className="nc-ob-discount">
                          Save {offer.discount}%
                        </span>
                      ) : null}
                    </div>

                    <div className="nc-ob-actions">
                      {offer.isExternal ? (
                        <a
                          className="nc-btn nc-ob-btn"
                          href={offer.bookingHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={active === index ? undefined : -1}
                        >
                          {actionContent}
                        </a>
                      ) : (
                        <Link
                          className="nc-btn nc-ob-btn"
                          href={offer.bookingHref}
                          tabIndex={active === index ? undefined : -1}
                        >
                          {actionContent}
                        </Link>
                      )}

                      <Link
                        className="nc-ob-all"
                        href="/offers"
                        tabIndex={active === index ? undefined : -1}
                      >
                        View all offers
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>

                  <div className="nc-ob-aside">
                    <span className="nc-ob-valid">
                      Valid until
                      <strong>{offer.expiry}</strong>
                    </span>
                    {countdown ? (
                      <span className="nc-ob-countdown">{countdown}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}

          {offers.length > 1 ? (
            <div className="nc-ob-dots" role="tablist" aria-label="Latest offers">
              {offers.map((offer, index) => (
                <button
                  key={offer.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-label={`Show offer: ${offer.title}`}
                  className={cn("nc-ob-dot", active === index && "is-active")}
                  onClick={() => setActive(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
