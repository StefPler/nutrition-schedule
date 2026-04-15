"use client";
import { useMemo, useState } from "react";
import { useGetSchedule } from "@/src/hooks/useGetSchedule";
import { useMealPortions } from "@/src/hooks/useMealPortions";
import { Days, DaysEnum, Meal } from "@/src/types/period";
import type { MealPortion } from "@/src/types/nutrition";
import type { Recipe } from "@/src/types/foods";
import { Heading } from "@radix-ui/themes";
import { MEAL_ORDER } from "@/src/constants/recipePresentation";
import { DaySelector } from "./DaySelector";
import { RecipesDesktopView } from "./RecipesDesktopView";
import { RecipesMobileView } from "./RecipesMobileView";

export type MealSlot = { meal: Meal; recipe?: Recipe };

/**
 * Root client component for /recipes. Owns the selected-day state and
 * composes the day selector, desktop view, and mobile view. The two views
 * render simultaneously; CSS hides the inactive one via `md` breakpoint.
 */
export const RecipesPage = () => {
  const { data: schedule, isLoading } = useGetSchedule();

  const [selectedDay, setSelectedDay] = useState<Days>(
    DaysEnum[new Date().getDay()] as Days,
  );

  // Hook returns `Record<Meal, MealPortion> | null` — null if profile or schedule missing.
  const mealPortions = useMealPortions(selectedDay);
  const portions: Record<Meal, MealPortion> | undefined = mealPortions ?? undefined;

  const meals: MealSlot[] = useMemo(() => {
    const byDay = schedule?.byDay?.[selectedDay];
    return MEAL_ORDER.map((meal) => ({
      meal,
      recipe: byDay?.[meal]?.recipe,
    }));
  }, [schedule, selectedDay]);

  const hasSchedule = !isLoading && !!schedule;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 pb-6">
      <div className="text-center px-4 mb-6 mt-4">
        <Heading size="8" className="text-emerald-700 font-bold">
          Σημερινές Συνταγές
        </Heading>
      </div>

      <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {!isLoading && !schedule && (
        <div className="rounded-[14px] bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-slate-500">Δεν υπάρχει ενεργό πρόγραμμα</p>
        </div>
      )}

      {(isLoading || hasSchedule) && (
        <>
          <RecipesDesktopView
            selectedDay={selectedDay}
            meals={meals}
            portions={portions}
            isLoading={isLoading}
          />
          <RecipesMobileView
            selectedDay={selectedDay}
            meals={meals}
            portions={portions}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
