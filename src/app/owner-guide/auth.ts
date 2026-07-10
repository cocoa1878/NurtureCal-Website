import { createHash, createHmac, pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const OWNER_COOKIE = "nurturecal_owner_session";

const FALLBACK_PASSWORD_SALT = "fc4634059537a6192d580092d1024dcd";
const FALLBACK_PASSWORD_HASH =
  "7456b69529f6e20b9a9db286d32984495618ee194b964e7343d7a4e0859d5e50";

function secureCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isOwnerGuideConfigured() {
  return Boolean(getSessionSecret());
}

export function isValidOwnerPassword(password: string) {
  const expectedPassword = process.env.OWNER_GUIDE_PASSWORD;

  if (expectedPassword) {
    return secureCompare(password, expectedPassword);
  }

  const suppliedHash = pbkdf2Sync(
    password,
    FALLBACK_PASSWORD_SALT,
    310_000,
    32,
    "sha256",
  ).toString("hex");

  return secureCompare(suppliedHash, FALLBACK_PASSWORD_HASH);
}

function getSessionSecret() {
  return process.env.OWNER_GUIDE_SESSION_SECRET ?? process.env.RESEND_API_KEY;
}

export function getOwnerSessionToken() {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const passwordVerifier = process.env.OWNER_GUIDE_PASSWORD
    ? createHash("sha256").update(process.env.OWNER_GUIDE_PASSWORD).digest("hex")
    : FALLBACK_PASSWORD_HASH;

  return createHmac("sha256", secret)
    .update(`nurturecal-owner-guide:${passwordVerifier}`)
    .digest("hex");
}

export async function isOwnerAuthenticated() {
  const expectedToken = getOwnerSessionToken();
  if (!expectedToken) {
    return false;
  }

  const cookieStore = await cookies();
  const suppliedToken = cookieStore.get(OWNER_COOKIE)?.value;
  return Boolean(suppliedToken && secureCompare(suppliedToken, expectedToken));
}
