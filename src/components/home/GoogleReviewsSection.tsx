"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";
import GoogleLogo from "@/components/reviews/GoogleLogo";
import Stars from "@/components/reviews/Stars";
import { SITE } from "@/lib/site";
import type { GoogleReview, GoogleReviewsData } from "@/lib/google-reviews";

type FetchState =
  | { status: "loading" }
  | { status: "ready"; data: GoogleReviewsData }
  | { status: "error" };

function fallbackReviewsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${SITE.name} ${SITE.address}`
  )}`;
}

async function fetchReviews(signal?: AbortSignal): Promise<GoogleReviewsData> {
  const response = await fetch("/api/google-reviews", {
    signal,
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Unable to load reviews");

  return (await response.json()) as GoogleReviewsData;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ReviewSkeleton() {
  return (
    <article
      className="nc-review-card nc-review-card--skeleton"
      aria-hidden="true"
    >
      <div className="nc-skeleton-head">
        <span className="nc-skeleton nc-skeleton-avatar" />
        <span className="nc-skeleton-lines">
          <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--short" />
          <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--tiny" />
        </span>
      </div>
      <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--stars" />
      <span className="nc-skeleton nc-skeleton-line" />
      <span className="nc-skeleton nc-skeleton-line" />
      <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--medium" />
    </article>
  );
}

function ReviewCard({
  review,
  reviewsUrl,
}: {
  review: GoogleReview;
  reviewsUrl: string;
}) {
  const dateTime = review.time
    ? new Date(review.time * 1000).toISOString()
    : undefined;

  return (
    <article className="nc-review-card">
      <header className="nc-review-card-head">
        <span className="nc-review-avatar">
          <span className="nc-review-avatar-fallback" aria-hidden="true">
            {initials(review.authorName)}
          </span>
          {review.profilePhotoUrl ? (
            // Google avatar URLs are short-lived and small; a native image keeps
            // them independent of the Next.js image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profilePhotoUrl}
              alt=""
              width={52}
              height={52}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : null}
        </span>

        <div className="nc-review-identity">
          <p className="nc-review-name">{review.authorName}</p>
          {review.relativeTime ? (
            <time className="nc-review-date" dateTime={dateTime}>
              {review.relativeTime}
            </time>
          ) : null}
        </div>

        <span className="nc-review-google" aria-hidden="true">
          <GoogleLogo size={18} />
        </span>
      </header>

      <Stars rating={review.rating} size={14} className="nc-review-stars" />

      <p className="nc-review-text">
        {review.text || "Rated without a written review."}
      </p>

      <footer className="nc-review-footer">
        <span>Verified Google review</span>
        <a
          href={review.authorUrl || reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Google
          <ArrowRightIcon size={12} />
        </a>
      </footer>
    </article>
  );
}

export default function GoogleReviewsSection() {
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const trackRef = useRef<HTMLDivElement>(null);

  const retryReviews = () => {
    setState({ status: "loading" });
    fetchReviews()
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchReviews(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, []);

  const data = state.status === "ready" ? state.data : null;
  const reviews = data?.reviews ?? [];
  const reviewsUrl = data?.reviewsUrl || fallbackReviewsUrl();
  const hasRating = typeof data?.rating === "number";
  const isLoading = state.status === "loading";
  const isUnconfigured = Boolean(data && !data.configured);
  const isError = state.status === "error" || Boolean(data?.error);

  const scrollReviews = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>(".nc-review-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 24;
    const distance = (card?.offsetWidth ?? 320) + gap;

    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  return (
    <section
      className="nc-reviews nc-sec"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="nc-container">
        <div className="nc-reviews-head">
          <div className="nc-sec-head-copy">
            <span className="nc-eyebrow">Google Reviews</span>
            <h2 id="reviews-title" className="nc-sec-title">
              What Our <em>Clients</em> Say
            </h2>
            <p className="nc-sec-desc">
              Real experiences, genuine beauty, and happy clients.
            </p>
          </div>

          <div className="nc-google-summary" aria-live="polite">
            <span className="nc-google-mark">
              <GoogleLogo size={38} />
            </span>

            {isLoading ? (
              <div className="nc-google-summary-copy">
                <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--score" />
                <span className="nc-skeleton nc-skeleton-line nc-skeleton-line--short" />
              </div>
            ) : hasRating ? (
              <div className="nc-google-summary-copy">
                <div className="nc-google-score-row">
                  <span className="nc-google-score">
                    {data?.rating?.toFixed(1)}
                  </span>
                  <Stars rating={data?.rating ?? 0} size={15} />
                </div>
                <p className="nc-google-count">
                  {data?.total != null
                    ? `Based on ${data.total.toLocaleString("en-US")} Google reviews`
                    : "Rated on Google"}
                </p>
              </div>
            ) : (
              <div className="nc-google-summary-copy">
                <p className="nc-google-summary-title">Google Reviews</p>
                <p className="nc-google-count">Live reviews from Google.</p>
              </div>
            )}

            <a
              className="nc-google-link"
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all reviews on Google
              <ArrowRightIcon size={12} />
            </a>
          </div>
        </div>

        <div
          className="nc-reviews-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Google reviews"
        >
          <p className="nc-sr-only" role="status">
            {isLoading
              ? "Loading Google reviews."
              : reviews.length > 0
                ? `${reviews.length} Google reviews loaded.`
                : isError
                  ? "Google reviews are temporarily unavailable."
                  : isUnconfigured
                    ? "Google reviews will appear once the business profile is connected."
                    : "No Google reviews to show yet."}
          </p>

          <div
            id="google-reviews-track"
            className="nc-reviews-track"
            ref={trackRef}
            tabIndex={reviews.length > 0 ? 0 : -1}
            aria-busy={isLoading}
          >
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <ReviewSkeleton key={index} />
                ))
              : reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    reviewsUrl={reviewsUrl}
                  />
                ))}
          </div>

          {!isLoading && !isError && reviews.length === 0 ? (
            <div className="nc-review-state">
              <span className="nc-review-state-icon">
                <GoogleLogo size={34} />
              </span>
              <div>
                <h3>
                  {isUnconfigured
                    ? "Google reviews are being connected"
                    : "No Google reviews to show yet"}
                </h3>
                <p>
                  {isUnconfigured
                    ? "Live reviews will appear here once our Google Business Profile is linked. You can still find us on Google and share your experience."
                    : "Be the first to share your experience at Nunchi Salon by Naheed."}
                </p>
              </div>
              <a
                className="nc-lux-btn nc-lux-btn--outline"
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isUnconfigured ? "Find us on Google" : "Write a review"}
                <ArrowRightIcon size={13} />
              </a>
            </div>
          ) : null}

          {isError ? (
            <div className="nc-review-state nc-review-state--error">
              <span className="nc-review-state-icon">
                <GoogleLogo size={34} />
              </span>
              <div>
                <h3>We could not load Google reviews right now</h3>
                <p>
                  Please try again in a moment, or read our reviews directly on
                  Google.
                </p>
              </div>
              <div className="nc-review-state-actions">
                <button
                  type="button"
                  className="nc-lux-btn nc-lux-btn--outline"
                  onClick={retryReviews}
                >
                  Try again
                </button>
                <a
                  className="nc-google-link"
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google
                  <ArrowRightIcon size={12} />
                </a>
              </div>
            </div>
          ) : null}

          {!isLoading && !isError && reviews.length > 0 ? (
            <div className="nc-carousel-controls">
              <span className="nc-carousel-note">
                Swipe to explore every review
              </span>
              <div className="nc-carousel-arrows">
                <button
                  type="button"
                  className="nc-carousel-arrow"
                  aria-label="Previous Google reviews"
                  aria-controls="google-reviews-track"
                  onClick={() => scrollReviews(-1)}
                >
                  <ArrowLeftIcon size={16} />
                </button>
                <button
                  type="button"
                  className="nc-carousel-arrow"
                  aria-label="Next Google reviews"
                  aria-controls="google-reviews-track"
                  onClick={() => scrollReviews(1)}
                >
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
