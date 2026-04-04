import { useMemo } from "react";
import { useUserProfileStorage } from "./useStorage";
import { useGetSchedule } from "./useGetSchedule";
import { Days, Meal } from "../types/period";
import { MealPortion } from "../types/nutrition";
import { calculateDayPortions } from "../services/PortionCalculatorService";

export const useMealPortions = (dayName: Days): Record<Meal, MealPortion> | null => {
  const {
    getItem: { data: userProfile },
  } = useUserProfileStorage();
  const { data: schedule } = useGetSchedule();

  return useMemo(() => {
    if (!userProfile || !schedule?.byDay) return null;
    const dayMeals = schedule.byDay[dayName];
    if (!dayMeals) return null;
    return calculateDayPortions(userProfile, dayMeals);
  }, [userProfile, schedule, dayName]);
};

const ALL_DAYS: Days[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export type AllDayPortions = Record<Days, Record<Meal, MealPortion>>;

export const useAllDayPortions = (): AllDayPortions | null => {
  const {
    getItem: { data: userProfile },
  } = useUserProfileStorage();
  const { data: schedule } = useGetSchedule();

  return useMemo(() => {
    if (!userProfile || !schedule?.byDay) return null;
    const result = {} as AllDayPortions;
    for (const day of ALL_DAYS) {
      const dayMeals = schedule.byDay[day];
      if (!dayMeals) return null;
      result[day] = calculateDayPortions(userProfile, dayMeals);
    }
    return result;
  }, [userProfile, schedule]);
};
