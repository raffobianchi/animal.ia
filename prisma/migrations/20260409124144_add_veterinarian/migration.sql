-- CreateTable
CREATE TABLE "Veterinarian" (
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

-- CreateIndex
CREATE INDEX "Veterinarian_city_idx" ON "Veterinarian"("city");

-- CreateIndex
CREATE INDEX "Veterinarian_region_idx" ON "Veterinarian"("region");
