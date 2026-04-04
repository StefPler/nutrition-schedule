export enum ActivityLevel {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
}

export enum WeightLossRate {
  Maintain = 0,
  Conservative = 0.15,
  Moderate = 0.20,
  Aggressive = 0.25,
}

export type Gender = "male" | "female";

export type UserProfile = {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  weightLossRate: WeightLossRate;
  activityLevel: ActivityLevel;
};

const validWeightLossRates = new Set(Object.values(WeightLossRate));
const validActivityLevels = new Set(Object.values(ActivityLevel));

export const isValidUserProfile = (value: unknown): value is UserProfile => {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.weight === "number" &&
    typeof v.height === "number" &&
    typeof v.age === "number" &&
    (v.gender === "male" || v.gender === "female") &&
    validWeightLossRates.has(v.weightLossRate as WeightLossRate) &&
    validActivityLevels.has(v.activityLevel as ActivityLevel)
  );
};
