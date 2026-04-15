"use client";
import { useEffect, useState } from "react";
import { Meal, Days } from "@/src/types/period";
import { MealPortion } from "@/src/types/nutrition";
import { Skeleton } from "@radix-ui/themes";
import { MEAL_ORDER } from "@/src/constants/recipePresentation";
import { MealAccordionCard } from "./MealAccordionCard";
import type { MealSlot } from "./RecipesPage";

/**
 * Mobile shell: vertical stack of 5 accordion cards. Owns `expandedMeal`.
 * Only one meal can be expanded at a time. Clicking an open card closes
 * it (null state). Day changes reset to breakfast-open.
 */
export const RecipesMobileView = ({
  selectedDay,
  meals,
  portions,
  isLoading,
}: {
  selectedDay: Days;
  meals: MealSlot[];
  portions?: Record<Meal, MealPortion>;
  isLoading: boolean;
}) => {
  const [expandedMeal, setExpandedMeal] = useState<Meal | null>("breakfast");

  useEffect(() => {
    setExpandedMeal("breakfast");
  }, [selectedDay]);

  if (isLoading) {
    return (
      <div className="flex md:hidden flex-col gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[60px] rounded-[12px]" />
        ))}
      </div>
    );
  }

  const byMeal = Object.fromEntries(meals.map((m) => [m.meal, m])) as Record<
    Meal,
    MealSlot | undefined
  >;

  const handleOpenChange = (meal: Meal) => (next: boolean) => {
    setExpandedMeal(next ? meal : null);
  };

  return (
    <div className="flex md:hidden flex-col gap-2.5">
      {MEAL_ORDER.map((meal) => {
        const slot = byMeal[meal];
        return (
          <MealAccordionCard
            key={meal}
            meal={meal}
            recipe={slot?.recipe}
            portion={portions?.[meal]}
            open={expandedMeal === meal}
            onOpenChange={handleOpenChange(meal)}
          />
        );
      })}
    </div>
  );
};
