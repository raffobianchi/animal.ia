// Mock authentication. Replace with real auth (NextAuth) later.
// All dashboard queries route through getCurrentUserId() so we can swap
// the implementation in one place.

import { cookies } from "next/headers";

export const MOCK_USER_EMAIL = "demo@animal.ia";
const SESSION_COOKIE = "animal-ia-session";

export async function setSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "demo", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getCurrentUserId(): Promise<string> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const { db } = await import("~/lib/db");
  // Upsert handles fresh /tmp DBs on Vercel cold starts
  const user = await db.user.upsert({
    where: { email: MOCK_USER_EMAIL },
    update: {},
    create: { email: MOCK_USER_EMAIL, name: "Demo User" },
  });
  return user.id;
}
