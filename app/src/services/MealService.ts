import { pickRandomFoodFromCategory } from "@/src/helpers/util";
import { DailySchedule, WeeklySchedule } from "@/src/types/period";

const createMondaySchedule = (): DailySchedule => {
  return {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: pickRandomFoodFromCategory("lunch", "vegetarian"),
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: pickRandomFoodFromCategory("dinner", "salad_meal"),
  };
};

const createTuesdaySchedule = (): DailySchedule => {
  const lunchSameAsDinnerDay = pickRandomFoodFromCategory(
    "lunch",
    "white_meats"
  );

  return {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: lunchSameAsDinnerDay,
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: lunchSameAsDinnerDay,
  };
};

const createWedFriSchedule = (): DailySchedule[] => {
  const Wednesday = {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: pickRandomFoodFromCategory("lunch", "legumes"),
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: pickRandomFoodFromCategory("dinner", "white_meats"),
  };
  const Friday = {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: pickRandomFoodFromCategory("lunch", "legumes"),
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: pickRandomFoodFromCategory("dinner", "mixed"),
  };

  return [Wednesday, Friday];
};

const createThursdaySchedule = () => {
  return {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: pickRandomFoodFromCategory("lunch", "white_meats"),
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: pickRandomFoodFromCategory("dinner", "salad_meal"),
  };
};

const createSaturdaySchedule = () => {
  return {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: pickRandomFoodFromCategory("lunch", "fish"),
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: pickRandomFoodFromCategory("dinner", "salad_meal"),
  };
};

const createSundaySchedule = () => {
  const lunchSameAsDinnerDay = pickRandomFoodFromCategory(
    "lunch",
    "white_meats"
  );

  return {
    breakfast: pickRandomFoodFromCategory("breakfast", "mixed"),
    snack1: pickRandomFoodFromCategory("snack1", "nuts_n_fruits"),
    lunch: lunchSameAsDinnerDay,
    snack2: pickRandomFoodFromCategory("snack2", "dairy"),
    dinner: lunchSameAsDinnerDay,
  };
};

const diversifyRepeatingMeals = (schedule: WeeklySchedule) => {
  // Ensuring we don't have repeating meals for the white_meats & legumes days
  schedule.Thursday.lunch = pickRandomFoodFromCategory("lunch", "white_meats", [
    schedule.Tuesday.lunch.id,
  ]);
  schedule.Friday.lunch = pickRandomFoodFromCategory("lunch", "legumes", [
    schedule.Wednesday.lunch.id,
  ]);
  schedule.Sunday.lunch = pickRandomFoodFromCategory("lunch", "white_meats", [
    schedule.Tuesday.lunch.id,
    schedule.Thursday.lunch.id,
  ]);
  schedule.Sunday.dinner = schedule.Sunday.lunch;
};

export const createWeeklySchedule = (): WeeklySchedule => {
  const [Wednesday, Friday] = createWedFriSchedule();

  let schedule = {
    Monday: createMondaySchedule(),
    Tuesday: createTuesdaySchedule(),
    Wednesday,
    Thursday: createThursdaySchedule(),
    Friday,
    Saturday: createSaturdaySchedule(),
    Sunday: createSundaySchedule(),
  };

  diversifyRepeatingMeals(schedule);

  return schedule;
};
