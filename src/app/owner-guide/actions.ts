"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getOwnerSessionToken,
  isValidOwnerPassword,
  OWNER_COOKIE,
} from "./auth";

export async function signInToOwnerGuide(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const sessionToken = getOwnerSessionToken();

  if (!sessionToken || !isValidOwnerPassword(password)) {
    redirect("/owner-guide?error=incorrect-password");
  }

  const cookieStore = await cookies();
  cookieStore.set(OWNER_COOKIE, sessionToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/owner-guide",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/owner-guide");
}

export async function signOutOfOwnerGuide() {
  const cookieStore = await cookies();
  cookieStore.delete(OWNER_COOKIE);
  redirect("/owner-guide");
}
