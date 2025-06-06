import { pickFoodFromId, pickRandomFoodFromCategory } from "@/src/helpers/util";
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

export const createStaticWeeklySchedule = (): WeeklySchedule => {
  let schedule: WeeklySchedule = {
    Monday: {
      // τσικεν ντει
      breakfast: pickFoodFromId("breakfast", 2), // Overnight oats
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 14), // Chicken + rice + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 5), // Salad
    },
    Tuesday: {
      // παστα ντει
      breakfast: pickFoodFromId("breakfast", 2), // Overnight oats
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 15), // Μπιφ + pasta + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 6), //  Μπιφ + pasta + salad
    },
    Wednesday: {
      // λεντιλ ντει
      breakfast: pickFoodFromId("breakfast", 2), // Overnight oats
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 16), // Lentils
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 4), // ομελετ + βετζ
    },
    Thursday: {
      // μπιφτεκι ντει
      breakfast: pickFoodFromId("breakfast", 1), // Τοστ
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 8), // Chicken + ποτατο + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 7), // Chicken + ποτατο + salad
    },
    Friday: {
      // αρακασ ντει
      breakfast: pickFoodFromId("breakfast", 1), // Τοστ
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 17), // αρακας + rice + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 4), // ομελετ + βετζ
    },
    Saturday: {
      // φρι μιντ ντει
      breakfast: pickFoodFromId("breakfast", 1), // Τοστ
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 18), // Fish + rice + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 8), // Salad
    },
    Sunday: {
      // μορ παστα γιαααασ
      breakfast: pickFoodFromId("breakfast", 1), // Τοστ
      snack1: pickFoodFromId("snack1", 3), // Yogurt
      lunch: pickFoodFromId("lunch", 19), // Chicken + rice + salad
      snack2: pickFoodFromId("snack2", 2), // Μπάρα
      dinner: pickFoodFromId("dinner", 9), // Chicken + rice + salad
    },
  };

  return schedule;
};
