"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  InstagramIcon,
} from "@/components/Icons";
import { SITE } from "@/lib/site";
import type { InstagramData, InstagramPost } from "@/lib/instagram";

type FetchState =
  | { status: "loading" }
  | { status: "ready"; data: InstagramData }
  | { status: "error" };

function fallbackProfileUrl() {
  const instagram = SITE.socials.find((social) => social.label === "Instagram");
  return instagram?.href || "https://www.instagram.com/nunchisalon/";
}

async function fetchFeed(signal?: AbortSignal): Promise<InstagramData> {
  const response = await fetch("/api/instagram", {
    signal,
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Unable to load Instagram feed");

  return (await response.json()) as InstagramData;
}

function PostSkeleton() {
  return (
    <div className="nc-ig-item nc-ig-item--skeleton" aria-hidden="true">
      <span className="nc-skeleton nc-skeleton-tile" />
    </div>
  );
}

function MediaTypeIcon({ type }: { type: InstagramPost["mediaType"] }) {
  if (type === "VIDEO") {
    return (
      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
        <path
          d="M8 5.5v13l11-6.5-11-6.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "CAROUSEL_ALBUM") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="13"
        height="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="7" y="7" width="12" height="12" rx="1.5" />
        <path d="M5 17V6a1 1 0 0 1 1-1h11" />
      </svg>
    );
  }

  return null;
}

function PostTile({ post }: { post: InstagramPost }) {
  const label = post.caption
    ? `View Instagram post: ${post.caption.slice(0, 90)}`
    : "View Instagram post";

  return (
    <a
      className="nc-ig-item"
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Image
        src={post.imageUrl}
        alt={post.caption ? post.caption.slice(0, 140) : "Nunchi Salon Instagram post"}
        fill
        sizes="(max-width: 767px) 50vw, (max-width: 991px) 33vw, 30vw"
        className="nc-ig-image"
        quality={85}
      />

      {post.mediaType !== "IMAGE" ? (
        <span className="nc-ig-type">
          <MediaTypeIcon type={post.mediaType} />
          {post.mediaType === "VIDEO" ? "Reel" : "Carousel"}
        </span>
      ) : null}

      <span className="nc-ig-overlay" aria-hidden="true">
        <span className="nc-ig-overlay-icon">
          <InstagramIcon size={22} />
        </span>
        <span className="nc-ig-overlay-text">View post</span>
      </span>
    </a>
  );
}

export default function InstagramSection() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  const retryFeed = () => {
    setState({ status: "loading" });
    fetchFeed()
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchFeed(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, []);

  const data = state.status === "ready" ? state.data : null;
  const posts = data?.posts ?? [];
  const profileUrl = data?.profileUrl || fallbackProfileUrl();
  const username = data?.username || "nunchisalon";
  const isLoading = state.status === "loading";
  const isError = state.status === "error" || Boolean(data?.error);
  const isUnconfigured = Boolean(data && !data.configured);
  const isEmpty = !isLoading && !isError && posts.length === 0;

  return (
    <section
      className="nc-ig nc-sec"
      id="instagram"
      aria-labelledby="instagram-title"
    >
      <div className="nc-container">
        <div className="nc-ig-head">
          <div className="nc-sec-head-copy">
            <span className="nc-eyebrow">Instagram</span>
            <h2 id="instagram-title" className="nc-sec-title">
              Follow Our <em>Beauty</em> Journey
            </h2>
            <p className="nc-sec-desc">
              Get inspired by our latest styles, transformations, and beauty
              trends.
            </p>
            <a
              className="nc-ig-handle"
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon size={16} />@{username}
            </a>
          </div>

          <a
            className="nc-lux-btn nc-lux-btn--light"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Us on Instagram
            <ArrowRightIcon size={13} />
          </a>
        </div>

        <p className="nc-sr-only" role="status">
          {isLoading
            ? "Loading the latest Instagram posts."
            : posts.length > 0
              ? `${posts.length} Instagram posts loaded.`
              : isError
                ? "The Instagram gallery is temporarily unavailable."
                : isUnconfigured
                  ? "The Instagram gallery will appear once the account is connected."
                  : "No Instagram posts to show yet."}
        </p>

        <div className="nc-ig-grid" aria-busy={isLoading}>
          {isLoading
            ? Array.from({ length: 9 }, (_, index) => (
                <PostSkeleton key={index} />
              ))
            : posts.map((post) => <PostTile key={post.id} post={post} />)}
        </div>

        {isEmpty ? (
          <div className="nc-ig-state">
            <span className="nc-ig-state-icon">
              <InstagramIcon size={30} />
            </span>
            <div>
              <h3>
                {isUnconfigured
                  ? "Our Instagram gallery is being connected"
                  : "New Instagram posts are on the way"}
              </h3>
              <p>
                {isUnconfigured
                  ? `The latest posts will appear here once our Instagram Business account is linked. In the meantime, follow @${username} for new looks, transformations and behind-the-scenes moments.`
                  : `Follow @${username} for the latest looks, transformations and behind-the-scenes moments from the salon.`}
              </p>
            </div>
            <a
              className="nc-lux-btn nc-lux-btn--light"
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow @{username}
              <ArrowRightIcon size={13} />
            </a>
          </div>
        ) : null}

        {isError ? (
          <div className="nc-ig-state">
            <span className="nc-ig-state-icon">
              <InstagramIcon size={30} />
            </span>
            <div>
              <h3>We could not load our Instagram feed right now</h3>
              <p>
                Please try again in a moment, or visit our profile directly for
                the latest looks.
              </p>
            </div>
            <div className="nc-ig-state-actions">
              <button
                type="button"
                className="nc-lux-btn nc-lux-btn--light"
                onClick={retryFeed}
              >
                Try again
              </button>
              <a
                className="nc-ig-handle"
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Instagram
                <ArrowRightIcon size={12} />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
