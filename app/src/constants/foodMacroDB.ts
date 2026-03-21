import { FoodMacroEntry } from "../types/nutrition";

export const FOOD_MACRO_DB: Record<string, FoodMacroEntry> = {
  // Grains
  oats: { calories: 368, protein: 13.5, carbs: 58, fat: 7, fiber: 10.6 },
  rice: { calories: 130, protein: 2.4, carbs: 28, fat: 0.3, fiber: 0.4 },
  basmati_rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
  quinoa: { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 },
  bulgur: { calories: 83, protein: 3.1, carbs: 18.6, fat: 0.2, fiber: 4.5 },
  whole_wheat_pasta: { calories: 157, protein: 6.4, carbs: 30, fat: 1, fiber: 3.5 },
  orzo_whole_wheat: { calories: 160, protein: 5.5, carbs: 31, fat: 1.5, fiber: 3 },
  couscous: { calories: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4 },
  tortilla_wrap: { calories: 300, protein: 8, carbs: 50, fat: 7, fiber: 5.2 },
  whole_wheat_bread: { calories: 247, protein: 9, carbs: 45, fat: 3.5, fiber: 6.8 },
  german_bread: { calories: 250, protein: 8, carbs: 46, fat: 3, fiber: 7 },
  granola: { calories: 450, protein: 10, carbs: 64, fat: 18, fiber: 6 },
  paximadi: { calories: 380, protein: 11, carbs: 72, fat: 5, fiber: 8 },

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
  beef_fillet: { calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0 },
  tuna_in_water: { calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0 },
  salmon: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  smoked_salmon: { calories: 117, protein: 18, carbs: 0, fat: 4.3, fiber: 0 },
  shrimp: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0 },
  eggs: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
  egg_white: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0 },
  egg_yolk: { calories: 322, protein: 16, carbs: 3.6, fat: 27, fiber: 0 },
  turkey_slice: { calories: 111, protein: 17, carbs: 2, fat: 3.6, fiber: 0 },

  // Dairy
  low_fat_cheese: { calories: 200, protein: 25, carbs: 2, fat: 10, fiber: 0 },
  protein_yogurt: { calories: 67, protein: 10, carbs: 4.5, fat: 1, fiber: 0 },
  cream_cheese: { calories: 215, protein: 5, carbs: 4, fat: 20, fiber: 0 },
  yogurt_plain: { calories: 61, protein: 3.2, carbs: 7, fat: 1.5, fiber: 0 },
  yogurt_5pct: { calories: 97, protein: 3.3, carbs: 4.5, fat: 5, fiber: 0 },
  cottage_cheese: { calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0 },
  halloumi: { calories: 321, protein: 21, carbs: 2, fat: 25, fiber: 0 },
  katiki_cheese: { calories: 170, protein: 7, carbs: 1, fat: 15, fiber: 0 },
  parmesan: { calories: 392, protein: 36, carbs: 4, fat: 26, fiber: 0 },
  milk: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.5, fiber: 0 },

  // Free vegetables
  salad_seasonal: { calories: 15, protein: 1.5, carbs: 2, fat: 0.2, fiber: 1.5, isFreeVegetable: true },
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, isFreeVegetable: true },
  carrot: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, isFreeVegetable: true },
  bell_pepper: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, isFreeVegetable: true },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, isFreeVegetable: true },
  cherry_tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, isFreeVegetable: true },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, isFreeVegetable: true },
  eggplant: { calories: 25, protein: 1, carbs: 5.9, fat: 0.2, fiber: 3, isFreeVegetable: true },
  okra: { calories: 33, protein: 2, carbs: 7.5, fat: 0.1, fiber: 3.2, isFreeVegetable: true },
  mushrooms: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, isFreeVegetable: true },
  zucchini: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, isFreeVegetable: true },
  beetroot: { calories: 43, protein: 1.6, carbs: 10, fat: 0.2, fiber: 2.8, isFreeVegetable: true },
  lettuce: { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, isFreeVegetable: true },
  arugula: { calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, isFreeVegetable: true },
  cucumber: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, isFreeVegetable: true },
  spring_onion: { calories: 32, protein: 1.8, carbs: 7.3, fat: 0.2, fiber: 1.8, isFreeVegetable: true },
  lemon: { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8, isFreeVegetable: true },

  // Fats & Condiments
  olive_oil: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  peanut_butter: { calories: 589, protein: 25, carbs: 20, fat: 50, fiber: 6 },
  honey: { calories: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2 },
  pesto_sauce: { calories: 289, protein: 4.7, carbs: 5, fat: 28, fiber: 1.2 },
  jam: { calories: 278, protein: 0.4, carbs: 69, fat: 0.1, fiber: 0.4 },
  chia_seeds: { calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34.4 },
  guacamole: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
  mustard: { calories: 66, protein: 4, carbs: 6, fat: 3, fiber: 3 },
  vinaigrette: { calories: 200, protein: 0.2, carbs: 4, fat: 20, fiber: 0 },
  avocado: { calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7 },
  cocoa_powder: { calories: 228, protein: 20, carbs: 58, fat: 14, fiber: 33 },

  // Other
  potato_baked: { calories: 97, protein: 2, carbs: 22, fat: 0.1, fiber: 2.2 },
  sweet_potato: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
  seasonal_fruit: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  banana: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  pineapple: { calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4 },
  apple: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  dry_nuts: { calories: 607, protein: 15, carbs: 21, fat: 54, fiber: 3.3 },
  protein_bar: { calories: 350, protein: 20, carbs: 38, fat: 12, fiber: 3 },
  whey_protein: { calories: 400, protein: 80, carbs: 10, fat: 5, fiber: 0 },
  oat_cereal: { calories: 379, protein: 13, carbs: 67, fat: 7, fiber: 10 },
};

export const ZERO_MACRO: FoodMacroEntry = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
};
