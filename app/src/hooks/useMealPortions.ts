import { useMemo } from "react";
import { useStorage } from "./useStorage";
import { useGetSchedule } from "./useGetSchedule";
import { UserProfile } from "../types/userProfile";
import { Days, Meal } from "../types/period";
import { MealPortion } from "../types/nutrition";
import { calculateDayPortions } from "../services/PortionCalculatorService";

export const useMealPortions = (dayName: Days): Record<Meal, MealPortion> | null => {
  const {
    getItem: { data: userProfile },
  } = useStorage<UserProfile>("userProfile");
  const { data: schedule } = useGetSchedule();

  return useMemo(() => {
    if (!userProfile || !schedule?.byDay) return null;
    const dayMeals = schedule.byDay[dayName];
    if (!dayMeals) return null;
    return calculateDayPortions(userProfile, dayMeals);
  }, [userProfile, schedule, dayName]);
};
