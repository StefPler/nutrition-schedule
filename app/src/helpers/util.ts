import { Category, FoodEntry } from "../types/foods";
import { Meal, WeeklySchedule, WeeklyScheduleRows } from "../types/period";
import { breakfast, lunch, dinner, snacks } from "../constants/consts";

const getRandomElement = (array: Array<any>) => {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
};

const getFoods = (meal: Meal): FoodEntry[] => {
  switch (meal) {
    case "breakfast":
      return breakfast;
    case "snack1":
      return snacks;
    case "lunch":
      return lunch;
    case "snack2":
      return snacks;
    case "dinner":
      return dinner;
    default:
      throw new Error("Meal not found");
  }
};

export const pickRandomFoodFromCategory = (
  meal: Meal,
  category: Category,
  excludeIds?: Array<number>
): FoodEntry => {
  const foods = getFoods(meal);
  const filteredFoods = foods.filter((food) => food.category === category);
  if (filteredFoods.length === 0)
    throw new Error(`No meals found for category "${category}"`);
  let selection = getRandomElement(filteredFoods) as FoodEntry;
  // While the selection includes a food from the exclusion list pick again
  let escapeCounter = 0;
  while (excludeIds?.includes(selection.id)) {
    selection = getRandomElement(filteredFoods);
    escapeCounter += 1;
    if (escapeCounter > 100) break;
  }
  return selection;
};

export const pickFoodFromId = (meal: Meal, id: number): FoodEntry => {
  const foods = getFoods(meal);
  const food = foods.find((food) => food.id === id);
  if (!food) throw new Error(`Food with id ${id} not found in ${meal}`);
  return food;
};

export const scheduleToRows = (
  schedule: WeeklySchedule
): WeeklyScheduleRows => {
  return {
    breakfast: [
      schedule["Monday"].breakfast,
      schedule["Tuesday"].breakfast,
      schedule["Wednesday"].breakfast,
      schedule["Thursday"].breakfast,
      schedule["Friday"].breakfast,
      schedule["Saturday"].breakfast,
      schedule["Sunday"].breakfast,
    ],
    snack1: [
      schedule["Monday"].snack1,
      schedule["Tuesday"].snack1,
      schedule["Wednesday"].snack1,
      schedule["Thursday"].snack1,
      schedule["Friday"].snack1,
      schedule["Saturday"].snack1,
      schedule["Sunday"].snack1,
    ],
    lunch: [
      schedule["Monday"].lunch,
      schedule["Tuesday"].lunch,
      schedule["Wednesday"].lunch,
      schedule["Thursday"].lunch,
      schedule["Friday"].lunch,
      schedule["Saturday"].lunch,
      schedule["Sunday"].lunch,
    ],
    snack2: [
      schedule["Monday"].snack2,
      schedule["Tuesday"].snack2,
      schedule["Wednesday"].snack2,
      schedule["Thursday"].snack2,
      schedule["Friday"].snack2,
      schedule["Saturday"].snack2,
      schedule["Sunday"].snack2,
    ],
    dinner: [
      schedule["Monday"].dinner,
      schedule["Tuesday"].dinner,
      schedule["Wednesday"].dinner,
      schedule["Thursday"].dinner,
      schedule["Friday"].dinner,
      schedule["Saturday"].dinner,
      schedule["Sunday"].dinner,
    ],
  };
};
