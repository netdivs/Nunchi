import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/beauty-salon-wapda-town-lahore",
    "/about",
    "/services",
    "/gallery",
    "/offers",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "/offers" || route === "/beauty-salon-wapda-town-lahore"
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/beauty-salon-wapda-town-lahore"
          ? 0.95
          : route === "/offers"
            ? 0.9
            : 0.8,
  }));
}
