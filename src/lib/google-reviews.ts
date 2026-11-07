import { SITE } from "@/lib/site";
import { GOOGLE_REVIEWS_FALLBACK } from "@/lib/google-reviews-fallback";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUrl?: string;
  profilePhotoUrl?: string;
  rating: number;
  relativeTime: string;
  text: string;
  time: number;
};

export type GoogleReviewsData = {
  configured: boolean;
  placeName?: string;
  rating?: number;
  total?: number;
  reviews: GoogleReview[];
  reviewsUrl: string;
  error?: string;
};

const CACHE_TTL_MS = 60 * 60 * 1000;
const ERROR_CACHE_TTL_MS = 60 * 1000;

let cache: { data: GoogleReviewsData; expiresAt: number } | null = null;
let inFlight: Promise<GoogleReviewsData> | null = null;

function getReviewsUrl(placeId?: string) {
  const override = process.env.GOOGLE_REVIEWS_URL?.trim();
  if (override) return override;

  if (placeId) {
    const resourceId = placeId.replace(/^places\//, "");
    return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(
      resourceId
    )}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${SITE.name} ${SITE.address}`
  )}`;
}

function fallbackData(): GoogleReviewsData {
  return {
    configured: false,
    placeName: GOOGLE_REVIEWS_FALLBACK.placeName,
    rating: GOOGLE_REVIEWS_FALLBACK.rating,
    reviews: GOOGLE_REVIEWS_FALLBACK.reviews,
    reviewsUrl: getReviewsUrl(process.env.GOOGLE_PLACE_ID?.trim()),
  };
}

type GoogleApiReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
    languageCode?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
};

type GoogleApiResponse = {
  displayName?: {
    text?: string;
    languageCode?: string;
  };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleApiReview[];
};

function publishTimeToSeconds(value?: string) {
  if (!value) return 0;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) ? Math.floor(milliseconds / 1000) : 0;
}

async function loadGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    return fallbackData();
  }

  const resourceId = placeId.replace(/^places\//, "");

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(
        resourceId
      )}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(9000),
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,reviews",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `[google-reviews] Places API (New) returned HTTP ${response.status}.`
      );
      return fallbackData();
    }

    const payload = (await response.json()) as GoogleApiResponse;

    const reviews: GoogleReview[] = (payload.reviews ?? [])
      .filter((review) => typeof review.rating === "number")
      .map((review, index) => {
        const time = publishTimeToSeconds(review.publishTime);

        return {
          id: review.name ?? `${time || "review"}-${index}`,
          authorName:
            review.authorAttribution?.displayName?.trim() || "Google reviewer",
          authorUrl: review.authorAttribution?.uri,
          profilePhotoUrl: review.authorAttribution?.photoUri,
          rating: Math.max(0, Math.min(5, review.rating ?? 0)),
          relativeTime:
            review.relativePublishTimeDescription?.trim() || "",
          text: review.text?.text?.trim() || "",
          time,
        };
      })
      .sort((a, b) => b.time - a.time)
      .slice(0, 6);

    return {
      configured: true,
      placeName: payload.displayName?.text?.trim(),
      rating:
        typeof payload.rating === "number" ? payload.rating : undefined,
      total:
        typeof payload.userRatingCount === "number"
          ? payload.userRatingCount
          : undefined,
      reviews,
      reviewsUrl: getReviewsUrl(placeId),
    };
  } catch (error) {
    console.error(
      "[google-reviews] Unable to reach the Google Places API.",
      error instanceof Error ? error.message : error
    );
    return fallbackData();
  }
}

/**
 * Fetches the latest Google reviews through the official Places API (New).
 * The result is cached in memory for an hour to avoid unnecessary requests.
 * No review or rating is ever fabricated when credentials are missing.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return cache.data;
  }

  if (inFlight) return inFlight;

  inFlight = loadGoogleReviews()
    .then((data) => {
      cache = {
        data,
        expiresAt:
          Date.now() +
          (data.error ? ERROR_CACHE_TTL_MS : CACHE_TTL_MS),
      };
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
