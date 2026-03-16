import { FOOD_MACRO_DB, ZERO_MACRO } from "../constants/foodMacroDB";
import { FoodMacroEntry, Ingredient, MealPortion, ScaledIngredient } from "../types/nutrition";
import { DailySchedule, Meal } from "../types/period";
import { UserProfile } from "../types/userProfile";
import { calorieMealDistribution, macroCalculator } from "./CalculatorService";

export const lookupMacro = (macroKey: string, warnings: string[]): FoodMacroEntry => {
  const entry = FOOD_MACRO_DB[macroKey];
  if (entry) return entry;

  console.warn(`[PortionCalculator] Missing macroKey in FOOD_MACRO_DB: "${macroKey}"`);
  warnings.push(`Missing nutrition data for: ${macroKey}`);
  return ZERO_MACRO;
};

const isIngredientFree = (ing: Ingredient, macro: FoodMacroEntry): boolean => {
  return ing.isFreeVegetable ?? macro.isFreeVegetable ?? false;
};

export const calculateMealPortion = (ingredients: Ingredient[], mealKey: Meal, calorieBudget: number): MealPortion => {
  const warnings: string[] = [];

  if (!ingredients || ingredients.length === 0) {
    return {
      mealKey,
      calorieBudget,
      scaledIngredients: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      warnings,
    };
  }

  // Split into countable and free
  const countable: { ing: Ingredient; macro: FoodMacroEntry }[] = [];
  const free: { ing: Ingredient; macro: FoodMacroEntry }[] = [];

  for (const ing of ingredients) {
    const macro = lookupMacro(ing.macroKey, warnings);
    if (isIngredientFree(ing, macro)) {
      free.push({ ing, macro });
    } else {
      countable.push({ ing, macro });
    }
  }

  // Single reduction pass for countable ingredients
  const base = countable.reduce(
    (acc, { ing, macro }) => {
      const weight = ing.baseAmountGrams / 100;
      return {
        totalCal: acc.totalCal + macro.calories * weight,
        protein: acc.protein + macro.protein * weight,
        carbs: acc.carbs + macro.carbs * weight,
        fat: acc.fat + macro.fat * weight,
        fiber: acc.fiber + macro.fiber * weight,
      };
    },
    { totalCal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
  );

  // Scale factor
  let scale = base.totalCal > 0 ? calorieBudget / base.totalCal : 1;
  scale = Math.max(0.5, Math.min(1.5, scale));

  if (base.totalCal > 0 && (scale === 0.5 || scale === 1.5)) {
    const actual = Math.round(base.totalCal * scale);
    warnings.push(`Portion clamped at ${scale}x (${actual} cal vs ${Math.round(calorieBudget)} cal budget)`);
  }

  // Build scaled ingredients
  const scaledIngredients: ScaledIngredient[] = [];

  for (const { ing, macro } of countable) {
    const grams = Math.round(ing.baseAmountGrams * scale);
    scaledIngredients.push({
      label: ing.label,
      grams,
      calories: Math.round((macro.calories * grams) / 100),
      protein: Math.round(((macro.protein * grams) / 100) * 10) / 10,
      carbs: Math.round(((macro.carbs * grams) / 100) * 10) / 10,
      fat: Math.round(((macro.fat * grams) / 100) * 10) / 10,
      fiber: Math.round(((macro.fiber * grams) / 100) * 10) / 10,
      isFreeVegetable: false,
    });
  }

  for (const { ing, macro } of free) {
    const grams = ing.baseAmountGrams;
    scaledIngredients.push({
      label: ing.label,
      grams,
      calories: Math.round((macro.calories * grams) / 100),
      protein: Math.round(((macro.protein * grams) / 100) * 10) / 10,
      carbs: Math.round(((macro.carbs * grams) / 100) * 10) / 10,
      fat: Math.round(((macro.fat * grams) / 100) * 10) / 10,
      fiber: Math.round(((macro.fiber * grams) / 100) * 10) / 10,
      isFreeVegetable: true,
    });
  }

  // Total macros from base totals (avoids rounding accumulation)
  let totalCalories = Math.round(base.totalCal * scale);
  let totalProtein = Math.round(base.protein * scale * 10) / 10;
  let totalCarbs = Math.round(base.carbs * scale * 10) / 10;
  let totalFat = Math.round(base.fat * scale * 10) / 10;
  let totalFiber = Math.round(base.fiber * scale * 10) / 10;

  // Add free vegetable contributions
  for (const { ing, macro } of free) {
    const w = ing.baseAmountGrams / 100;
    totalCalories += Math.round(macro.calories * w);
    totalProtein += Math.round(macro.protein * w * 10) / 10;
    totalCarbs += Math.round(macro.carbs * w * 10) / 10;
    totalFat += Math.round(macro.fat * w * 10) / 10;
    totalFiber += Math.round(macro.fiber * w * 10) / 10;
  }

  return {
    mealKey,
    calorieBudget,
    scaledIngredients,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    warnings,
  };
};

export const getMealBudgets = (dailyCalories: number): Record<Meal, number> => {
  const dist = calorieMealDistribution(dailyCalories);
  const snackEach = Math.round(dist.snacks / 2);
  return {
    breakfast: dist.breakfast,
    snack1: snackEach,
    lunch: dist.lunch,
    snack2: snackEach,
    dinner: dist.dinner,
  };
};

const MEAL_KEYS: Meal[] = ["breakfast", "snack1", "lunch", "snack2", "dinner"];

export const calculateDayPortions = (userProfile: UserProfile, dayMeals: DailySchedule): Record<Meal, MealPortion> => {
  const { dailyCalories } = macroCalculator(userProfile);
  const budgets = getMealBudgets(dailyCalories);

const result = {} as Record<Meal, MealPortion>;

  for (const meal of MEAL_KEYS) {
    const entry = dayMeals[meal];
    let ingredients = entry.recipe?.ingredients ?? [];

    // Handle repeat_lunch: use lunch ingredients with dinner budget
    if (meal === "dinner" && entry.category === "repeat_lunch") {
      ingredients = dayMeals.lunch.recipe?.ingredients ?? [];
    }

    result[meal] = calculateMealPortion(ingredients, meal, budgets[meal]);
  }

  return result;
};
