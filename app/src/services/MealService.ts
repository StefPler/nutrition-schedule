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
  const lunchSameAsDinnerDay = pickRandomFoodFromCategory("lunch", "white_meats");

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
  const lunchSameAsDinnerDay = pickRandomFoodFromCategory("lunch", "white_meats");

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
  schedule.Thursday.lunch = pickRandomFoodFromCategory("lunch", "white_meats", [schedule.Tuesday.lunch.id]);
  schedule.Friday.lunch = pickRandomFoodFromCategory("lunch", "legumes", [schedule.Wednesday.lunch.id]);
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
      breakfast: pickFoodFromId("breakfast", 3), // Γιαούρτι 5% + whey + φρούτο + γκρανόλα
      snack1: pickFoodFromId("snack1", 5), // Φρούτο + ξηροί καρποί
      lunch: pickFoodFromId("lunch", 20), // Κοτόπουλο + γουακαμόλε + κινόα
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 10), // Κοτόπουλο + σαλάτα κολοκύθι + χαλούμι
    },
    Tuesday: {
      breakfast: pickFoodFromId("breakfast", 4), // Αυγά + αβοκάντο + γερμανικό ψωμί
      snack1: pickFoodFromId("snack1", 6), // Wrap σολομού
      lunch: pickFoodFromId("lunch", 21), // Φιλέτο μοσχάρι + μπασμάτι
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 11), // Γιαούρτι + δημητριακά + φρούτο
    },
    Wednesday: {
      breakfast: pickFoodFromId("breakfast", 3), // Γιαούρτι 5% + whey + φρούτο + γκρανόλα
      snack1: pickFoodFromId("snack1", 5), // Φρούτο + ξηροί καρποί
      lunch: pickFoodFromId("lunch", 22), // Λαδερό + κατίκι
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 12), // Ντάκος + αυγά + cottage cheese
    },
    Thursday: {
      breakfast: pickFoodFromId("breakfast", 3), // Γιαούρτι 5% + whey + φρούτο + γκρανόλα
      snack1: pickFoodFromId("snack1", 6), // Wrap σολομού
      lunch: pickFoodFromId("lunch", 23), // Κιμάς + γλυκοπατάτα
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 13), // Μπουρίτο κιμά
    },
    Friday: {
      breakfast: pickFoodFromId("breakfast", 4), // Αυγά + αβοκάντο + γερμανικό ψωμί
      snack1: pickFoodFromId("snack1", 5), // Φρούτο + ξηροί καρποί
      lunch: pickFoodFromId("lunch", 24), // Κοτόπουλο τηγανιά + πατάτα γεμιστή
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 11), // Γιαούρτι + δημητριακά + φρούτο
    },
    Saturday: {
      breakfast: pickFoodFromId("breakfast", 3), // Γιαούρτι 5% + whey + φρούτο + γκρανόλα
      snack1: pickFoodFromId("snack1", 7), // Choco-Banana Mug Cake
      lunch: pickFoodFromId("lunch", 25), // Κριθαράκι ολικής + γαρίδες
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 8), // ΕΛΕΥΘΕΡΟ
    },
    Sunday: {
      breakfast: pickFoodFromId("breakfast", 5), // Πανκέικς πρωτεΐνης
      snack1: pickFoodFromId("snack1", 7), // Choco-Banana Mug Cake
      lunch: pickFoodFromId("lunch", 26), // Σολομός + ρύζι + λαχανικά
      snack2: pickFoodFromId("snack2", 8), // Φρούτο + whey
      dinner: pickFoodFromId("dinner", 14), // Σαλάτα σολομού + αβοκάντο + κινόα
    },
  };

  return schedule;
};
