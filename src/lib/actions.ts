"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/lib/db";
import { getCurrentUserId, MOCK_USER_EMAIL } from "~/lib/auth";
import { getPrimaryPet } from "~/lib/queries";
import { getBreed, type QuoteBreakdown } from "~/data/pricing";

// ── Login (mock) ──────────────────────────────────────────────────────────

const MOCK_CREDENTIALS = { email: "demo@animal.ia", password: "demo1234" };

export async function mockLogin(email: string, password: string, locale: string) {
  if (
    email.toLowerCase() !== MOCK_CREDENTIALS.email ||
    password !== MOCK_CREDENTIALS.password
  ) {
    return { ok: false as const };
  }
  // Ensure the mock user exists in DB
  await db.user.upsert({
    where: { email: MOCK_CREDENTIALS.email },
    update: {},
    create: { email: MOCK_CREDENTIALS.email, name: "Demo User" },
  });
  const { redirect } = await import("next/navigation");
  redirect(`/${locale}/dashboard`);
}

// ── Helpers ───────────────────────────────────────────────────────────────

async function requirePet() {
  const pet = await getPrimaryPet();
  if (!pet) throw new Error("No pet found for current user");
  const userId = await getCurrentUserId();
  if (pet.userId !== userId) throw new Error("Forbidden");
  return pet;
}

// ── Onboarding ────────────────────────────────────────────────────────────

export type OnboardingInput = {
  ownerName: string;
  ownerEmail: string;
  petName: string;
  quoteForm: {
    species: "dog" | "cat";
    breedId: string;
    ageYears: number;
    region: string;
  };
  quote: QuoteBreakdown;
};

/** Idempotent: replaces any existing pet+policy for the mock user. */
export async function completeOnboarding(input: OnboardingInput) {
  const breed = getBreed(input.quoteForm.breedId);

  // Upsert user (mock: always under MOCK_USER_EMAIL so dashboard keeps working)
  const user = await db.user.upsert({
    where: { email: MOCK_USER_EMAIL },
    update: { name: input.ownerName },
    create: { email: MOCK_USER_EMAIL, name: input.ownerName },
  });

  // Clean previous onboarding for this user (cascades to policies/claims/etc)
  await db.pet.deleteMany({ where: { userId: user.id } });

  const pet = await db.pet.create({
    data: {
      userId: user.id,
      name: input.petName,
      species: input.quoteForm.species,
      breed: breed.id,
      ageYears: Math.floor(input.quoteForm.ageYears),
      weightKg: 0,
      region: input.quoteForm.region,
      vaccinated: false,
      sterilized: false,
      chronicConditions: false,
      allergies: "",
    },
  });

  const start = new Date();
  const end = new Date(start);
  end.setFullYear(start.getFullYear() + 1);

  await db.policy.create({
    data: {
      petId: pet.id,
      plan: "personalized",
      status: "active",
      startDate: start,
      endDate: end,
      monthlyPremium: Number(input.quote.finalMonthly.toFixed(2)),
      coverageJson: JSON.stringify([
        "Accident coverage",
        "Illness coverage",
        "Unlimited claims",
        "Priority support",
        "Vaccine reminders",
      ]),
      breakdownJson: JSON.stringify(input.quote),
    },
  });

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true };
}

// ── Records ───────────────────────────────────────────────────────────────

export async function createMedicalRecord(input: {
  type: string;
  title: string;
  description: string;
  vetName: string;
  date: string;
}) {
  const pet = await requirePet();
  await db.medicalRecord.create({
    data: {
      petId: pet.id,
      type: input.type,
      title: input.title,
      description: input.description,
      vetName: input.vetName,
      date: new Date(input.date),
    },
  });
  revalidatePath("/[locale]/dashboard/records", "page");
}

// ── Documents ─────────────────────────────────────────────────────────────

export async function createDocument(input: {
  type: string;
  name: string;
  fileUrl: string;
}) {
  const pet = await requirePet();
  await db.petDocument.create({
    data: {
      petId: pet.id,
      type: input.type,
      name: input.name,
      fileUrl: input.fileUrl,
    },
  });
  revalidatePath("/[locale]/dashboard/documents", "page");
}

// ── Claims ────────────────────────────────────────────────────────────────

export async function createClaim(input: {
  description: string;
  incidentDate: string;
  vetName: string;
  amount: number;
  documents: string[]; // public URLs of uploaded files
}) {
  const pet = await requirePet();
  const policy = await db.policy.findFirst({
    where: { petId: pet.id, status: "active" },
  });
  if (!policy) throw new Error("No active policy");
  const claim = await db.claim.create({
    data: {
      policyId: policy.id,
      petId: pet.id,
      status: "submitted",
      description: input.description,
      incidentDate: new Date(input.incidentDate),
      vetName: input.vetName,
      amount: input.amount,
      documentsJson: JSON.stringify(input.documents),
      history: {
        create: [
          { status: "submitted", date: new Date(), note: "Claim submitted" },
        ],
      },
    },
  });
  revalidatePath("/[locale]/dashboard/claims", "page");
  return claim.id;
}
