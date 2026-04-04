import { UserProfile } from "../types/userProfile";

export const ReferenceBMIData = {
  underweight: "<18.5 kg/m^2",
  healthyRange: "18.5 - 25 kg/m^2",
  overweight: "25 - 30 kg/m^2",
  obeseI: "30 - 35 kg/m^2",
  obeseII: "35 - 40 kg/m^2",
  obeseIII: "40+ kg/m^2",
};

export const calcBMI = (weight: number, height: number) => {
  return weight / Math.pow(height / 100, 2);
};

export const calcBodyFat = (age: number, weight: number, height: number, neck: number, waist: number) => {
  const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;

  const bmi = calcBMI(weight, height);
  const bmiFat = 1.2 * bmi + 0.23 * age - 16.2;
  return {
    range: [bodyFat.toFixed(2), bmiFat.toFixed(2)],
    bmiFatFormula: bmiFat.toFixed(2),
    usNavyFatFormula: bodyFat.toFixed(2),
  };
};

/**
 * Calculates the user's consumption calories based on their weight loss goals and activity levels.
 *
 * Protein and fat are set as g/kg (evidence-based floors), carbs are derived from
 * remaining calories to guarantee macros sum to the calorie target.
 * Fiber is a flat daily target (not body-weight dependent).
 */
export const macroCalculator = (
  userProfile: UserProfile,
  proteinPerKg: number = 1.6,
  fatPerKg: number = 0.8,
  fiberGrams: number = 28,
) => {
  // BMR: Mifflin-St Jeor
  const bmr =
    userProfile.gender === "male"
      ? 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5
      : 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;

  const tdee = bmr * userProfile.activityLevel;

  // Percentage-based deficit with a safe calorie floor
  const calorieFloor = userProfile.gender === "male" ? 1500 : 1200;
  const dailyCalories = Math.max(tdee * (1 - userProfile.weightLossRate), calorieFloor);

  // Protein and fat from body weight, carbs from remaining calories
  const protein = userProfile.weight * proteinPerKg;
  const fat = userProfile.weight * fatPerKg;
  const proteinCal = protein * 4;
  const fatCal = fat * 9;
  const carbs = Math.max((dailyCalories - proteinCal - fatCal) / 4, 0);

  return {
    dailyCalories: Math.round(dailyCalories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
    fiber: Math.round(fiberGrams),
  };
};
