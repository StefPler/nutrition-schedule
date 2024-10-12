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

export type FoodEntry = {
  id: number;
  wFrequency: number;
  category: Category;
  description: string;
};