import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

async function main() {
  // Wipe (idempotent reseed)
  await db.claimHistory.deleteMany();
  await db.claim.deleteMany();
  await db.medicalRecord.deleteMany();
  await db.petDocument.deleteMany();
  await db.policy.deleteMany();
  await db.pet.deleteMany();
  await db.user.deleteMany();

  const user = await db.user.create({
    data: {
      email: "demo@animal.ia",
      name: "Demo User",
    },
  });

  const pet = await db.pet.create({
    data: {
      userId: user.id,
      name: "Luna",
      species: "dog",
      breed: "Golden Retriever",
      ageYears: 4,
      weightKg: 28,
      vaccinated: true,
      sterilized: true,
      chronicConditions: false,
      allergies: "",
      microchipCode: "380260000123456",
      region: "lombardia",
    },
  });

  const policy = await db.policy.create({
    data: {
      petId: pet.id,
      plan: "standard",
      status: "active",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2027-01-15"),
      monthlyPremium: 19.99,
      coverageJson: JSON.stringify([
        "Accident coverage",
        "Illness coverage",
        "Unlimited claims",
        "Priority support",
        "Vaccine reminders",
      ]),
    },
  });

  await db.claim.create({
    data: {
      policyId: policy.id,
      petId: pet.id,
      status: "paid",
      description: "Emergency vet visit, Luna ingested a foreign object",
      incidentDate: new Date("2026-02-10"),
      submittedDate: new Date("2026-02-11"),
      vetName: "Dr. Rossi",
      amount: 320,
      documentsJson: JSON.stringify(["invoice-rossi.pdf"]),
      history: {
        create: [
          { status: "submitted", date: new Date("2026-02-11"), note: "Claim submitted" },
          { status: "under_review", date: new Date("2026-02-13"), note: "Under review by our team" },
          { status: "approved", date: new Date("2026-02-18"), note: "Claim approved, €320" },
          { status: "paid", date: new Date("2026-02-22"), note: "Payment sent to your account" },
        ],
      },
    },
  });

  await db.claim.create({
    data: {
      policyId: policy.id,
      petId: pet.id,
      status: "under_review",
      description: "Skin allergy treatment and medication",
      incidentDate: new Date("2026-03-20"),
      submittedDate: new Date("2026-03-21"),
      vetName: "Dr. Bianchi",
      amount: 150,
      documentsJson: JSON.stringify(["invoice-bianchi.pdf", "prescription.pdf"]),
      history: {
        create: [
          { status: "submitted", date: new Date("2026-03-21"), note: "Claim submitted" },
          { status: "under_review", date: new Date("2026-03-23"), note: "Under review by our team" },
        ],
      },
    },
  });

  await db.medicalRecord.createMany({
    data: [
      {
        petId: pet.id,
        date: new Date("2026-03-20"),
        type: "visit",
        title: "Dermatology visit",
        description: "Skin irritation on belly area. Prescribed medicated shampoo and antihistamines.",
        vetName: "Dr. Bianchi",
      },
      {
        petId: pet.id,
        date: new Date("2026-02-10"),
        type: "surgery",
        title: "Foreign object removal",
        description: "Emergency endoscopy to remove ingested sock. Successful recovery.",
        vetName: "Dr. Rossi",
      },
      {
        petId: pet.id,
        date: new Date("2026-01-05"),
        type: "vaccine",
        title: "Annual vaccination",
        description: "Rabies booster and DHPP vaccine administered.",
        vetName: "Dr. Verdi",
      },
      {
        petId: pet.id,
        date: new Date("2025-09-12"),
        type: "checkup",
        title: "Routine checkup",
        description: "All vitals normal. Weight stable at 28kg. Teeth in good condition.",
        vetName: "Dr. Verdi",
      },
    ],
  });

  await db.petDocument.createMany({
    data: [
      {
        petId: pet.id,
        type: "passport",
        name: "Pet Passport, Luna",
        uploadDate: new Date("2025-06-10"),
        fileUrl: "#",
      },
      {
        petId: pet.id,
        type: "vaccination_card",
        name: "Vaccination Card 2026",
        uploadDate: new Date("2026-01-05"),
        fileUrl: "#",
      },
      {
        petId: pet.id,
        type: "microchip",
        name: "Microchip Certificate",
        uploadDate: new Date("2022-08-20"),
        fileUrl: "#",
      },
    ],
  });

  console.log("Seeded:", { user: user.email, pet: pet.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
