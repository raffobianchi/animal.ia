import { describe, expect, it } from "vitest";
import {
  ageToStage,
  regionToArea,
  healthMultiplier,
  healthClass,
  getBreed,
  breedsForSpecies,
  computeQuote,
  HEALTH_DEFAULTS,
  LOADINGS,
  VET_VISIT_COST,
  type HealthAnswers,
} from "./pricing";

// ── ageToStage ──────────────────────────────────────────────────────────────

describe("ageToStage", () => {
  it("dog: < 1 → juvenile", () => {
    expect(ageToStage("dog", 0)).toBe("juvenile");
    expect(ageToStage("dog", 0.99)).toBe("juvenile");
  });

  it("dog: 1 to < 7 → adult", () => {
    expect(ageToStage("dog", 1)).toBe("adult");
    expect(ageToStage("dog", 6.99)).toBe("adult");
  });

  it("dog: >= 7 → senior", () => {
    expect(ageToStage("dog", 7)).toBe("senior");
    expect(ageToStage("dog", 10)).toBe("senior");
  });

  it("cat: < 1 → juvenile", () => {
    expect(ageToStage("cat", 0)).toBe("juvenile");
    expect(ageToStage("cat", 0.99)).toBe("juvenile");
  });

  it("cat: 1 to < 10 → adult", () => {
    expect(ageToStage("cat", 1)).toBe("adult");
    expect(ageToStage("cat", 9.99)).toBe("adult");
  });

  it("cat: >= 10 → senior", () => {
    expect(ageToStage("cat", 10)).toBe("senior");
  });
});

// ── regionToArea ────────────────────────────────────────────────────────────

describe("regionToArea", () => {
  it("maps lombardia → north_west", () => {
    expect(regionToArea("lombardia")).toBe("north_west");
  });

  it("maps veneto → north_east", () => {
    expect(regionToArea("veneto")).toBe("north_east");
  });

  it("maps toscana → center", () => {
    expect(regionToArea("toscana")).toBe("center");
  });

  it("maps campania → south", () => {
    expect(regionToArea("campania")).toBe("south");
  });

  it("maps sicilia → islands", () => {
    expect(regionToArea("sicilia")).toBe("islands");
  });

  it("throws on unknown region", () => {
    // @ts-expect-error testing invalid input
    expect(() => regionToArea("atlantide")).toThrow("Unknown region");
  });
});

// ── healthMultiplier ────────────────────────────────────────────────────────

describe("healthMultiplier", () => {
  it("returns 1.0 for all defaults", () => {
    expect(healthMultiplier(HEALTH_DEFAULTS)).toBe(1.0);
  });

  it("adds 0.05 for previousSurgery", () => {
    expect(healthMultiplier({ ...HEALTH_DEFAULTS, previousSurgery: true })).toBe(1.05);
  });

  it("adds 0.15 for chronicCondition", () => {
    expect(healthMultiplier({ ...HEALTH_DEFAULTS, chronicCondition: true })).toBe(1.15);
  });

  it("adds 0.10 for regularMedication", () => {
    expect(healthMultiplier({ ...HEALTH_DEFAULTS, regularMedication: true })).toBe(1.1);
  });

  it("adds 0.05 for vetVisits 2-4", () => {
    expect(healthMultiplier({ ...HEALTH_DEFAULTS, vetVisits: "2-4" })).toBe(1.05);
  });

  it("adds 0.10 for vetVisits 5+", () => {
    expect(healthMultiplier({ ...HEALTH_DEFAULTS, vetVisits: "5+" })).toBe(1.1);
  });

  it("stacks all flags to 1.4", () => {
    const all: HealthAnswers = {
      previousSurgery: true,
      chronicCondition: true,
      regularMedication: true,
      vetVisits: "5+",
    };
    // 1 + 0.05 + 0.15 + 0.10 + 0.10 = 1.40
    expect(healthMultiplier(all)).toBe(1.4);
  });
});

// ── healthClass ─────────────────────────────────────────────────────────────

describe("healthClass", () => {
  it("healthy at 1.0", () => {
    expect(healthClass(1.0)).toBe("healthy");
  });

  it("healthy at boundary 1.05", () => {
    expect(healthClass(1.05)).toBe("healthy");
  });

  it("watch just above 1.05", () => {
    expect(healthClass(1.06)).toBe("watch");
  });

  it("watch at boundary 1.2", () => {
    expect(healthClass(1.2)).toBe("watch");
  });

  it("elevated above 1.2", () => {
    expect(healthClass(1.21)).toBe("elevated");
  });
});

// ── getBreed / breedsForSpecies ─────────────────────────────────────────────

describe("getBreed", () => {
  it("returns labrador as mid-risk dog", () => {
    const b = getBreed("labrador");
    expect(b.species).toBe("dog");
    expect(b.risk).toBe("mid");
  });

  it("returns maine_coon as high-risk cat", () => {
    const b = getBreed("maine_coon");
    expect(b.species).toBe("cat");
    expect(b.risk).toBe("high");
  });

  it("throws on unknown breed", () => {
    expect(() => getBreed("unicorn")).toThrow("Unknown breed");
  });
});

describe("breedsForSpecies", () => {
  it("returns 15 dog breeds", () => {
    expect(breedsForSpecies("dog")).toHaveLength(15);
  });

  it("returns 16 cat breeds", () => {
    expect(breedsForSpecies("cat")).toHaveLength(16);
  });
});

// ── computeQuote ────────────────────────────────────────────────────────────

describe("computeQuote", () => {
  it("adult dog, low risk, healthy, north_west", () => {
    // base_freq=0.28, stage=1.0, base_sev=550, area=1.15
    // pureRaw = 0.28 * 1.0 * 550 * 1.15 = 177.10
    // breed_factor(dog, low) = 1.028
    // pureBreed = 177.10 * 1.028 = 182.0588
    // health = 1.0 → pureHealth = 182.0588
    // final = 182.0588 * 1.50 + 70 = 343.0882
    const q = computeQuote({
      species: "dog",
      breedId: "non_pedigree_dog",
      ageYears: 3,
      region: "lombardia",
      health: HEALTH_DEFAULTS,
    });
    expect(q.stage).toBe("adult");
    expect(q.area).toBe("north_west");
    expect(q.breedRisk).toBe("low");
    expect(q.healthMult).toBe(1.0);
    expect(q.finalAnnual).toBeCloseTo(343.0882, 2);
    expect(q.finalMonthly).toBeCloseTo(q.finalAnnual / 12, 2);
  });

  it("senior cat, high risk, elevated health, islands", () => {
    // base_freq=0.20, stage=1.65, base_sev=350, area=1.0
    // pureRaw = 0.20 * 1.65 * 350 * 1.0 = 115.50
    // breed_factor(cat, high) = 1.85
    // pureBreed = 115.50 * 1.85 = 213.675
    // health: chronicCondition + regularMedication = 1 + 0.15 + 0.10 = 1.25
    // pureHealth = 213.675 * 1.25 = 267.09375
    // final = 267.09375 * 1.50 + 70 = 470.640625
    const q = computeQuote({
      species: "cat",
      breedId: "maine_coon",
      ageYears: 12,
      region: "sicilia",
      health: {
        ...HEALTH_DEFAULTS,
        chronicCondition: true,
        regularMedication: true,
      },
    });
    expect(q.stage).toBe("senior");
    expect(q.area).toBe("islands");
    expect(q.breedRisk).toBe("high");
    expect(q.healthMult).toBe(1.25);
    expect(q.finalAnnual).toBeCloseTo(470.6406, 2);
    expect(q.finalMonthly).toBeCloseTo(q.finalAnnual / 12, 2);
  });

  it("juvenile dog, high risk, center region, all health flags", () => {
    // base_freq=0.28, stage=0.85, base_sev=550, area=1.05
    // pureRaw = 0.28 * 0.85 * 550 * 1.05 = 137.445
    // breed_factor(dog, high) = 2.017
    // pureBreed = 137.445 * 2.017 = 277.224465
    // health = 1.4 → pureHealth = 277.224465 * 1.4 = 388.114251
    // final = 388.114251 * 1.50 + 70 = 652.1713765
    const q = computeQuote({
      species: "dog",
      breedId: "french_bulldog",
      ageYears: 0.5,
      region: "toscana",
      health: {
        previousSurgery: true,
        chronicCondition: true,
        regularMedication: true,
        vetVisits: "5+",
      },
    });
    expect(q.stage).toBe("juvenile");
    expect(q.area).toBe("center");
    expect(q.breedRisk).toBe("high");
    expect(q.healthMult).toBe(1.4);
    expect(q.finalAnnual).toBeCloseTo(652.1714, 2);
    expect(q.finalMonthly).toBeCloseTo(q.finalAnnual / 12, 2);
  });

  it("throws when breed species mismatches input species", () => {
    expect(() =>
      computeQuote({
        species: "cat",
        breedId: "labrador",
        ageYears: 3,
        region: "lazio",
        health: HEALTH_DEFAULTS,
      }),
    ).toThrow("does not match species");
  });

  it("monthly is exactly annual / 12", () => {
    const q = computeQuote({
      species: "dog",
      breedId: "labrador",
      ageYears: 5,
      region: "puglia",
      health: HEALTH_DEFAULTS,
    });
    expect(q.finalMonthly).toBe(q.finalAnnual / 12);
  });
});
