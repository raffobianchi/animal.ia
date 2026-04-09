import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

async function main() {
  // Wipe (idempotent reseed)
  await db.veterinarian.deleteMany();
  await db.quote.deleteMany();
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

  // ── Sample quotes (preventivi) ──────────────────────────────────────────
  await db.quote.createMany({
    data: [
      {
        userId: user.id,
        species: "dog",
        gender: "female",
        breedId: "golden_retriever",
        ageYears: 4,
        region: "lombardia",
        healthJson: JSON.stringify({
          previousSurgery: false,
          chronicCondition: false,
          regularMedication: false,
          vetVisits: "2-4",
        }),
        breakdownJson: JSON.stringify({
          species: "dog",
          gender: "female",
          stage: "adult",
          area: "north_west",
          breedRisk: "mid",
          baseFrequency: 0.28,
          baseSeverity: 550,
          stageFactor: 1.0,
          areaFactor: 1.15,
          breedFactor: 1.15,
          healthMult: 1.0,
          pureRaw: 177.1,
          pureBreed: 203.67,
          pureHealth: 203.67,
          loadings: 1.5,
          vetCost: 70,
          finalAnnual: 375.5,
          finalMonthly: 31.29,
        }),
        monthlyPremium: 31.29,
        annualPremium: 375.5,
        createdAt: new Date("2026-03-15"),
      },
      {
        userId: user.id,
        species: "cat",
        gender: "male",
        breedId: "european_shorthair",
        ageYears: 2,
        region: "lazio",
        healthJson: JSON.stringify({
          previousSurgery: false,
          chronicCondition: false,
          regularMedication: false,
          vetVisits: "0-1",
        }),
        breakdownJson: JSON.stringify({
          species: "cat",
          gender: "male",
          stage: "adult",
          area: "center",
          breedRisk: "low",
          baseFrequency: 0.2,
          baseSeverity: 350,
          stageFactor: 1.0,
          areaFactor: 1.05,
          breedFactor: 1.0,
          healthMult: 0.95,
          pureRaw: 73.5,
          pureBreed: 73.5,
          pureHealth: 69.83,
          loadings: 1.5,
          vetCost: 70,
          finalAnnual: 174.74,
          finalMonthly: 14.56,
        }),
        monthlyPremium: 14.56,
        annualPremium: 174.74,
        createdAt: new Date("2026-04-01"),
      },
    ],
  });

  // ── Veterinarian clinics ───────────────────────────────────────────────
  await db.veterinarian.createMany({
    data: [
      // Milano
      { name: "Clinica Veterinaria Città Studi", address: "Via Celoria 10", city: "Milano", region: "Lombardia", postalCode: "20133", phone: "+39 02 7063 0267", email: "info@vetcittastudi.it", website: "https://www.vetcittastudi.it", lat: 45.4773, lng: 9.2257, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Clinica Veterinaria Gran Sasso", address: "Via Porpora 163", city: "Milano", region: "Lombardia", postalCode: "20131", phone: "+39 02 2361 8016", email: "info@vetgransasso.it", lat: 45.4846, lng: 9.2270, specialties: JSON.stringify(["dogs", "cats", "cardiology"]), emergency: false },
      { name: "Ambulatorio Veterinario Navigli", address: "Ripa di Porta Ticinese 63", city: "Milano", region: "Lombardia", postalCode: "20143", phone: "+39 02 8942 2130", lat: 45.4489, lng: 9.1772, specialties: JSON.stringify(["dogs", "cats", "dermatology"]), emergency: false },
      { name: "Ospedale Veterinario San Francesco", address: "Via Lampugnano 99", city: "Milano", region: "Lombardia", postalCode: "20151", phone: "+39 02 3343 6700", email: "info@ospvetsf.it", website: "https://www.ospvetsf.it", lat: 45.4892, lng: 9.1265, specialties: JSON.stringify(["dogs", "cats", "surgery", "exotic"]), emergency: true },
      // Roma
      { name: "Clinica Veterinaria Roma Sud", address: "Via Cristoforo Colombo 440", city: "Roma", region: "Lazio", postalCode: "00145", phone: "+39 06 5413 0085", email: "info@vetromasud.it", website: "https://www.vetromasud.it", lat: 41.8371, lng: 12.4784, specialties: JSON.stringify(["dogs", "cats", "dentistry"]), emergency: true },
      { name: "Ambulatorio Veterinario Prati", address: "Via Cola di Rienzo 180", city: "Roma", region: "Lazio", postalCode: "00192", phone: "+39 06 3217 6543", lat: 41.9108, lng: 12.4627, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
      { name: "Clinica Veterinaria Appia", address: "Via Appia Nuova 854", city: "Roma", region: "Lazio", postalCode: "00178", phone: "+39 06 7185 2340", email: "info@vetappia.it", lat: 41.8502, lng: 12.5542, specialties: JSON.stringify(["dogs", "cats", "surgery", "cardiology"]), emergency: true },
      { name: "Centro Veterinario Trastevere", address: "Viale di Trastevere 108", city: "Roma", region: "Lazio", postalCode: "00153", phone: "+39 06 5800 3421", lat: 41.8816, lng: 12.4712, specialties: JSON.stringify(["dogs", "cats", "exotic"]), emergency: false },
      // Napoli
      { name: "Clinica Veterinaria Vomero", address: "Via Scarlatti 120", city: "Napoli", region: "Campania", postalCode: "80129", phone: "+39 081 578 4321", email: "info@vetvomero.it", lat: 40.8449, lng: 14.2328, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Chiaia", address: "Via dei Mille 40", city: "Napoli", region: "Campania", postalCode: "80121", phone: "+39 081 764 2190", lat: 40.8372, lng: 14.2419, specialties: JSON.stringify(["dogs", "cats", "dermatology"]), emergency: false },
      { name: "Centro Veterinario Fuorigrotta", address: "Via Terracina 68", city: "Napoli", region: "Campania", postalCode: "80125", phone: "+39 081 239 5678", lat: 40.8264, lng: 14.1880, specialties: JSON.stringify(["dogs", "cats", "birds"]), emergency: false },
      // Torino
      { name: "Clinica Veterinaria Torino Centro", address: "Corso Re Umberto 56", city: "Torino", region: "Piemonte", postalCode: "10128", phone: "+39 011 562 3410", email: "info@vettorinocentro.it", website: "https://www.vettorinocentro.it", lat: 45.0597, lng: 7.6733, specialties: JSON.stringify(["dogs", "cats", "surgery", "dentistry"]), emergency: true },
      { name: "Ambulatorio Veterinario San Salvario", address: "Via Madama Cristina 80", city: "Torino", region: "Piemonte", postalCode: "10126", phone: "+39 011 669 8432", lat: 45.0491, lng: 7.6782, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
      { name: "Centro Veterinario Lingotto", address: "Via Nizza 262", city: "Torino", region: "Piemonte", postalCode: "10126", phone: "+39 011 617 3290", lat: 45.0325, lng: 7.6710, specialties: JSON.stringify(["dogs", "cats", "exotic", "birds"]), emergency: false },
      // Firenze
      { name: "Clinica Veterinaria Firenze", address: "Viale dei Mille 32", city: "Firenze", region: "Toscana", postalCode: "50131", phone: "+39 055 572 0184", email: "info@vetfirenze.it", website: "https://www.vetfirenze.it", lat: 43.7819, lng: 11.2745, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Oltrarno", address: "Via Romana 55", city: "Firenze", region: "Toscana", postalCode: "50125", phone: "+39 055 229 3467", lat: 43.7652, lng: 11.2488, specialties: JSON.stringify(["dogs", "cats", "dermatology"]), emergency: false },
      { name: "Centro Veterinario Campo di Marte", address: "Viale Fanti 100", city: "Firenze", region: "Toscana", postalCode: "50137", phone: "+39 055 601 2345", lat: 43.7783, lng: 11.2813, specialties: JSON.stringify(["dogs", "cats", "cardiology"]), emergency: false },
      // Bologna
      { name: "Clinica Veterinaria Bologna", address: "Via Saragozza 142", city: "Bologna", region: "Emilia-Romagna", postalCode: "40135", phone: "+39 051 614 5678", email: "info@vetbologna.it", lat: 44.4851, lng: 11.3262, specialties: JSON.stringify(["dogs", "cats", "surgery", "exotic"]), emergency: true },
      { name: "Ambulatorio Veterinario Santo Stefano", address: "Via Santo Stefano 70", city: "Bologna", region: "Emilia-Romagna", postalCode: "40125", phone: "+39 051 234 8765", lat: 44.4912, lng: 11.3540, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
      // Genova
      { name: "Clinica Veterinaria Genova", address: "Via XX Settembre 45", city: "Genova", region: "Liguria", postalCode: "16121", phone: "+39 010 593 2100", email: "info@vetgenova.it", lat: 44.4072, lng: 8.9349, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Nervi", address: "Via Oberdan 22", city: "Genova", region: "Liguria", postalCode: "16167", phone: "+39 010 321 9876", lat: 44.3819, lng: 8.9792, specialties: JSON.stringify(["dogs", "cats", "birds"]), emergency: false },
      // Venezia / Padova
      { name: "Clinica Veterinaria Mestre", address: "Via Cappuccina 35", city: "Mestre", region: "Veneto", postalCode: "30172", phone: "+39 041 531 2456", email: "info@vetmestre.it", lat: 45.4908, lng: 12.2388, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Padova", address: "Via Roma 88", city: "Padova", region: "Veneto", postalCode: "35122", phone: "+39 049 875 1234", lat: 45.4077, lng: 11.8773, specialties: JSON.stringify(["dogs", "cats", "dentistry"]), emergency: false },
      // Palermo
      { name: "Clinica Veterinaria Palermo", address: "Via Libertà 215", city: "Palermo", region: "Sicilia", postalCode: "90143", phone: "+39 091 611 2345", email: "info@vetpalermo.it", lat: 38.1277, lng: 13.3418, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Mondello", address: "Via Galatea 12", city: "Palermo", region: "Sicilia", postalCode: "90151", phone: "+39 091 450 6789", lat: 38.1810, lng: 13.3220, specialties: JSON.stringify(["dogs", "cats", "exotic"]), emergency: false },
      // Catania
      { name: "Clinica Veterinaria Catania", address: "Via Etnea 305", city: "Catania", region: "Sicilia", postalCode: "95125", phone: "+39 095 431 2345", email: "info@vetcatania.it", lat: 37.5110, lng: 15.0870, specialties: JSON.stringify(["dogs", "cats", "surgery", "cardiology"]), emergency: true },
      // Bari
      { name: "Clinica Veterinaria Bari", address: "Via Sparano 112", city: "Bari", region: "Puglia", postalCode: "70121", phone: "+39 080 524 6789", email: "info@vetbari.it", lat: 41.1241, lng: 16.8692, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      { name: "Ambulatorio Veterinario Poggiofranco", address: "Via Orabona 4", city: "Bari", region: "Puglia", postalCode: "70125", phone: "+39 080 597 1234", lat: 41.1099, lng: 16.8780, specialties: JSON.stringify(["dogs", "cats", "dermatology"]), emergency: false },
      // Verona
      { name: "Clinica Veterinaria Verona", address: "Via Mameli 14", city: "Verona", region: "Veneto", postalCode: "37126", phone: "+39 045 803 4567", email: "info@vetverona.it", lat: 45.4386, lng: 10.9916, specialties: JSON.stringify(["dogs", "cats", "surgery", "dentistry"]), emergency: true },
      // Cagliari
      { name: "Clinica Veterinaria Cagliari", address: "Via Roma 120", city: "Cagliari", region: "Sardegna", postalCode: "09124", phone: "+39 070 664 5678", email: "info@vetcagliari.it", lat: 39.2167, lng: 9.1150, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      // Perugia
      { name: "Ambulatorio Veterinario Perugia", address: "Corso Vannucci 58", city: "Perugia", region: "Umbria", postalCode: "06121", phone: "+39 075 572 3456", lat: 43.1107, lng: 12.3908, specialties: JSON.stringify(["dogs", "cats", "exotic"]), emergency: false },
      // Trieste
      { name: "Clinica Veterinaria Trieste", address: "Via Carducci 30", city: "Trieste", region: "Friuli-Venezia Giulia", postalCode: "34122", phone: "+39 040 363 2100", email: "info@vettrieste.it", lat: 45.6495, lng: 13.7768, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      // Trento
      { name: "Ambulatorio Veterinario Trento", address: "Via Brennero 100", city: "Trento", region: "Trentino-Alto Adige", postalCode: "38121", phone: "+39 0461 234 567", lat: 46.0748, lng: 11.1217, specialties: JSON.stringify(["dogs", "cats", "birds"]), emergency: false },
      // Ancona
      { name: "Clinica Veterinaria Ancona", address: "Corso Garibaldi 85", city: "Ancona", region: "Marche", postalCode: "60121", phone: "+39 071 202 3456", email: "info@vetancona.it", lat: 43.6158, lng: 13.5184, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      // L'Aquila
      { name: "Ambulatorio Veterinario L'Aquila", address: "Via Strinella 20", city: "L'Aquila", region: "Abruzzo", postalCode: "67100", phone: "+39 0862 413 567", lat: 42.3498, lng: 13.3995, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
      // Campobasso
      { name: "Ambulatorio Veterinario Campobasso", address: "Via Ferrari 15", city: "Campobasso", region: "Molise", postalCode: "86100", phone: "+39 0874 311 234", lat: 41.5603, lng: 14.6627, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
      // Potenza
      { name: "Clinica Veterinaria Potenza", address: "Via Pretoria 180", city: "Potenza", region: "Basilicata", postalCode: "85100", phone: "+39 0971 412 345", email: "info@vetpotenza.it", lat: 40.6404, lng: 15.8056, specialties: JSON.stringify(["dogs", "cats", "surgery"]), emergency: true },
      // Catanzaro
      { name: "Ambulatorio Veterinario Catanzaro", address: "Corso Mazzini 200", city: "Catanzaro", region: "Calabria", postalCode: "88100", phone: "+39 0961 723 456", lat: 38.9047, lng: 16.5942, specialties: JSON.stringify(["dogs", "cats", "exotic"]), emergency: false },
      // Aosta
      { name: "Ambulatorio Veterinario Aosta", address: "Via Festaz 30", city: "Aosta", region: "Valle d'Aosta", postalCode: "11100", phone: "+39 0165 236 789", lat: 45.7370, lng: 7.3186, specialties: JSON.stringify(["dogs", "cats"]), emergency: false },
    ],
  });

  console.log("Seeded:", { user: user.email, pet: pet.name, vets: 40 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
