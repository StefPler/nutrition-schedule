// src/constants/recipePresentation.ts
import { Meal } from "@/src/types/period";
import { Category } from "@/src/types/foods";

/**
 * Visual order for meal slots in BOTH the desktop meals sidebar and the mobile accordion.
 * Changing this array reorders the UI everywhere the page shows all meals.
 */
export const MEAL_ORDER: Meal[] = ["breakfast", "snack1", "lunch", "snack2", "dinner"];

export const MEAL_LABELS: Record<Meal, string> = {
  breakfast: "Πρωινό",
  snack1: "Πρωινό Σνακ",
  lunch: "Μεσημεριανό",
  snack2: "Απογευματινό Σνακ",
  dinner: "Βραδινό",
};

/**
 * Compact labels for filmstrip-sized contexts where "Απογευματινό Σνακ"
 * (17 chars) would blow up pill widths and force asymmetric layouts. Both
 * snacks share "Σνακ" — the emoji and meal time disambiguate.
 */
export const MEAL_LABELS_SHORT: Record<Meal, string> = {
  breakfast: "Πρωινό",
  snack1: "Σνακ",
  lunch: "Μεσημεριανό",
  snack2: "Σνακ",
  dinner: "Βραδινό",
};

export const MEAL_EMOJI: Record<Meal, string> = {
  breakfast: "🌅",
  snack1: "🍎",
  lunch: "☀️",
  snack2: "🥜",
  dinner: "🌙",
};

/**
 * Hardcoded meal times. The shape is stable so a future settings screen can
 * replace these values without refactoring consumers.
 */
export const MEAL_SCHEDULE_TIMES: Record<Meal, string> = {
  breakfast: "08:00",
  snack1: "10:30",
  lunch: "13:00",
  snack2: "16:00",
  dinner: "19:30",
};

/** Default prep time shown in the hero meta row until recipes carry real values. */
export const DEFAULT_PREP_TIME_MIN = 15;

/** User-facing Greek label for each recipe category. */
export const RECIPE_CATEGORY_LABELS: Record<Category, string> = {
  mixed: "Μικτό",
  legumes: "Όσπρια",
  vegetarian: "Χορτοφαγικό",
  white_meats: "Λευκό κρέας",
  red_meats: "Κόκκινο κρέας",
  fish: "Ψάρι",
  dairy: "Γαλακτοκομικά",
  nuts_n_fruits: "Ξηροί καρποί & φρούτα",
  salad_meal: "Σαλάτα",
  repeat_lunch: "Επανάληψη μεσημεριανού",
};

/**
 * Per-ingredient emoji keyed by `macroKey` (see `src/constants/foodMacroDB.ts`).
 * Partial: adding a new macroKey later does not require updating this file.
 * Ingredient rows with no icon render without the icon slot (no blank gap).
 */
export const INGREDIENT_ICONS: Partial<Record<string, string>> = {
  apple: "🍎",
  arugula: "🌿",
  avocado: "🥑",
  banana: "🍌",
  basmati_rice: "🍚",
  beef_fillet: "🥩",
  beetroot: "🟥",
  bell_pepper: "🫑",
  black_eyed_peas: "🫘",
  carrot: "🥕",
  cherry_tomato: "🍅",
  chia_seeds: "🌱",
  chicken_breast: "🍗",
  chicken_burger: "🍔",
  chicken_skewer: "🍢",
  chickpeas: "🫛",
  cocoa_powder: "🍫",
  cottage_cheese: "🧀",
  couscous: "🌾",
  cream_cheese: "🧀",
  cucumber: "🥒",
  dry_nuts: "🥜",
  eggplant: "🍆",
  eggs: "🥚",
  egg_white: "🥚",
  egg_yolk: "🥚",
  german_bread: "🍞",
  giant_beans: "🫘",
  granola: "🥣",
  ground_beef: "🥩",
  guacamole: "🥑",
  halloumi: "🧀",
  honey: "🍯",
  jam: "🍓",
  katiki_cheese: "🧀",
  lemon: "🍋",
  lentils: "🫘",
  lettuce: "🥬",
  low_fat_cheese: "🧀",
  milk: "🥛",
  mushrooms: "🍄",
  mustard: "🌭",
  oat_cereal: "🥣",
  oats: "🌾",
  okra: "🌱",
  olive_oil: "🫒",
  onion: "🧅",
  orzo_whole_wheat: "🍝",
  parmesan: "🧀",
  paximadi: "🍞",
  peanut_butter: "🥜",
  peas: "🫛",
  pesto_sauce: "🌿",
  potato_baked: "🥔",
  protein_bar: "🍫",
  protein_yogurt: "🥛",
  quinoa: "🌾",
  rice: "🍚",
  salad_seasonal: "🥗",
  salmon: "🐟",
  seasonal_fruit: "🍎",
  shrimp: "🍤",
  smoked_salmon: "🐟",
  spinach: "🥬",
  spring_onion: "🧅",
  sweet_potato: "🍠",
  tomato: "🍅",
  tortilla_wrap: "🌯",
  tuna_in_water: "🐟",
  turkey_slice: "🦃",
  vinaigrette: "🫙",
  whey_protein: "💪",
  whole_wheat_bread: "🍞",
  whole_wheat_pasta: "🍝",
  yogurt_2pct: "🥛",
  yogurt_plain: "🥛",
  zucchini: "🥒",
};

/** Fixed placeholder until real pricing exists. No total is computed. */
export const MOCK_INGREDIENT_PRICE_LABEL = "€—";
