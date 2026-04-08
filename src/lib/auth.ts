// Mock authentication. Replace with real auth (NextAuth) later.
// All dashboard queries route through getCurrentUserId() so we can swap
// the implementation in one place.

export const MOCK_USER_EMAIL = "demo@animal.ia";

export async function getCurrentUserId(): Promise<string> {
  const { db } = await import("~/lib/db");
  const user = await db.user.findUnique({ where: { email: MOCK_USER_EMAIL } });
  if (!user) {
    throw new Error(
      "Mock user not found. Run `npm run db:seed` to initialize the database.",
    );
  }
  return user.id;
}
