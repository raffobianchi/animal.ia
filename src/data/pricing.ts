// Pricing model for animal.ia — pure TS port of "Animal.ia v4.xlsx"
// Final = pure_premium × breed_factor × health_mult × (1 + expense + commission + margin) + vet_visit
// where pure_premium = base_freq × stage_factor × base_severity × area_factor

export type Species = "dog" | "cat";
export type Stage = "juvenile" | "adult" | "senior";
export type Area = "north_west" | "north_east" | "center" | "south" | "islands";
export type BreedRisk = "low" | "mid" | "high";
export type VetVisits = "0-1" | "2-4" | "5+";

export type Region =
  | "lombardia" | "piemonte" | "liguria" | "valle_aosta"
  | "veneto" | "trentino" | "friuli" | "emilia_romagna"
  | "toscana" | "umbria" | "marche" | "lazio"
  | "abruzzo" | "molise" | "campania" | "puglia" | "basilicata" | "calabria"
  | "sicilia" | "sardegna";

// ── Constants (Key Inputs sheet) ────────────────────────────────────────────
export const BASE_FREQUENCY: Record<Species, number> = { dog: 0.28, cat: 0.20 };
export const BASE_SEVERITY: Record<Species, number> = { dog: 550, cat: 350 };
export const EXPENSE_RATIO = 0.25;
export const COMMISSION_RATIO = 0.10;
export const TARGET_MARGIN = 0.15;
export const LOADINGS = 1 + EXPENSE_RATIO + COMMISSION_RATIO + TARGET_MARGIN; // 1.50
export const VET_VISIT_COST = 70;

// ── Stage factors (Age & Geo_Factors sheet) ─────────────────────────────────
export const STAGE_FACTOR: Record<Stage, number> = {
  juvenile: 0.85,
  adult: 1.0,
  senior: 1.65,
};

// Canonical age → stage thresholds
export function ageToStage(species: Species, ageYears: number): Stage {
  if (species === "dog") {
    if (ageYears < 1) return "juvenile";
    if (ageYears < 7) return "adult";
    return "senior";
  }
  if (ageYears < 1) return "juvenile";
  if (ageYears < 10) return "adult";
  return "senior";
}

// ── Area factors ────────────────────────────────────────────────────────────
export const AREA_FACTOR: Record<Area, number> = {
  north_west: 1.15,
  north_east: 1.10,
  center: 1.05,
  south: 1.15,
  islands: 1.0,
};

// 20 Italian regions → 5 macro-areas
export const REGIONS: { id: Region; area: Area }[] = [
  { id: "lombardia", area: "north_west" },
  { id: "piemonte", area: "north_west" },
  { id: "liguria", area: "north_west" },
  { id: "valle_aosta", area: "north_west" },
  { id: "veneto", area: "north_east" },
  { id: "trentino", area: "north_east" },
  { id: "friuli", area: "north_east" },
  { id: "emilia_romagna", area: "north_east" },
  { id: "toscana", area: "center" },
  { id: "umbria", area: "center" },
  { id: "marche", area: "center" },
  { id: "lazio", area: "center" },
  { id: "abruzzo", area: "south" },
  { id: "molise", area: "south" },
  { id: "campania", area: "south" },
  { id: "puglia", area: "south" },
  { id: "basilicata", area: "south" },
  { id: "calabria", area: "south" },
  { id: "sicilia", area: "islands" },
  { id: "sardegna", area: "islands" },
];

export function regionToArea(region: Region): Area {
  const r = REGIONS.find((x) => x.id === region);
  if (!r) throw new Error(`Unknown region: ${region}`);
  return r.area;
}

// ── Breed factors (Breed_factors sheet — class average) ─────────────────────
// Per-class average adjusted risk used in the pricing grid
export const BREED_FACTOR: Record<Species, Record<BreedRisk, number>> = {
  dog: { low: 1.028, mid: 1.368, high: 2.017 },
  cat: { low: 0.97, mid: 1.373, high: 1.85 },
};

export type Breed = {
  id: string;
  species: Species;
  risk: BreedRisk;
};

// 15 dog breeds + 16 cat breeds; everything else falls back to non_pedigree_*
export const BREEDS: Breed[] = [
  // Dogs
  { id: "non_pedigree_dog", species: "dog", risk: "low" },
  { id: "labrador", species: "dog", risk: "mid" },
  { id: "german_shepherd", species: "dog", risk: "mid" },
  { id: "french_bulldog", species: "dog", risk: "high" },
  { id: "jack_russell", species: "dog", risk: "mid" },
  { id: "golden_retriever", species: "dog", risk: "mid" },
  { id: "chihuahua", species: "dog", risk: "mid" },
  { id: "yorkshire", species: "dog", risk: "mid" },
  { id: "maltese", species: "dog", risk: "low" },
  { id: "poodle", species: "dog", risk: "low" },
  { id: "dachshund", species: "dog", risk: "high" },
  { id: "border_collie", species: "dog", risk: "low" },
  { id: "boxer", species: "dog", risk: "mid" },
  { id: "rottweiler", species: "dog", risk: "high" },
  { id: "cocker_spaniel", species: "dog", risk: "mid" },
  // Cats
  { id: "non_pedigree_cat", species: "cat", risk: "low" },
  { id: "european_shorthair", species: "cat", risk: "low" },
  { id: "maine_coon", species: "cat", risk: "high" },
  { id: "persian", species: "cat", risk: "high" },
  { id: "british_shorthair", species: "cat", risk: "mid" },
  { id: "siamese", species: "cat", risk: "mid" },
  { id: "ragdoll", species: "cat", risk: "mid" },
  { id: "bengal", species: "cat", risk: "mid" },
  { id: "sphynx", species: "cat", risk: "high" },
  { id: "scottish_fold", species: "cat", risk: "high" },
  { id: "abyssinian", species: "cat", risk: "mid" },
  { id: "norwegian_forest", species: "cat", risk: "mid" },
  { id: "oriental", species: "cat", risk: "mid" },
  { id: "russian_blue", species: "cat", risk: "low" },
  { id: "savannah", species: "cat", risk: "mid" },
  { id: "birman", species: "cat", risk: "mid" },
];

export function breedsForSpecies(species: Species): Breed[] {
  return BREEDS.filter((b) => b.species === species);
}

export function getBreed(id: string): Breed {
  const b = BREEDS.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown breed: ${id}`);
  return b;
}

// ── Health questionnaire (Pricing_Mask sheet) ───────────────────────────────
// v4 of the spreadsheet keeps the multiplier flat at 1.0; we apply small
// increments for live UX feedback. Tune these in one place when actuarial
// guidance lands.
export type HealthAnswers = {
  previousSurgery: boolean;
  chronicCondition: boolean;
  regularMedication: boolean;
  vetVisits: VetVisits;
};

export const HEALTH_DEFAULTS: HealthAnswers = {
  previousSurgery: false,
  chronicCondition: false,
  regularMedication: false,
  vetVisits: "0-1",
};

export function healthMultiplier(h: HealthAnswers): number {
  let m = 1;
  if (h.previousSurgery) m += 0.05;
  if (h.chronicCondition) m += 0.15;
  if (h.regularMedication) m += 0.10;
  if (h.vetVisits === "2-4") m += 0.05;
  if (h.vetVisits === "5+") m += 0.10;
  return Math.round(m * 100) / 100;
}

export type HealthClass = "healthy" | "watch" | "elevated";
export function healthClass(m: number): HealthClass {
  if (m <= 1.05) return "healthy";
  if (m <= 1.2) return "watch";
  return "elevated";
}

// ── Quote calculation ───────────────────────────────────────────────────────
export type QuoteInput = {
  species: Species;
  breedId: string;
  ageYears: number;
  region: Region;
  health: HealthAnswers;
};

export type QuoteBreakdown = {
  // Inputs (resolved)
  species: Species;
  stage: Stage;
  area: Area;
  breedRisk: BreedRisk;
  // Factors
  baseFrequency: number;
  baseSeverity: number;
  stageFactor: number;
  areaFactor: number;
  breedFactor: number;
  healthMult: number;
  // Premium build-up
  pureRaw: number;     // base_freq × stage × base_sev × area
  pureBreed: number;   // pureRaw × breed
  pureHealth: number;  // pureBreed × health
  loadings: number;    // 1 + expense + commission + margin
  vetCost: number;
  finalAnnual: number;
  finalMonthly: number;
};

export function computeQuote(input: QuoteInput): QuoteBreakdown {
  const breed = getBreed(input.breedId);
  if (breed.species !== input.species) {
    throw new Error(`Breed ${input.breedId} does not match species ${input.species}`);
  }
  const stage = ageToStage(input.species, input.ageYears);
  const area = regionToArea(input.region);
  const baseFreq = BASE_FREQUENCY[input.species];
  const baseSev = BASE_SEVERITY[input.species];
  const stageF = STAGE_FACTOR[stage];
  const areaF = AREA_FACTOR[area];
  const breedF = BREED_FACTOR[input.species][breed.risk];
  const healthM = healthMultiplier(input.health);

  const pureRaw = baseFreq * stageF * baseSev * areaF;
  const pureBreed = pureRaw * breedF;
  const pureHealth = pureBreed * healthM;
  const finalAnnual = pureHealth * LOADINGS + VET_VISIT_COST;
  const finalMonthly = finalAnnual / 12;

  return {
    species: input.species,
    stage,
    area,
    breedRisk: breed.risk,
    baseFrequency: baseFreq,
    baseSeverity: baseSev,
    stageFactor: stageF,
    areaFactor: areaF,
    breedFactor: breedF,
    healthMult: healthM,
    pureRaw,
    pureBreed,
    pureHealth,
    loadings: LOADINGS,
    vetCost: VET_VISIT_COST,
    finalAnnual,
    finalMonthly,
  };
}
