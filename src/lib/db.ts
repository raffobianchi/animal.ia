import BetterSqlite3 from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "~/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  dbInitialized?: boolean;
};

// Vercel's filesystem is read-only except /tmp
const isVercel = !!process.env.VERCEL;
const DB_PATH = isVercel ? "/tmp/dev.db" : (process.env.DATABASE_URL ?? "file:./dev.db").replace("file:", "");
const DB_URL = `file:${DB_PATH}`;

/** Ensure SQLite tables exist (idempotent). Runs raw SQL on cold start. */
function ensureSchema() {
  if (globalForPrisma.dbInitialized) return;

  const sqlite = new BetterSqlite3(DB_PATH);
  const hasUsers = sqlite
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='User'",
    )
    .get();

  if (!hasUsers) {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

      CREATE TABLE IF NOT EXISTS "Pet" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "species" TEXT NOT NULL,
        "breed" TEXT NOT NULL,
        "ageYears" INTEGER NOT NULL,
        "weightKg" REAL NOT NULL,
        "photoUrl" TEXT,
        "vaccinated" BOOLEAN NOT NULL DEFAULT false,
        "sterilized" BOOLEAN NOT NULL DEFAULT false,
        "chronicConditions" BOOLEAN NOT NULL DEFAULT false,
        "allergies" TEXT NOT NULL DEFAULT '',
        "microchipCode" TEXT NOT NULL DEFAULT '',
        "region" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "Pet_userId_idx" ON "Pet"("userId");

      CREATE TABLE IF NOT EXISTS "Policy" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "petId" TEXT NOT NULL,
        "plan" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "startDate" DATETIME NOT NULL,
        "endDate" DATETIME NOT NULL,
        "monthlyPremium" REAL NOT NULL,
        "coverageJson" TEXT NOT NULL DEFAULT '[]',
        "breakdownJson" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Policy_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "Policy_petId_idx" ON "Policy"("petId");

      CREATE TABLE IF NOT EXISTS "Claim" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "policyId" TEXT NOT NULL,
        "petId" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "incidentDate" DATETIME NOT NULL,
        "submittedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "vetName" TEXT NOT NULL,
        "amount" REAL NOT NULL,
        "documentsJson" TEXT NOT NULL DEFAULT '[]',
        CONSTRAINT "Claim_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "Claim_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "Claim_petId_idx" ON "Claim"("petId");
      CREATE INDEX IF NOT EXISTS "Claim_policyId_idx" ON "Claim"("policyId");

      CREATE TABLE IF NOT EXISTS "ClaimHistory" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "claimId" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "date" DATETIME NOT NULL,
        "note" TEXT NOT NULL,
        CONSTRAINT "ClaimHistory_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "ClaimHistory_claimId_idx" ON "ClaimHistory"("claimId");

      CREATE TABLE IF NOT EXISTS "MedicalRecord" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "petId" TEXT NOT NULL,
        "date" DATETIME NOT NULL,
        "type" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "vetName" TEXT NOT NULL,
        CONSTRAINT "MedicalRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "MedicalRecord_petId_idx" ON "MedicalRecord"("petId");

      CREATE TABLE IF NOT EXISTS "PetDocument" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "petId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "uploadDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "fileUrl" TEXT NOT NULL,
        CONSTRAINT "PetDocument_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "PetDocument_petId_idx" ON "PetDocument"("petId");

      CREATE TABLE IF NOT EXISTS "Quote" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "species" TEXT NOT NULL,
        "gender" TEXT NOT NULL,
        "breedId" TEXT NOT NULL,
        "ageYears" INTEGER NOT NULL,
        "region" TEXT NOT NULL,
        "healthJson" TEXT NOT NULL,
        "breakdownJson" TEXT NOT NULL,
        "monthlyPremium" REAL NOT NULL,
        "annualPremium" REAL NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "Quote_userId_idx" ON "Quote"("userId");

      CREATE TABLE IF NOT EXISTS "Veterinarian" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "region" TEXT NOT NULL,
        "postalCode" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "email" TEXT,
        "website" TEXT,
        "lat" REAL NOT NULL,
        "lng" REAL NOT NULL,
        "specialties" TEXT NOT NULL DEFAULT '[]',
        "emergency" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS "Veterinarian_city_idx" ON "Veterinarian"("city");
      CREATE INDEX IF NOT EXISTS "Veterinarian_region_idx" ON "Veterinarian"("region");
    `);
  }

  sqlite.close();
  globalForPrisma.dbInitialized = true;
}

function createClient() {
  ensureSchema();
  const adapter = new PrismaBetterSqlite3({ url: DB_URL });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
