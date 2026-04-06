export type PlanTier = "basic" | "standard" | "premium";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "denied"
  | "paid";

export type Species = "dog" | "cat" | "rabbit" | "bird" | "other";

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  weight: number;
  photoUrl?: string;
  vaccinated: boolean;
  sterilized: boolean;
  chronicConditions: boolean;
  allergies: string;
}

export interface Policy {
  id: string;
  petId: string;
  plan: PlanTier;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  monthlyPremium: number;
  coverageDetails: string[];
}

export interface Claim {
  id: string;
  policyId: string;
  petId: string;
  status: ClaimStatus;
  description: string;
  incidentDate: string;
  submittedDate: string;
  vetName: string;
  amount: number;
  documents: string[];
  statusHistory: { status: ClaimStatus; date: string; note: string }[];
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  type: "visit" | "vaccine" | "treatment" | "surgery" | "checkup";
  title: string;
  description: string;
  vetName: string;
}

export interface PetDocument {
  id: string;
  petId: string;
  type: "passport" | "vaccination_card" | "microchip" | "adoption" | "other";
  name: string;
  uploadDate: string;
  fileUrl: string;
}
