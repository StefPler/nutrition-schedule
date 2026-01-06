import { ActivityLevel, Gender, UserProfile, WeightLossPerWeek } from "../types/userProfile";

export const ReferenceBMIData = {
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

export const macroCalculator = (
  userProfile: UserProfile,
  proteinPerKg: number = 1.35,
  fatPerKg: number = 0.7,
  carbsPerKg: number = 2.5,
  fiberPerKg: number = 0.35
) => {
  // BMR: Mifflin-St Jeor
  const bmr =
    userProfile.gender === "male"
      ? 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5
      : 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
  const tdee = bmr * userProfile.activityLevel;
  const dailyCalories = tdee - userProfile.weightLossPerWeek;

  const protein = userProfile.weight * proteinPerKg;
  const fat = userProfile.weight * fatPerKg;
  const carbs = userProfile.weight * carbsPerKg;
  const fiber = userProfile.weight * fiberPerKg;

  return {
    dailyCalories: Math.round(dailyCalories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
    fiber: Math.round(fiber),
  };
};

export const calorieMealDistribution = (totalCals: number) => {
  const breakfast = Math.round(totalCals * 0.2);
  const lunch = Math.round(totalCals * 0.35);
  const dinner = Math.round(totalCals * 0.3);
  const snacks = Math.round(totalCals * 0.15);

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
  };
};
