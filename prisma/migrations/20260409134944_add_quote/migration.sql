-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "species" TEXT NOT NULL,
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

-- CreateIndex
CREATE INDEX "Quote_userId_idx" ON "Quote"("userId");
