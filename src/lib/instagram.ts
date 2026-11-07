import {
  INSTAGRAM_FALLBACK_POSTS,
  INSTAGRAM_FALLBACK_PROFILE_URL,
  INSTAGRAM_FALLBACK_USERNAME,
} from "@/lib/instagram-fallback";

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

export type InstagramData = {
  configured: boolean;
  username: string;
  profileUrl: string;
  posts: InstagramPost[];
  error?: string;
};

const CACHE_TTL_MS = 30 * 60 * 1000;
const ERROR_CACHE_TTL_MS = 60 * 1000;
const API_VERSION = process.env.INSTAGRAM_API_VERSION?.trim() || "v23.0";

let cache: { data: InstagramData; expiresAt: number } | null = null;
let inFlight: Promise<InstagramData> | null = null;

function fallbackUsername() {
  return (
    process.env.INSTAGRAM_USERNAME?.trim()
      .replace(/^@+/, "")
      .replace(/\s+/g, "") || "nunchisalon"
  );
}

function fallbackData(): InstagramData {
  return {
    configured: false,
    username: INSTAGRAM_FALLBACK_USERNAME,
    profileUrl: INSTAGRAM_FALLBACK_PROFILE_URL,
    posts: INSTAGRAM_FALLBACK_POSTS,
  };
}

type InstagramMedia = {
  id?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  children?: {
    data?: Array<{
      media_type?: string;
      media_url?: string;
      thumbnail_url?: string;
    }>;
  };
};

type InstagramMediaResponse = {
  data?: InstagramMedia[];
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
};

type InstagramAccountResponse = {
  username?: string;
  profile_picture_url?: string;
  error?: {
    message?: string;
  };
};

function pickImage(media: InstagramMedia) {
  if (media.media_type === "VIDEO") {
    return media.thumbnail_url || "";
  }

  if (media.media_type === "CAROUSEL_ALBUM") {
    const firstChild = media.children?.data?.[0];

    if (firstChild?.media_type === "VIDEO") {
      return firstChild.thumbnail_url || "";
    }

    return (
      firstChild?.media_url ||
      firstChild?.thumbnail_url ||
      media.thumbnail_url ||
      media.media_url ||
      ""
    );
  }

  return media.media_url || media.thumbnail_url || "";
}

async function loadInstagram(): Promise<InstagramData> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim();

  if (!accessToken || !userId) {
    return fallbackData();
  }

  const base = `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(
    userId
  )}`;

  const mediaParams = new URLSearchParams({
    fields:
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}",
    limit: "9",
    access_token: accessToken,
  });

  const accountParams = new URLSearchParams({
    fields: "username,profile_picture_url",
    access_token: accessToken,
  });

  try {
    const accountRequest = fetch(`${base}?${accountParams.toString()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(9000),
    }).catch(() => null);

    const [mediaResponse, accountResponse] = await Promise.all([
      fetch(`${base}/media?${mediaParams.toString()}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(9000),
      }),
      accountRequest,
    ]);

    if (!mediaResponse.ok) {
      console.error(
        `[instagram] Media API returned HTTP ${mediaResponse.status}.`
      );
      return fallbackData();
    }

    const mediaPayload = (await mediaResponse.json()) as InstagramMediaResponse;

    if (mediaPayload.error) {
      console.error(
        `[instagram] Media API error: ${mediaPayload.error.message ?? "UNKNOWN"}`
      );
      return fallbackData();
    }

    let username = fallbackUsername();

    if (accountResponse?.ok) {
      const accountPayload =
        (await accountResponse.json()) as InstagramAccountResponse;
      if (accountPayload.username) {
        username =
          accountPayload.username.trim().replace(/^@+/, "") || username;
      }
    }

    const posts: InstagramPost[] = (mediaPayload.data ?? [])
      .map((media) => {
        const imageUrl = pickImage(media);
        const mediaType =
          media.media_type === "VIDEO" || media.media_type === "CAROUSEL_ALBUM"
            ? media.media_type
            : "IMAGE";

        return {
          id: media.id ?? "",
          caption: media.caption?.trim() || "",
          mediaType,
          imageUrl,
          permalink: media.permalink ?? "",
          timestamp: media.timestamp ?? "",
        } satisfies InstagramPost;
      })
      .filter((post) => post.id && post.imageUrl && post.permalink)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 9);

    return {
      configured: true,
      username,
      profileUrl: `https://www.instagram.com/${encodeURIComponent(username)}/`,
      posts,
    };
  } catch (error) {
    console.error(
      "[instagram] Unable to reach the Instagram Graph API.",
      error instanceof Error ? error.message : error
    );
    return fallbackData();
  }
}

/**
 * Fetches the latest Instagram media through the official Instagram Graph API.
 * Results are cached in memory for 30 minutes. When credentials are absent the
 * section renders an honest empty state instead of placeholder posts.
 */
export async function getInstagramFeed(): Promise<InstagramData> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return cache.data;
  }

  if (inFlight) return inFlight;

  inFlight = loadInstagram()
    .then((data) => {
      cache = {
        data,
        expiresAt:
          Date.now() + (data.error ? ERROR_CACHE_TTL_MS : CACHE_TTL_MS),
      };
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
