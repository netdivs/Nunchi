"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  isAdminAuthenticated,
  isAdminConfigured,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  createOffer,
  deleteOffer,
  toggleOfferPublished,
  updateOffer,
  type OfferInput,
} from "@/lib/offers";

const ADMIN_PATH = "/admin/offers";

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function refreshOfferPages() {
  revalidatePath("/");
  revalidatePath("/offers");
  revalidatePath(ADMIN_PATH);
}

function redirectWithError(message: string): never {
  redirect(`${ADMIN_PATH}?error=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  if (!isAdminConfigured()) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent(
      "Admin access is not configured. Set ADMIN_PASSWORD in the environment."
    )}`);
  }

  if (!(await isAdminAuthenticated())) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent(
      "Please sign in to manage offers."
    )}`);
  }
}

function parseOffer(formData: FormData): OfferInput {
  const title = field(formData, "title");
  const description = field(formData, "description");
  const image = field(formData, "image");
  const imageAlt = field(formData, "imageAlt");
  const currency = (field(formData, "currency") || "PKR").toUpperCase();
  const expiryDate = field(formData, "expiryDate");
  const badge = field(formData, "badge");
  const bookingHref = field(formData, "bookingHref") || "/contact";
  const published = formData.get("published") === "on";

  if (!title) redirectWithError("Offer title is required.");
  if (!description) redirectWithError("Offer description is required.");
  if (!image) redirectWithError("Offer image is required.");
  if (!/^[A-Z]{3}$/.test(currency)) {
    redirectWithError("Currency must be a three-letter code such as PKR or USD.");
  }
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate) ||
    Number.isNaN(new Date(`${expiryDate}T23:59:59+05:00`).getTime())
  ) {
    redirectWithError("Please choose a valid expiry date.");
  }
  if (
    image.startsWith("//") ||
    (!image.startsWith("/") && !/^https?:\/\//i.test(image))
  ) {
    redirectWithError(
      "Image must be a local path starting with / or a full https URL."
    );
  }
  if (
    bookingHref.startsWith("//") ||
    (!bookingHref.startsWith("/") && !/^https?:\/\//i.test(bookingHref))
  ) {
    redirectWithError(
      "Booking link must be a local path starting with / or a full https URL."
    );
  }

  const originalPrice = Number(field(formData, "originalPrice"));
  const discountedPrice = Number(field(formData, "discountedPrice"));

  if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
    redirectWithError("Original price must be greater than zero.");
  }
  if (!Number.isFinite(discountedPrice) || discountedPrice <= 0) {
    redirectWithError("Discounted price must be greater than zero.");
  }
  if (discountedPrice > originalPrice) {
    redirectWithError("Discounted price cannot be higher than the original price.");
  }

  return {
    title,
    description,
    image,
    imageAlt: imageAlt || title,
    originalPrice,
    discountedPrice,
    currency,
    expiryDate,
    badge,
    bookingHref,
    published,
  };
}

export async function loginAction(formData: FormData) {
  if (!isAdminConfigured()) {
    redirectWithError(
      "Admin access is not configured. Set ADMIN_PASSWORD in the environment."
    );
  }

  const password = field(formData, "password");

  if (!verifyAdminPassword(password)) {
    redirectWithError("The password you entered is not correct.");
  }

  await setAdminSession();
  redirect(ADMIN_PATH);
}

export async function logoutAction() {
  await clearAdminSession();
  redirect(ADMIN_PATH);
}

export async function createOfferAction(formData: FormData) {
  await requireAdmin();
  const input = parseOffer(formData);

  await createOffer(input);
  refreshOfferPages();
  redirect(`${ADMIN_PATH}?saved=created`);
}

export async function updateOfferAction(formData: FormData) {
  await requireAdmin();

  const id = field(formData, "id");
  if (!id) redirectWithError("Missing offer id.");

  const input = parseOffer(formData);
  const updated = await updateOffer(id, input);

  if (!updated) redirectWithError("That offer could not be found.");

  refreshOfferPages();
  redirect(`${ADMIN_PATH}?saved=updated`);
}

export async function deleteOfferAction(formData: FormData) {
  await requireAdmin();

  const id = field(formData, "id");
  if (!id) redirectWithError("Missing offer id.");

  const deleted = await deleteOffer(id);
  if (!deleted) redirectWithError("That offer could not be found.");

  refreshOfferPages();
  redirect(`${ADMIN_PATH}?saved=deleted`);
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();

  const id = field(formData, "id");
  if (!id) redirectWithError("Missing offer id.");

  const updated = await toggleOfferPublished(id);
  if (!updated) redirectWithError("That offer could not be found.");

  refreshOfferPages();
  redirect(
    `${ADMIN_PATH}?saved=${updated.published ? "published" : "unpublished"}`
  );
}
