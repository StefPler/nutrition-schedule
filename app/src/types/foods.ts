export type Category =
  | "legumes"
  | "vegetarian"
  | "white_meats"
  | "red_meats"
  | "fish"
  | "mixed"
  | "salad_meal"
  | "nuts_n_fruits"
  | "dairy"
  | "repeat_lunch";

import { Ingredient } from "./nutrition";

export type Recipe = {
  id: number;
  category: Category;
  season: string;
  name: string;
  description: string;
  serves: string;
  ingredients: Ingredient[];
  instructions: string[];
  link?: string;
};

export type FoodEntry = {
  id: number;
  wFrequency: number;
  category: Category;
  description: string;
  // seasonal: string;
  recipe?: Recipe;
};
