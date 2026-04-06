import type { Pet, Policy, Claim, MedicalRecord, PetDocument } from "./types";

export const mockPet: Pet = {
  id: "pet-1",
  name: "Luna",
  species: "dog",
  breed: "Golden Retriever",
  age: 4,
  weight: 28,
  vaccinated: true,
  sterilized: true,
  chronicConditions: false,
  allergies: "",
};

export const mockPolicy: Policy = {
  id: "pol-1",
  petId: "pet-1",
  plan: "standard",
  status: "active",
  startDate: "2026-01-15",
  endDate: "2027-01-15",
  monthlyPremium: 19.99,
  coverageDetails: [
    "Accident coverage",
    "Illness coverage",
    "Unlimited claims",
    "Priority support",
    "Vaccine reminders",
  ],
};

export const mockClaims: Claim[] = [
  {
    id: "clm-1",
    policyId: "pol-1",
    petId: "pet-1",
    status: "paid",
    description: "Emergency vet visit — Luna ingested a foreign object",
    incidentDate: "2026-02-10",
    submittedDate: "2026-02-11",
    vetName: "Dr. Rossi",
    amount: 320,
    documents: ["invoice-rossi.pdf"],
    statusHistory: [
      { status: "submitted", date: "2026-02-11", note: "Claim submitted" },
      { status: "under_review", date: "2026-02-13", note: "Under review by our team" },
      { status: "approved", date: "2026-02-18", note: "Claim approved — €320" },
      { status: "paid", date: "2026-02-22", note: "Payment sent to your account" },
    ],
  },
  {
    id: "clm-2",
    policyId: "pol-1",
    petId: "pet-1",
    status: "under_review",
    description: "Skin allergy treatment and medication",
    incidentDate: "2026-03-20",
    submittedDate: "2026-03-21",
    vetName: "Dr. Bianchi",
    amount: 150,
    documents: ["invoice-bianchi.pdf", "prescription.pdf"],
    statusHistory: [
      { status: "submitted", date: "2026-03-21", note: "Claim submitted" },
      { status: "under_review", date: "2026-03-23", note: "Under review by our team" },
    ],
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "rec-1",
    petId: "pet-1",
    date: "2026-03-20",
    type: "visit",
    title: "Dermatology visit",
    description: "Skin irritation on belly area. Prescribed medicated shampoo and antihistamines.",
    vetName: "Dr. Bianchi",
  },
  {
    id: "rec-2",
    petId: "pet-1",
    date: "2026-02-10",
    type: "surgery",
    title: "Foreign object removal",
    description: "Emergency endoscopy to remove ingested sock. Successful recovery.",
    vetName: "Dr. Rossi",
  },
  {
    id: "rec-3",
    petId: "pet-1",
    date: "2026-01-05",
    type: "vaccine",
    title: "Annual vaccination",
    description: "Rabies booster and DHPP vaccine administered.",
    vetName: "Dr. Verdi",
  },
  {
    id: "rec-4",
    petId: "pet-1",
    date: "2025-09-12",
    type: "checkup",
    title: "Routine checkup",
    description: "All vitals normal. Weight stable at 28kg. Teeth in good condition.",
    vetName: "Dr. Verdi",
  },
];

export const mockDocuments: PetDocument[] = [
  {
    id: "doc-1",
    petId: "pet-1",
    type: "passport",
    name: "Pet Passport — Luna",
    uploadDate: "2025-06-10",
    fileUrl: "#",
  },
  {
    id: "doc-2",
    petId: "pet-1",
    type: "vaccination_card",
    name: "Vaccination Card 2026",
    uploadDate: "2026-01-05",
    fileUrl: "#",
  },
  {
    id: "doc-3",
    petId: "pet-1",
    type: "microchip",
    name: "Microchip Certificate",
    uploadDate: "2022-08-20",
    fileUrl: "#",
  },
];

export const planPricing: Record<string, { name: string; price: number }> = {
  basic: { name: "Base", price: 9.99 },
  standard: { name: "Standard", price: 19.99 },
  premium: { name: "Premium", price: 34.99 },
};
