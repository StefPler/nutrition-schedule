import { FoodMacroEntry } from "../types/nutrition";

export const FOOD_MACRO_DB: Record<string, FoodMacroEntry> = {
  // Grains
  oats: { calories: 368, protein: 13.5, carbs: 58, fat: 7, fiber: 10.6 },
  rice: { calories: 130, protein: 2.4, carbs: 28, fat: 0.3, fiber: 0.4 },
  whole_wheat_pasta: { calories: 157, protein: 6.4, carbs: 30, fat: 1, fiber: 3.5 },
  couscous: { calories: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4 },
  tortilla_wrap: { calories: 300, protein: 8, carbs: 50, fat: 7, fiber: 5.2 },
  whole_wheat_bread: { calories: 247, protein: 9, carbs: 45, fat: 3.5, fiber: 6.8 },

  // Legumes (cooked)
  chickpeas: { calories: 164, protein: 9, carbs: 27, fat: 2.6, fiber: 7.6 },
  giant_beans: { calories: 127, protein: 8.6, carbs: 22.8, fat: 0.5, fiber: 5.4 },
  black_eyed_peas: { calories: 116, protein: 8, carbs: 21, fat: 0.5, fiber: 6.5 },
  lentils: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 },
  peas: { calories: 84, protein: 5.4, carbs: 15, fat: 0.4, fiber: 5.5 },

  // Proteins — Meat & Fish (cooked weight)
  chicken_breast: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  chicken_burger: { calories: 190, protein: 17, carbs: 5, fat: 12, fiber: 0.3 },
  chicken_skewer: { calories: 175, protein: 26, carbs: 1, fat: 7, fiber: 0 },
  ground_beef: { calories: 254, protein: 26, carbs: 0, fat: 17, fiber: 0 },
  tuna_in_water: { calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0 },
  salmon: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  eggs: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
  turkey_slice: { calories: 111, protein: 17, carbs: 2, fat: 3.6, fiber: 0 },

  // Dairy
  low_fat_cheese: { calories: 200, protein: 25, carbs: 2, fat: 10, fiber: 0 },
  protein_yogurt: { calories: 67, protein: 10, carbs: 4.5, fat: 1, fiber: 0 },
  yogurt_plain: { calories: 61, protein: 3.2, carbs: 7, fat: 1.5, fiber: 0 },
  milk: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.5, fiber: 0 },

  // Free vegetables
  salad_seasonal: { calories: 15, protein: 1.5, carbs: 2, fat: 0.2, fiber: 1.5, isFreeVegetable: true },
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, isFreeVegetable: true },
  carrot: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, isFreeVegetable: true },
  bell_pepper: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, isFreeVegetable: true },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, isFreeVegetable: true },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, isFreeVegetable: true },
  eggplant: { calories: 25, protein: 1, carbs: 5.9, fat: 0.2, fiber: 3, isFreeVegetable: true },
  okra: { calories: 33, protein: 2, carbs: 7.5, fat: 0.1, fiber: 3.2, isFreeVegetable: true },
  mushrooms: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, isFreeVegetable: true },
  spring_onion: { calories: 32, protein: 1.8, carbs: 7.3, fat: 0.2, fiber: 1.8, isFreeVegetable: true },

  // Fats & Condiments
  olive_oil: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  peanut_butter: { calories: 589, protein: 25, carbs: 20, fat: 50, fiber: 6 },
  honey: { calories: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2 },
  pesto_sauce: { calories: 289, protein: 4.7, carbs: 5, fat: 28, fiber: 1.2 },
  jam: { calories: 278, protein: 0.4, carbs: 69, fat: 0.1, fiber: 0.4 },
  chia_seeds: { calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34.4 },

  // Other
  potato_baked: { calories: 97, protein: 2, carbs: 22, fat: 0.1, fiber: 2.2 },
  seasonal_fruit: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  dry_nuts: { calories: 607, protein: 15, carbs: 21, fat: 54, fiber: 3.3 },
  protein_bar: { calories: 350, protein: 20, carbs: 38, fat: 12, fiber: 3 },
};

export const ZERO_MACRO: FoodMacroEntry = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
};
