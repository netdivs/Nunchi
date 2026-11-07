import { promises as fs } from "node:fs";
import path from "node:path";

export type Offer = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  expiryDate: string;
  badge: string;
  bookingHref: string;
  published: boolean;
  createdAt: string;
};

export type OfferInput = Omit<Offer, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};

const OFFERS_FILE =
  process.env.OFFERS_FILE?.trim() ||
  path.join(process.cwd(), "data", "offers.json");

let writeQueue: Promise<void> = Promise.resolve();

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function normalizeOffer(value: unknown): Offer | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  const id = asString(record.id);
  const title = asString(record.title);
  const expiryDate = asString(record.expiryDate);

  if (
    !id ||
    !title ||
    !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate) ||
    Number.isNaN(new Date(`${expiryDate}T12:00:00Z`).getTime())
  ) {
    return null;
  }

  return {
    id,
    title,
    description: asString(record.description),
    image: asString(record.image, "/images/spa.jpg"),
    imageAlt: asString(record.imageAlt, title),
    originalPrice: Math.max(0, asNumber(record.originalPrice)),
    discountedPrice: Math.max(0, asNumber(record.discountedPrice)),
    currency: (asString(record.currency, "PKR") || "PKR").toUpperCase(),
    expiryDate,
    badge: asString(record.badge),
    bookingHref: asString(record.bookingHref, "/contact") || "/contact",
    published: record.published !== false,
    createdAt: asString(record.createdAt, new Date(0).toISOString()),
  };
}

function sortNewestFirst(a: Offer, b: Offer) {
  const byDate = b.createdAt.localeCompare(a.createdAt);
  if (byDate !== 0) return byDate;
  return b.id.localeCompare(a.id);
}

/**
 * Pakistan-local calendar date as YYYY-MM-DD. Offers expire at the end of the
 * day they are valid through, regardless of the server timezone.
 */
export function todayInPakistan() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function isOfferActive(offer: Offer, today = todayInPakistan()) {
  return offer.published && offer.expiryDate >= today;
}

export function getDiscountPercent(offer: Offer) {
  if (offer.originalPrice <= 0) return 0;
  if (offer.discountedPrice >= offer.originalPrice) return 0;
  return Math.max(
    0,
    Math.min(
      99,
      Math.round(
        ((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) *
          100
      )
    )
  );
}

export function daysUntilExpiry(offer: Offer, today = todayInPakistan()) {
  const start = new Date(`${today}T12:00:00Z`).getTime();
  const end = new Date(`${offer.expiryDate}T12:00:00Z`).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Infinity;
  return Math.ceil((end - start) / (24 * 60 * 60 * 1000));
}

export function formatOfferPrice(amount: number, currency = "PKR") {
  if (currency.toUpperCase() === "PKR") {
    return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString("en-US")}`;
  }
}

export function formatOfferDate(date: string) {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(parsed);
}

export async function getAllOffers(): Promise<Offer[]> {
  try {
    const raw = await fs.readFile(
      /*turbopackIgnore: true*/ OFFERS_FILE,
      "utf8"
    );
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeOffer)
      .filter((offer): offer is Offer => offer !== null)
      .sort(sortNewestFirst);
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "";

    if (code !== "ENOENT") {
      console.error("[offers] Unable to read the offers file.", error);
    }

    return [];
  }
}

export async function getActiveOffers(): Promise<Offer[]> {
  const today = todayInPakistan();
  const offers = await getAllOffers();
  return offers.filter((offer) => isOfferActive(offer, today));
}

export async function getOfferById(id: string) {
  const offers = await getAllOffers();
  return offers.find((offer) => offer.id === id) ?? null;
}

export async function saveOffers(offers: Offer[]) {
  const payload = `${JSON.stringify(offers, null, 2)}\n`;

  writeQueue = writeQueue
    .catch(() => undefined)
    .then(async () => {
      await fs.mkdir(path.dirname(OFFERS_FILE), { recursive: true });
      const tempFile = `${OFFERS_FILE}.${process.pid}.${Date.now()}.tmp`;
      await fs.writeFile(tempFile, payload, "utf8");
      await fs.rename(tempFile, OFFERS_FILE);
    });

  return writeQueue;
}

export async function createOffer(input: OfferInput) {
  const offers = await getAllOffers();
  const offer: Offer = {
    ...input,
    id: input.id?.trim() || crypto.randomUUID(),
    createdAt: input.createdAt?.trim() || new Date().toISOString(),
  };

  await saveOffers([offer, ...offers]);
  return offer;
}

export async function updateOffer(id: string, input: OfferInput) {
  const offers = await getAllOffers();
  const index = offers.findIndex((offer) => offer.id === id);
  if (index === -1) return null;

  const updated: Offer = {
    ...offers[index],
    ...input,
    id,
    createdAt: offers[index].createdAt,
  };

  const next = [...offers];
  next[index] = updated;
  await saveOffers(next);
  return updated;
}

export async function deleteOffer(id: string) {
  const offers = await getAllOffers();
  const next = offers.filter((offer) => offer.id !== id);
  if (next.length === offers.length) return false;
  await saveOffers(next);
  return true;
}

export async function toggleOfferPublished(id: string) {
  const offers = await getAllOffers();
  const index = offers.findIndex((offer) => offer.id === id);
  if (index === -1) return null;

  const next = [...offers];
  next[index] = { ...next[index], published: !next[index].published };
  await saveOffers(next);
  return next[index];
}
