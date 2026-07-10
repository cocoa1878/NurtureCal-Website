"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getOwnerSessionToken,
  isValidOwnerPassword,
  OWNER_COOKIE,
} from "./auth";

function getSafeReturnPath(value: FormDataEntryValue | null) {
  return value === "/project-status" ? "/project-status" : "/owner-guide";
}

export async function signInToOwnerGuide(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const sessionToken = getOwnerSessionToken();
  const returnPath = getSafeReturnPath(formData.get("returnTo"));

  if (!sessionToken || !isValidOwnerPassword(password)) {
    redirect(`${returnPath}?error=incorrect-password`);
  }

  const cookieStore = await cookies();
  cookieStore.set(OWNER_COOKIE, sessionToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(returnPath);
}

export async function signOutOfOwnerGuide() {
  const cookieStore = await cookies();
  cookieStore.set(OWNER_COOKIE, "", { maxAge: 0, path: "/" });
  cookieStore.set(OWNER_COOKIE, "", { maxAge: 0, path: "/owner-guide" });
  redirect("/owner-guide");
}
