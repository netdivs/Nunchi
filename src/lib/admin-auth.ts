import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "nc_admin_session";
const SESSION_PAYLOAD = "nunchi-admin-session-v1";

function adminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function isAdminConfigured() {
  return adminPassword().length > 0;
}

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    adminPassword() ||
    "nunchi-local-admin"
  );
}

function sessionToken() {
  return createHmac("sha256", sessionSecret())
    .update(SESSION_PAYLOAD)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminPassword(password: string) {
  const expected = adminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false;

  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;

  return safeEqual(token, sessionToken());
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
