export enum ActivityLevel {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
}

export enum WeightLossPerWeek {
  Maintain = 0,
  QuarterKg = 150,
  HalfKg = 300,
  OneKg = 500,
}

export type Gender = "male" | "female";

export type UserProfile = {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  weightLossPerWeek: WeightLossPerWeek;
  activityLevel: ActivityLevel;
};
