import { Meal } from "./period";

export type FoodMacroEntry = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  isFreeVegetable?: boolean;
};

export type Ingredient = {
  label: string;
  macroKey: string;
  baseAmountGrams: number;
  isFreeVegetable?: boolean;
};

export type ScaledIngredient = {
  label: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  isFreeVegetable: boolean;
};

export type MealPortion = {
  mealKey: Meal;
  calorieBudget: number;
  scaledIngredients: ScaledIngredient[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  warnings: string[];
};
