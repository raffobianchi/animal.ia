import "server-only";
import { db } from "~/lib/db";
import { getCurrentUserId } from "~/lib/auth";
import {
  haversineDistance,
  parseVetSpecialties,
  type VetWithDistance,
} from "~/lib/geo";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "denied"
  | "paid";

/** Returns the user's primary (first) pet. Multi-pet support comes later. */
export async function getPrimaryPet() {
  const userId = await getCurrentUserId();
  return db.pet.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getActivePolicy(petId: string) {
  return db.policy.findFirst({
    where: { petId, status: "active" },
    orderBy: { startDate: "desc" },
  });
}

export async function getClaims(petId: string) {
  return db.claim.findMany({
    where: { petId },
    orderBy: { submittedDate: "desc" },
  });
}

export async function getClaim(id: string) {
  return db.claim.findUnique({
    where: { id },
    include: { history: { orderBy: { date: "asc" } } },
  });
}

export async function getMedicalRecords(petId: string) {
  return db.medicalRecord.findMany({
    where: { petId },
    orderBy: { date: "desc" },
  });
}

export async function getDocuments(petId: string) {
  return db.petDocument.findMany({
    where: { petId },
    orderBy: { uploadDate: "desc" },
  });
}

export async function getPolicies(petId: string) {
  return db.policy.findMany({
    where: { petId },
    orderBy: { startDate: "desc" },
  });
}

// ── Veterinarians ─────────────────────────────────────────────────────

export async function getAllVets(): Promise<VetWithDistance[]> {
  const vets = await db.veterinarian.findMany();
  return vets.map(parseVetSpecialties);
}

export async function getVetsNearby(
  lat: number,
  lng: number,
  radiusKm = 25,
): Promise<VetWithDistance[]> {
  const vets = await db.veterinarian.findMany();
  return vets
    .map((vet) => ({
      ...parseVetSpecialties(vet),
      distance: haversineDistance(lat, lng, vet.lat, vet.lng),
    }))
    .filter((v) => v.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

/** Convenience: returns everything the dashboard overview needs in one call. */
export async function getDashboardData() {
  const pet = await getPrimaryPet();
  if (!pet) return null;
  const [policy, claims] = await Promise.all([
    getActivePolicy(pet.id),
    getClaims(pet.id),
  ]);
  return { pet, policy, claims };
}
