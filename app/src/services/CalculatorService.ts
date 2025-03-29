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

export const calcBodyFat = (
  age: number,
  weight: number,
  height: number,
  neck: number,
  waist: number
) => {
  const bodyFat =
    495 /
      (1.0324 -
        0.19077 * Math.log10(waist - neck) +
        0.15456 * Math.log10(height)) -
    450;

  const bmi = calcBMI(weight, height);
  const bmiFat = 1.2 * bmi + 0.23 * age - 16.2;
  return {
    range: [bodyFat.toFixed(2), bmiFat.toFixed(2)],
    bmiFatFormula: bmiFat.toFixed(2),
    usNavyFatFormula: bodyFat.toFixed(2),
  };
};

export enum ActivityLevel {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
}

export enum WeightLossPerWeek {
  Maintain = 1,
  QuarterKg = 0.91,
  HalfKg = 0.82,
  OneKg = 0.64,
}

export const macroCalculator = (
  weight: number,
  height: number,
  age: number,
  weightLossPerWeekTarget: WeightLossPerWeek,
  activityLevel: number
) => {
  const bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  const tdee = bmr * activityLevel;
  const dailyCalories = tdee * weightLossPerWeekTarget;
  const protein = weight * 1.8;
  const fat = (dailyCalories * 0.25) / 9;
  const carbs = (dailyCalories - protein - fat * 9) / 4;

  return {
    dailyCalories: dailyCalories,
    protein: protein,
    fat: fat,
    carbs: carbs,
  };
};
