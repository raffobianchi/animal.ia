-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
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
INSERT INTO "new_Pet" ("ageYears", "allergies", "breed", "chronicConditions", "createdAt", "id", "name", "photoUrl", "region", "species", "sterilized", "userId", "vaccinated", "weightKg") SELECT "ageYears", "allergies", "breed", "chronicConditions", "createdAt", "id", "name", "photoUrl", "region", "species", "sterilized", "userId", "vaccinated", "weightKg" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE INDEX "Pet_userId_idx" ON "Pet"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
