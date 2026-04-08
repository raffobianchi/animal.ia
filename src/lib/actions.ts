"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/lib/db";
import { getCurrentUserId } from "~/lib/auth";
import { getPrimaryPet } from "~/lib/queries";

async function requirePet() {
  const pet = await getPrimaryPet();
  if (!pet) throw new Error("No pet found for current user");
  // ensure ownership (defense in depth even in mock auth)
  const userId = await getCurrentUserId();
  if (pet.userId !== userId) throw new Error("Forbidden");
  return pet;
}

export async function createMedicalRecord(input: {
  type: string;
  title: string;
  description: string;
  vetName: string;
  date: string; // ISO
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

export async function createDocument(input: { type: string; name: string }) {
  const pet = await requirePet();
  await db.petDocument.create({
    data: {
      petId: pet.id,
      type: input.type,
      name: input.name,
      fileUrl: "#",
    },
  });
  revalidatePath("/[locale]/dashboard/documents", "page");
}

export async function createClaim(input: {
  description: string;
  incidentDate: string;
  vetName: string;
  amount: number;
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
