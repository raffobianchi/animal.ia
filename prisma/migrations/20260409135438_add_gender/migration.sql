/*
  Warnings:

  - Added the required column `gender` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
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
INSERT INTO "new_Quote" ("ageYears", "annualPremium", "breakdownJson", "breedId", "createdAt", "healthJson", "id", "monthlyPremium", "region", "species", "userId") SELECT "ageYears", "annualPremium", "breakdownJson", "breedId", "createdAt", "healthJson", "id", "monthlyPremium", "region", "species", "userId" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE INDEX "Quote_userId_idx" ON "Quote"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
